import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { BuyPageHero } from '@/components/buy/BuyPageHero';
import { buildBreadcrumbSchema, buildFAQPageSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Where to Buy Peptides Online (2026): COA-Verified Vendors | PeptiDex',
  description: 'Find verified research peptide vendors. Compare pricing, purity, and shipping for BPC-157, TB-500, GLP-1s, and more. Exclusive PEPTIDEX discount codes.',
  alternates: { canonical: 'https://peptidex.app/buy' },
};

const TARGET_PEPTIDES = [
  { slug: 'bpc-157', name: 'BPC-157', desc: 'Healing & Recovery' },
  { slug: 'tb-500', name: 'TB-500', desc: 'Tissue Repair' },
  { slug: 'ghk-cu', name: 'GHK-Cu', desc: 'Skin & Healing' },
  { slug: 'semaglutide', name: 'Semaglutide', desc: 'GLP-1 Weight Loss' },
  { slug: 'tirzepatide', name: 'Tirzepatide', desc: 'GLP-1/GIP Weight Loss' },
  { slug: 'retatrutide', name: 'Retatrutide', desc: 'Tri-Agonist Weight Loss' },
  { slug: 'cjc-1295', name: 'CJC-1295', desc: 'Growth Hormone Secretagogue' },
  { slug: 'ipamorelin', name: 'Ipamorelin', desc: 'GHRP' },
  { slug: 'mk-677', name: 'MK-677', desc: 'Oral GH Secretagogue' },
  { slug: 'sermorelin', name: 'Sermorelin', desc: 'GHRH' },
  { slug: 'tesamorelin', name: 'Tesamorelin', desc: 'GHRH (Visceral Fat)' },
  { slug: 'mots-c', name: 'MOTS-c', desc: 'Mitochondrial Peptide' },
];

export default function BuyIndexPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://peptidex.app' },
    { name: 'Where to Buy Peptides', url: 'https://peptidex.app/buy' },
  ]);

  const faqSchema = buildFAQPageSchema([
    { q: 'How do I know if a peptide vendor is legit?', a: 'Legitimate vendors will provide batch-specific Certificates of Analysis (COAs) from independent third-party laboratories verifying both purity (via HPLC) and identity (via Mass Spectrometry).' },
    { q: 'What is the best peptide vendor in 2026?', a: 'PeptiDex rates Amino Club and Bio Longevity Labs as top-tier vendors due to their strict testing standards, transparency, and shipping reliability.' },
    { q: 'Is it legal to buy peptides online?', a: 'In the US, most peptides are sold legally strictly as "research chemicals" and are not approved for human consumption or therapeutic use. Some, like semaglutide, are FDA-approved but require a prescription for medical use.' },
    { q: 'What is the PeptiDex discount code?', a: 'You can use code PEPTIDEX at checkout for 20% off at Amino Club, and 15% off at Bio Longevity Labs, Limitless Life, Ascension Peptides, and Pantheon Peptides.' },
  ]);

  return (
    <main className="min-h-screen bg-zinc-950 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BuyPageHero 
        peptideName="Peptides" 
        subhead="Compare pricing and purity across our index of COA-verified research vendors. Don't risk your research on untested compounds." 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Popular Compounds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {TARGET_PEPTIDES.map(p => (
            <Link 
              key={p.slug} 
              href={`/buy/${p.slug}`}
              className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800/60 hover:border-violet-500/50 transition-all group"
            >
              <h3 className="font-bold text-lg text-white mb-1 group-hover:text-violet-400">{p.name}</h3>
              <p className="text-xs text-zinc-400 mb-4">{p.desc}</p>
              <span className="text-sm font-semibold text-violet-400 flex items-center gap-1">
                Where to Buy <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <article className="prose prose-invert prose-violet max-w-none">
          <h2>How to Spot a Legitimate Peptide Vendor</h2>
          <p>
            The research peptide market is highly unregulated. Without FDA oversight on "research chemicals," 
            the responsibility of verifying safety and purity falls entirely on the researcher. Here is what we 
            look for when verifying vendors for the PeptiDex directory:
          </p>
          
          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
            <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
              <h4 className="text-emerald-400 font-bold flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5" /> Green Flags
              </h4>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span> 
                  Batch-specific Certificates of Analysis (COAs)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span> 
                  Both HPLC (purity) and Mass Spec (identity) testing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span> 
                  Independent, verifiable third-party testing labs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span> 
                  Clear "For Research Use Only" compliance
                </li>
              </ul>
            </div>
            
            <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5">
              <h4 className="text-red-400 font-bold flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5" /> Red Flags
              </h4>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span> 
                  No COAs, or COAs from unknown/in-house labs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span> 
                  Making medical claims or providing dosage advice
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span> 
                  Accepting only irreversible crypto payments
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span> 
                  Prices that are suspiciously below market rate
                </li>
              </ul>
            </div>
          </div>

          <h2>Payment Safety and Shipping</h2>
          <p>
            Due to the high-risk classification of research chemicals by major payment processors, 
            many legitimate vendors struggle to maintain traditional credit card processing. It is 
            common and often necessary to use alternative payment methods like eCheck, Zelle, or Crypto.
          </p>
          <p>
            However, we highly recommend utilizing vendors that offer <strong>Credit Card</strong> processing 
            when possible, as this provides you with chargeback protection in the event of a non-delivery dispute.
          </p>
          
          <div className="mt-12 p-6 rounded-xl border border-amber-500/20 bg-amber-500/5 not-prose">
            <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2 mb-2">
              <Tag className="w-5 h-5" /> Site-Wide Discounts
            </h3>
            <p className="text-zinc-300 text-sm mb-4">
              PeptiDex maintains active relationships with verified vendors. Use our codes at checkout to support the platform and save on your research:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-zinc-900 rounded-lg text-center border border-zinc-800">
                <div className="text-xs text-zinc-500 mb-1">Amino Club</div>
                <div className="font-mono text-amber-400 font-bold text-lg">PEPTIDEX</div>
                <div className="text-xs font-bold text-emerald-400">20% OFF</div>
              </div>
              <div className="p-3 bg-zinc-900 rounded-lg text-center border border-zinc-800">
                <div className="text-xs text-zinc-500 mb-1">Bio Longevity</div>
                <div className="font-mono text-amber-400 font-bold text-lg">PEPTIDEX</div>
                <div className="text-xs font-bold text-emerald-400">15% OFF</div>
              </div>
              <div className="p-3 bg-zinc-900 rounded-lg text-center border border-zinc-800">
                <div className="text-xs text-zinc-500 mb-1">Limitless Life</div>
                <div className="font-mono text-amber-400 font-bold text-lg">PEPTIDEX</div>
                <div className="text-xs font-bold text-emerald-400">15% OFF</div>
              </div>
              <div className="p-3 bg-zinc-900 rounded-lg text-center border border-zinc-800">
                <div className="text-xs text-zinc-500 mb-1">Ascension</div>
                <div className="font-mono text-amber-400 font-bold text-lg">PEPTIDEX</div>
                <div className="text-xs font-bold text-emerald-400">15% OFF</div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
