-- ═══════════════════════════════════════════════════════
-- AEO MONITORING SCHEMA
-- Tracks PEPTIDEX visibility across AI answer engines.
-- Architecturally distinct from citations_* tables and verified-pmids.ts.
-- All data sourced via official, paid APIs only.
-- ═══════════════════════════════════════════════════════
-- Seed data lives in: 20260522_aeo_query_bank_seed.sql
-- Run this file FIRST, then run the seed file.
-- ═══════════════════════════════════════════════════════

-- Query bank lives in Postgres for runtime CRUD without redeployment.
CREATE TABLE aeo_queries (
    id              SERIAL PRIMARY KEY,
    query_text      VARCHAR NOT NULL UNIQUE,
    category        VARCHAR NOT NULL,  -- 'brand','coupon_intent','informational','vendor_intent','comparison','peptide_longtail','glp1'
    priority        VARCHAR NOT NULL DEFAULT 'normal',  -- 'high','normal','low'
    runs_on_openai  BOOLEAN DEFAULT FALSE,  -- OpenAI runs reduced subset only (cost control)
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Raw response storage (retained 90 days per compliance)
CREATE TABLE aeo_responses (
    id              SERIAL PRIMARY KEY,
    query_id        INTEGER REFERENCES aeo_queries(id) ON DELETE CASCADE,
    engine          VARCHAR NOT NULL,  -- 'perplexity','openai','anthropic','brave'
    raw_response    TEXT NOT NULL,
    cited_urls      JSONB DEFAULT '[]'::jsonb,
    response_tokens INTEGER,
    cost_estimate   NUMERIC(10,6) DEFAULT 0,
    http_status     INTEGER,
    error_message   TEXT,
    polled_at       TIMESTAMPTZ DEFAULT NOW(),
    expires_at      TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '90 days')
);

-- Per-response classification (populated by Claude Haiku classifier)
CREATE TABLE aeo_classifications (
    id                      SERIAL PRIMARY KEY,
    response_id             INTEGER REFERENCES aeo_responses(id) ON DELETE CASCADE UNIQUE,
    peptidex_mentioned      BOOLEAN DEFAULT FALSE,
    peptidex_app_cited      BOOLEAN DEFAULT FALSE,
    peptidex_app_as_source  BOOLEAN DEFAULT FALSE,   -- appears in citations/sources list specifically
    citation_url            VARCHAR,
    cited_url_paths         JSONB DEFAULT '[]'::jsonb,  -- e.g. ["/library/retatrutide","/peptidex-coupon"]
    mention_position        VARCHAR,  -- 'first_paragraph','middle','footer','not_mentioned'
    sentiment               VARCHAR,  -- 'positive','neutral','cautious','negative'
    competing_codes         JSONB DEFAULT '[]'::jsonb,
    competing_vendors       JSONB DEFAULT '[]'::jsonb,
    top_cited_domains       JSONB DEFAULT '[]'::jsonb,
    model_used              VARCHAR DEFAULT 'haiku',  -- track for A/B comparison
    classified_at           TIMESTAMPTZ DEFAULT NOW()
);

-- Polling run metadata
CREATE TABLE aeo_poll_runs (
    id                SERIAL PRIMARY KEY,
    run_date          TIMESTAMPTZ DEFAULT NOW(),
    engine            VARCHAR NOT NULL,
    queries_executed  INTEGER DEFAULT 0,
    queries_skipped   INTEGER DEFAULT 0,
    total_cost        NUMERIC(10,4) DEFAULT 0,
    errors            INTEGER DEFAULT 0,
    duration_ms       INTEGER
);

-- Daily cost ledger (enforces hard budget caps)
CREATE TABLE aeo_cost_ledger (
    id          SERIAL PRIMARY KEY,
    date        DATE NOT NULL DEFAULT CURRENT_DATE,
    engine      VARCHAR NOT NULL,
    total_spend NUMERIC(10,4) DEFAULT 0,
    query_count INTEGER DEFAULT 0,
    UNIQUE(date, engine)
);

-- Win/loss event log — EDGE-TRIGGERED, not level-triggered
CREATE TABLE aeo_events (
    id            SERIAL PRIMARY KEY,
    query_id      INTEGER REFERENCES aeo_queries(id),
    engine        VARCHAR NOT NULL,
    event_type    VARCHAR NOT NULL,  -- 'gained_mention','lost_mention','gained_citation','lost_citation','new_competitor'
    details       JSONB,
    occurred_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- The Inngest functions use SUPABASE_SERVICE_ROLE_KEY which bypasses RLS
-- entirely — no additional policy is needed for server-side writes.
-- These policies block anon/public reads and protect data privacy.
-- The /admin/aeo dashboard also uses the service role key (server-side).
-- ═══════════════════════════════════════════════════════
ALTER TABLE aeo_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE aeo_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE aeo_classifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE aeo_poll_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE aeo_cost_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE aeo_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY admin_aeo_queries ON aeo_queries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY admin_aeo_responses ON aeo_responses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY admin_aeo_classifications ON aeo_classifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY admin_aeo_runs ON aeo_poll_runs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY admin_aeo_cost ON aeo_cost_ledger FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY admin_aeo_events ON aeo_events FOR ALL USING (auth.role() = 'authenticated');

-- ═══════════════════════════════════════════════════════
-- INDEXES (deferred — not needed at launch volumes)
-- Enable when aeo_responses exceeds ~10k rows or query latency degrades.
-- ═══════════════════════════════════════════════════════
-- CREATE INDEX idx_aeo_responses_query_engine ON aeo_responses(query_id, engine);
-- CREATE INDEX idx_aeo_responses_polled_at ON aeo_responses(polled_at DESC);
-- CREATE INDEX idx_aeo_classifications_mentioned ON aeo_classifications(peptidex_mentioned);
-- CREATE INDEX idx_aeo_events_occurred_at ON aeo_events(occurred_at DESC);
