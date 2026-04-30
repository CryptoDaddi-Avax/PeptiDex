import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AutoLink } from '@/components/auto-link';
import Link from 'next/link';
import Image from 'next/image';
import { ShareBar } from '@/components/share-bar';
import { CiteThisPage } from '@/components/cite-page';
import { AuthorBio } from '@/components/author-bio';
import { FeedbackModal } from '@/components/feedback-modal';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { getAuthorSlug } from '@/data/authors';
import { AffiliateLink } from '@/components/affiliate-link';
import {
  Calendar, User, Clock, ShieldAlert, ArrowLeft, ArrowRight,
  FlaskConical, CheckCircle2, Shield, Activity, Star
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
  itemReviewed: {
    '@type': 'Organization',
    name: 'Amino Club',
    url: 'https://aminoclub.com',
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: '4.8',
    bestRating: '5',
  },
  author: {
    '@type': 'Organization',
    name: 'PeptideX Editorial',
  },
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

export default function AminoClubReview() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      <Breadcrumbs items={[
        { name: 'Home', url: 'https://peptidex.app/' },
        { name: 'Vendors', url: 'https://peptidex.app/vendors' },
        { name: 'Amino Club Review' }
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
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/15 text-emerald-300 rounded-full border border-emerald-500/30">
            Vendor Review
          </span>
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-violet-500/15 text-violet-300 rounded-full border border-violet-500/30">
            COA Verified
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
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 font-medium">Independent Analysis</span>
          </div>
        </div>
        <ShareBar title={POST_TITLE} url={CANONICAL} />
      </header>

      {/* QUICK VERDICT */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />
        <div className="flex flex-col md:flex-row gap-8 relative z-10">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold text-zinc-100">PeptiDex Quick Verdict</h2>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 font-bold text-zinc-200">4.8 / 5.0</span>
            </div>
            <p className="text-zinc-300 leading-relaxed text-sm">
              Amino Club is currently our top-rated vendor for 2026. They provide uncompromising batch-specific third-party HPLC and Mass Spectrometry testing, consistently exceeding 99% purity across their product lines. Coupled with fast US-based shipping and highly competitive pricing, they represent the gold standard for independent researchers.
            </p>
            <div className="pt-4 border-t border-zinc-800">
                <AffiliateLink
                    href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
                    vendor="amino_club"
                    peptide="all"
                    source="vendor_review"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/25 gap-2"
                >
                    Visit Amino Club <ArrowRight className="w-4 h-4" />
                </AffiliateLink>
                <p className="mt-3 text-xs text-zinc-400 font-medium">
                  Use code <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">PEPTIDEX</span> at checkout to save.
                </p>
            </div>
          </div>
          <div className="flex-1 bg-zinc-950/50 rounded-xl p-5 border border-zinc-800/50">
            <h3 className="text-sm font-bold text-zinc-200 mb-4 uppercase tracking-wider">Key Strengths</h3>
            <ul className="space-y-3">
              {[
                'Batch-specific COAs via MZ Biolabs and Jano',
                'Purity consistently ≥ 99%',
                'Ships same/next business day from US',
                'Accepts major Credit Cards safely',
                'Transparent pricing'
              ].map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <AutoLink>
      <article className="prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:text-zinc-200 prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-zinc-800 prose-p:text-zinc-300 prose-p:leading-loose prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-200 prose-ul:text-zinc-300 prose-li:marker:text-emerald-500">

        <h2 id="background">Company Background & Verification</h2>
        <p>
          In a market flooded with untraceable overseas suppliers, Amino Club operates with notable transparency. Based in the United States, they cater specifically to the independent research community, universities, and clinical laboratories.
        </p>
        <p>
          Our verification process confirms that Amino Club manages their own fulfillment from US-based facilities, significantly reducing the shipping delays and customs risks associated with direct-from-manufacturer sourcing. Their business model focuses on bulk synthesis followed by rigorous domestic third-party verification before any batch reaches their catalog.
        </p>

        <h2 id="coa">COA Verification & Purity Methodology</h2>
        <p>
          A Certificate of Analysis (COA) is the only acceptable proof of a peptide's identity and purity. We do not accept internal testing; we require verification from independent, accredited analytical laboratories.
        </p>
        <p>
          Amino Club utilizes industry-recognized laboratories, primarily MZ Biolabs and Janoshik, for their independent analysis. Their methodology includes:
        </p>
        <ul>
          <li><strong>High-Performance Liquid Chromatography (HPLC):</strong> Used to verify the compound's purity percentage by separating the mixture to identify the presence of truncated sequences or synthesis impurities. Amino Club's baseline standard requires &ge;99% purity.</li>
          <li><strong>Mass Spectrometry (MS):</strong> Used to confirm the molecular weight, ensuring the correct amino acid sequence was synthesized without substitution errors.</li>
        </ul>
        <p>
          Crucially, Amino Club provides <strong>batch-specific</strong> COAs. This means the testing corresponds to the exact lot currently being sold, rather than an outdated or "golden batch" test from years prior.
        </p>

        <div className="not-prose my-8 bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
            <h4 className="font-bold text-zinc-200 text-sm mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" /> Deep Dive on Testing
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                For a comprehensive breakdown of how to read their testing documents, see our detailed guide.
            </p>
            <Link href="/vendors/amino-club-coa-verification" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                Read our COA Verification Guide <ArrowRight className="w-4 h-4" />
            </Link>
        </div>

        <h2 id="catalog">Product Range</h2>
        <p>
          Amino Club maintains a highly curated catalog. Rather than offering hundreds of obscure compounds, they focus on the most demanded research peptides, ensuring high turnover and fresh stock. Their core offerings include:
        </p>
        <ul>
          <li><strong>Tissue Repair & Recovery:</strong> BPC-157, TB-500 (Thymosin Beta-4)</li>
          <li><strong>Metabolic & GLP-1 Analogs:</strong> Tirzepatide, Semaglutide, Retatrutide</li>
          <li><strong>Growth Hormone Secretagogues:</strong> Tesamorelin, Ipamorelin, CJC-1295</li>
          <li><strong>Anti-Aging & Mitochondrial:</strong> GHK-Cu, MOTS-c, SS-31</li>
        </ul>

        <h2 id="pricing">Pricing Analysis vs Competitors</h2>
        <p>
          When evaluating pricing, it's essential to compare vendors providing the same level of third-party verification. Unverified suppliers will always be cheaper, but the risk of degraded or mislabeled compounds invalidates the research.
        </p>
        <p>
          Compared to our other top-tier verified vendors—Limitless Life Nootropics and Ascension Peptides—Amino Club consistently offers highly competitive pricing, particularly when factoring in their volume options.
        </p>
        
        <div className="not-prose my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/vendors/amino-club-vs-limitless-life" className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 block hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-zinc-200">vs Limitless Life</p>
              <ArrowRight className="w-4 h-4 text-zinc-500" />
            </div>
            <p className="text-xs text-zinc-400">Read our head-to-head comparison on pricing, testing, and service.</p>
          </Link>
          <Link href="/vendors/amino-club-vs-ascension" className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 block hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-zinc-200">vs Ascension Peptides</p>
              <ArrowRight className="w-4 h-4 text-zinc-500" />
            </div>
            <p className="text-xs text-zinc-400">See how Amino Club stacks up against Ascension in 2026.</p>
          </Link>
        </div>

        <h2 id="shipping">Shipping & Customer Service</h2>
        <p>
          Shipping reliability is a frequent pain point in the peptide industry. Based on community feedback and independent verification, Amino Club processes most orders within 24 hours (excluding weekends). They ship domestically via USPS from within the United States.
        </p>
        <p>
          Their customer service reputation is robust. As of early 2026, their Trustpilot profile features over 87+ reviews with an average rating exceeding 4.5 stars. The most commonly cited positives are responsive communication regarding order status and rapid resolution of the rare shipping error.
        </p>

        <h2 id="verdict">Final Verdict</h2>
        <p>
          Amino Club earns its place as PeptiDex's top recommended vendor for 2026. They check every critical box for a researcher: uncompromising batch-specific COA verification, reliable domestic shipping, secure credit card processing, and competitive pricing.
        </p>

        <div className="not-prose mt-12 p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-zinc-900 text-center">
            <h3 className="text-2xl font-bold text-zinc-100 mb-4">Ready to Source from Amino Club?</h3>
            <p className="text-zinc-300 mb-6">
                Support your research with verified purity. Use our exclusive discount code to save on your entire order.
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
                    source="vendor_review_footer"
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

      <div className="mt-16 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col gap-2">
        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Disclaimer</p>
        <p className="text-sm text-zinc-400 leading-relaxed italic">
          This review is for informational purposes only. PeptiDex may earn a commission from purchases made through affiliate links. This does not affect our editorial independence; we exclusively feature vendors that pass strict analytical verification.
        </p>
      </div>
    </div>
  );
}
