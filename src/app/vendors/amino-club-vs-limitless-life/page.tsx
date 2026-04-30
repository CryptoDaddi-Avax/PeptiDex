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
  Check, Minus, Trophy
} from 'lucide-react';

const POST_TITLE = 'Amino Club vs Limitless Life Nootropics: 2026 Vendor Comparison';
const POST_DESC = 'An independent side-by-side comparison of Amino Club and Limitless Life Nootropics. We compare their third-party testing, product catalogs, pricing, and shipping reliability.';
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-04-30';
const DATE_MOD = '2026-04-30';
const SLUG = 'amino-club-vs-limitless-life';
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
    { '@type': 'ListItem', position: 3, name: 'Amino Club vs Limitless Life', item: CANONICAL },
  ],
};

export default function AminoClubVsLimitlessLife() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumbs items={[
        { name: 'Home', url: 'https://peptidex.app/' },
        { name: 'Vendors', url: 'https://peptidex.app/vendors' },
        { name: 'Amino Club vs Limitless Life' }
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
              <th className="text-left py-4 px-6 text-amber-400 font-bold w-1/3">Limitless Life</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-800/50">
              <td className="py-4 px-6 text-zinc-300 font-medium">Batch-Specific COAs</td>
              <td className="py-4 px-6"><Check className="w-5 h-5 text-emerald-400" /></td>
              <td className="py-4 px-6"><Check className="w-5 h-5 text-emerald-400" /></td>
            </tr>
            <tr className="border-b border-zinc-800/50 bg-zinc-900/30">
              <td className="py-4 px-6 text-zinc-300 font-medium">Purity Standard</td>
              <td className="py-4 px-6 text-zinc-300">&ge;99%</td>
              <td className="py-4 px-6 text-zinc-300">&ge;99%</td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-4 px-6 text-zinc-300 font-medium">Catalog Size</td>
              <td className="py-4 px-6 text-zinc-300">Curated (Core Peptides)</td>
              <td className="py-4 px-6 text-zinc-300">Extensive (Includes Nootropics)</td>
            </tr>
            <tr className="border-b border-zinc-800/50 bg-zinc-900/30">
              <td className="py-4 px-6 text-zinc-300 font-medium">Pricing (Average)</td>
              <td className="py-4 px-6 text-emerald-400 font-bold">More Competitive</td>
              <td className="py-4 px-6 text-zinc-300">Premium</td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-4 px-6 text-zinc-300 font-medium">Shipping Origin</td>
              <td className="py-4 px-6 text-zinc-300">USA</td>
              <td className="py-4 px-6 text-zinc-300">USA</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-zinc-300 font-medium">Credit Cards</td>
              <td className="py-4 px-6"><Check className="w-5 h-5 text-emerald-400" /></td>
              <td className="py-4 px-6"><Check className="w-5 h-5 text-emerald-400" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <AutoLink>
      <article className="prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:text-zinc-200 prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-zinc-800 prose-p:text-zinc-300 prose-p:leading-loose prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-200 prose-ul:text-zinc-300 prose-li:marker:text-emerald-500">

        <p className="lead text-xl text-zinc-300 font-medium">
          When comparing Amino Club and Limitless Life Nootropics, you are evaluating two of the most trusted names in the research peptide industry. Both vendors adhere to strict third-party analytical testing standards. The primary differences lie in their catalog focus and pricing structures.
        </p>

        <h2 id="when-amino-club">When to Choose Amino Club</h2>
        <p>
          For the vast majority of researchers focusing on mainstream peptides, Amino Club is our top recommendation.
        </p>
        <ul>
            <li><strong>You prioritize price-to-quality ratio:</strong> Amino Club consistently beats Limitless Life on pricing for core peptides (like BPC-157, Tirzepatide, and Tesamorelin) while matching their &ge;99% purity standards.</li>
            <li><strong>You want simplified bulk ordering:</strong> Their website makes it exceptionally easy to purchase 5-pack or 10-pack vials of common compounds at a significant discount.</li>
            <li><strong>You appreciate transparent COAs:</strong> While both provide COAs, Amino Club integrates them seamlessly onto every product page, minimizing the effort required to verify the exact lot you are buying.</li>
        </ul>

        <h2 id="when-limitless">When to Choose Limitless Life</h2>
        <p>
          Limitless Life Nootropics is a premium vendor with a broader scope.
        </p>
        <ul>
            <li><strong>You need obscure or niche compounds:</strong> Limitless maintains a significantly larger catalog. If you are researching less common peptides (like specific Selank or Semax derivatives) or advanced nootropics (like Dihexa or Bromantane), Limitless is often the only verified source.</li>
            <li><strong>You require nasal sprays or alternative delivery:</strong> Limitless Life offers a wide variety of pre-formulated nasal sprays for certain peptides, which Amino Club does not currently focus on.</li>
            <li><strong>You are stacking peptides with cognitive enhancers:</strong> As their name implies, Limitless carries a full suite of nootropics alongside their peptide catalog, allowing for consolidated ordering if your research spans both categories.</li>
        </ul>

        <h2 id="pricing">Pricing Comparison (2026 Data)</h2>
        <p>
          Both vendors offer discount codes (Amino Club: <code>PEPTIDEX</code> for 15% off, Limitless Life: <code>PEPTIDEX</code> for 15% off). The following comparison reflects standard pricing <em>before</em> the discount is applied.
        </p>
        
        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50 my-6 not-prose">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Peptide</th>
                <th className="text-left py-3 px-4 text-emerald-400 font-bold">Amino Club</th>
                <th className="text-left py-3 px-4 text-amber-400 font-bold">Limitless Life</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Winner</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 px-4 text-zinc-300">BPC-157 (10mg)</td>
                <td className="py-3 px-4 text-zinc-300">$45.00</td>
                <td className="py-3 px-4 text-zinc-300">$64.99</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Amino Club</td>
              </tr>
              <tr className="border-b border-zinc-800/50 bg-zinc-900/30">
                <td className="py-3 px-4 text-zinc-300">Tirzepatide (10mg)</td>
                <td className="py-3 px-4 text-zinc-300">$120.00</td>
                <td className="py-3 px-4 text-zinc-300">$139.99</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Amino Club</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 px-4 text-zinc-300">Tesamorelin (10mg)</td>
                <td className="py-3 px-4 text-zinc-300">$95.00</td>
                <td className="py-3 px-4 text-zinc-300">$124.99</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Amino Club</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-zinc-300">TB-500 (10mg)</td>
                <td className="py-3 px-4 text-zinc-300">$55.00</td>
                <td className="py-3 px-4 text-zinc-300">$74.99</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Amino Club</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-400 mt-2 mb-8 italic">Note: Prices are subject to change. Always verify current pricing on the vendor's website.</p>

        <h2 id="verdict">The Final Verdict</h2>
        <p>
          Neither vendor is a bad choice; both will supply you with legitimate, highly purified, third-party tested research compounds. 
        </p>
        <p>
          However, <strong>for most researchers, we recommend Amino Club.</strong> They provide the exact same level of rigorous analytical testing and US-based shipping reliability as Limitless Life, but they do so at a significantly lower price point for the core peptides that 95% of researchers require. 
        </p>
        <p>
          We recommend Limitless Life specifically for researchers who need access to their extensive catalog of niche nootropics or specialized delivery systems.
        </p>

        <div className="not-prose mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-zinc-900 text-center flex flex-col items-center">
                <h3 className="text-xl font-bold text-zinc-100 mb-2">Shop Amino Club</h3>
                <p className="text-xs text-zinc-400 mb-4">Best for core peptides & value</p>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded mb-4">Code: PEPTIDEX (15% Off)</span>
                <AffiliateLink
                    href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
                    vendor="amino_club"
                    peptide="all"
                    source="vs_limitless_footer"
                    className="mt-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all w-full"
                >
                    Visit Amino Club
                </AffiliateLink>
            </div>
            
            <div className="p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-900/20 to-zinc-900 text-center flex flex-col items-center">
                <h3 className="text-xl font-bold text-zinc-100 mb-2">Shop Limitless Life</h3>
                <p className="text-xs text-zinc-400 mb-4">Best for niche nootropics & variety</p>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded mb-4">Code: PEPTIDEX (15% Off)</span>
                <AffiliateLink
                    href="https://limitlesslifenootropics.com/PEPTIDEX/"
                    vendor="limitless_life"
                    peptide="all"
                    source="vs_limitless_footer"
                    className="mt-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-all w-full"
                >
                    Visit Limitless Life
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
