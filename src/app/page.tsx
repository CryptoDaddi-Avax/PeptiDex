import type { Metadata } from 'next';
import HomeClient from './home-client';

export const metadata: Metadata = {
  title: 'PeptiDex: Peptide Research, Stacks & Vendor Data Hub',
  description: 'Explore 30+ research peptides, expert stacks, and trusted vendors. Find goal-based protocols and clinical studies in one central research hub.',
  alternates: {
    canonical: 'https://peptidex.app',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'PeptiDex, The #1 Peptide Research & Sourcing Hub',
    description: 'Research-backed peptide education. Compare stacks, explore studies, and find the best peptide vendors for your goals.',
    url: 'https://peptidex.app',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function Page() {
  // Structured JSON-LD Data for SEO: WebSite (with internal search) + Health/Educational Entity + FAQ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        url: 'https://peptidex.app',
        name: 'PeptiDex',
        description: 'Research-Grade Peptide Reference, Stacks & Trusted Vendor Sourcing',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://peptidex.app/research?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': ['HealthAndBeautyBusiness', 'EducationalOrganization'],
        name: 'PeptiDex',
        url: 'https://peptidex.app',
        logo: 'https://peptidex.app/logo.png',
        image: 'https://peptidex.app/og-image.png',
        description: 'Explore 33 research peptides, 12 expert stacks, and 140+ studies. Find goal-based peptide protocols and trusted vendors, all in one research hub. Educational use only.',
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are research peptides?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Research peptides are synthetic sequences of amino acids utilized exclusively in laboratory and non-human experimental settings to study physiological mechanisms like cellular repair, healing, and metabolic signaling."
            }
          },
          {
            "@type": "Question",
            "name": "Are peptides legal to buy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, research peptides are legally available to purchase in many jurisdictions for authorized laboratory, educational, and research purposes, provided they are strictly not intended for human consumption."
            }
          },
          {
            "@type": "Question",
            "name": "What is the best peptide for fat loss?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In preclinical research settings, GLP-1 agonists like Semaglutide and Tirzepatide are frequently studied for their significant impact on metabolic regulation, appetite suppression, and accelerated fat loss."
            }
          },
          {
            "@type": "Question",
            "name": "What is the best peptide for injury recovery?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BPC-157 and TB-500 are the most prominently researched peptides for tissue repair. BPC-157 research highlights profound localized healing, while TB-500 demonstrates whole-body, systemic recovery mechanisms."
            }
          },
          {
            "@type": "Question",
            "name": "Where can I find trusted peptide vendors?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can find trusted peptide vendors by consulting our curated review guide, which highlights suppliers offering rigorous independent, third-party batch testing and verified Certificates of Analysis (COAs) for scientific safety."
            }
          }
        ]
      }
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
