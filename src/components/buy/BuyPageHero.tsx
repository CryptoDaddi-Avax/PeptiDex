import Link from 'next/link';

export function BuyPageHero({
  peptideName,
  subhead,
}: {
  peptideName: string;
  subhead: string;
}) {
  const currentYear = new Date().getFullYear();
  return (
    <header className="page-header">
      <div className="page-header-grid" />
      <div className="page-header-wrap">
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/buy">Where to Buy</Link>
          <span className="sep">/</span>
          <span className="current">{peptideName}</span>
        </nav>
        <div className="section-label">§ Vendor Guide {currentYear}</div>
        <h1 className="page-title">
          Where to buy<br /><em>{peptideName}</em>.
        </h1>
        <p className="page-subtitle">{subhead}</p>
      </div>
    </header>
  );
}
