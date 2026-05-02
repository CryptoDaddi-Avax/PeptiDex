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
        name: 'Where can I buy peptides legally?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Research peptides can be purchased legally from specialized synthesis laboratories for laboratory use only. Top vendors include Amino Club, Limitless Life, and Ascension Peptides — all provide COA-verified, HPLC-tested compounds. FDA-approved peptides require a prescription. → Read more at peptidex.app/vendors',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a COA for peptides?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Certificate of Analysis (COA) is a lab report verifying peptide purity, typically using HPLC (High-Performance Liquid Chromatography) and Mass Spectrometry. A quality COA confirms >98% purity, correct molecular weight, and absence of endotoxins. Always verify COAs are batch-specific. → Read more at peptidex.app/tools/coa',
        },
      },
      {
        '@type': 'Question',
        name: 'Are research peptides the same as pharmaceutical peptides?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Research peptides and pharmaceutical peptides contain the same amino acid sequences, but they differ in regulatory status, manufacturing standards, and intended use. Pharmaceutical peptides (like Ozempic) undergo FDA approval with GMP manufacturing. Research peptides are synthesized for laboratory use and are not approved for human consumption. Quality varies by vendor — always verify with a COA. → Read more at peptidex.app/vendors',
        },
      },
      {
        '@type': 'Question',
        name: 'Do peptides require a prescription?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Only FDA-approved peptides require a prescription: Semaglutide (Ozempic/Wegovy), Tirzepatide (Mounjaro/Zepbound), Tesamorelin (Egrifta), and PT-141 (Vyleesi). All other peptides indexed on PeptiDex are research-only compounds sold for laboratory use. → Read more at peptidex.app/faq',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Bio Longevity Labs and why are they triple-tested?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bio Longevity Labs is a premium injectable peptide vendor that subjects every batch to three independent testing protocols: HPLC purity analysis, LC-MS molecular verification, and endotoxin screening. Their PEPTIDEX discount code stacks with any active sitewide sale for maximum savings. → Read more at peptidex.app/vendors/bio-longevity-labs-review',
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
