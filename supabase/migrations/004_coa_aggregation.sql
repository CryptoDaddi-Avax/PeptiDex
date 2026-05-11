-- ══════════════════════════════════════════════════════════════
-- PeptiDex COA Aggregation — Schema Migration
-- Run in Supabase SQL Editor
-- ══════════════════════════════════════════════════════════════

-- ──────────────────────────────────────────────────────────────
-- 1. COA RECORDS — time-series of extracted COA data
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.coa_records (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_slug     TEXT NOT NULL,
  peptide_slug    TEXT NOT NULL,
  batch_id        TEXT,
  test_date       DATE,
  purity_pct      NUMERIC(5,2) CHECK (purity_pct BETWEEN 0 AND 100),
  molecular_weight TEXT,
  lab_name        TEXT,
  lab_tier        TEXT CHECK (lab_tier IN ('reputable','acceptable','unverified','flagged')),
  test_methods    TEXT[],
  source_url      TEXT NOT NULL,
  source_type     TEXT DEFAULT 'crawler'
                  CHECK (source_type IN ('crawler','manual','community')),
  pdf_hash        TEXT,
  raw_extracted   JSONB,
  flagged         BOOLEAN DEFAULT false,
  flag_reason     TEXT,
  crawl_run_id    TEXT,
  created_at      TIMESTAMPTZ DEFAULT now(),

  UNIQUE(vendor_slug, peptide_slug, batch_id, source_url)
);

COMMENT ON TABLE public.coa_records IS 'Extracted COA data from vendor-published certificates. One row per (vendor, peptide, batch).';

CREATE INDEX IF NOT EXISTS idx_coa_vendor_peptide
  ON coa_records(vendor_slug, peptide_slug);
CREATE INDEX IF NOT EXISTS idx_coa_test_date
  ON coa_records(test_date DESC);
CREATE INDEX IF NOT EXISTS idx_coa_flagged
  ON coa_records(flagged) WHERE flagged = true;

-- ──────────────────────────────────────────────────────────────
-- 2. VENDOR TRUST SCORES — composite trust per vendor
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.vendor_trust_scores (
  vendor_slug         TEXT PRIMARY KEY,
  trust_score         NUMERIC(4,2) CHECK (trust_score BETWEEN 0 AND 100),
  purity_consistency  NUMERIC(4,2),
  coa_recency_score   NUMERIC(4,2),
  lab_credibility     NUMERIC(4,2),
  catalog_coverage    NUMERIC(4,2),
  total_coas          INT DEFAULT 0,
  avg_purity          NUMERIC(5,2),
  stddev_purity       NUMERIC(5,2),
  last_coa_date       DATE,
  updated_at          TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.vendor_trust_scores IS 'Composite trust scores derived from COA data. Recalculated after each crawl.';

-- ──────────────────────────────────────────────────────────────
-- 3. COA CRAWL RUNS — audit log
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.coa_crawl_runs (
  id          TEXT PRIMARY KEY,
  started_at  TIMESTAMPTZ DEFAULT now(),
  finished_at TIMESTAMPTZ,
  status      TEXT DEFAULT 'running'
              CHECK (status IN ('running','completed','failed')),
  vendors_hit INT DEFAULT 0,
  coas_found  INT DEFAULT 0,
  coas_new    INT DEFAULT 0,
  errors      JSONB DEFAULT '[]'
);

COMMENT ON TABLE public.coa_crawl_runs IS 'Audit log for weekly COA crawler runs.';

-- ──────────────────────────────────────────────────────────────
-- 4. ROLLING PURITY MATERIALIZED VIEW
-- ──────────────────────────────────────────────────────────────
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_purity_rolling AS
SELECT
  vendor_slug,
  peptide_slug,
  COUNT(*)::int AS coa_count,
  ROUND(AVG(purity_pct)::numeric, 2) AS avg_purity,
  ROUND(STDDEV(purity_pct)::numeric, 2) AS stddev_purity,
  MIN(purity_pct) AS min_purity,
  MAX(purity_pct) AS max_purity,
  MAX(test_date) AS latest_test,
  MODE() WITHIN GROUP (ORDER BY lab_name) AS primary_lab
FROM coa_records
WHERE purity_pct IS NOT NULL
  AND flagged = false
GROUP BY vendor_slug, peptide_slug;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_purity_rolling
  ON mv_purity_rolling(vendor_slug, peptide_slug);

-- ──────────────────────────────────────────────────────────────
-- 5. RPC to refresh COA materialized view
-- ──────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION refresh_coa_views()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY mv_purity_rolling;
END;
$$;

-- ──────────────────────────────────────────────────────────────
-- 6. RLS — public read, service-role write
-- ──────────────────────────────────────────────────────────────
ALTER TABLE coa_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_trust_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE coa_crawl_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read coa_records"
  ON coa_records FOR SELECT
  USING (true);

CREATE POLICY "Public read trust_scores"
  ON vendor_trust_scores FOR SELECT
  USING (true);

CREATE POLICY "Public read crawl_runs"
  ON coa_crawl_runs FOR SELECT
  USING (true);
