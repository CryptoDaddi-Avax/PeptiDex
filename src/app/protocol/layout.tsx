import type { Metadata } from 'next';
import '@/components/redesign/redesign.css';

export const metadata: Metadata = {
  title: 'Protocol Builder — PeptiDex',
  robots: { index: false, follow: false },
};
export default function ProtocolLayout({ children }: { children: React.ReactNode }) {
  return <div className="redesign-content">{children}</div>;
}
