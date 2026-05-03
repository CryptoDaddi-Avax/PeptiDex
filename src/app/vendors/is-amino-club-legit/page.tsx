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
  Calendar, User, ArrowRight,
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
    { '@type': 'ListItem', position: 3, name: 'Is Amino Club Legit?', item: CANONICAL },
  ],
};

const VERIFICATION_PILLARS = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    label: '§ 01 — Business Operations',
    title: 'Domestic Fulfillment',
    body: 'Unlike many "drop-ship" vendors that simply route orders to overseas laboratories, Amino Club fulfills orders directly from within the United States. This significantly reduces shipping times and eliminates customs seizure risks for US-based researchers.',
  },
  {
    icon: <CheckCircle2 className="w-6 h-6 text-violet-400" />,
    label: '§ 02 — Analytical Testing',
    title: 'Third-Party COA Testing',
    body: 'Amino Club uses industry-standard laboratories (predominantly MZ Biolabs) to perform HPLC and Mass Spectrometry on their products. More importantly, they provide batch-specific testing — the COA you view on their website corresponds to the exact lot currently being sold. Their stated purity threshold is ≥99%.',
  },
  {
    icon: <Star className="w-6 h-6 text-amber-400 fill-amber-400" />,
    label: '§ 03 — Customer Reviews',
    title: 'Trustpilot Verified',
    body: 'Amino Club maintains an active presence on Trustpilot, a platform that aggressively filters fake reviews. As of 2026, they hold an "Excellent" rating with over 87+ reviews. Customers consistently praise their fast shipping and responsive customer service.',
  },
  {
    icon: <Truck className="w-6 h-6 text-sky-400" />,
    label: '§ 04 — Logistics',
    title: 'Fast & Tracked',
    body: 'Orders are typically processed and shipped within 24 hours of payment clearing (excluding weekends). They utilize standard USPS tracking, ensuring transparency throughout the delivery process.',
  },
  {
    icon: <Lock className="w-6 h-6 text-violet-400" />,
    label: '§ 05 — Payments',
    title: 'Standard Processor Integration',
    body: 'A major red flag for scam vendors is forcing customers to use irreversible payment methods like Zelle or Crypto exclusively. Amino Club accepts major credit cards through secure, standard payment gateways, offering buyers fraud protection and chargeback capabilities if necessary.',
  },
];

export default function IsAminoClubLegit() {
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
            <span className="current">Legitimacy Report</span>
          </nav>
          <div className="section-label">§ Vendor Verification</div>
          <h1 className="page-title">
            Is Amino Club<br /><em>legit</em>?
          </h1>
          <p className="page-subtitle">
            Yes — here is the independent verification data: third-party COAs, Trustpilot ratings, secure payments, and confirmed US operations.
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

        {/* ── LEAD ── */}
        <section id="overview">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-6 mb-8">
            <p className="text-zinc-300 leading-relaxed">
              <strong className="text-zinc-100">Yes, Amino Club is a legitimate research peptide vendor.</strong> In an industry where trust is paramount and scams are unfortunately common, they have established themselves as a reliable, transparent supplier. Here is the independent verification data to prove it.
            </p>
          </div>
        </section>

        {/* ── VERIFICATION PILLARS ── */}
        <section id="verification">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">Five-point verification</h2>
          </div>
          <div className="space-y-5">
            {VERIFICATION_PILLARS.map((p) => (
              <div key={p.title} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 flex items-start gap-5">
                <div className="w-11 h-11 rounded-full bg-zinc-800 border border-zinc-700/50 flex items-center justify-center flex-shrink-0">
                  {p.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-400 font-mono mb-1">{p.label}</div>
                  <h3 className="font-bold text-zinc-100 mb-2">{p.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM LINE ── */}
        <section id="verdict">
          <div className="section-label">§ Conclusion</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">The bottom line</h2>
          <AutoLink>
            <p className="text-zinc-400 leading-relaxed">
              Based on our independent criteria — analytical testing transparency, operational history, shipping logistics, and customer feedback — Amino Club passes our rigorous verification process. They are a legitimate, high-quality source for research compounds.
            </p>
          </AutoLink>
        </section>

        {/* ── CTA ── */}
        <section id="cta">
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/15 p-8 text-center">
            <div className="text-xs font-bold text-amber-400 font-mono mb-4">§ Exclusive Code</div>
            <h3 className="text-2xl font-bold text-zinc-100 mb-4">Ready to Order?</h3>
            <p className="text-zinc-300 mb-6">If you've decided to order, support your research with our verified discount code to save on your entire purchase.</p>
            <div className="inline-block bg-zinc-950 border border-zinc-800 rounded-lg px-6 py-3 mb-6">
              <span className="text-sm text-zinc-400 uppercase tracking-widest font-semibold mr-3">Code:</span>
              <span className="text-xl font-mono font-bold text-amber-400">PEPTIDEX</span>
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
