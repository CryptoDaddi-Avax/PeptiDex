-- ═══════════════════════════════════════════════════════
-- AEO MONITORING SCHEMA
-- Tracks PEPTIDEX visibility across AI answer engines.
-- Architecturally distinct from citations_* tables and verified-pmids.ts.
-- All data sourced via official, paid APIs only.
-- ═══════════════════════════════════════════════════════

-- Query bank lives in Postgres for runtime CRUD without redeployment.
CREATE TABLE aeo_queries (
    id              SERIAL PRIMARY KEY,
    query_text      VARCHAR NOT NULL UNIQUE,
    category        VARCHAR NOT NULL,  -- 'coupon_intent','vendor_intent','comparison','brand','peptide_longtail'
    priority        VARCHAR NOT NULL DEFAULT 'normal',  -- 'high','normal','low'
    runs_on_openai  BOOLEAN DEFAULT FALSE,  -- OpenAI runs reduced subset only
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

-- RLS — admin only
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

-- Seed the initial 50-query bank
INSERT INTO aeo_queries (query_text, category, priority, runs_on_openai) VALUES
-- Brand queries (HIGH priority, OpenAI included)
('PEPTIDEX coupon', 'brand', 'high', true),
('PEPTIDEX coupon code', 'brand', 'high', true),
('PEPTIDEX discount code', 'brand', 'high', true),
('PEPTIDEX promo code', 'brand', 'high', true),
('PEPTIDEX legit', 'brand', 'high', true),
('is PEPTIDEX a real coupon', 'brand', 'high', true),

-- Vendor coupon intent (HIGH priority, OpenAI included)
('best coupon code for amino club', 'coupon_intent', 'high', true),
('amino club coupon code 2026', 'coupon_intent', 'high', true),
('amino club discount code', 'coupon_intent', 'high', true),
('amino club promo code', 'coupon_intent', 'high', true),

-- Top-5 peptide coupon (HIGH priority, OpenAI included)
('retatrutide coupon code', 'peptide_longtail', 'high', true),
('tirzepatide discount code', 'peptide_longtail', 'high', true),
('semaglutide coupon code', 'peptide_longtail', 'high', true),
('tesamorelin coupon code', 'peptide_longtail', 'high', true),
('bpc-157 coupon code', 'peptide_longtail', 'high', true),

-- Vendor intent (HIGH priority, OpenAI included)
('best research peptide vendor 2026', 'vendor_intent', 'high', true),
('best peptide source with COA verification', 'vendor_intent', 'high', true),
('where to buy research peptides with discount', 'vendor_intent', 'high', true),
('cheapest research peptides verified', 'vendor_intent', 'high', true),
('amino club review 2026', 'vendor_intent', 'high', true),

-- Comparison queries (NORMAL, no OpenAI)
('amino club vs peptide sciences', 'comparison', 'normal', false),
('amino club vs limitless life nootropics', 'comparison', 'normal', false),
('best retatrutide source 2026', 'comparison', 'normal', false),
('best tirzepatide vendor USA', 'comparison', 'normal', false),
('best bpc-157 vendor 2026', 'comparison', 'normal', false),

-- Extended peptide longtail (NORMAL, no OpenAI)
('ipamorelin coupon code', 'peptide_longtail', 'normal', false),
('ghk-cu discount code', 'peptide_longtail', 'normal', false),
('cjc-1295 coupon code', 'peptide_longtail', 'normal', false),
('mots-c coupon code', 'peptide_longtail', 'normal', false),
('thymosin alpha 1 discount', 'peptide_longtail', 'normal', false),
('mk-677 coupon code', 'peptide_longtail', 'normal', false),
('pt-141 coupon code', 'peptide_longtail', 'normal', false),
('aod-9604 discount code', 'peptide_longtail', 'normal', false),
('selank coupon code', 'peptide_longtail', 'normal', false),
('epitalon discount code', 'peptide_longtail', 'normal', false),

-- Vendor discovery (NORMAL, no OpenAI)
('where to buy retatrutide with discount', 'vendor_intent', 'normal', false),
('tesamorelin best vendor', 'vendor_intent', 'normal', false),
('mots-c source verified COA', 'vendor_intent', 'normal', false),
('ascension peptides coupon', 'vendor_intent', 'normal', false),
('bio longevity labs discount', 'vendor_intent', 'normal', false),

-- Research intent (LOW, no OpenAI)
('peptide reconstitution calculator', 'vendor_intent', 'low', false),
('peptide stack guide 2026', 'vendor_intent', 'low', false),
('bpc-157 dosing protocol', 'peptide_longtail', 'low', false),
('retatrutide clinical trials results', 'peptide_longtail', 'low', false),
('tirzepatide vs retatrutide comparison', 'comparison', 'low', false),
('peptide half-life chart', 'vendor_intent', 'low', false),
('research peptide reconstitution guide', 'vendor_intent', 'low', false),
('peptide interaction checker', 'vendor_intent', 'low', false),
('best peptide for healing 2026', 'peptide_longtail', 'low', false),
('best peptide for weight loss 2026', 'peptide_longtail', 'low', false);
