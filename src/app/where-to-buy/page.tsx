import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Beaker } from 'lucide-react';
import { getPeptideBySlug } from '@/data/peptides';
import '@/app/vendors/vendors-redesign.css';

const TARGET_SLUGS = [
  'bpc-157', 'tb-500', 'retatrutide', 'tirzepatide', 'semaglutide', 
  'ipamorelin', 'cjc-1295', 'ghk-cu', 'mots-c', 'epitalon'
];

export const metadata: Metadata = {
  title: 'Where to Buy Peptides Online | Sourcing Guides',
  description: 'Find the best, COA-verified vendors for specific peptides. Compare prices and check purity standards for top research compounds in 2026.',
  alternates: {
    canonical: 'https://peptidex.app/where-to-buy'
  }
};

export default function WhereToBuyIndexPage() {
  const peptides = TARGET_SLUGS.map(slug => getPeptideBySlug(slug)).filter(Boolean);

  return (
    <>
      <header className="vn-page-header">
        <div className="vn-header-grid" aria-hidden="true" />
        <div className="vn-header-wrap">
          <nav className="vn-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">/</span>
            <span className="current">Where to Buy</span>
          </nav>

          <h1 className="vn-page-title">
            Peptide Sourcing Guides (2026)
          </h1>

          <p className="vn-subtitle" style={{ maxWidth: '800px' }}>
            Find the best, independent, COA-verified vendors for specific peptides. 
            Select a compound below to compare live pricing, read specific verification protocols, and find the most reliable source for your research.
          </p>
        </div>
      </header>

      <div className="vn-container" style={{ marginBottom: '80px', marginTop: '40px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {peptides.map((peptide) => (
            <Link 
              key={peptide!.slug} 
              href={`/where-to-buy/${peptide!.slug}`}
              className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800/60 hover:border-violet-500/30 transition-all flex flex-col h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <Beaker size={20} />
                </div>
                <h2 className="text-xl font-bold text-zinc-100 group-hover:text-violet-300 transition-colors">
                  {peptide!.name}
                </h2>
              </div>
              
              <p className="text-sm text-zinc-400 flex-grow mb-6">
                {peptide!.category} • {peptide!.primary_benefits}
              </p>
              
              <div className="flex items-center text-sm font-semibold text-zinc-300 group-hover:text-violet-400 transition-colors">
                View top vendors <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
