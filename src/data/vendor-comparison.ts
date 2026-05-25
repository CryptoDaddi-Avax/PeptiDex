/**
 * @deprecated â€” Use `/data/vendors.ts` instead.
 * This file is preserved as a backward-compatible re-export shim.
 * It will be removed once all imports are migrated to the centralized vendor registry.
 * Migration date: 2026-04-30
 */

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
    affiliateUrl: "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=data_layer&code=PEPTIDEX",
    purity: "99%+",
    coaStatus: "Batch-specific COA",
    testingMethods: ["HPLC", "Mass Spec", "Endotoxin"],
    shippingSpeed: "2â€“4 business days (US)",
    shippingCost: "Free over $100",
    shipsTo: ["USA", "International"],
    catalogSize: "40+ compounds",
    paymentMethods: ["Credit Card", "Crypto", "Zelle"],
    returnPolicy: "60-day money-back guarantee",
    badge: "Editor's Choice",
    coaUrl: "https://aminoclub.com/coa/bpc-157-latest.pdf",
    lastTestedDate: "2026-04-10",
  },
  // DEACTIVATED 2026-05-24
  "ascension-peptides": {
    slug: "ascension-peptides",
    name: "Ascension Peptides",
    rating: 4.7,
    ratingCount: "250+",
    affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/",
    purity: "98%+",
    coaStatus: "COA available",
    testingMethods: ["HPLC", "Mass Spec"],
    shippingSpeed: "3â€“5 business days (US)",
    shippingCost: "Free over $150",
    shipsTo: ["USA"],
    catalogSize: "60+ compounds",
    paymentMethods: ["Credit Card", "Crypto"],
    returnPolicy: "30-day return policy",
    coaUrl: "https://ascensionpeptides.com/coa/bpc157.pdf",
    lastTestedDate: "2026-03-24",
  },
  "limitless-life": {
    slug: "limitless-life",
    name: "Limitless Life",
    rating: 4.8,
    ratingCount: "300+",
    affiliateUrl: "https://www.kb6dp3dq.com/PEPTIDEX/",
    purity: "99%+",
    coaStatus: "Batch-specific COA",
    testingMethods: ["HPLC", "LC-MS", "Endotoxin"],
    shippingSpeed: "3â€“5 business days (US)",
    shippingCost: "Free over $100",
    shipsTo: ["USA"],
    catalogSize: "90+ compounds",
    paymentMethods: ["Credit Card", "Crypto"],
    returnPolicy: "Satisfaction guarantee",
    badge: "USA Made",
    lastTestedDate: "2026-04-01",
  },
  "bio-longevity-labs": {
    slug: "bio-longevity-labs",
    name: "Bio Longevity Labs",
    rating: 4.8,
    ratingCount: "350+",
    affiliateUrl: "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
    purity: "99%+",
    coaStatus: "Batch-specific COA",
    testingMethods: ["HPLC", "LC-MS", "Endotoxin"],
    shippingSpeed: "2â€“5 business days (US)",
    shippingCost: "Free over $150",
    shipsTo: ["USA", "International"],
    catalogSize: "80+ compounds",
    paymentMethods: ["Credit Card", "Crypto"],
    returnPolicy: "30-day money-back guarantee",
    badge: "Triple-Tested",
    lastTestedDate: "2026-04-20",
  },
  "pantheon-peptides": {
    slug: "pantheon-peptides",
    name: "Pantheon Peptides",
    rating: 4.6,
    ratingCount: "150+",
    affiliateUrl: "https://pantheonpeptides.com/partner/PeptiDex/",
    purity: "98%+",
    coaStatus: "COA available",
    testingMethods: ["HPLC", "Mass Spec"],
    shippingSpeed: "3â€“5 business days (US)",
    shippingCost: "Free over $100",
    shipsTo: ["USA"],
    catalogSize: "50+ compounds",
    paymentMethods: ["Credit Card", "Crypto"],
    returnPolicy: "30-day return policy",
    lastTestedDate: "2026-04-05",
  },
  "lvlup-health": {
    slug: "lvlup-health",
    name: "LVLUP Health",
    rating: 4.5,
    ratingCount: "100+",
    affiliateUrl: "https://lvluphealth.com/?ref=PEPTIDEX",
    purity: "98%+",
    coaStatus: "COA available",
    testingMethods: ["HPLC", "Mass Spec"],
    shippingSpeed: "3â€“5 business days (US)",
    shippingCost: "Free over $75",
    shipsTo: ["USA"],
    catalogSize: "20+ compounds",
    paymentMethods: ["Credit Card", "Crypto"],
    returnPolicy: "30-day return policy",
    badge: "Oral Specialist",
    lastTestedDate: "2026-03-15",
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
  "amino-club-vs-limitless-life",
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

