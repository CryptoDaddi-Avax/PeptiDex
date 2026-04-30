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
  Tag, CheckCircle2, Copy
} from 'lucide-react';

const DISCOUNT_PERCENT = '15%'; // Update this if the discount changes
const POST_TITLE = `Amino Club Discount Code: PEPTIDEX (Saves ${DISCOUNT_PERCENT} in 2026)`;
const POST_DESC = `Use our verified Amino Club discount code PEPTIDEX at checkout to save ${DISCOUNT_PERCENT} on your entire order. Learn how to apply the promo code to BPC-157, Tirzepatide, and more.`;
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-04-30';
const DATE_MOD = '2026-04-30';
const SLUG = 'amino-club-discount-code';
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
    { '@type': 'ListItem', position: 3, name: 'Amino Club Discount', item: CANONICAL },
  ],
};

export default function AminoClubDiscountCode() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumbs items={[
        { name: 'Home', url: 'https://peptidex.app/' },
        { name: 'Vendors', url: 'https://peptidex.app/vendors' },
        { name: 'Amino Club Discount' }
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

      <header className="space-y-6 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/15 text-emerald-300 rounded-full border border-emerald-500/30">
            Verified Promo Code
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          Amino Club Discount Code: <span className="text-emerald-400">PEPTIDEX</span> <br/> <span className="text-2xl md:text-3xl text-zinc-400">(Saves {DISCOUNT_PERCENT} in 2026)</span>
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-400 py-4">
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
      </header>

      {/* CONVERSION BOX */}
      <div className="bg-zinc-900 border-2 border-emerald-500/50 rounded-2xl p-8 md:p-12 relative overflow-hidden text-center max-w-2xl mx-auto shadow-2xl shadow-emerald-900/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mb-6">Use this code at checkout to save {DISCOUNT_PERCENT}:</h2>
          
          <div className="inline-flex items-center bg-zinc-950 border-2 border-zinc-700 rounded-xl px-8 py-4 mb-8">
            <span className="text-3xl md:text-4xl font-mono font-black text-emerald-400 tracking-wider select-all">PEPTIDEX</span>
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
      </div>

      <AutoLink>
      <article className="prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:text-zinc-200 prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-zinc-800 prose-p:text-zinc-300 prose-p:leading-loose prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-200 prose-ul:text-zinc-300 prose-li:marker:text-emerald-500">

        <h2 id="how-to-apply">How to Apply the Promo Code</h2>
        <p>
          Applying your discount is simple. Follow these steps during your Amino Club checkout process:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
            <li>Add your selected research peptides (e.g., BPC-157, Tirzepatide, Tesamorelin) to your cart.</li>
            <li>Proceed to the checkout page.</li>
            <li>Locate the "Discount code or gift card" input field on the right side of the screen (on desktop) or at the top of the checkout flow (on mobile).</li>
            <li>Enter the code <strong>PEPTIDEX</strong>.</li>
            <li>Click "Apply". You will see the {DISCOUNT_PERCENT} discount immediately deducted from your order total.</li>
        </ol>

        <h2 id="eligibility">What is Eligible?</h2>
        <p>
          The <strong>PEPTIDEX</strong> discount code is virtually universal across the Amino Club catalog. It applies to:
        </p>
        <ul>
            <li>All individual research peptides (BPC-157, TB-500, GHK-Cu, etc.)</li>
            <li>All GLP-1 analogs (Tirzepatide, Semaglutide, Retatrutide)</li>
            <li>Growth Hormone Secretagogues (Ipamorelin, CJC-1295)</li>
            <li>Bulk and wholesale orders (stacking the discount on top of bulk pricing)</li>
        </ul>
        <div className="flex items-start gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl my-6">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-300 m-0"><strong>Pro Tip:</strong> The code works on every order, not just your first. Bookmark this page and use it every time you restock your lab.</p>
        </div>

        <h2 id="expiration">Expiration Notes & Verification</h2>
        <p>
          We constantly monitor and verify our exclusive partner codes. As of <strong>April 2026</strong>, the <strong>PEPTIDEX</strong> code is active, valid, and has no set expiration date. If you ever encounter an issue with the code, please contact us immediately so we can resolve it with the vendor.
        </p>

        <h2 id="pricing-comparison">Final Price Comparison</h2>
        <p>
          Here is a quick look at how the code impacts the pricing of common items (prices subject to change; check Amino Club for current rates):
        </p>
        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50 my-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Product</th>
                <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Standard Price</th>
                <th className="text-left py-3 px-4 text-emerald-400 font-bold">Price with PEPTIDEX</th>
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
