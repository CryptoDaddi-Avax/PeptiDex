/**
 * pSEO Schema.org JSON-LD Generator
 * ===================================
 * Generates Product structured data (no offers, no rating) for
 * programmatic SEO pages at /peptides/[slug]/at/[vendor].
 *
 * No AggregateRating: vendor ratings were not sourced from a review platform,
 * and community protocol-log efficacy scores are not product reviews.
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
}

/**
 * Generates Product JSON-LD (no offers) for a pSEO page.
 * Returns a serializable object ready for <script type="application/ld+json">.
 */
export function generatePseoSchema(opts: PseoSchemaOptions): Record<string, unknown> {
  const { pair } = opts;
  const { peptide, vendor, pricing } = pair;

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
    ],
  };
}
