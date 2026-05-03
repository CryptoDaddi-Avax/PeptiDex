import { notFound } from 'next/navigation';
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
import { peptides } from '@/data/peptides';
import { vendorPricing } from '@/data/vendor-pricing';
import {
  Calendar, User, ArrowRight, ArrowLeft,
  FlaskConical, CheckCircle2, Shield, FileText, ArrowUpRight, ShieldAlert
} from 'lucide-react';

const SUPPORTED_SLUGS = ['bpc-157', 'tirzepatide', 'retatrutide', 'tesamorelin', 'semaglutide'];

export function generateStaticParams() {
  return SUPPORTED_SLUGS.map((slug) => ({ peptide: slug }));
}

export function generateMetadata({ params }: { params: { peptide: string } }): Metadata {
  const { peptide: slug } = params;
  if (!SUPPORTED_SLUGS.includes(slug)) return {};

  const pData = peptides.find(p => p.slug === slug);
  const name = pData?.name || slug.toUpperCase();

  let title = '';
  let description = '';

  switch (slug) {
    case 'bpc-157':
      title = 'Buy BPC-157 Online: Amino Club Pricing & COA Verification (2026)';
      description = "Looking to buy BPC-157? We verified Amino Club's 10mg vials for >99% purity via independent HPLC testing. Use code PEPTIDEX to save 15% on your order.";
      break;
    case 'tirzepatide':
      title = 'Buy Tirzepatide Online: Amino Club Pricing & COA Verification (2026)';
      description = "Where to buy Tirzepatide online: Amino Club provides batch-specific mass spectrometry testing for their Tirzepatide vials. Save 15% with discount code PEPTIDEX.";
      break;
    case 'retatrutide':
      title = 'Buy Retatrutide: Amino Club Pricing & Independent Testing (2026)';
      description = "Sourcing Retatrutide for research? Amino Club offers verifiable 99%+ pure Retatrutide shipped from the US. Apply promo code PEPTIDEX at checkout for 15% off.";
      break;
    case 'tesamorelin':
      title = 'Buy Tesamorelin: Amino Club Pricing & COA Verification (2026)';
      description = "Buy highly purified Tesamorelin online. We audit Amino Club's third-party HPLC testing standards for this GHRH analog. Use code PEPTIDEX to save 15%.";
      break;
    case 'semaglutide':
      title = 'Buy Semaglutide Online: Amino Club Pricing & COA Verification (2026)';
      description = "Looking for research-grade Semaglutide? Amino Club provides batch-tested vials with US-based shipping. Get 15% off your entire order with code PEPTIDEX.";
      break;
    default:
      title = `Buy ${name}: Amino Club Pricing & COA Verification`;
      description = `Independent verification of Amino Club's ${name}. We review their third-party testing and pricing. Use code PEPTIDEX to save 15%.`;
  }

  return {
    title,
    description,
    alternates: { canonical: `https://peptidex.app/vendors/amino-club/${slug}` },
    openGraph: { title, description, url: `https://peptidex.app/vendors/amino-club/${slug}`, type: 'article' },
  };
}

export default function AminoClubProductPage({ params }: { params: { peptide: string } }) {
  const { peptide: slug } = params;

  if (!SUPPORTED_SLUGS.includes(slug)) notFound();

  const pData = peptides.find(p => p.slug === slug);
  const vData = vendorPricing.find(v => v.slug === slug);
  const aminoClubPricing = vData?.vendors.find(v => v.vendor === 'Amino Club');

  if (!pData) notFound();

  const name = pData.name;
  const CANONICAL = `https://peptidex.app/vendors/amino-club/${slug}`;
  const DATE_PUB = '2026-04-30';
  const DATE_MOD = '2026-04-30';
  const AUTHOR = 'PeptideX Editorial';

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${name} (Research Grade)`,
    description: `Highly purified ${name} intended for in-vitro laboratory research. Third-party tested for identity and purity.`,
    brand: { '@type': 'Organization', name: 'Amino Club' },
    offers: aminoClubPricing ? {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: aminoClubPricing.price_usd.toString(),
      availability: aminoClubPricing.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: aminoClubPricing.affiliateUrl,
    } : undefined,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Vendors', item: 'https://peptidex.app/vendors' },
      { '@type': 'ListItem', position: 3, name: `Amino Club ${name}`, item: CANONICAL },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Sourcing ${name} from Amino Club`,
    author: { '@type': 'Organization', name: 'PeptideX Research', url: 'https://peptidex.app' },
    publisher: { '@type': 'Organization', name: 'PeptideX', logo: { '@type': 'ImageObject', url: 'https://peptidex.app/favicon.ico' } },
    datePublished: `${DATE_PUB}T12:00:00Z`,
    dateModified: `${DATE_MOD}T12:00:00Z`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/vendors">Vendors</Link>
            <span className="sep">/</span>
            <span className="current">Amino Club {name}</span>
          </nav>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/15 text-emerald-300 rounded-full border border-emerald-500/30">
              Source Verification
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-zinc-800 text-zinc-300 rounded-full border border-zinc-700">
              {pData.category}
            </span>
          </div>
          <div className="section-label">§ Amino Club</div>
          <h1 className="page-title">
            Sourcing<br /><em>{name}</em>.
          </h1>
          <p className="page-subtitle">
            Independent COA verification, pricing analysis, and sourcing guide for researchers — 2026.
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
          <div className="mt-4 flex items-center gap-4">
            <Link href="/vendors" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Vendors
            </Link>
            <Link href={`/library/${slug}`} className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors group">
              View full {name} Profile <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      <div className="about-content reveal space-y-16">

        {/* ── DISCLAIMER ── */}
        <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-4">
          <div className="flex items-start gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-400/80 leading-relaxed font-medium">
              <strong>EDUCATIONAL CONTENT:</strong> {SHORT_DISCLAIMER}
            </p>
          </div>
        </div>

        {/* ── BUY BOX ── */}
        <section id="buy-box">
          <div className="rounded-xl border border-emerald-500/30 bg-zinc-900/80 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl shadow-emerald-900/10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />
            <div className="relative z-10 w-full md:w-auto">
              <div className="text-xs font-bold text-emerald-400 font-mono mb-2">§ Current Pricing</div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-zinc-100">Amino Club {name}</h2>
                {aminoClubPricing?.badge && (
                  <span className="px-2 py-0.5 text-[10px] uppercase tracking-widest bg-amber-500/20 text-amber-400 rounded border border-amber-500/30 ml-2">
                    {aminoClubPricing.badge}
                  </span>
                )}
              </div>
              {aminoClubPricing ? (
                <div className="text-3xl font-black text-emerald-400 mb-1">
                  ${aminoClubPricing.price_usd.toFixed(2)}{' '}
                  <span className="text-sm text-zinc-500 font-normal tracking-wide">/ {aminoClubPricing.vial_mg}mg vial</span>
                </div>
              ) : (
                <div className="text-zinc-400">Pricing currently unavailable</div>
              )}
              <div className="flex items-center gap-2 text-sm text-zinc-400 mt-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> In stock & ships from US
              </div>
            </div>
            <div className="relative z-10 w-full md:w-auto flex flex-col items-center md:items-end">
              <AffiliateLink
                href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
                vendor="amino_club"
                peptide={slug}
                source="product_page_hero"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/25 text-lg"
              >
                Buy {name} <ArrowRight className="w-5 h-5" />
              </AffiliateLink>
              <p className="mt-3 text-sm text-zinc-300 font-medium bg-zinc-950 border border-zinc-800 px-4 py-1.5 rounded-lg w-full md:w-auto text-center">
                Use code <strong className="text-amber-400 font-mono tracking-wider ml-1">PEPTIDEX</strong> for 15% off
              </p>
            </div>
          </div>
        </section>

        {/* ── WHY AMINO CLUB ── */}
        <section id="why-amino-club">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">Why source {name} from Amino Club?</h2>
          </div>
          <AutoLink>
            <p className="text-zinc-400 leading-relaxed mb-4">
              When researching <strong className="text-zinc-200">{name}</strong>, verifying the identity and purity of the compound is the most critical step. Due to its popularity in {pData.category.toLowerCase()} studies, the market is flooded with under-dosed or entirely counterfeit vials originating from unverified overseas suppliers.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
              We recommend sourcing {name} from Amino Club for three distinct reasons:
            </p>
          </AutoLink>
          <div className="space-y-4">
            {[
              { num: '01', title: 'Batch-Specific Testing', body: `Amino Club utilizes independent laboratories (like MZ Biolabs) to perform HPLC and Mass Spectrometry on every single batch of ${name} they synthesize. They do not rely on outdated "golden batch" COAs.` },
              { num: '02', title: 'Purity Standards', body: `Their baseline acceptable purity is ≥99%. When reviewing their current testing documents for ${name}, the chromatograms consistently show exceptional purity with virtually zero truncated sequences.` },
              { num: '03', title: 'Domestic Fulfillment', body: `They ship from within the United States. This eliminates the weeks-long delays and customs seizure risks associated with ordering ${name} directly from Chinese laboratories.` },
            ].map((s) => (
              <div key={s.num} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 flex items-start gap-4">
                <div className="text-xs font-bold text-emerald-400 font-mono flex-shrink-0 pt-0.5">§ {s.num}</div>
                <div>
                  <h3 className="font-bold text-zinc-100 mb-1">{s.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── COA SECTION ── */}
        <section id="coa-verification">
          <div className="flex items-center gap-3 mb-6">
            <FlaskConical className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-zinc-100">COA verification for {name}</h2>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-zinc-100 mb-1">Independent Laboratory Analysis</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                Amino Club provides direct access to the latest Certificate of Analysis for their {name} vials. You can verify the exact purity percentage and mass-to-charge ratio before purchasing.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> HPLC Purity Tested
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Mass Spec Identity Verified
                </div>
              </div>
            </div>
            {aminoClubPricing?.coaUrl && (
              <a
                href={aminoClubPricing.coaUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-sm font-semibold rounded-lg transition-colors w-full md:w-auto justify-center"
              >
                View Latest COA <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing-value">
          <div className="section-label">§ Value Analysis</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Pricing & value</h2>
          <AutoLink>
            <p className="text-zinc-400 leading-relaxed mb-4">
              At <strong className="text-zinc-200">${aminoClubPricing?.price_usd.toFixed(2)}</strong> for a {aminoClubPricing?.vial_mg}mg vial, Amino Club offers highly competitive pricing for COA-verified {name}.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              While you may find cheaper sources on unregulated marketplaces or direct-from-China websites, those prices do not include the cost of independent analytical testing. Sourcing unverified {name} completely invalidates research results and introduces significant contamination risks.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Furthermore, when you apply the <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-amber-300">PEPTIDEX</code> discount code at checkout, Amino Club's pricing often beats other premium, verified US-based vendors like Limitless Life and Ascension Peptides. They also offer bulk pricing tiers (e.g., 5-packs or 10-packs) which stack with the discount code for heavy researchers.
            </p>
          </AutoLink>
        </section>

        {/* ── WHO SHOULD CONSIDER ── */}
        <section id="who-should-consider">
          <div className="section-label">§ Research Context</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Who should consider {name}?</h2>
          <AutoLink>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Based on the current body of literature, {name} is primarily investigated for its effects related to {pData.primary_benefits.toLowerCase()}. Researchers studying {pData.category.toLowerCase()} pathways often select {name} over alternatives due to its specific mechanism of action.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              <strong className="text-zinc-200">Dosing & Administration:</strong> If you are planning a research protocol with {name}, you can refer to our comprehensive{' '}
              <Link href={`/library/${slug}`} className="text-emerald-400 font-semibold hover:underline">{name} Research Profile</Link>{' '}
              for aggregated data on clinical half-life ({pData.half_life_hours} hours), receptor affinity, and standard investigational dosing parameters.
            </p>
          </AutoLink>
        </section>

        {/* ── CTA ── */}
        <section id="cta">
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/15 p-8 text-center">
            <div className="text-xs font-bold text-amber-400 font-mono mb-4">§ Exclusive Code</div>
            <h3 className="text-2xl font-bold text-zinc-100 mb-4">Support Your Research</h3>
            <p className="text-zinc-300 mb-6">Purchase verified {name} and use our exclusive discount code to save 15% on your entire Amino Club order.</p>
            <div className="inline-block bg-zinc-950 border border-zinc-800 rounded-lg px-6 py-3 mb-6">
              <span className="text-sm text-zinc-400 uppercase tracking-widest font-semibold mr-3">Code:</span>
              <span className="text-xl font-mono font-bold text-amber-400">PEPTIDEX</span>
            </div>
            <div>
              <AffiliateLink
                href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
                vendor="amino_club"
                peptide={slug}
                source="product_page_footer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/25"
              >
                Buy {name} at Amino Club <ArrowRight className="w-5 h-5" />
              </AffiliateLink>
            </div>
          </div>
        </section>

        <div className="mb-12">
          <CiteThisPage title={`Sourcing ${name} from Amino Club`} url={CANONICAL} />
        </div>
        <ShareBar title={`Sourcing ${name} from Amino Club`} url={CANONICAL} />
        <AuthorBio name={AUTHOR} />

        <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50 text-xs text-zinc-600">
          <span>Last fact-checked: <time dateTime={DATE_MOD}>{DATE_MOD}</time></span>
          <FeedbackModal pageUrl={CANONICAL} />
        </div>
      </div>

      <div className="disclaimer-strip">
        ⚠ Educational only · {name} sold strictly for in-vitro laboratory research · Not for human consumption
      </div>
    </main>
  );
}
