/**
 * __tests__/applyDiscount.test.ts
 * =====================================================
 * Unit tests for the applyDiscount pure function.
 * Run with: npx jest src/lib/pricing/__tests__/applyDiscount.test.ts
 */

import { applyDiscount, buildVendorDiscount, VendorDiscount } from '../applyDiscount';

const PEPTIDE = 'bpc-157';

describe('applyDiscount', () => {
  // ── No discount ────────────────────────────────────────────────────────────
  it('returns the list price unchanged when discount is null', () => {
    const result = applyDiscount(49.99, null, PEPTIDE);
    expect(result.finalPrice).toBe(49.99);
    expect(result.savings).toBe(0);
    expect(result.discountApplied).toBe(false);
    expect(result.code).toBeNull();
  });

  // ── 20% percent off ────────────────────────────────────────────────────────
  it('correctly applies a 20% discount', () => {
    const discount: VendorDiscount = {
      code: 'PEPTIDEX',
      type: 'percent',
      value: 20,
      appliesTo: 'all',
      stackable: false,
    };
    const result = applyDiscount(49.99, discount, PEPTIDE);
    expect(result.finalPrice).toBe(39.99);
    expect(result.savings).toBe(10.00);
    expect(result.discountApplied).toBe(true);
    expect(result.code).toBe('PEPTIDEX');
  });

  // ── 15% percent off ────────────────────────────────────────────────────────
  it('correctly applies a 15% discount', () => {
    const discount: VendorDiscount = {
      code: 'PEPTIDEX',
      type: 'percent',
      value: 15,
      appliesTo: 'all',
      stackable: true,
    };
    const result = applyDiscount(70, discount, PEPTIDE);
    expect(result.finalPrice).toBe(59.5);
    expect(result.savings).toBe(10.5);
    expect(result.discountApplied).toBe(true);
  });

  // ── Fixed dollar off ───────────────────────────────────────────────────────
  it('correctly applies a fixed dollar discount', () => {
    const discount: VendorDiscount = {
      code: 'SAVE10',
      type: 'fixed',
      value: 10,
      appliesTo: 'all',
      stackable: false,
    };
    const result = applyDiscount(49.99, discount, PEPTIDE);
    expect(result.finalPrice).toBe(39.99);
    expect(result.savings).toBe(10);
    expect(result.discountApplied).toBe(true);
  });

  // ── Peptide-specific code — matching slug ───────────────────────────────
  it('applies a peptide-specific code when the slug matches', () => {
    const discount: VendorDiscount = {
      code: 'BPC157OFF',
      type: 'percent',
      value: 10,
      appliesTo: ['bpc-157', 'tb-500'],
      stackable: false,
    };
    const result = applyDiscount(50, discount, 'bpc-157');
    expect(result.discountApplied).toBe(true);
    expect(result.finalPrice).toBe(45);
  });

  // ── Peptide-specific code — non-matching slug ──────────────────────────
  it('does NOT apply a peptide-specific code when the slug does not match', () => {
    const discount: VendorDiscount = {
      code: 'BPC157OFF',
      type: 'percent',
      value: 10,
      appliesTo: ['bpc-157'],
      stackable: false,
    };
    const result = applyDiscount(50, discount, 'ipamorelin');
    expect(result.discountApplied).toBe(false);
    expect(result.finalPrice).toBe(50);
    expect(result.savings).toBe(0);
    expect(result.code).toBeNull();
  });

  // ── Rounding precision ─────────────────────────────────────────────────────
  it('rounds to exactly 2 decimal places', () => {
    const discount: VendorDiscount = {
      code: 'PEPTIDEX',
      type: 'percent',
      value: 15,
      appliesTo: 'all',
      stackable: false,
    };
    const result = applyDiscount(39.99, discount, PEPTIDE);
    expect(result.finalPrice).toBe(33.99);
    expect(result.savings).toBe(6.00);
    expect(Number.isInteger(result.finalPrice * 100)).toBe(true);
  });

  // ── Clamp: savings cannot exceed list price ───────────────────────────────
  it('clamps savings so final price never goes below 0', () => {
    const discount: VendorDiscount = {
      code: 'BIGSALE',
      type: 'fixed',
      value: 200,
      appliesTo: 'all',
      stackable: false,
    };
    const result = applyDiscount(49.99, discount, PEPTIDE);
    expect(result.finalPrice).toBe(0);
    expect(result.savings).toBe(49.99);
  });
});

describe('buildVendorDiscount', () => {
  it('returns null when no code is present', () => {
    expect(buildVendorDiscount(undefined, undefined, undefined)).toBeNull();
  });

  it('returns null when code is present but percent is missing', () => {
    expect(buildVendorDiscount('PEPTIDEX', undefined, false)).toBeNull();
  });

  it('builds a valid VendorDiscount from flat vendor fields', () => {
    const result = buildVendorDiscount('PEPTIDEX', 20, false);
    expect(result).not.toBeNull();
    expect(result!.code).toBe('PEPTIDEX');
    expect(result!.type).toBe('percent');
    expect(result!.value).toBe(20);
    expect(result!.appliesTo).toBe('all');
    expect(result!.stackable).toBe(false);
  });
});
