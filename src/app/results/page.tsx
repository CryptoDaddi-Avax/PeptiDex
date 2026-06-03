/**
 * /results — Server Component wrapper
 * ====================================
 * fix(seo): H2 — /results is a quiz-result page driven by ?goals= URL params.
 * The base URL /results with no params renders near-empty content.
 * Added noindex + canonical pointing to /quiz (the source page).
 *
 * ResultsClient.tsx holds the original "use client" component logic.
 * This server wrapper exists solely to export metadata (not possible in
 * "use client" components in Next.js App Router).
 */

import type { Metadata } from 'next';
import ResultsClient from './ResultsClient';

export const metadata: Metadata = {
  title: 'Your Research Stack Results — PeptiDex',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://peptidex.app/quiz',
  },
};

export default function ResultsPage() {
  return <ResultsClient />;
}
