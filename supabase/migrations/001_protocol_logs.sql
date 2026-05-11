-- ══════════════════════════════════════════════════════════════
-- PeptiDex Verified Protocol Logs — Schema Migration
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ══════════════════════════════════════════════════════════════

-- ──────────────────────────────────────────────────────────────
-- 1. PROFILES (extends Supabase auth.users)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name  TEXT NOT NULL DEFAULT 'Researcher-' || substr(gen_random_uuid()::text, 1, 6),
  country_code  CHAR(2),
  badge         TEXT DEFAULT 'contributor'
                CHECK (badge IN ('contributor', 'verified_buyer', 'lab_confirmed')),
  log_count     INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.profiles IS 'User profiles for protocol log contributors. Extends auth.users.';

-- ──────────────────────────────────────────────────────────────
-- 2. PROTOCOL LOGS (the core table)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.protocol_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES public.profiles(id) ON DELETE SET NULL,

  -- Protocol details
  peptide_slugs   TEXT[] NOT NULL,
  vendor_slug     TEXT NOT NULL,
  dose_mcg        INT,
  frequency       TEXT,
  route           TEXT CHECK (route IN ('subq', 'im', 'oral', 'nasal', 'topical')),
  duration_weeks  INT,
  goal_slug       TEXT,

  -- Outcomes
  efficacy_score       SMALLINT CHECK (efficacy_score BETWEEN 1 AND 10),
  side_effect_score    SMALLINT CHECK (side_effect_score BETWEEN 1 AND 10),
  would_repeat         BOOLEAN,
  outcome_text         TEXT,
  side_effects_noted   TEXT[],

  -- Verification
  verification_level   TEXT DEFAULT 'self_reported'
                       CHECK (verification_level IN ('self_reported', 'verified_buyer', 'lab_confirmed')),
  receipt_verified_at  TIMESTAMPTZ,
  lab_coa_hash         TEXT,

  -- Moderation
  status          TEXT DEFAULT 'published'
                  CHECK (status IN ('published', 'flagged', 'removed', 'pending_review')),
  flag_reason     TEXT,
  flagged_by      TEXT,
  moderated_at    TIMESTAMPTZ,

  -- Timestamps
  protocol_start_date  DATE,
  created_at           TIMESTAMPTZ DEFAULT now(),
  updated_at           TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.protocol_logs IS 'User-submitted protocol outcomes. The core data asset.';

-- ──────────────────────────────────────────────────────────────
-- 3. RECEIPT VERIFICATIONS (temporary — rows deleted after OCR)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.receipt_verifications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log_id          UUID REFERENCES public.protocol_logs(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  storage_path    TEXT,
  ocr_vendor      TEXT,
  ocr_date        DATE,
  ocr_confidence  FLOAT,
  verified        BOOLEAN DEFAULT FALSE,
  processed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.receipt_verifications IS 'Temporary receipt OCR records. Images deleted within 60s of processing.';

-- ──────────────────────────────────────────────────────────────
-- 4. VENDOR FLAGS (vendors can flag suspicious logs)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.vendor_flags (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log_id          UUID REFERENCES public.protocol_logs(id) ON DELETE CASCADE,
  vendor_slug     TEXT NOT NULL,
  reason          TEXT NOT NULL,
  adjudication    TEXT CHECK (adjudication IN ('upheld', 'dismissed')),
  adjudicated_by  TEXT,
  adjudicated_at  TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.vendor_flags IS 'Vendor-submitted flags on suspicious protocol logs.';

-- ──────────────────────────────────────────────────────────────
-- 5. EMAIL REMINDERS (4-week follow-up)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.log_reminders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  log_id          UUID REFERENCES public.protocol_logs(id) ON DELETE CASCADE,
  remind_at       TIMESTAMPTZ NOT NULL,
  sent            BOOLEAN DEFAULT FALSE,
  sent_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.log_reminders IS '4-week follow-up email reminders for protocol outcome logging.';

-- ──────────────────────────────────────────────────────────────
-- 6. INDEXES
-- ──────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_logs_peptide ON public.protocol_logs USING GIN (peptide_slugs);
CREATE INDEX IF NOT EXISTS idx_logs_vendor ON public.protocol_logs (vendor_slug);
CREATE INDEX IF NOT EXISTS idx_logs_user ON public.protocol_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_logs_status ON public.protocol_logs (status) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_logs_goal ON public.protocol_logs (goal_slug);
CREATE INDEX IF NOT EXISTS idx_reminders_pending ON public.log_reminders (remind_at) WHERE sent = FALSE;

-- ──────────────────────────────────────────────────────────────
-- 7. ROW LEVEL SECURITY
-- ──────────────────────────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protocol_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receipt_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.log_reminders ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone can read, users update their own
CREATE POLICY "Public read profiles"
  ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Protocol logs: anyone reads published, users manage their own
CREATE POLICY "Public read published logs"
  ON public.protocol_logs FOR SELECT USING (status = 'published');
CREATE POLICY "Users insert own logs"
  ON public.protocol_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own logs"
  ON public.protocol_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own logs"
  ON public.protocol_logs FOR DELETE USING (auth.uid() = user_id);

-- Receipt verifications: users manage their own
CREATE POLICY "Users manage own receipts"
  ON public.receipt_verifications FOR ALL USING (auth.uid() = user_id);

-- Vendor flags: insert only (adjudication done via service role)
CREATE POLICY "Insert vendor flags"
  ON public.vendor_flags FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read vendor flags"
  ON public.vendor_flags FOR SELECT USING (true);

-- Log reminders: users manage their own
CREATE POLICY "Users manage own reminders"
  ON public.log_reminders FOR ALL USING (auth.uid() = user_id);

-- ──────────────────────────────────────────────────────────────
-- 8. AUTO-CREATE PROFILE ON AUTH SIGNUP (trigger)
-- ──────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (
    NEW.id,
    'Researcher-' || substr(NEW.id::text, 1, 6)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ──────────────────────────────────────────────────────────────
-- 9. AUTO-UPDATE updated_at TIMESTAMP
-- ──────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE OR REPLACE TRIGGER set_updated_at_logs
  BEFORE UPDATE ON public.protocol_logs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ──────────────────────────────────────────────────────────────
-- 10. MATERIALIZED VIEWS (weighted aggregation)
--
-- Weighting: lab_confirmed=3x, verified_buyer=2x, self_reported=1x
-- Returns NULL for averages when sample count < 5
-- ──────────────────────────────────────────────────────────────

-- Per (peptide, vendor) pair — THE KILLER VIEW
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_peptide_vendor_stats AS
WITH weighted AS (
  SELECT
    unnest(peptide_slugs) AS peptide_slug,
    vendor_slug,
    efficacy_score,
    side_effect_score,
    would_repeat,
    frequency,
    duration_weeks,
    verification_level,
    CASE verification_level
      WHEN 'lab_confirmed'  THEN 3
      WHEN 'verified_buyer' THEN 2
      ELSE 1
    END AS weight
  FROM public.protocol_logs
  WHERE status = 'published'
)
SELECT
  peptide_slug,
  vendor_slug,
  COUNT(*)                                                              AS log_count,
  CASE WHEN COUNT(*) >= 5
    THEN ROUND(SUM(efficacy_score * weight)::numeric / SUM(weight), 1)
    ELSE NULL
  END                                                                    AS avg_efficacy,
  CASE WHEN COUNT(*) >= 5
    THEN ROUND(SUM(side_effect_score * weight)::numeric / SUM(weight), 1)
    ELSE NULL
  END                                                                    AS avg_side_effects,
  CASE WHEN COUNT(*) >= 5
    THEN ROUND(100.0 * COUNT(*) FILTER (WHERE would_repeat) / COUNT(*), 0)
    ELSE NULL
  END                                                                    AS repeat_pct,
  COUNT(*) FILTER (WHERE verification_level = 'verified_buyer')          AS verified_count,
  COUNT(*) FILTER (WHERE verification_level = 'lab_confirmed')           AS lab_confirmed_count,
  mode() WITHIN GROUP (ORDER BY frequency)                               AS most_common_frequency,
  ROUND(AVG(duration_weeks), 0)                                          AS avg_duration_weeks
FROM weighted
GROUP BY peptide_slug, vendor_slug;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_pvs_pair
  ON mv_peptide_vendor_stats (peptide_slug, vendor_slug);

-- Per peptide aggregate (for library pages)
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_peptide_stats AS
WITH weighted AS (
  SELECT
    unnest(peptide_slugs) AS peptide_slug,
    efficacy_score, side_effect_score, would_repeat,
    CASE verification_level
      WHEN 'lab_confirmed'  THEN 3
      WHEN 'verified_buyer' THEN 2
      ELSE 1
    END AS weight
  FROM public.protocol_logs
  WHERE status = 'published'
)
SELECT
  peptide_slug,
  COUNT(*)                                        AS log_count,
  CASE WHEN COUNT(*) >= 5
    THEN ROUND(SUM(efficacy_score * weight)::numeric / SUM(weight), 1)
    ELSE NULL
  END                                             AS avg_efficacy,
  CASE WHEN COUNT(*) >= 5
    THEN ROUND(SUM(side_effect_score * weight)::numeric / SUM(weight), 1)
    ELSE NULL
  END                                             AS avg_side_effects,
  CASE WHEN COUNT(*) >= 5
    THEN ROUND(100.0 * COUNT(*) FILTER (WHERE would_repeat) / COUNT(*), 0)
    ELSE NULL
  END                                             AS repeat_pct
FROM weighted
GROUP BY peptide_slug;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_ps_slug
  ON mv_peptide_stats (peptide_slug);

-- Per vendor aggregate (for vendor review pages)
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_vendor_stats AS
WITH weighted AS (
  SELECT
    vendor_slug,
    efficacy_score, side_effect_score, would_repeat,
    CASE verification_level
      WHEN 'lab_confirmed'  THEN 3
      WHEN 'verified_buyer' THEN 2
      ELSE 1
    END AS weight
  FROM public.protocol_logs
  WHERE status = 'published'
)
SELECT
  vendor_slug,
  COUNT(*)                                        AS log_count,
  CASE WHEN COUNT(*) >= 5
    THEN ROUND(SUM(efficacy_score * weight)::numeric / SUM(weight), 1)
    ELSE NULL
  END                                             AS avg_efficacy,
  CASE WHEN COUNT(*) >= 5
    THEN ROUND(SUM(side_effect_score * weight)::numeric / SUM(weight), 1)
    ELSE NULL
  END                                             AS avg_side_effects,
  CASE WHEN COUNT(*) >= 5
    THEN ROUND(100.0 * COUNT(*) FILTER (WHERE would_repeat) / COUNT(*), 0)
    ELSE NULL
  END                                             AS repeat_pct
FROM weighted
GROUP BY vendor_slug;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_vs_slug
  ON mv_vendor_stats (vendor_slug);
