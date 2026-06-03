/**
 * fix(seo): H8 — /redesign is a design preview page, not for public indexing.
 * Added noindex. Route is also disallowed in robots.ts.
 */
import type { Metadata } from 'next';
import RedesignClient from './RedesignClient';

export const metadata: Metadata = {
  title: 'Design Preview — PeptiDex',
  robots: { index: false, follow: false },
};

export default function RedesignPage() {
  return <RedesignClient />;
}
