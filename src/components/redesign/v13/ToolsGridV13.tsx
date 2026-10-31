'use client';

import Link from 'next/link';
import { SITE_STATS } from '@/data/site-stats';
import '../Sections.css';

/**
 * ToolsGridV13 — v13 tools section (§04).
 * 7 light tilt-cards matching v13's reference exactly.
 *
 * All hrefs verified against src/app/tools/ directory:
 *  /tools/cycle-planner ✅, /tools/evidence ✅, /tools/compare ✅,
 *  /tools/pricing ✅, /tools/coa ✅,
 *  /tools/interactions ✅, /tools/pk ✅
 */

const ArrowUpRight = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TOOLS = [
  { name: 'Cycle Planner',           desc: 'Map dosing schedules across a full research cycle.',       href: '/tools/cycle-planner',  index: '01 / 07' },
  { name: 'Evidence Dashboard',      desc: `Browse ${SITE_STATS.studies.count}+ studies by peptide, goal, and outcome.`, href: '/tools/evidence',       index: '02 / 07' },
  { name: 'Peptide Comparison',      desc: 'Compare mechanisms, dosing, and evidence side-by-side.',   href: '/tools/compare',        index: '03 / 07' },
  { name: 'Price Comparison',        desc: 'Track vendor pricing per mg across verified sources.',     href: '/tools/pricing',        index: '04 / 07' },
  { name: 'COA Analyzer',            desc: 'Read and validate certificates of analysis.',              href: '/tools/coa',            index: '05 / 07' },
  { name: 'Interaction Checker',     desc: 'Flag known peptide–peptide interactions.',                 href: '/tools/interactions',   index: '06 / 07' },
  { name: 'PK Plasma Curves',        desc: 'Model plasma concentration over time.',                   href: '/tools/pk',             index: '07 / 07' },
];

export default function ToolsGridV13() {
  return (
    <section className="sec" id="tools" aria-label="Research tools">
      <div className="sec-inner">
        <header className="sec-head">
          <div className="section-rule fade-up" aria-hidden="true">
            <span className="rule-line" />
            <span className="rule-mark">§<span className="num">04</span></span>
            <span className="rule-line" />
          </div>
          <p className="sec-eyebrow fade-up" style={{ '--delay': '60ms' } as React.CSSProperties}>TOOLS</p>
          <h2 className="sec-h2 fade-up" style={{ '--delay': '140ms' } as React.CSSProperties}>
            Research <span className="em">tools</span>.
          </h2>
          <p className="sec-sub fade-up" style={{ '--delay': '240ms' } as React.CSSProperties}>
            Seven free, interactive tools — from cycle planning to plasma curves. No account required.
          </p>
        </header>

        <div className="tools-grid stagger-children">
          {TOOLS.map((tool) => (
            <div className="tool-cell" key={tool.href}>
              <Link className="tool-card" href={tool.href}>
                <div className="tool-head">
                  <span className="tool-name">{tool.name}</span>
                  <span className="tool-arrow"><ArrowUpRight /></span>
                </div>
                <p className="tool-desc">{tool.desc}</p>
                <span className="tool-index">{tool.index}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
