import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, FileText, FlaskConical, Users, ExternalLink, TrendingUp } from 'lucide-react';
import { vendorVerifications, getGlobalStats, getTierColor, getTierLabel } from '@/data/verification-data';
import CoaClientPage from './coa-client';

export const metadata: Metadata = {
  title: 'Verification Dashboard — Independent Peptide Quality Data | PeptiDex',
  description:
    'PeptiDex Verification Dashboard: vendor COAs, community-submitted testing, and independent lab results aggregated across all reviewed peptide vendors. Cross-referenced against published literature.',
  alternates: { canonical: 'https://peptidex.app/coa' },
  openGraph: {
    title: 'Verification Dashboard — PeptiDex',
    description:
      'Aggregated peptide verification data: vendor COAs, community submissions, and independent testing results from Finnrick and PeptiDex labs.',
    url: 'https://peptidex.app/coa',
    type: 'website',
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Verification Dashboard — PeptiDex',
  description: 'Aggregated peptide verification data from vendor COAs, community testing, and independent labs.',
  url: 'https://peptidex.app/coa',
  isPartOf: { '@type': 'WebSite', name: 'PeptiDex', url: 'https://peptidex.app' },
  inLanguage: 'en-US',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
    { '@type': 'ListItem', position: 2, name: 'Verification Dashboard', item: 'https://peptidex.app/coa' },
  ],
};

export default function CoaPage() {
  const stats = getGlobalStats();

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── PAGE HEADER ── */}
      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Verification Dashboard</span>
          </nav>
          <div className="section-label">§ Independent Verification Data</div>
          <h1 className="page-title">
            Peptide vendor <br />
            <em>verification</em> dashboard.
          </h1>
          <p className="page-subtitle">
            Aggregated quality data from vendor COAs, community submissions, and independent
            testing sources — displayed unfiltered for every vendor we cover.
          </p>
        </div>
      </header>

      <div className="about-content reveal space-y-16">

        {/* ── GLOBAL STATS ── */}
        <section id="global-stats">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 16, marginBottom: 48,
          }}>
            {[
              { icon: <ShieldCheck size={18} />, value: stats.totalVendors, label: 'Vendors Tracked' },
              { icon: <FileText size={18} />, value: stats.totalCOAs, label: 'COA Documents' },
              { icon: <Users size={18} />, value: stats.totalCommunity, label: 'Community Reports' },
              { icon: <FlaskConical size={18} />, value: stats.totalIndependent, label: 'Independent Tests' },
              { icon: <TrendingUp size={18} />, value: stats.totalDataPoints, label: 'Total Data Points' },
            ].map(s => (
              <div key={s.label} style={{
                padding: '20px', borderRadius: 12,
                background: 'rgba(22,22,26,0.6)', border: '1px solid var(--line)',
                textAlign: 'center',
              }}>
                <div style={{ color: 'var(--gold)', marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 28, fontFamily: 'var(--serif)', color: 'var(--ink)', marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 9, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── METHODOLOGY CALLOUT ── */}
        <section id="methodology">
          <div style={{
            background: 'rgba(201,169,97,0.06)', border: '1px solid rgba(201,169,97,0.2)',
            borderRadius: 16, padding: 32, marginBottom: 48,
          }}>
            <div className="section-label" style={{ marginBottom: 16 }}>§ Our approach</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 300, color: 'var(--ink)', marginBottom: 16, lineHeight: 1.2 }}>
              Three layers of <em style={{ color: 'var(--gold)' }}>verification.</em>
            </h2>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--ink-dim)', lineHeight: 1.75, marginBottom: 16 }}>
              No single source is sufficient. We aggregate vendor-supplied COAs, community-submitted testing
              results, and independent third-party lab data to give researchers a multi-layered view of vendor quality.
              All data is displayed unfiltered — including results that may be unfavorable to vendors we have affiliate
              relationships with.
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { icon: <FileText size={16} />, label: 'Vendor COAs annotated against published literature' },
                { icon: <Users size={16} />, label: 'Community-submitted results displayed with full attribution' },
                { icon: <FlaskConical size={16} />, label: 'Independent lab data cited editorially — never edited' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--gold)', fontSize: 13, fontFamily: 'var(--mono)', letterSpacing: '0.05em' }}>
                  {item.icon}
                  <span style={{ color: 'var(--ink-dim)' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VENDOR GRID (server-rendered summary) ── */}
        <section id="vendor-verification-grid">
          <div className="section-label" style={{ marginBottom: 24 }}>§ Vendor Verification Summary</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
            {vendorVerifications.map(v => (
              <div key={v.vendorSlug} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 24px', borderRadius: 12,
                border: '1px solid var(--line)', background: 'rgba(22,22,26,0.5)',
                flexWrap: 'wrap', gap: 12,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: getTierColor(v.tier), flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--ink)' }}>{v.vendorName}</div>
                    <div style={{ fontSize: 10, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.08em' }}>
                      {getTierLabel(v.tier)} · {v.stats.totalDocuments} docs · {v.stats.totalIndependentTests} independent tests
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {v.stats.overallPassRate !== null && (
                    <span style={{
                      fontFamily: 'var(--serif)', fontSize: 18,
                      color: v.stats.overallPassRate >= 90 ? '#7fb77e' : v.stats.overallPassRate >= 75 ? 'var(--gold)' : 'var(--amber)',
                    }}>
                      {Math.round(v.stats.overallPassRate)}%
                    </span>
                  )}
                  <span style={{ fontSize: 9, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Pass Rate</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PER-VENDOR DASHBOARDS (client component) ── */}
        <CoaClientPage />

      </div>

      <div className="disclaimer-strip">
        ⚠ Educational only · Not medical advice · Verification data is aggregated from multiple sources with full attribution · PeptiDex displays all data unfiltered
      </div>
    </main>
  );
}
