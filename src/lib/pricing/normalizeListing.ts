/**
 * lib/pricing/normalizeListing.ts
 * =================================
 * Pure normalization function for vendor listing rows.
 *
 * This is the ONLY place price_usd and price_per_mg_usd are computed.
 * The UI never computes per-mg math — it reads the pre-computed column.
 *
 * Why this exists:
 * 1. Competitor tools mix currencies in the sort column → dishonest ranking.
 *    We normalize every price to USD via a configurable fx_rates table.
 * 2. Competitor tools compute per-mg from a single vial, not total_mg.
 *    A "10 vials × 500mg" listing should be compared against "1 vial × 100mg"
 *    using total_mg (5000mg vs 100mg), not vial_size_mg.
 * 3. last_checked_at is per-row and real. No global "just now" label.
 *
 * This function is pure (no I/O, no side effects) and fully unit-testable.
 * Pass it the FX rate table as an argument — never import rates from env.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type ListingRoute = 'Injection' | 'Oral' | 'Topical' | 'Nasal' | 'Other';
export type ListingSourceType = 'manual' | 'scrape' | 'api';

/**
 * Raw listing input — what comes from a scraper, manual entry, or API.
 * price_usd and price_per_mg_usd are NOT on this type; they are computed.
 */
export interface RawListingInput {
    vendor_name: string;
    vendor_slug: string;
    peptide_name: string;
    peptide_slug: string;
    route: ListingRoute;
    vial_size_mg: number | null;   // null for non-mass-based products (e.g. capsule count)
    quantity: number;               // number of vials/units in the listing
    price_raw: number;              // listed price in original currency
    currency_raw: string;           // ISO 4217 code
    discount_code?: string | null;
    discount_percent?: number | null;
    in_stock: boolean;
    affiliate_url: string;
    source_type: ListingSourceType;
    last_checked_at: string;        // ISO 8601 timestamp
    coa_url?: string | null;
    third_party_tested?: boolean;
}

/**
 * Normalized listing — the row as stored in the `listings` table.
 * All prices are in USD. price_per_mg_usd is computed from total_mg.
 */
export interface NormalizedListing extends RawListingInput {
    total_mg: number | null;         // vial_size_mg × quantity, or null
    price_usd: number;               // price_raw converted to USD
    price_per_mg_usd: number | null; // price_usd / total_mg, or null
}

/**
 * FX rate lookup: currency_code → rate_to_usd.
 * e.g. { "EUR": 1.085, "GBP": 1.27, "USD": 1.0 }
 * The value is "1 unit of this currency equals X USD".
 */
export type FxRateTable = Record<string, number>;


// ─── Validation ──────────────────────────────────────────────────────────────

export class ListingValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ListingValidationError';
    }
}


// ─── Core Normalization ──────────────────────────────────────────────────────

/**
 * Normalize a raw listing input into a fully computed listing row.
 *
 * @param input    - The raw listing from a scraper, form, or API
 * @param fxRates  - The FX rate table ({ "EUR": 1.085, "GBP": 1.27, "USD": 1.0 })
 * @returns        - The normalized row with price_usd and price_per_mg_usd computed
 * @throws         - ListingValidationError on invalid input
 *
 * INVARIANTS:
 * - price_usd is ALWAYS in USD regardless of currency_raw
 * - price_per_mg_usd uses total_mg (vial_size_mg × quantity), never a single vial
 * - If vial_size_mg is null, total_mg and price_per_mg_usd are both null
 * - quantity must be ≥ 1
 * - price_raw must be > 0
 * - currency_raw must exist in fxRates
 */
export function normalizeListing(
    input: RawListingInput,
    fxRates: FxRateTable
): NormalizedListing {
    // ── Input validation ────────────────────────────────────────────────
    if (!input.vendor_slug || !input.peptide_slug) {
        throw new ListingValidationError('vendor_slug and peptide_slug are required');
    }
    if (input.price_raw <= 0) {
        throw new ListingValidationError(`price_raw must be > 0, got ${input.price_raw}`);
    }
    if (input.quantity < 1 || !Number.isInteger(input.quantity)) {
        throw new ListingValidationError(`quantity must be a positive integer, got ${input.quantity}`);
    }
    if (input.vial_size_mg !== null && input.vial_size_mg <= 0) {
        throw new ListingValidationError(`vial_size_mg must be > 0 or null, got ${input.vial_size_mg}`);
    }

    const currencyUpper = input.currency_raw.toUpperCase();

    // ── FX conversion ───────────────────────────────────────────────────
    const rate = fxRates[currencyUpper];
    if (rate === undefined) {
        throw new ListingValidationError(
            `Unknown currency "${currencyUpper}". Available: ${Object.keys(fxRates).join(', ')}`
        );
    }
    if (rate <= 0) {
        throw new ListingValidationError(
            `FX rate for "${currencyUpper}" must be > 0, got ${rate}`
        );
    }

    const price_usd = roundTo4(input.price_raw * rate);

    // ── Total mg ────────────────────────────────────────────────────────
    // total_mg is ALWAYS vial_size_mg × quantity.
    // A listing for "10 vials × 500mg" has total_mg = 5000.
    // This ensures per-mg comparison is fair across bundle sizes.
    const total_mg = input.vial_size_mg !== null
        ? roundTo4(input.vial_size_mg * input.quantity)
        : null;

    // ── Price per mg ────────────────────────────────────────────────────
    // Only computed when total_mg is available and > 0.
    // This is the canonical SORT KEY — always in USD, always from total_mg.
    const price_per_mg_usd = total_mg !== null && total_mg > 0
        ? roundTo4(price_usd / total_mg)
        : null;

    return {
        ...input,
        currency_raw: currencyUpper,
        total_mg,
        price_usd,
        price_per_mg_usd,
    };
}


// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Round to 4 decimal places (avoids floating-point noise in per-mg values) */
function roundTo4(n: number): number {
    return Math.round(n * 10000) / 10000;
}


// ─── Batch Normalization ─────────────────────────────────────────────────────

/**
 * Normalize an array of raw listings, returning only the valid ones.
 * Invalid rows are collected in the `errors` array with their index and message.
 */
export function normalizeListings(
    inputs: RawListingInput[],
    fxRates: FxRateTable
): {
    listings: NormalizedListing[];
    errors: Array<{ index: number; input: RawListingInput; message: string }>;
} {
    const listings: NormalizedListing[] = [];
    const errors: Array<{ index: number; input: RawListingInput; message: string }> = [];

    for (let i = 0; i < inputs.length; i++) {
        try {
            listings.push(normalizeListing(inputs[i], fxRates));
        } catch (err) {
            errors.push({
                index: i,
                input: inputs[i],
                message: err instanceof Error ? err.message : String(err),
            });
        }
    }

    return { listings, errors };
}


// ─── Staleness Check ─────────────────────────────────────────────────────────

/**
 * Returns true if the listing's last_checked_at is older than `maxAgeDays`.
 * Used by the UI to show "stale" badges — the threshold is caller-defined.
 */
export function isStale(listing: NormalizedListing, maxAgeDays: number): boolean {
    const checkedAt = new Date(listing.last_checked_at).getTime();
    const now = Date.now();
    const ageMs = now - checkedAt;
    return ageMs > maxAgeDays * 24 * 60 * 60 * 1000;
}
