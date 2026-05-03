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
import {
  Calendar, User, ArrowRight, Check, BarChart3, Trophy
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
  openGraph: { title: POST_TITLE, description: POST_DESC, url: CANONICAL, type: 'article' },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: POST_TITLE,
  description: POST_DESC,
  author: { '@type': 'Organization', name: 'PeptideX Research', url: 'https://peptidex.app' },
  publisher: { '@type': 'Organization', name: 'PeptideX', logo: { '@type': 'ImageObject', url: 'https://peptidex.app/favicon.ico' } },
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

const AMINO_STRENGTHS = [
  { title: 'Price-to-quality ratio', body: 'Amino Club consistently beats Limitless Life on pricing for core peptides (like BPC-157, Tirzepatide, and Tesamorelin) while matching their ≥99% purity standards.' },
  { title: 'Simplified bulk ordering', body: 'Their website makes it exceptionally easy to purchase 5-pack or 10-pack vials of common compounds at a significant discount.' },
  { title: 'Transparent COAs', body: 'While both provide COAs, Amino Club integrates them seamlessly onto every product page, minimizing the effort required to verify the exact lot you are buying.' },
];

const LIMITLESS_STRENGTHS = [
  { title: 'Obscure or niche compounds', body: 'Limitless maintains a significantly larger catalog. If you are researching less common peptides (like specific Selank or Semax derivatives) or advanced nootropics (like Dihexa or Bromantane), Limitless is often the only verified source.' },
  { title: 'Nasal sprays & alternative delivery', body: 'Limitless Life offers a wide variety of pre-formulated nasal sprays for certain peptides, which Amino Club does not currently focus on.' },
  { title: 'Stacking peptides with cognitive enhancers', body: 'As their name implies, Limitless carries a full suite of nootropics alongside their peptide catalog, allowing for consolidated ordering across both categories.' },
];

export default function AminoClubVsLimitlessLife() {
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
            <span className="current">vs Limitless Life</span>
          </nav>
          <div className="section-label">§ Head to Head</div>
          <h1 className="page-title">
            Amino Club<br /><em>vs Limitless</em>.
          </h1>
          <p className="page-subtitle">
            Independent analysis of third-party testing, catalog scope, pricing, and shipping — 2026.
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
      </header>

      <div className="about-content reveal space-y-16">

        {/* ── QUICK TABLE ── */}
        <section id="comparison-table">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">Quick comparison</h2>
          </div>
          <p className="text-zinc-400 leading-relaxed mb-6">
            When comparing Amino Club and Limitless Life Nootropics, you are evaluating two of the most trusted names in the research peptide industry. Both vendors adhere to strict third-party analytical testing standards. The primary differences lie in their catalog focus and pricing structures.
          </p>
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-xl">
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
                  <td className="py-4 px-6 text-zinc-300">≥99%</td>
                  <td className="py-4 px-6 text-zinc-300">≥99%</td>
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
        </section>

        {/* ── WHEN AMINO CLUB ── */}
        <section id="when-amino-club">
          <div className="section-label">§ Choose Amino Club When</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">When to choose Amino Club</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            For the vast majority of researchers focusing on mainstream peptides, Amino Club is our top recommendation.
          </p>
          <div className="space-y-4">
            {AMINO_STRENGTHS.map((s, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 flex items-start gap-4">
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-zinc-100 mb-1">{s.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHEN LIMITLESS ── */}
        <section id="when-limitless">
          <div className="section-label">§ Choose Limitless When</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">When to choose Limitless Life</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Limitless Life Nootropics is a premium vendor with a broader scope.
          </p>
          <div className="space-y-4">
            {LIMITLESS_STRENGTHS.map((s, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 flex items-start gap-4">
                <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-zinc-100 mb-1">{s.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing">
          <div className="section-label">§ 2026 Pricing Data</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Pricing comparison</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Both vendors offer discount codes (Amino Club: <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-amber-300">PEPTIDEX</code> for 20% off, Limitless Life: <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-amber-300">PEPTIDEX</code> for 15% off). The following comparison reflects standard pricing <em>before</em> the discount is applied.
          </p>
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50">
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
          <p className="text-sm text-zinc-500 mt-3 italic">Note: Prices are subject to change. Always verify current pricing on the vendor's website.</p>
        </section>

        {/* ── VERDICT ── */}
        <section id="verdict">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">The final verdict</h2>
          </div>
          <AutoLink>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Neither vendor is a bad choice; both will supply you with legitimate, highly purified, third-party tested research compounds.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              However, <strong className="text-zinc-200">for most researchers, we recommend Amino Club.</strong> They provide the exact same level of rigorous analytical testing and US-based shipping reliability as Limitless Life, but they do so at a significantly lower price point for the core peptides that 95% of researchers require.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8">
              We recommend Limitless Life specifically for researchers who need access to their extensive catalog of niche nootropics or specialized delivery systems.
            </p>
          </AutoLink>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-6 text-center flex flex-col items-center">
              <div className="text-xs font-bold text-emerald-400 font-mono mb-3">§ Best For Core Peptides & Value</div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">Shop Amino Club</h3>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded mb-4">Code: PEPTIDEX (15% Off)</span>
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
            <div className="rounded-xl border border-amber-500/20 bg-amber-950/15 p-6 text-center flex flex-col items-center">
              <div className="text-xs font-bold text-amber-400 font-mono mb-3">§ Best For Niche Nootropics & Variety</div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">Shop Limitless Life</h3>
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

      <div className="disclaimer-strip">
        ⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved
      </div>
    </main>
  );
}
