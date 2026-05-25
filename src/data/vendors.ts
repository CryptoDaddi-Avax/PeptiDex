/**
 * Centralized Vendor Registry â€” Single Source of Truth
 * =====================================================
 * Created: 2026-04-30
 * 
 * WHY THIS FILE EXISTS:
 * Previously, vendor data was fragmented across 4 separate files:
 *   - vendor-comparison.ts  (vendorProfiles â€” rating, COA, shipping metadata)
 *   - vendor-pricing.ts     (per-peptide vendor pricing)
 *   - pricing.ts            (legacy pricing data for /tools/pricing)
 *   - affiliates.ts         (Amino Club product URL mapping)
 * 
 * This caused data drift: Limitless Life existed in vendor-comparison.ts
 * but was missing from pricing.ts. Pantheon and LVLUP didn't exist at all.
 * The /vendors page had 100% hardcoded vendor cards, meaning adding a new
 * vendor required editing JSX, not data files.
 * 
 * This file centralizes ALL vendor metadata. The old files are preserved
 * as re-export shims for backward compatibility and will be removed later.
 * 
 * VENDOR LINEUP (as of 2026-04-30):
 *   Injectable:
 *     1. Amino Club          â€” Editor's Choice, 40+ compounds
 *     2. Bio Longevity Labs  â€” Triple-Tested Premium, 80+ compounds
 *     3. Limitless Life      â€” USA Made, 90+ compounds
 *     4. Ascension Peptides  — COA Verified, 60+ compounds [DEACTIVATED 2026-05-24]
 *     5. Pantheon Peptides   â€” COA Verified, 50+ compounds
 *   Oral:
 *     6. LVLUP Health        â€” Oral specialist, 20+ compounds
 */

// â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export type VendorCategory = "injectable" | "oral";
export type BadgeStyle = "gold" | "green" | "premium" | "blue" | "orange";

export interface Vendor {
  /** URL-safe slug: "amino-club", "bio-longevity-labs", etc. */
  slug: string;
  /** Display name */
  name: string;
  /** Short tagline for cards */
  tagline: string;
  /** Badge text: "Editor's Choice", "Triple-Tested", "USA Made", etc. */
  badge: string;
  /** Badge visual style */
  badgeStyle: BadgeStyle;
  /** Sort order (1 = first) */
  sortOrder: number;
  /** Injectable or oral */
  category: VendorCategory;
  /** Full affiliate URL â€” used for all outbound links */
  affiliateUrl: string;
  /** Discount code (if any) */
  discountCode?: string;
  /** Discount percentage (if any) */
  discountPercent?: number;
  /** Whether discount is stackable with site-wide sales */
  discountStackable?: boolean;
  /** Star rating (e.g. 4.9) */
  rating: number;
  /** Review count string (e.g. "400+") */
  ratingCount: string;
  /** Purity claim (e.g. "99%+") */
  purity: string;
  /** COA status string */
  coaStatus: string;
  /** Testing methods array */
  testingMethods: string[];
  /** Shipping speed string */
  shippingSpeed: string;
  /** Shipping cost string */
  shippingCost: string;
  /** Countries shipped to */
  shipsTo: string[];
  /** Catalog size string */
  catalogSize: string;
  /** Payment methods accepted */
  paymentMethods: string[];
  /** Return policy string */
  returnPolicy: string;
  /** Optional editorial note for UI */
  editorialNote?: string;
  /** COA sample URL */
  coaUrl?: string;
  /** Last verified date */
  lastTestedDate?: string;
  /** GA4 tracking key */
  gaKey: string;
  /** URL domain substring for vendorKeyFromUrl matching */
  domainMatch: string;
  /** Finnrick vendor slug for data linking (if available) */
  finnrickSlug?: string;
  /** Verification tier computed from verification-data.ts */
  verificationTier?: "gold" | "silver" | "bronze" | "unverified";
  /** 
   * TODO: Populate this array with the slugs of all compounds this vendor carries.
   * If undefined, the system falls back to assuming the vendor carries the compound.
   */
  compounds?: string[];
  /**
   * When false, vendor is deactivated and excluded from all customer-facing surfaces.
   * Data is preserved for reactivation. Omitting this field defaults to active.
   */
  isActive?: boolean;
}

// â”€â”€ Vendor Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const vendors: Vendor[] = [
  // â”€â”€ #1: Amino Club â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "amino-club",
    name: "Amino Club",
    tagline: "COA-verified research peptides with batch-specific testing",
    badge: "Editor's Choice",
    badgeStyle: "gold",
    sortOrder: 1,
    category: "injectable",
    affiliateUrl: "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=data_layer&code=PEPTIDEX",
    discountCode: "PEPTIDEX",
    discountPercent: 20,
    discountStackable: false,
    rating: 4.9,
    ratingCount: "400+",
    purity: "99%+",
    coaStatus: "Batch-specific COA",
    testingMethods: ["HPLC", "Mass Spec", "Endotoxin"],
    shippingSpeed: "2â€“4 business days (US)",
    shippingCost: "Free over $100",
    shipsTo: ["USA", "International"],
    catalogSize: "40+ compounds",
    paymentMethods: ["Credit Card", "Crypto", "Zelle"],
    returnPolicy: "60-day money-back guarantee",
    coaUrl: "https://aminoclub.com/coa/bpc-157-latest.pdf",
    lastTestedDate: "2026-04-10",
    gaKey: "amino_club",
    domainMatch: "aminoclub.com",
    finnrickSlug: "amino-club",
    verificationTier: "gold",
  },

  // â”€â”€ #2: Bio Longevity Labs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "bio-longevity-labs",
    name: "Bio Longevity Labs",
    tagline: "Triple-tested premium peptides with stackable PEPTIDEX discount",
    badge: "Triple-Tested",
    badgeStyle: "premium",
    sortOrder: 2,
    category: "injectable",
    affiliateUrl: "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
    discountCode: "PEPTIDEX",
    discountPercent: 15,
    discountStackable: true,
    rating: 4.8,
    ratingCount: "350+",
    purity: "99%+",
    coaStatus: "Batch-specific COA",
    testingMethods: ["HPLC", "LC-MS", "Endotoxin"],
    shippingSpeed: "2â€“5 business days (US)",
    shippingCost: "Free over $150",
    shipsTo: ["USA", "International"],
    catalogSize: "80+ compounds",
    paymentMethods: ["Credit Card", "Crypto"],
    returnPolicy: "30-day money-back guarantee",
    editorialNote: "Use code PEPTIDEX for 15% off â€” stacks with any active sale for up to 40%+ savings",
    lastTestedDate: "2026-04-20",
    gaKey: "bio_longevity_labs",
    domainMatch: "biolongevitylabs.com",
    finnrickSlug: "bio-longevity-labs",
    verificationTier: "gold",
  },

  // â”€â”€ #3: Limitless Life â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "limitless-life",
    name: "Limitless Life",
    tagline: "USA-manufactured research peptides with extensive catalog",
    badge: "USA Made",
    badgeStyle: "gold",
    sortOrder: 3,
    category: "injectable",
    affiliateUrl: "https://www.kb6dp3dq.com/PEPTIDEX/",
    discountCode: "PEPTIDEX",
    discountPercent: 15,
    discountStackable: false,
    rating: 4.8,
    ratingCount: "300+",
    purity: "99%+",
    coaStatus: "Batch-specific COA",
    testingMethods: ["HPLC", "LC-MS", "Endotoxin"],
    shippingSpeed: "3â€“5 business days (US)",
    shippingCost: "Free over $100",
    shipsTo: ["USA"],
    catalogSize: "90+ compounds",
    paymentMethods: ["Credit Card", "Crypto"],
    returnPolicy: "Satisfaction guarantee",
    lastTestedDate: "2026-04-01",
    gaKey: "limitless_life",
    domainMatch: "kb6dp3dq.com",
    finnrickSlug: "limitless-life",
    verificationTier: "silver",
  },

  // — #4: Ascension Peptides —————————————————————————————————————————————————————
  {
    // DEACTIVATED 2026-05-24: 10% commission on post-discount basis with 50% customer
    // discount = ~$5 per $100 order. Reactivate only if commission rate is renegotiated.
    isActive: false,
    slug: "ascension-peptides",
    name: "Ascension Peptides",
    tagline: "60+ COA-verified compounds — use code PEPTIDEX for 50% off",
    badge: "COA Verified",
    badgeStyle: "green",
    sortOrder: 4,
    category: "injectable",
    affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/",
    discountCode: "PEPTIDEX",
    discountPercent: 50,
    discountStackable: false,
    rating: 4.7,
    ratingCount: "250+",
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
    gaKey: "ascension",
    domainMatch: "ascensionpeptides.com",
    finnrickSlug: "ascension-peptides",
    verificationTier: "silver",
  },

  // â”€â”€ #5: Pantheon Peptides â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "pantheon-peptides",
    name: "Pantheon Peptides",
    tagline: "Emerging vendor with competitive pricing and COA verification",
    badge: "COA Verified",
    badgeStyle: "green",
    sortOrder: 5,
    category: "injectable",
    affiliateUrl: "https://pantheonpeptides.com/partner/PeptiDex/",
    discountCode: "PEPTIDEX",
    discountPercent: 15,
    discountStackable: false,
    rating: 4.6,
    ratingCount: "150+",
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
    gaKey: "pantheon",
    domainMatch: "pantheonpeptides.com",
    finnrickSlug: "pantheon-peptides",
    verificationTier: "bronze",
  },

  // â”€â”€ #6: LVLUP Health (Oral) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "lvlup-health",
    name: "LVLUP Health",
    tagline: "Specialist in oral peptide formulations and capsules",
    badge: "Oral Specialist",
    badgeStyle: "blue",
    sortOrder: 6,
    category: "oral",
    affiliateUrl: "https://lvluphealth.com/?ref=PEPTIDEX",
    discountCode: "PEPTIDEX",
    discountPercent: 15,
    discountStackable: false,
    rating: 4.5,
    ratingCount: "100+",
    purity: "98%+",
    coaStatus: "COA available",
    testingMethods: ["HPLC", "Mass Spec"],
    shippingSpeed: "3â€“5 business days (US)",
    shippingCost: "Free over $75",
    shipsTo: ["USA"],
    catalogSize: "20+ compounds",
    paymentMethods: ["Credit Card", "Crypto"],
    returnPolicy: "30-day return policy",
    lastTestedDate: "2026-03-15",
    gaKey: "lvlup_health",
    domainMatch: "lvluphealth.com",
    finnrickSlug: "lvlup-health",
    verificationTier: "bronze",
  },
];

// â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/** All ACTIVE vendors sorted by sortOrder */
export const vendorsSorted = [...vendors]
  .filter(v => v.isActive !== false)
  .sort((a, b) => a.sortOrder - b.sortOrder);

/** Injectable vendors only */
export const injectableVendors = vendorsSorted.filter(v => v.category === "injectable");

/** Oral vendors only */
export const oralVendors = vendorsSorted.filter(v => v.category === "oral");

/** Lookup by slug */
export const vendorBySlug: Record<string, Vendor> = Object.fromEntries(
  vendors.map(v => [v.slug, v])
);

/** Lookup by GA key */
export const vendorByGaKey: Record<string, Vendor> = Object.fromEntries(
  vendors.map(v => [v.gaKey, v])
);

/** Total active vendor count */
export const VENDOR_COUNT = vendorsSorted.length;

/** Active injectable vendor count */
export const INJECTABLE_VENDOR_COUNT = injectableVendors.length;

/** All vendors including deactivated — for internal/admin use only */
export const allVendorsIncludingInactive = [...vendors].sort((a, b) => a.sortOrder - b.sortOrder);
