/**
 * QuickAnswerBlock — 40-60 word structured prose block for LLM/GEO extraction.
 * Wraps in <p class="quick-answer"> for schema targeting.
 * Uses lead-block overrides for the top 15 pages; falls back to auto-generated.
 */

import type { Peptide } from '@/data/types';
import { leadBlockOverrides } from '@/data/lead-blocks';

function formatHalfLife(hours: number | undefined): string {
  if (!hours) return 'not established';
  if (hours < 1) return `${Math.round(hours * 60)} minutes`;
  if (hours >= 168) return `${Math.round(hours / 24)} days`;
  if (hours >= 24) return `${(hours / 24).toFixed(1).replace(/\.0$/, '')} days`;
  return `${hours} hours`;
}

export function QuickAnswerBlock({ peptide }: { peptide: Peptide }) {
  // Check for hand-tuned lead block override first
  const override = leadBlockOverrides[peptide.slug];

  if (override) {
    return (
      <div className="pd-quick-answer-wrap">
        <span className="pd-quick-answer-label">Quick Answer</span>
        <p className="quick-answer pd-quick-answer-text">{override.text}</p>
      </div>
    );
  }

  // Fallback: auto-generated for non-priority peptides
  const halfLife = formatHalfLife(peptide.half_life_hours);
  const fdaStatus = peptide.is_fda_approved
    ? 'FDA-approved'
    : 'research compound (not FDA-approved for human use)';
  const primaryBenefit = peptide.primary_benefits.split(',')[0].trim().toLowerCase();

  const summary =
    `${peptide.name} is a ${peptide.category.toLowerCase()} ${fdaStatus} studied for ${primaryBenefit}. ` +
    `${peptide.laypersonSummary ? peptide.laypersonSummary + ' ' : ''}` +
    `Half-life: ${halfLife}. ` +
    `Available from COA-verified vendors with code PEPTIDEX for up to 20% off.`;

  return (
    <div className="pd-quick-answer-wrap">
      <span className="pd-quick-answer-label">Quick Answer</span>
      <p className="quick-answer pd-quick-answer-text">{summary}</p>
    </div>
  );
}
