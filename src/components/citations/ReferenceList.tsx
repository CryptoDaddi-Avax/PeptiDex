/**
 * ReferenceList — Numbered references section at the bottom of a profile page.
 *
 * Renders all cited PMIDs as a numbered list with study titles,
 * authors, journal, and year from the verified PMID registry.
 *
 * Server-rendered — all data comes from the peptide's key_studies[].
 */

import type { Study } from '@/data/types';

export interface ReferenceEntry {
  /** 1-indexed citation number */
  n: number;
  /** PubMed ID */
  pmid: string;
  /** Study title from key_studies[] */
  title: string;
  /** Evidence level badge */
  evidenceLevel: string;
}

interface ReferenceListProps {
  /** Ordered list of cited references */
  references: ReferenceEntry[];
  /** Optional: last reviewed ISO date */
  lastReviewed?: string;
}

const EVIDENCE_LABELS: Record<string, string> = {
  'very-strong': 'Very Strong',
  'strong': 'Strong',
  'moderate-strong': 'Moderate-Strong',
  'moderate': 'Moderate',
  'preclinical': 'Preclinical',
  'emerging': 'Emerging',
  'anecdotal': 'Anecdotal',
};

export function ReferenceList({ references, lastReviewed }: ReferenceListProps) {
  if (references.length === 0) return null;

  return (
    <section className="pd-references" id="references" aria-labelledby="references-heading">
      <div className="pd-references-header">
        <h2 id="references-heading" className="pd-references-title">
          References
        </h2>
        <span className="pd-references-count">
          {references.length} cited source{references.length !== 1 ? 's' : ''}
        </span>
      </div>

      {lastReviewed && (
        <p className="pd-references-reviewed">
          Last reviewed: <time dateTime={lastReviewed}>
            {new Date(lastReviewed).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </p>
      )}

      <ol className="pd-references-list">
        {references.map((ref) => (
          <li key={ref.pmid} id={`ref-${ref.n}`} className="pd-reference-item">
            <a
              href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-reference-link"
            >
              {ref.title}
            </a>
            <span className="pd-reference-meta">
              PMID: {ref.pmid}
              {ref.evidenceLevel && (
                <span className={`pd-reference-badge ev-${ref.evidenceLevel}`}>
                  {EVIDENCE_LABELS[ref.evidenceLevel] || ref.evidenceLevel}
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>

      <p className="pd-references-note">
        All citations link to PubMed (National Library of Medicine). PMIDs are verified weekly
        via our <a href="/about/methodology#citation-audit">automated audit system</a>.
      </p>
    </section>
  );
}

/**
 * Helper: Build ReferenceEntry[] from a peptide's key_studies and a set of cited PMIDs.
 * Only includes studies that were actually cited inline.
 */
export function buildReferenceList(
  studies: Study[],
  citedPmids: Set<string>
): ReferenceEntry[] {
  const refs: ReferenceEntry[] = [];
  let n = 1;

  for (const study of studies) {
    const pmid = extractPmid(study.pubmed_url);
    if (pmid && citedPmids.has(pmid)) {
      refs.push({
        n: n++,
        pmid,
        title: study.title,
        evidenceLevel: study.evidence_level,
      });
    }
  }

  return refs;
}

/** Extract numeric PMID from a pubmed_url */
function extractPmid(url: string): string | null {
  const m = url.match(/\/(\d+)\/?$/);
  return m ? m[1] : null;
}
