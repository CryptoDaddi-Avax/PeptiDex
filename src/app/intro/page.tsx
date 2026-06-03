/**
 * /intro — Server Component wrapper
 * ====================================
 * fix(seo): B5 — Added metadata export so this page has a title, description,
 * canonical, and OG tags. Previously had zero metadata and Google saw only the
 * layout.tsx defaults ("PeptiDex — Peptide Research Index").
 *
 * The IntroClient renders the full track structure as SSR HTML since it has no
 * client-only hooks — only static data arrays and Link components. The 'use client'
 * directive on IntroClient.tsx is present for CSS import reasons and can be
 * removed in a future cleanup if confirmed safe.
 */

import type { Metadata } from 'next';
import IntroClient from './IntroClient';

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Peptide 101 — Research Methodology Reference | PeptiDex',
  description:
    'A structured introduction to peptide research: science, regulation, sourcing, and reconstitution methodology. Three tracks — Beginner, Practical, and Sourcing. No prior knowledge assumed.',
  alternates: {
    canonical: 'https://peptidex.app/intro',
  },
  openGraph: {
    title: 'Peptide 101 — Research Methodology Reference | PeptiDex',
    description:
      'Structured introduction to peptide research. Beginner, Practical, and Sourcing tracks — 18 lessons covering science, regulation, COA verification, and reconstitution.',
    url: 'https://peptidex.app/intro',
    type: 'website',
    images: [
      {
        url: 'https://peptidex.app/api/og?type=page&title=Peptide+101',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peptide 101 — Research Methodology Reference | PeptiDex',
    description:
      'Three-track structured introduction: Beginner (5 lessons), Practical (7 lessons), Sourcing (6 lessons).',
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Peptide Research Methodology — Structured Introduction',
  description:
    'A structured three-track introduction to peptide research methodology: the science, regulatory landscape, sourcing verification, and reconstitution protocols. For educational and research purposes only.',
  provider: {
    '@type': 'Organization',
    name: 'PeptiDex',
    url: 'https://peptidex.app',
  },
  url: 'https://peptidex.app/intro',
  hasCourseInstance: [
    { '@type': 'CourseInstance', name: 'Beginner Track', description: 'Peptide fundamentals, terminology, and regulatory landscape. 5 lessons, ~30 minutes.' },
    { '@type': 'CourseInstance', name: 'Practical Track', description: 'Routes of administration, dosing, cycles, stacks, and reading clinical trials. 7 lessons, ~50 minutes.' },
    { '@type': 'CourseInstance', name: 'Sourcing Track', description: 'COA verification, vendor red flags, reconstitution, and legal context. 6 lessons, ~40 minutes.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
    { '@type': 'ListItem', position: 2, name: 'Peptide 101', item: 'https://peptidex.app/intro' },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IntroPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <IntroClient />
    </>
  );
}
