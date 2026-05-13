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
  Calendar, User, ArrowRight, Tag, CheckCircle2
} from 'lucide-react';

const DISCOUNT_PERCENT = '15%';
const POST_TITLE = `Amino Club Discount Code: PEPTIDEX (Saves ${DISCOUNT_PERCENT} in 2026)`;
const POST_DESC = `Use our verified Amino Club discount code PEPTIDEX at checkout to save ${DISCOUNT_PERCENT} on your entire order. Learn how to apply the promo code to BPC-157, Tirzepatide, and more.`;
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-04-30';
const DATE_MOD = '2026-04-30';
const SLUG = 'amino-club-discount-code';
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
    { '@type': 'ListItem', position: 3, name: 'Amino Club Discount', item: CANONICAL },
  ],
};

const HOW_TO_STEPS = [
  { num: '01', title: 'Add to cart', body: 'Add your selected research peptides (BPC-157, Tirzepatide, Tesamorelin, etc.) to your cart.' },
  { num: '02', title: 'Proceed to checkout', body: 'Click through to the Amino Club checkout page.' },
  { num: '03', title: 'Find the code field', body: 'Locate the "Discount code or gift card" input on the right (desktop) or top (mobile) of checkout.' },
  { num: '04', title: 'Enter PEPTIDEX', body: 'Type PEPTIDEX and click Apply. The 15% discount will be immediately deducted from your order total.' },
];

const ELIGIBLE = [
  { label: 'All individual research peptides', detail: 'BPC-157, TB-500, GHK-Cu, and more' },
  { label: 'All GLP-1 analogs', detail: 'Tirzepatide, Semaglutide, Retatrutide' },
  { label: 'Growth Hormone Secretagogues', detail: 'Ipamorelin, CJC-1295' },
  { label: 'Bulk & wholesale orders', detail: 'Stacks on top of bulk pricing tiers' },
];

export default function AminoClubDiscountCode() {
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
            <span className="current">Discount Code</span>
          </nav>
          <div className="section-label">§ Verified Promo Code</div>
          <h1 className="page-title">
            Amino Club<br /><em>PEPTIDEX</em> code.
          </h1>
          <p className="page-subtitle">
            Saves {DISCOUNT_PERCENT} on your entire order — verified, active, no expiration date.
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
        </div>
      </header>

      <div className="about-content reveal space-y-16">

        {/* ── HERO CODE BOX ── */}
        <section id="code-box">
          <div className="flex items-center gap-3 mb-6">
            <Tag className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">Your discount code</h2>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/15 p-8 text-center">
            <div className="text-xs font-bold text-amber-400 font-mono mb-4">§ Apply at Checkout</div>
            <div className="inline-flex items-center bg-zinc-950 border-2 border-zinc-700 rounded-xl px-8 py-4 mb-8">
              <span className="text-3xl md:text-4xl font-mono font-black text-amber-400 tracking-wider select-all">PEPTIDEX</span>
            </div>
            <div>
              <AffiliateLink
                href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
                vendor="amino_club"
                peptide="all"
                source="discount_page_hero"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/25 text-lg"
              >
                Shop Amino Club Now <ArrowRight className="w-5 h-5" />
              </AffiliateLink>
            </div>
            <p className="mt-4 text-sm text-zinc-400">Clicking the link will automatically copy the code to your clipboard (on supported devices).</p>
          </div>
        </section>

        {/* ── HOW TO APPLY ── */}
        <section id="how-to-apply">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">How to apply the promo code</h2>
          </div>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Applying your discount is simple. Follow these steps during your Amino Club checkout process:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {HOW_TO_STEPS.map((s) => (
              <div key={s.num} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <div className="text-xs font-bold text-emerald-400 font-mono mb-3">§ {s.num}</div>
                <h3 className="font-bold text-zinc-100 mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── ELIGIBILITY ── */}
        <section id="eligibility">
          <div className="section-label">§ Eligible Products</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">What is eligible?</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The <strong className="text-zinc-200">PEPTIDEX</strong> discount code is virtually universal across the Amino Club catalog. It applies to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {ELIGIBLE.map((item) => (
              <div key={item.label} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-100 text-sm">{item.label}</p>
                  <p className="text-xs text-zinc-400 mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-5">
            <p className="text-sm text-zinc-300">
              <strong className="text-zinc-100">Pro Tip:</strong> The code works on every order, not just your first. Bookmark this page and use it every time you restock your lab.
            </p>
          </div>
        </section>

        {/* ── EXPIRATION ── */}
        <section id="expiration">
          <div className="section-label">§ Verification</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Expiration & verification</h2>
          <p className="text-zinc-400 leading-relaxed">
            We constantly monitor and verify our exclusive partner codes. As of <strong className="text-zinc-200">April 2026</strong>, the <strong className="text-zinc-200">PEPTIDEX</strong> code is active, valid, and has no set expiration date. If you ever encounter an issue with the code, please contact us immediately so we can resolve it with the vendor.
          </p>
        </section>

        {/* ── PRICING TABLE ── */}
        <section id="pricing-comparison">
          <div className="section-label">§ Pricing Impact</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Final price comparison</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Here is a quick look at how the code impacts the pricing of common items (prices subject to change; check Amino Club for current rates):
          </p>
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Product</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Standard Price</th>
                  <th className="text-left py-3 px-4 text-amber-400 font-bold">Price with PEPTIDEX</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-3 px-4 text-zinc-300">BPC-157 (10mg)</td>
                  <td className="py-3 px-4 text-zinc-400"><span className="line-through">$45.00</span></td>
                  <td className="py-3 px-4 text-emerald-300 font-semibold">$38.25</td>
                </tr>
                <tr className="border-b border-zinc-800/50 bg-zinc-900/30">
                  <td className="py-3 px-4 text-zinc-300">Tirzepatide (10mg)</td>
                  <td className="py-3 px-4 text-zinc-400"><span className="line-through">$120.00</span></td>
                  <td className="py-3 px-4 text-emerald-300 font-semibold">$102.00</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-zinc-300">Retatrutide (10mg)</td>
                  <td className="py-3 px-4 text-zinc-400"><span className="line-through">$180.00</span></td>
                  <td className="py-3 px-4 text-emerald-300 font-semibold">$153.00</td>
                </tr>
              </tbody>
            </table>
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
