import type { Metadata } from 'next';
import { peptides } from '@/data/peptides';
import LibraryClient from './LibraryClient';

const count = peptides.length;

export const metadata: Metadata = {
  title: `Peptide Library — ${count} Research Compounds Indexed`,
  description:
    `Explore ${count} research peptides with evidence-graded profiles, pharmacokinetic data, dosing protocols, and peer-cited clinical studies. BPC-157, Semaglutide, CJC-1295, and more.`,
  alternates: {
    canonical: 'https://peptidex.app/library',
  },
  openGraph: {
    title: 'Peptide Library — Research Compound Index | PeptiDex',
    description:
      'Evidence-graded peptide profiles with clinical studies, dosing, half-life data, and interaction maps. The most comprehensive peptide research index.',
    url: 'https://peptidex.app/library',
    type: 'website',
    images: [{ url: 'https://peptidex.app/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Peptide Library — ${count} Research Compounds`,
    description:
      'Evidence-graded peptide profiles with clinical studies, dosing, and pharmacokinetic data.',
    images: ['https://peptidex.app/og-image.png'],
  },
};

export default function LibraryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Peptide Research Library',
    description:
      'An indexed directory of synthetic peptides with pharmacokinetic profiles, evidence grades, and clinical study citations.',
    url: 'https://peptidex.app/library',
    publisher: {
      '@type': 'Organization',
      name: 'PeptiDex',
      url: 'https://peptidex.app',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LibraryClient />
    </>
  );
}
