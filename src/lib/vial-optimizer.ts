/**
 * Vial Optimizer Engine
 * =====================
 * Calculates the exact number of vials a user needs to purchase for a
 * planned peptide cycle, with a 10% safety buffer to prevent mid-cycle
 * shortfall.
 *
 * Formula:
 *   totalMgRaw = (doseMcg / 1000) × injectionsPerWeek × cycleWeeks
 *   bufferedMg = totalMgRaw × 1.10  (non-negotiable 10% safety buffer)
 *   vialsNeeded = ceil(bufferedMg / vialSizeMg)
 */

import { vendorPricing, type PeptideVendorPricing, type VendorPrice } from "@/data/vendor-pricing";
import { vendorCartConfigs, type VendorCartConfig, type CartTier } from "@/data/vendor-cart-config";
import { aminoClubProductMap, buildAminoClubProductUrl } from "@/data/vendor-product-maps/amino-club";
import { vendorBySlug } from "@/data/vendors";

// ── Constants ────────────────────────────────────────────────────────────

const SAFETY_BUFFER = 1.10; // 10% buffer — non-negotiable

// ── Types ────────────────────────────────────────────────────────────────

export interface VialOptimizationInput {
  peptideSlug: string;
  peptideName: string;
  doseMcg: number;
  injectionsPerWeek: number;
  cycleWeeks: number;
}

export interface VendorPlan {
  vendorSlug: string;
  vendorName: string;
  tier: CartTier;
  phase: string;
  vialSizeMg: number;
  vialsNeeded: number;
  pricePerVial: number;
  subtotal: number;
  subtotalAfterDiscount: number;
  discountPercent: number;
  discountDisplay: string;
  autoAppliesDiscount: boolean;
  /** The URL to open — either cart-add or product deep link depending on tier */
  actionUrl: string;
  /** "cart" | "deeplink" | "affiliate" */
  actionType: "cart" | "deeplink" | "affiliate";
  inStock: boolean;
}

export interface VialOptimizationResult {
  peptideSlug: string;
  peptideName: string;
  totalMgRaw: number;
  bufferedMg: number;
  cycleWeeks: number;
  doseMcg: number;
  injectionsPerWeek: number;
  /** Sorted by subtotalAfterDiscount ascending (cheapest first) */
  vendorPlans: VendorPlan[];
  /** True if no vendor carries this peptide */
  noVendorsAvailable: boolean;
}

// ── Core Engine ──────────────────────────────────────────────────────────

export function optimizeVials(input: VialOptimizationInput): VialOptimizationResult {
  const { peptideSlug, peptideName, doseMcg, injectionsPerWeek, cycleWeeks } = input;

  // Step 1: Calculate total mg needed
  const totalMgRaw = (doseMcg / 1000) * injectionsPerWeek * cycleWeeks;
  const bufferedMg = totalMgRaw * SAFETY_BUFFER;

  // Step 2: Find vendor pricing for this peptide
  const pricingEntry = vendorPricing.find(
    (p) => p.slug === peptideSlug || p.name === peptideName
  );

  if (!pricingEntry || pricingEntry.vendors.length === 0) {
    return {
      peptideSlug,
      peptideName,
      totalMgRaw: parseFloat(totalMgRaw.toFixed(2)),
      bufferedMg: parseFloat(bufferedMg.toFixed(2)),
      cycleWeeks,
      doseMcg,
      injectionsPerWeek,
      vendorPlans: [],
      noVendorsAvailable: true,
    };
  }

  // Step 3: Build vendor plans
  const vendorPlans: VendorPlan[] = pricingEntry.vendors
    .filter((vp) => {
      if (!vp.inStock) return false;
      // Skip deactivated vendors (isActive: false in vendors.ts)
      const slug = resolveVendorSlug(vp.vendor);
      return vendorBySlug[slug]?.isActive !== false;
    })
    .map((vp) => buildVendorPlan(vp, peptideSlug, bufferedMg))
    .sort((a, b) => a.subtotalAfterDiscount - b.subtotalAfterDiscount);

  return {
    peptideSlug,
    peptideName,
    totalMgRaw: parseFloat(totalMgRaw.toFixed(2)),
    bufferedMg: parseFloat(bufferedMg.toFixed(2)),
    cycleWeeks,
    doseMcg,
    injectionsPerWeek,
    vendorPlans,
    noVendorsAvailable: vendorPlans.length === 0,
  };
}

// ── Vendor Plan Builder ──────────────────────────────────────────────────

function buildVendorPlan(
  vp: VendorPrice,
  peptideSlug: string,
  bufferedMg: number
): VendorPlan {
  // Resolve vendor slug from display name
  const vendorSlug = resolveVendorSlug(vp.vendor);
  const cartConfig = vendorCartConfigs[vendorSlug];
  const vendor = vendorBySlug[vendorSlug];

  const vialsNeeded = Math.ceil(bufferedMg / vp.vial_mg);
  const subtotal = parseFloat((vp.price_usd * vialsNeeded).toFixed(2));

  // Resolve discount
  const discountPercent = cartConfig?.discountPercent ?? vendor?.discountPercent ?? 0;
  const subtotalAfterDiscount = parseFloat(
    (subtotal * (1 - discountPercent / 100)).toFixed(2)
  );

  // Resolve action URL and type
  const { actionUrl, actionType } = resolveAction(vendorSlug, peptideSlug, cartConfig);

  return {
    vendorSlug,
    vendorName: vp.vendor,
    tier: cartConfig?.tier ?? 3,
    phase: cartConfig?.phase ?? "excluded",
    vialSizeMg: vp.vial_mg,
    vialsNeeded,
    pricePerVial: vp.price_usd,
    subtotal,
    subtotalAfterDiscount,
    discountPercent,
    discountDisplay: cartConfig?.discountDisplay ?? `Use code PEPTIDEX for ${discountPercent}% off`,
    autoAppliesDiscount: cartConfig?.autoAppliesDiscount ?? false,
    actionUrl,
    actionType,
    inStock: vp.inStock,
  };
}

// ── Action URL Resolution ────────────────────────────────────────────────

function resolveAction(
  vendorSlug: string,
  peptideSlug: string,
  cartConfig?: VendorCartConfig
): { actionUrl: string; actionType: "cart" | "deeplink" | "affiliate" } {
  // Amino Club: Tier 2 — use deep links
  if (vendorSlug === "amino-club") {
    const product = aminoClubProductMap[peptideSlug];
    if (product) {
      return {
        actionUrl: buildAminoClubProductUrl(peptideSlug),
        actionType: "deeplink",
      };
    }
  }

  // Phase 1B vendors: use affiliate root for now
  if (cartConfig?.phase === "1B") {
    return {
      actionUrl: cartConfig.affiliateRootUrl,
      actionType: "affiliate",
    };
  }

  // Default: use vendor affiliate URL from vendors.ts
  const vendor = vendorBySlug[vendorSlug];
  return {
    actionUrl: vendor?.affiliateUrl ?? "#",
    actionType: "affiliate",
  };
}

// ── Vendor Slug Resolution ───────────────────────────────────────────────

const VENDOR_NAME_TO_SLUG: Record<string, string> = {
  "Elyria Bio": "elyria-bio",
  "Amino Club": "amino-club",
  "Bio Longevity Labs": "bio-longevity-labs",
  "Limitless Life": "limitless-life",
  // "Ascension Peptides" omitted — deactivated 2026-05-24
  "Pantheon Peptides": "pantheon-peptides",
  "LVLUP Health": "lvlup-health",
};

function resolveVendorSlug(vendorName: string): string {
  return VENDOR_NAME_TO_SLUG[vendorName] ?? vendorName.toLowerCase().replace(/\s+/g, "-");
}

// ── Batch Optimizer ──────────────────────────────────────────────────────

/**
 * Optimize vials for an entire cycle (multiple peptides).
 * Returns per-peptide results + aggregate vendor totals.
 */
export function optimizeCycleVials(
  inputs: VialOptimizationInput[]
): {
  results: VialOptimizationResult[];
  vendorTotals: {
    vendorSlug: string;
    vendorName: string;
    total: number;
    totalAfterDiscount: number;
    discountPercent: number;
    discountDisplay: string;
    peptideCount: number;
    actionType: "cart" | "deeplink" | "affiliate";
  }[];
  cheapestVendor: string | null;
} {
  const results = inputs.map(optimizeVials);

  // Aggregate per-vendor totals across all peptides
  const vendorMap = new Map<
    string,
    {
      vendorName: string;
      total: number;
      totalAfterDiscount: number;
      discountPercent: number;
      discountDisplay: string;
      peptideCount: number;
      actionType: "cart" | "deeplink" | "affiliate";
    }
  >();

  results.forEach((r) => {
    r.vendorPlans.forEach((vp) => {
      const existing = vendorMap.get(vp.vendorSlug);
      if (existing) {
        existing.total += vp.subtotal;
        existing.totalAfterDiscount += vp.subtotalAfterDiscount;
        existing.peptideCount += 1;
      } else {
        vendorMap.set(vp.vendorSlug, {
          vendorName: vp.vendorName,
          total: vp.subtotal,
          totalAfterDiscount: vp.subtotalAfterDiscount,
          discountPercent: vp.discountPercent,
          discountDisplay: vp.discountDisplay,
          peptideCount: 1,
          actionType: vp.actionType,
        });
      }
    });
  });

  const vendorTotals = Array.from(vendorMap.entries())
    .map(([vendorSlug, data]) => ({
      vendorSlug,
      ...data,
      total: parseFloat(data.total.toFixed(2)),
      totalAfterDiscount: parseFloat(data.totalAfterDiscount.toFixed(2)),
    }))
    .sort((a, b) => a.totalAfterDiscount - b.totalAfterDiscount);

  return {
    results,
    vendorTotals,
    cheapestVendor: vendorTotals.length > 0 ? vendorTotals[0].vendorSlug : null,
  };
}
