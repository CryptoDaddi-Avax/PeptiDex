/**
 * Promo Code Config — Single Source of Truth
 * ============================================
 * Derives from src/data/vendors.ts — do NOT hardcode vendor names/codes here.
 * To add/remove a promo, update vendors.ts and set isActive accordingly.
 *
 * Priority 1 = PRIMARY (featured everywhere)
 * Priority 2 = SECONDARY (shown in comparison tables / WhereToBuy)
 */

import { vendors, type Vendor } from "@/data/vendors";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PromoCode {
  /** Matches Vendor.slug */
  vendorSlug: string;
  /** Display name */
  vendorName: string;
  /** The promo code string */
  code: string;
  /** Discount percentage (integer) */
  discountPercent: number;
  /** Base affiliate URL — UTMs are appended dynamically via buildAffiliateUrl() */
  shopUrl: string;
  /** Badge label e.g. "Editor's Choice" */
  badge?: string;
  /** Whether the code is currently active */
  isActive: boolean;
  /** 1 = primary featured, 2 = secondary */
  priority: number;
  /** Whether the code stacks with active sales */
  stackable: boolean;
  /** ISO expiry date, if time-limited */
  expiresAt?: string;
  /** GA4 vendor key for event tracking */
  gaKey: string;
}

// ── Priority Map ──────────────────────────────────────────────────────────────
// Defines which vendors get which priority tier for promo surfaces.
// Amino Club = PRIMARY (highest discount, Editor's Choice).
// Bio Longevity Labs = SECONDARY (stackable discount).
// Others = not featured in promo surfaces (still have codes, but not promoted).

const PROMO_PRIORITY: Record<string, number> = {
  "amino-club": 1,
  "bio-longevity-labs": 2,
};

// ── Build PROMO_CODES from vendor data ───────────────────────────────────────

function vendorToPromo(v: Vendor): PromoCode | null {
  if (!v.discountCode || !v.discountPercent) return null;
  const priority = PROMO_PRIORITY[v.slug] ?? 3; // 3 = not featured in promo UI
  return {
    vendorSlug: v.slug,
    vendorName: v.name,
    code: v.discountCode,
    discountPercent: v.discountPercent,
    shopUrl: v.affiliateUrl,
    badge: v.badge,
    isActive: true, // all vendors active — override here if a code expires
    priority,
    stackable: v.discountStackable ?? false,
    gaKey: v.gaKey,
  };
}

/** All active promo codes, sorted by priority */
export const PROMO_CODES: PromoCode[] = vendors
  .map(vendorToPromo)
  .filter((p): p is PromoCode => p !== null)
  .sort((a, b) => a.priority - b.priority);

/** Primary promo (priority 1, isActive) */
export const PRIMARY_PROMO: PromoCode =
  PROMO_CODES.find((p) => p.priority === 1 && p.isActive) ?? PROMO_CODES[0];

/** Secondary promo (priority 2, isActive) */
export const SECONDARY_PROMO: PromoCode | undefined =
  PROMO_CODES.find((p) => p.priority === 2 && p.isActive);

// ── Helper Functions ──────────────────────────────────────────────────────────

/** All active promo codes */
export function getActivePromos(): PromoCode[] {
  return PROMO_CODES.filter((p) => p.isActive);
}

/** Primary active promo (highest priority) */
export function getPrimaryPromo(): PromoCode {
  return PRIMARY_PROMO;
}

/** Featured promos (priority 1 or 2, active) — for WhereToBuy surfaces */
export function getFeaturedPromos(): PromoCode[] {
  return PROMO_CODES.filter((p) => p.isActive && p.priority <= 2);
}

/** Get promo for a specific vendor slug */
export function getPromoForVendor(slug: string): PromoCode | undefined {
  return PROMO_CODES.find((p) => p.vendorSlug === slug && p.isActive);
}

/** Toggle to enable/disable the personalized hero variant */
export const PERSONALIZED_HERO_ENABLED = true;
