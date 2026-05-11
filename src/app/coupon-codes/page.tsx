import Link from "next/link";
import type { Metadata } from "next";
import { CouponHubClient } from "./CouponHubClient";
import {
  vendorDeals,
  peptideBestDeals,
  dealOfTheWeekSlug,
  dealOfTheWeekRefreshedDate,
  buildFaqSchema,
  buildCouponSchema,
} from "@/data/coupon-deals";

export const metadata: Metadata = {
  title: "Peptide Vendor Coupon Codes 2026 — All Active Discounts | PeptiDex",
  description:
    "All verified peptide vendor discount codes in one place. Use PEPTIDEX for up to 50% off at Ascension Peptides, 20% at Amino Club, 15% at Bio Longevity Labs, Limitless Life, Pantheon, and LVLUP Health.",
  openGraph: {
    title: "Peptide Coupon Codes 2026 — Every Active Discount Code",
    description: "Use code PEPTIDEX for exclusive discounts at all 6 verified peptide vendors. Updated weekly.",
    url: "https://peptidex.app/coupon-codes",
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
