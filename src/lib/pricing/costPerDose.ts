/**
 * lib/pricing/costPerDose.ts
 * ==========================
 * Pure function to compute the cost per dose and total doses for a listing.
 *
 * This replaces the broken inline calculation in PricingClient.tsx (line 67):
 *   const costPerDose = vp.vial_mg > 0 ? vp.price_usd / vp.vial_mg : 0;
 *
 * That code had two bugs:
 *   1. It divided by vial_mg (single vial) instead of total_mg (full listing).
 *      A "3 vials × 10mg" listing at $99 showed $9.90/mg when the real answer
 *      is $3.30/mg — the bundle looked 3× more expensive than it is.
 *   2. It labelled the result "costPerDose" but computed cost-per-mg.
 *      Cost per DOSE requires a real dose_mcg (e.g. 250mcg of BPC-157),
 *      not just 1mg.
 *
 * This function uses:
 *   - total_mg from the listing row (the pre-computed field from normalizeListing)
 *   - dose_mcg from the peptide's dosing data (or a user override)
 *   - price_usd from the listing row (post-normalization, pre-discount)
 *
 * Unit conventions follow the existing calculator (src/lib/calc/reconstitution.ts):
 *   - Vial content is stored in mg (total_mg)
 *   - Doses are specified in mcg
 *   - 1 mg = 1000 mcg
 *
 * This is the SINGLE source of truth for per-dose cost math.
 * The pricing UI must read from this function, never compute its own.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CostPerDoseInput {
    /** Total USD price for the listing (post-FX-normalization, pre-discount) */
    price_usd: number;
    /** Total mg across all vials in the listing (from NormalizedListing.total_mg) */
    total_mg: number;
    /** Dose in micrograms (mcg). 1 mg = 1000 mcg. */
    dose_mcg: number;
}

export interface CostPerDoseResult {
    /** USD cost for a single dose at the specified dose_mcg */
    costPerDose: number;
    /** Number of full doses available from the listing's total_mg at this dose_mcg */
    dosesPerListing: number;
}

// ─── Core Function ───────────────────────────────────────────────────────────

/**
 * Compute cost per dose and doses per listing.
 *
 * INVARIANTS:
 * - Uses total_mg (not single-vial mg) so bundles are compared fairly.
 * - Converts total_mg → total_mcg before dividing by dose_mcg.
 *   This matches the unit convention in CalculatorClient.tsx line 377:
 *     const totalMcg = parseFloat(vialMg) * 1000;
 *     const dosesPerVial = doseMcg > 0 ? Math.floor(totalMcg / doseMcg) : 0;
 *   and cycle-engine.ts line 123:
 *     const dosesPerVial = Math.floor(bacWaterMl / doseVolumeMl);
 *   (which yields the same result via concentration math).
 *
 * - dosesPerListing is Math.floor (you can't take a partial dose from a vial).
 * - costPerDose rounds to 4 decimal places for display consistency.
 *
 * @returns null if any input is invalid (non-positive price/total_mg/dose_mcg)
 */
export function costPerDose(input: CostPerDoseInput): CostPerDoseResult | null {
    const { price_usd, total_mg, dose_mcg } = input;

    // Guard: all values must be positive
    if (price_usd <= 0 || total_mg <= 0 || dose_mcg <= 0) {
        return null;
    }

    // Convert total_mg to total_mcg (1 mg = 1000 mcg)
    // This is the same conversion used in:
    //   CalculatorClient.tsx line 377: totalMcg = parseFloat(vialMg) * 1000
    //   cycle-engine.ts line 120:     concentration = (vialMg * 1000) / bacWaterMl
    const total_mcg = total_mg * 1000;

    // Integer doses from the full listing (floor — no partial doses)
    const dosesPerListing = Math.floor(total_mcg / dose_mcg);

    // Edge case: dose is larger than total content
    if (dosesPerListing <= 0) {
        return null;
    }

    // Cost per dose = total price / total integer doses
    const cost = Math.round((price_usd / dosesPerListing) * 10000) / 10000;

    return {
        costPerDose: cost,
        dosesPerListing,
    };
}


// ─── Default Dose Lookup ─────────────────────────────────────────────────────

/**
 * Returns the default dose_mcg for a peptide, sourced from peptides.ts dosing data.
 * Uses the LOW end of the typical_dose_mcg range (conservative estimate).
 *
 * This matches the convention used elsewhere in the codebase:
 *   - protocol/page.tsx line 56:  doseMcg: pep?.dosing?.typical_dose_mcg?.[0] ?? 250
 *   - tools/pk/PKClient.tsx line 115: return p?.dosing?.typical_dose_mcg[0] ?? 250
 *   - tools/calculator/CalculatorClient.tsx line 147: setTargetConcentrationMcg(String(p.dosing.typical_dose_mcg[0]))
 *
 * Returns null if the peptide has no dosing data. The UI should allow
 * user override; this just provides a sensible starting value.
 */
export function getDefaultDoseMcg(
    dosing: { typical_dose_mcg?: [number, number] } | null | undefined
): number | null {
    if (!dosing?.typical_dose_mcg) return null;
    const [low] = dosing.typical_dose_mcg;
    return low > 0 ? low : null;
}
