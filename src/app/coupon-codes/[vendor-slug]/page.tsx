import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { vendorDeals, peptideBestDeals, buildCouponSchema } from "@/data/coupon-deals";
import { vendorBySlug } from "@/data/vendors";
import { VendorCouponPageClient } from "./VendorCouponPageClient";

export function generateStaticParams() {
  return vendorDeals.map((d) => ({ "vendor-slug": d.vendorSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ "vendor-slug": string }>;
}): Promise<Metadata> {
  const { "vendor-slug": slug } = await params;
  const deal = vendorDeals.find((d) => d.vendorSlug === slug);
  if (!deal) return {};
  return {
    title: `${deal.vendorName} Coupon Code 2026 — ${deal.discountPercent}% Off with PEPTIDEX | PeptiDex`,
    description: `Verified ${deal.vendorName} discount code: use PEPTIDEX at checkout for ${deal.discountPercent}% off all orders. ${deal.stackNote ?? ""} No expiry — verified May 2026.`,
    openGraph: {
      title: `${deal.vendorName} Coupon Code — ${deal.discountPercent}% Off`,
      description: `Use PEPTIDEX at ${deal.vendorName} for ${deal.discountPercent}% off. Verified May 2026.`,
      url: `https://peptidex.app/coupon-codes/${slug}`,
    },
    alternates: { canonical: `https://peptidex.app/coupon-codes/${slug}` },
  };
}

export default async function VendorCouponPage({
  params,
}: {
  params: Promise<{ "vendor-slug": string }>;
}) {
  const { "vendor-slug": slug } = await params;
  const deal = vendorDeals.find((d) => d.vendorSlug === slug);
  if (!deal) notFound();

  const vendor = vendorBySlug[slug];
  const relevantPeptideDeals = peptideBestDeals.filter(
    (p) => p.vendorSlug === slug
  );
  const otherDeals = vendorDeals.filter((d) => d.vendorSlug !== slug);

  const schema = buildCouponSchema(deal);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <VendorCouponPageClient
        deal={deal}
        vendor={vendor}
        relevantPeptideDeals={relevantPeptideDeals}
        otherDeals={otherDeals}
      />
    </>
  );
}
