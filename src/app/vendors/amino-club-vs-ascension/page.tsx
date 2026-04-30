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
  Check, Minus
} from 'lucide-react';

const POST_TITLE = 'Amino Club vs Ascension Peptides: 2026 Vendor Comparison';
const POST_DESC = 'An independent side-by-side comparison of Amino Club and Ascension Peptides. We analyze testing transparency, pricing, catalog options, and shipping speeds.';
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-04-30';
const DATE_MOD = '2026-04-30';
const SLUG = 'amino-club-vs-ascension';
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
    { '@type': 'ListItem', position: 3, name: 'Amino Club vs Ascension Peptides', item: CANONICAL },
  ],
};

export default function AminoClubVsAscension() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumbs items={[
        { name: 'Home', url: 'https://peptidex.app/' },
        { name: 'Vendors', url: 'https://peptidex.app/vendors' },
        { name: 'Amino Club vs Ascension' }
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
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-amber-500/15 text-amber-300 rounded-full border border-amber-500/30">
            Head to Head
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

      {/* QUICK COMPARISON TABLE */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/50 shadow-xl">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950">
              <th className="text-left py-4 px-6 text-zinc-400 font-semibold w-1/3">Feature</th>
              <th className="text-left py-4 px-6 text-emerald-400 font-bold w-1/3">Amino Club</th>
              <th className="text-left py-4 px-6 text-indigo-400 font-bold w-1/3">Ascension Peptides</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-800/50">
              <td className="py-4 px-6 text-zinc-300 font-medium">Batch-Specific COAs</td>
              <td className="py-4 px-6"><Check className="w-5 h-5 text-emerald-400" /></td>
              <td className="py-4 px-6"><Check className="w-5 h-5 text-emerald-400" /></td>
            </tr>
            <tr className="border-b border-zinc-800/50 bg-zinc-900/30">
              <td className="py-4 px-6 text-zinc-300 font-medium">COA Accessibility</td>
              <td className="py-4 px-6 text-emerald-400 font-bold">On Product Page</td>
              <td className="py-4 px-6 text-zinc-300">Often requires request</td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-4 px-6 text-zinc-300 font-medium">Purity Standard</td>
              <td className="py-4 px-6 text-zinc-300">&ge;99%</td>
              <td className="py-4 px-6 text-zinc-300">&ge;99%</td>
            </tr>
            <tr className="border-b border-zinc-800/50 bg-zinc-900/30">
              <td className="py-4 px-6 text-zinc-300 font-medium">Pricing (Average)</td>
              <td className="py-4 px-6 text-zinc-300">Competitive</td>
              <td className="py-4 px-6 text-zinc-300">Competitive</td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-4 px-6 text-zinc-300 font-medium">Pre-mixed Blends</td>
              <td className="py-4 px-6 text-zinc-300">Limited / Core</td>
              <td className="py-4 px-6 text-indigo-400 font-bold">Extensive Options</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-zinc-300 font-medium">Shipping Origin</td>
              <td className="py-4 px-6 text-zinc-300">USA</td>
              <td className="py-4 px-6 text-zinc-300">USA</td>
            </tr>
          </tbody>
        </table>
      </div>

      <AutoLink>
      <article className="prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:text-zinc-200 prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-zinc-800 prose-p:text-zinc-300 prose-p:leading-loose prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-200 prose-ul:text-zinc-300 prose-li:marker:text-emerald-500">

        <p className="lead text-xl text-zinc-300 font-medium">
          Amino Club and Ascension Peptides are two highly respected domestic vendors. Because both adhere to strict third-party HPLC and Mass Spectrometry testing protocols, choosing between them usually comes down to specific catalog needs and user experience preferences.
        </p>

        <h2 id="when-amino-club">When to Choose Amino Club</h2>
        <p>
          Amino Club has modernized the peptide purchasing experience, making them our default recommendation for most researchers.
        </p>
        <ul>
            <li><strong>You value transparency and ease of verification:</strong> Amino Club links their batch-specific COAs directly on their product pages. You do not have to email support to verify the lot you are buying.</li>
            <li><strong>You want a modern, streamlined website:</strong> Their platform is significantly easier to navigate, especially on mobile devices, making bulk ordering and checkout a smoother process.</li>
            <li><strong>You are purchasing core peptides:</strong> For individual compounds like Tirzepatide, BPC-157, or Tesamorelin, Amino Club's stock turnover is high, ensuring very fresh batches.</li>
        </ul>

        <h2 id="when-ascension">When to Choose Ascension Peptides</h2>
        <p>
          Ascension Peptides is a veteran in the space and holds an edge in specific catalog areas.
        </p>
        <ul>
            <li><strong>You prefer pre-mixed blends:</strong> Ascension offers an extensive array of pre-formulated blends (e.g., specific ratios of CJC-1295 to Ipamorelin, or complex recovery stacks). Amino Club tends to focus on selling individual compounds for researchers to stack themselves.</li>
            <li><strong>You are looking for specific sizes:</strong> Ascension occasionally offers different vial sizes (e.g., very large bulk vials or specific small-dose increments) that may fit a specific protocol better.</li>
        </ul>

        <h2 id="pricing">Pricing Comparison (2026 Data)</h2>
        <p>
          Pricing between these two vendors is highly competitive. Both offer discount codes (Amino Club: <code>PEPTIDEX</code> for 15% off, Ascension: <code>PeptiDex</code> for 15% off). 
        </p>
        
        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50 my-6 not-prose">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Peptide</th>
                <th className="text-left py-3 px-4 text-emerald-400 font-bold">Amino Club</th>
                <th className="text-left py-3 px-4 text-indigo-400 font-bold">Ascension</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Winner</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 px-4 text-zinc-300">BPC-157 (10mg)</td>
                <td className="py-3 px-4 text-zinc-300">$45.00</td>
                <td className="py-3 px-4 text-zinc-300">$46.00</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Tie</td>
              </tr>
              <tr className="border-b border-zinc-800/50 bg-zinc-900/30">
                <td className="py-3 px-4 text-zinc-300">Tirzepatide (10mg)</td>
                <td className="py-3 px-4 text-zinc-300">$120.00</td>
                <td className="py-3 px-4 text-zinc-300">$125.00</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Amino Club</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 px-4 text-zinc-300">Tesamorelin (10mg)</td>
                <td className="py-3 px-4 text-zinc-300">$95.00</td>
                <td className="py-3 px-4 text-zinc-300">$99.00</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Amino Club</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-zinc-300">TB-500 (10mg)</td>
                <td className="py-3 px-4 text-zinc-300">$55.00</td>
                <td className="py-3 px-4 text-zinc-300">$58.00</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Amino Club</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-400 mt-2 mb-8 italic">Note: Prices are subject to change. Always verify current pricing on the vendor's website.</p>

        <h2 id="verdict">The Final Verdict</h2>
        <p>
          Both Amino Club and Ascension Peptides operate with integrity and provide high-quality research materials. You will not go wrong with either.
        </p>
        <p>
          Overall, <strong>we give the slight edge to Amino Club</strong>. Their modern approach to COA transparency—putting the exact batch test directly on the product page—is how the entire industry should operate. Furthermore, they generally edge out Ascension on pricing for the most popular GLP-1s and recovery peptides.
        </p>
        <p>
          We recommend Ascension if you specifically require pre-mixed peptide blends that Amino Club does not carry.
        </p>

        <div className="not-prose mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-zinc-900 text-center flex flex-col items-center">
                <h3 className="text-xl font-bold text-zinc-100 mb-2">Shop Amino Club</h3>
                <p className="text-xs text-zinc-400 mb-4">Best for transparency & pricing</p>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded mb-4">Code: PEPTIDEX (15% Off)</span>
                <AffiliateLink
                    href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
                    vendor="amino_club"
                    peptide="all"
                    source="vs_ascension_footer"
                    className="mt-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all w-full"
                >
                    Visit Amino Club
                </AffiliateLink>
            </div>
            
            <div className="p-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/20 to-zinc-900 text-center flex flex-col items-center">
                <h3 className="text-xl font-bold text-zinc-100 mb-2">Shop Ascension</h3>
                <p className="text-xs text-zinc-400 mb-4">Best for pre-mixed blends</p>
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded mb-4">Code: PeptiDex (15% Off)</span>
                <AffiliateLink
                    href="https://ascensionpeptides.com/ref/PeptiDex/"
                    vendor="ascension"
                    peptide="all"
                    source="vs_ascension_footer"
                    className="mt-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all w-full"
                >
                    Visit Ascension
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
