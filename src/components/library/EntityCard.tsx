/**
 * EntityCard — Structured fact block for AI extraction.
 * 
 * Renders as a visible, compact data card above the H1.
 * Styled to match peptidex.app's tactical/dashboard aesthetic:
 * monospace values, dense layout, muted labels, accent on BEST PRICE row.
 */

import type { EntityCardData } from '@/data/entity-cards';

interface EntityCardProps {
  data: EntityCardData;
  peptideSlug: string;
}

function Row({ label, value, accent, secondary }: { label: string; value: string; accent?: boolean; secondary?: boolean }) {
  const cls = accent ? ' ec-row-accent' : secondary ? ' ec-row-secondary' : '';
  return (
    <div className={`ec-row${cls}`}>
      <span className="ec-label">{label}</span>
      <span className="ec-value">{value}</span>
    </div>
  );
}

export function EntityCard({ data, peptideSlug }: EntityCardProps) {
  return (
    <div className="ec-card" role="region" aria-label={`${data.compound} entity summary`}>
      <Row label="COMPOUND" value={data.compound} />
      <Row label="ALIAS" value={data.alias} />
      <Row label="CLASS" value={data.className} />
      {data.developer && <Row label="DEVELOPER" value={data.developer} />}
      {data.trialStatus && <Row label="TRIAL STATUS" value={data.trialStatus} />}
      <Row label="HALF-LIFE" value={data.halfLife} />
      {data.molecularWeight && <Row label="MW" value={data.molecularWeight} />}
      <Row label="FDA STATUS" value={data.fdaStatus} />
      {data.bestPrice && <Row label="BEST PRICE" value={data.bestPrice} accent />}
      <Row label="LAST VERIFIED" value={data.lastVerified} secondary />
    </div>
  );
}

/** Build a DefinedTerm JSON-LD schema from EntityCardData */
export function buildEntityCardSchema(data: EntityCardData, slug: string): Record<string, unknown> {
  const properties: Record<string, unknown>[] = [];

  if (data.molecularWeight) {
    properties.push({ '@type': 'PropertyValue', name: 'molecularWeight', value: data.molecularWeight });
  }
  if (data.halfLife) {
    properties.push({ '@type': 'PropertyValue', name: 'halfLife', value: data.halfLife });
  }
  if (data.developer) {
    properties.push({ '@type': 'PropertyValue', name: 'developer', value: data.developer });
  }
  if (data.trialStatus) {
    properties.push({ '@type': 'PropertyValue', name: 'trialStatus', value: data.trialStatus });
  }
  properties.push({ '@type': 'PropertyValue', name: 'fdaStatus', value: data.fdaStatus });

  if (data.bestPrice) {
    properties.push({ '@type': 'PropertyValue', name: 'bestVerifiedPrice', value: data.bestPrice });
  }
  if (data.bestPriceVendor) {
    properties.push({ '@type': 'PropertyValue', name: 'priceSource', value: `${data.bestPriceVendor} with code PEPTIDEX` });
  }
  properties.push({ '@type': 'PropertyValue', name: 'lastVerified', value: data.lastVerified });

  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `https://peptidex.app/library/${slug}#entity`,
    name: data.compound,
    alternateName: data.alias,
    description: `${data.compound} — ${data.className}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'PeptiDex Research Peptide Index',
    },
    ...(data.termCode ? { termCode: data.termCode } : {}),
    additionalProperty: properties,
  };
}
