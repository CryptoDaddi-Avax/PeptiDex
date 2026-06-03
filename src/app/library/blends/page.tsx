/**
 * /library/blends — Server Component wrapper
 * ============================================
 * fix(seo): H9 — /library/blends had no metadata. Googlebot was indexing it
 * with the layout default title "PeptiDex — Peptide Research Index", which is
 * not unique and competes with the homepage.
 * 
 * BlendsClient.tsx holds the interactive "use client" component with
 * search/filter UI (useState, framer-motion).
 */

import type { Metadata } from 'next';
import { peptideBlends } from '@/data/blends';
import BlendsClient from './BlendsClient';

export const metadata: Metadata = {
  title: `Peptide Blend Directory — ${peptideBlends.length} Stacks | PeptiDex`,
  description: `${peptideBlends.length} evidence-based peptide blend protocols: BPC-157/TB-500, CJC-1295/Ipamorelin, and more. Mechanism breakdowns, dosing ratios, and timeline data.`,
  alternates: {
    canonical: 'https://peptidex.app/library/blends',
  },
  openGraph: {
    title: `Peptide Blend Directory — ${peptideBlends.length} Research Stacks`,
    description: `Multi-peptide combination protocols with synergistic mechanisms. ${peptideBlends.length} blends organized by goal: healing, growth hormone, cognition, longevity, and more.`,
    url: 'https://peptidex.app/library/blends',
    type: 'website',
  },
};

export default function BlendsPage() {
  return <BlendsClient />;
}
