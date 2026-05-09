/**
 * Affiliate Data-Access Layer — Shared by all conversion surfaces
 * ================================================================
 * Single import point composing vendors.ts + vendor-pricing.ts +
 * applyDiscount.ts + affiliateUrl.ts into component-ready data.
 *
 * No component should import vendor-pricing.ts directly after this ships.
 */

import { type Vendor, vendorBySlug, vendorsSorted } from "@/data/vendors";
import { vendorPricing, type VendorPrice } from "@/data/vendor-pricing";
import {
  applyDiscount,
  buildVendorDiscount,
  type DiscountResult,
} from "@/lib/pricing/applyDiscount";
import {
  buildAffiliateUrl,
  AFFILIATE_LINK_ATTRS,
  type PromoSurface,
} from "@/lib/promos/affiliateUrl";
import {
  getPromoForVendor,
  type PromoCode,
} from "@/lib/promos/config";
import {
  trackAffiliateClick,
  vendorKeyFromUrl,
  type AffiliateSource,
} from "@/lib/ga4-events";

// ── Re-exports ──────────────────────────────────────────────────────────────

export { AFFILIATE_LINK_ATTRS } from "@/lib/promos/affiliateUrl";
export type { PromoSurface } from "@/lib/promos/affiliateUrl";
export type { DiscountResult } from "@/lib/pricing/applyDiscount";

// ── Output types ────────────────────────────────────────────────────────────

export interface EnrichedVendorOffer {
  vendor: Vendor;
  price_usd: number;
  vial_mg: number;
  costPerMg: number;
  discount: DiscountResult;
  affiliateUrl: string;
  trackedUrl: string;
  inStock: boolean;
  isCheapest: boolean;
  promo: PromoCode | undefined;
  /** COA PDF URL from VendorPrice row (may also fall back to Vendor.coaUrl) */
  coaUrl: string | undefined;
  /** Last test date string from VendorPrice row */
  lastTestedDate: string | undefined;
}

export interface PeptideVendorBundle {
  peptideSlug: string;
  peptideName: string;
  offers: EnrichedVendorOffer[];
  cheapestOffer: EnrichedVendorOffer | null;
  avgListPrice: number | null;
}

// ── Internal helpers ────────────────────────────────────────────────────────

/** Resolve a vendor name string from vendor-pricing.ts to a Vendor object */
function resolveVendor(vendorName: string): Vendor | undefined {
  // vendor-pricing uses display names; vendors.ts uses the same in .name
  return vendorsSorted.find(v => v.name === vendorName);
}

/** Build a tracked affiliate URL for any vendor + surface */
export function buildTrackedAffiliateUrl(
  vendor: Vendor,
  surface: PromoSurface | string,
  rawUrl?: string
): string {
  const promo = getPromoForVendor(vendor.slug);
  if (promo) {
    return buildAffiliateUrl(promo, surface);
  }
  // Vendor has no promo — manually append UTMs
  const baseUrl = rawUrl ?? vendor.affiliateUrl;
  try {
    const [base, qs] = baseUrl.split("?");
    const params = new URLSearchParams(qs ?? "");
    // Strip existing UTMs
    [...params.keys()].filter(k => k.startsWith("utm_")).forEach(k => params.delete(k));
    params.set("utm_source", "peptidex");
    params.set("utm_medium", "affiliate");
    params.set("utm_content", surface);
    return `${base}?${params.toString()}`;
  } catch {
    return baseUrl;
  }
}

/** Enrich a single VendorPrice row into an EnrichedVendorOffer */
function enrichRow(
  vp: VendorPrice,
  vendor: Vendor,
  peptideSlug: string,
  surface: PromoSurface | string
): EnrichedVendorOffer {
  const discountDescriptor = buildVendorDiscount(
    vendor.discountCode,
    vendor.discountPercent,
    vendor.discountStackable
  );
  const discount = applyDiscount(vp.price_usd, discountDescriptor, peptideSlug);
  const costPerMg = vp.vial_mg > 0 ? vp.price_usd / vp.vial_mg : 0;
  const promo = getPromoForVendor(vendor.slug);

  return {
    vendor,
    price_usd: vp.price_usd,
    vial_mg: vp.vial_mg,
    costPerMg,
    discount,
    affiliateUrl: vp.affiliateUrl,
    trackedUrl: buildTrackedAffiliateUrl(vendor, surface, vp.affiliateUrl),
    inStock: vp.inStock,
    isCheapest: false, // set after sorting
    promo,
    // Prefer per-peptide COA URL from vendor-pricing row; fall back to vendor-level coaUrl
    coaUrl: vp.coaUrl ?? vendor.coaUrl,
    lastTestedDate: vp.lastTestedDate ?? vendor.lastTestedDate,
  };
}

// ── Core functions ──────────────────────────────────────────────────────────

/**
 * Get all priced, in-stock vendor offers for a peptide,
 * sorted by cost-per-mg ascending. $0 and OOS rows excluded.
 */
export function getAllVendorsForPeptide(
  peptideSlug: string,
  surface: PromoSurface | string
): EnrichedVendorOffer[] {
  const entry = vendorPricing.find(
    p => p.slug === peptideSlug || p.name.toLowerCase() === peptideSlug.toLowerCase()
  );
  if (!entry) return [];

  const offers: EnrichedVendorOffer[] = [];
  for (const vp of entry.vendors) {
    if (!vp.inStock || !vp.price_usd || vp.price_usd <= 0) continue;
    const vendor = resolveVendor(vp.vendor);
    if (!vendor) continue;
    offers.push(enrichRow(vp, vendor, peptideSlug, surface));
  }

  // Sort by cost-per-mg (valid costPerMg first, then 0s last)
  offers.sort((a, b) => {
    const aVal = a.costPerMg > 0 ? a.costPerMg : Infinity;
    const bVal = b.costPerMg > 0 ? b.costPerMg : Infinity;
    return aVal - bVal;
  });

  // Mark cheapest by finalPrice
  if (offers.length > 0) {
    const minFinal = Math.min(...offers.map(o => o.discount.finalPrice));
    for (const o of offers) {
      o.isCheapest = o.discount.finalPrice === minFinal;
    }
  }

  return offers;
}

/**
 * Top N vendors for a peptide, sorted by cost-per-mg.
 * Default limit = 3.
 */
export function getTopVendorsForPeptide(
  peptideSlug: string,
  surface: PromoSurface | string,
  limit = 3
): EnrichedVendorOffer[] {
  return getAllVendorsForPeptide(peptideSlug, surface).slice(0, limit);
}

/**
 * Single cheapest vendor (by discounted finalPrice).
 */
export function getCheapestVendor(
  peptideSlug: string,
  surface: PromoSurface | string
): EnrichedVendorOffer | null {
  const offers = getAllVendorsForPeptide(peptideSlug, surface);
  if (offers.length === 0) return null;
  return offers.reduce((best, o) =>
    o.discount.finalPrice < best.discount.finalPrice ? o : best
  );
}

/**
 * Full bundle (all offers + aggregates) for a peptide.
 */
export function getPeptideVendorBundle(
  peptideSlug: string,
  surface: PromoSurface | string
): PeptideVendorBundle {
  const entry = vendorPricing.find(
    p => p.slug === peptideSlug || p.name.toLowerCase() === peptideSlug.toLowerCase()
  );
  const offers = getAllVendorsForPeptide(peptideSlug, surface);
  const prices = offers.map(o => o.price_usd);
  const avgListPrice = prices.length > 0
    ? Math.round((prices.reduce((a, b) => a + b, 0) / prices.length) * 100) / 100
    : null;

  return {
    peptideSlug,
    peptideName: entry?.name ?? peptideSlug,
    offers,
    cheapestOffer: offers.length > 0
      ? offers.reduce((best, o) => o.discount.finalPrice < best.discount.finalPrice ? o : best)
      : null,
    avgListPrice,
  };
}

/**
 * Calculate total cart cost for a list of peptides at a specific vendor.
 * Returns total, savings, matched items, and count of missing peptides.
 */
export function calculateStackCost(
  peptideSlugs: string[],
  vendorSlug: string,
  surface: PromoSurface | string
): { total: number; savings: number; items: EnrichedVendorOffer[]; missingCount: number } {
  const items: EnrichedVendorOffer[] = [];
  let missingCount = 0;

  for (const slug of peptideSlugs) {
    const offers = getAllVendorsForPeptide(slug, surface);
    const match = offers.find(o => o.vendor.slug === vendorSlug);
    if (match) {
      items.push(match);
    } else {
      missingCount++;
    }
  }

  const total = items.reduce((sum, o) => sum + o.discount.finalPrice, 0);
  const savings = items.reduce((sum, o) => sum + o.discount.savings, 0);

  return {
    total: Math.round(total * 100) / 100,
    savings: Math.round(savings * 100) / 100,
    items,
    missingCount,
  };
}

/**
 * Score a vendor for the SmartVendorPicker quiz.
 */
export interface PickerAnswers {
  peptideSlug: string;
  region: "us" | "eu" | "intl";
  payment: "card" | "crypto" | "any";
  priority: "price" | "purity" | "speed";
}

export function scoreVendorForUser(
  offer: EnrichedVendorOffer,
  answers: PickerAnswers
): number {
  const v = offer.vendor;

  // Region filter
  const regionMatch =
    answers.region === "us" ? v.shipsTo.some(s => s.toUpperCase().includes("US")) :
    answers.region === "eu" ? v.shipsTo.some(s => s.toUpperCase().includes("EU") || s.toUpperCase().includes("INTERNATIONAL")) :
    v.shipsTo.some(s => s.toUpperCase().includes("INTERNATIONAL"));
  if (!regionMatch) return -1;

  // Payment filter
  if (answers.payment !== "any") {
    const wanted = answers.payment === "card" ? "CREDIT" : "CRYPTO";
    const accepted = v.paymentMethods.map(m => m.toUpperCase()).join(" ");
    if (!accepted.includes(wanted)) return -1;
  }

  // Weights based on priority
  const w = answers.priority === "price"
    ? { price: 60, purity: 15, speed: 10, rating: 15 }
    : answers.priority === "purity"
    ? { price: 20, purity: 45, speed: 15, rating: 20 }
    : { price: 20, purity: 15, speed: 45, rating: 20 };

  // Normalize scores to 0-100
  const priceScore = offer.costPerMg > 0 ? Math.max(0, 100 - offer.costPerMg * 2) : 50;
  const purityNum = parseFloat(v.purity.replace(/[^0-9.]/g, "")) || 95;
  const purityScore = Math.min(100, (purityNum / 100) * 100);
  const speedDays = parseInt(v.shippingSpeed.replace(/[^0-9]/g, ""), 10) || 5;
  const speedScore = Math.max(0, 100 - speedDays * 10);
  const ratingScore = (v.rating / 5) * 100;

  return (
    (priceScore * w.price +
      purityScore * w.purity +
      speedScore * w.speed +
      ratingScore * w.rating) / 100
  );
}

/**
 * Fire GA4 affiliate_click with full context.
 */
export function trackClick(
  offer: EnrichedVendorOffer,
  surface: AffiliateSource | string,
  peptideSlug?: string
): void {
  trackAffiliateClick({
    vendor: vendorKeyFromUrl(offer.affiliateUrl),
    peptide: peptideSlug ?? "general",
    source_component: surface,
    url: offer.trackedUrl,
    discount_code: offer.vendor.discountCode,
  });
}
