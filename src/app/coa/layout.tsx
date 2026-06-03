import '@/components/redesign/redesign.css';

export default function CoaLayout({ children }: { children: React.ReactNode }) {
  return <div className="redesign-content">{children}</div>;
}
