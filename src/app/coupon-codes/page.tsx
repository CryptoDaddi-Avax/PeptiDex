import Link from "next/link";
import type { Metadata } from "next";
import { CouponHubClient } from "./CouponHubClient";
import { SITE_STATS } from "@/data/site-stats";
import {
  vendorDeals,
  peptideBestDeals as staticPeptideBestDeals,
  dealOfTheWeekSlug,
  dealOfTheWeekRefreshedDate,
  buildFaqSchema,
  buildCouponSchema,
  type PeptideBestDeal,
} from "@/data/coupon-deals";
import { vendorPricing } from "@/data/vendor-pricing";
import { vendorBySlug } from "@/data/vendors";

export const metadata: Metadata = {
  title: "Peptide Vendor Coupon Codes 2026 — All Active Discounts",
  description:
    "All verified peptide vendor discount codes in one place. Use PEPTIDEX for 20% off at Amino Club, 15% at Bio Longevity Labs, Limitless Life, Pantheon, and LVLUP Health.",
  openGraph: {
    title: "Peptide Coupon Codes 2026 — Every Active Discount Code",
    description: `Use code PEPTIDEX for exclusive discounts at all ${SITE_STATS.vendors.count} verified peptide vendors. Updated weekly.`,
    url: "https://peptidex.app/coupon-codes",
    type: "website",
    images: [{ url: "https://peptidex.app/og-image.png", width: 1200, height: 630, alt: "PeptiDex Peptide Coupon Codes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Coupon Codes 2026 — All Active Discounts",
    description: `Use code PEPTIDEX for exclusive discounts at all ${SITE_STATS.vendors.count} verified peptide vendors. Updated weekly.`,
    images: ["https://peptidex.app/og-image.png"],
  },
  alternates: { canonical: "https://peptidex.app/coupon-codes" },
};

// Map display vendor names from vendor-pricing.ts to their slug for vendorBySlug lookup
const VENDOR_NAME_TO_SLUG: Record<string, string> = {
  "Amino Club": "amino-club",
  "Bio Longevity Labs": "bio-longevity-labs",
  "Limitless Life": "limitless-life",
  "Ascension Peptides": "ascension-peptides",
  "Pantheon Peptides": "pantheon-peptides",
  "LVLUP Health": "lvlup-health",
};

/**
 * For each peptide slug that has NO static entry in peptideBestDeals, compute
 * the best deal by reading vendorPricing, filtering to inStock active vendors,
 * applying each vendor's discountPercent, and picking the lowest $/mg winner.
 *
 * Static entries are NEVER replaced — manual verification wins over auto-compute.
 */
function computeMissingBestDeals(
  slugs: string[],
  existing: PeptideBestDeal[]
): PeptideBestDeal[] {
  const existingSlugs = new Set(existing.map((d) => d.peptideSlug));
  const missing = slugs.filter((s) => !existingSlugs.has(s));

  const computed: PeptideBestDeal[] = [];

  for (const slug of missing) {
    const entry = vendorPricing.find((p) => p.slug === slug);
    if (!entry) continue;

    const candidates = entry.vendors
      .filter((vp) => {
        if (!vp.inStock) return false;
        const vSlug = VENDOR_NAME_TO_SLUG[vp.vendor];
        if (!vSlug) return false;
        // Exclude inactive vendors (isActive: false means deactivated)
        return vendorBySlug[vSlug]?.isActive !== false;
      })
      .map((vp) => {
        const vSlug = VENDOR_NAME_TO_SLUG[vp.vendor]!;
        const discountPct = vendorBySlug[vSlug]?.discountPercent ?? 0;
        const discountedPrice = parseFloat(
          (vp.price_usd * (1 - discountPct / 100)).toFixed(2)
        );
        const perMg = parseFloat((vp.price_usd / vp.vial_mg).toFixed(3));
        const discountedPerMg = parseFloat((discountedPrice / vp.vial_mg).toFixed(3));
        return { vp, vSlug, discountPct, discountedPrice, perMg, discountedPerMg };
      });

    if (candidates.length === 0) continue;

    // Winner = lowest discounted $/mg
    const best = candidates.reduce((a, b) =>
      a.discountedPerMg <= b.discountedPerMg ? a : b
    );

    computed.push({
      peptideSlug: slug,
      peptideName: entry.name,
      vendorName: best.vp.vendor,
      vendorSlug: best.vSlug,
      price: best.vp.price_usd,
      vialMg: best.vp.vial_mg,
      perMg: best.perMg,
      code: "PEPTIDEX",
      discountedPrice: best.discountedPrice,
      affiliateUrl: best.vp.affiliateUrl,
    });
  }

  return computed;
}

// Ordered list of peptides to show in the "Cheapest Price Per Peptide" section.
// Static entries take priority; computed entries fill any gaps.
const BEST_DEAL_SLUGS = [
  "bpc-157", "tb-500", "semaglutide", "tirzepatide",
  "ipamorelin", "cjc-1295", "ghk-cu", "epitalon",
  "retatrutide", "pt-141",
];

export default function CouponCodesPage() {
  const dealOfTheWeek = vendorDeals.find((d) => d.vendorSlug === dealOfTheWeekSlug)!;

  // Merge static (verified) entries with auto-computed entries for any gaps
  const computedGaps = computeMissingBestDeals(BEST_DEAL_SLUGS, staticPeptideBestDeals);
  const allBestDeals = [...staticPeptideBestDeals, ...computedGaps].sort(
    (a, b) =>
      BEST_DEAL_SLUGS.indexOf(a.peptideSlug) -
      BEST_DEAL_SLUGS.indexOf(b.peptideSlug)
  );

  const faqSchema = buildFaqSchema(vendorDeals);
  const offerSchemas = vendorDeals.map(buildCouponSchema);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [faqSchema, ...offerSchemas],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <CouponHubClient
        vendorDeals={vendorDeals}
        peptideBestDeals={allBestDeals}
        dealOfTheWeek={dealOfTheWeek}
        refreshedDate={dealOfTheWeekRefreshedDate}
      />
    </>
  );
}
