/**
 * Affiliate Click Tracker — client utility
 * ─────────────────────────────────────────────────────────────
 * Posts a click event to /api/track (fire-and-forget).
 * Runs in parallel with the GA4 event — dual-write pattern.
 *
 * Privacy: session_id is a daily-rotating hash (no PII).
 * No IP, no user-agent, no referrer is sent.
 */
import { getSessionId } from "./session";

export type TrackSurface =
  | "buy_box"
  | "pricing_table"
  | "vendor_card"
  | "detail_sourcing"
  | "blog_cta"
  | "blog_inline"
  | "stack_price"
  | "stack_card"
  | "stack_cart"
  | "sticky_bar"
  | "coa_modal"
  | "smart_picker"
  | "goal_page"
  | "compare_page"
  | "pxv_page"
  | "vendor_review"
  | "vendor_review_coa"
  | "vendor_review_pricing"
  | "vendor_review_footer"
  | "where_to_buy"
  | "footer"
  | string; // allow extension

export interface TrackClickPayload {
  peptide_slug: string;
  vendor_slug: string;
  page_path: string;
  surface: TrackSurface;
}

export async function trackClick(payload: TrackClickPayload): Promise<void> {
  if (typeof window === "undefined") return;

  const session_id = await getSessionId();

  // Fire-and-forget — don't await in call sites
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // keepalive: true ensures the request completes even if the page
    // navigates away immediately after click
    keepalive: true,
    body: JSON.stringify({
      ...payload,
      session_id,
      timestamp: new Date().toISOString(),
    }),
  }).catch(() => {
    // Intentionally silent — tracking must never break navigation
  });
}
