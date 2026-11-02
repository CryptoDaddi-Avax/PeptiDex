/**
 * Centralized Vendor Registry — Single Source of Truth
 * =====================================================
 * Created: 2026-04-30
 *
 * WHY THIS FILE EXISTS:
 * Previously, vendor data was fragmented across 4 separate files:
 *   - vendor-comparison.ts  (vendorProfiles — COA, shipping metadata)
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
 * VENDOR ORDER is computed, never hand-set: sortOrder comes from the published
 * ranking criteria in src/lib/vendor-criteria.ts (injectable first, then oral;
 * highest score first). Ascension Peptides is deactivated (2026-05-24).
 */

import { scoreVendors, type VendorCriteriaScore } from "@/lib/vendor-criteria";

// ── Types ─────────────────────────────────────────────────────────────────────

export type VendorCategory = "injectable" | "oral";
export type BadgeStyle = "gold" | "green" | "premium" | "blue" | "orange";

export interface ThirdPartyRating {
  platform: string;
  rating: number;
  reviewCount: number;
  url: string;
  /** YYYY-MM-DD the figure was read from the platform */
  checked: string;
}

export interface Vendor {
  /** URL-safe slug: "amino-club", "bio-longevity-labs", etc. */
  slug: string;
  /** Display name */
  name: string;
  /** Short tagline for cards */
  tagline: string;
  /** Badge text: "Founder's store", "Triple-Tested", "USA Made", etc. Never a rank claim. */
  badge: string;
  /** Badge visual style */
  badgeStyle: BadgeStyle;
  /** Rank on the published criteria (1 = first). Computed — see rankVendors(). */
  sortOrder: number;
  /** Score on the published ranking criteria. Computed — see rankVendors(). */
  criteria: VendorCriteriaScore;
  /** Injectable or oral */
  category: VendorCategory;
  /** Full affiliate URL — used for all outbound links */
  affiliateUrl: string;
  /** Discount code (if any) */
  discountCode?: string;
  /** Discount percentage (if any) */
  discountPercent?: number;
  /** Whether discount is stackable with site-wide sales */
  discountStackable?: boolean;
  /**
   * Rating from a public third-party review platform. Only set when the figure
   * was read from the platform itself — never an estimate or our own score.
   */
  thirdPartyRating?: ThirdPartyRating;
  /** Independent lab the vendor states issues its COAs (the vendor's claim) */
  thirdPartyLab?: string;
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
  /**
   * Owned by PeptiDex's founder (material connection). Every placement of this
   * vendor must render <FounderOwnershipDisclosure />.
   */
  ownedByFounder?: boolean;
}

type VendorInput = Omit<Vendor, "sortOrder" | "criteria">;

// ── Vendor Data ──────────────────────────────────────────────────────────────
// Display order is computed by rankVendors() below, not by position here.

const vendorInputs: VendorInput[] = [
  // ── Elyria Bio (owned by PeptiDex's founder) ───────────────────────────────
  {
    slug: "elyria-bio",
    name: "Elyria Bio",
    tagline: "Lyophilized research-grade peptides — ≥99% HPLC purity floor, third-party COA, lot-traceable",
    badge: "Founder's store",
    badgeStyle: "blue",
    category: "injectable",
    affiliateUrl: "https://elyriabio.com?ref=PEPTIDEX",
    discountCode: "PEPTIDEX",
    discountPercent: 10,
    discountStackable: false,
    purity: "99%+",
    coaStatus: "Batch-specific COA",
    // Per elyriabio.com/company/laboratories.html: identity by HPLC retention time
    // vs reference standard (ILS) or FTIR (BTLabs) — not mass spec. Endotoxin on all
    // 13 released lots (confirmed by the owner 2026-11-02).
    testingMethods: ["HPLC", "FTIR", "Endotoxin"],
    shippingSpeed: "Ships within ~48 hours",
    shippingCost: "Free over $150 · $6 flat under $150",
    shipsTo: ["USA"],
    catalogSize: "11 research products on sale",
    paymentMethods: ["Venmo", "Cash App", "X Money", "Crypto"],
    returnPolicy: "Replacement or refund for nonconforming product",
    lastTestedDate: "2026-08-01",
    gaKey: "elyria_bio",
    domainMatch: "elyriabio.com",
    finnrickSlug: "elyria-bio",
    thirdPartyLab: "ILS Labs and BT Labs (per Elyria Bio)",
    ownedByFounder: true,
  },

  // ── Amino Club ──────────────────────────────────────────────────────────────
  {
    slug: "amino-club",
    name: "Amino Club",
    tagline: "COA-verified research peptides with batch-specific testing",
    badge: "COA Verified",
    badgeStyle: "green",
    category: "injectable",
    affiliateUrl: "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=data_layer&code=PEPTIDEX",
    discountCode: "PEPTIDEX",
    discountPercent: 20,
    discountStackable: false,
    thirdPartyRating: {
      platform: "Trustpilot",
      rating: 4.7,
      reviewCount: 667,
      url: "https://www.trustpilot.com/review/aminoclub.com",
      checked: "2026-11-02",
    },
    purity: "99%+",
    coaStatus: "Batch-specific COA",
    testingMethods: ["HPLC", "Mass Spec", "Endotoxin"],
    shippingSpeed: "2–4 business days (US)",
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
    thirdPartyLab: "MZ Biolabs, Janoshik",
  },

  // ── Bio Longevity Labs ────────────────────────────────────────────────────
  {
    slug: "bio-longevity-labs",
    name: "Bio Longevity Labs",
    tagline: "Triple-tested premium peptides with stackable PEPTIDEX discount",
    badge: "Triple-Tested",
    badgeStyle: "premium",
    category: "injectable",
    affiliateUrl: "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
    discountCode: "PEPTIDEX",
    discountPercent: 15,
    discountStackable: true,
    purity: "99%+",
    coaStatus: "Batch-specific COA",
    testingMethods: ["HPLC", "LC-MS", "Endotoxin"],
    shippingSpeed: "2–5 business days (US)",
    shippingCost: "Free over $150",
    shipsTo: ["USA", "International"],
    catalogSize: "80+ compounds",
    paymentMethods: ["Credit Card", "Crypto"],
    returnPolicy: "30-day money-back guarantee",
    editorialNote: "Use code PEPTIDEX for 15% off – stacks with any active sale for up to 40%+ savings",
    lastTestedDate: "2026-04-20",
    gaKey: "bio_longevity_labs",
    domainMatch: "biolongevitylabs.com",
    finnrickSlug: "bio-longevity-labs",
  },

  // ── Limitless Life ────────────────────────────────────────────────────────
  {
    slug: "limitless-life",
    name: "Limitless Life",
    tagline: "USA-manufactured research peptides with extensive catalog",
    badge: "USA Made",
    badgeStyle: "gold",
    category: "injectable",
    affiliateUrl: "https://www.kb6dp3dq.com/PEPTIDEX/",
    discountCode: "PEPTIDEX",
    discountPercent: 15,
    discountStackable: false,
    purity: "99%+",
    coaStatus: "Batch-specific COA",
    testingMethods: ["HPLC", "LC-MS", "Endotoxin"],
    shippingSpeed: "3–5 business days (US)",
    shippingCost: "Free over $100",
    shipsTo: ["USA"],
    catalogSize: "90+ compounds",
    paymentMethods: ["Credit Card", "Crypto"],
    returnPolicy: "Satisfaction guarantee",
    lastTestedDate: "2026-04-01",
    gaKey: "limitless_life",
    domainMatch: "kb6dp3dq.com",
    finnrickSlug: "limitless-life",
  },

  // — Ascension Peptides ————————————————————————————————————————————————————————
  {
    // DEACTIVATED 2026-05-24: 10% commission on post-discount basis with 50% customer
    // discount = ~$5 per $100 order. Reactivate only if commission rate is renegotiated.
    isActive: false,
    slug: "ascension-peptides",
    name: "Ascension Peptides",
    tagline: "60+ COA-verified compounds — use code PEPTIDEX for 50% off",
    badge: "COA Verified",
    badgeStyle: "green",
    category: "injectable",
    affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/",
    discountCode: "PEPTIDEX",
    discountPercent: 50,
    discountStackable: false,
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
  },

  // ── Pantheon Peptides ─────────────────────────────────────────────────────
  {
    slug: "pantheon-peptides",
    name: "Pantheon Peptides",
    tagline: "Emerging vendor with competitive pricing and COA verification",
    badge: "COA Verified",
    badgeStyle: "green",
    category: "injectable",
    affiliateUrl: "https://pantheonpeptides.com/partner/PeptiDex/",
    discountCode: "PEPTIDEX",
    discountPercent: 15,
    discountStackable: false,
    purity: "98%+",
    coaStatus: "COA available",
    testingMethods: ["HPLC", "Mass Spec"],
    shippingSpeed: "3–5 business days (US)",
    shippingCost: "Free over $100",
    shipsTo: ["USA"],
    catalogSize: "50+ compounds",
    paymentMethods: ["Credit Card", "Crypto"],
    returnPolicy: "30-day return policy",
    lastTestedDate: "2026-04-05",
    gaKey: "pantheon",
    domainMatch: "pantheonpeptides.com",
    finnrickSlug: "pantheon-peptides",
  },

  // ── LVLUP Health (Oral) ─────────────────────────────────────────────────
  {
    slug: "lvlup-health",
    name: "LVLUP Health",
    tagline: "Specialist in oral peptide formulations and capsules",
    badge: "Oral Specialist",
    badgeStyle: "blue",
    category: "oral",
    affiliateUrl: "https://lvluphealth.com/?ref=PEPTIDEX",
    discountCode: "PEPTIDEX",
    discountPercent: 15,
    discountStackable: false,
    purity: "98%+",
    coaStatus: "COA available",
    testingMethods: ["HPLC", "Mass Spec"],
    shippingSpeed: "3–5 business days (US)",
    shippingCost: "Free over $75",
    shipsTo: ["USA"],
    catalogSize: "20+ compounds",
    paymentMethods: ["Credit Card", "Crypto"],
    returnPolicy: "30-day return policy",
    lastTestedDate: "2026-03-15",
    gaKey: "lvlup_health",
    domainMatch: "lvluphealth.com",
    finnrickSlug: "lvlup-health",
  },
];

// ── Ranking ──────────────────────────────────────────────────────────────────

/**
 * Order = published criteria score (src/lib/vendor-criteria.ts): active before
 * inactive, injectable before oral, then highest score, then name. Prices are
 * compared among active vendors only.
 */
function rankVendors(inputs: VendorInput[]): Vendor[] {
  const active = inputs.filter(v => v.isActive !== false);
  const scores = scoreVendors(active);
  const inactiveScores = scoreVendors(inputs.filter(v => v.isActive === false));
  const scored = inputs.map(v => ({ ...v, criteria: (scores.get(v.name) ?? inactiveScores.get(v.name))! }));
  const group = (v: VendorInput) => (v.isActive === false ? 2 : v.category === "injectable" ? 0 : 1);
  scored.sort((a, b) => group(a) - group(b) || b.criteria.total - a.criteria.total || a.name.localeCompare(b.name));
  return scored.map((v, i) => ({ ...v, sortOrder: i + 1 }));
}

export const vendors: Vendor[] = rankVendors(vendorInputs);

// ── Helpers ──────────────────────────────────────────────────────────────────

/** All ACTIVE vendors in ranking order */
export const vendorsSorted = vendors.filter(v => v.isActive !== false);

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
export const allVendorsIncludingInactive = vendors;
