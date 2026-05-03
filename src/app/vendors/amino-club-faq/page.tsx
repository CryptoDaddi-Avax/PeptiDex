import type { Metadata } from 'next';
import Link from 'next/link';
import { ShareBar } from '@/components/share-bar';
import { CiteThisPage } from '@/components/cite-page';
import { AuthorBio } from '@/components/author-bio';
import { FeedbackModal } from '@/components/feedback-modal';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { getAuthorSlug } from '@/data/authors';
import { AffiliateLink } from '@/components/affiliate-link';
import {
  Calendar, User, ArrowRight, HelpCircle
} from 'lucide-react';

const POST_TITLE = 'Amino Club FAQ: Shipping, COAs, and Discount Codes';
const POST_DESC = 'Comprehensive FAQ for Amino Club. Find answers regarding shipping times, payment methods, third-party testing, and how to use our exclusive discount code.';
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-04-30';
const DATE_MOD = '2026-04-30';
const SLUG = 'amino-club-faq';
const CANONICAL = `https://peptidex.app/vendors/${SLUG}`;

export const metadata: Metadata = {
  title: `${POST_TITLE} | PeptiDex`,
  description: POST_DESC,
  alternates: { canonical: CANONICAL },
  openGraph: { title: POST_TITLE, description: POST_DESC, url: CANONICAL, type: 'article' },
};

const faqs = [
  { q: 'Where does Amino Club ship from?', a: 'Amino Club fulfills and ships all orders from within the United States. This avoids international customs delays and ensures rapid delivery for domestic researchers.' },
  { q: 'Does Amino Club ship internationally?', a: 'While they primarily serve the US market, they do offer international shipping to select countries. However, international researchers are responsible for understanding their local customs regulations regarding research peptides. Shipping times will vary significantly.' },
  { q: 'How long does shipping take within the US?', a: 'Orders are typically processed within 24 hours (excluding weekends). Standard domestic shipping usually takes 3-5 business days, while expedited options can reduce this to 2-3 business days.' },
  { q: 'What payment methods does Amino Club accept?', a: 'They accept major credit cards (Visa, Mastercard, Discover) through a secure payment gateway. They do not force customers to use irreversible methods like Zelle or cryptocurrency, providing standard buyer protection.' },
  { q: 'Are Amino Club peptides tested by a third party?', a: 'Yes. They use independent, accredited laboratories like MZ Biolabs and Janoshik to perform High-Performance Liquid Chromatography (HPLC) for purity and Mass Spectrometry (MS) for identity.' },
  { q: 'What is batch-specific testing?', a: 'Batch-specific testing means the Certificate of Analysis (COA) provided corresponds to the exact synthesis lot you are purchasing. Amino Club tests every new batch rather than relying on a single historical "golden batch" test.' },
  { q: 'What purity standard does Amino Club maintain?', a: 'Their baseline standard is ≥99% purity as verified by HPLC. Many of their batches test at 99.5% or higher.' },
  { q: 'How do I use the PEPTIDEX discount code?', a: 'At checkout, enter the code PEPTIDEX in the "Discount code" field and click apply. It will automatically deduct 15% from your entire order total.' },
  { q: 'Can the discount code be used multiple times?', a: 'Yes, the PEPTIDEX code is valid for returning customers. You can use it every time you restock your research supplies.' },
  { q: 'Does Amino Club offer refunds or returns?', a: 'Due to the nature of research chemicals and the risk of contamination, Amino Club generally does not accept returns on opened products. However, if there is a verifiable issue with the product (e.g., shipping damage or a proven quality defect), their customer service is known to provide replacements or refunds on a case-by-case basis.' },
  { q: 'Are these peptides for human use?', a: 'No. As explicitly stated on their website and our reviews, these peptides are sold strictly for in-vitro laboratory research purposes only. They are not intended for human consumption or therapeutic use.' },
  { q: 'Do they sell Tirzepatide and Semaglutide?', a: 'Yes, they carry highly purified, research-grade GLP-1 receptor agonists including Tirzepatide, Semaglutide, and Retatrutide for metabolic studies.' },
  { q: 'Do they offer bulk or wholesale pricing?', a: 'Yes, they frequently offer tiered pricing based on the quantity purchased (e.g., buying 5 or 10 vials). You can stack the PEPTIDEX discount code on top of these bulk savings for significant reductions.' },
  { q: 'How does Amino Club compare to Limitless Life Nootropics?', a: 'Both are top-tier, COA-verified vendors. Amino Club often edges out Limitless on pricing for standard peptides and GLP-1s, while Limitless Life may have a slightly larger catalog of obscure or emerging nootropics.' },
  { q: 'How does Amino Club compare to Ascension Peptides?', a: "Both provide batch-specific testing and US-based shipping. Amino Club's website is often considered more user-friendly with easier access to COAs, while Ascension is a veteran favorite." },
  { q: 'Is my payment information secure?', a: 'Yes. They use standard, encrypted payment processors. Your credit card information is not stored directly on their servers.' },
  { q: 'What if my package is lost in transit?', a: 'If tracking shows the package is lost (not marked as delivered), contact their customer support. They typically work with the carrier to locate it or issue a replacement.' },
  { q: 'Do they provide reconstitution water (BAC water)?', a: 'Generally, vendors selling lyophilized peptides do not sell bacteriostatic water in the same shipment due to regulatory classifications. Researchers typically source BAC water separately.' },
  { q: 'How should I store peptides purchased from Amino Club?', a: 'Lyophilized (freeze-dried) powder should be stored in a freezer away from light. Once reconstituted with BAC water, they must be stored in a refrigerator (usually between 36°F and 46°F).' },
  { q: "Can I trust their Trustpilot reviews?", a: "Yes. Trustpilot uses automated algorithms and manual moderation to detect fake reviews. Amino Club's rating (over 4.5 stars with 87+ reviews) is a strong indicator of reliable service." },
];

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
    { '@type': 'ListItem', position: 3, name: 'Amino Club FAQ', item: CANONICAL },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

export default function AminoClubFAQ() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/vendors">Vendors</Link>
            <span className="sep">/</span>
            <span className="current">FAQ</span>
          </nav>
          <div className="section-label">§ Knowledge Base</div>
          <h1 className="page-title">
            Amino Club<br /><em>frequently asked</em>.
          </h1>
          <p className="page-subtitle">
            Shipping logistics, analytical testing protocols, and applying our exclusive discount code — all answered.
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

        {/* ── FAQ LIST ── */}
        <section id="faq-list">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">All questions answered</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <h3 className="font-bold text-zinc-100 mb-3 flex items-start gap-3">
                  <span className="text-xs font-bold text-emerald-400 font-mono flex-shrink-0 mt-1">§ {String(i + 1).padStart(2, '0')}</span>
                  {faq.q}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed ml-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="cta">
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/15 p-8 text-center">
            <div className="text-xs font-bold text-amber-400 font-mono mb-4">§ Exclusive Code</div>
            <h3 className="text-2xl font-bold text-zinc-100 mb-4">Ready to Order?</h3>
            <p className="text-zinc-300 mb-6">Use our verified discount code to save on your entire purchase at Amino Club.</p>
            <div className="inline-block bg-zinc-950 border border-zinc-800 rounded-lg px-6 py-3 mb-6">
              <span className="text-sm text-zinc-400 uppercase tracking-widest font-semibold mr-3">Code:</span>
              <span className="text-xl font-mono font-bold text-amber-400">PEPTIDEX</span>
            </div>
            <div>
              <AffiliateLink
                href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
                vendor="amino_club"
                peptide="all"
                source="faq_page_footer"
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
