'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Peptide, EvidenceLevel } from '@/data/types';
import './PeptideCardRedesign.css';

/* ── Evidence-level helpers ── */

const EVIDENCE_RANK: Record<EvidenceLevel, number> = {
  'very-strong': 5,
  'strong': 4,
  'moderate-strong': 3,
  'moderate': 2,
  'preclinical': 1,
  'emerging': 0,
  'anecdotal': -1,
};

const EVIDENCE_LABEL: Record<EvidenceLevel, string> = {
  'very-strong': 'Phase III',
  'strong': 'Phase II–III',
  'moderate-strong': 'Phase II',
  'moderate': 'Clinical',
  'preclinical': 'Preclinical',
  'emerging': 'Emerging',
  'anecdotal': 'Anecdotal',
};

function topEvidence(peptide: Peptide): EvidenceLevel {
  if (!peptide.key_studies?.length) return 'emerging';
  return peptide.key_studies.reduce<EvidenceLevel>(
    (best, study) =>
      (EVIDENCE_RANK[study.evidence_level] ?? 0) > (EVIDENCE_RANK[best] ?? 0)
        ? study.evidence_level
        : best,
    peptide.key_studies[0].evidence_level,
  );
}

function formatHalfLife(hours: number | undefined): string | null {
  if (hours === undefined || hours === null) return null;
  if (hours < 1) return `${Math.round(hours * 60)}min`;
  if (hours >= 168) return `${Math.round(hours / 24)}d`;
  if (hours >= 24) return `${(hours / 24).toFixed(1).replace(/\.0$/, '')}d`;
  return `${hours}h`;
}

/* ── Component ── */

interface PeptideCardRedesignProps {
  peptide: Peptide;
  index?: number;
}

export default function PeptideCardRedesign({ peptide }: PeptideCardRedesignProps) {
  const benefits = peptide.primary_benefits
    .split(',')
    .map((b) => b.trim())
    .filter(Boolean)
    .slice(0, 2);

  const evidence = topEvidence(peptide);
  const halfLife = formatHalfLife(peptide.half_life_hours);

  return (
    <Link href={`/library/${peptide.slug}`} className="peptide-card-r">
      {/* Category */}
      <div className="pcr-category">
        {peptide.category_icon && (
          <span className="pcr-category-icon">{peptide.category_icon}</span>
        )}
        <span>{peptide.category}</span>
      </div>

      {/* Name */}
      <h3 className="pcr-name">{peptide.name}</h3>

      {/* Benefits */}
      <div className="pcr-benefits">
        {benefits.map((b, i) => (
          <div key={i} className="pcr-benefit-row">
            <span className="pcr-benefit-dot">●</span>
            <span>{b}</span>
          </div>
        ))}
      </div>

      {/* Footer: badges + arrow */}
      <div className="pcr-footer">
        {peptide.is_fda_approved && (
          <span className="pcr-badge pcr-badge-fda">✓ FDA</span>
        )}
        <span className="pcr-badge pcr-badge-evidence">
          {EVIDENCE_LABEL[evidence]}
        </span>
        {halfLife && (
          <span className="pcr-badge pcr-badge-halflife">t½ {halfLife}</span>
        )}
        <ArrowRight className="pcr-arrow" />
      </div>
    </Link>
  );
}
