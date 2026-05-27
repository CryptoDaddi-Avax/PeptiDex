-- ─────────────────────────────────────────────────────────────────────────────
-- PeptiDex: Vendor Listings — Single Source of Truth for Price Comparison
-- Migration: 20260527_vendor_listings.sql
-- Run in Supabase SQL Editor or via CLI: supabase db push
-- ─────────────────────────────────────────────────────────────────────────────

-- ┌─────────────────────────────────────────────────────────────────────────────┐
-- │ 1. FX RATE TABLE                                                           │
-- │    Configurable currency conversion — updated daily (or on-demand).        │
-- │    The canonical pricing currency is always USD.                            │
-- │    We do NOT hardcode rates inline; every non-USD listing converts via      │
-- │    this table so rates can be updated in one place.                         │
-- └─────────────────────────────────────────────────────────────────────────────┘

CREATE TABLE IF NOT EXISTS fx_rates (
  currency_code   TEXT        PRIMARY KEY,            -- ISO 4217: "EUR", "GBP", "CAD", etc.
  rate_to_usd     NUMERIC     NOT NULL CHECK (rate_to_usd > 0),  -- 1 unit of this currency = X USD
  source          TEXT        NOT NULL DEFAULT 'manual',          -- 'manual' | 'api' | 'ecb'
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed the base rates so the system works on day one.
-- These will be updated by a daily cron or manual refresh.
INSERT INTO fx_rates (currency_code, rate_to_usd, source) VALUES
  ('USD', 1.0000, 'identity'),
  ('EUR', 1.0850, 'manual'),    -- 1 EUR ≈ 1.085 USD (May 2026 approximate)
  ('GBP', 1.2700, 'manual'),    -- 1 GBP ≈ 1.270 USD
  ('CAD', 0.7350, 'manual'),    -- 1 CAD ≈ 0.735 USD
  ('AUD', 0.6550, 'manual')     -- 1 AUD ≈ 0.655 USD
ON CONFLICT (currency_code) DO NOTHING;


-- ┌─────────────────────────────────────────────────────────────────────────────┐
-- │ 2. LISTINGS TABLE                                                          │
-- │    One row = one purchasable SKU from one vendor.                           │
-- │    This is the SINGLE source of truth the price page reads from.           │
-- │    The UI NEVER computes price_per_mg — it reads it from this column.      │
-- └─────────────────────────────────────────────────────────────────────────────┘

CREATE TYPE listing_source_type AS ENUM ('manual', 'scrape', 'api');
CREATE TYPE listing_route AS ENUM ('Injection', 'Oral', 'Topical', 'Nasal', 'Other');

CREATE TABLE IF NOT EXISTS listings (
  id                  BIGSERIAL       PRIMARY KEY,

  -- ── Vendor foreign key (matches vendors.ts slugs) ──────────────────────
  vendor_name         TEXT            NOT NULL,         -- e.g. "Amino Club"
  vendor_slug         TEXT            NOT NULL,         -- e.g. "amino-club" (FK to vendors.ts)

  -- ── Peptide foreign key (matches peptides.ts slugs) ────────────────────
  peptide_name        TEXT            NOT NULL,         -- e.g. "BPC-157"
  peptide_slug        TEXT            NOT NULL,         -- e.g. "bpc-157" (FK to peptides.ts)

  -- ── Product details ────────────────────────────────────────────────────
  route               listing_route   NOT NULL DEFAULT 'Injection',
  vial_size_mg        NUMERIC,                         -- mg per unit; NULL if not mass-based (e.g., capsule count)
  quantity            INTEGER         NOT NULL DEFAULT 1 CHECK (quantity >= 1),
  total_mg            NUMERIC         GENERATED ALWAYS AS (
                        CASE WHEN vial_size_mg IS NOT NULL
                          THEN vial_size_mg * quantity
                          ELSE NULL
                        END
                      ) STORED,

  -- ── Pricing (raw + normalized) ─────────────────────────────────────────
  price_raw           NUMERIC         NOT NULL CHECK (price_raw > 0),
  currency_raw        TEXT            NOT NULL DEFAULT 'USD',   -- ISO 4217
  price_usd           NUMERIC         NOT NULL CHECK (price_usd > 0),
  price_per_mg_usd    NUMERIC,                         -- NULL when total_mg is NULL

  -- ── Discount / affiliate ───────────────────────────────────────────────
  discount_code       TEXT,                             -- e.g. "PEPTIDEX"
  discount_percent    NUMERIC,                         -- e.g. 20 = 20% off
  affiliate_url       TEXT            NOT NULL,

  -- ── Stock & freshness ──────────────────────────────────────────────────
  in_stock            BOOLEAN         NOT NULL DEFAULT TRUE,
  last_checked_at     TIMESTAMPTZ     NOT NULL DEFAULT NOW(),  -- PER ROW, real timestamp

  -- ── Provenance ─────────────────────────────────────────────────────────
  source_type         listing_source_type NOT NULL DEFAULT 'manual',

  -- ── Trust fields (planned) ─────────────────────────────────────────────
  coa_url             TEXT,                             -- direct link to Certificate of Analysis
  third_party_tested  BOOLEAN         DEFAULT FALSE,   -- trust differentiator for future use

  -- ── Timestamps ─────────────────────────────────────────────────────────
  created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- ── Indexes ──────────────────────────────────────────────────────────────────

-- Primary query pattern: "show me all listings for peptide X, sorted by price_per_mg_usd"
CREATE INDEX IF NOT EXISTS idx_listings_peptide
  ON listings (peptide_slug, price_per_mg_usd ASC NULLS LAST);

-- Secondary: filter by vendor
CREATE INDEX IF NOT EXISTS idx_listings_vendor
  ON listings (vendor_slug);

-- Staleness queries: find rows not checked recently
CREATE INDEX IF NOT EXISTS idx_listings_staleness
  ON listings (last_checked_at ASC);

-- Unique constraint: one listing per vendor+peptide+route+vial_size+quantity combo
-- Prevents duplicate rows from repeated scrapes/imports
CREATE UNIQUE INDEX IF NOT EXISTS idx_listings_unique_sku
  ON listings (vendor_slug, peptide_slug, route, COALESCE(vial_size_mg, -1), quantity);


-- ── Auto-update updated_at ───────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_listings_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_listings_updated ON listings;
CREATE TRIGGER trg_listings_updated
  BEFORE UPDATE ON listings
  FOR EACH ROW
  EXECUTE FUNCTION update_listings_timestamp();


-- ── Row Level Security ───────────────────────────────────────────────────────
-- Listings are publicly readable (the price page is unauthenticated).
-- Only service_role can write (admin/scraper/import scripts).

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE fx_rates ENABLE ROW LEVEL SECURITY;

-- Public read for listings (prices are not secret)
DROP POLICY IF EXISTS "public_read_listings" ON listings;
CREATE POLICY "public_read_listings"
  ON listings FOR SELECT TO anon, authenticated
  USING (true);

-- Service role: full access
DROP POLICY IF EXISTS "service_all_listings" ON listings;
CREATE POLICY "service_all_listings"
  ON listings FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- FX rates: public read, service write
DROP POLICY IF EXISTS "public_read_fx" ON fx_rates;
CREATE POLICY "public_read_fx"
  ON fx_rates FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "service_all_fx" ON fx_rates;
CREATE POLICY "service_all_fx"
  ON fx_rates FOR ALL TO service_role
  USING (true) WITH CHECK (true);
