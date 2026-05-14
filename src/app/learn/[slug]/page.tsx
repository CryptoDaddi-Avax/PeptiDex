import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { peptides, getPeptideBySlug } from '@/data/peptides';
import { vendorPricing } from '@/data/vendor-pricing';
import {
  BookOpen, Beaker, FlaskConical, ShieldAlert, FileText, ArrowRight,
  ExternalLink, ChevronRight, Activity, Dna, DollarSign
} from 'lucide-react';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AutoLink } from '@/components/auto-link';
import { SchemaInjector } from '@/components/schema-injector';

// ─── STATIC GENERATION ──────────────────────────────────────────

export function generateStaticParams() {
  return peptides.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const peptide = getPeptideBySlug(slug);
    if (!peptide) return { title: 'Not Found' };

    const title = `What Is ${peptide.name}? — Mechanism, Research & Safety | PeptiDex`;
    const description = `Learn about ${peptide.name}: how it works, what the research says, safety profile, and key studies. Neutral, evidence-based educational guide by PeptiDex.`.substring(0, 160);

    return {
      title,
      description,
      alternates: { canonical: `https://peptidex.app/learn/${slug}` },
      openGraph: {
        title,
        description,
        url: `https://peptidex.app/learn/${slug}`,
        type: 'article',
        images: [{ url: `https://peptidex.app/api/og?title=${encodeURIComponent(`What Is ${peptide.name}?`)}&type=learn`, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `What Is ${peptide.name}? — Educational Guide | PeptiDex`,
        description,
      },
    };
  });
}

const DATE_MOD = new Date().toISOString().slice(0, 10);

export default async function LearnPeptidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const peptide = getPeptideBySlug(slug);
  if (!peptide) notFound();

  // Related peptides from same category
  const relatedLearning = peptides
    .filter((p) => p.category === peptide.category && p.slug !== peptide.slug)
    .slice(0, 4);

  // Check if this peptide has pricing data for smart linking
  const hasPricing = vendorPricing.some((vp) => vp.slug === peptide.slug);

  // JSON-LD Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `What Is ${peptide.name}? — Educational Research Guide`,
    description: `Evidence-based educational guide to ${peptide.name}: mechanism of action, research studies, and safety profile.`,
    url: `https://peptidex.app/learn/${slug}`,
    datePublished: '2026-01-15',
    dateModified: DATE_MOD,
    publisher: { '@type': 'Organization', name: 'PeptiDex', url: 'https://peptidex.app' },
    author: { '@type': 'Organization', name: 'PeptiDex Research Team' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://peptidex.app/learn/${slug}` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Learn', item: 'https://peptidex.app/learn' },
      { '@type': 'ListItem', position: 3, name: peptide.name, item: `https://peptidex.app/learn/${slug}` },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-12">
      <SchemaInjector schema={[articleSchema, breadcrumbSchema]} />

      {/* ═══════ BREADCRUMBS ═══════ */}
      <Breadcrumbs items={[
        { name: 'Home', url: 'https://peptidex.app/' },
        { name: 'Learn', url: 'https://peptidex.app/learn' },
        { name: peptide.name }
      ]} />

      <AutoLink>
      {/* ═══════ HEADER ═══════ */}
      <header className="space-y-5">
        {/* Educational Intent Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Educational Guide</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          What Is {peptide.name}?
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
          A neutral, research-backed overview of <strong className="text-zinc-300">{peptide.name}</strong> — its mechanism of action, published evidence, and current safety profile. This guide is designed for educational purposes and does not constitute medical advice.
        </p>
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> {peptide.key_studies?.length || 0} cited studies</span>
          <div className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>Updated: {DATE_MOD}</span>
          <div className="w-1 h-1 rounded-full bg-zinc-700" />
          <span className="text-zinc-500">{peptide.category}</span>
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-3">
          <div className="flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-400/80 leading-relaxed font-medium">
              <strong>EDUCATIONAL USE ONLY:</strong> {SHORT_DISCLAIMER}
            </p>
          </div>
        </div>
      </header>

      <article className="space-y-14">

        {/* ═══════ OVERVIEW ═══════ */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Dna className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-100">Overview</h2>
          </div>
          <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 space-y-4">
            <p className="text-[15px] text-zinc-300 leading-relaxed">
              <strong className="text-zinc-100">{peptide.name}</strong> is classified as a <strong className="text-zinc-200">{peptide.category.toLowerCase()}</strong> peptide. {peptide.primary_benefits}.
            </p>
            <p className="text-[15px] text-zinc-300 leading-relaxed">
              {peptide.mechanism}
            </p>
            {peptide.aliases && peptide.aliases.length > 0 && (
              <p className="text-sm text-zinc-500">
                <strong className="text-zinc-400">Also known as:</strong> {peptide.aliases.join(', ')}
              </p>
            )}

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
                <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Category</p>
                <p className="text-sm text-zinc-200 font-semibold">{peptide.category}</p>
              </div>
              {peptide.half_life_hours && (
                <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Half-Life</p>
                  <p className="text-sm text-zinc-200 font-semibold">{peptide.half_life_hours}h</p>
                </div>
              )}
              <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
                <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Route</p>
                <p className="text-sm text-zinc-200 font-semibold">{peptide.dosing?.route || 'Varies'}</p>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
                <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">FDA Status</p>
                <p className={`text-sm font-semibold ${peptide.is_fda_approved ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {peptide.is_fda_approved ? 'Approved' : 'Not Approved'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ MECHANISM OF ACTION ═══════ */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-100">How Does {peptide.name} Work?</h2>
          </div>
          <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 space-y-4">
            <p className="text-[15px] text-zinc-300 leading-relaxed">
              {peptide.mechanism}
            </p>
            <p className="text-[15px] text-zinc-300 leading-relaxed">
              At the molecular level, {peptide.name} operates through pathways characteristic of the <strong className="text-zinc-200">{peptide.category}</strong> class, interacting with target receptors and downstream signaling cascades to produce its observed effects.
            </p>
          </div>
        </section>

        {/* ═══════ PUBLISHED RESEARCH ═══════ */}
        {peptide.key_studies && peptide.key_studies.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-100">Published Research</h2>
            </div>
            <p className="text-[15px] text-zinc-400 mb-6">
              The following studies are indexed from PubMed and peer-reviewed journals:
            </p>
            <div className="space-y-4">
              {peptide.key_studies.map((study, idx) => (
                <a
                  key={idx}
                  href={study.pubmed_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-colors group"
                >
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h3 className="font-semibold text-zinc-200 group-hover:text-emerald-300 transition-colors text-sm">
                      <span className="text-emerald-400 font-bold mr-2">[{idx + 1}]</span>
                      {study.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-zinc-600 flex-shrink-0 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{study.summary}</p>
                  <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded inline-block ${
                    study.evidence_level === 'very-strong' || study.evidence_level === 'strong'
                      ? 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/20'
                      : study.evidence_level === 'moderate' || study.evidence_level === 'moderate-strong'
                      ? 'text-blue-300 bg-blue-500/10 border border-blue-500/20'
                      : 'text-zinc-400 bg-zinc-800 border border-zinc-700'
                  }`}>
                    Evidence: {study.evidence_level.replace('-', ' ')}
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ═══════ SAFETY PROFILE ═══════ */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-100">Safety Profile</h2>
          </div>
          <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 space-y-4">
            <p className="text-[15px] text-zinc-300 leading-relaxed">
              {peptide.safety_notes}
            </p>

            {peptide.side_effects && peptide.side_effects.length > 0 && (
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Side Effect</th>
                      <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Incidence</th>
                      <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Severity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {peptide.side_effects.map((se, idx) => (
                      <tr key={idx} className="hover:bg-zinc-800/20 transition-colors">
                        <td className="px-4 py-3 text-zinc-200 font-medium">{se.name}</td>
                        <td className="px-4 py-3 text-zinc-400">{se.incidence}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                            se.severity === 'mild' ? 'text-emerald-300 bg-emerald-500/10' :
                            se.severity === 'moderate' ? 'text-amber-300 bg-amber-500/10' :
                            'text-zinc-400 bg-zinc-800'
                          }`}>
                            {se.severity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* ═══════ COMMERCIAL INTENT BRIDGE — "Check Current Market Pricing" ═══════ */}
        <section>
          <div className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-violet-500/20 p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-violet-400" />
                <h2 className="text-xl font-bold text-zinc-100">Sourcing {peptide.name} for Research</h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                If you&apos;re looking to source <strong className="text-zinc-300">{peptide.name}</strong> for laboratory research, our vendor directory compares pricing, purity testing, and COA verification from independently vetted suppliers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                {hasPricing && (
                  <Link
                    href={`/vendors#${slug}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all"
                  >
                    Check Current Market Pricing <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                <Link
                  href="/compare/vendors/amino-club-vs-ascension-peptides"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 hover:border-violet-500/40 text-zinc-300 font-semibold text-sm transition-all"
                >
                  Compare Vendors Side by Side <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-[10px] text-zinc-600 leading-relaxed">
                <strong>Disclosure:</strong> PeptiDex may earn a commission from affiliate links. This does not affect our recommendations.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ FULL PROFILE LINK ═══════ */}
        <section>
          <Link
            href={`/library/${slug}`}
            className="block p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-violet-500/30 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Full Research Profile</p>
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-violet-400 transition-colors">
                  {peptide.name} — dosing, interactions, timelines & more
                </h3>
                <p className="text-sm text-zinc-400 mt-1">Comprehensive compound profile with sourcing information, stacking synergies, and outcome timelines.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-violet-400 transition-colors flex-shrink-0" />
            </div>
          </Link>
        </section>

      </article>
      </AutoLink>

      {/* ═══════ RELATED LEARNING ═══════ */}
      {relatedLearning.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-100">Related Educational Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedLearning.map((rp) => (
              <Link
                key={rp.slug}
                href={`/learn/${rp.slug}`}
                className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-blue-500/30 transition-colors group"
              >
                <p className="text-blue-400 font-bold text-sm group-hover:text-blue-300 transition-colors">{rp.name}</p>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{rp.primary_benefits}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <div className="rounded-xl bg-amber-950/20 border border-amber-500/20 p-5">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-200/90 font-semibold mb-1">Educational Content Disclaimer</p>
            <p className="text-xs text-amber-200/70 leading-relaxed">
              This guide is provided for educational and research purposes only. Nothing on this page should be interpreted as medical advice. Always consult a licensed healthcare professional.{' '}
              <Link href="/disclaimer" className="underline hover:text-amber-200 transition-colors">Read our full disclaimer.</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-zinc-600">
          Last updated: {DATE_MOD} · <Link href="/intro" className="text-zinc-500 hover:text-zinc-400 transition-colors">Educational Hub</Link> · <Link href="/about/editorial-policy" className="text-zinc-500 hover:text-zinc-400 transition-colors">Editorial Standards</Link>
        </p>
      </div>
    </div>
  );
}
