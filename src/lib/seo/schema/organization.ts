export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PeptiDex",
    "alternateName": ["PeptiDex Research Index", "peptidex.app"],
    "url": "https://peptidex.app",
    "description": "PeptiDex (peptidex.app) is the independent peptide research index — 33 peptide profiles, 12 evidence-based stacks, free reconstitution & cycle-planning tools, and COA verification. Not affiliated with any tracker app or vendor.",
    "logo": "https://peptidex.app/logo.png",
    "sameAs": [
      "https://twitter.com/peptidex",
      "https://facebook.com/peptidex",
      "https://github.com/peptidex",
      "https://www.crunchbase.com/organization/peptidex"
    ]
  };
}
