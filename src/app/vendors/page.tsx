import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, CheckCircle2, XCircle, ArrowRight, ExternalLink, Star, FlaskConical, AlertTriangle } from 'lucide-react';
import { SHORT_DISCLAIMER } from '@/data/constants';

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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          Best Peptide Vendors 2026,<br/> <span className="text-violet-400">Trusted Research-Grade Sources Reviewed</span>
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mx-auto">
          Finding the <strong>best peptide vendor 2026</strong> requires more than just searching for low prices; it requires verifying strict <strong>COA testing</strong> protocols. Navigating the unregulated market means researchers must independently validate <strong>research-grade peptides</strong> for purity and molecular accuracy. Our comprehensive review compares the most <strong>trusted peptide sources</strong>, analyzing independent mass spectrometry reports, shipping reliability, and customer service to ensure your laboratory receives uncompromised biological compounds for your in vitro and in vivo studies.
        </p>
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
                <td className="px-6 py-4"><CheckCircle2 className="w-5 h-5 text-emerald-400" /></td>
                <td className="px-6 py-4 text-zinc-400">$$</td>
                <td className="px-6 py-4">
                  <div className="flex gap-0.5 text-amber-400 items-center">
                    <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                    <span className="text-xs text-zinc-400 ml-2">4.9/5</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <a href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" target="_blank" rel="nofollow noopener sponsored" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-colors">Visit <ExternalLink className="w-3 h-3" /></a>
                </td>
              </tr>
              {/* Row 2 — Ascension Peptides */}
              <tr className="hover:bg-zinc-800/20 transition-colors">
                <td className="px-6 py-4 font-bold text-zinc-100">Ascension Peptides</td>
                <td className="px-6 py-4 text-zinc-400">60+ Compounds</td>
                <td className="px-6 py-4"><CheckCircle2 className="w-5 h-5 text-emerald-400" /></td>
                <td className="px-6 py-4 text-zinc-400">$$$</td>
                <td className="px-6 py-4">
                  <div className="flex gap-0.5 text-amber-400 items-center">
                    <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                    <span className="text-xs text-zinc-400 ml-2">4.7/5</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <a href="https://ascensionpeptides.com/ref/PeptiDex/" rel="nofollow noopener sponsored" className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 font-semibold">Visit <ExternalLink className="w-3.5 h-3.5" /></a>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

      {/* Vendor Review Cards */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-zinc-100 border-b border-zinc-800 pb-4">Detailed Source Reviews</h2>
        <div className="grid grid-cols-1 gap-8">
          
          {/* Card 1: Amino Club (Editor's Choice) */}
          <div className="flex flex-col rounded-2xl border-2 border-violet-500/30 bg-gradient-to-br from-violet-900/10 to-zinc-900 p-6 md:p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/10 blur-[60px] rounded-full pointer-events-none" />
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4 flex items-center gap-3 flex-wrap">
              Amino Club
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-violet-500/20 text-violet-300 rounded-md border border-violet-500/30">
                Editor&apos;s Choice
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 rounded-md border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3"/> PeptiDex Verified
              </span>
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
            <a href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" target="_blank" rel="nofollow noopener sponsored" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all shadow-lg hover:shadow-violet-600/25 text-lg">
              Visit Amino Club <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Card 2: Ascension Peptides */}
          <div className="flex flex-col rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 md:p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[50px] rounded-full pointer-events-none transition-all group-hover:bg-violet-500/20" />
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4 flex items-center gap-3 flex-wrap">
              Ascension Peptides 
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 rounded-md border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3"/> PeptiDex Verified
              </span>
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
            <a href="https://ascensionpeptides.com/ref/PeptiDex/" rel="nofollow noopener sponsored" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-bold transition-all">
              View Vendor <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          


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
