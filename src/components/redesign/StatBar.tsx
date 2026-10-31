'use client';

import { SITE_STATS } from '@/data/site-stats';
import './StatBar.css';

/**
 * StatBar — v13 horizontal stat strip below Hero.
 *
 * DATA LAYER:
 *  - Peptide, stack and study counts: SITE_STATS (derived from peptides.ts / stacks.ts)
 *  - COA purity (99%): display constant
 */

const PEPTIDE_COUNT = SITE_STATS.peptides.count;
const STACK_COUNT = SITE_STATS.stacks.count;
const STUDY_COUNT = SITE_STATS.studies.count;

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
          <span className="stat-fig">{STUDY_COUNT}<span className="em">+</span></span>
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
