/**
 * /tracker — Server Component wrapper
 * =====================================
 * fix(seo): H8 — Protocol tracker is a localStorage + notification-based tool.
 * Previously inherited the layout default title. Now has unique metadata with
 * noindex (disallowed in robots.ts; belt-and-suspenders at page level).
 */

import type { Metadata } from 'next';
import TrackerClient from './TrackerClient';

export const metadata: Metadata = {
  title: 'Protocol Tracker — Dose Log & Cycle Calendar | PeptiDex',
  robots: { index: false, follow: false },
};

export default function TrackerPage() {
  return <TrackerClient />;
}
