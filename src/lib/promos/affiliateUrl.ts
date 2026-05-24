/**
 * Affiliate URL Builder
 * =====================
 * Strips pre-baked UTMs from vendor affiliateUrl and appends canonical
 * per-surface UTM parameters for accurate GA4 / attribution tracking.
 *
 * All affiliate links on the site should use buildAffiliateUrl() to ensure:
 *  - Consistent UTM schema across surfaces
 *  - rel="sponsored nofollow" on every rendered anchor
 *  - Surface-level segmentation in GA4
 */

import type { PromoCode } from "./config";

// ── Surface Labels ─────────────────────────────────────────────────────────────

export type PromoSurface =
  | "sticky_banner"
  | "library_buy_block"
  | "exit_intent_modal"
  | "tool_calculator"
  | "tool_cycle_planner"
  | "tool_pricing"
  | "tool_coa"
  | "footer_reminder"
  | "hero_return_visitor"
  | "vendor_review"
  | "stack_page"
  | "best_page"
  | "buy_page"
  | "where_to_buy"
  | "buy_box"
  | "stack_card"
  | "stack_cart_builder"
  | "vendor_comparison_row"
  | "smart_vendor_picker"
  | "price_drop_alert"
  | "peptide_x_vendor_page"
  | "coa_vendor_cta"
  | "goal_page"
  | "stack_builder";

// ── URL Builder ───────────────────────────────────────────────────────────────

/**
 * Build a canonical affiliate URL for a given promo and surface.
 * Strips existing UTM params and appends canonical ones.
 */
export function buildAffiliateUrl(
  promo: PromoCode,
  surface: PromoSurface | string
): string {
  try {
    // Parse base URL, stripping existing UTM params
    const base = promo.shopUrl.split("?")[0];
    const existingParams = new URLSearchParams(promo.shopUrl.split("?")[1] ?? "");

    // Keep non-UTM vendor-specific params (e.g., aff_id, offer_id, ref codes).
    // NOTE: We intentionally do NOT exclude "code" here — it is kept from the
    // existing URL if present, and then explicitly overwritten below from
    // promo.code (the authoritative source), ensuring it always survives.
    const keepParams = new URLSearchParams();
    existingParams.forEach((value, key) => {
      if (!key.startsWith("utm_")) {
        keepParams.set(key, value);
      }
    });

    // Build final URL with canonical UTMs + promo code
    const params = new URLSearchParams(keepParams);
    params.set("utm_source", "peptidex");
    params.set("utm_medium", "affiliate");
    params.set("utm_campaign", "peptidex_code");
    params.set("utm_content", surface);
    // Always append the promo code from the canonical PromoCode source.
    // This ensures code=PEPTIDEX survives even if the base affiliateUrl
    // doesn't include it (e.g., after UTM migration strips the query string).
    if (promo.code) {
      params.set("code", promo.code);
    }

    return `${base}?${params.toString()}`;
  } catch {
    // Fallback: return original URL if parsing fails
    return promo.shopUrl;
  }
}

/**
 * Standard anchor attributes for affiliate links.
 * Use these on every <a> that links to a vendor.
 */
export const AFFILIATE_LINK_ATTRS = {
  rel: "sponsored nofollow noopener",
  target: "_blank",
} as const;
