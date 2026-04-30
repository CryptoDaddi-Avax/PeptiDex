import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldAlert, GitCompare, ArrowRight } from 'lucide-react';
import { comparisons } from '@/data/comparisons';
import { getPeptideBySlug } from '@/data/peptides';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ShareBar } from '@/components/share-bar';
import { AffiliateSource } from '@/components/affiliate-source';

export function generateStaticParams() {
  return comparisons.map((comp) => ({
    slug: comp.slug,
  }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const comp = comparisons.find((c) => c.slug === slug);
    if (!comp) return { title: 'Not Found' };

    const peptideA = getPeptideBySlug(comp.peptideA);
    const peptideB = getPeptideBySlug(comp.peptideB);
    
    if (!peptideA || !peptideB) return { title: 'Not Found' };

    const title = `${peptideA.name} vs ${peptideB.name}: Studies, Dosing & Side Effects Compared (2026) | PeptiDex`;
    const url = `https://peptidex.app/compare/${slug}`;

    return {
      title,
      description: comp.seoDescription,
      alternates: { canonical: url },
      openGraph: {
        title,
        description: comp.seoDescription,
        url,
        type: 'article',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: comp.seoDescription,
        images: ['/og-image.png'],
      },
    };
  });
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comp = comparisons.find((c) => c.slug === slug);
  if (!comp) notFound();

  const peptideA = getPeptideBySlug(comp.peptideA);
  const peptideB = getPeptideBySlug(comp.peptideB);

  if (!peptideA || !peptideB) notFound();

  const TITLE = `${peptideA.name} vs ${peptideB.name}: Complete Research Comparison (2026)`;
  const DATE_MOD = '2026-04-29';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://peptidex.app/compare' },
      { '@type': 'ListItem', position: 3, name: `${peptideA.name} vs ${peptideB.name}`, item: `https://peptidex.app/compare/${slug}` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    additionalType: 'ComparisonArticle',
    headline: TITLE,
    description: comp.seoDescription,
    image: 'https://peptidex.app/og-image.png',
    author: { '@type': 'Organization', name: 'PeptiDex Editorial Team', url: 'https://peptidex.app/about' },
    publisher: { '@type': 'Organization', name: 'PeptiDex', logo: { '@type': 'ImageObject', url: 'https://peptidex.app/logo.png' } },
    dateModified: DATE_MOD,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://peptidex.app/compare/${slug}` },
  };

  // Find related comparisons involving either peptide (max 3)
  const relatedComparisons = comparisons
    .filter((c) => c.slug !== slug && (c.peptideA === comp.peptideA || c.peptideB === comp.peptideA || c.peptideA === comp.peptideB || c.peptideB === comp.peptideB))
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Breadcrumbs items={[
        { name: 'Home', url: 'https://peptidex.app/' },
        { name: 'Compare', url: 'https://peptidex.app/compare' },
        { name: `${peptideA.name} vs ${peptideB.name}` }
      ]} />

      <header className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-${comp.color}-500/15 text-${comp.color}-300 border border-${comp.color}-500/30 rounded`}>
            {comp.tags[0]}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-100 leading-[1.1]">{TITLE}</h1>
        <p className="text-[16px] text-zinc-400 leading-relaxed max-w-2xl">{comp.seoDescription}</p>
      </header>

      {/* ═══════ COMPARISON TABLE ═══════ */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <GitCompare className="w-5 h-5 text-zinc-400" />
          <h2 className="text-xl font-bold text-zinc-100">Side-by-Side Analysis</h2>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-zinc-800 shadow-xl shadow-black/20">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/80">
              <tr className="border-b border-zinc-700">
                <th className="px-4 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider w-[20%]">Dimension</th>
                <th className="px-4 py-4 text-sm font-bold text-emerald-400 uppercase tracking-wider w-[40%]">{peptideA.name}</th>
                <th className="px-4 py-4 text-sm font-bold text-blue-400 uppercase tracking-wider w-[40%]">{peptideB.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 bg-zinc-900/20">
              <tr>
                <td className="px-4 py-4 text-zinc-400 font-medium">Mechanism</td>
                <td className="px-4 py-4 text-zinc-300">{peptideA.mechanism.split('.')[0]}.</td>
                <td className="px-4 py-4 text-zinc-300">{peptideB.mechanism.split('.')[0]}.</td>
              </tr>
              <tr>
                <td className="px-4 py-4 text-zinc-400 font-medium">Primary Benefits</td>
                <td className="px-4 py-4 text-zinc-300">{peptideA.primary_benefits}</td>
                <td className="px-4 py-4 text-zinc-300">{peptideB.primary_benefits}</td>
              </tr>
              <tr>
                <td className="px-4 py-4 text-zinc-400 font-medium">Typical Dose</td>
                <td className="px-4 py-4 text-zinc-300">{peptideA.dosing ? `${peptideA.dosing.typical_dose_mcg[0]}–${peptideA.dosing.typical_dose_mcg[1]}mcg` : 'Varies'}</td>
                <td className="px-4 py-4 text-zinc-300">{peptideB.dosing ? `${peptideB.dosing.typical_dose_mcg[0]}–${peptideB.dosing.typical_dose_mcg[1]}mcg` : 'Varies'}</td>
              </tr>
              <tr>
                <td className="px-4 py-4 text-zinc-400 font-medium">Frequency</td>
                <td className="px-4 py-4 text-zinc-300">{peptideA.dosing?.frequency || 'Varies'}</td>
                <td className="px-4 py-4 text-zinc-300">{peptideB.dosing?.frequency || 'Varies'}</td>
              </tr>
              <tr>
                <td className="px-4 py-4 text-zinc-400 font-medium">Half-Life</td>
                <td className="px-4 py-4 text-zinc-300">{peptideA.half_life_hours ? `${peptideA.half_life_hours} hours` : 'Unknown'}</td>
                <td className="px-4 py-4 text-zinc-300">{peptideB.half_life_hours ? `${peptideB.half_life_hours} hours` : 'Unknown'}</td>
              </tr>
              <tr>
                <td className="px-4 py-4 text-zinc-400 font-medium">FDA Status</td>
                <td className="px-4 py-4 text-zinc-300">{peptideA.safety_notes.includes('FDA-approved') ? <span className="text-emerald-400">Approved</span> : <span className="text-amber-400">Research Only</span>}</td>
                <td className="px-4 py-4 text-zinc-300">{peptideB.safety_notes.includes('FDA-approved') ? <span className="text-emerald-400">Approved</span> : <span className="text-amber-400">Research Only</span>}</td>
              </tr>
              <tr>
                <td className="px-4 py-4 text-zinc-400 font-medium">Clinical Studies</td>
                <td className="px-4 py-4 text-zinc-300">{peptideA.key_studies.length}+ key studies</td>
                <td className="px-4 py-4 text-zinc-300">{peptideB.key_studies.length}+ key studies</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════ EDITORIAL RECOMMENDATION ═══════ */}
      <section className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-8 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">Which one should you choose?</h2>
        <div className="prose prose-invert prose-zinc max-w-none">
          {comp.recommendation.split('. ').map((sentence, i, arr) => (
            <span key={i}>{sentence}{i !== arr.length - 1 ? '. ' : ''}</span>
          ))}
        </div>
      </section>

      {/* ═══════ SOURCING BLOCKS ═══════ */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <AffiliateSource peptideName={peptideA.name} slug={peptideA.slug} />
        </div>
        <div>
          <AffiliateSource peptideName={peptideB.name} slug={peptideB.slug} />
        </div>
      </section>

      <ShareBar title={TITLE} url={`https://peptidex.app/compare/${slug}`} />

      {/* ═══════ RELATED COMPARISONS ═══════ */}
      {relatedComparisons.length > 0 && (
        <section className="pt-8 border-t border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-100 mb-6">Related Comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedComparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <GitCompare className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 transition-colors" />
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{c.tags[0]}</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-200 group-hover:text-zinc-100">{c.title}</h3>
                <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1 group-hover:text-violet-400 transition-colors">
                  Read comparison <ArrowRight className="w-3 h-3" />
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ═══════ DISCLAIMER ═══════ */}
      <div className="rounded-xl bg-amber-950/20 border border-amber-500/20 p-5 mt-10">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200/70 leading-relaxed">
            This comparison is for educational purposes only. Many peptides are not FDA-approved for human therapeutic use. Consult a healthcare provider before using any peptide.{' '}
            <Link href="/disclaimer" className="underline hover:text-amber-200 transition-colors">Read full disclaimer.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
