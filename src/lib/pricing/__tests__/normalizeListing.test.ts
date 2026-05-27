/**
 * Tests for normalizeListing.ts
 * ==============================
 * Seed data: 10 realistic rows covering:
 *   - USD, EUR, GBP, CAD currencies
 *   - Single-vial vs multi-vial (quantity > 1) listings
 *   - Injectable, Oral, Topical, Nasal routes
 *   - null vial_size_mg (non-mass-based)
 *   - In-stock and out-of-stock
 *   - Manual, scrape, and API source types
 *   - With and without discount codes
 *   - With and without COA URLs
 *
 * Every test is pure (no I/O, no mocks, no DB).
 */

import {
    normalizeListing,
    normalizeListings,
    isStale,
    ListingValidationError,
    RawListingInput,
    FxRateTable,
} from '../normalizeListing';

// ─── Test FX Rate Table ──────────────────────────────────────────────────────
// Deliberately simple rates so the math is human-verifiable.

const testFxRates: FxRateTable = {
    USD: 1.0,
    EUR: 1.08,      // 1 EUR = 1.08 USD
    GBP: 1.27,      // 1 GBP = 1.27 USD
    CAD: 0.735,     // 1 CAD = 0.735 USD
    AUD: 0.655,     // 1 AUD = 0.655 USD
};

// ─── Seed Data: 10 Realistic Rows ───────────────────────────────────────────

const seedData: RawListingInput[] = [
    // 1. BPC-157, Amino Club, USD, single vial, injection
    {
        vendor_name: 'Amino Club',
        vendor_slug: 'amino-club',
        peptide_name: 'BPC-157',
        peptide_slug: 'bpc-157',
        route: 'Injection',
        vial_size_mg: 10,
        quantity: 1,
        price_raw: 39.99,
        currency_raw: 'USD',
        discount_code: 'PEPTIDEX',
        discount_percent: 20,
        in_stock: true,
        affiliate_url: 'https://aminoclub.com?code=PEPTIDEX',
        source_type: 'manual',
        last_checked_at: '2026-05-25T14:00:00Z',
        coa_url: 'https://aminoclub.com/coa/bpc-157.pdf',
        third_party_tested: true,
    },

    // 2. BPC-157, Bio Longevity Labs, USD, triple vial bundle → tests quantity > 1
    {
        vendor_name: 'Bio Longevity Labs',
        vendor_slug: 'bio-longevity-labs',
        peptide_name: 'BPC-157',
        peptide_slug: 'bpc-157',
        route: 'Injection',
        vial_size_mg: 10,
        quantity: 3,
        price_raw: 99.97,
        currency_raw: 'USD',
        discount_code: 'PEPTIDEX',
        discount_percent: 15,
        in_stock: true,
        affiliate_url: 'https://go.biolongevitylabs.com/aff_c?offer_id=1',
        source_type: 'manual',
        last_checked_at: '2026-05-20T09:00:00Z',
        third_party_tested: true,
    },

    // 3. Semaglutide, UK vendor, GBP → tests currency conversion
    {
        vendor_name: 'UK Peptides Ltd',
        vendor_slug: 'uk-peptides',
        peptide_name: 'Semaglutide',
        peptide_slug: 'semaglutide',
        route: 'Injection',
        vial_size_mg: 3,
        quantity: 1,
        price_raw: 89.99,
        currency_raw: 'GBP',
        in_stock: true,
        affiliate_url: 'https://ukpeptides.co.uk/semaglutide',
        source_type: 'scrape',
        last_checked_at: '2026-05-22T11:30:00Z',
    },

    // 4. Tirzepatide, EU vendor, EUR, 5-vial bundle → tests EUR + multi-quantity
    {
        vendor_name: 'PeptideEU',
        vendor_slug: 'peptide-eu',
        peptide_name: 'Tirzepatide',
        peptide_slug: 'tirzepatide',
        route: 'Injection',
        vial_size_mg: 5,
        quantity: 5,
        price_raw: 450.00,
        currency_raw: 'EUR',
        discount_code: 'PDEX10',
        discount_percent: 10,
        in_stock: true,
        affiliate_url: 'https://peptideeu.com/tirzepatide',
        source_type: 'api',
        last_checked_at: '2026-05-26T08:00:00Z',
    },

    // 5. BPC-157 Oral, LVLUP Health, USD, null vial_size_mg → tests non-mass-based
    {
        vendor_name: 'LVLUP Health',
        vendor_slug: 'lvlup-health',
        peptide_name: 'BPC-157 Oral',
        peptide_slug: 'bpc-157',
        route: 'Oral',
        vial_size_mg: null,
        quantity: 1,
        price_raw: 54.99,
        currency_raw: 'USD',
        discount_code: 'PEPTIDEX',
        discount_percent: 15,
        in_stock: true,
        affiliate_url: 'https://lvluphealth.com/bpc-157-oral',
        source_type: 'manual',
        last_checked_at: '2026-05-18T16:00:00Z',
    },

    // 6. GHK-Cu Topical, CAD → tests CAD conversion + topical route
    {
        vendor_name: 'CanadaPeptides',
        vendor_slug: 'canada-peptides',
        peptide_name: 'GHK-Cu',
        peptide_slug: 'ghk-cu',
        route: 'Topical',
        vial_size_mg: 50,
        quantity: 2,
        price_raw: 120.00,
        currency_raw: 'CAD',
        in_stock: true,
        affiliate_url: 'https://canadapeptides.ca/ghk-cu',
        source_type: 'scrape',
        last_checked_at: '2026-05-10T12:00:00Z',
        coa_url: 'https://canadapeptides.ca/coa/ghk-cu.pdf',
    },

    // 7. Ipamorelin, Limitless Life, USD, out of stock → tests in_stock=false
    {
        vendor_name: 'Limitless Life',
        vendor_slug: 'limitless-life',
        peptide_name: 'Ipamorelin',
        peptide_slug: 'ipamorelin',
        route: 'Injection',
        vial_size_mg: 5,
        quantity: 1,
        price_raw: 34.99,
        currency_raw: 'USD',
        discount_code: 'PEPTIDEX',
        discount_percent: 15,
        in_stock: false,
        affiliate_url: 'https://www.kb6dp3dq.com/PEPTIDEX/',
        source_type: 'manual',
        last_checked_at: '2026-05-01T09:00:00Z',
    },

    // 8. PT-141 Nasal spray, USD → tests nasal route
    {
        vendor_name: 'Amino Club',
        vendor_slug: 'amino-club',
        peptide_name: 'PT-141',
        peptide_slug: 'pt-141',
        route: 'Nasal',
        vial_size_mg: 10,
        quantity: 1,
        price_raw: 79.99,
        currency_raw: 'USD',
        discount_code: 'PEPTIDEX',
        discount_percent: 20,
        in_stock: true,
        affiliate_url: 'https://aminoclub.com/pt-141?code=PEPTIDEX',
        source_type: 'manual',
        last_checked_at: '2026-05-25T14:00:00Z',
    },

    // 9. TB-500, 10-vial bundle, USD → tests large quantity
    {
        vendor_name: 'Pantheon Peptides',
        vendor_slug: 'pantheon-peptides',
        peptide_name: 'TB-500',
        peptide_slug: 'tb-500',
        route: 'Injection',
        vial_size_mg: 5,
        quantity: 10,
        price_raw: 299.90,
        currency_raw: 'USD',
        discount_code: 'PEPTIDEX',
        discount_percent: 15,
        in_stock: true,
        affiliate_url: 'https://pantheonpeptides.com/tb-500-bundle',
        source_type: 'manual',
        last_checked_at: '2026-05-24T10:00:00Z',
        third_party_tested: true,
    },

    // 10. Retatrutide, GBP, high-value single vial → tests expensive item + GBP
    {
        vendor_name: 'UK Peptides Ltd',
        vendor_slug: 'uk-peptides',
        peptide_name: 'Retatrutide',
        peptide_slug: 'retatrutide',
        route: 'Injection',
        vial_size_mg: 4,
        quantity: 1,
        price_raw: 199.00,
        currency_raw: 'GBP',
        in_stock: true,
        affiliate_url: 'https://ukpeptides.co.uk/retatrutide',
        source_type: 'scrape',
        last_checked_at: '2026-05-22T11:30:00Z',
    },
];


// ─── Test Suite ──────────────────────────────────────────────────────────────

describe('normalizeListing', () => {

    // ── 1. USD single-vial: price passes through, per-mg is price/vial_size ──

    test('USD single-vial: price_usd equals price_raw, per-mg = price/total_mg', () => {
        const result = normalizeListing(seedData[0], testFxRates);

        expect(result.price_usd).toBe(39.99);           // 39.99 × 1.0 USD
        expect(result.total_mg).toBe(10);                // 10mg × 1
        expect(result.price_per_mg_usd).toBe(3.999);    // 39.99 / 10
    });

    // ── 2. USD multi-vial bundle: total_mg = vial_size × quantity ────────────

    test('multi-vial bundle: total_mg = vial_size × quantity', () => {
        const result = normalizeListing(seedData[1], testFxRates);

        expect(result.total_mg).toBe(30);                // 10mg × 3 vials
        expect(result.price_usd).toBe(99.97);
        expect(result.price_per_mg_usd).toBeCloseTo(3.3323, 4); // 99.97 / 30
    });

    // ── 3. GBP → USD conversion ─────────────────────────────────────────────

    test('GBP conversion: price_usd = price_raw × GBP rate', () => {
        const result = normalizeListing(seedData[2], testFxRates);

        // 89.99 GBP × 1.27 = 114.2873
        expect(result.price_usd).toBeCloseTo(114.2873, 4);
        expect(result.total_mg).toBe(3);
        // 114.2873 / 3 = 38.0958
        expect(result.price_per_mg_usd).toBeCloseTo(38.0958, 4);
    });

    // ── 4. EUR conversion + 5-vial bundle ───────────────────────────────────

    test('EUR conversion + multi-quantity: total_mg and price_usd both correct', () => {
        const result = normalizeListing(seedData[3], testFxRates);

        // 450 EUR × 1.08 = 486.00 USD
        expect(result.price_usd).toBe(486);
        // 5mg × 5 vials = 25mg total
        expect(result.total_mg).toBe(25);
        // 486 / 25 = 19.44
        expect(result.price_per_mg_usd).toBe(19.44);
    });

    // ── 5. Null vial_size_mg → total_mg and price_per_mg_usd are both null ──

    test('null vial_size_mg: total_mg and price_per_mg_usd are null', () => {
        const result = normalizeListing(seedData[4], testFxRates);

        expect(result.total_mg).toBeNull();
        expect(result.price_per_mg_usd).toBeNull();
        expect(result.price_usd).toBe(54.99);        // USD passthrough
    });

    // ── 6. CAD conversion + multi-vial ──────────────────────────────────────

    test('CAD conversion: correct price_usd and per-mg from total_mg', () => {
        const result = normalizeListing(seedData[5], testFxRates);

        // 120 CAD × 0.735 = 88.20 USD
        expect(result.price_usd).toBe(88.2);
        // 50mg × 2 = 100mg total
        expect(result.total_mg).toBe(100);
        // 88.20 / 100 = 0.882
        expect(result.price_per_mg_usd).toBe(0.882);
    });

    // ── 7. Out-of-stock items still normalize correctly ─────────────────────

    test('out-of-stock listing: normalizes price but preserves in_stock=false', () => {
        const result = normalizeListing(seedData[6], testFxRates);

        expect(result.in_stock).toBe(false);
        expect(result.price_usd).toBe(34.99);
        expect(result.total_mg).toBe(5);
        expect(result.price_per_mg_usd).toBe(6.998);
    });

    // ── 8. 10-vial bundle: per-mg uses total_mg not single vial ─────────────

    test('10-vial bundle: price_per_mg_usd uses total_mg = 50', () => {
        const result = normalizeListing(seedData[8], testFxRates);

        // 5mg × 10 vials = 50mg total
        expect(result.total_mg).toBe(50);
        // 299.90 / 50 = 5.998
        expect(result.price_per_mg_usd).toBe(5.998);
    });

    // ── 9. Currency code is uppercased ───────────────────────────────────────

    test('currency_raw is uppercased in output', () => {
        const input: RawListingInput = {
            ...seedData[2],
            currency_raw: 'gbp',  // lowercase
        };
        const result = normalizeListing(input, testFxRates);
        expect(result.currency_raw).toBe('GBP');
    });

    // ── 10. All source metadata passes through unchanged ────────────────────

    test('passthrough fields preserved: route, source_type, coa_url, third_party_tested', () => {
        const result = normalizeListing(seedData[0], testFxRates);

        expect(result.route).toBe('Injection');
        expect(result.source_type).toBe('manual');
        expect(result.coa_url).toBe('https://aminoclub.com/coa/bpc-157.pdf');
        expect(result.third_party_tested).toBe(true);
        expect(result.discount_code).toBe('PEPTIDEX');
        expect(result.discount_percent).toBe(20);
        expect(result.last_checked_at).toBe('2026-05-25T14:00:00Z');
    });
});


// ─── Validation Errors ───────────────────────────────────────────────────────

describe('normalizeListing — validation', () => {

    test('throws on unknown currency', () => {
        const input: RawListingInput = { ...seedData[0], currency_raw: 'XYZ' };
        expect(() => normalizeListing(input, testFxRates)).toThrow(ListingValidationError);
        expect(() => normalizeListing(input, testFxRates)).toThrow(/Unknown currency "XYZ"/);
    });

    test('throws on price_raw <= 0', () => {
        const input: RawListingInput = { ...seedData[0], price_raw: 0 };
        expect(() => normalizeListing(input, testFxRates)).toThrow(/price_raw must be > 0/);
    });

    test('throws on quantity < 1', () => {
        const input: RawListingInput = { ...seedData[0], quantity: 0 };
        expect(() => normalizeListing(input, testFxRates)).toThrow(/quantity must be a positive integer/);
    });

    test('throws on negative vial_size_mg', () => {
        const input: RawListingInput = { ...seedData[0], vial_size_mg: -5 };
        expect(() => normalizeListing(input, testFxRates)).toThrow(/vial_size_mg must be > 0 or null/);
    });

    test('throws on empty vendor_slug', () => {
        const input: RawListingInput = { ...seedData[0], vendor_slug: '' };
        expect(() => normalizeListing(input, testFxRates)).toThrow(/vendor_slug and peptide_slug are required/);
    });
});


// ─── Batch Normalization ─────────────────────────────────────────────────────

describe('normalizeListings (batch)', () => {

    test('normalizes all 10 seed rows, 0 errors', () => {
        const { listings, errors } = normalizeListings(seedData, testFxRates);

        expect(listings).toHaveLength(10);
        expect(errors).toHaveLength(0);
    });

    test('collects errors without throwing, returns valid rows', () => {
        const bad: RawListingInput = { ...seedData[0], price_raw: -1 };
        const { listings, errors } = normalizeListings([seedData[0], bad, seedData[1]], testFxRates);

        expect(listings).toHaveLength(2);   // rows 0 and 2 pass
        expect(errors).toHaveLength(1);     // row 1 fails
        expect(errors[0].index).toBe(1);
        expect(errors[0].message).toContain('price_raw must be > 0');
    });

    test('all per-mg values use total_mg, not single vial', () => {
        const { listings } = normalizeListings(seedData, testFxRates);

        for (const row of listings) {
            if (row.vial_size_mg !== null && row.total_mg !== null) {
                expect(row.total_mg).toBe(row.vial_size_mg * row.quantity);
                expect(row.price_per_mg_usd).toBeCloseTo(row.price_usd / row.total_mg, 3);
            }
        }
    });

    test('canonical sort by price_per_mg_usd is always in USD', () => {
        const { listings } = normalizeListings(seedData, testFxRates);
        const sortable = listings.filter(r => r.price_per_mg_usd !== null);
        const sorted = [...sortable].sort((a, b) => a.price_per_mg_usd! - b.price_per_mg_usd!);

        // GHK-Cu (CAD, $0.882/mg) should sort before BPC-157 ($3.999/mg)
        // regardless of original currency
        expect(sorted[0].peptide_slug).toBe('ghk-cu');
        expect(sorted[0].currency_raw).toBe('CAD');  // original was CAD
        expect(sorted[0].price_per_mg_usd).toBeCloseTo(0.882, 3);
    });
});


// ─── Staleness Check ─────────────────────────────────────────────────────────

describe('isStale', () => {

    test('row checked 1 day ago is not stale at 7-day threshold', () => {
        const row = normalizeListing({
            ...seedData[0],
            last_checked_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        }, testFxRates);

        expect(isStale(row, 7)).toBe(false);
    });

    test('row checked 10 days ago IS stale at 7-day threshold', () => {
        const row = normalizeListing({
            ...seedData[0],
            last_checked_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        }, testFxRates);

        expect(isStale(row, 7)).toBe(true);
    });

    test('row checked 30 days ago is stale at 14-day threshold', () => {
        const row = normalizeListing({
            ...seedData[0],
            last_checked_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        }, testFxRates);

        expect(isStale(row, 14)).toBe(true);
    });
});
