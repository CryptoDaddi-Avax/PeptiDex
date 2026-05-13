export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PeptiDex",
    "alternateName": ["PeptiDex Research Index", "peptidex.app"],
    "url": "https://peptidex.app",
    "description": "PeptiDex is the independent peptide research index — peptide profiles, evidence-based stacks, free reconstitution & cycle-planning tools, and COA verification.",
    "logo": {
      "@type": "ImageObject",
      "url": "https://peptidex.app/logo.png",
      "width": 512,
      "height": 512
    },
    // TODO: Populate with real social profiles before launch
    "sameAs": []
  };
}
