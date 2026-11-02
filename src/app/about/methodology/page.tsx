import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, FlaskConical, BookOpen, GitMerge, DollarSign, CheckSquare, ChevronRight } from 'lucide-react';
import { vendorsSorted } from '@/data/vendors';
import { RANKING_CRITERIA, RANKING_DISCLOSURE } from '@/lib/vendor-criteria';
import { FOUNDER_OWNERSHIP_DISCLOSURE } from '@/components/disclosures/FounderOwnershipDisclosure';
import { ShippingInputsTable } from '@/components/vendors/ShippingInputsTable';

export const metadata: Metadata = {
  title: 'Editorial Methodology — How PeptiDex Evaluates Peptides & Vendors',
  description: 'How PeptiDex grades peptide evidence, lists and ranks vendors on published criteria, conducts editorial review, and discloses affiliate relationships and ownership.',
  alternates: { canonical: 'https://peptidex.app/about/methodology' },
  openGraph: {
    title: 'Editorial Methodology — PeptiDex',
    description: 'How we grade evidence, rank vendors on published criteria, and disclose affiliate relationships.',
    url: 'https://peptidex.app/about/methodology',
    type: 'website',
  },
};

const EVIDENCE_GRADES = [
  {
    grade: 'Very Strong',
    color: 'emerald',
    criteria: 'Multiple Phase 2/3 randomized controlled trials (RCTs) with large sample sizes, FDA approval, and extensive peer-reviewed replication.',
    examples: 'PT-141 / Bremelanotide (Vyleesi, FDA-approved)',
  },
  {
    grade: 'Strong',
    color: 'green',
    criteria: 'At least one well-designed RCT or multiple high-quality cohort studies in humans, with consistent outcomes across independent research groups.',
    examples: 'Tesamorelin (FDA-approved for lipodystrophy)',
  },
  {
    grade: 'Moderate',
    color: 'blue',
    criteria: 'Human studies with notable limitations (small sample size, short duration, or open-label design) combined with strong preclinical support.',
    examples: 'Ipamorelin, CJC-1295 (clinical trial data limited)',
  },
  {
    grade: 'Preclinical',
    color: 'violet',
    criteria: 'Evidence is primarily or exclusively from in-vitro cell studies or controlled animal models. Human trials are absent or in very early stages (Phase 0/1).',
    examples: 'BPC-157, TB-500, GHK-Cu (most evidence from rodent models)',
  },
  {
    grade: 'Emerging',
    color: 'amber',
    criteria: 'Early-stage or preliminary data. May include small case series, mechanistic hypotheses, or a single pilot study that has not been replicated.',
    examples: 'MOTS-c (some early human data), LL-37 (limited human trials)',
  },
  {
    grade: 'Anecdotal',
    color: 'zinc',
    criteria: 'No peer-reviewed evidence available. The compound is included for reference based on widespread use in research communities, but no formal studies have been conducted.',
    examples: 'Certain novel peptide sequences, experimental research compounds',
  },
];

export default function MethodologyPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://peptidex.app/about' },
      { '@type': 'ListItem', position: 3, name: 'Methodology', item: 'https://peptidex.app/about/methodology' },
    ],
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/about">About</Link>
            <span className="sep">/</span>
            <span className="current">Methodology</span>
          </nav>
          <div className="section-label">§ Methodology</div>
          <h1 className="page-title">
            How we<br /><em>evaluate</em><br />everything.
          </h1>
          <p className="page-subtitle">
            Evidence grading, vendor verification, editorial process, and affiliate disclosure — all in one place.
          </p>
        </div>
      </header>

      <div className="about-content fade-up space-y-16">

        {/* ── SECTION 1: Evidence Grading ── */}
        <section id="evidence-grading">
          <div className="flex items-center gap-3 mb-6">
            <FlaskConical className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">How we evaluate peptides</h2>
          </div>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Every peptide profile on PeptiDex includes an evidence grade assigned by our editorial team. The grade reflects the quality and quantity of peer-reviewed human and preclinical data available, not anecdotal reports or vendor marketing claims. We apply the following six-tier system:
          </p>
          <div className="space-y-4">
            {EVIDENCE_GRADES.map((eg) => (
              <div key={eg.grade} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
                <div className="flex items-start gap-4">
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded border bg-${eg.color}-500/10 text-${eg.color}-400 border-${eg.color}-500/25 flex-shrink-0 mt-0.5`}>
                    {eg.grade}
                  </span>
                  <div>
                    <p className="text-sm text-zinc-300 leading-relaxed mb-1">{eg.criteria}</p>
                    <p className="text-xs text-zinc-500 italic">Examples: {eg.examples}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-500 mt-6 leading-relaxed">
            Evidence grades are reviewed quarterly or when significant new research is published. All grades link to the primary source studies within each compound profile. See an error?{' '}
            <Link href="https://forms.gle/peptidex-feedback" className="text-amber-400 hover:underline">Submit a correction.</Link>
          </p>
        </section>

        {/* ── SECTION 2: Vendor Verification ── */}
        <section id="vendor-verification">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">How we list vendors</h2>
          </div>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Any vendor that appears in the PeptiDex index must state that it meets these sourcing requirements. These are the vendors&apos; own published claims — PeptiDex does not test products. We do not accept payment for inclusion.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {[
              {
                num: '01',
                title: 'COA Publication',
                body: 'Vendors must provide Certificates of Analysis (COAs) publicly or on demand, documenting the compound, batch number, purity percentage, and testing date. Batch-specific COAs score higher in our ranking.',
              },
              {
                num: '02',
                title: 'HPLC Verification',
                body: 'The COA must include High-Performance Liquid Chromatography (HPLC) chromatogram data. HPLC separates and measures each component in the compound to confirm identity and detect synthesis byproducts or degradation products.',
              },
              {
                num: '03',
                title: 'Identity Test',
                body: 'The COA must include an identity test that confirms the compound is what the label says: mass spectrometry (MS or LC-MS), FTIR, or HPLC retention time against a reference standard. Mass spectrometry confirms molecular weight directly and earns full identity points in our ranking; FTIR and HPLC-against-reference earn partial points.',
              },
            ].map((step) => (
              <div key={step.num} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <div className="text-xs font-bold text-emerald-400 font-mono mb-3">§ {step.num}</div>
                <h3 className="font-bold text-zinc-100 mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Vendors that do not state all three are not listed, regardless of commercial relationship. To submit a vendor for review, email{' '}
            <a href="mailto:hello@peptidex.app" className="text-amber-400 hover:underline">hello@peptidex.app</a>.
          </p>
        </section>

        {/* ── SECTION 2b: Vendor Ranking (published criteria) ── */}
        <section id="vendor-ranking">
          <div className="flex items-center gap-3 mb-6">
            <CheckSquare className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">How we rank vendors</h2>
          </div>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Vendor order everywhere on PeptiDex comes from one score out of 100 on the criteria below, applied
            the same way to every vendor. Inputs are each vendor&apos;s own published information and the list
            prices we have checked. Injectable vendors are ranked first, then oral vendors. {RANKING_DISCLOSURE}
          </p>
          <div className="space-y-3 mb-8">
            {RANKING_CRITERIA.map((c) => (
              <div key={c.key} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
                <h3 className="font-bold text-zinc-100 mb-1">{c.label} — {c.max} points</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{c.rule}</p>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-left text-sm" data-criteria-scores>
              <thead className="bg-zinc-900/80">
                <tr>
                  <th className="px-3 py-2 text-zinc-400">Rank</th>
                  <th className="px-3 py-2 text-zinc-400">Vendor</th>
                  {RANKING_CRITERIA.map((c) => (
                    <th key={c.key} className="px-3 py-2 text-zinc-400">{c.label} /{c.max}</th>
                  ))}
                  <th className="px-3 py-2 text-zinc-400">Total</th>
                </tr>
              </thead>
              <tbody>
                {vendorsSorted.map((v, i) => (
                  <tr key={v.slug} className="border-t border-zinc-800">
                    <td className="px-3 py-2 text-zinc-300">#{i + 1}</td>
                    <td className="px-3 py-2 text-zinc-200">
                      {v.name}{v.category === 'oral' ? ' (oral)' : ''}{v.ownedByFounder ? ' — owned by PeptiDex\'s founder' : ''}
                    </td>
                    {v.criteria.parts.map((part) => (
                      <td key={part.key} className="px-3 py-2 text-zinc-300" title={part.basis}>{part.points}</td>
                    ))}
                    <td className="px-3 py-2 font-bold text-zinc-100">{v.criteria.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-zinc-300">
            <ShippingInputsTable vendors={vendorsSorted} />
          </div>
        </section>

        {/* ── SECTION 3: Editorial Process ── */}
        <section id="editorial-process">
          <div className="flex items-center gap-3 mb-6">
            <GitMerge className="w-6 h-6 text-violet-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">Our editorial process</h2>
          </div>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Every compound profile, comparison article, and educational guide on PeptiDex goes through a five-stage editorial lifecycle before publication and on a quarterly review cadence thereafter.
          </p>
          <div className="relative space-y-0">
            {[
              {
                stage: '1',
                label: 'Research',
                body: 'Our team conducts a systematic search of PubMed, ClinicalTrials.gov, and pre-print servers for all relevant studies. We document every relevant publication regardless of outcome to avoid positive-results bias.',
              },
              {
                stage: '2',
                label: 'Draft',
                body: 'A subject-matter contributor synthesizes the research into a structured profile or article. All claims are cited inline using PubMed IDs. No editorial content is drafted from vendor marketing materials or forum posts.',
              },
              {
                stage: '3',
                label: 'Peer Review',
                body: 'The draft undergoes review by at least one additional team member with relevant expertise. Reviewers check evidence grade assignments, factual accuracy, and appropriate framing of preclinical data.',
              },
              {
                stage: '4',
                label: 'Fact-Check',
                body: 'A final fact-check verifies all cited statistics, study details, FDA approval statuses, and mechanism descriptions against primary sources. A "Last fact-checked" date is applied on publish.',
              },
              {
                stage: '5',
                label: 'Quarterly Re-Review',
                body: 'All published content is flagged for re-review every 90 days. Any new research published during that period is incorporated. The "Last fact-checked" date is updated on each review cycle.',
              },
            ].map((s, i, arr) => (
              <div key={s.stage} className="flex gap-5 pb-6">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-400 flex-shrink-0">
                    {s.stage}
                  </div>
                  {i < arr.length - 1 && <div className="w-px bg-violet-500/15 flex-1 mt-2" />}
                </div>
                <div className="pt-1 pb-2">
                  <h3 className="font-bold text-zinc-100 mb-1">{s.label}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 4: Affiliate Disclosure ── */}
        <section id="affiliate-disclosure">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">Our affiliate disclosure</h2>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/15 p-6 space-y-4">
            <p className="text-zinc-300 leading-relaxed">
              PeptiDex is an affiliate-funded publication. We do not charge for access, and we do not accept payment for vendor placement, compound coverage, or favorable editorial treatment.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              We earn an affiliate commission when readers click through to a listed vendor and make a qualifying purchase. This commission comes from the vendor, not from you, and does not affect the price you pay.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              <strong>Material connection:</strong> {FOUNDER_OWNERSHIP_DISCLOSURE} Elyria Bio is featured in labeled promotional placements (site banner, footer offer, exit offer); its rank uses the same criteria as every other vendor.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              All affiliate links are marked with <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-amber-300">rel="nofollow noopener sponsored"</code> per Google webmaster guidelines. This disclosure is required by FTC guidelines (16 CFR Part 255) and GDPR transparency requirements.
            </p>
            <p className="text-sm text-zinc-500">
              For questions about our affiliate relationships or to report a conflict of interest, email{' '}
              <a href="mailto:hello@peptidex.app" className="text-amber-400 hover:underline">hello@peptidex.app</a>.
            </p>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            href="/about/editorial-policy"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-700 text-sm font-semibold text-zinc-200 hover:border-violet-500/50 hover:text-violet-300 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            Read Editorial Policy
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-700 text-sm font-semibold text-zinc-200 hover:border-zinc-500 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
            About PeptiDex
          </Link>
        </div>
      </div>

      
    </main>
  );
}
