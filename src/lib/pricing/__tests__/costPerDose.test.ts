/**
 * Tests for costPerDose.ts
 * ========================
 * Proves cost-per-dose math uses total_mg (not single-vial mg)
 * and a real dose_mcg (not conflated per-mg).
 *
 * Known-good reference case from CalculatorClient.tsx:
 *   10mg vial, 250mcg dose → totalMcg = 10000, dosesPerVial = 40
 *   That's the SAME math at line 377-379:
 *     const totalMcg = parseFloat(vialMg) * 1000;       // 10 * 1000 = 10000
 *     const dosesPerVial = Math.floor(totalMcg / doseMcg); // Math.floor(10000 / 250) = 40
 */

import { costPerDose, getDefaultDoseMcg } from '../costPerDose';

describe('costPerDose', () => {

    // ── Known-good case from the calculator ─────────────────────────────────
    // 10mg vial (total_mg = 10), 250mcg dose → 40 doses

    test('single 10mg vial at 250mcg dose: 40 doses, cost = price/40', () => {
        const result = costPerDose({
            price_usd: 39.99,
            total_mg: 10,       // single 10mg vial
            dose_mcg: 250,
        });

        expect(result).not.toBeNull();
        expect(result!.dosesPerListing).toBe(40);       // 10000 mcg / 250 mcg = 40
        expect(result!.costPerDose).toBeCloseTo(39.99 / 40, 4);  // $0.9998
    });

    // ── BUNDLE CASE: proves total_mg is used, not single-vial ───────────────
    // 3 vials × 10mg = total_mg 30, same 250mcg dose → 120 doses
    // This is the EXACT bug we're fixing: the old code would use vial_mg=10
    // and compute price/10 = $9.997/mg (not even per-dose!).
    // The correct answer is $99.97 / 120 doses = $0.8331/dose.

    test('3-vial bundle (total_mg=30) at 250mcg dose: 120 doses', () => {
        const result = costPerDose({
            price_usd: 99.97,
            total_mg: 30,       // 3 × 10mg vials
            dose_mcg: 250,
        });

        expect(result).not.toBeNull();
        expect(result!.dosesPerListing).toBe(120);      // 30000 mcg / 250 mcg = 120
        expect(result!.costPerDose).toBeCloseTo(99.97 / 120, 4);  // $0.8331
    });

    // ── Verify per-dose ≠ per-mg ────────────────────────────────────────────
    // The old inline code computed: price_usd / vial_mg = $39.99 / 10 = $3.999
    // and labelled it "costPerDose". That's cost-per-mg, not cost-per-dose.
    // The real cost-per-dose at 250mcg is $0.9998.
    // These two numbers must never be equal.

    test('cost-per-dose ≠ cost-per-mg (the old bug)', () => {
        const result = costPerDose({
            price_usd: 39.99,
            total_mg: 10,
            dose_mcg: 250,
        });

        const wrongPerMg = 39.99 / 10;  // $3.999 — the OLD broken calc
        expect(result!.costPerDose).not.toBeCloseTo(wrongPerMg, 2);
        // The correct per-dose is ~$1.00, not ~$4.00
        expect(result!.costPerDose).toBeLessThan(1.1);
    });

    // ── Large-vial, small-dose: many doses ──────────────────────────────────

    test('5mg vial at 100mcg dose: 50 doses', () => {
        const result = costPerDose({
            price_usd: 34.99,
            total_mg: 5,
            dose_mcg: 100,
        });

        expect(result!.dosesPerListing).toBe(50);       // 5000 / 100 = 50
        expect(result!.costPerDose).toBeCloseTo(34.99 / 50, 4);  // $0.6998
    });

    // ── 10-vial bulk bundle ─────────────────────────────────────────────────

    test('10-vial bundle (total_mg=50) at 500mcg dose: 100 doses', () => {
        const result = costPerDose({
            price_usd: 299.90,
            total_mg: 50,       // 10 × 5mg
            dose_mcg: 500,
        });

        expect(result!.dosesPerListing).toBe(100);      // 50000 / 500 = 100
        expect(result!.costPerDose).toBe(2.999);        // 299.90 / 100
    });

    // ── Fractional dose counts: floor ensures no partial doses ──────────────

    test('doses are floored (no partial doses)', () => {
        const result = costPerDose({
            price_usd: 50,
            total_mg: 10,       // 10000 mcg
            dose_mcg: 300,      // 10000 / 300 = 33.33 → 33 doses
        });

        expect(result!.dosesPerListing).toBe(33);
        expect(result!.costPerDose).toBeCloseTo(50 / 33, 4);
    });

    // ── GLP-1 large dose (semaglutide: 2400mcg = 2.4mg per dose) ────────────

    test('semaglutide-like: 3mg vial at 2400mcg dose → 1 dose', () => {
        const result = costPerDose({
            price_usd: 114.29,
            total_mg: 3,        // 3000 mcg total
            dose_mcg: 2400,     // 3000 / 2400 = 1.25 → 1 dose
        });

        expect(result!.dosesPerListing).toBe(1);
        expect(result!.costPerDose).toBe(114.29);       // entire price for 1 dose
    });

    // ── Edge: dose larger than total content → null ─────────────────────────

    test('dose larger than total content → null', () => {
        const result = costPerDose({
            price_usd: 50,
            total_mg: 1,        // 1000 mcg
            dose_mcg: 2000,     // 1000 / 2000 = 0.5 → floor 0 → null
        });

        expect(result).toBeNull();
    });

    // ── Edge: zero/negative inputs → null ───────────────────────────────────

    test('zero price_usd → null', () => {
        expect(costPerDose({ price_usd: 0, total_mg: 10, dose_mcg: 250 })).toBeNull();
    });

    test('negative total_mg → null', () => {
        expect(costPerDose({ price_usd: 50, total_mg: -5, dose_mcg: 250 })).toBeNull();
    });

    test('zero dose_mcg → null', () => {
        expect(costPerDose({ price_usd: 50, total_mg: 10, dose_mcg: 0 })).toBeNull();
    });

    // ── Consistency with calculator known-good case ──────────────────────────
    // Replicate the EXACT math from CalculatorClient.tsx lines 377-379:
    //   const totalMcg = parseFloat(vialMg) * 1000;
    //   const doseMcg = parseFloat(targetConcentrationMcg);
    //   const dosesPerVial = doseMcg > 0 ? Math.floor(totalMcg / doseMcg) : 0;

    test('matches CalculatorClient dosesPerVial math exactly', () => {
        // Simulate calculator with vialMg=5, targetConcentrationMcg=200
        const vialMg = 5;
        const targetConcentrationMcg = 200;
        const totalMcg = vialMg * 1000;  // 5000
        const calculatorDosesPerVial = Math.floor(totalMcg / targetConcentrationMcg); // 25

        const result = costPerDose({
            price_usd: 49.99,
            total_mg: vialMg,   // single vial, so total_mg = vial_mg
            dose_mcg: targetConcentrationMcg,
        });

        expect(result!.dosesPerListing).toBe(calculatorDosesPerVial);  // 25
    });
});


// ─── getDefaultDoseMcg ───────────────────────────────────────────────────────

describe('getDefaultDoseMcg', () => {

    test('returns low end of typical_dose_mcg range', () => {
        expect(getDefaultDoseMcg({ typical_dose_mcg: [250, 500] })).toBe(250);
    });

    test('returns null for missing dosing', () => {
        expect(getDefaultDoseMcg(null)).toBeNull();
        expect(getDefaultDoseMcg(undefined)).toBeNull();
    });

    test('returns null for missing typical_dose_mcg', () => {
        expect(getDefaultDoseMcg({})).toBeNull();
    });

    test('returns null for zero low-end dose', () => {
        expect(getDefaultDoseMcg({ typical_dose_mcg: [0, 500] })).toBeNull();
    });

    test('handles high-dose peptides (tirzepatide: 2500-15000 mcg)', () => {
        expect(getDefaultDoseMcg({ typical_dose_mcg: [2500, 15000] })).toBe(2500);
    });
});
