/**
 * fix(seo): H8 — /redesign-v2 is a design preview page, not for public indexing.
 * Added noindex. Route is also disallowed in robots.ts.
 */
import type { Metadata } from 'next';
import RedesignV2Client from './RedesignV2Client';

export const metadata: Metadata = {
  title: 'Design Preview v2 — PeptiDex',
  robots: { index: false, follow: false },
};

export default function RedesignV2Page() {
  return <RedesignV2Client />;
}
