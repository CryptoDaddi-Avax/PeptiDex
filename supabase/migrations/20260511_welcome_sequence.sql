-- ─────────────────────────────────────────────────────────────────────────────
-- Welcome Sequence Email Queue
-- Run in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

-- Subscriber table — one row per subscriber
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id            BIGSERIAL PRIMARY KEY,
  email         TEXT        NOT NULL UNIQUE,
  first_name    TEXT,
  source        TEXT        NOT NULL DEFAULT 'unknown',
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed  BOOLEAN     NOT NULL DEFAULT false,
  utm_source    TEXT,
  utm_medium    TEXT,
  utm_campaign  TEXT
);

CREATE INDEX IF NOT EXISTS idx_ns_email ON newsletter_subscribers (email);
CREATE INDEX IF NOT EXISTS idx_ns_subscribed_at ON newsletter_subscribers (subscribed_at);

-- Email queue — one row per scheduled email
CREATE TABLE IF NOT EXISTS email_queue (
  id            BIGSERIAL PRIMARY KEY,
  subscriber_id BIGINT      NOT NULL REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,
  email_key     TEXT        NOT NULL,   -- 'welcome', 'coa', 'vendors', etc.
  send_at       TIMESTAMPTZ NOT NULL,   -- when to send
  sent_at       TIMESTAMPTZ,            -- null = pending
  failed_at     TIMESTAMPTZ,
  error_msg     TEXT,
  resend_id     TEXT                    -- Resend message ID on success
);

CREATE INDEX IF NOT EXISTS idx_eq_pending  ON email_queue (send_at) WHERE sent_at IS NULL AND failed_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_eq_sub      ON email_queue (subscriber_id);

-- RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;

-- Service role full access
DROP POLICY IF EXISTS "service_all_subscribers" ON newsletter_subscribers;
CREATE POLICY "service_all_subscribers"
  ON newsletter_subscribers FOR ALL TO service_role
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_all_queue" ON email_queue;
CREATE POLICY "service_all_queue"
  ON email_queue FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- Anon can insert subscribers (from frontend signup)
DROP POLICY IF EXISTS "anon_insert_subscribers" ON newsletter_subscribers;
CREATE POLICY "anon_insert_subscribers"
  ON newsletter_subscribers FOR INSERT TO anon
  WITH CHECK (true);
