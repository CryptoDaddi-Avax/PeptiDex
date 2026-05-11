-- ─────────────────────────────────────────────────────────────────────────────
-- PeptiDex: Affiliate Click Tracking Tables
-- Run in Supabase SQL Editor or via CLI: supabase db push
-- ─────────────────────────────────────────────────────────────────────────────

-- Affiliate click log
-- Stores one row per click event.
-- Privacy: no IP, no user-agent, no auth ID stored.
CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id            BIGSERIAL PRIMARY KEY,
  peptide_slug  TEXT        NOT NULL DEFAULT 'general',
  vendor_slug   TEXT        NOT NULL,
  page_path     TEXT        NOT NULL DEFAULT '/',
  surface       TEXT        NOT NULL DEFAULT 'unknown',
  session_id    TEXT        NOT NULL,          -- daily-rotating client hash, no PII
  timestamp     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for dashboard query performance
CREATE INDEX IF NOT EXISTS idx_ac_vendor      ON affiliate_clicks (vendor_slug);
CREATE INDEX IF NOT EXISTS idx_ac_peptide     ON affiliate_clicks (peptide_slug);
CREATE INDEX IF NOT EXISTS idx_ac_surface     ON affiliate_clicks (surface);
CREATE INDEX IF NOT EXISTS idx_ac_session     ON affiliate_clicks (session_id);
CREATE INDEX IF NOT EXISTS idx_ac_timestamp   ON affiliate_clicks (timestamp DESC);

-- Vendor conversion postbacks (optional webhook)
CREATE TABLE IF NOT EXISTS affiliate_conversions (
  id            BIGSERIAL PRIMARY KEY,
  vendor_slug   TEXT        NOT NULL,
  peptide_slug  TEXT        NOT NULL DEFAULT 'unknown',
  order_id      TEXT,                           -- opaque vendor order ref, no PII
  timestamp     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conv_vendor    ON affiliate_conversions (vendor_slug);
CREATE INDEX IF NOT EXISTS idx_conv_timestamp ON affiliate_conversions (timestamp DESC);

-- Daily aggregates (materialized view refreshed by cron)
-- Used by the analytics dashboard to avoid full table scans.
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_affiliate_daily AS
  SELECT
    DATE(timestamp)   AS day,
    vendor_slug,
    peptide_slug,
    surface,
    COUNT(*)          AS clicks,
    COUNT(DISTINCT session_id) AS unique_sessions
  FROM affiliate_clicks
  GROUP BY 1, 2, 3, 4
WITH NO DATA;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_daily_uniq
  ON mv_affiliate_daily (day, vendor_slug, peptide_slug, surface);

-- Refresh function (called by /api/cron/refresh-views)
CREATE OR REPLACE FUNCTION refresh_affiliate_views()
RETURNS void LANGUAGE sql AS $$
  REFRESH MATERIALIZED VIEW CONCURRENTLY mv_affiliate_daily;
$$;

-- Row Level Security: only service_role can read tracking data
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_conversions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous INSERT (client tracking calls)
DROP POLICY IF EXISTS "anon_insert_clicks" ON affiliate_clicks;
CREATE POLICY "anon_insert_clicks"
  ON affiliate_clicks FOR INSERT TO anon
  WITH CHECK (true);

-- No SELECT for anon — service_role only (used by admin dashboard)
DROP POLICY IF EXISTS "service_select_clicks" ON affiliate_clicks;
CREATE POLICY "service_select_clicks"
  ON affiliate_clicks FOR SELECT TO service_role
  USING (true);

DROP POLICY IF EXISTS "service_insert_clicks" ON affiliate_clicks;
CREATE POLICY "service_insert_clicks"
  ON affiliate_clicks FOR INSERT TO service_role
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_all_conversions" ON affiliate_conversions;
CREATE POLICY "service_all_conversions"
  ON affiliate_conversions FOR ALL TO service_role
  USING (true) WITH CHECK (true);
