import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/price-alerts
 * Stores a price drop alert request.
 * 
 * For now: writes to a JSON log file (serverless-safe).
 * TODO: Migrate to Supabase `price_alerts` table when cron is wired.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, peptideSlug, targetPrice, currentPrice } = body;

    // Basic validation
    if (!email || !peptideSlug || !targetPrice) {
      return NextResponse.json(
        { error: "Missing required fields: email, peptideSlug, targetPrice" },
        { status: 400 }
      );
    }

    // Email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Log the alert (console for now — will be replaced with Supabase insert)
    console.log("[PriceAlert]", {
      email,
      peptideSlug,
      targetPrice,
      currentPrice,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, message: "Alert registered" });
  } catch (err) {
    console.error("[PriceAlert] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
