import type { Metadata } from 'next';
import { vendorPricing } from '@/data/vendor-pricing';
import VendorsClient from './VendorsClient';

export const metadata: Metadata = {
  title: 'Best Peptide Vendors 2026 | Trusted Sources Reviewed',
  description:
    'Compare the top research-grade peptide vendors in 2026. We review purity, COA transparency, pricing, and reliability so you can source with confidence. Research use only.',
  alternates: {
    canonical: 'https://peptidex.app/vendors',
  },
  openGraph: {
    title: 'Best Peptide Vendors 2026 — Lab-Tested Research Sources | PeptiDex',
    description:
      'Compare COA-verified peptide vendors. Independent purity testing, pricing, and shipping reviews for research-grade sourcing.',
    url: 'https://peptidex.app/vendors',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Peptide Vendors 2026 — Trusted Sources Reviewed',
    description:
      'Compare COA-verified peptide vendors for purity, pricing, and reliability.',
    images: ['/og-image.png'],
  },
};

export default function VendorsPage() {
  /* ── JSON-LD Schemas (server-rendered for SEO) ── */

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where can I buy research peptides?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can buy research peptides from specialized online synthesis laboratories. The most reliable suppliers prioritize third-party COA testing and verify amino acid sequence purity. Always ensure you are purchasing for laboratory research use only.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a COA and why does it matter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A COA stands for Certificate of Analysis. It is a laboratory report (typically utilizing HPLC and Mass Spectrometry) that verifies the exact purity percentage and molecular weight of a synthesized peptide batch.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are peptide vendors legitimate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, legitimate peptide vendors operate as chemical supply companies synthesizing compounds strictly for academic, preclinical, and independent laboratory research.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best peptide company in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best peptide company in 2026 depends on your specific research needs, but top-tier vendors consistently provide batch-specific COAs, offer a wide variety of compounds, and maintain domestic shipping infrastructure.',
        },
      },
    ],
  };

  const TOP_PEPTIDES = ['bpc-157', 'tb-500', 'ipamorelin', 'tesamorelin', 'ghk-cu'];
  const aggregateOfferSchema = {
    '@context': 'https://schema.org',
    '@graph': TOP_PEPTIDES.map((slug) => {
      const pricing = vendorPricing.find((v) => v.slug === slug);
      if (!pricing || pricing.vendors.length === 0) return null;
      const prices = pricing.vendors.filter((v) => v.inStock).map((v) => v.price_usd);
      if (prices.length === 0) return null;
      return {
        '@type': 'Product',
        name: `${pricing.name} Research Peptide`,
        description: `Research-grade ${pricing.name} peptide for laboratory use.`,
        category: 'Research Chemical',
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: Math.min(...prices).toFixed(2),
          highPrice: Math.max(...prices).toFixed(2),
          priceCurrency: 'USD',
          offerCount: prices.length,
          availability: 'https://schema.org/InStock',
        },
      };
    }).filter(Boolean),
  };

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Peptide Vendors 2026 — Trusted Research-Grade Sources Reviewed',
    datePublished: '2026-01-15',
    dateModified: '2026-04-13',
    author: { '@type': 'Organization', name: 'PeptiDex' },
    publisher: { '@type': 'Organization', name: 'PeptiDex', url: 'https://peptidex.app' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateOfferSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <VendorsClient />
    </>
  );
}
