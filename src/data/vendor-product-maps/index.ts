/**
 * Vendor Product Maps — Index
 * ===========================
 * Re-exports all vendor-specific product maps from a single import point.
 *
 * Phase 1A: Ascension (Tier 1), Amino Club (Tier 2)
 * Phase 1B: Bio Longevity, Limitless Life, Pantheon (deferred)
 */

// Phase 1A — fully mapped
export {
  ascensionProductMap,
  buildAscensionCartUrl,
  buildAscensionProductUrl,
  ASCENSION_PRODUCT_COUNT,
  type AscensionProduct,
} from "./ascension";

export {
  aminoClubProductMap,
  buildAminoClubProductUrl,
  buildAminoClubAffiliateUrl,
  AMINO_CLUB_PRODUCT_COUNT,
  type AminoClubProduct,
} from "./amino-club";
