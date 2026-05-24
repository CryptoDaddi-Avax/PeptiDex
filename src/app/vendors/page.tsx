import type { Metadata } from 'next';
import { vendorsSorted } from '@/data/vendors';
import { SITE_STATS } from '@/data/site-stats';
import { buildItemListSchema, buildFAQPageSchema, buildBreadcrumbSchema } from '@/lib/seo/schema';
import { VENDORS_FAQ_ITEMS } from './faqData';
import VendorsClient from './VendorsClient';

// ── Constants ─────────────────────────────────────────────────────────────────

/** Update this date whenever vendor data or rankings change. */
export const LAST_REVIEWED = '2026-05-01';

// ── SEO Metadata ──────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    `Best Place to Buy Peptides Online (2026): ${SITE_STATS.vendors.count} COA-Verified Vendors Ranked`,
  description:
    `Independent 2026 review of the best places to buy research peptides online. We rank Amino Club, Bio Longevity Labs, Limitless Life, and ${SITE_STATS.vendors.count - 3} more on purity (HPLC/MS COA), shipping speed, discount codes, and return policy. Research use only.`,
  keywords: [
    'best place to buy peptides',
    'best place to buy peptides online',
    'where to buy peptides online',
    'buy research peptides 2026',
    'COA verified peptide vendors',
    'amino club review',
    'bio longevity labs review',
    'limitless life peptides',
    'peptide vendor comparison',
  ],
  alternates: {
    canonical: 'https://peptidex.app/vendors',
  },
  openGraph: {
    title: `Best Place to Buy Peptides Online (2026): ${SITE_STATS.vendors.count} COA-Verified Vendors Ranked`,
    description:
      `Independent ranking of the ${SITE_STATS.vendors.count} best research peptide vendors in 2026 — evaluated on HPLC/MS purity COAs, shipping speed, discount codes, and return policy.`,
    url: 'https://peptidex.app/vendors',
    type: 'article',
    images: [{ url: 'https://peptidex.app/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Best Place to Buy Peptides Online (2026) — ${SITE_STATS.vendors.count} COA-Verified Vendors Ranked`,
    description:
      `Independent 2026 review: Amino Club, Bio Longevity Labs, Limitless Life, and ${SITE_STATS.vendors.count - 3} more ranked on purity, shipping, and value.`,
    images: ['https://peptidex.app/og-image.png'],
  },
};

// ── Page Component ────────────────────────────────────────────────────────────

export default function VendorsPage() {
  /* ── JSON-LD Schemas (server-rendered for zero-JS SEO) ── */
  const sortedVendors = [...vendorsSorted].sort((a, b) => a.sortOrder - b.sortOrder);

  const itemListSchema = buildItemListSchema({
    name: "Best Places to Buy Peptides Online (2026)",
    description: "Independent ranking of COA-verified research peptide vendors, evaluated on purity testing, COA transparency, shipping, and value.",
    items: sortedVendors.map(v => ({
      name: v.name,
      description: v.tagline,
      url: `https://peptidex.app/vendors#${v.slug}`
    }))
  });
  
  const faqSchema = buildFAQPageSchema(VENDORS_FAQ_ITEMS);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "PeptiDex", url: "https://peptidex.app" },
    { name: "Best Peptide Vendors 2026", url: "https://peptidex.app/vendors" }
  ]);

  return (
    <>
      {/* ItemList — enables Google's "best of" rich results for ranked lists */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {/* FAQPage — enables accordion-style FAQ rich results in SERP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* BreadcrumbList — enables breadcrumb in Google SERP snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <VendorsClient lastReviewed={LAST_REVIEWED} />
    </>
  );
}
