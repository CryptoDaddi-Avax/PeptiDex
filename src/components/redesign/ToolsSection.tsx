'use client';
import Link from 'next/link';
import { SITE_STATS } from '@/data/site-stats';
import {
  ShoppingCart, GitCompare, Calculator, ShieldCheck,
  BarChart3, DollarSign, Activity, TrendingDown,
  Timer, ShieldAlert, ArrowRight
} from 'lucide-react';
import './ToolsSection.css';

const featuredTools = [
  {
    href: '/tools/cycle-planner',
    icon: ShoppingCart,
    title: 'Cycle Planner',
    description: 'Plan your full cycle — vial counts, dosing schedules, and vendor sourcing.',
    badge: 'POPULAR',
  },
  {
    href: '/tools/evidence',
    icon: BarChart3,
    title: 'Evidence Dashboard',
    description: `${SITE_STATS.peptides.count} peptides ranked by strength of clinical evidence with study counts.`,
  },
  {
    href: '/tools/compare',
    icon: GitCompare,
    title: 'Peptide Comparison',
    description: 'Compare 2–3 peptides side-by-side across mechanisms, dosing, and safety.',
  },
  {
    href: '/tools/pricing',
    icon: DollarSign,
    title: 'Price Comparison',
    description: 'Cross-vendor pricing: cost per vial, per dose, and PEPTIDEX discount math.',
  },
  {
    href: '/tools/calculator',
    icon: Calculator,
    title: 'Reconstitution Calculator',
    description: 'BAC water volumes, concentration math, and syringe-unit conversions.',
  },
  {
    href: '/tools/coa',
    icon: ShieldCheck,
    title: 'COA Analyzer',
    description: 'Verify any Certificate of Analysis — MW and purity checked against lab refs.',
  },
  {
    href: '/tools/interactions',
    icon: ShieldAlert,
    title: 'Interaction Checker',
    description: 'Check synergies, cautions, and contraindications between your selections.',
  },
  {
    href: '/tools/pk',
    icon: TrendingDown,
    title: 'PK Plasma Curves',
    description: 'Visualize pharmacokinetic plasma concentration curves and half-life decay.',
  },
];

export default function ToolsSection() {
  return (
    <section className="tools-home-section" id="tools">
      <div className="tools-home-head">
        <div className="section-label">§ Tools</div>
        <h2 className="section-title">
          Research<br /><em>tools</em>.
        </h2>
        <p className="tools-home-sub">
          Free interactive tools for peptide research, dosing, and comparison.
        </p>
      </div>
      <div className="tools-home-grid">
        {featuredTools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="tool-home-card">
            {tool.badge && <div className="tool-home-badge">{tool.badge}</div>}
            <div className="tool-home-icon">
              <tool.icon />
            </div>
            <div className="tool-home-text">
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
            </div>
            <div className="tool-home-arrow">
              <ArrowRight />
            </div>
          </Link>
        ))}
      </div>
      <div className="tools-home-cta-row">
        <Link href="/tools" className="btn-primary">
          <span>View all tools</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
