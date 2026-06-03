import '@/components/redesign/redesign.css';

export default function BestLayout({ children }: { children: React.ReactNode }) {
  return <div className="redesign-content">{children}</div>;
}
