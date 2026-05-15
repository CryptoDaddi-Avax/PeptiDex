import React from 'react';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export type DisclaimerVariant = 
  | 'peptide'
  | 'vendor'
  | 'tool'
  | 'educational';

interface DisclaimerCardProps {
  variant: DisclaimerVariant;
  peptideName?: string;
  topic?: string;
  className?: string;
}

export function DisclaimerCard({ variant, peptideName, topic, className = '' }: DisclaimerCardProps) {
  let title = '';
  let content: React.ReactNode = null;

  switch (variant) {
    case 'peptide':
      title = 'Research Compound';
      content = (
        <>{peptideName || 'This compound'} is a research chemical. It is not FDA-approved for human therapeutic use. Information on this page reflects published research literature and is not medical advice. Do not use without licensed medical supervision.</>
      );
      break;
    case 'vendor':
      title = 'Research Suppliers';
      content = (
        <>The vendors listed sell research-grade peptides for laboratory and research applications. These compounds are not labeled, sold, or intended for human consumption, therapeutic use, or veterinary use. PeptiDex earns affiliate commissions on qualifying purchases through the PEPTIDEX code and vendor links. Users assume full responsibility for compliance with all applicable laws and regulations in their jurisdiction.</>
      );
      break;
    case 'tool':
      title = 'Research Tool';
      content = (
        <>This tool is for educational reference only. Outputs are based on published research protocols and do not constitute medical advice or a dosing recommendation. Not for use in human clinical applications without licensed medical oversight.</>
      );
      break;
    case 'educational':
      title = 'Educational Content';
      content = (
        <>This article summarizes published research on {topic || 'this topic'}. It is for educational purposes only and is not medical advice. Research peptides are not FDA-approved for human therapeutic use. Consult a licensed healthcare provider before any health-related decisions.</>
      );
      break;
  }

  return (
    <aside
      className={`my-6 rounded-xl bg-[#1c140a]/40 border border-amber-500/20 p-4 font-mono ${className}`}
      aria-label={`${title} Disclaimer`}
    >
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5 opacity-80" aria-hidden="true" />
        <div className="flex-1 min-w-0 leading-relaxed text-sm text-zinc-300">
          <strong className="text-amber-500 font-semibold uppercase tracking-wide">⚠️ {title}</strong> — {content}{' '}
          <Link href="/disclaimers" className="whitespace-nowrap text-amber-500/80 hover:text-amber-400 underline decoration-amber-500/30 transition-colors">
            [Full disclaimers]
          </Link>
        </div>
      </div>
    </aside>
  );
}

export function InlineDisclaimer({ type, className = '' }: { type: 'dosing' | 'pricing' | 'affiliate' | 'coa', className?: string }) {
  let text = '';
  switch (type) {
    case 'dosing':
      text = 'Dosing data from published literature — not a human use recommendation.';
      break;
    case 'pricing':
      text = 'Prices for research peptide acquisition. Not therapeutic products.';
      break;
    case 'affiliate':
      text = 'Research vendor — verify your regional regulations before purchase.';
      break;
    case 'coa':
      text = 'COA documentation reflects research-grade purity verification. Not a certification of safety or efficacy for human use.';
      break;
  }

  return (
    <p className={`text-[11px] text-zinc-500 italic mt-1.5 mb-2 leading-tight ${className}`}>
      * {text}
    </p>
  );
}
