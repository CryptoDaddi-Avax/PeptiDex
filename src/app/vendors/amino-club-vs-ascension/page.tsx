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
import { vendors } from '@/data/vendors';

// ── Discount lookups (single source of truth: vendors.ts) ─────────────────
const _aminoClub = vendors.find((v) => v.slug === 'amino-club')!;
const _ascension = vendors.find((v) => v.slug === 'ascension-peptides')!;

const POST_TITLE = 'Amino Club vs Ascension Peptides: 2026 Vendor Comparison';
const POST_DESC = 'An independent side-by-side comparison of Amino Club and Ascension Peptides. We analyze testing transparency, pricing, catalog options, and shipping speeds.';
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-04-30';
const DATE_MOD = '2026-04-30';
const SLUG = 'amino-club-vs-ascension';
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
    { '@type': 'ListItem', position: 3, name: 'Amino Club vs Ascension Peptides', item: CANONICAL },
  ],
};

const AMINO_STRENGTHS = [
  { title: 'Transparency & ease of verification', body: 'Amino Club links their batch-specific COAs directly on their product pages. You do not have to email support to verify the lot you are buying.' },
  { title: 'Modern, streamlined website', body: 'Their platform is significantly easier to navigate, especially on mobile devices, making bulk ordering and checkout a smoother process.' },
  { title: 'Core peptides with fresh batches', body: 'For individual compounds like Tirzepatide, BPC-157, or Tesamorelin, Amino Club\'s stock turnover is high, ensuring very fresh batches.' },
];

const ASCENSION_STRENGTHS = [
  { title: 'Pre-mixed blends', body: 'Ascension offers an extensive array of pre-formulated blends (e.g., specific ratios of CJC-1295 to Ipamorelin, or complex recovery stacks). Amino Club tends to focus on selling individual compounds.' },
  { title: 'Specific vial sizes', body: 'Ascension occasionally offers different vial sizes (e.g., very large bulk vials or specific small-dose increments) that may fit a specific protocol better.' },
];

export default function AminoClubVsAscension() {
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
            <span className="current">vs Ascension</span>
          </nav>
          <div className="section-label">§ Head to Head</div>
          <h1 className="page-title">
            Amino Club<br /><em>vs Ascension</em>.
          </h1>
          <p className="page-subtitle">
            Independent side-by-side analysis of testing transparency, pricing, catalog, and shipping — 2026.
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
            Amino Club and Ascension Peptides are two highly respected domestic vendors. Because both adhere to strict third-party HPLC and Mass Spectrometry testing protocols, choosing between them usually comes down to specific catalog needs and user experience preferences.
          </p>
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-xl">
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
                  <td className="py-4 px-6 text-zinc-300">≥99%</td>
                  <td className="py-4 px-6 text-zinc-300">≥99%</td>
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
        </section>

        {/* ── WHEN AMINO CLUB ── */}
        <section id="when-amino-club">
          <div className="section-label">§ Choose Amino Club When</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">When to choose Amino Club</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Amino Club has modernized the peptide purchasing experience, making them our default recommendation for most researchers.
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

        {/* ── WHEN ASCENSION ── */}
        <section id="when-ascension">
          <div className="section-label">§ Choose Ascension When</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">When to choose Ascension Peptides</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Ascension Peptides is a veteran in the space and holds an edge in specific catalog areas.
          </p>
          <div className="space-y-4">
            {ASCENSION_STRENGTHS.map((s, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 flex items-start gap-4">
                <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-zinc-100 mb-1">{s.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING TABLE ── */}
        <section id="pricing">
          <div className="section-label">§ 2026 Pricing Data</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Pricing comparison</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Pricing between these two vendors is highly competitive. Both offer discount codes (Amino Club: <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-amber-300">PEPTIDEX</code> for {_aminoClub.discountPercent}% off, Ascension: <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-indigo-300">PeptiDex</code> for {_ascension.discountPercent}% off).
          </p>
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50">
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
              Both Amino Club and Ascension Peptides operate with integrity and provide high-quality research materials. You will not go wrong with either.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Overall, <strong className="text-zinc-200">we give the slight edge to Amino Club</strong>. Their modern approach to COA transparency — putting the exact batch test directly on the product page — is how the entire industry should operate. Furthermore, they generally edge out Ascension on pricing for the most popular GLP-1s and recovery peptides.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8">
              We recommend Ascension if you specifically require pre-mixed peptide blends that Amino Club does not carry.
            </p>
          </AutoLink>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-6 text-center flex flex-col items-center">
              <div className="text-xs font-bold text-emerald-400 font-mono mb-3">§ Best For Transparency & Pricing</div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">Shop Amino Club</h3>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded mb-4">Code: PEPTIDEX ({_aminoClub.discountPercent}% Off)</span>
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
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/15 p-6 text-center flex flex-col items-center">
              <div className="text-xs font-bold text-indigo-400 font-mono mb-3">§ Best For Pre-Mixed Blends</div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">Shop Ascension</h3>
              <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded mb-4">Code: PeptiDex ({_ascension.discountPercent}% Off)</span>
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
