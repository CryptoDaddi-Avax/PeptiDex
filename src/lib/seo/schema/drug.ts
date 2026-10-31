export function buildDrugSchema({
  name,
  alternateName,
  description,
  mechanismOfAction,
  clinicalPharmacology
}: {
  name: string;
  alternateName?: string[];
  description: string;
  mechanismOfAction: string;
  clinicalPharmacology?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Drug",
    "name": name,
    "alternativeHeadline": "Research Compound Reference - Not for Human Use",
    "alternateName": alternateName,
    "description": description,
    "mechanismOfAction": mechanismOfAction,
    "clinicalPharmacology": clinicalPharmacology,
    "legalStatus": "Research chemical, not approved for human use"
  };
}
