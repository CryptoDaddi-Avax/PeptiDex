-- Increment log count RPC function
-- Run this in Supabase SQL Editor after the main migration

CREATE OR REPLACE FUNCTION increment_log_count(user_id_input UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET log_count = (
    SELECT COUNT(*) FROM public.protocol_logs
    WHERE user_id = user_id_input AND status = 'published'
  )
  WHERE id = user_id_input;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
