import type { Metadata } from 'next';
import NewHomeClient from './new-home-client';
import { SITE_STATS } from '@/data/site-stats';

export const metadata: Metadata = {
  title: 'PeptiDex – Peptide Research Index, Stacks & Research Tools',
  description: `PeptiDex (peptidex.app) is the independent peptide research index — ${SITE_STATS.peptides.count} peptide profiles, ${SITE_STATS.stacks.count} evidence-based stacks, free cycle-planning, pharmacokinetics and price tools, and COA verification. Not affiliated with any tracker app or vendor.`,
  alternates: {
    canonical: 'https://peptidex.app',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'PeptiDex – Independent Peptide Research Index',
    description: 'Research-backed peptide education. Compare stacks, explore published studies, and review peptide mechanisms by research goal.',
    url: 'https://peptidex.app',
    type: 'website',
    images: [{ url: 'https://peptidex.app/api/og?type=default', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PeptiDex – Independent Peptide Research Index',
    description: 'Research-backed peptide education. Compare stacks, explore published studies, and review peptide mechanisms by research goal.',
    images: ['https://peptidex.app/api/og?type=default'],
  },
};

import { buildFAQPageSchema } from '@/lib/seo/schema';
import { peptides } from '@/data/peptides';
import { stacks } from '@/data/stacks';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const skipHero = resolvedParams['noHero'] === '1';
  const faqSchema = buildFAQPageSchema([
    {
      q: "What are research peptides?",
      a: "Research peptides are synthetic sequences of amino acids utilized exclusively in laboratory and non-human experimental settings to study physiological mechanisms like cellular repair, healing, and metabolic signaling."
    },
    {
      q: "What is the best peptide for injury recovery?",
      a: "BPC-157 and TB-500 are the most prominently researched peptides for tissue repair. BPC-157 research highlights profound localized healing, while TB-500 demonstrates whole-body, systemic recovery mechanisms."
    },
    {
      q: "What is PeptiDex?",
      a: `PeptiDex is an independent, educational peptide research index covering ${peptides.length} peptide profiles and ${stacks.length} research stacks, with mechanisms of action, half-life data, and citations to published studies. PeptiDex does not sell peptides.`
    }
  ]);

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "PeptiDex Peptide Library",
    "description": `Browse ${peptides.length} research peptide profiles — mechanisms of action, half-life data, and published study summaries.`,
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
        skipHero={skipHero}
      />
    </>
  );
}

