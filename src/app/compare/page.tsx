import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, GitCompare, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Peptide Comparisons — Head-to-Head Compound Analysis | PeptideX',
  description: 'Evidence-based peptide comparisons: GHK-Cu vs BPC-157, semaglutide vs tirzepatide, oral vs injectable peptides, and more. Side-by-side research analysis with cited sources.',
  alternates: { canonical: 'https://peptidex.app/compare' },
  openGraph: {
    title: 'Peptide Comparisons — Head-to-Head Compound Analysis | PeptideX',
    description: 'Side-by-side research comparisons of popular peptide compounds with data tables, cited sources, and expert analysis.',
    url: 'https://peptidex.app/compare',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const COMPARISONS = [
  {
    slug: 'ghk-cu-vs-bpc-157',
    title: 'GHK-Cu vs BPC-157',
    subtitle: 'Anti-aging peptide vs healing peptide — which does what?',
    tags: ['Anti-Aging', 'Healing', 'Skin'],
    color: 'violet',
  },
  {
    slug: 'semaglutide-vs-tirzepatide',
    title: 'Semaglutide vs Tirzepatide',
    subtitle: 'Single vs dual GLP-1 agonist — clinical trial data compared.',
    tags: ['Weight Loss', 'GLP-1', 'FDA Approved'],
    color: 'emerald',
  },
  {
    slug: 'oral-vs-injectable-peptides',
    title: 'Oral vs Injectable Peptides',
    subtitle: 'Bioavailability, convenience, and the new oral GLP-1 era.',
    tags: ['Administration', 'Oral', 'Injectable'],
    color: 'blue',
  },
  {
    slug: 'bpc-157-vs-tb-500',
    title: 'BPC-157 vs TB-500',
    subtitle: 'Two healing peptides, two different mechanisms — full breakdown.',
    tags: ['Healing', 'Recovery', 'Stacking'],
    color: 'amber',
  },
];

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  violet: { bg: 'from-violet-900/20 to-zinc-900', border: 'border-violet-500/20 hover:border-violet-500/40', text: 'text-violet-400', badge: 'bg-violet-500/15 text-violet-300 border-violet-500/30' },
  emerald: { bg: 'from-emerald-900/20 to-zinc-900', border: 'border-emerald-500/20 hover:border-emerald-500/40', text: 'text-emerald-400', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  blue: { bg: 'from-blue-900/20 to-zinc-900', border: 'border-blue-500/20 hover:border-blue-500/40', text: 'text-blue-400', badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
  amber: { bg: 'from-amber-900/20 to-zinc-900', border: 'border-amber-500/20 hover:border-amber-500/40', text: 'text-amber-400', badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
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
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-300 font-medium">Compare</span>
      </nav>

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
        {COMPARISONS.map((comp) => {
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

      <section className="rounded-2xl bg-zinc-900/30 border border-zinc-800/50 p-6 space-y-3">
        <h2 className="text-lg font-bold text-zinc-100">About Our Comparisons</h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Every comparison on PeptideX is sourced from peer-reviewed research, registered clinical trials, and published pharmacological data. We present objective analysis — not rankings or endorsements. All compounds discussed are for educational reference only.
        </p>
        <p className="text-xs text-zinc-500 italic">
          <Link href="/disclaimer" className="text-violet-400 hover:text-violet-300 transition-colors">Read our full medical disclaimer.</Link>
        </p>
      </section>
    </div>
  );
}
