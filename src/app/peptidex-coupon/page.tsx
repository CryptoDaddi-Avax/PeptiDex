import type { Metadata } from 'next';
import { howToSteps, couponFAQs } from '@/data/coupon-page-config';
import CouponPageClient from './CouponClient';

// ── Metadata (OG + Twitter Card) ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'PEPTIDEX Coupon Code — Verified 15–20% Off Amino Club & Partner Vendors (2026)',
  description:
    'PEPTIDEX is the verified coupon code for 20% off Amino Club and 15% off Bio Longevity Labs, Limitless Life, Pantheon, & LVLUP. Tested monthly. No expiration.',
  keywords: [
    'PEPTIDEX coupon code',
    'Amino Club discount code',
    'Bio Longevity Labs coupon',
    'peptide coupon code 2026',
    'research peptide discount',
    'PEPTIDEX promo code',
    'best Amino Club coupon',
    'Pantheon Peptides coupon',
    'Limitless Life discount',
    'peptide vendor discount',
    'BPC-157 coupon',
  ],
  openGraph: {
    title: 'PEPTIDEX — Verified 15–20% Off Coupon Code for Research Peptides',
    description:
      'Use code PEPTIDEX for 20% off Amino Club, 15% off Bio Longevity Labs + 4 more vendors. Verified May 2026. No expiration.',
    url: 'https://peptidex.app/peptidex-coupon',
    type: 'website',
    images: [
      {
        url: 'https://peptidex.app/api/og?type=coupon',
        width: 1200,
        height: 630,
        alt: 'PEPTIDEX Coupon Code — 15–20% Off All Partner Vendors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PEPTIDEX — Verified 15–20% Off Coupon Code for Research Peptides',
    description:
      'Use code PEPTIDEX for 20% off Amino Club, 15% off Bio Longevity Labs. Verified May 2026.',
    images: ['https://peptidex.app/api/og?type=coupon'],
  },
  alternates: {
    canonical: 'https://peptidex.app/peptidex-coupon',
  },
};

// ── JSON-LD Schemas ──────────────────────────────────────────────────────────

function buildFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: couponFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function buildHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Apply the PEPTIDEX Coupon Code',
    description:
      'Step-by-step instructions to apply the PEPTIDEX discount code at any partner vendor checkout.',
    totalTime: 'PT2M',
    step: howToSteps.map((s) => ({
      '@type': 'HowToStep',
      position: s.position,
      name: s.name,
      text: s.text,
      image: `https://peptidex.app${s.imageSlot}`,
    })),
  };
}

function buildBreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'PeptiDex',
        item: 'https://peptidex.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'PEPTIDEX Coupon Code',
        item: 'https://peptidex.app/peptidex-coupon',
      },
    ],
  };
}

// ── Server Component ─────────────────────────────────────────────────────────
export default function PeptidexCouponPage() {
  const schemas = [
    buildFAQSchema(),
    buildHowToSchema(),
    buildBreadcrumbSchema(),
  ];

  return (
    <>
      {/* JSON-LD injection */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Client-side interactive page */}
      <CouponPageClient />
    </>
  );
}
