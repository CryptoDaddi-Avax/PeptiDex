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
  Calendar, User, Clock, ShieldAlert, ArrowLeft, ArrowRight,
  ShieldCheck, CheckCircle2, Lock, Truck, Star
} from 'lucide-react';

const POST_TITLE = 'Is Amino Club Legit? A 2026 Vendor Verification Report';
const POST_DESC = 'Yes, Amino Club is a legitimate research peptide vendor. We break down the proof: third-party COAs, Trustpilot reviews, secure payments, and verified US operations.';
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-04-30';
const DATE_MOD = '2026-04-30';
const SLUG = 'is-amino-club-legit';
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
    { '@type': 'ListItem', position: 3, name: 'Is Amino Club Legit?', item: CANONICAL },
  ],
};

export default function IsAminoClubLegit() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumbs items={[
        { name: 'Home', url: 'https://peptidex.app/' },
        { name: 'Vendors', url: 'https://peptidex.app/vendors' },
        { name: 'Is Amino Club Legit?' }
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
            Vendor Verification
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
          <strong>Yes, Amino Club is a legitimate research peptide vendor.</strong> In an industry where trust is paramount and scams are unfortunately common, they have established themselves as a reliable, transparent supplier. Here is the independent verification data to prove it.
        </p>

        <h2 id="business-ops">Verified Business Operations</h2>
        <div className="flex items-start gap-4 p-5 bg-zinc-900 border border-zinc-800 rounded-xl mb-6">
            <div className="mt-0.5 w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700/50 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
                <h4 className="text-zinc-100 font-bold text-sm mb-1">Domestic Fulfillment</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">Unlike many "drop-ship" vendors that simply route orders to overseas laboratories, Amino Club fulfills orders directly from within the United States. This significantly reduces shipping times and eliminates customs seizure risks for US-based researchers.</p>
            </div>
        </div>

        <h2 id="coa-testing">Third-Party COA Testing</h2>
        <p>
          The absolute baseline requirement for any peptide vendor is independent analytical testing. A vendor is not "legit" unless they can prove what is in the vial.
        </p>
        <p>
          Amino Club uses industry-standard laboratories (predominantly MZ Biolabs) to perform High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS) on their products. More importantly, they provide <strong>batch-specific testing</strong>. This means the Certificate of Analysis you view on their website corresponds to the exact lot of peptides currently being sold, not a historical test from a previous batch. Their stated purity threshold is &ge;99%, which our verification of their COAs confirms they consistently meet.
        </p>

        <h2 id="reviews">Real Customer Reviews</h2>
        <div className="flex items-start gap-4 p-5 bg-zinc-900 border border-zinc-800 rounded-xl mb-6">
            <div className="mt-0.5 w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700/50 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <div>
                <h4 className="text-zinc-100 font-bold text-sm mb-1">Trustpilot Verified</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">Amino Club maintains an active presence on Trustpilot, a platform that aggressively filters fake reviews. As of 2026, they hold an "Excellent" rating with over 87+ reviews. Customers consistently praise their fast shipping and responsive customer service.</p>
            </div>
        </div>

        <h2 id="shipping">Shipping Reliability</h2>
        <div className="flex items-start gap-4 p-5 bg-zinc-900 border border-zinc-800 rounded-xl mb-6">
            <div className="mt-0.5 w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700/50 flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-sky-400" />
            </div>
            <div>
                <h4 className="text-zinc-100 font-bold text-sm mb-1">Fast & Tracked</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">Orders are typically processed and shipped within 24 hours of payment clearing (excluding weekends). They utilize standard USPS tracking, ensuring transparency throughout the delivery process.</p>
            </div>
        </div>

        <h2 id="payments">Payment Security</h2>
        <div className="flex items-start gap-4 p-5 bg-zinc-900 border border-zinc-800 rounded-xl mb-6">
            <div className="mt-0.5 w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700/50 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-violet-400" />
            </div>
            <div>
                <h4 className="text-zinc-100 font-bold text-sm mb-1">Standard Processor Integration</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">A major red flag for scam vendors is forcing customers to use irreversible payment methods like Zelle or Crypto exclusively. Amino Club accepts major credit cards through secure, standard payment gateways, offering buyers fraud protection and chargeback capabilities if necessary.</p>
            </div>
        </div>

        <h2 id="verdict">The Bottom Line</h2>
        <p>
          Based on our independent criteria—analytical testing transparency, operational history, shipping logistics, and customer feedback—Amino Club passes our rigorous verification process. They are a legitimate, high-quality source for research compounds.
        </p>

        <div className="not-prose mt-12 p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-zinc-900 text-center">
            <h3 className="text-2xl font-bold text-zinc-100 mb-4">Ready to Order?</h3>
            <p className="text-zinc-300 mb-6">
                If you've decided to order, support your research with our verified discount code to save on your entire purchase.
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
                    source="is_legit_footer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/25"
                >
                    Shop Amino Club Securely <ArrowRight className="w-5 h-5" />
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
          This article is for informational purposes only. PeptiDex may earn a commission from purchases made through affiliate links. This does not affect our editorial independence; we exclusively feature vendors that pass strict analytical verification.
        </p>
      </div>
    </div>
  );
}
