import { MetadataRoute } from 'next';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

import '@/components/redesign/redesign.css';

export default function SavedLayout({ children }: { children: React.ReactNode }) {
  return <div className="redesign-content">{children}</div>;
}
