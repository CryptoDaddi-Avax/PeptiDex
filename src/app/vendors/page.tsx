import type { Metadata } from 'next';
import { vendorsSorted } from '@/data/vendors';
import {
  buildVendorsItemListSchema,
  buildVendorsFAQSchema,
  buildVendorsBreadcrumbSchema,
  VENDORS_FAQ_ITEMS,
} from '@/lib/seo/vendorsJsonLd';
import VendorsClient from './VendorsClient';

// ── Constants ─────────────────────────────────────────────────────────────────

/** Update this date whenever vendor data or rankings change. */
export const LAST_REVIEWED = '2026-05-01';

// ── SEO Metadata ──────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    'Best Place to Buy Peptides Online (2026): 6 COA-Verified Vendors Ranked',
  description:
    'Independent 2026 review of the best places to buy research peptides online. We rank Amino Club, Bio Longevity Labs, Limitless Life, and 3 more on purity (HPLC/MS COA), shipping speed, discount codes, and return policy. Research use only.',
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
    title: 'Best Place to Buy Peptides Online (2026): 6 COA-Verified Vendors Ranked',
    description:
      'Independent ranking of the 6 best research peptide vendors in 2026 — evaluated on HPLC/MS purity COAs, shipping speed, discount codes, and return policy.',
    url: 'https://peptidex.app/vendors',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Place to Buy Peptides Online (2026) — 6 COA-Verified Vendors Ranked',
    description:
      'Independent 2026 review: Amino Club, Bio Longevity Labs, Limitless Life, and 3 more ranked on purity, shipping, and value.',
    images: ['/og-image.png'],
  },
};

// ── Page Component ────────────────────────────────────────────────────────────

export default function VendorsPage() {
  /* ── JSON-LD Schemas (server-rendered for zero-JS SEO) ── */

  const itemListSchema = buildVendorsItemListSchema(vendorsSorted);
  const faqSchema = buildVendorsFAQSchema(VENDORS_FAQ_ITEMS);
  const breadcrumbSchema = buildVendorsBreadcrumbSchema();

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
