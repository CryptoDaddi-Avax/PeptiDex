import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { GitCompare, ArrowRight, Zap, AlertTriangle, DollarSign } from 'lucide-react';
import { comparisons } from '@/data/comparisons';
import { getPeptideBySlug } from '@/data/peptides';
import { vendorPricing } from '@/data/vendor-pricing';
import { ComparisonFAQ } from '@/components/compare/ComparisonFAQ';
import { PersonaBlock } from '@/components/compare/PersonaBlock';
import { StackCompatibility } from '@/components/compare/StackCompatibility';
import { ComparisonPricingBox } from '@/components/compare/ComparisonPricingBox';

export function generateStaticParams() {
  return comparisons.map((comp) => ({ slug: comp.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const comp = comparisons.find((c) => c.slug === slug);
    if (!comp) return { title: 'Not Found' };

    const peptideA = getPeptideBySlug(comp.peptideA);
    const peptideB = getPeptideBySlug(comp.peptideB);
    if (!peptideA || !peptideB) return { title: 'Not Found' };

    const nameA = peptideA.name;
    const nameB = comp.peptideA === comp.peptideB ? `${peptideB.name} (Variant)` : peptideB.name;
    const title = `${nameA} vs ${nameB}: Dosing, Half-Life, Side Effects + Which to Choose (2026) | PeptiDex`;
    const url = `https://peptidex.app/compare/${slug}`;
    const description = comp.seoDescription.length > 155 ? comp.seoDescription.slice(0, 152) + '...' : comp.seoDescription;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: { title, description, url, type: 'article', images: [{ url: 'https://peptidex.app/og-image.png', width: 1200, height: 630 }] },
      twitter: { card: 'summary_large_image', title, description, images: ['https://peptidex.app/og-image.png'] },
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

  const isSamePeptide = comp.peptideA === comp.peptideB;
  const nameA = peptideA.name;
  const nameB = isSamePeptide ? `${peptideB.name} (Without DAC)` : peptideB.name;

  const TITLE = `${nameA} vs ${nameB}: Mechanism, Dosing, Side Effects + Which to Choose (2026)`;
  const DATE_MOD = '2026-05-07';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://peptidex.app/compare' },
      { '@type': 'ListItem', position: 3, name: `${nameA} vs ${nameB}`, item: `https://peptidex.app/compare/${slug}` },
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

  const faqSchema = comp.faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: comp.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null;

  const relatedComparisons = comparisons
    .filter((c) => c.slug !== slug && (c.peptideA === comp.peptideA || c.peptideB === comp.peptideA || c.peptideA === comp.peptideB || c.peptideB === comp.peptideB))
    .slice(0, 3);

  // Lowest vendor price for each peptide
  const priceDataA = vendorPricing.find(p => p.slug === comp.peptideA);
  const priceDataB = vendorPricing.find(p => p.slug === comp.peptideB);
  const cheapestA = priceDataA?.vendors.filter(v => v.inStock).sort((a, b) => a.price_usd - b.price_usd)[0];
  const cheapestB = priceDataB?.vendors.filter(v => v.inStock).sort((a, b) => a.price_usd - b.price_usd)[0];

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/compare">Compare</Link>
            <span className="sep">/</span>
            <span className="current">{nameA} vs {nameB}</span>
          </nav>

          <div className="section-label">§ Head-to-Head Comparison</div>
          <h1 className="page-title">
            {nameA} vs {nameB}.
          </h1>
          <p className="page-subtitle">{comp.seoDescription}</p>
          
          <div className="flex items-center gap-2 mt-6">
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-${comp.color}-500/15 text-${comp.color}-300 border border-${comp.color}-500/30 rounded`}>
              {comp.tags[0]}
            </span>
          </div>
        </div>
      </header>

      <div className="about-content reveal space-y-16">

      {/* ── EDITOR NOTE (thin data warning) ── */}
      {comp.editorNote && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-300 mb-1">Editor's Note</p>
            <p className="text-sm text-amber-200/80 leading-relaxed">{comp.editorNote}</p>
          </div>
        </div>
      )}

      {/* ── QUICK VERDICT ── */}
      {comp.quickVerdict && (
        <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-violet-400" />
            <h2 className="font-bold text-violet-300 text-sm uppercase tracking-widest">Quick Verdict</h2>
          </div>
          <p className="text-zinc-200 leading-relaxed">{comp.quickVerdict}</p>
        </div>
      )}

      {/* ── COMPARISON TABLE ── */}
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
                <th className="px-4 py-4 text-sm font-bold text-emerald-400 uppercase tracking-wider w-[40%]">{nameA}</th>
                <th className="px-4 py-4 text-sm font-bold text-blue-400 uppercase tracking-wider w-[40%]">{isSamePeptide ? `${nameA} (With DAC)` : nameB}</th>
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
                <td className="px-4 py-4 text-zinc-400 font-medium">Route</td>
                <td className="px-4 py-4 text-zinc-300">{peptideA.dosing?.route || 'Varies'}</td>
                <td className="px-4 py-4 text-zinc-300">{peptideB.dosing?.route || 'Varies'}</td>
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
                <td className="px-4 py-4">{peptideA.safety_notes.includes('FDA-approved') || peptideA.is_fda_approved ? <span className="text-emerald-400 font-semibold">Approved</span> : <span className="text-amber-400">Research Only</span>}</td>
                <td className="px-4 py-4">{peptideB.safety_notes.includes('FDA-approved') || peptideB.is_fda_approved ? <span className="text-emerald-400 font-semibold">Approved</span> : <span className="text-amber-400">Research Only</span>}</td>
              </tr>
              <tr>
                <td className="px-4 py-4 text-zinc-400 font-medium">Evidence Grade</td>
                <td className="px-4 py-4">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {peptideA.key_studies[0]?.evidence_level ?? 'Preclinical'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {peptideB.key_studies[0]?.evidence_level ?? 'Preclinical'}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-4 text-zinc-400 font-medium">Key Studies</td>
                <td className="px-4 py-4 text-zinc-300">{peptideA.key_studies.length}+ indexed</td>
                <td className="px-4 py-4 text-zinc-300">{peptideB.key_studies.length}+ indexed</td>
              </tr>
              <tr className="bg-emerald-500/5">
                <td className="px-4 py-4 text-zinc-400 font-medium flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-emerald-400" />Lowest Price</td>
                <td className="px-4 py-4">
                  {cheapestA
                    ? <span className="text-emerald-300 font-bold">${cheapestA.price_usd.toFixed(2)}<span className="text-xs text-zinc-500 font-normal"> / {cheapestA.vial_mg}mg via {cheapestA.vendor}</span></span>
                    : <span className="text-zinc-500">—</span>}
                </td>
                <td className="px-4 py-4">
                  {cheapestB
                    ? <span className="text-emerald-300 font-bold">${cheapestB.price_usd.toFixed(2)}<span className="text-xs text-zinc-500 font-normal"> / {cheapestB.vial_mg}mg via {cheapestB.vendor}</span></span>
                    : <span className="text-zinc-500">—</span>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── RECOMMENDATION ── */}
      <section className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-8 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">Which one should you choose?</h2>
        <div className="prose prose-invert prose-zinc max-w-none text-zinc-300 leading-relaxed">
          {comp.recommendation}
        </div>
      </section>

      {/* ── PERSONA BLOCKS ── */}
      {(comp.personaA || comp.personaB) && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {comp.personaA && <PersonaBlock name={`Who Should Choose ${nameA}?`} description={comp.personaA} colorClass="emerald" />}
          {comp.personaB && <PersonaBlock name={`Who Should Choose ${isSamePeptide ? nameA + ' (With DAC)' : nameB}?`} description={comp.personaB} colorClass="blue" />}
        </section>
      )}

      {/* ── STACK COMPATIBILITY ── */}
      {comp.stackNote && (
        <StackCompatibility
          nameA={nameA}
          nameB={isSamePeptide ? nameA + ' (variant)' : nameB}
          note={comp.stackNote}
          compatible={comp.stackCompatible ?? true}
        />
      )}

      {/* ── VENDOR PRICING + BUYBOX ── */}
      <ComparisonPricingBox
        nameA={nameA}
        slugA={comp.peptideA}
        nameB={isSamePeptide ? `${nameA} (With DAC)` : nameB}
        slugB={comp.peptideB}
        isSamePeptide={isSamePeptide}
      />

      {/* ── FAQ ── */}
      {comp.faqs && comp.faqs.length > 0 && (
        <ComparisonFAQ faqs={comp.faqs} />
      )}

      {/* ── RELATED COMPARISONS ── */}
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

      {/* ── Internal Links ── */}
      <div className="pt-8 border-t border-zinc-800/50">
        <h3 className="text-lg font-bold text-zinc-100 mb-4">Deep Dive Profiles</h3>
        <div className="flex flex-wrap gap-4">
          <Link href={`/library/${comp.peptideA}`} className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">
            {nameA} Research Profile <ArrowRight className="w-4 h-4" />
          </Link>
          {!isSamePeptide && (
            <Link href={`/library/${comp.peptideB}`} className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">
              {nameB} Research Profile <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      
      </div>
    </main>
  );
}
