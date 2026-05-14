'use client';

/**
 * ResearchNotesBlock — First-Person E-E-A-T Content Block
 * 
 * Renders the E-E-A-T research notes with:
 * - First-person prose paragraphs
 * - Linked COA references (if hosted PDF exists)
 * - Inline affiliate disclosure
 * - Last-verified timestamp
 * - Optional pending-data note
 */

import { eeatNotes } from '@/data/eeat-notes';
import { getBestCOAForPeptide, hasHostedCOA, getCOAsForPeptide } from '@/data/verification-assets';
import '@/components/library/entity-research.css';

interface ResearchNotesBlockProps {
  peptideSlug: string;
  peptideName: string;
}

export function ResearchNotesBlock({ peptideSlug, peptideName }: ResearchNotesBlockProps) {
  const note = eeatNotes[peptideSlug];
  if (!note) return null;

  const bestCOA = getBestCOAForPeptide(peptideSlug);
  const coaHosted = hasHostedCOA(peptideSlug);
  const allCOAs = getCOAsForPeptide(peptideSlug);

  return (
    <section className="rn-block" id="research-notes" aria-label={`Research notes on ${peptideName}`}>
      {note.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      {/* COA link button — only render if we have a hosted PDF */}
      {coaHosted && bestCOA?.coaPdfPath && (
        <a
          href={bestCOA.coaPdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="rn-coa-link"
        >
          📄 View COA: {bestCOA.batchId} ({bestCOA.purity}% HPLC, {bestCOA.molecularWeight})
        </a>
      )}

      {/* Non-hosted COA reference — show batch info without link */}
      {!coaHosted && bestCOA && (
        <div className="rn-coa-link" style={{ cursor: 'default', opacity: 0.7 }}>
          🔬 Verified: {bestCOA.batchId} — {bestCOA.purity}% HPLC, {bestCOA.molecularWeight} ({bestCOA.lab})
        </div>
      )}

      {/* Affiliate disclosure */}
      <div className="rn-disclosure">
        {note.disclosure}
      </div>

      {/* Timestamp */}
      <div className="rn-timestamp">
        Last verified: {note.lastVerified}.
        {note.pendingNote && ` ${note.pendingNote}`}
      </div>
    </section>
  );
}
