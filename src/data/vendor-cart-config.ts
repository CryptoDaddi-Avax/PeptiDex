/**
 * Vendor Cart Configuration â€” Single Source of Truth
 * ===================================================
 * Defines per-vendor cart-building capabilities based on browser-verified
 * affiliate attribution tests (2026-05-10).
 *
 * Tier 1: Cart Pre-fill â€” ?add-to-cart= URL opens vendor site with item in cart
 * Tier 2: Deep Link â€” Opens product page; user manually adds to cart
 * Tier 3: Affiliate Root â€” Opens vendor homepage only
 */

export type CartTier = 1 | 2 | 3;
export type CartPhase = "1A" | "1B" | "excluded";

export interface VendorCartConfig {
  /** Vendor slug matching vendors.ts */
  vendorSlug: string;
  /** Cart capability tier */
  tier: CartTier;
  /** Implementation phase */
  phase: CartPhase;
  /** E-commerce platform */
  platform: "woocommerce" | "bigcommerce" | "spa" | "unknown";
  /** Whether the affiliate cookie auto-applies a discount */
  autoAppliesDiscount: boolean;
  /** Discount code to show in UI (null if auto-applied) */
  discountDisplay: string;
  /** Discount percentage */
  discountPercent: number;
  /** Cart URL pattern (with {productId} placeholder) */
  cartUrlPattern: string | null;
  /** Product URL pattern (with {slug} placeholder) */
  productUrlPattern: string | null;
  /** Affiliate root URL (always available) */
  affiliateRootUrl: string;
  /** UTM params to append */
  utmParams: Record<string, string>;
  /** Whether variable products exist that can't use cart-add URLs */
  hasVariableProducts: boolean;
  /** Notes from attribution testing */
  notes: string;
}

export const vendorCartConfigs: Record<string, VendorCartConfig> = {
  "elyria-bio": {
    vendorSlug: "elyria-bio",
    tier: 2,
    phase: "1A",
    platform: "unknown",
    autoAppliesDiscount: false,
    discountDisplay: "Use code PEPTIDEX for 10% off · Free shipping over $150",
    discountPercent: 10,
    cartUrlPattern: null,
    productUrlPattern: null,
    affiliateRootUrl: "https://elyriabio.com?ref=PEPTIDEX",
    utmParams: { utm_source: "peptidex", utm_medium: "cart_builder" },
    hasVariableProducts: false,
    notes: "New #1 vendor — cart integration pending. Deep links to homepage only until product URL pattern is confirmed.",
  },

  "ascension-peptides": {
    vendorSlug: "ascension-peptides",
    tier: 1,
    phase: "1A",
    platform: "woocommerce",
    autoAppliesDiscount: false,
    discountDisplay: "Use code PEPTIDEX for 50% off",
    discountPercent: 50,
    cartUrlPattern: "https://ascensionpeptides.com/ref/PeptiDex/?add-to-cart={productId}",
    productUrlPattern: "https://ascensionpeptides.com/product/{slug}/",
    affiliateRootUrl: "https://ascensionpeptides.com/ref/PeptiDex/",
    utmParams: { utm_source: "peptidex", utm_medium: "cart_builder" },
    hasVariableProducts: false,
    notes: "All products type:simple. Single-URL flow works. AffiliateWP cookie persists.",
  },

  "amino-club": {
    vendorSlug: "amino-club",
    tier: 2,
    phase: "1A",
    platform: "spa",
    autoAppliesDiscount: false,
    discountDisplay: "Use code PEPTIDEX for 20% off",
    discountPercent: 20,
    cartUrlPattern: null,
    productUrlPattern: "https://www.aminoclub.com/us/products/{slug}",
    affiliateRootUrl: "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=data_layer&code=PEPTIDEX",
    utmParams: { utm_source: "peptidex", utm_medium: "cart_builder" },
    hasVariableProducts: false,
    notes: "SPA â€” no cart-add URL. Deep links work. Affiliate tracking is session-based via URL params.",
  },

  "bio-longevity-labs": {
    vendorSlug: "bio-longevity-labs",
    tier: 1,
    phase: "1B",
    platform: "woocommerce",
    autoAppliesDiscount: false,
    discountDisplay: "Use code PEPTIDEX for 15% off (stacks with sales!)",
    discountPercent: 15,
    cartUrlPattern: "https://biolongevitylabs.com/?add-to-cart={productId}",
    productUrlPattern: "https://biolongevitylabs.com/product/{slug}/",
    affiliateRootUrl: "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
    utmParams: { utm_source: "peptidex", utm_medium: "cart_builder" },
    hasVariableProducts: true,
    notes: "Two-step flow required: HasOffers redirect â†’ then cart-add. Variable products fall back to Tier 2.",
  },

  "limitless-life": {
    vendorSlug: "limitless-life",
    tier: 2,
    phase: "1B",
    platform: "bigcommerce",
    autoAppliesDiscount: false,
    discountDisplay: "Use code PEPTIDEX for 15% off",
    discountPercent: 15,
    cartUrlPattern: "https://limitlesslifenootropics.com/cart.php?action=add&product_id={productId}",
    productUrlPattern: "https://limitlesslifenootropics.com/product/{slug}/",
    affiliateRootUrl: "https://www.kb6dp3dq.com/PEPTIDEX/",
    utmParams: { utm_source: "peptidex", utm_medium: "cart_builder" },
    hasVariableProducts: true,
    notes: "Simple products: cart-add works. BPC-157 (ID:217) requires weight/grade selection â€” Tier 2 fallback.",
  },

  "pantheon-peptides": {
    vendorSlug: "pantheon-peptides",
    tier: 1,
    phase: "1B",
    platform: "woocommerce",
    autoAppliesDiscount: true,
    discountDisplay: "10% discount auto-applied at checkout",
    discountPercent: 10,
    cartUrlPattern: "https://pantheonpeptides.com/partner/PeptiDex/?add-to-cart={productId}",
    productUrlPattern: "https://pantheonpeptides.com/product/{slug}/",
    affiliateRootUrl: "https://pantheonpeptides.com/partner/PeptiDex/",
    utmParams: { utm_source: "peptidex", utm_medium: "cart_builder" },
    hasVariableProducts: false,
    notes: "Single-URL flow works. Auto-applies coupon peptidex10 for 10% off via /partner/PeptiDex/ path.",
  },

  "lvlup-health": {
    vendorSlug: "lvlup-health",
    tier: 3,
    phase: "excluded",
    platform: "unknown",
    autoAppliesDiscount: false,
    discountDisplay: "Use code PEPTIDEX for 15% off",
    discountPercent: 15,
    cartUrlPattern: null,
    productUrlPattern: null,
    affiliateRootUrl: "https://lvluphealth.com/?ref=PEPTIDEX",
    utmParams: { utm_source: "peptidex", utm_medium: "cart_builder" },
    hasVariableProducts: false,
    notes: "Excluded from procurement bridge â€” oral formulations only.",
  },
};

// â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/** Get cart config for a vendor */
export function getVendorCartConfig(vendorSlug: string): VendorCartConfig | undefined {
  return vendorCartConfigs[vendorSlug];
}

/** Get all Phase 1A vendors */
export function getPhase1AVendors(): VendorCartConfig[] {
  return Object.values(vendorCartConfigs).filter(v => v.phase === "1A");
}

/** Get all Tier 1 vendors */
export function getTier1Vendors(): VendorCartConfig[] {
  return Object.values(vendorCartConfigs).filter(v => v.tier === 1);
}

/** Check if a vendor supports cart pre-fill */
export function supportsCartPrefill(vendorSlug: string): boolean {
  const config = vendorCartConfigs[vendorSlug];
  return config ? config.tier === 1 && config.cartUrlPattern !== null : false;
}

