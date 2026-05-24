/**
 * Amino Club â€” Product Map
 * Tier: 2 (Deep Links) | Platform: Custom SPA
 * Product URL: aminoclub.com/us/products/{slug}
 * Affiliate: ?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=data_layer&code=PEPTIDEX
 * Discount: 20% off with code PEPTIDEX (manual entry at checkout)
 * Last verified: 2026-05-10
 *
 * NOTE: Amino Club does NOT support cart pre-fill URLs.
 * All links open to the product page; user must add to cart manually.
 */

export interface AminoClubProduct {
  /** Product page slug on aminoclub.com */
  urlSlug: string;
  /** Display name */
  displayName: string;
  /** Vial size in mg */
  vialSizeMg: number;
  /** Price in USD */
  priceUsd: number;
  /** Last verified date */
  lastVerifiedAt: string;
}

export const aminoClubProductMap: Record<string, AminoClubProduct> = {
  "bpc-157": { urlSlug: "bpc-157", displayName: "BPC-157", vialSizeMg: 10, priceUsd: 39.99, lastVerifiedAt: "2026-05-10" },
  "tb-500": { urlSlug: "tb-500", displayName: "TB-500", vialSizeMg: 10, priceUsd: 39.99, lastVerifiedAt: "2026-05-10" },
  "ghk-cu": { urlSlug: "ghk-cu", displayName: "GHK-Cu", vialSizeMg: 50, priceUsd: 29.99, lastVerifiedAt: "2026-05-10" },
  "ipamorelin": { urlSlug: "ipamorelin", displayName: "Ipamorelin", vialSizeMg: 10, priceUsd: 59.99, lastVerifiedAt: "2026-05-10" },
  "cjc-1295": { urlSlug: "cjc-1295", displayName: "CJC-1295", vialSizeMg: 10, priceUsd: 59.99, lastVerifiedAt: "2026-05-10" },
  "dsip": { urlSlug: "dsip", displayName: "DSIP", vialSizeMg: 5, priceUsd: 29.99, lastVerifiedAt: "2026-05-10" },
  "pt-141": { urlSlug: "pt-141", displayName: "PT-141", vialSizeMg: 10, priceUsd: 49.99, lastVerifiedAt: "2026-05-10" },
  "retatrutide": { urlSlug: "glp-3", displayName: "Retatrutide (GLP-3)", vialSizeMg: 10, priceUsd: 69.99, lastVerifiedAt: "2026-05-10" },
  "semaglutide": { urlSlug: "semaglutide", displayName: "Semaglutide", vialSizeMg: 5, priceUsd: 47.99, lastVerifiedAt: "2026-05-10" },
  "tirzepatide": { urlSlug: "tirzepatide", displayName: "Tirzepatide", vialSizeMg: 5, priceUsd: 69.99, lastVerifiedAt: "2026-05-10" },
  "thymosin-alpha-1": { urlSlug: "thymosin-alpha-1", displayName: "Thymosin Alpha-1", vialSizeMg: 10, priceUsd: 49.99, lastVerifiedAt: "2026-05-10" },
  "semax": { urlSlug: "semax", displayName: "Semax", vialSizeMg: 10, priceUsd: 29.99, lastVerifiedAt: "2026-05-10" },
  "selank": { urlSlug: "selank", displayName: "Selank", vialSizeMg: 10, priceUsd: 29.99, lastVerifiedAt: "2026-05-10" },
  "mots-c": { urlSlug: "mots-c", displayName: "MOTS-c", vialSizeMg: 10, priceUsd: 39.99, lastVerifiedAt: "2026-05-10" },
  "aod-9604": { urlSlug: "aod-9604", displayName: "AOD-9604", vialSizeMg: 5, priceUsd: 49.99, lastVerifiedAt: "2026-05-10" },
  "tesamorelin": { urlSlug: "tesamorelin", displayName: "Tesamorelin", vialSizeMg: 10, priceUsd: 69.99, lastVerifiedAt: "2026-05-10" },
  "kpv": { urlSlug: "kpv", displayName: "KPV", vialSizeMg: 10, priceUsd: 39.99, lastVerifiedAt: "2026-05-10" },
  "cagrilintide": { urlSlug: "cagrilintide", displayName: "Cagrilintide", vialSizeMg: 10, priceUsd: 69.99, lastVerifiedAt: "2026-05-10" },
  "nad-": { urlSlug: "nad", displayName: "NAD+", vialSizeMg: 500, priceUsd: 69.99, lastVerifiedAt: "2026-05-10" },
  "glutathione": { urlSlug: "glutathione", displayName: "Glutathione", vialSizeMg: 1500, priceUsd: 59.99, lastVerifiedAt: "2026-05-10" },
  "igf-1-lr3": { urlSlug: "igf-1-lr3", displayName: "IGF-1 LR3", vialSizeMg: 1, priceUsd: 69.99, lastVerifiedAt: "2026-05-10" },
  "ghrp-2": { urlSlug: "ghrp-2", displayName: "GHRP-2", vialSizeMg: 5, priceUsd: 86.99, lastVerifiedAt: "2026-05-10" },
  "ghrp-6": { urlSlug: "ghrp-6", displayName: "GHRP-6", vialSizeMg: 5, priceUsd: 54.99, lastVerifiedAt: "2026-05-10" },
  "hexarelin": { urlSlug: "hexarelin", displayName: "Hexarelin", vialSizeMg: 5, priceUsd: 55.99, lastVerifiedAt: "2026-05-10" },
};

export const AMINO_CLUB_PRODUCT_COUNT = Object.keys(aminoClubProductMap).length;

export function buildAminoClubProductUrl(peptideSlug: string): string {
  const product = aminoClubProductMap[peptideSlug];
  if (product) {
    return `https://www.aminoclub.com/us/products/${product.urlSlug}`;
  }
  return "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=data_layer&code=PEPTIDEX";
}

export function buildAminoClubAffiliateUrl(peptideSlug: string): string {
  const product = aminoClubProductMap[peptideSlug];
  const base = "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=data_layer&code=PEPTIDEX";
  if (product) {
    return `${base}&redirect=/us/products/${product.urlSlug}`;
  }
  return base;
}

