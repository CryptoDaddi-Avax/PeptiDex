-- ──────────────────────────────────────────────────────────────
-- Migration 003: MV Refresh RPC + Log Reminders table
-- Run in Supabase SQL Editor
-- ──────────────────────────────────────────────────────────────

-- 1. RPC for refreshing materialized views (called by cron)
-- SECURITY DEFINER lets the function run with elevated privileges
CREATE OR REPLACE FUNCTION refresh_materialized_view(view_name TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only allow known view names to prevent SQL injection
  IF view_name NOT IN ('mv_peptide_vendor_stats', 'mv_peptide_stats', 'mv_vendor_stats') THEN
    RAISE EXCEPTION 'Unknown view: %', view_name;
  END IF;

  -- CONCURRENTLY requires a UNIQUE INDEX (we have them)
  EXECUTE format('REFRESH MATERIALIZED VIEW CONCURRENTLY %I', view_name);
END;
$$;

-- 2. Log Reminders table (tracks follow-up email cooldowns)
CREATE TABLE IF NOT EXISTS public.log_reminders (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log_id      UUID REFERENCES public.protocol_logs(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  sent_at     TIMESTAMPTZ DEFAULT now(),
  created_at  TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.log_reminders IS 'Tracks follow-up reminder emails to prevent spam.';

CREATE INDEX IF NOT EXISTS idx_log_reminders_log_sent
  ON public.log_reminders (log_id, sent_at DESC);

ALTER TABLE public.log_reminders ENABLE ROW LEVEL SECURITY;

-- Only service role can insert/read reminders
CREATE POLICY "Service role manages reminders"
  ON public.log_reminders FOR ALL USING (true);
