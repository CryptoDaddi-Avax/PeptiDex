import type { Metadata } from 'next';
import Link from 'next/link';
import { ShareBar } from '@/components/share-bar';
import { CiteThisPage } from '@/components/cite-page';
import { AuthorBio } from '@/components/author-bio';
import { FeedbackModal } from '@/components/feedback-modal';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { getAuthorSlug } from '@/data/authors';
import { AffiliateLink } from '@/components/affiliate-link';
import { AutoLink } from '@/components/auto-link';
import { DisclaimerCard, InlineDisclaimer } from '@/components/ui/DisclaimerCard';
import {
  Calendar, User, ArrowRight,
  Shield, CheckCircle2, FlaskConical, Search, AlertCircle
} from 'lucide-react';

const POST_TITLE = 'Amino Club COA Verification: How We Audit Their Testing';
const POST_DESC = "An in-depth guide on how to read Amino Club's Certificates of Analysis (COAs). We explain HPLC purity vs Mass Spec identity and why batch-specific testing matters.";
const AUTHOR = 'PeptiDex Editorial';
const DATE_PUB = '2026-04-30';
const DATE_MOD = '2026-04-30';
const SLUG = 'amino-club-coa-verification';
const CANONICAL = `https://peptidex.app/vendors/${SLUG}`;

export const metadata: Metadata = {
  title: POST_TITLE,
  description: POST_DESC,
  alternates: { canonical: CANONICAL },
  openGraph: { title: POST_TITLE, description: POST_DESC, url: CANONICAL, type: 'article' },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: POST_TITLE,
  description: POST_DESC,
  author: { '@type': 'Organization', name: 'PeptiDex Research', url: 'https://peptidex.app' },
  publisher: { '@type': 'Organization', name: 'PeptiDex', logo: { '@type': 'ImageObject', url: 'https://peptidex.app/favicon.ico' } },
  datePublished: `${DATE_PUB}T12:00:00Z`,
  dateModified: `${DATE_MOD}T12:00:00Z`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
    { '@type': 'ListItem', position: 2, name: 'Vendors', item: 'https://peptidex.app/vendors' },
    { '@type': 'ListItem', position: 3, name: 'Amino Club COA Verification', item: CANONICAL },
  ],
};

const COA_CHECKLIST = [
  { num: '01', title: 'Lab Header & Contact Info', body: 'Ensure the document is issued by a known lab (e.g., MZ Biolabs). You should be able to contact the lab to verify the document\'s authenticity using the report number.' },
  { num: '02', title: 'Compound Name', body: 'Verify it matches the product you are purchasing exactly.' },
  { num: '03', title: 'Batch / Lot Number', body: 'This is critical. The lot on the document must match the lot currently being sold. See the batch-specific section below.' },
  { num: '04', title: 'Purity Result', body: 'Look for the HPLC summary stating the calculated purity. PeptiDex considers anything above 98% acceptable for general research, but Amino Club consistently hits 99%+.' },
  { num: '05', title: 'Mass Result', body: 'Look for the expected mass vs. the observed mass. They should match within a very tight margin of error (usually ±1 Da).' },
];

export default function AminoClubCOAVerification() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/vendors">Vendors</Link>
            <span className="sep">/</span>
            <span className="current">COA Verification</span>
          </nav>
          <div className="section-label">§ Analytical Testing</div>
          <h1 className="page-title">
            Amino Club<br /><em>COA audit</em>.
          </h1>
          <p className="page-subtitle">
            How we read their Certificates of Analysis — HPLC purity, Mass Spec identity, and why batch-specific testing is the standard.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" />
              <Link href={`/about/${getAuthorSlug(AUTHOR)}`} className="font-semibold text-zinc-200 hover:text-amber-400 transition-colors">{AUTHOR}</Link>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-500" />
              <span>April 30, 2026</span>
            </div>
          </div>
          <div className="mt-4"><ShareBar title={POST_TITLE} url={CANONICAL} /></div>
        </div>
        <div className="mt-8">
          <DisclaimerCard variant="vendor" />
        </div>
      </header>

      <div className="about-content reveal space-y-16">

        {/* ── WHAT IS A COA ── */}
        <section id="what-is-a-coa">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-violet-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">What is a Certificate of Analysis?</h2>
          </div>
          <p className="text-zinc-400 leading-relaxed mb-4">
            In the research peptide industry, a Certificate of Analysis (COA) is the only objective proof of a compound's identity and purity. We recommend Amino Club because their testing methodology is rigorous, transparent, and batch-specific.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            A COA is an official document issued by an analytical laboratory detailing the results of scientific testing performed on a specific chemical sample. For peptides, this document verifies two critical factors:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { num: '01', title: 'Identity', body: 'Is the substance actually what it claims to be? Mass Spectrometry confirms molecular weight against the expected sequence.' },
              { num: '02', title: 'Purity', body: 'What percentage of the vial contains the active peptide versus synthesis byproducts, truncated sequences, or inert salts?' },
            ].map((s) => (
              <div key={s.num} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <div className="text-xs font-bold text-violet-400 font-mono mb-3">§ {s.num}</div>
                <h3 className="font-bold text-zinc-100 mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="text-zinc-400 leading-relaxed mt-6">
            Amino Club utilizes reputable third-party laboratories, predominantly MZ Biolabs and Janoshik, to perform these analyses. This independence is crucial; internally generated COAs are meaningless as they lack objective oversight.
          </p>
        </section>

        {/* ── HPLC vs MS ── */}
        <section id="hplc-vs-ms">
          <div className="flex items-center gap-3 mb-6">
            <FlaskConical className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">HPLC vs. Mass Spectrometry</h2>
          </div>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Amino Club's testing relies on two primary analytical techniques. A legitimate COA must include data from both.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                  <Search className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100">HPLC (Purity)</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">High-Performance Liquid Chromatography</strong> separates the mixture into its individual components. The output is a graph (chromatogram) showing peaks. The main peak represents the target peptide. The area under the main peak relative to the total area of all peaks determines the purity percentage (e.g., 99.2%). Amino Club's standard is ≥99%.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100">Mass Spec (Identity)</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">Mass Spectrometry</strong> measures the mass-to-charge ratio of the molecules. Every peptide sequence has a precise, known molecular weight. The MS results must match this expected weight exactly. If the weight is off, it indicates an error in the amino acid synthesis (e.g., missing or swapped amino acids).
              </p>
            </div>
          </div>
        </section>

        {/* ── HOW TO READ ── */}
        <section id="how-to-read">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">How to read an Amino Club COA</h2>
          </div>
          <p className="text-zinc-400 leading-relaxed mb-6">
            When you view a product on Amino Club, you'll find a link to the most recent COA. Here is what to verify:
          </p>
          <div className="space-y-4">
            {COA_CHECKLIST.map((s) => (
              <div key={s.num} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 flex items-start gap-4">
                <div className="text-xs font-bold text-emerald-400 font-mono flex-shrink-0 pt-0.5">§ {s.num}</div>
                <div>
                  <h3 className="font-bold text-zinc-100 mb-1">{s.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BATCH SPECIFIC ── */}
        <section id="batch-specific">
          <div className="section-label">§ Why It Matters</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Why batch-specific testing matters</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            This is the primary reason we rate Amino Club so highly. Many inferior vendors practice "golden batch" testing. They will synthesize or purchase one highly pure batch, send it to a lab, get a pristine COA, and then use that same document for years across dozens of subsequent, untested batches.
          </p>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-6">
            <div className="text-xs font-bold text-emerald-400 font-mono mb-3">§ The Amino Club Standard</div>
            <h3 className="font-bold text-zinc-100 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Batch-Specific Testing
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Amino Club performs <strong>batch-specific testing</strong>. When a new lot is synthesized, a sample is sent to the lab. The resulting COA applies <em>only</em> to that specific lot. When you purchase from Amino Club, the lot number on your vial should correspond to the lot number on the recently published COA.
            </p>
          </div>
        </section>

        {/* ── COMPARISON ── */}
        <section id="comparison">
          <div className="section-label">§ Industry Benchmark</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Comparison vs. competitor testing frequency</h2>
          <AutoLink>
            <p className="text-zinc-400 leading-relaxed mb-4">
              While top-tier vendors like Limitless Life and Ascension Peptides also utilize batch-specific testing, Amino Club distinguishes itself by making the documentation highly accessible directly on the product pages, minimizing the friction required to verify a purchase.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Lower-tier vendors often hide their COAs, require an email request to view them, or obscure the dates and batch numbers. Amino Club's transparency in this regard is a benchmark for the industry.
            </p>
          </AutoLink>
        </section>

        {/* ── CTA ── */}
        <section id="cta">
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/15 p-8 text-center">
            <div className="text-xs font-bold text-amber-400 font-mono mb-4">§ Exclusive Code</div>
            <h3 className="text-2xl font-bold text-zinc-100 mb-4">Source Verified Peptides</h3>
            <p className="text-zinc-300 mb-6">Never compromise on analytical testing. Order from a verified vendor and use our code to save.</p>
            <div className="inline-block bg-zinc-950 border border-zinc-800 rounded-lg px-6 py-3 mb-6">
              <span className="text-sm text-zinc-400 uppercase tracking-widest font-semibold mr-3">Code:</span>
              <span className="text-xl font-mono font-bold text-amber-400">PEPTIDEX</span>
            </div>
            <div>
              <AffiliateLink
                href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
                vendor="amino_club"
                peptide="all"
                source="coa_page_footer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/25"
              >
                Shop Amino Club <ArrowRight className="w-5 h-5" />
              </AffiliateLink>
            </div>
          </div>
        </section>

        <div className="mb-12">
          <CiteThisPage title={POST_TITLE} url={CANONICAL} />
        </div>
        <ShareBar title={POST_TITLE} url={CANONICAL} />
        <AuthorBio name={AUTHOR} />

        <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50 text-xs text-zinc-600">
          <span>Last fact-checked: <time dateTime={DATE_MOD}>{DATE_MOD}</time></span>
          <FeedbackModal pageUrl={CANONICAL} />
        </div>
      </div>

      <InlineDisclaimer type="affiliate" className="mb-12" />
    </main>
  );
}
