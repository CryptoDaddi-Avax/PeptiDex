/**
 * pSEO Schema.org JSON-LD Generator
 * ===================================
 * Generates Product + Offer + AggregateRating structured data for
 * programmatic SEO pages at /peptides/[slug]/at/[vendor].
 *
 * Rating logic:
 * - Default: vendor-level rating from vendors.ts
 * - Auto-switch: per-pair community log rating when logCount >= 5
 *   (deterministic, no composite scoring)
 *
 * Created: 2026-05-11 — pSEO route architecture
 */

import type { PseoPair } from "@/lib/pseo-pairs";

interface PseoSchemaOptions {
  pair: PseoPair;
  /** Community log count for this (peptide, vendor) pair — from Supabase */
  logCount?: number;
  /** Average efficacy score from community logs (1-10) */
  avgEfficacy?: number;
  /** Discounted price after applying vendor discount */
  discountedPrice: number;
}

/**
 * Generates Product + Offer JSON-LD for a pSEO page.
 * Returns a serializable object ready for <script type="application/ld+json">.
 */
export function generatePseoSchema(opts: PseoSchemaOptions): Record<string, unknown> {
  const { pair, logCount, avgEfficacy, discountedPrice } = opts;
  const { peptide, vendor, pricing } = pair;

  // ── Rating source determination (deterministic switch) ────────────────
  // Per user decision: use vendor-level rating by default.
  // Auto-switch to per-pair community rating when logCount >= 5.
  const usePerPairRating = (logCount ?? 0) >= 5 && avgEfficacy != null;

  const ratingValue = usePerPairRating
    ? (avgEfficacy! / 2).toFixed(1) // Convert 1-10 scale to 1-5 scale
    : String(vendor.rating);

  const reviewCount = usePerPairRating
    ? String(logCount)
    : vendor.ratingCount.replace(/[^0-9]/g, ""); // Strip "+" from "300+"

  const ratingDescription = usePerPairRating
    ? `Based on ${logCount} community protocol logs for ${peptide.name} from ${vendor.name}`
    : `${vendor.name} vendor rating across all products`;

  // ── Product schema ────────────────────────────────────────────────────
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${peptide.name} — ${pricing.vial_mg}mg Research Vial`,
    "description": peptide.laypersonSummary || `${peptide.name} is a ${peptide.category} peptide researched for: ${peptide.primary_benefits}`,
    "brand": {
      "@type": "Brand",
      "name": vendor.name,
    },
    "category": "Research Peptides",
    "sku": `${vendor.slug}-${peptide.slug}-${pricing.vial_mg}mg`,
    "offers": {
      "@type": "Offer",
      "url": pricing.affiliateUrl || vendor.affiliateUrl,
      "priceCurrency": "USD",
      "price": pricing.price_usd.toFixed(2),
      "availability": pricing.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": vendor.name,
        "url": vendor.affiliateUrl,
      },
      ...(discountedPrice < pricing.price_usd ? {
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": discountedPrice.toFixed(2),
          "priceCurrency": "USD",
          "valueAddedTaxIncluded": false,
          "description": `After ${vendor.discountPercent ?? 0}% discount with code ${vendor.discountCode ?? 'PEPTIDEX'}`,
        },
      } : {}),
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "reviewCount": reviewCount,
      "bestRating": usePerPairRating ? "5" : "5",
      "worstRating": "1",
      "description": ratingDescription,
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Purity",
        "value": vendor.purity,
      },
      {
        "@type": "PropertyValue",
        "name": "Vial Size",
        "value": `${pricing.vial_mg}mg`,
      },
      {
        "@type": "PropertyValue",
        "name": "Testing Methods",
        "value": vendor.testingMethods.join(", "),
      },
      {
        "@type": "PropertyValue",
        "name": "Verification Tier",
        "value": vendor.verificationTier,
      },
    ],
  };
}
