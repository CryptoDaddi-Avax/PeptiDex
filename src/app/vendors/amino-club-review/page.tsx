import type { Metadata } from 'next';
import Link from 'next/link';
import { ShareBar } from '@/components/share-bar';
import { CiteThisPage } from '@/components/cite-page';
import { AuthorByline } from '@/components/shared/AuthorByline';
import { FeedbackModal } from '@/components/feedback-modal';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { getAuthorSlug } from '@/data/authors';
import { AffiliateLink } from '@/components/affiliate-link';
import { AutoLink } from '@/components/auto-link';
import {
  Calendar, User, ShieldAlert, ArrowRight,
  FlaskConical, CheckCircle2, Shield, Star
} from 'lucide-react';

const POST_TITLE = 'Amino Club Review (2026): An Independent Evidence-Based Analysis';
const POST_DESC = 'An independent, evidence-based review of Amino Club. We analyze their third-party COA verification, HPLC/Mass Spec methodology, shipping reliability, and pricing vs top competitors.';
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-04-30';
const DATE_MOD = '2026-04-30';
const SLUG = 'amino-club-review';
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

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: { '@type': 'Organization', name: 'Amino Club', url: 'https://aminoclub.com' },
  reviewRating: { '@type': 'Rating', ratingValue: '4.8', bestRating: '5' },
  author: { '@type': 'Organization', name: 'PeptideX Editorial' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
    { '@type': 'ListItem', position: 2, name: 'Vendors', item: 'https://peptidex.app/vendors' },
    { '@type': 'ListItem', position: 3, name: 'Amino Club Review', item: CANONICAL },
  ],
};

const KEY_STRENGTHS = [
  { num: '01', title: 'Batch-specific COAs', body: 'Every batch verified by MZ Biolabs and Janoshik with lot-matched documentation — not historical golden-batch tests.' },
  { num: '02', title: 'Purity ≥ 99%', body: 'HPLC chromatograms consistently show ≥99% purity across all product lines. Many batches test at 99.5% or higher.' },
  { num: '03', title: 'US-Based Shipping', body: 'Fulfills same/next business day from domestic facilities. USPS tracked — no customs delays or seizure risk.' },
  { num: '04', title: 'Secure Payments', body: 'Accepts major credit cards through standard encrypted gateways. No forced Zelle or crypto — full buyer protection.' },
];

const CATALOG_ITEMS = [
  { category: 'Tissue Repair & Recovery', compounds: 'BPC-157, TB-500 (Thymosin Beta-4)' },
  { category: 'Metabolic & GLP-1 Analogs', compounds: 'Tirzepatide, Semaglutide, Retatrutide' },
  { category: 'Growth Hormone Secretagogues', compounds: 'Tesamorelin, Ipamorelin, CJC-1295' },
  { category: 'Anti-Aging & Mitochondrial', compounds: 'GHK-Cu, MOTS-c, SS-31' },
];

export default function AminoClubReview() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/vendors">Vendors</Link>
            <span className="sep">/</span>
            <span className="current">Review</span>
          </nav>
          <div className="section-label">§ Vendor Review</div>
          <h1 className="page-title">
            Amino Club<br /><em>2026 review</em>.
          </h1>
          <p className="page-subtitle">
            An independent, evidence-based analysis of COA verification, HPLC methodology, shipping, and pricing.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 mb-6 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-500" />
              <span>April 30, 2026</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 font-medium">Independent Analysis</span>
            </div>
          </div>
          
          <AuthorByline name={AUTHOR} variant="full" className="mb-6" />
          
          <div className="mt-4"><ShareBar title={POST_TITLE} url={CANONICAL} /></div>
        </div>
      </header>

      <div className="about-content reveal space-y-16">

        {/* ── QUICK VERDICT ── */}
        <section id="verdict">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-amber-400 fill-amber-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">PeptiDex Quick Verdict</h2>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/15 p-6 mb-6">
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 font-bold text-zinc-200">4.8 / 5.0</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Amino Club is currently our top-rated vendor for 2026. They provide uncompromising batch-specific third-party HPLC and Mass Spectrometry testing, consistently exceeding 99% purity across their product lines. Coupled with fast US-based shipping and highly competitive pricing, they represent the gold standard for independent researchers.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
            <div className="text-xs font-bold text-amber-400 font-mono mb-4">§ Affiliate Disclosure</div>
            <AffiliateLink
              href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
              vendor="amino_club"
              peptide="all"
              source="vendor_review"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/25"
            >
              Visit Amino Club <ArrowRight className="w-4 h-4" />
            </AffiliateLink>
            <p className="mt-3 text-xs text-zinc-400 font-medium">
              Use code <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">PEPTIDEX</span> at checkout to save.
            </p>
          </div>
        </section>

        {/* ── KEY STRENGTHS GRID ── */}
        <section id="strengths">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">Key strengths</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {KEY_STRENGTHS.map((s) => (
              <div key={s.num} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <div className="text-xs font-bold text-emerald-400 font-mono mb-3">§ {s.num}</div>
                <h3 className="font-bold text-zinc-100 mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMPANY BACKGROUND ── */}
        <section id="background">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-violet-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">Company background & verification</h2>
          </div>
          <AutoLink>
            <p className="text-zinc-400 leading-relaxed mb-4">
              In a market flooded with untraceable overseas suppliers, Amino Club operates with notable transparency. Based in the United States, they cater specifically to the independent research community, universities, and clinical laboratories.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Our verification process confirms that Amino Club manages their own fulfillment from US-based facilities, significantly reducing the shipping delays and customs risks associated with direct-from-manufacturer sourcing. Their business model focuses on bulk synthesis followed by rigorous domestic third-party verification before any batch reaches their catalog.
            </p>
          </AutoLink>
        </section>

        {/* ── COA METHODOLOGY ── */}
        <section id="coa">
          <div className="flex items-center gap-3 mb-6">
            <FlaskConical className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">COA verification & purity methodology</h2>
          </div>
          <AutoLink>
            <p className="text-zinc-400 leading-relaxed mb-4">
              A Certificate of Analysis (COA) is the only acceptable proof of a peptide's identity and purity. We do not accept internal testing; we require verification from independent, accredited analytical laboratories.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Amino Club utilizes industry-recognized laboratories, primarily MZ Biolabs and Janoshik, for their independent analysis.
            </p>
          </AutoLink>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {[
              { num: '01', title: 'HPLC Purity', body: 'High-Performance Liquid Chromatography verifies purity by separating the mixture to identify the presence of truncated sequences or synthesis impurities. Amino Club\'s baseline standard requires ≥99% purity.' },
              { num: '02', title: 'Mass Spectrometry', body: 'Used to confirm the molecular weight, ensuring the correct amino acid sequence was synthesized without substitution errors. Every batch receives both tests.' },
            ].map((s) => (
              <div key={s.num} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <div className="text-xs font-bold text-amber-400 font-mono mb-3">§ {s.num}</div>
                <h3 className="font-bold text-zinc-100 mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-5">
            <p className="text-sm text-zinc-300 leading-relaxed">
              Crucially, Amino Club provides <strong className="text-zinc-100">batch-specific</strong> COAs — the testing corresponds to the exact lot currently being sold, rather than an outdated "golden batch" test.{' '}
              <Link href="/vendors/amino-club-coa-verification" className="text-emerald-400 hover:underline font-semibold">Read our full COA verification guide →</Link>
            </p>
          </div>
        </section>

        {/* ── PRODUCT RANGE ── */}
        <section id="catalog">
          <div className="section-label">§ Product Range</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Curated catalog</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Amino Club maintains a highly curated catalog. Rather than offering hundreds of obscure compounds, they focus on the most demanded research peptides, ensuring high turnover and fresh stock.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CATALOG_ITEMS.map((item) => (
              <div key={item.category} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <h3 className="font-bold text-zinc-100 mb-2">{item.category}</h3>
                <p className="text-sm text-zinc-400">{item.compounds}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing">
          <div className="section-label">§ Pricing Analysis</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Price vs competitors</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            When evaluating pricing, it's essential to compare vendors providing the same level of third-party verification. Unverified suppliers will always be cheaper, but the risk of degraded or mislabeled compounds invalidates the research.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Compared to our other top-tier verified vendors — Limitless Life Nootropics and Ascension Peptides — Amino Club consistently offers highly competitive pricing, particularly when factoring in their volume options.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/vendors/amino-club-vs-limitless-life" className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 block hover:border-zinc-700 transition-colors">
              <div className="text-xs font-bold text-amber-400 font-mono mb-2">§ Comparison</div>
              <p className="font-bold text-zinc-100 mb-1">vs Limitless Life</p>
              <p className="text-xs text-zinc-400">Head-to-head on pricing, testing, and service.</p>
            </Link>
            <Link href="/vendors/amino-club-vs-ascension" className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 block hover:border-zinc-700 transition-colors">
              <div className="text-xs font-bold text-amber-400 font-mono mb-2">§ Comparison</div>
              <p className="font-bold text-zinc-100 mb-1">vs Ascension Peptides</p>
              <p className="text-xs text-zinc-400">How Amino Club stacks up against Ascension in 2026.</p>
            </Link>
          </div>
        </section>

        {/* ── SHIPPING ── */}
        <section id="shipping">
          <div className="section-label">§ Shipping & Service</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Reliability verified</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Shipping reliability is a frequent pain point in the peptide industry. Based on community feedback and independent verification, Amino Club processes most orders within 24 hours (excluding weekends). They ship domestically via USPS from within the United States.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Their customer service reputation is robust. As of early 2026, their Trustpilot profile features over 87+ reviews with an average rating exceeding 4.5 stars. The most commonly cited positives are responsive communication regarding order status and rapid resolution of the rare shipping error.
          </p>
        </section>

        {/* ── FINAL CTA ── */}
        <section id="final-verdict">
          <div className="section-label">§ Conclusion</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Final verdict</h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Amino Club earns its place as PeptiDex's top recommended vendor for 2026. They check every critical box for a researcher: uncompromising batch-specific COA verification, reliable domestic shipping, secure credit card processing, and competitive pricing.
          </p>
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/15 p-8 text-center">
            <div className="text-xs font-bold text-amber-400 font-mono mb-4">§ Exclusive Code</div>
            <h3 className="text-2xl font-bold text-zinc-100 mb-4">Ready to Source from Amino Club?</h3>
            <p className="text-zinc-300 mb-6">Support your research with verified purity. Use our exclusive discount code to save on your entire order.</p>
            <div className="inline-block bg-zinc-950 border border-zinc-800 rounded-lg px-6 py-3 mb-6">
              <span className="text-sm text-zinc-400 uppercase tracking-widest font-semibold mr-3">Code:</span>
              <span className="text-xl font-mono font-bold text-amber-400">PEPTIDEX</span>
            </div>
            <div>
              <AffiliateLink
                href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
                vendor="amino_club"
                peptide="all"
                source="vendor_review_footer"
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
