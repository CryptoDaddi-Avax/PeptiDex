/**
 * /saved — Server Component wrapper
 * ====================================
 * fix(seo): H8 — Saved items page reads from localStorage. Google sees a blank
 * "nothing saved" state. Previously inherited layout default title.
 * noindex prevents indexing a soft-404 shell. Disallowed in robots.ts;
 * this is belt-and-suspenders at page level.
 */

import type { Metadata } from 'next';
import SavedClient from './SavedClient';

export const metadata: Metadata = {
  title: 'Saved Items — Your PeptiDex Bookmarks',
  robots: { index: false, follow: false },
};

export default function SavedPage() {
  return <SavedClient />;
}
