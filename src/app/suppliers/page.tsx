/**
 * /suppliers — Server Component wrapper
 * ======================================
 * fix(seo): H3 — Path chosen: add noindex metadata.
 * Note: next.config.ts already has { source: '/suppliers', destination: '/vendors', permanent: true }
 * meaning all requests to /suppliers 301 to /vendors. This page is unreachable.
 * Adding noindex is belt-and-suspenders in case the redirect is removed in the future.
 */

import type { Metadata } from 'next';
import SuppliersClient from './SuppliersClient';

export const metadata: Metadata = {
  title: 'Research Peptide Vendor Directory — PeptiDex',
  robots: { index: false, follow: false },
};

export default function SuppliersPage() {
  return <SuppliersClient />;
}
