'use client';

import { peptides } from '@/data/peptides';
import { stacks } from '@/data/stacks';
import './StatBar.css';

/**
 * StatBar — v13 horizontal stat strip below Hero.
 *
 * DATA LAYER:
 *  - Peptide count: sourced from peptides.ts length
 *  - Stack count: sourced from stacks.ts length
 *  - Study count (668+): display constant (aggregate, not from data layer)
 *  - COA purity (99%): display constant
 */

const PEPTIDE_COUNT = peptides.length;
const STACK_COUNT = stacks.length;

export default function StatBar() {
  return (
    <section className="stat-bar" aria-label="PeptiDex at a glance">
      <div className="stat-bar-inner stagger-children">
        <div className="stat-cell">
          <span className="stat-fig">{PEPTIDE_COUNT}<span className="em">+</span></span>
          <span className="stat-label">Research Peptides</span>
        </div>
        <div className="stat-cell">
          <span className="stat-fig">{STACK_COUNT}</span>
          <span className="stat-label">Curated Stacks</span>
        </div>
        <div className="stat-cell">
          <span className="stat-fig">668<span className="em">+</span></span>
          <span className="stat-label">Peer-Reviewed Studies</span>
        </div>
        <div className="stat-cell">
          <span className="stat-fig">99<span className="em">%</span></span>
          <span className="stat-label">COA Purity Threshold</span>
        </div>
      </div>
    </section>
  );
}
