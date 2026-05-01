/**
 * Centralized GA4 event tracking utilities.
 * Uses the gtag global injected by @next/third-parties/google.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// ─── Vendor key type ─────────────────────────────────────────────────────────
export type AffiliateVendor =
  | "amino_club"
  | "bio_longevity_labs"
  | "limitless_life"
  | "ascension"
  | "pantheon"
  | "lvlup_health";

// ─── Source component type ────────────────────────────────────────────────────
export type AffiliateSource =
  | "vendor_card"      // /vendors page cards + homepage vendor cards
  | "pricing_table"    // /tools/pricing rows
  | "detail_sourcing"  // peptide detail page sourcing block
  | "blog_cta"         // explicit CTA buttons in blog posts
  | "blog_inline"      // inline text mentions inside blog paragraphs
  | "footer"           // footer / sidebar mentions
  | "newsletter"       // email-driven clicks via UTM
  | "stack_price"      // stack price aggregator (inline on stack pages)
  | "calculator"       // dosage calculator sourcing CTA
  | "sticky_bar"       // sticky quick-compare bar on detail pages
  | "coa_modal";       // COA badge modal external link

// ─── Derive vendor key from URL ───────────────────────────────────────────────
export function vendorKeyFromUrl(url: string): AffiliateVendor | "unknown" {
  if (url.includes("aminoclub.com")) return "amino_club";
  if (url.includes("biolongevitylabs.com")) return "bio_longevity_labs";
  if (url.includes("kb6dp3dq.com")) return "limitless_life";
  if (url.includes("ascensionpeptides.com")) return "ascension";
  if (url.includes("pantheonpeptides.com")) return "pantheon";
  if (url.includes("lvluphealth.com")) return "lvlup_health";
  return "unknown";
}

// ─── Primary affiliate click event ───────────────────────────────────────────
/**
 * Fire a GA4 `affiliate_click` event with rich segmentation params.
 * This is the canonical tracking function — use this for all revenue-driving clicks.
 */
export function trackAffiliateClick({
  vendor,
  peptide = "general",
  source_component,
  url,
  discount_code,
}: {
  vendor: AffiliateVendor | "unknown";
  peptide?: string;
  source_component: AffiliateSource | string;
  url: string;
  discount_code?: string;
}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "affiliate_click", {
      vendor,
      peptide,
      source_page: window.location.pathname,
      source_component,
      outbound_url: url,
      ...(discount_code ? { discount_code } : {}),
    });
  }
}

/**
 * Legacy: Track an outbound click to a vendor's external site.
 * Fires `outbound_click` for backwards compatibility.
 * Prefer `trackAffiliateClick` for new work.
 */
export function trackOutboundClick(
  vendorName: string,
  url: string,
  location: string
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "outbound_click", {
      vendor_name: vendorName,
      outbound_url: url,
      click_location: location,
    });
  }
}

/**
 * Track a "Save Stack" action.
 */
export function trackSaveStack(stackName: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "save_stack", {
      stack_name: stackName,
    });
  }
}

/**
 * Track CTA engagement — when a user clicks a primary action card.
 */
export function trackCTAClick(ctaLabel: string, destination: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "cta_click", {
      cta_label: ctaLabel,
      destination: destination,
    });
  }
}
