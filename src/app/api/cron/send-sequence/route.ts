/**
 * /api/cron/send-sequence
 * =======================
 * Runs every 15 minutes via crontab on the VPS.
 * Picks up pending email_queue rows where send_at <= NOW()
 * and sends them via Resend.
 * 
 * Protected by CRON_SECRET header.
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { sendSequenceEmail } from "@/lib/email/welcome-sequence";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  // Auth check
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY!);
  const now = new Date().toISOString();

  // Fetch up to 50 pending emails due to send
  const { data: pending, error: fetchError } = await supabase
    .from("email_queue")
    .select(`
      id,
      email_key,
      subscriber_id,
      newsletter_subscribers!inner (
        email,
        first_name,
        unsubscribed
      )
    `)
    .lte("send_at", now)
    .is("sent_at", null)
    .is("failed_at", null)
    .order("send_at", { ascending: true })
    .limit(50);

  if (fetchError) {
    console.error("[send-sequence] Fetch error:", fetchError);
    return NextResponse.json({ error: "DB fetch error" }, { status: 500 });
  }

  if (!pending || pending.length === 0) {
    return NextResponse.json({ success: true, sent: 0, message: "No pending emails" });
  }

  const results = { sent: 0, skipped: 0, failed: 0 };

  for (const row of pending) {
    const sub = row.newsletter_subscribers as unknown as {
      email: string;
      first_name: string | null;
      unsubscribed: boolean;
    };

    // Skip unsubscribed
    if (sub.unsubscribed) {
      await supabase.from("email_queue").update({ sent_at: now }).eq("id", row.id);
      results.skipped++;
      continue;
    }

    const result = await sendSequenceEmail(
      resend,
      sub.email,
      row.email_key,
      sub.first_name || undefined
    );

    if (result.success) {
      await supabase
        .from("email_queue")
        .update({ sent_at: now, resend_id: result.id })
        .eq("id", row.id);
      results.sent++;
    } else {
      await supabase
        .from("email_queue")
        .update({ failed_at: now, error_msg: result.error })
        .eq("id", row.id);
      results.failed++;
      console.error(`[send-sequence] Failed for ${sub.email} (${row.email_key}):`, result.error);
    }
  }

  console.log(`[send-sequence] Done: ${results.sent} sent, ${results.skipped} skipped, ${results.failed} failed`);

  return NextResponse.json({
    success: true,
    ...results,
    total: pending.length,
  });
}
