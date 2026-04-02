import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { peptides, getPeptideBySlug } from '@/data/peptides';
import { stacks } from '@/data/stacks';
import { pricingData } from '@/data/pricing';
import { ShieldAlert, BookOpen, ChevronRight, ShoppingBag, Beaker, Layers, Quote, DollarSign } from 'lucide-react';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { AuthorBio } from '@/components/author-bio';

// Generate static params for all 33 peptides
export function generateStaticParams() {
  return peptides.map((p) => ({ slug: p.slug }));
}

// Generate unique SEO metadata per peptide
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const peptide = getPeptideBySlug(slug);
    if (!peptide) return { title: 'Not Found' };

    const title = `${peptide.name} Research Guide: Studies, Protocols & Trusted Vendors | PeptiDex`;
    // Create a 150-160 char limit description based on the mechanism + dosing
    const rawDesc = `Explore ${peptide.name} research, clinical study summaries, common protocols (${peptide.dosing?.typical_dose_mcg?.[0] || ''}-${peptide.dosing?.typical_dose_mcg?.[1] || ''}mcg), and find trusted research vendors. Educational use only.`;
    const description = rawDesc.substring(0, 160);

    return {
      title,
      description,
      alternates: {
        canonical: `https://peptidex.app/peptides/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://peptidex.app/peptides/${slug}`,
        type: 'article',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      },
    };
  });
}

export default async function PeptideSeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const peptide = getPeptideBySlug(slug);
  if (!peptide) notFound();

  // Find related stacks containing this peptide
  const relatedStacks = stacks.filter((s) =>
    s.peptides.some((sp) => sp.name.toLowerCase().includes(peptide.name.toLowerCase()))
  );

  const DATE_MOD = '2026-04-01';
  const AUTHOR = 'Dr. E. Vance';

  // --- JSON-LD SCHEMAS ---
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app' },
      { '@type': 'ListItem', position: 2, name: 'Peptides', item: 'https://peptidex.app/library' },
      { '@type': 'ListItem', position: 3, name: peptide.name, item: `https://peptidex.app/peptides/${slug}` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `${peptide.name}: Research Overview, Dosing Protocols & Trusted Sources`,
    description: `Explore ${peptide.name} research, preclinical study summaries, common protocols used in studies, and find trusted research-grade sources.`,
    author: {
      '@type': 'Organization',
      name: 'PeptiDex Educational Team',
      url: 'https://peptidex.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PeptiDex',
      logo: { '@type': 'ImageObject', url: 'https://peptidex.app/logo.png' },
    },
    datePublished: '2026-03-31',
    dateModified: DATE_MOD,
    keywords: `${peptide.name} research, ${peptide.name} studies, ${peptide.name} protocols, peptide vendors, ${peptide.category}`,
    about: {
      '@type': 'MedicalEntity',
      name: `${peptide.name} Peptide`,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the research half-life of ${peptide.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `In clinical literature, ${peptide.name} demonstrates a half-life of approximately ${peptide.half_life_hours} hours.`,
        },
      },
      {
        '@type': 'Question',
        name: `What are the primary benefits observed in ${peptide.name} studies?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Preclinical and clinical studies identify primary mechanisms targeting: ${peptide.primary_benefits}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Are there common side effects documented in ${peptide.name} studies?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: peptide.side_effects && peptide.side_effects.length > 0
            ? `Reported side effects in literature include ${peptide.side_effects.map(s => s.name).join(', ')}. Incidence is generally ${peptide.side_effects[0]?.incidence || 'uncommon'}.`
            : `Extensive severe adverse effects have not been consistently documented in controlled studies, however all research peptides carry inherent experimental risks.`,
        },
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-[13px] text-zinc-500">
          <li>
            <Link href="/" className="hover:text-violet-400 transition-colors">Home</Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5" />
          <li>
            <Link href="/library" className="hover:text-violet-400 transition-colors">Peptides</Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5" />
          <li className="text-zinc-300 font-medium" aria-current="page">{peptide.name}</li>
        </ol>
      </nav>

      {/* Top Disclaimer */}
      <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-3 mb-8">
        <div className="flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-400/80 leading-relaxed font-medium">
            <strong>RESEARCH & EDUCATIONAL USE ONLY:</strong> {SHORT_DISCLAIMER} The compounds and protocols discussed on this page are strictly for academic, laboratory, and preclinical investigation. {peptide.name} is not FDA approved for human consumption.
          </p>
        </div>
      </div>

      {/* Header */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 mb-4 leading-tight">
        {peptide.name}: Research Overview, Dosing Protocols & Trusted Sources
      </h1>
      <p className="text-sm text-zinc-500 mb-8">Last Updated: April 2026</p>

      <article className="space-y-12">
        {/* Section 1: Overview */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Beaker className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl font-bold text-zinc-100">What Is {peptide.name}?</h2>
          </div>
          <p className="text-zinc-400 leading-relaxed text-[15px]">
            {peptide.mechanism} {peptide.name} is categorized as a {peptide.category} peptide. It is extensively evaluated in laboratory settings for its potential to drive {peptide.primary_benefits.toLowerCase()}. By understanding its pathways and affinity, researchers can precisely target specific cellular and metabolic responses.
          </p>
        </section>

        {/* Section 2: Research */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl font-bold text-zinc-100">What Does the Research Say?</h2>
          </div>
          <p className="text-zinc-400 mb-6 text-[15px]">The following are key preclinical and clinical findings demonstrating the mechanisms of {peptide.name}:</p>
          <div className="space-y-4">
            {peptide.key_studies?.slice(0, 3).map((study, idx) => (
              <a key={idx} href={study.pubmed_url} target="_blank" rel="noopener noreferrer" className="block p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-violet-500/30 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-zinc-200 group-hover:text-violet-300 transition-colors">{study.title}</h3>
                  <ChevronRight className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3 gap-2 flex flex-col">
                  {study.summary}
                </p>
                <span className="text-[10px] uppercase font-bold text-zinc-600 bg-zinc-800 px-2 py-1 rounded inline-block">
                  Evidence: {study.evidence_level.replace('-', ' ')}
                </span>
              </a>
            ))}
            {(!peptide.key_studies || peptide.key_studies.length === 0) && (
              <p className="text-sm text-zinc-500 italic">No direct studies mapped in the current database extraction.</p>
            )}
          </div>
        </section>

        {/* Section 3: Protocols */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl font-bold text-zinc-100">Common Research Protocols</h2>
          </div>
          <p className="text-zinc-400 mb-5 text-[15px]">
            Based on established preclinical documentation and laboratory norms, researchers typically design investigation protocols using the following parameters carefully adjusted for animal equivalent dosage:
          </p>
          <ul className="space-y-3 pl-1">
            <li className="flex gap-3 text-zinc-300 text-sm bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/50">
              <strong className="text-zinc-100 min-w-[120px]">Typical Dose:</strong> 
              <span>{peptide.dosing?.typical_dose_mcg ? `${peptide.dosing.typical_dose_mcg[0]}mcg to ${peptide.dosing.typical_dose_mcg[1]}mcg` : "Dosage varies by experimental design"} per administration.</span>
            </li>
            <li className="flex gap-3 text-zinc-300 text-sm bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/50">
              <strong className="text-zinc-100 min-w-[120px]">Frequency:</strong> 
              <span>{peptide.dosing?.frequency || 'Varies based on study methodology.'}</span>
            </li>
            <li className="flex gap-3 text-zinc-300 text-sm bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/50">
              <strong className="text-zinc-100 min-w-[120px]">Administration:</strong> 
              <span>{peptide.dosing?.route || 'Subcutaneous (SubQ) injection'} in most studies.</span>
            </li>
            <li className="flex gap-3 text-zinc-300 text-sm bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/50">
              <strong className="text-zinc-100 min-w-[120px]">Cycle Duration:</strong> 
              <span>{peptide.dosing?.cycle_weeks ? `${peptide.dosing.cycle_weeks[0]} to ${peptide.dosing.cycle_weeks[1]} weeks` : 'Continuous or cyclical depending on model'} depending on severity of condition being studied.</span>
            </li>
          </ul>
        </section>

        {/* Section 4: Stacks */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl font-bold text-zinc-100">{peptide.name} Stacks</h2>
          </div>
          <p className="text-zinc-400 mb-4 text-[15px]">
            {peptide.name} is frequently studied in combination with other active compounds to provide complementary mechanisms of action:
          </p>
          <div className="space-y-3">
            {relatedStacks.length > 0 ? (
              relatedStacks.map((stack) => {
                const partnerPeptides = stack.peptides.filter(p => !p.name.toLowerCase().includes(peptide.name.toLowerCase())).map(p => p.name).join(' + ');
                return (
                  <Link href={`/stacks/${stack.slug}`} key={stack.stack_name} className="block p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-violet-500/40 transition-colors">
                    <h3 className="text-violet-400 font-bold mb-2 flex items-center gap-2">
                      {stack.stack_name} <ChevronRight className="w-3.5 h-3.5" />
                    </h3>
                    <p className="text-xs text-zinc-300 mb-1 font-semibold">Includes: {peptide.name} + {partnerPeptides}</p>
                    <p className="text-sm text-zinc-400 line-clamp-2">{stack.synergy_rationale}</p>
                  </Link>
                );
              })
            ) : (
              <div className="p-4 rounded-xl border border-zinc-800">
                <p className="text-sm text-zinc-400">Currently, there are no specific highly-tested multi-compound stacks published in our curated library featuring {peptide.name}. It is primarily studied as a standalone agent.</p>
              </div>
            )}
          </div>
        </section>

        {/* Section 5: Vendors (Affiliate Pricing Matrix) */}
        <section className="mt-12" id="vendors">
          <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-violet-500/20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />
            
            <ShoppingBag className="w-8 h-8 text-violet-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-zinc-100 mb-3">Where to Source {peptide.name}</h2>
            <p className="text-zinc-400 leading-relaxed max-w-lg mx-auto mb-8 text-[15px]">
              Purchasing ultra-high purity, laboratory-grade peptides is critical for verifiable research. We specifically evaluate vendors establishing continuous third-party HPLC & MS certificates.
            </p>

            {(() => {
              const pricing = pricingData.find(p => p.slug === peptide.slug);
              if (!pricing) {
                return (
                  <Link 
                    href={`/vendors#${peptide.slug}`} 
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
                  >
                    View Trusted Vendors Directory <ChevronRight className="w-4 h-4" />
                  </Link>
                );
              }
              
              return (
                <div className="text-left bg-zinc-950/80 rounded-xl border border-zinc-800/60 overflow-hidden shadow-2xl">
                  {/* Matrix Header */}
                  <div className="bg-zinc-900/40 p-4 border-b border-zinc-800/50 flex items-center justify-between">
                     <span className="font-semibold text-zinc-200">{peptide.name} Pricing ({pricing.typical_vial_mg}mg)</span>
                     <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded">Avg: ${pricing.avg_price_usd}</span>
                  </div>
                  {/* Vendor Rows */}
                  <div className="divide-y divide-zinc-800/40">
                    {pricing.vendors?.map((v, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row items-center justify-between p-4 md:px-6 hover:bg-zinc-800/20 transition-colors gap-4">
                        <div className="flex items-center gap-3 w-full md:w-auto">
                           {v.vendor === "Ascension Peptides" && <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0"></span>}
                           {v.vendor === "Amino Club" && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>}
                           {v.vendor === "Soma Chems" && <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>}
                           <div>
                             <p className="font-bold text-zinc-200">{v.vendor}</p>
                             <p className="text-[10px] text-zinc-500 border border-zinc-700/50 inline-block px-1.5 rounded bg-zinc-800/30 mt-1">Verified COAs</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                           <div className="text-left md:text-right">
                             <p className="text-sm text-zinc-500">Price/Vial</p>
                             <p className="text-lg font-bold text-zinc-100">${v.price_usd}</p>
                           </div>
                           <Link 
                             href={v.link}
                             rel={v.link.startsWith('http') ? "nofollow noopener sponsored" : ""}
                             target={v.link.startsWith('http') ? "_blank" : "_self"}
                             className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-zinc-800 hover:bg-violet-600 text-zinc-200 hover:text-white transition-all border border-zinc-700 hover:border-violet-500 shrink-0"
                           >
                             Buy Now
                           </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
                <h3 className="font-semibold text-zinc-200 mb-2">{faq.name}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

      </article>

      {/* Author Bio */}
      <div className="mt-12">
         <AuthorBio name={AUTHOR} />
      </div>

      {/* Bottom Disclaimer */}
      <div className="mt-12 pt-8 border-t border-zinc-800">
        <p className="text-xs text-zinc-500 leading-relaxed text-justify">
          <strong>DISCLAIMER:</strong> The information provided in this research guide is intended exclusively for educational, informational, and academic purposes. {peptide.name} is an investigational compound not approved by the Food and Drug Administration (FDA) for human diagnosis, treatment, or cure of any disease. Reference to "dosing" or "protocols" strictly refers to methodological parameters utilized in preclinical animal models or independent laboratory settings, and must never be interpreted as clinical medical advice. Always consult a licensed medical professional before interacting with any novel biological compounds.
        </p>
      </div>
    </div>
  );
}
