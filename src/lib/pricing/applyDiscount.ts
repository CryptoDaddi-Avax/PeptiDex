/**
 * lib/pricing/applyDiscount.ts
 * =====================================================
 * Pure function for applying vendor discount codes to list prices.
 * No side-effects, fully unit-testable.
 */

export type DiscountType = 'percent' | 'fixed';

export interface VendorDiscount {
  code: string;
  type: DiscountType;
  /** For percent: 20 = 20%. For fixed: 10 = $10 off. */
  value: number;
  /** 'all' or a list of peptide slugs this code applies to. */
  appliesTo: 'all' | string[];
  stackable: boolean;
  notes?: string;
}

export interface DiscountResult {
  finalPrice: number;
  savings: number;
  discountApplied: boolean;
  code: string | null;
}

/**
 * Apply a vendor discount to a list price.
 *
 * @param listPrice      - The raw vendor list price in USD.
 * @param discount       - The VendorDiscount descriptor, or null if the vendor has none.
 * @param peptideSlug    - The slug of the peptide being purchased (for per-compound codes).
 * @returns              - Final price, savings, whether a discount was applied, and the code used.
 */
export function applyDiscount(
  listPrice: number,
  discount: VendorDiscount | null,
  peptideSlug: string
): DiscountResult {
  // Guard: no discount available
  if (!discount) {
    return {
      finalPrice: Math.round(listPrice * 100) / 100,
      savings: 0,
      discountApplied: false,
      code: null,
    };
  }

  // Guard: discount is peptide-specific and this peptide isn't included
  if (
    discount.appliesTo !== 'all' &&
    !discount.appliesTo.includes(peptideSlug)
  ) {
    return {
      finalPrice: Math.round(listPrice * 100) / 100,
      savings: 0,
      discountApplied: false,
      code: null,
    };
  }

  let savings = 0;

  if (discount.type === 'percent') {
    savings = listPrice * (discount.value / 100);
  } else {
    // fixed dollar amount
    savings = discount.value;
  }

  // Clamp savings so final price never goes below 0
  savings = Math.min(savings, listPrice);

  const finalPrice = Math.round((listPrice - savings) * 100) / 100;
  savings = Math.round(savings * 100) / 100;

  return {
    finalPrice,
    savings,
    discountApplied: true,
    code: discount.code,
  };
}

/**
 * Build a VendorDiscount from the flat fields stored on each Vendor record.
 * Returns null if the vendor has no discount code.
 */
export function buildVendorDiscount(
  discountCode: string | undefined,
  discountPercent: number | undefined,
  discountStackable: boolean | undefined
): VendorDiscount | null {
  if (!discountCode || !discountPercent) return null;
  return {
    code: discountCode,
    type: 'percent',
    value: discountPercent,
    appliesTo: 'all',
    stackable: discountStackable ?? false,
  };
}
