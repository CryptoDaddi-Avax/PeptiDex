import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, CheckCircle2, XCircle, ArrowRight, ExternalLink, Star, FlaskConical, AlertTriangle, Activity, Clock, BarChart3, Beaker } from 'lucide-react';
import { COABadge } from '@/components/coa-badge-modal';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { vendorProfiles } from '@/data/vendor-comparison';
import { vendorPricing } from '@/data/vendor-pricing';
import { ResearchContextSidebar } from '@/components/research-context-sidebar';
import { VendorOutboundLink } from './vendor-outbound-link';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Best Peptide Vendors 2026 | Trusted Sources Reviewed, PeptiDex',
  description: 'Compare the top research-grade peptide vendors in 2026. We review purity, COA transparency, pricing, and reliability so you can source with confidence. Research use only.',
  alternates: {
    canonical: 'https://peptidex.app/vendors',
  },
};

export default function VendorsPage() {
  // --- JSON-LD FAQ SCHEMA ---
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where can I buy research peptides?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can buy research peptides from specialized online synthesis laboratories. The most reliable suppliers prioritize third-party COA testing and verify amino acid sequence purity. Always ensure you are purchasing for laboratory research use only.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a COA and why does it matter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A COA stands for Certificate of Analysis. It is a laboratory report (typically utilizing HPLC and Mass Spectrometry) that verifies the exact purity percentage and molecular weight of a synthesized peptide batch. It matters because it is the only objective proof that a product is pure and free of synthesis byproducts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are peptide vendors legitimate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, legitimate peptide vendors operate as chemical supply companies synthesizing compounds strictly for academic, preclinical, and independent laboratory research. However, the market is largely unregulated, which is why verifying independent purity testing is critical before purchasing.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best peptide company in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best peptide company in 2026 depends on your specific research needs, but top-tier vendors consistently provide batch-specific COAs, offer a wide variety of compounds (from BPC-157 to TB-500), maintain domestic shipping infrastructure, and accept secure payments.',
        },
      },
    ],
  };

  // --- AggregateOffer Schema for Rich Snippets ---
  const TOP_PEPTIDES = ['bpc-157', 'tb-500', 'ipamorelin', 'tesamorelin', 'ghk-cu'];
  const aggregateOfferSchema = {
    '@context': 'https://schema.org',
    '@graph': TOP_PEPTIDES.map(slug => {
      const pricing = vendorPricing.find(v => v.slug === slug);
      if (!pricing || pricing.vendors.length === 0) return null;
      const prices = pricing.vendors.filter(v => v.inStock).map(v => v.price_usd);
      if (prices.length === 0) return null;
      return {
        '@type': 'Product',
        name: `${pricing.name} Research Peptide`,
        description: `Research-grade ${pricing.name} peptide for laboratory use. Compare prices from verified COA-tested vendors.`,
        category: 'Research Chemical',
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: Math.min(...prices).toFixed(2),
          highPrice: Math.max(...prices).toFixed(2),
          priceCurrency: 'USD',
          offerCount: prices.length,
          availability: 'https://schema.org/InStock',
        },
      };
    }).filter(Boolean),
  };

  // --- Article/Review Schema with dateModified ---
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Peptide Vendors 2026 — Trusted Research-Grade Sources Reviewed',
    datePublished: '2026-01-15',
    dateModified: '2026-04-13',
    author: { '@type': 'Organization', name: 'PeptiDex' },
    publisher: { '@type': 'Organization', name: 'PeptiDex', url: 'https://peptidex.app' },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateOfferSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      {/* Top Disclaimer */}
      <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-4">
        <div className="flex items-start gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-400/80 leading-relaxed font-medium">
            <strong>RESEARCH & EDUCATIONAL USE ONLY:</strong> {SHORT_DISCLAIMER} The vendors listed below operate as raw chemical and laboratory supply companies. Their products are not FDA-approved for human or animal consumption.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="text-center space-y-6">
        {/* Last Updated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-400 tracking-wide">Last Updated: April 2026</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          Best Peptide Vendors 2026,<br/> <span className="text-violet-400">Lab-Tested Research Sources &amp; Category 1 Compounding</span>
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mx-auto">
          Finding the <strong>best peptide vendor 2026</strong> requires more than just searching for low prices; it requires verifying strict <strong>COA testing</strong> protocols. Navigating the unregulated market and new restrictions regarding <strong>Category 1 Compounding</strong> means researchers must independently validate <strong>lab-tested research sources</strong> for purity and molecular accuracy. Our comprehensive review compares the most <strong>trusted peptide sources</strong>, analyzing independent mass spectrometry reports, shipping reliability, and customer service to ensure your laboratory receives uncompromised biological compounds for your in vitro and in vivo studies.
        </p>

        {/* Quick Summary Strip */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Best Value</p>
              <p className="text-xs font-bold text-zinc-200">Amino Club</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <ArrowRight className="w-4 h-4 text-blue-400" />
            <div className="text-left">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Fastest Shipping</p>
              <p className="text-xs font-bold text-zinc-200">2-4 Business Days</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <Beaker className="w-4 h-4 text-violet-400" />
            <div className="text-left">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Highest Purity</p>
              <p className="text-xs font-bold text-zinc-200">99%+ HPLC Verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-300">
              <tr>
                <th className="px-6 py-4 font-semibold">Vendor Name</th>
                <th className="px-6 py-4 font-semibold">Peptides Offered</th>
                <th className="px-6 py-4 font-semibold">COA Verified</th>
                <th className="px-6 py-4 font-semibold">Pricing</th>
                <th className="px-6 py-4 font-semibold">Our Rating</th>
                <th className="px-6 py-4 font-semibold text-right">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {/* Row 1 — Amino Club (Editor's Choice) */}
              <tr className="bg-violet-500/5 border-l-4 border-l-violet-500">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-100">Amino Club</span>
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-violet-500/20 text-violet-300 rounded-md border border-violet-500/30 w-fit">Editor&apos;s Choice</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-400">40+ Compounds</td>
                <td className="px-6 py-4">
                  <COABadge
                    vendorName={vendorProfiles['amino-club'].name}
                    coaUrl={vendorProfiles['amino-club'].coaUrl}
                    lastTestedDate={vendorProfiles['amino-club'].lastTestedDate}
                    testingMethods={vendorProfiles['amino-club'].testingMethods}
                    purity={vendorProfiles['amino-club'].purity}
                  />
                </td>
                <td className="px-6 py-4 text-zinc-400">$$</td>
                <td className="px-6 py-4">
                  <div className="flex gap-0.5 text-amber-400 items-center">
                    <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                    <span className="text-xs text-zinc-400 ml-2">4.9/5</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <VendorOutboundLink href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" vendorName="Amino Club" location="comparison_table" className="inline-flex items-center gap-1 px-4 py-2.5 min-h-[44px] rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-colors">Visit <ExternalLink className="w-3 h-3" /></VendorOutboundLink>
                </td>
              </tr>
              {/* Row 2 — Ascension Peptides */}
              <tr className="hover:bg-zinc-800/20 transition-colors">
                <td className="px-6 py-4 font-bold text-zinc-100">Ascension Peptides</td>
                <td className="px-6 py-4 text-zinc-400">60+ Compounds</td>
                <td className="px-6 py-4">
                  <COABadge
                    vendorName={vendorProfiles['ascension-peptides'].name}
                    coaUrl={vendorProfiles['ascension-peptides'].coaUrl}
                    lastTestedDate={vendorProfiles['ascension-peptides'].lastTestedDate}
                    testingMethods={vendorProfiles['ascension-peptides'].testingMethods}
                    purity={vendorProfiles['ascension-peptides'].purity}
                  />
                </td>
                <td className="px-6 py-4 text-zinc-400">$$$</td>
                <td className="px-6 py-4">
                  <div className="flex gap-0.5 text-amber-400 items-center">
                    <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                    <span className="text-xs text-zinc-400 ml-2">4.7/5</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <VendorOutboundLink href="https://ascensionpeptides.com/ref/PeptiDex/" vendorName="Ascension Peptides" location="comparison_table" className="inline-flex items-center gap-1 px-4 py-2.5 min-h-[44px] text-violet-400 hover:text-violet-300 font-semibold">Visit <ExternalLink className="w-3.5 h-3.5" /></VendorOutboundLink>
                </td>
              </tr>
              {/* Row 3 — Limitless Life */}
              <tr className="hover:bg-zinc-800/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-100">Limitless Life</span>
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-emerald-500/15 text-emerald-300 rounded-md border border-emerald-500/25 w-fit">USA Made</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-400">90+ Compounds</td>
                <td className="px-6 py-4">
                  <COABadge
                    vendorName={vendorProfiles['limitless-life'].name}
                    lastTestedDate={vendorProfiles['limitless-life'].lastTestedDate}
                    testingMethods={vendorProfiles['limitless-life'].testingMethods}
                    purity={vendorProfiles['limitless-life'].purity}
                  />
                </td>
                <td className="px-6 py-4 text-zinc-400">$$</td>
                <td className="px-6 py-4">
                  <div className="flex gap-0.5 text-amber-400 items-center">
                    <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                    <span className="text-xs text-zinc-400 ml-2">4.8/5</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <VendorOutboundLink href="https://www.kb6dp3dq.com/PEPTIDEX/" vendorName="Limitless Life" location="comparison_table" className="inline-flex items-center gap-1 px-4 py-2.5 min-h-[44px] text-violet-400 hover:text-violet-300 font-semibold">Visit <ExternalLink className="w-3.5 h-3.5" /></VendorOutboundLink>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

      {/* Vendor Review Cards */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-zinc-100 border-b border-zinc-800 pb-4">Detailed Lab-Tested Research Sources Reviews</h2>
        <div className="grid grid-cols-1 gap-8">
          
          {/* Card 1: Amino Club (Editor's Choice) */}
          <div className="flex flex-col rounded-2xl border-2 border-violet-500/30 bg-gradient-to-br from-violet-900/10 to-zinc-900 p-6 md:p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/10 blur-[60px] rounded-full pointer-events-none" />
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4 flex items-center gap-3 flex-wrap">
              Amino Club
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-violet-500/20 text-violet-300 rounded-md border border-violet-500/30">
                Editor&apos;s Choice
              </span>
              <COABadge
                vendorName={vendorProfiles['amino-club'].name}
                coaUrl={vendorProfiles['amino-club'].coaUrl}
                lastTestedDate={vendorProfiles['amino-club'].lastTestedDate}
                testingMethods={vendorProfiles['amino-club'].testingMethods}
                purity={vendorProfiles['amino-club'].purity}
              />
            </h3>
            <p className="text-base text-zinc-300 leading-relaxed mb-8 flex-grow">
              Amino Club has earned our #1 recommendation for 2026 through a consistent track record of verified purity, transparent batch-specific COA documentation, and reliable US fulfillment. Their catalog covers 40+ of the most in-demand research compounds — all backed by independent third-party HPLC and mass spectrometry testing. Competitive pricing, typically 15-30% below premium-tier competitors, makes them the best overall value in the market.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-t border-zinc-800/50 pt-6">
              <div>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4 block">Pros</span>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm text-zinc-300 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> Batch-specific third-party COAs on every product</li>
                  <li className="flex gap-3 text-sm text-zinc-300 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> Consistently ≥99% HPLC purity</li>
                  <li className="flex gap-3 text-sm text-zinc-300 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> Competitive pricing (15-30% below premium tier)</li>
                  <li className="flex gap-3 text-sm text-zinc-300 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> Fast domestic US shipping (2-4 business days)</li>
                  <li className="flex gap-3 text-sm text-zinc-300 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> Top-rated across independent research forums</li>
                </ul>
              </div>
              <div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-4 block">Cons</span>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm text-zinc-300 items-start"><AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" /> Catalog still growing (40+ vs 60+ for legacy competitors)</li>
                  <li className="flex gap-3 text-sm text-zinc-300 items-start"><AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" /> International shipping available but US is primary strength</li>
                </ul>
              </div>
            </div>
            <VendorOutboundLink href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" vendorName="Amino Club" location="vendor_card_amino_club" className="w-full flex items-center justify-center gap-2 py-4 min-h-[48px] rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all shadow-lg hover:shadow-violet-600/25 text-lg">
              Compare Prices at Amino Club <ArrowRight className="w-5 h-5" />
            </VendorOutboundLink>
            <VendorOutboundLink href={vendorProfiles['amino-club']?.coaUrl || "#"} vendorName="Amino Club" location="vendor_card_amino_club_coa" className="w-full flex items-center justify-center gap-2 py-3 min-h-[44px] rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-emerald-400 font-semibold transition-all text-sm mt-2">
              <Beaker className="w-4 h-4" /> View Lab Test Results (COA)
            </VendorOutboundLink>
          </div>

          {/* Card 2: Ascension Peptides */}
          <div className="flex flex-col rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 md:p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[50px] rounded-full pointer-events-none transition-all group-hover:bg-violet-500/20" />
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4 flex items-center gap-3 flex-wrap">
              Ascension Peptides 
              <COABadge
                vendorName={vendorProfiles['ascension-peptides'].name}
                coaUrl={vendorProfiles['ascension-peptides'].coaUrl}
                lastTestedDate={vendorProfiles['ascension-peptides'].lastTestedDate}
                testingMethods={vendorProfiles['ascension-peptides'].testingMethods}
                purity={vendorProfiles['ascension-peptides'].purity}
              />
            </h3>
            <p className="text-base text-zinc-400 leading-relaxed mb-8 flex-grow">
              Ascension Peptides has established itself as a premier destination for research-grade peptides, offering an extensive catalogue of 60+ verified compounds backed by rigorous third-party COA documentation. The premium pricing is the main trade-off — they position themselves at the top tier, which is justified by catalog breadth.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-t border-zinc-800/50 pt-6">
              <div>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4 block">Pros</span>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm text-zinc-300 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> Largest peptide catalog (60+ compounds)</li>
                  <li className="flex gap-3 text-sm text-zinc-300 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> Third-party COA verified</li>
                  <li className="flex gap-3 text-sm text-zinc-300 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> Fast US shipping</li>
                  <li className="flex gap-3 text-sm text-zinc-300 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> Strong researcher reputation</li>
                </ul>
              </div>
              <div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-4 block">Cons</span>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm text-zinc-300 items-start"><AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" /> Premium pricing tier</li>
                </ul>
              </div>
            </div>
            <VendorOutboundLink href="https://ascensionpeptides.com/ref/PeptiDex/" vendorName="Ascension Peptides" location="vendor_card_ascension" className="w-full flex items-center justify-center gap-2 py-4 min-h-[48px] rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-bold transition-all">
              Compare Prices at Ascension <ArrowRight className="w-4 h-4" />
            </VendorOutboundLink>
            {vendorProfiles['ascension-peptides']?.coaUrl && (
              <VendorOutboundLink href={vendorProfiles['ascension-peptides'].coaUrl} vendorName="Ascension Peptides" location="vendor_card_ascension_coa" className="w-full flex items-center justify-center gap-2 py-3 min-h-[44px] rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-emerald-400 font-semibold transition-all text-sm mt-2">
                <Beaker className="w-4 h-4" /> View Lab Test Results (COA)
              </VendorOutboundLink>
            )}
          </div>
          


        </div>
      </section>

      {/* Card 3: Limitless Life */}
      <section className="space-y-8">
        <div className="flex flex-col rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 md:p-8 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none transition-all group-hover:bg-emerald-500/20" />
          <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4 flex items-center gap-3 flex-wrap">
            Limitless Life
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-emerald-500/15 text-emerald-300 rounded-md border border-emerald-500/25">
              USA Made
            </span>
            <COABadge
              vendorName={vendorProfiles['limitless-life'].name}
              lastTestedDate={vendorProfiles['limitless-life'].lastTestedDate}
              testingMethods={vendorProfiles['limitless-life'].testingMethods}
              purity={vendorProfiles['limitless-life'].purity}
            />
          </h3>
          <p className="text-base text-zinc-400 leading-relaxed mb-8 flex-grow">
            Limitless Life (Limitless Biotech) stands out as one of the few vendors offering <strong className="text-zinc-300">100% USA-manufactured</strong> research peptides under full GMP protocols. With 90+ compounds — including peptide capsules, blends, bioregulators, and sprays — their catalog breadth rivals the best in the industry. Every batch is independently tested via HPLC, LC-MS, and endotoxin screens before release. Use code <strong className="text-emerald-400">PEPTIDEX</strong> for 15% off your order.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-t border-zinc-800/50 pt-6">
            <div>
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4 block">Pros</span>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-zinc-300 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> 100% USA-manufactured under GMP standards</li>
                <li className="flex gap-3 text-sm text-zinc-300 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> Largest catalog: 90+ compounds (capsules, blends, bioregulators)</li>
                <li className="flex gap-3 text-sm text-zinc-300 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> HPLC + LC-MS + Endotoxin testing on every batch</li>
                <li className="flex gap-3 text-sm text-zinc-300 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> Batch-specific COA with every order</li>
                <li className="flex gap-3 text-sm text-zinc-300 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /> 15% discount with code PEPTIDEX</li>
              </ul>
            </div>
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-4 block">Cons</span>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-zinc-300 items-start"><AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" /> US domestic shipping only</li>
                <li className="flex gap-3 text-sm text-zinc-300 items-start"><AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" /> 3–5 business day dispatch</li>
              </ul>
            </div>
          </div>
          <VendorOutboundLink href="https://www.kb6dp3dq.com/PEPTIDEX/" vendorName="Limitless Life" location="vendor_card_limitless_life" className="w-full flex items-center justify-center gap-2 py-4 min-h-[48px] rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-bold transition-all">
            Shop Limitless Life (Code: PEPTIDEX) <ArrowRight className="w-4 h-4" />
          </VendorOutboundLink>
        </div>
      </section>

      {/* Trust-Building: How We Vet */}
      <section className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 md:p-10 space-y-8">
        <h2 className="text-3xl font-bold text-zinc-100">How We Vet Peptide Vendors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4 border border-zinc-700 shadow-md">
              <FlaskConical className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-lg font-bold text-zinc-200 mb-2">Independent COA & HPLC</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We mandate that vendors supply verifiable High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry documentation from a recognized third-party analytical laboratory (e.g., JanoShik) proving purity higher than 99%.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4 border border-zinc-700 shadow-md">
              <ShieldAlert className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-lg font-bold text-zinc-200 mb-2">Secure Payment Options</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Due to high-risk processing status, legitimate chemical suppliers often use alternative gateways. We review their payment security infrastructure, favoring companies accepting major credit cards and verified crypto portals securely.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4 border border-zinc-700 shadow-md">
              <CheckCircle2 className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-lg font-bold text-zinc-200 mb-2">Shipping & Fulfillment</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We evaluate domestic dispatch speeds to ensure biologically sensitive compounds are not subjected to prolonged transit temperatures. Vendors must guarantee swift fulfillment and provide responsive customer support structures.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6 max-w-3xl mx-auto pb-8">
        <h2 className="text-3xl font-bold text-zinc-100 text-center mb-10">Frequently Asked Sourcing Questions</h2>
        
        {faqSchema.mainEntity.map((q, idx) => (
          <div key={idx} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-zinc-200 mb-3">{q.name}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
          </div>
        ))}
        
      </section>

      {/* ═══════ RESEARCH CONTEXT SIDEBAR ═══════ */}
      <ResearchContextSidebar />

      {/* Footer Internal Links & Affil disclaimer */}
      <footer className="pt-8 border-t border-zinc-800 space-y-6">
        <div className="flex flex-wrap gap-4 text-sm font-medium items-center">
          <span className="text-zinc-500">Explore Research:</span>
          <Link href="/peptides/bpc-157" className="text-violet-400 hover:text-violet-300 transition-colors">BPC-157 Research</Link>
          <span className="text-zinc-700">|</span>
          <Link href="/peptides/tb-500" className="text-violet-400 hover:text-violet-300 transition-colors">TB-500 Protocols</Link>
          <span className="text-zinc-700">|</span>
          <Link href="/stacks/injury-recovery" className="text-violet-400 hover:text-violet-300 transition-colors">Healing Stacks</Link>
        </div>
        
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800/50">
          <p className="text-xs text-zinc-500 leading-relaxed text-justify mb-2">
            <strong>AFFILIATE DISCLOSURE:</strong> PeptiDex is a reader-supported independent research hub. When you purchase through links on our site, we may earn an affiliate commission. This helps maintain our database and fund ongoing research operations without impacting our unbiased vetting process.
          </p>
          <p className="text-xs text-zinc-500 leading-relaxed text-justify">
            <strong>LABORATORY RESEARCH WARNING:</strong> The vendors endorsed on this page strictly sell raw analytical chemicals intended for licensed professionals and independent laboratory research only. These products are NOT FDA-approved for human diagnostics, treatment, or dietary supplementation. Any purchase made by individuals without the explicit intention of in-vitro experimental or preclinical animal study violates the fundamental terms of service of these chemical providers.
          </p>
        </div>
      </footer>

    </div>
  );
}
