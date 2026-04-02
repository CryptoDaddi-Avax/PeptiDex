import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { stacks, getStackBySlug } from '@/data/stacks';
import { ShieldAlert, BookOpen, ChevronRight, Layers, ShoppingBag, ArrowRight, Beaker, Quote } from 'lucide-react';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { AuthorBio } from '@/components/author-bio';

export function generateStaticParams() {
  return stacks.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const stack = getStackBySlug(slug);
    if (!stack) return { title: 'Not Found' };

    const goalName = stack.stack_name.replace(' Stack', '');
    const title = `Best Peptides for ${goalName}: Research Stack Guide | PeptiDex`;
    const descTokens = stack.peptides.map(p => p.name).join(', ');
    const rawDesc = `Explore the best research peptides for ${goalName.toLowerCase()}. Comprehensive guide covering stack protocols, synergy rationale, and studies for ${descTokens}. Educational use only.`;
    const description = rawDesc.substring(0, 160);

    return {
      title,
      description,
      alternates: {
        canonical: `https://peptidex.app/stacks/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://peptidex.app/stacks/${slug}`,
        type: 'article',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      },
    };
  });
}

export default async function StackSeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stack = getStackBySlug(slug);
  if (!stack) notFound();

  const DATE_MOD = '2026-04-01';
  const AUTHOR = 'Editorial Team';
  const goalName = stack.stack_name.replace(' Stack', '');

  // --- JSON-LD SCHEMAS ---
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app' },
      { '@type': 'ListItem', position: 2, name: 'Stacks', item: 'https://peptidex.app/stacks' },
      { '@type': 'ListItem', position: 3, name: stack.stack_name, item: `https://peptidex.app/stacks/${slug}` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Best Peptide Stack for ${goalName}, Research-Backed Protocols`,
    description: `Explore the optimal peptide combinations for ${goalName.toLowerCase()}, with synergy rationale and preclinical study data.`,
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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://peptidex.app/stacks/${slug}`,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What peptides are in the ${stack.stack_name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `This research stack primarily utilizes ${stack.peptides.map(p => p.name).join(' and ')} to target ${goalName.toLowerCase()}.`,
        },
      },
      {
        '@type': 'Question',
        name: `How do these peptides work synergistically for ${goalName.toLowerCase()}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: stack.synergy_rationale,
        },
      },
      {
        '@type': 'Question',
        name: `Are these peptides safe to stack?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `All compound combinations carry cumulative experimental risks. These protocols are derived strictly from controlled preclinical literature and are not intended for human medical application. Researchers should evaluate the safety profiles of each individual peptide.`,
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
            <Link href="/stacks" className="hover:text-violet-400 transition-colors">Stacks</Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5" />
          <li className="text-zinc-300 font-medium" aria-current="page">{stack.stack_name}</li>
        </ol>
      </nav>

      {/* Top Disclaimer */}
      <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-3 mb-8">
        <div className="flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-400/80 leading-relaxed font-medium">
            <strong>RESEARCH & EDUCATIONAL USE ONLY:</strong> {SHORT_DISCLAIMER} The compounds and protocols discussed on this page are strictly for academic, laboratory, and preclinical investigation. Multi-peptide stacks exponentially increase experimental variability.
          </p>
        </div>
      </div>

      {/* Header */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 mb-4 leading-tight">
        Best Peptide Stack for {goalName}, Research-Backed Protocols
      </h1>
      <p className="text-sm text-zinc-500 mb-8">Last Updated: April 2026</p>

      <article className="space-y-12">
        {/* Section 1: Components */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl font-bold text-zinc-100">What Peptides Are Used in {goalName} Research?</h2>
          </div>
          <p className="text-zinc-400 leading-relaxed text-[15px] mb-5">
            {stack.goal} To achieve these targeted research outcomes, this specific combination relies on the synergistic interactions of the following compounds:
          </p>
          <ul className="space-y-3 pl-1">
            {stack.peptides.map((p) => {
              const pepSlug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <li key={p.name} className="flex flex-col gap-1.5 text-zinc-300 text-sm bg-zinc-900/40 p-4 rounded-lg border border-zinc-800/50">
                  <div className="flex items-center justify-between">
                    <strong className="text-zinc-100">{p.name}</strong>
                    <Link href={`/peptides/${pepSlug}`} className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 group">
                      View Profile <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                  <span className="text-zinc-400 text-sm leading-relaxed">{p.role_in_stack}</span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Section 2: Synergy Mechanism */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Beaker className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl font-bold text-zinc-100">How This Stack Is Used in Research</h2>
          </div>
          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30">
            <p className="text-zinc-400 text-[15px] leading-relaxed">
              {stack.synergy_rationale}
            </p>
          </div>
        </section>

        {/* Section 3: Study References */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl font-bold text-zinc-100">Study References</h2>
          </div>
          <div className="space-y-4">
            {stack.supporting_studies?.slice(0, 3).map((study, idx) => (
              <a key={idx} href={study.pubmed_url} target="_blank" rel="noopener noreferrer" className="block p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-violet-500/30 transition-colors group">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-sm text-zinc-300 group-hover:text-violet-300 transition-colors leading-relaxed">
                    <Quote className="inline-block w-4 h-4 text-zinc-600 mr-2 -mt-1" />
                    {study.description}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-0.5" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Section 4: Vendors (Affiliate CTA) */}
        <section className="mt-12">
          <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-violet-500/20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />
            
            <ShoppingBag className="w-8 h-8 text-violet-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-zinc-100 mb-3">Source These Peptides</h2>
            <p className="text-zinc-400 leading-relaxed max-w-lg mx-auto mb-8 text-[15px]">
              Purchasing ultra-high purity, laboratory-grade peptides is critical for verifiable research. We only recommend vendors providing third-party HPLC Certificates of Analysis (COA). Look for "stack bundles" or individual components.
            </p>
            <Link 
              href="/vendors" 
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
            >
              View Trusted Vendors <ChevronRight className="w-4 h-4" />
            </Link>
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

        {/* Section 5: Explore Other Stacks */}
        <section className="mt-16 border-t border-zinc-800 pt-10">
          <h2 className="text-xl font-bold text-zinc-100 mb-6">Explore Other Goal Stacks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {stacks.filter(s => s.slug !== stack.slug).map(s => (
              <Link key={s.slug} href={`/stacks/${s.slug}`} className="p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-900 hover:border-violet-500/30 transition-colors">
                <p className="text-sm font-semibold text-zinc-300">{s.stack_name}</p>
              </Link>
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
          <strong>DISCLAIMER:</strong> The information provided in this research guide is intended exclusively for educational, informational, and academic purposes. The compounds discussed are experimental tools not approved by the Food and Drug Administration (FDA) for human diagnosis, treatment, or cure of any disease. Polypharmacy compounding and stacking introduces significant exponential experimental variables. Always consult a licensed medical professional before interacting with any novel biological compounds.
        </p>
      </div>
    </div>
  );
}
