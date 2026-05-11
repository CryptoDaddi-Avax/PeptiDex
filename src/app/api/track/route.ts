/**
 * POST /api/track
 * ─────────────────────────────────────────────────────────────
 * Logs affiliate click events to Supabase `affiliate_clicks` table.
 *
 * Privacy guarantees:
 *  - No IP address stored (not read from request).
 *  - No User-Agent stored (not read from request).
 *  - No cookies or auth tokens processed.
 *  - session_id is a client-generated daily-rotating SHA-256 hash.
 *    It cannot be traced back to an individual.
 *  - Only: peptide_slug, vendor_slug, page_path, surface, session_id, timestamp.
 *
 * Rate limiting: max 10 events per session_id per minute (checked in DB).
 */
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

interface TrackPayload {
  peptide_slug: string;
  vendor_slug: string;
  page_path: string;
  surface: string;
  session_id: string;
  timestamp: string;
}

// Validate and sanitize a string field
function sanitize(val: unknown, maxLen: number): string {
  if (typeof val !== "string") return "unknown";
  return val.slice(0, maxLen).replace(/[^\w\-./: ]/g, "").trim() || "unknown";
}

export async function POST(req: NextRequest) {
  let body: Partial<TrackPayload>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Sanitize all fields — never trust client input
  const peptide_slug = sanitize(body.peptide_slug, 80);
  const vendor_slug = sanitize(body.vendor_slug, 60);
  const page_path = sanitize(body.page_path, 250);
  const surface = sanitize(body.surface, 60);
  const session_id = sanitize(body.session_id, 64);

  // Validate timestamp or use server time
  let timestamp: string;
  try {
    const t = new Date(body.timestamp ?? "");
    // Reject timestamps more than 5 minutes in the future or past
    const diff = Math.abs(Date.now() - t.getTime());
    timestamp = diff < 5 * 60 * 1000 ? t.toISOString() : new Date().toISOString();
  } catch {
    timestamp = new Date().toISOString();
  }

  try {
    const supabase = createServerClient();

    // Rate limit: check events from this session in the last minute
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;
    const { count } = await sb
      .from("affiliate_clicks")
      .select("id", { count: "exact", head: true })
      .eq("session_id", session_id)
      .gte("timestamp", oneMinuteAgo);

    if ((count ?? 0) >= 10) {
      // Soft-fail — don't surface errors to client
      return NextResponse.json({ ok: true });
    }

    const { error } = await sb.from("affiliate_clicks").insert({
      peptide_slug,
      vendor_slug,
      page_path,
      surface,
      session_id,
      timestamp,
    });

    if (error) {
      console.error("[track] Supabase insert error:", error.message);
      // Return 200 anyway — tracking failures must be silent
    }
  } catch (err) {
    console.error("[track] Unexpected error:", err);
    // Return 200 — never break client navigation for analytics
  }

  return NextResponse.json({ ok: true });
}

// Conversion postback from vendor (optional webhook)
// GET /api/track?conversion=1&order_id=XYZ&vendor=limitless_life
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vendor_slug = sanitize(searchParams.get("vendor") ?? "", 60);
  const order_id = sanitize(searchParams.get("order_id") ?? "", 100);
  const peptide_slug = sanitize(searchParams.get("peptide") ?? "unknown", 80);

  if (!vendor_slug || vendor_slug === "unknown") {
    return NextResponse.json({ error: "Missing vendor" }, { status: 400 });
  }

  try {
    const supabase = createServerClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;

    await sb.from("affiliate_conversions").insert({
      vendor_slug,
      peptide_slug,
      order_id: order_id || null,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[track/conversion] Error:", err);
  }

  // Return 1x1 tracking pixel for email-based conversion postbacks
  const pixel = Buffer.from(
    "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    "base64"
  );
  return new NextResponse(pixel, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store",
    },
  });
}
