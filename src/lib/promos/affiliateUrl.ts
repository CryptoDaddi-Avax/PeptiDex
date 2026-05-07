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
  | "where_to_buy";

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

    // Keep non-UTM vendor-specific params (e.g., aff_id, offer_id, ref codes)
    const keepParams = new URLSearchParams();
    existingParams.forEach((value, key) => {
      if (
        !key.startsWith("utm_") &&
        key !== "code" &&
        key !== "utm_source"
      ) {
        keepParams.set(key, value);
      }
    });

    // Build final URL with canonical UTMs
    const params = new URLSearchParams(keepParams);
    params.set("utm_source", "peptidex");
    params.set("utm_medium", "affiliate");
    params.set("utm_campaign", "peptidex_code");
    params.set("utm_content", surface);

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
