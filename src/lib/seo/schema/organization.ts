export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PEPTIDEX",
    "alternateName": ["peptidex.app", "PEPTIDEX Research Hub"],
    "url": "https://peptidex.app",
    "description": "PeptiDex is the independent peptide research index — peptide profiles, evidence-based stacks, free reconstitution & cycle-planning tools, and COA verification.",
    "logo": {
      "@type": "ImageObject",
      "url": "https://peptidex.app/logo.png",
      "width": 512,
      "height": 512
    },
    "founder": {
      "@type": "Person",
      "name": "The Crypto Daddi",
      "url": "https://peptidex.app/authors/the-crypto-daddi",
      "sameAs": ["https://x.com/TheCryptoDaddi"]
    },
    "sameAs": [
      "https://x.com/TheCryptoDaddi",
      "https://peptidex.app"
    ],
    "knowsAbout": [
      "Peptide Research",
      "Pharmacokinetics",
      "Reconstitution Mathematics",
      "BPC-157",
      "TB-500",
      "Semaglutide",
      "Tirzepatide",
      "Retatrutide",
      "GHK-Cu",
      "CJC-1295",
      "Ipamorelin",
      "Thymosin Alpha-1"
    ]
  };
}
