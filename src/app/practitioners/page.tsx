/**
 * /practitioners — Server Component wrapper
 * ==========================================
 * fix(seo): H3 — Path chosen: add noindex metadata.
 * PractitionersClient uses useState + framer-motion (true client hooks) so it
 * cannot be converted to a server component without visual changes.
 * Noindex prevents soft-404 indexing (Google sees a filtered JS-rendered list).
 * This page is discoverable via internal links; noindex is the correct choice
 * until the page has a static SSR-rendered version.
 */

import type { Metadata } from 'next';
import PractitionersClient from './PractitionersClient';

export const metadata: Metadata = {
  title: 'Find a Peptide-Experienced Practitioner — PeptiDex',
  description: 'Directory of clinics and telehealth providers experienced with peptide therapy. Includes Defy Medical, Marek Health, The Peptide Clinic, and more.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://peptidex.app/practitioners',
  },
};

export default function PractitionersPage() {
  return <PractitionersClient />;
}
