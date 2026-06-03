import type { Metadata } from 'next';
import NewHomeClient from './new-home-client';
import { SITE_STATS } from '@/data/site-stats';

export const metadata: Metadata = {
  title: 'PeptiDex – Peptide Research Index, Stacks & Vendor Data Hub',
  description: `PeptiDex (peptidex.app) is the independent peptide research index — ${SITE_STATS.peptides.count} peptide profiles, ${SITE_STATS.stacks.count} evidence-based stacks, free reconstitution & cycle-planning tools, and COA verification. Not affiliated with any tracker app or vendor.`,
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

import { buildFAQPageSchema } from '@/lib/seo/schema';
import { peptides } from '@/data/peptides';
import { stacks } from '@/data/stacks';

// P2 FIX: Page receives searchParams from Next.js App Router at request time.
// Parsing here (server component) means the resolved values are embedded in
// the initial HTML — server and client render the SAME step on first paint.
function resolveDeepLink(searchParams: Record<string, string | string[] | undefined>): {
  guideOpen: boolean;
  initialStep: number;
  skipHero: boolean;
} {
  const guide = searchParams['guide'];
  const skipHero = searchParams['noHero'] === '1';
  if (guide !== '1') return { guideOpen: false, initialStep: 0, skipHero };
  const raw = parseInt(String(searchParams['step'] ?? '1'), 10);
  const step = isNaN(raw) ? 0 : Math.max(0, Math.min(4, raw - 1));
  return { guideOpen: true, initialStep: step, skipHero };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const deepLink = resolveDeepLink(resolvedParams);
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

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "PeptiDex Peptide Library",
    "description": `Browse ${peptides.length} research peptide profiles — dosage guides, half-life data, study summaries, and COA-verified vendor sourcing.`,
    "url": "https://peptidex.app/library",
    "hasPart": peptides.map((p) => ({
      "@type": "WebPage",
      "name": `${p.name} Research Profile`,
      "url": `https://peptidex.app/library/${p.slug}`,
      "description": p.laypersonSummary?.slice(0, 150) ?? p.mechanism.slice(0, 150),
    })),
    "about": {
      "@type": "Thing",
      "name": "Research Peptides",
      "description": `${peptides.length} research peptides and ${stacks.length} evidence-based stacks indexed for educational reference.`,
    },
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [collectionPageSchema, faqSchema]
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
        skipHero={deepLink.skipHero}
      />
    </>
  );
}
