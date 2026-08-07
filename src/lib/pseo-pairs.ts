/**
 * pSEO Pair Derivation — Single Source of Truth
 * ================================================
 * Determines which (peptide, vendor) pairs qualify for a programmatic
 * SEO page at /peptides/[slug]/at/[vendor].
 *
 * A pair qualifies if and only if vendor-pricing.ts contains a real
 * pricing row for that combination. Pages auto-publish when data is added.
 *
 * Created: 2026-05-11 — pSEO route architecture
 */

import { vendorPricing, type VendorPrice } from "@/data/vendor-pricing";
import { getPeptideBySlug } from "@/data/peptides";
import { vendors, vendorBySlug } from "@/data/vendors";
import type { Peptide } from "@/data/types";
import type { Vendor } from "@/data/vendors";

// ── Vendor name → slug resolution (matches vial-optimizer.ts) ───────────────

const VENDOR_NAME_TO_SLUG: Record<string, string> = {
  "Elyria Bio": "elyria-bio",
  "Amino Club": "amino-club",
  "Bio Longevity Labs": "bio-longevity-labs",
  "Limitless Life": "limitless-life",
  // "Ascension Peptides" omitted — deactivated 2026-05-24
  "Pantheon Peptides": "pantheon-peptides",
  "LVLUP Health": "lvlup-health",
};

function resolveVendorSlug(vendorName: string): string {
  return VENDOR_NAME_TO_SLUG[vendorName] ?? vendorName.toLowerCase().replace(/\s+/g, "-");
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface PseoPair {
  peptideSlug: string;
  vendorSlug: string;
  /** Resolved peptide object from peptides.ts */
  peptide: Peptide;
  /** Resolved vendor object from vendors.ts */
  vendor: Vendor;
  /** Pricing row from vendor-pricing.ts */
  pricing: VendorPrice;
  /** Peptide display name */
  peptideName: string;
}

// ── Core Derivation ─────────────────────────────────────────────────────────

/**
 * Derives all valid (peptide, vendor) pairs from vendor-pricing.ts.
 * Each pair represents a page that should exist at /peptides/[slug]/at/[vendor].
 *
 * This is the ONLY function that determines page existence.
 * To add a new page, add a pricing row to vendor-pricing.ts.
 */
export function getAllPseoPairs(): PseoPair[] {
  const pairs: PseoPair[] = [];

  for (const pricingEntry of vendorPricing) {
    const peptide = getPeptideBySlug(pricingEntry.slug);
    if (!peptide) continue; // Skip if peptide not in peptides.ts

    for (const vp of pricingEntry.vendors) {
      const vendorSlug = resolveVendorSlug(vp.vendor);
      const vendor = vendorBySlug[vendorSlug];
      if (!vendor) continue; // Skip if vendor not in vendors.ts
      if (vendor.isActive === false) continue; // Skip deactivated vendors

      pairs.push({
        peptideSlug: pricingEntry.slug,
        vendorSlug,
        peptide,
        vendor,
        pricing: vp,
        peptideName: pricingEntry.name,
      });
    }
  }

  return pairs;
}

/**
 * Get a specific pair, or null if the vendor doesn't carry the peptide.
 */
export function getPseoPair(peptideSlug: string, vendorSlug: string): PseoPair | null {
  return getAllPseoPairs().find(
    p => p.peptideSlug === peptideSlug && p.vendorSlug === vendorSlug
  ) ?? null;
}

/**
 * Get all vendors that carry a specific peptide (for comparison strip).
 * Sorted by discounted price ascending (cost-first, per user spec).
 */
export function getVendorsForPeptide(peptideSlug: string): PseoPair[] {
  return getAllPseoPairs()
    .filter(p => p.peptideSlug === peptideSlug)
    .sort((a, b) => {
      const aDisc = a.pricing.price_usd * (1 - ((a.vendor.discountPercent ?? 0) / 100));
      const bDisc = b.pricing.price_usd * (1 - ((b.vendor.discountPercent ?? 0) / 100));
      return aDisc - bDisc;
    });
}

/**
 * Get all peptides carried by a specific vendor.
 */
export function getPeptidesForVendor(vendorSlug: string): PseoPair[] {
  return getAllPseoPairs().filter(p => p.vendorSlug === vendorSlug);
}

/**
 * Returns true if a pricing-verified pair exists.
 * Used by page.tsx to gate noindex.
 */
export function hasPricingData(peptideSlug: string, vendorSlug: string): boolean {
  return getPseoPair(peptideSlug, vendorSlug) !== null;
}

/**
 * Static params for Next.js generateStaticParams().
 * Only generates pages for pricing-verified pairs.
 */
export function getPseoStaticParams(): { slug: string; vendor: string }[] {
  return getAllPseoPairs().map(p => ({
    slug: p.peptideSlug,
    vendor: p.vendorSlug,
  }));
}

/** Total page count — useful for monitoring */
export const PSEO_PAGE_COUNT = getAllPseoPairs().length;
