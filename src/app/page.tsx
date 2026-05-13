import type { Metadata } from 'next';
import NewHomeClient from './new-home-client';

export const metadata: Metadata = {
  title: 'PeptiDex – Peptide Research Index, Stacks & Vendor Data Hub',
  description: 'PeptiDex (peptidex.app) is the independent peptide research index — 51 peptide profiles, 12 evidence-based stacks, free reconstitution & cycle-planning tools, and COA verification. Not affiliated with any tracker app or vendor.',
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
    images: [{ url: 'https://peptidex.app/api/og?type=default', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PeptiDex, The #1 Peptide Research & Sourcing Hub',
    description: 'Research-backed peptide education. Compare stacks, explore studies, and find the best peptide vendors for your goals.',
    images: ['https://peptidex.app/api/og?type=default'],
  },
};

import { buildWebSiteSchema, buildOrganizationSchema, buildFAQPageSchema } from '@/lib/seo/schema';

// P2 FIX: Page receives searchParams from Next.js App Router at request time.
// Parsing here (server component) means the resolved values are embedded in
// the initial HTML — server and client render the SAME step on first paint.
function resolveDeepLink(searchParams: Record<string, string | string[] | undefined>): {
  guideOpen: boolean;
  initialStep: number;
} {
  const guide = searchParams['guide'];
  if (guide !== '1') return { guideOpen: false, initialStep: 0 };
  const raw = parseInt(String(searchParams['step'] ?? '1'), 10);
  const step = isNaN(raw) ? 0 : Math.max(0, Math.min(4, raw - 1));
  return { guideOpen: true, initialStep: step };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const deepLink = resolveDeepLink(resolvedParams);
  const websiteSchema = buildWebSiteSchema();
  const orgSchema = buildOrganizationSchema();
  const faqSchema = buildFAQPageSchema([
    {
      q: "What are research peptides?",
      a: "Research peptides are synthetic sequences of amino acids utilized exclusively in laboratory and non-human experimental settings to study physiological mechanisms like cellular repair, healing, and metabolic signaling."
    },
    {
      q: "Are peptides legal to buy?",
      a: "Yes, research peptides are legally available to purchase in many jurisdictions for authorized laboratory, educational, and research purposes, provided they are strictly not intended for human consumption."
    },
    {
      q: "What is the best peptide for fat loss?",
      a: "In preclinical research settings, GLP-1 agonists like Semaglutide and Tirzepatide are frequently studied for their significant impact on metabolic regulation, appetite suppression, and accelerated fat loss."
    },
    {
      q: "What is the best peptide for injury recovery?",
      a: "BPC-157 and TB-500 are the most prominently researched peptides for tissue repair. BPC-157 research highlights profound localized healing, while TB-500 demonstrates whole-body, systemic recovery mechanisms."
    },
    {
      q: "Where can I find trusted peptide vendors?",
      a: "You can find trusted peptide vendors by consulting our curated review guide, which highlights suppliers offering rigorous independent, third-party batch testing and verified Certificates of Analysis (COAs) for scientific safety."
    }
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [websiteSchema, orgSchema, faqSchema]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewHomeClient
        initialGuideOpen={deepLink.guideOpen}
        initialStep={deepLink.initialStep}
      />
    </>
  );
}
