import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AutoLink } from '@/components/auto-link';
import Link from 'next/link';
import { ShareBar } from '@/components/share-bar';
import { CiteThisPage } from '@/components/cite-page';
import { AuthorBio } from '@/components/author-bio';
import { FeedbackModal } from '@/components/feedback-modal';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { getAuthorSlug } from '@/data/authors';
import { AffiliateLink } from '@/components/affiliate-link';
import {
  Calendar, User, ShieldAlert, ArrowLeft, ArrowRight,
  Shield, CheckCircle2, FlaskConical, Search, AlertCircle
} from 'lucide-react';

const POST_TITLE = 'Amino Club COA Verification: How We Audit Their Testing';
const POST_DESC = 'An in-depth guide on how to read Amino Club\'s Certificates of Analysis (COAs). We explain HPLC purity vs Mass Spec identity and why batch-specific testing matters.';
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-04-30';
const DATE_MOD = '2026-04-30';
const SLUG = 'amino-club-coa-verification';
const CANONICAL = `https://peptidex.app/vendors/${SLUG}`;

export const metadata: Metadata = {
  title: `${POST_TITLE} | PeptiDex`,
  description: POST_DESC,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: POST_TITLE,
    description: POST_DESC,
    url: CANONICAL,
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: POST_TITLE,
  description: POST_DESC,
  author: { '@type': 'Organization', name: 'PeptideX Research', url: 'https://peptidex.app' },
  publisher: {
    '@type': 'Organization',
    name: 'PeptideX',
    logo: { '@type': 'ImageObject', url: 'https://peptidex.app/favicon.ico' },
  },
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

export default function AminoClubCOAVerification() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumbs items={[
        { name: 'Home', url: 'https://peptidex.app/' },
        { name: 'Vendors', url: 'https://peptidex.app/vendors' },
        { name: 'COA Verification' }
      ]} />

      <Link href="/vendors" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Vendors
      </Link>

      <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-4">
        <div className="flex items-start gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-400/80 leading-relaxed font-medium">
            <strong>EDUCATIONAL CONTENT:</strong> {SHORT_DISCLAIMER}
          </p>
        </div>
      </div>

      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-violet-500/15 text-violet-300 rounded-full border border-violet-500/30">
            Analytical Testing
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          {POST_TITLE}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 border-t border-b border-zinc-800/50 py-4">
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
        <ShareBar title={POST_TITLE} url={CANONICAL} />
      </header>

      <AutoLink>
      <article className="prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:text-zinc-200 prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-zinc-800 prose-p:text-zinc-300 prose-p:leading-loose prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-200 prose-ul:text-zinc-300 prose-li:marker:text-emerald-500">

        <p className="lead text-xl text-zinc-300 font-medium">
          In the research peptide industry, a Certificate of Analysis (COA) is the only objective proof of a compound's identity and purity. We recommend Amino Club because their testing methodology is rigorous, transparent, and batch-specific. Here is a detailed breakdown of how we audit their testing protocols.
        </p>

        <h2 id="what-is-a-coa">What is a Certificate of Analysis?</h2>
        <p>
          A COA is an official document issued by an analytical laboratory detailing the results of scientific testing performed on a specific chemical sample. For peptides, this document verifies two critical factors:
        </p>
        <ol>
            <li><strong>Identity:</strong> Is the substance actually what it claims to be?</li>
            <li><strong>Purity:</strong> What percentage of the vial contains the active peptide versus synthesis byproducts, truncated sequences, or inert salts?</li>
        </ol>
        <p>
          Amino Club utilizes reputable third-party laboratories, predominantly MZ Biolabs and Janoshik, to perform these analyses. This independence is crucial; internally generated COAs are meaningless as they lack objective oversight.
        </p>

        <h2 id="hplc-vs-ms">HPLC vs. Mass Spectrometry: Understanding the Tests</h2>
        <p>
          Amino Club's testing relies on two primary analytical techniques. A legitimate COA must include data from both.
        </p>
        
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                        <Search className="w-5 h-5 text-violet-400" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">HPLC (Purity)</h3>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                    <strong>High-Performance Liquid Chromatography</strong> separates the mixture into its individual components. The output is a graph (chromatogram) showing peaks. The main peak represents the target peptide. The area under the main peak relative to the total area of all peaks determines the purity percentage (e.g., 99.2%). Amino Club's standard is &ge;99%.
                </p>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                        <FlaskConical className="w-5 h-5 text-sky-400" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">Mass Spec (Identity)</h3>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                    <strong>Mass Spectrometry</strong> measures the mass-to-charge ratio of the molecules. Every peptide sequence has a precise, known molecular weight. The MS results must match this expected weight exactly. If the weight is off, it indicates an error in the amino acid synthesis (e.g., missing or swapped amino acids).
                </p>
            </div>
        </div>

        <h2 id="how-to-read">How to Read an Amino Club COA</h2>
        <p>
          When you view a product on Amino Club, you'll find a link to the most recent COA. Here is what to verify:
        </p>
        <ul>
            <li><strong>Lab Header & Contact Info:</strong> Ensure the document is issued by a known lab (e.g., MZ Biolabs). You should be able to contact the lab to verify the document's authenticity using the report number.</li>
            <li><strong>Compound Name:</strong> Verify it matches the product you are purchasing.</li>
            <li><strong>Batch / Lot Number:</strong> This is critical. See the section below on batch-specific testing.</li>
            <li><strong>Purity Result:</strong> Look for the HPLC summary stating the calculated purity. PeptiDex considers anything above 98% acceptable for general research, but Amino Club consistently hits 99%+.</li>
            <li><strong>Mass Result:</strong> Look for the expected mass vs. the observed mass. They should match within a very tight margin of error (usually ±1 Da).</li>
        </ul>

        <h2 id="batch-specific">Why Batch-Specific Testing Matters</h2>
        <p>
          This is the primary reason we rate Amino Club so highly. Many inferior vendors practice "golden batch" testing. They will synthesize or purchase one highly pure batch, send it to a lab, get a pristine COA, and then use that same document for years across dozens of subsequent, untested batches.
        </p>
        
        <div className="not-prose my-6 bg-emerald-950/20 border-l-4 border-emerald-500 p-6 rounded-r-xl">
          <h4 className="text-base font-bold text-emerald-400 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> The Amino Club Standard
          </h4>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Amino Club performs <strong>batch-specific testing</strong>. When a new lot is synthesized, a sample is sent to the lab. The resulting COA applies <em>only</em> to that specific lot. When you purchase from Amino Club, the lot number on your vial should correspond to the lot number on the recently published COA.
          </p>
        </div>

        <h2 id="comparison">Comparison vs. Competitor Testing Frequency</h2>
        <p>
          While top-tier vendors like Limitless Life and Ascension Peptides also utilize batch-specific testing, Amino Club distinguishes itself by making the documentation highly accessible directly on the product pages, minimizing the friction required to verify a purchase. 
        </p>
        <p>
          Lower-tier vendors often hide their COAs, require an email request to view them, or obscure the dates and batch numbers. Amino Club's transparency in this regard is a benchmark for the industry.
        </p>

        <div className="not-prose mt-12 p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-zinc-900 text-center">
            <h3 className="text-2xl font-bold text-zinc-100 mb-4">Source Verified Peptides</h3>
            <p className="text-zinc-300 mb-6">
                Never compromise on analytical testing. Order from a verified vendor and use our code to save.
            </p>
            <div className="inline-block bg-zinc-950 border border-zinc-800 rounded-lg px-6 py-3 mb-6">
                <span className="text-sm text-zinc-400 uppercase tracking-widest font-semibold mr-3">Code:</span>
                <span className="text-xl font-mono font-bold text-emerald-400">PEPTIDEX</span>
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

      </article>
      </AutoLink>

      <div className="mb-12 mt-12">
        <CiteThisPage title={POST_TITLE} url={CANONICAL} />
      </div>

      <ShareBar title={POST_TITLE} url={CANONICAL} />
      <AuthorBio name={AUTHOR} />

      <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50 text-xs text-zinc-600">
        <span>Last fact-checked: <time dateTime={DATE_MOD}>{DATE_MOD}</time></span>
        <FeedbackModal pageUrl={CANONICAL} />
      </div>

    </div>
  );
}
