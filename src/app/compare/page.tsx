import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, GitCompare, ArrowRight, Store } from 'lucide-react';
import { ResearchContextSidebar } from '@/components/research-context-sidebar';

export const metadata: Metadata = {
  title: 'Peptide Comparisons — Head-to-Head Compound Analysis | PeptiDex',
  description: 'Evidence-based peptide comparisons: GHK-Cu vs BPC-157, semaglutide vs tirzepatide, oral vs injectable peptides, and more. Side-by-side research analysis with cited sources.',
  alternates: { canonical: 'https://peptidex.app/compare' },
  openGraph: {
    title: 'Peptide Comparisons — Head-to-Head Compound Analysis | PeptiDex',
    description: 'Side-by-side research comparisons of popular peptide compounds with data tables, cited sources, and expert analysis.',
    url: 'https://peptidex.app/compare',
    type: 'website',
    images: [{ url: 'https://peptidex.app/og-image.png', width: 1200, height: 630 }],
  },
};

import { comparisons } from '@/data/comparisons';

const VENDOR_COMPARISONS: { slug: string; title: string; subtitle: string; tags: string[]; color: string }[] = [];

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  violet: { bg: 'from-violet-900/20 to-zinc-900', border: 'border-violet-500/20 hover:border-violet-500/40', text: 'text-violet-400', badge: 'bg-violet-500/15 text-violet-300 border-violet-500/30' },
  emerald: { bg: 'from-emerald-900/20 to-zinc-900', border: 'border-emerald-500/20 hover:border-emerald-500/40', text: 'text-emerald-400', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  blue: { bg: 'from-blue-900/20 to-zinc-900', border: 'border-blue-500/20 hover:border-blue-500/40', text: 'text-blue-400', badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
  amber: { bg: 'from-amber-900/20 to-zinc-900', border: 'border-amber-500/20 hover:border-amber-500/40', text: 'text-amber-400', badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  teal: { bg: 'from-teal-900/20 to-zinc-900', border: 'border-teal-500/20 hover:border-teal-500/40', text: 'text-teal-400', badge: 'bg-teal-500/15 text-teal-300 border-teal-500/30' },
};

export default function CompareIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://peptidex.app/compare' },
    ],
  };

  return (
    <main id="main-content">
      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Compare</span>
          </nav>
          <div className="section-label">§ Analysis</div>
          <h1 className="page-title">
            Peptide Comparisons.
          </h1>
          <p className="page-subtitle">Evidence-based head-to-head compound analysis with cited sources and data tables.</p>
        </div>
      </header>

      <div className="about-content reveal space-y-16">

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <GitCompare className="w-6 h-6 text-violet-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-100">Peptide Comparisons</h1>
        </div>
        <p className="text-[15px] text-zinc-400 leading-relaxed max-w-2xl">
          Head-to-head, evidence-based comparisons of popular peptide compounds. Each comparison includes data tables, mechanism breakdowns, efficacy analysis from published research, and cited sources.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {comparisons.map((comp) => {
          const colors = COLOR_MAP[comp.color];
          return (
            <Link
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              className={`block rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} p-6 transition-all group`}
            >
              <div className="flex items-center gap-2 mb-3">
                <GitCompare className={`w-5 h-5 ${colors.text}`} />
                <h2 className={`text-lg font-bold text-zinc-100 group-hover:${colors.text} transition-colors`}>{comp.title}</h2>
              </div>
              <p className="text-sm text-zinc-400 mb-4">{comp.subtitle}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {comp.tags.map((tag) => (
                  <span key={tag} className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${colors.badge} rounded border`}>{tag}</span>
                ))}
              </div>
              <span className={`inline-flex items-center gap-1 text-xs font-semibold ${colors.text} group-hover:gap-2 transition-all`}>
                Read comparison <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          );
        })}
      </div>

      {/* Vendor Comparisons */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Store className="w-5 h-5 text-teal-400" />
          <h2 className="text-xl font-bold text-zinc-100">Vendor Comparisons</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {VENDOR_COMPARISONS.map((comp) => {
            const colors = COLOR_MAP[comp.color];
            return (
              <Link
                key={comp.slug}
                href={`/compare/vendors/${comp.slug}`}
                className={`block rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} p-6 transition-all group`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Store className={`w-5 h-5 ${colors.text}`} />
                  <h3 className={`text-lg font-bold text-zinc-100 group-hover:${colors.text} transition-colors`}>{comp.title}</h3>
                </div>
                <p className="text-sm text-zinc-400 mb-4">{comp.subtitle}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {comp.tags.map((tag) => (
                    <span key={tag} className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${colors.badge} rounded border`}>{tag}</span>
                  ))}
                </div>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold ${colors.text} group-hover:gap-2 transition-all`}>
                  Compare vendors <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ═══════ RESEARCH CONTEXT SIDEBAR ═══════ */}
      <ResearchContextSidebar />

      <section className="rounded-2xl bg-zinc-900/30 border border-zinc-800/50 p-6 space-y-3">
        <h2 className="text-lg font-bold text-zinc-100">About Our Comparisons</h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Every comparison on PeptiDex is sourced from peer-reviewed research, registered clinical trials, and published pharmacological data. We present objective analysis — not rankings or endorsements. All compounds discussed are for educational reference only.
        </p>
        <p className="text-xs text-zinc-500 italic">
          <Link href="/disclaimers" className="text-violet-400 hover:text-violet-300 transition-colors">Read our full medical disclaimer.</Link>
        </p>
      </section>
      </div>
      
    </main>
  );
}
