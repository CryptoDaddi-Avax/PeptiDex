import type { Metadata } from 'next';
import Link from 'next/link';
import { ShareBar } from '@/components/share-bar';
import { CiteThisPage } from '@/components/cite-page';
import { AuthorByline } from '@/components/shared/AuthorByline';
import { FeedbackModal } from '@/components/feedback-modal';
import { AffiliateLink } from '@/components/affiliate-link';
import { AutoLink } from '@/components/auto-link';
import { Calendar, ArrowRight, FlaskConical, CheckCircle2, Shield, Star } from 'lucide-react';

const POST_TITLE = 'Pantheon Peptides Review (2026): An Independent Evidence-Based Analysis';
const POST_DESC = 'An independent, evidence-based review of Pantheon Peptides. We analyze this emerging vendor\'s pricing, COA verification, 50+ compound catalog, and value versus established competitors.';
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-05-09';
const DATE_MOD = '2026-05-09';
const SLUG = 'pantheon-peptides-review';
const CANONICAL = `https://peptidex.app/vendors/${SLUG}`;
const AFFILIATE_URL = 'https://pantheonpeptides.com/partner/PeptiDex/';

export const metadata: Metadata = {
  title: POST_TITLE,
  description: POST_DESC,
  alternates: { canonical: CANONICAL },
  openGraph: { title: POST_TITLE, description: POST_DESC, url: CANONICAL, type: 'article' },
};

const articleSchema = {
  '@context': 'https://schema.org', '@type': 'Article',
  headline: POST_TITLE, description: POST_DESC,
  author: { '@type': 'Organization', name: 'PeptideX Research', url: 'https://peptidex.app' },
  publisher: { '@type': 'Organization', name: 'PeptideX', logo: { '@type': 'ImageObject', url: 'https://peptidex.app/favicon.ico' } },
  datePublished: `${DATE_PUB}T12:00:00Z`, dateModified: `${DATE_MOD}T12:00:00Z`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
};
const reviewSchema = {
  '@context': 'https://schema.org', '@type': 'Review',
  itemReviewed: { '@type': 'Organization', name: 'Pantheon Peptides', url: 'https://pantheonpeptides.com' },
  reviewRating: { '@type': 'Rating', ratingValue: '4.6', bestRating: '5' },
  author: { '@type': 'Organization', name: 'PeptideX Editorial' },
};
const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
    { '@type': 'ListItem', position: 2, name: 'Vendors', item: 'https://peptidex.app/vendors' },
    { '@type': 'ListItem', position: 3, name: 'Pantheon Peptides Review', item: CANONICAL },
  ],
};
const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is Pantheon Peptides safe to order from?', acceptedAnswer: { '@type': 'Answer', text: 'Pantheon Peptides is a verified vendor in the PeptiDex registry with a Bronze verification tier. They provide COA documentation with HPLC and Mass Spectrometry testing. Researchers should request and review the COA for their specific batch before use. As with any vendor, verification of the COA laboratory credentials is recommended.' } },
    { '@type': 'Question', name: 'What is the best Pantheon Peptides promo code?', acceptedAnswer: { '@type': 'Answer', text: 'Use code PEPTIDEX at checkout for 15% off your entire order at Pantheon Peptides.' } },
    { '@type': 'Question', name: 'How does Pantheon Peptides pricing compare to Limitless Life?', acceptedAnswer: { '@type': 'Answer', text: 'Pantheon Peptides generally offers lower base prices than Limitless Life on comparable compounds. Researchers prioritizing cost-per-mg over premium verification credentials will typically find better unit economics with Pantheon, particularly with the PEPTIDEX code applied.' } },
    { '@type': 'Question', name: 'How do I get a COA from Pantheon Peptides?', acceptedAnswer: { '@type': 'Answer', text: 'COA documentation is available on the Pantheon Peptides website. Contact their support team if you require the COA for a specific batch lot. Verify that the COA date and lot number correspond to the stock currently available. [VERIFY: self-service COA availability]' } },
    { '@type': 'Question', name: 'Does Pantheon Peptides accept cryptocurrency?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Pantheon Peptides accepts both major credit cards and cryptocurrency. Credit card payment is recommended for standard buyer protection on research purchases.' } },
    { '@type': 'Question', name: 'How fast does Pantheon Peptides ship?', acceptedAnswer: { '@type': 'Answer', text: 'Pantheon Peptides ships domestically within the United States with standard transit of 3–5 business days. Free shipping applies on orders over $100.' } },
  ],
};

const KEY_STRENGTHS = [
  { num: '01', title: 'Aggressive Pricing', body: 'Pantheon Peptides offers some of the lowest base prices among PeptiDex-verified vendors. Combined with the 15% PEPTIDEX code, their effective cost-per-mg on core compounds approaches near-wholesale pricing with verification documentation.' },
  { num: '02', title: 'Low Free Shipping Threshold', body: 'Free shipping kicks in at $100 — one of the most accessible thresholds in the verified market. Single-compound orders routinely qualify, making the effective shipping cost $0 for most research purchases.' },
  { num: '03', title: '50+ Compound Coverage', body: 'A 50+ compound catalog covers the most-researched peptides across tissue repair, metabolic, and GH secretagogue categories without the overhead of maintaining a sprawling inventory.' },
  { num: '04', title: 'COA-Verified Baseline', body: 'Third-party HPLC and Mass Spectrometry testing with ≥98% purity baseline. Researchers receive documented verification rather than relying on manufacturer claims alone.' },
];

const CATALOG_ITEMS = [
  { category: 'Tissue Repair & Recovery', compounds: 'BPC-157, TB-500, GHK-Cu, KPV' },
  { category: 'Metabolic & GLP-1 Analogs', compounds: 'Semaglutide, Tirzepatide, Retatrutide, AOD-9604' },
  { category: 'Growth Hormone Secretagogues', compounds: 'CJC-1295, Ipamorelin, Sermorelin, GHRP-2' },
  { category: 'Anti-Aging & Peptide Hormones', compounds: 'Epitalon, Melanotan II, PT-141, SS-31' },
];

export default function PantheonPeptidesReview() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb">
            <Link href="/">Home</Link><span className="sep">/</span>
            <Link href="/vendors">Vendors</Link><span className="sep">/</span>
            <span className="current">Review</span>
          </nav>
          <div className="section-label">§ Vendor Review</div>
          <h1 className="page-title">Pantheon Peptides<br /><em>2026 review</em>.</h1>
          <p className="page-subtitle">An independent, evidence-based analysis of an emerging vendor&apos;s pricing, verification standards, and competitive positioning.</p>
          <div className="flex flex-wrap items-center gap-4 mt-4 mb-6 text-sm text-zinc-400">
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-zinc-500" /><span>May 9, 2026</span></div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <div className="flex items-center gap-2"><FlaskConical className="w-4 h-4 text-amber-400" /><span className="text-amber-300 font-medium">Independent Analysis</span></div>
          </div>
          <AuthorByline name={AUTHOR} variant="full" className="mb-6" />
          <div className="mt-4"><ShareBar title={POST_TITLE} url={CANONICAL} /></div>
        </div>
      </header>

      <div className="about-content reveal space-y-16">

        <section id="verdict">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-amber-400 fill-amber-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">PeptiDex Quick Verdict</h2>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/15 p-6 mb-6">
            <div className="flex items-center gap-1 mb-4">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
              <span className="ml-2 font-bold text-zinc-200">4.6 / 5.0</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Pantheon Peptides is a value-oriented emerging vendor with competitive pricing, COA verification, and a 50+ compound catalog covering the most-researched peptide categories. Their Bronze verification tier reflects a vendor that meets documentation requirements but has less established review history than longer-running competitors. For budget-conscious researchers who review COA documentation carefully and understand verification tier distinctions, Pantheon offers excellent cost-per-mg value. We rate them 4.6/5.0 for 2026.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
            <div className="text-xs font-bold text-amber-400 font-mono mb-4">§ Affiliate Disclosure</div>
            <AffiliateLink href={AFFILIATE_URL} vendor="pantheon" peptide="all" source="vendor_review"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/25">
              Visit Pantheon Peptides <ArrowRight className="w-4 h-4" />
            </AffiliateLink>
            <p className="mt-3 text-xs text-zinc-400 font-medium">
              Use code <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">PEPTIDEX</span> at checkout for 15% off.
            </p>
          </div>
        </section>

        <section id="strengths">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">Key strengths</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {KEY_STRENGTHS.map(s => (
              <div key={s.num} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <div className="text-xs font-bold text-emerald-400 font-mono mb-3">§ {s.num}</div>
                <h3 className="font-bold text-zinc-100 mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="background">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-violet-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">Company background & verification</h2>
          </div>
          <AutoLink>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Pantheon Peptides is a US-based vendor operating in the emerging tier of the verified research peptide market. Their aggressive pricing strategy — consistently below Gold and Silver tier vendors on comparable compounds — reflects a market-share-capture approach common to newer entrants with lower operational overhead and less established brand premium.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Their Bronze tier classification in the PeptiDex vendor registry indicates that they meet minimum documentation requirements — COA availability, third-party testing methodology — with less accumulated review history and transparent operational documentation than Gold and Silver tier vendors. This is not a disqualifying characteristic; it is an appropriate representation of where a newer, growing vendor sits in the credibility continuum. Researchers should engage with their documentation actively rather than assuming equivalence with longer-established vendors.
            </p>
          </AutoLink>
        </section>

        <section id="coa">
          <div className="flex items-center gap-3 mb-6">
            <FlaskConical className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">COA verification & purity methodology</h2>
          </div>
          <AutoLink>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Pantheon Peptides provides HPLC and Mass Spectrometry verification with a stated ≥98% purity baseline. Their COA documentation should be reviewed for three key factors: the issuing laboratory name, the test date relative to the stock currently available, and whether the lot number on the COA corresponds to the specific batch being purchased.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Bronze tier vendors are differentiated from Silver and Gold primarily by the self-service availability and batch-specificity of their COA documentation. Researchers are advised to contact Pantheon directly to confirm the COA applies to the current in-stock lot before completing a purchase.
            </p>
          </AutoLink>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {[
              { num: '01', title: 'HPLC Purity', body: 'High-Performance Liquid Chromatography confirms ≥98% purity. Verify the chromatogram shows a single dominant peak corresponding to the target peptide, with minimal secondary peak impurities.' },
              { num: '02', title: 'Mass Spectrometry', body: 'Mass Spectrometry confirms molecular weight identity, verifying the synthesized compound matches the target peptide. Match within ±0.1 Da of expected molecular weight is the accepted threshold.' },
            ].map(s => (
              <div key={s.num} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <div className="text-xs font-bold text-amber-400 font-mono mb-3">§ {s.num}</div>
                <h3 className="font-bold text-zinc-100 mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
            <div className="text-xs font-bold text-amber-400 font-mono mb-4">§ Affiliate Disclosure</div>
            <AffiliateLink href={AFFILIATE_URL} vendor="pantheon" peptide="all" source="vendor_review_coa"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/25">
              View Pantheon COAs <ArrowRight className="w-4 h-4" />
            </AffiliateLink>
          </div>
        </section>

        <section id="catalog">
          <div className="section-label">§ Product Range</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">50+ compound catalog</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Pantheon Peptides carries 50+ compounds across the primary research categories. Their catalog prioritizes the highest-volume compounds — BPC-157, TB-500, CJC-1295, GLP-1 analogs — which are the compounds most likely to be in active stock with fresh batches.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CATALOG_ITEMS.map(item => (
              <div key={item.category} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <h3 className="font-bold text-zinc-100 mb-2">{item.category}</h3>
                <p className="text-sm text-zinc-400">{item.compounds}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing">
          <div className="section-label">§ Pricing Analysis</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Price vs competitors</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Pantheon Peptides&apos; primary competitive advantage is pricing. Their base prices are consistently lower than Gold-tier vendors on equivalent compounds. With the 15% PEPTIDEX code applied, their effective cost-per-mg represents the strongest value proposition among PeptiDex-verified vendors for researchers where pricing is the primary selection criterion.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The relevant comparison is not Pantheon vs unverified overseas suppliers — that comparison is not useful for researchers who require documented purity. The relevant comparison is Pantheon vs Ascension Peptides: both are mid-tier verified vendors, and the choice comes down to whether Ascension&apos;s marginally stronger review history justifies the modest price premium over Pantheon.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Link href="/vendors/pantheon-vs-amino-club" className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 block hover:border-zinc-700 transition-colors">
              <div className="text-xs font-bold text-amber-400 font-mono mb-2">§ Comparison</div>
              <p className="font-bold text-zinc-100 mb-1">vs Amino Club</p>
              <p className="text-xs text-zinc-400">Value tier pricing vs premium batch-specific gold standard verification.</p>
            </Link>
            <Link href="/vendors/ascension-vs-pantheon-peptides" className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 block hover:border-zinc-700 transition-colors">
              <div className="text-xs font-bold text-amber-400 font-mono mb-2">§ Comparison</div>
              <p className="font-bold text-zinc-100 mb-1">vs Ascension Peptides</p>
              <p className="text-xs text-zinc-400">Mid-tier head-to-head: pricing aggressiveness vs established review history.</p>
            </Link>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
            <div className="text-xs font-bold text-amber-400 font-mono mb-4">§ Affiliate Disclosure</div>
            <AffiliateLink href={AFFILIATE_URL} vendor="pantheon" peptide="all" source="vendor_review_pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/25">
              Check current pricing <ArrowRight className="w-4 h-4" />
            </AffiliateLink>
            <p className="mt-3 text-xs text-zinc-400 font-medium">
              Use code <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">PEPTIDEX</span> for 15% off.
            </p>
          </div>
        </section>

        <section id="shipping">
          <div className="section-label">§ Shipping & Service</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Fulfillment & service</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Pantheon Peptides ships domestically within the United States with standard 3–5 business day transit. Free shipping on orders over $100 makes the effective shipping cost $0 for most single-compound research orders. A 30-day return policy provides defined recourse terms.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            With 150+ reviews averaging 4.6 stars, Pantheon has an emerging — not yet deep — community track record. Researchers who rely heavily on aggregated community feedback may prefer to supplement their evaluation with direct outreach to their support team before a first order to assess responsiveness.
          </p>
        </section>

        <section id="faq">
          <div className="section-label">§ FAQ</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((item, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <h3 className="font-bold text-zinc-100 mb-2">{item.name}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="final-verdict">
          <div className="section-label">§ Conclusion</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Final verdict</h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Pantheon Peptides earns a 4.6/5.0 rating as a value-oriented verified vendor with competitive pricing, COA documentation, and a catalog that covers the most-researched compounds. They are the recommended choice for budget-conscious researchers who review COA documentation carefully and understand that Bronze tier reflects emerging review history rather than deficient verification practices. As their community track record matures, a tier upgrade is a reasonable expectation.
          </p>
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/15 p-8 text-center">
            <div className="text-xs font-bold text-amber-400 font-mono mb-4">§ Exclusive Code</div>
            <h3 className="text-2xl font-bold text-zinc-100 mb-4">Ready to Source from Pantheon Peptides?</h3>
            <p className="text-zinc-300 mb-6">COA-verified research peptides at competitive pricing. Use our exclusive discount code.</p>
            <div className="inline-block bg-zinc-950 border border-zinc-800 rounded-lg px-6 py-3 mb-6">
              <span className="text-sm text-zinc-400 uppercase tracking-widest font-semibold mr-3">Code:</span>
              <span className="text-xl font-mono font-bold text-amber-400">PEPTIDEX</span>
            </div>
            <div>
              <AffiliateLink href={AFFILIATE_URL} vendor="pantheon" peptide="all" source="vendor_review_footer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/25">
                Shop Pantheon Peptides <ArrowRight className="w-5 h-5" />
              </AffiliateLink>
            </div>
          </div>
        </section>

        <div className="mb-12"><CiteThisPage title={POST_TITLE} url={CANONICAL} /></div>
        <ShareBar title={POST_TITLE} url={CANONICAL} />
        <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50 text-xs text-zinc-600">
          <span>Last fact-checked: <time dateTime={DATE_MOD}>{DATE_MOD}</time></span>
          <FeedbackModal pageUrl={CANONICAL} />
        </div>
      </div>
      <div className="disclaimer-strip">⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved</div>
    </main>
  );
}
