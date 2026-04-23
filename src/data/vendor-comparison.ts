/**
 * Vendor-level metadata for /compare/vendor comparisons.
 * Keyed by URL-safe slug. All data is editorial / hand-curated.
 */

export interface VendorProfile {
  slug: string;
  name: string;
  rating: number;
  ratingCount: string;
  affiliateUrl: string;
  purity: string;
  coaStatus: "Batch-specific COA" | "COA available" | "No COA";
  testingMethods: string[];
  shippingSpeed: string;
  shippingCost: string;
  shipsTo: string[];
  catalogSize: string;
  paymentMethods: string[];
  returnPolicy: string;
  badge?: string;
  coaUrl?: string;
  lastTestedDate?: string;
}

export const vendorProfiles: Record<string, VendorProfile> = {
  "amino-club": {
    slug: "amino-club",
    name: "Amino Club",
    rating: 4.9,
    ratingCount: "400+",
    affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
    purity: "99%+",
    coaStatus: "Batch-specific COA",
    testingMethods: ["HPLC", "Mass Spec", "Endotoxin"],
    shippingSpeed: "2–4 business days (US)",
    shippingCost: "Free over $100",
    shipsTo: ["USA", "International"],
    catalogSize: "40+ compounds",
    paymentMethods: ["Credit Card", "Crypto", "Zelle"],
    returnPolicy: "60-day money-back guarantee",
    badge: "Editor's Choice",
    coaUrl: "https://aminoclub.com/coa/bpc-157-latest.pdf",
    lastTestedDate: "2026-04-10",
  },
  "ascension-peptides": {
    slug: "ascension-peptides",
    name: "Ascension Peptides",
    rating: 4.7,
    ratingCount: "250+",
    affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/",
    purity: "98%+",
    coaStatus: "COA available",
    testingMethods: ["HPLC", "Mass Spec"],
    shippingSpeed: "3–5 business days (US)",
    shippingCost: "Free over $150",
    shipsTo: ["USA"],
    catalogSize: "60+ compounds",
    paymentMethods: ["Credit Card", "Crypto"],
    returnPolicy: "30-day return policy",
    coaUrl: "https://ascensionpeptides.com/coa/bpc157.pdf",
    lastTestedDate: "2026-03-24",
  },
};

/** The top peptides used for head-to-head price comparison tables. */
export const TOP_COMPARISON_PEPTIDES = [
  "BPC-157",
  "TB-500",
  "Ipamorelin",
  "Tesamorelin",
  "GHK-Cu",
] as const;

/**
 * All valid vendor comparison slugs. The route is always alphabetical:
 * /compare/vendors/amino-club-vs-ascension-peptides
 */
export const VALID_VENDOR_COMPARISONS = [
  "amino-club-vs-ascension-peptides",
] as const;

export function getVendorPair(slug: string): [VendorProfile, VendorProfile] | null {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;

  // Handle multi-word slugs: "amino-club" vs "ascension-peptides"
  // The slug format is "amino-club-vs-ascension-peptides"
  const vsIndex = slug.indexOf("-vs-");
  if (vsIndex === -1) return null;

  const slugA = slug.substring(0, vsIndex);
  const slugB = slug.substring(vsIndex + 4);

  const a = vendorProfiles[slugA];
  const b = vendorProfiles[slugB];

  if (!a || !b) return null;
  return [a, b];
}
