/**
 * InlineCitation — Renders a superscript clickable PMID reference.
 *
 * Usage: <InlineCitation n={1} pmid="12345678" />
 * Renders: <sup><a href="https://pubmed.ncbi.nlm.nih.gov/12345678/" ...>[1]</a></sup>
 *
 * Designed for use in both server and client components.
 */

interface InlineCitationProps {
  /** Display number (1-indexed) */
  n: number;
  /** PubMed ID — numeric string */
  pmid: string;
  /** Optional className override */
  className?: string;
}

export function InlineCitation({ n, pmid, className }: InlineCitationProps) {
  return (
    <sup className={className ?? 'cite-sup'}>
      <a
        href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}
        target="_blank"
        rel="noopener noreferrer"
        title={`PubMed: ${pmid}`}
        className="cite-link"
      >
        [{n}]
      </a>
    </sup>
  );
}

/**
 * InlineCitationGroup — Renders multiple superscript citations inline.
 *
 * Usage: <InlineCitationGroup citations={[{n: 1, pmid: "123"}, {n: 3, pmid: "456"}]} />
 * Renders: <sup>[1,3]</sup>
 */
interface CitationRef {
  n: number;
  pmid: string;
}

export function InlineCitationGroup({ citations, className }: { citations: CitationRef[]; className?: string }) {
  if (citations.length === 0) return null;
  if (citations.length === 1) return <InlineCitation n={citations[0].n} pmid={citations[0].pmid} className={className} />;

  return (
    <sup className={className ?? 'cite-sup'}>
      {citations.map((c, i) => (
        <span key={c.pmid}>
          {i > 0 && ','}
          <a
            href={`https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`}
            target="_blank"
            rel="noopener noreferrer"
            title={`PubMed: ${c.pmid}`}
            className="cite-link"
          >
            {c.n}
          </a>
        </span>
      ))}
    </sup>
  );
}
