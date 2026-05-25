import Link from "next/link";
import type { Metadata } from "next";
import { CouponHubClient } from "./CouponHubClient";
import { SITE_STATS } from "@/data/site-stats";
import {
  vendorDeals,
  peptideBestDeals,
  dealOfTheWeekSlug,
  dealOfTheWeekRefreshedDate,
  buildFaqSchema,
  buildCouponSchema,
} from "@/data/coupon-deals";

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

export default function CouponCodesPage() {
  const dealOfTheWeek = vendorDeals.find((d) => d.vendorSlug === dealOfTheWeekSlug)!;

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
        peptideBestDeals={peptideBestDeals}
        dealOfTheWeek={dealOfTheWeek}
        refreshedDate={dealOfTheWeekRefreshedDate}
      />
    </>
  );
}
