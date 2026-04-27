import { MetadataRoute } from 'next';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

import RedesignLayout from '@/components/redesign/RedesignLayout';

export default function SavedLayout({ children }: { children: React.ReactNode }) {
  return <RedesignLayout>{children}</RedesignLayout>;
}
