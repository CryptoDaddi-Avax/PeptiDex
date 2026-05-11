/**
 * POST /api/cron/affiliate-report
 * ─────────────────────────────────────────────────────────────
 * Sends the daily affiliate analytics summary email.
 * Called by the VPS cron scheduler (or Vercel Cron) at 07:00 UTC.
 *
 * Security: requires CRON_SECRET header.
 * Recipient: ANALYTICS_EMAIL_TO env var (defaults to admin email).
 */
import { NextRequest, NextResponse } from "next/server";
import { getDailyEmailStats } from "@/lib/analytics/affiliate-stats";
import { dailyAffiliateEmail } from "@/lib/email/affiliate-report";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  // Auth check
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const to = process.env.ANALYTICS_EMAIL_TO;
  if (!to) {
    return NextResponse.json(
      { error: "ANALYTICS_EMAIL_TO not configured" },
      { status: 500 }
    );
  }

  try {
    const stats = await getDailyEmailStats();
    const template = dailyAffiliateEmail(stats);
    const sent = await sendEmail(to, template);

    if (!sent) {
      return NextResponse.json(
        { error: "Email send failed — check RESEND_API_KEY" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      stats: {
        yesterday_clicks: stats.yesterday.clicks,
        yesterday_conversions: stats.yesterday.conversions,
        sent_to: to,
      },
    });
  } catch (err) {
    console.error("[cron/affiliate-report]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// Allow GET for manual trigger via curl
export async function GET(req: NextRequest) {
  return POST(req);
}
