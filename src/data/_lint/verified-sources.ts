/**
 * Verified Sources Registry
 *
 * Unified registry for all verified authoritative sources used in
 * site-wide claims. Supports both PMID-based academic sources and
 * non-PMID authoritative sources (FDA labels, EMA filings, manufacturer
 * documentation, prescribing information).
 *
 * Usage: Import this registry when validating citations in content,
 * advisor responses, or homepage preview copy.
 */

export type SourceType = 'pmid' | 'fda_label' | 'ema_filing' | 'manufacturer' | 'regulatory' | 'other';

export interface VerifiedSource {
  /** Unique identifier — PMID number for academic, descriptive slug for non-PMID */
  id: string;
  /** Source classification */
  type: SourceType;
  /** Author(s) or issuing body */
  authors: string;
  /** Document title or label name */
  title: string;
  /** Journal name (academic) or regulatory body (non-academic) */
  journal: string;
  /** Publication or approval year */
  year: number;
  /** Direct URL to source (PubMed link, FDA label PDF, etc.) */
  url?: string;
  /** ISO date when this source was verified against the original document */
  verified_date: string;
  /** Who performed the verification */
  verified_by: string;
  /** Specific claim(s) this source supports in PeptiDex content */
  supports_claims?: string[];
}

export const verifiedSources: VerifiedSource[] = [
  // ── Non-PMID Authoritative Sources ──────────────────────────────────

  {
    id: 'egrifta-pi-2023',
    type: 'fda_label',
    authors: 'Theratechnologies Inc.',
    title: 'EGRIFTA SV (tesamorelin for injection) — Prescribing Information',
    journal: 'U.S. Food and Drug Administration',
    year: 2023,
    url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/022505s018lbl.pdf',
    verified_date: '2026-05-17',
    verified_by: 'Antigravity/Operator',
    supports_claims: [
      'Tesamorelin plasma half-life ~26 minutes under repeated dosing',
      'Subcutaneous administration once daily',
      'Bioavailability <4%',
    ],
  },
];
