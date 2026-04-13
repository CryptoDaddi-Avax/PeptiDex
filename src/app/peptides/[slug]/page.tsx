import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { peptides, getPeptideBySlug } from '@/data/peptides';
import { stacks } from '@/data/stacks';
import { pricingData } from '@/data/pricing';
import {
  ShieldAlert, BookOpen, ChevronRight, ShoppingBag, Beaker, Layers,
  DollarSign, Activity, FlaskConical, Syringe, AlertTriangle, ArrowRight,
  Calendar, GitCompare, HelpCircle, ExternalLink, Clock, FileText
} from 'lucide-react';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AutoLink } from '@/components/auto-link';
import { RelatedPeptides } from '@/components/related-peptides';
import { ShareBar } from '@/components/share-bar';

// ─── STATIC GENERATION ──────────────────────────────────────────

export function generateStaticParams() {
  return peptides.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const peptide = getPeptideBySlug(slug);
    if (!peptide) return { title: 'Not Found' };

    const title = `${peptide.name}: Research Profile, Mechanism & Safety | PeptideX`;
    const description = `Evidence-based ${peptide.name} profile: mechanism of action, published research, safety data, and clinical context. ${peptide.primary_benefits}. Cited peer-reviewed sources.`.substring(0, 160);

    return {
      title,
      description,
      alternates: { canonical: `https://peptidex.app/peptides/${slug}` },
      openGraph: {
        title,
        description,
        url: `https://peptidex.app/peptides/${slug}`,
        type: 'article',
        images: [{ url: `https://peptidex.app/api/og?title=${encodeURIComponent(peptide.name)}&type=profile`, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${peptide.name} — Research Profile | PeptideX`,
        description,
        images: [`https://peptidex.app/api/og?title=${encodeURIComponent(peptide.name)}&type=profile`],
      },
    };
  });
}

// ─── HELPER: Get related peptides for comparison ────────────────

function getRelatedPeptides(peptide: ReturnType<typeof getPeptideBySlug>) {
  if (!peptide) return [];
  const synergies = peptide.interactions?.synergies || [];
  return peptides
    .filter((p) => p.slug !== peptide.slug && (
      synergies.some(s => s.toLowerCase() === p.name.toLowerCase()) ||
      p.category === peptide.category
    ))
    .slice(0, 4);
}

function getComparisonPeptides(peptide: ReturnType<typeof getPeptideBySlug>) {
  if (!peptide) return [];
  return peptides
    .filter((p) => p.slug !== peptide.slug && (
      (peptide.interactions?.synergies || []).some(s => s.toLowerCase() === p.name.toLowerCase()) ||
      p.category === peptide.category
    ))
    .slice(0, 3);
}

// ─── MAIN PAGE COMPONENT ────────────────────────────────────────

export default async function PeptideProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const peptide = getPeptideBySlug(slug);
  if (!peptide) notFound();

  const relatedPeptides = getRelatedPeptides(peptide);
  const comparisonPeptides = getComparisonPeptides(peptide);
  const relatedStacks = stacks.filter((s) =>
    s.peptides.some((sp) => sp.name.toLowerCase().includes(peptide.name.toLowerCase()))
  );

  const DATE_MOD = '2026-04-03';
  const DATE_PUB = '2026-03-31';

  // ─── JSON-LD SCHEMAS ────────────────────────────────────────

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `${peptide.name}: Evidence-Based Research Profile`,
    description: `Comprehensive research profile for ${peptide.name} covering mechanism of action, published studies, safety data, and clinical context.`,
    url: `https://peptidex.app/peptides/${slug}`,
    image: 'https://peptidex.app/og-image.png',
    author: {
      '@type': 'Organization',
      name: 'PeptideX Editorial Team',
      url: 'https://peptidex.app/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PeptideX',
      logo: { '@type': 'ImageObject', url: 'https://peptidex.app/logo.png' },
    },
    datePublished: DATE_PUB,
    dateModified: DATE_MOD,
    about: { '@type': 'MedicalEntity', name: peptide.name },
    keywords: `${peptide.name}, ${peptide.aliases?.join(', ') || ''}, ${peptide.category}, peptide research`,
  };

  // Build dynamic FAQ entries
  const faqItems = [
    {
      q: `What is ${peptide.name}?`,
      a: `${peptide.name} is a ${peptide.category.toLowerCase()} peptide. ${peptide.mechanism}`,
    },
    {
      q: `What are the primary research benefits of ${peptide.name}?`,
      a: `Published research identifies primary mechanisms targeting: ${peptide.primary_benefits}. These findings come from ${peptide.key_studies?.length || 0}+ peer-reviewed studies indexed in our database.`,
    },
    {
      q: `What is the half-life of ${peptide.name}?`,
      a: peptide.half_life_hours
        ? `In published pharmacokinetic data, ${peptide.name} demonstrates a half-life of approximately ${peptide.half_life_hours} hour${peptide.half_life_hours !== 1 ? 's' : ''}.`
        : `The precise pharmacokinetic half-life of ${peptide.name} varies by route of administration and remains an area of active investigation.`,
    },
    {
      q: `Is ${peptide.name} FDA approved?`,
      a: peptide.is_fda_approved
        ? `Yes, ${peptide.name} has received FDA approval for specific indications. However, many research applications and off-label uses are still under investigation.`
        : `${peptide.name} is not currently FDA-approved for human therapeutic use. It is classified as a research compound and is studied under investigational protocols. Always consult a healthcare provider.`,
    },
    {
      q: `What are common side effects of ${peptide.name}?`,
      a: peptide.side_effects && peptide.side_effects.length > 0
        ? `Reported side effects in published literature include ${peptide.side_effects.map(s => `${s.name} (${s.incidence})`).join(', ')}. Most are classified as ${peptide.side_effects[0]?.severity || 'mild'} in severity.`
        : `Extensive severe adverse effects have not been consistently documented in controlled studies. However, all research peptides carry inherent experimental risks. Consult a healthcare provider.`,
    },
    {
      q: `How is ${peptide.name} administered?`,
      a: peptide.dosing
        ? `In research settings, ${peptide.name} is typically administered via ${peptide.dosing.route}. ${peptide.dosing.notes || ''}`
        : `Administration routes vary by research protocol. ${peptide.name} has been studied via subcutaneous injection, and in some cases topical or other routes depending on the research model.`,
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ═══════ BREADCRUMBS ═══════ */}
      <Breadcrumbs items={[
        { name: 'Home', url: 'https://peptidex.app/' },
        { name: 'Peptide Library', url: 'https://peptidex.app/peptides' },
        { name: peptide.category },
        { name: peptide.name }
      ]} />

      <AutoLink>
      {/* ═══════ SECTION 1: HERO / HEADER ═══════ */}
      <header className="space-y-6">
        {/* Disclaimer Banner */}
        <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-3">
          <div className="flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-400/80 leading-relaxed font-medium">
              <strong>EDUCATIONAL USE ONLY:</strong> {SHORT_DISCLAIMER}
              {' '}<Link href="/disclaimer" className="underline hover:text-amber-300 transition-colors">Read full disclaimer.</Link>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Title & Summary */}
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
              {peptide.name}
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              {peptide.primary_benefits}. Categorized as a <strong className="text-zinc-300">{peptide.category}</strong> peptide.
            </p>
            {peptide.aliases && peptide.aliases.length > 0 && (
              <p className="text-sm text-zinc-500">
                <strong className="text-zinc-400">Also known as:</strong> {peptide.aliases.join(', ')}
              </p>
            )}
            <div className="flex items-center gap-3 text-xs text-zinc-500 pt-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Updated: {DATE_MOD}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-zinc-700" />
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>{peptide.key_studies?.length || 0} cited studies</span>
              </div>
            </div>
          </div>

          {/* Quick Facts Card */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-5 space-y-3">
              <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Quick Facts</h2>
              <dl className="space-y-2.5">
                <div className="flex justify-between items-start gap-2">
                  <dt className="text-xs text-zinc-500 font-medium">Category</dt>
                  <dd className="text-xs text-zinc-200 font-semibold text-right">{peptide.category}</dd>
                </div>
                {peptide.half_life_hours && (
                  <div className="flex justify-between items-start gap-2">
                    <dt className="text-xs text-zinc-500 font-medium">Half-Life</dt>
                    <dd className="text-xs text-zinc-200 font-semibold">{peptide.half_life_hours}h</dd>
                  </div>
                )}
                <div className="flex justify-between items-start gap-2">
                  <dt className="text-xs text-zinc-500 font-medium">Route</dt>
                  <dd className="text-xs text-zinc-200 font-semibold">{peptide.dosing?.route || 'Varies'}</dd>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <dt className="text-xs text-zinc-500 font-medium">FDA Approved</dt>
                  <dd className={`text-xs font-semibold ${peptide.is_fda_approved ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {peptide.is_fda_approved ? 'Yes' : 'No'}
                  </dd>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <dt className="text-xs text-zinc-500 font-medium">Evidence</dt>
                  <dd className="text-xs text-zinc-200 font-semibold">
                    {peptide.key_studies?.[0]?.evidence_level?.replace('-', ' ') || 'Emerging'}
                  </dd>
                </div>
                {peptide.dosing?.typical_vial_mg && (
                  <div className="flex justify-between items-start gap-2">
                    <dt className="text-xs text-zinc-500 font-medium">Typical Vial</dt>
                    <dd className="text-xs text-zinc-200 font-semibold">{peptide.dosing.typical_vial_mg}mg</dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>
      </header>

      <article className="space-y-14">

        {/* ═══════ SECTION 2: WHAT IS [PEPTIDE]? ═══════ */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <Beaker className="w-5 h-5 text-violet-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-100">What Is {peptide.name}?</h2>
          </div>
          <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 space-y-4">
            <p className="text-[15px] text-zinc-300 leading-relaxed">
              <strong className="text-zinc-100">{peptide.name}</strong> ({peptide.aliases?.[0] || peptide.category}) is classified as a <strong className="text-zinc-200">{peptide.category.toLowerCase()}</strong> peptide. {peptide.mechanism}
            </p>
            <p className="text-[15px] text-zinc-300 leading-relaxed">
              It is extensively evaluated in laboratory and clinical settings for its potential to drive <strong className="text-zinc-200">{peptide.primary_benefits.toLowerCase()}</strong>. Researchers target {peptide.name} for its ability to interact with specific cellular and molecular pathways, making it a compound of significant interest across multiple therapeutic domains.
            </p>
            <p className="text-sm text-zinc-500 leading-relaxed italic">
              {peptide.safety_notes}
            </p>
          </div>
        </section>

        {/* ═══════ SECTION 3: HOW DOES IT WORK? ═══════ */}
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
              At the molecular level, {peptide.name} operates through pathways characteristic of the <strong className="text-zinc-200">{peptide.category}</strong> class. By interacting with target receptors and downstream signaling cascades, the compound initiates biological responses associated with {peptide.primary_benefits.toLowerCase()}.
            </p>
            {peptide.outcomes_timeline && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Expected Research Timeline</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {peptide.outcomes_timeline.week_2_4 && (
                    <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
                      <p className="text-[10px] font-bold text-violet-400 uppercase mb-1">Weeks 2–4</p>
                      <p className="text-xs text-zinc-400 leading-relaxed">{peptide.outcomes_timeline.week_2_4}</p>
                    </div>
                  )}
                  {peptide.outcomes_timeline.month_2_3 && (
                    <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase mb-1">Months 2–3</p>
                      <p className="text-xs text-zinc-400 leading-relaxed">{peptide.outcomes_timeline.month_2_3}</p>
                    </div>
                  )}
                  {peptide.outcomes_timeline.long_term && (
                    <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
                      <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">Long-Term</p>
                      <p className="text-xs text-zinc-400 leading-relaxed">{peptide.outcomes_timeline.long_term}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ═══════ SECTION 4: WHAT DOES THE RESEARCH SAY? ═══════ */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-100">What Does the Research Say?</h2>
          </div>
          <p className="text-[15px] text-zinc-400 mb-6">
            The following are key findings from peer-reviewed studies on {peptide.name}, indexed on PubMed and equivalent databases:
          </p>
          <div className="space-y-4">
            {peptide.key_studies?.map((study, idx) => (
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
            {(!peptide.key_studies || peptide.key_studies.length === 0) && (
              <p className="text-sm text-zinc-500 italic p-4 rounded-xl border border-zinc-800">
                No peer-reviewed studies are currently mapped in our database for {peptide.name}. This profile will be updated as new research is indexed.
              </p>
            )}
          </div>
        </section>

        {/* ═══════ SECTION 5: SAFETY & SIDE EFFECTS ═══════ */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-100">Safety &amp; Side Effects</h2>
          </div>
          <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 space-y-5">
            <p className="text-[15px] text-zinc-300 leading-relaxed">
              {peptide.safety_notes}
            </p>

            {/* Side Effects Table */}
            {peptide.side_effects && peptide.side_effects.length > 0 && (
              <div className="overflow-x-auto">
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

            {/* FDA Status */}
            <div className={`flex items-start gap-3 p-4 rounded-xl ${peptide.is_fda_approved ? 'bg-emerald-950/20 border border-emerald-500/20' : 'bg-amber-950/20 border border-amber-500/20'}`}>
              <ShieldAlert className={`w-5 h-5 flex-shrink-0 mt-0.5 ${peptide.is_fda_approved ? 'text-emerald-400' : 'text-amber-400'}`} />
              <div>
                <p className={`text-sm font-semibold ${peptide.is_fda_approved ? 'text-emerald-300' : 'text-amber-300'}`}>
                  FDA Status: {peptide.is_fda_approved ? 'Approved' : 'Not Approved for Human Therapeutic Use'}
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  {peptide.is_fda_approved
                    ? `${peptide.name} has received FDA approval for specific clinical indications. Off-label uses remain under investigation.`
                    : `${peptide.name} is not currently FDA-approved for human use. It is available for research purposes only. Always consult a licensed healthcare provider.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ SECTION 6: HOW IS IT USED? ═══════ */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Syringe className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-100">How Is {peptide.name} Used?</h2>
          </div>
          <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 space-y-4">
            {peptide.dosing ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Route</p>
                    <p className="text-sm text-zinc-200 font-semibold">{peptide.dosing.route}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Dose Range</p>
                    <p className="text-sm text-zinc-200 font-semibold">
                      {peptide.dosing.typical_dose_mcg[0]}–{peptide.dosing.typical_dose_mcg[1]} mcg
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Frequency</p>
                    <p className="text-sm text-zinc-200 font-semibold">{peptide.dosing.frequency}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Cycle</p>
                    <p className="text-sm text-zinc-200 font-semibold">
                      {peptide.dosing.cycle_weeks ? `${peptide.dosing.cycle_weeks[0]}–${peptide.dosing.cycle_weeks[1]} wk` : 'Varies'}
                    </p>
                  </div>
                </div>
                {peptide.dosing.timing && (
                  <p className="text-sm text-zinc-400"><strong className="text-zinc-300">Timing:</strong> {peptide.dosing.timing}</p>
                )}
                {peptide.dosing.notes && (
                  <p className="text-sm text-zinc-400"><strong className="text-zinc-300">Notes:</strong> {peptide.dosing.notes}</p>
                )}
              </>
            ) : (
              <p className="text-[15px] text-zinc-400">Administration details for {peptide.name} vary by research protocol and investigation model.</p>
            )}
            <p className="text-xs text-zinc-500 italic border-t border-zinc-800 pt-3 mt-3">
              All dosing information reflects parameters reported in published research literature and is not intended as clinical guidance. Usage of any peptide should be supervised by a qualified healthcare professional.
            </p>
          </div>
        </section>

        {/* ═══════ SECTION 7: COMPARISON TABLE ═══════ */}
        {comparisonPeptides.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <GitCompare className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-100">{peptide.name} vs. Related Compounds</h2>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-zinc-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-900/80">
                  <tr className="border-b border-zinc-700">
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Compound</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Primary Use</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider hidden md:table-cell">Route</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider hidden lg:table-cell">Evidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {/* Current peptide */}
                  <tr className="bg-violet-500/5">
                    <td className="px-4 py-3">
                      <span className="text-zinc-100 font-bold">{peptide.name}</span>
                      <span className="text-[10px] text-violet-400 ml-2 font-semibold">(this page)</span>
                    </td>
                    <td className="px-4 py-3 text-zinc-300 text-xs">{peptide.primary_benefits}</td>
                    <td className="px-4 py-3 text-zinc-400 text-xs hidden md:table-cell">{peptide.dosing?.route || 'Varies'}</td>
                    <td className="px-4 py-3 text-zinc-400 text-xs hidden lg:table-cell capitalize">{peptide.key_studies?.[0]?.evidence_level?.replace('-', ' ') || 'Emerging'}</td>
                  </tr>
                  {/* Comparison peptides */}
                  {comparisonPeptides.map((cp) => (
                    <tr key={cp.slug} className="hover:bg-zinc-800/20 transition-colors">
                      <td className="px-4 py-3">
                        <Link href={`/peptides/${cp.slug}`} className="text-zinc-200 font-semibold hover:text-violet-400 transition-colors">
                          {cp.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-zinc-400 text-xs">{cp.primary_benefits}</td>
                      <td className="px-4 py-3 text-zinc-400 text-xs hidden md:table-cell">{cp.dosing?.route || 'Varies'}</td>
                      <td className="px-4 py-3 text-zinc-400 text-xs hidden lg:table-cell capitalize">{cp.key_studies?.[0]?.evidence_level?.replace('-', ' ') || 'Emerging'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ═══════ VENDOR PRICING ═══════ */}
        {/* ═══════ SECTION 7: VENDOR AFFILIATE CTA ═══════ */}
        <section id="vendors">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-emerald-500/20 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="flex items-center justify-center gap-3 mb-4 relative z-10">
              <ShoppingBag className="w-8 h-8 text-emerald-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-zinc-100 mb-3 relative z-10">Where to Source {peptide.name} for Research</h2>
            <p className="text-[15px] text-zinc-400 max-w-lg mx-auto mb-8 relative z-10 leading-relaxed">
              Purchasing ultra-high purity, laboratory-grade peptides is critical for verifiable research. We only recommend vendors providing independent, third-party HPLC Certificates of Analysis (COA).
            </p>

            {(() => {
              // DATA-DRIVEN MAPPING INJECTED
              const affiliateMapping: Record<string, string> = {
                "bpc-157": "https://www.aminoclub.com/us/products/bpc-157",
                "tb-500": "https://www.aminoclub.com/us/products/tb-500",
                "ghk-cu": "https://www.aminoclub.com/us/products/ghk-cu",
                "ipamorelin": "https://www.aminoclub.com/us/products/ipamorelin",
                "cjc-1295": "https://www.aminoclub.com/us/products/cjc-1295",
                "dsip": "https://www.aminoclub.com/us/products/dsip",
                "pt-141": "https://www.aminoclub.com/us/products/pt-141",
                "retatrutide": "https://www.aminoclub.com/us/products/retatrutide",
                "semaglutide": "https://www.aminoclub.com/us/products/semaglutide",
                "tirzepatide": "https://www.aminoclub.com/us/products/tirzepatide",
                "thymosin-alpha-1": "https://www.aminoclub.com/us/products/thymosin-alpha-1",
              };
              
              const baseSlug = affiliateMapping[peptide.slug] || "https://aminoclub.com";
              const ctaParams = baseSlug.includes("?") 
                ? "&utm_source=affiliate_marketing&code=PEPTIDEX" 
                : "?utm_source=affiliate_marketing&code=PEPTIDEX";
              const ctaUrl = `${baseSlug}${ctaParams}`;

              return (
                <div className="relative z-10">
                  <a 
                    href={ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-110 text-white font-bold transition-all shadow-lg shadow-emerald-500/20 text-lg w-full sm:w-auto"
                  >
                    View COA-Verified {peptide.name} <ArrowRight className="w-5 h-5" />
                  </a>

                  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-6 text-xs font-medium text-emerald-400/80">
                    <span>✓ Third-party tested</span>
                    <span className="hidden sm:inline">&middot;</span>
                    <span>✓ US shipping</span>
                    <span className="hidden sm:inline">&middot;</span>
                    <span>✓ COA on every batch</span>
                  </div>

                  <p className="text-[10px] text-zinc-600 mt-6 max-w-lg mx-auto leading-relaxed">
                    <strong>Disclosure:</strong> PeptiDex may earn a commission from purchases. This does not affect our recommendations. We exclusively feature vendors that pass our strict quality verification protocols.
                  </p>
                </div>
              );
            })()}
          </div>
        </section>

        {/* ═══════ SECTION 8: FAQ ═══════ */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-violet-400" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-100">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
                <h3 className="font-semibold text-zinc-200 mb-2 text-sm">{faq.q}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ SECTION 9: SOURCES ═══════ */}
        {peptide.key_studies && peptide.key_studies.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-zinc-100 mb-4">Sources</h2>
            <ol className="space-y-2 list-decimal list-inside">
              {peptide.key_studies.map((study, idx) => (
                <li key={idx} className="text-sm text-zinc-400 leading-relaxed pl-1">
                  {study.title}.{' '}
                  <a href={study.pubmed_url} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 transition-colors">
                    View on PubMed <ExternalLink className="w-3 h-3 inline ml-0.5" />
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}

      </article>
      </AutoLink>

      {/* ═══════ SECTION 10: FOOTER ELEMENTS ═══════ */}

      <ShareBar title={peptide.name} url={`https://peptidex.app/peptides/${slug}`} />

      {/* Related Profiles */}
      <RelatedPeptides currentSlug={peptide.slug} />

      {/* Related Stacks */}
      {relatedStacks.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-100">{peptide.name} Stacks</h2>
          <div className="space-y-3">
            {relatedStacks.map((stack) => (
              <Link href={`/stacks/${stack.slug}`} key={stack.stack_name} className="block p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-violet-500/30 transition-colors">
                <h3 className="text-violet-400 font-bold mb-1 text-sm flex items-center gap-1.5">
                  {stack.stack_name} <ArrowRight className="w-3 h-3" />
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2">{stack.synergy_rationale}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Medical Disclaimer */}
      <div className="rounded-xl bg-amber-950/20 border border-amber-500/20 p-5">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-200/90 font-semibold mb-1">Medical Disclaimer</p>
            <p className="text-xs text-amber-200/70 leading-relaxed">
              The information provided in this profile is for educational and research purposes only. {peptide.name} is {peptide.is_fda_approved ? 'FDA-approved for specific indications but many uses remain investigational' : 'not FDA-approved for human therapeutic use'}. Nothing on this page should be interpreted as medical advice. Always consult a licensed healthcare professional before interacting with any peptide compound.{' '}
              <Link href="/disclaimer" className="underline hover:text-amber-200 transition-colors">Read our full disclaimer.</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center">
        <p className="text-xs text-zinc-600">
          Last updated: {DATE_MOD} · <Link href="/about" className="text-zinc-500 hover:text-zinc-400 transition-colors">About PeptideX</Link> · <Link href="/about/editorial-policy" className="text-zinc-500 hover:text-zinc-400 transition-colors">Editorial Standards</Link>
        </p>
      </div>
    </div>
  );
}
