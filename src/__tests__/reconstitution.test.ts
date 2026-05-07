import {
  calculateReconstitution,
  validateReconstitutionInputs,
  formatConcentration,
  getSyringeProfile,
  SYRINGE_PROFILES,
} from '@/lib/calc/reconstitution';

const syringe1mL = getSyringeProfile('1mL_100u');
const syringe05mL = getSyringeProfile('0.5mL_50u');

// ── Core scenarios from spec ──────────────────────────────────────────────────

describe('calculateReconstitution — spec scenarios', () => {
  test('Scenario 1: 5mg + 2mL + 250mcg + 1mL/100u → 10 units', () => {
    const result = calculateReconstitution({
      vialMg: 5, bacWaterMl: 2, targetDoseMcg: 250, syringe: syringe1mL,
    });
    expect(result.concentrationMcgPerMl).toBe(2500);
    expect(result.dispenseMl).toBeCloseTo(0.1, 6);
    expect(result.syringeUnitsRounded).toBe(10);
    expect(result.exceedsCapacity).toBe(false);
  });

  test('Scenario 2: 10mg + 3mL + 500mcg + 1mL/100u → 15 units', () => {
    const result = calculateReconstitution({
      vialMg: 10, bacWaterMl: 3, targetDoseMcg: 500, syringe: syringe1mL,
    });
    expect(result.concentrationMcgPerMl).toBeCloseTo(3333.3333, 3);
    expect(result.dispenseMl).toBeCloseTo(0.15, 6);
    expect(result.syringeUnitsRounded).toBe(15);
    expect(result.exceedsCapacity).toBe(false);
  });

  test('Scenario 2 on 0.5mL syringe: volume fits, still 15 units on standard scale', () => {
    const result = calculateReconstitution({
      vialMg: 10, bacWaterMl: 3, targetDoseMcg: 500, syringe: syringe05mL,
    });
    expect(result.syringeUnitsRounded).toBe(15);
    expect(result.exceedsCapacity).toBe(false); // 0.15mL < 0.5mL cap
  });

  test('Scenario 3: 2mg + 1mL + 300mcg + 1mL/100u → 15 units', () => {
    const result = calculateReconstitution({
      vialMg: 2, bacWaterMl: 1, targetDoseMcg: 300, syringe: syringe1mL,
    });
    expect(result.concentrationMcgPerMl).toBe(2000);
    expect(result.dispenseMl).toBeCloseTo(0.15, 6);
    expect(result.syringeUnitsRounded).toBe(15);
  });
});

// ── Edge cases ────────────────────────────────────────────────────────────────

describe('calculateReconstitution — edge cases', () => {
  test('Zero dose → 0 mL dispense, 0 units', () => {
    const result = calculateReconstitution({
      vialMg: 5, bacWaterMl: 2, targetDoseMcg: 0, syringe: syringe1mL,
    });
    expect(result.dispenseMl).toBe(0);
    expect(result.syringeUnits).toBe(0);
    expect(result.syringeUnitsRounded).toBe(0);
    expect(result.exceedsCapacity).toBe(false);
  });

  test('Large dose exceeding syringe capacity flags exceedsCapacity', () => {
    // 1mg + 10mL → 100mcg/mL. 800mcg target → 8mL → far exceeds 1mL
    const result = calculateReconstitution({
      vialMg: 1, bacWaterMl: 10, targetDoseMcg: 800, syringe: syringe1mL,
    });
    expect(result.exceedsCapacity).toBe(true);
  });

  test('Dose exceeds 0.5mL syringe capacity but fits 1mL syringe', () => {
    // 5mg + 2mL → 2500 mcg/mL; 1500mcg → 0.6mL → exceeds 0.5mL cap
    const result05 = calculateReconstitution({
      vialMg: 5, bacWaterMl: 2, targetDoseMcg: 1500, syringe: syringe05mL,
    });
    const result1 = calculateReconstitution({
      vialMg: 5, bacWaterMl: 2, targetDoseMcg: 1500, syringe: syringe1mL,
    });
    expect(result05.exceedsCapacity).toBe(true);
    expect(result1.exceedsCapacity).toBe(false);
  });

  test('Very small dose produces correct fractional units', () => {
    // 10mg + 2mL → 5000 mcg/mL; 25mcg → 0.005mL → 0.5 units
    const result = calculateReconstitution({
      vialMg: 10, bacWaterMl: 2, targetDoseMcg: 25, syringe: syringe1mL,
    });
    expect(result.dispenseMl).toBeCloseTo(0.005, 6);
    expect(result.syringeUnits).toBeCloseTo(0.5, 1);
  });

  test('Float precision: no off-by-one in graduation units', () => {
    // Known float-prone: 5mg + 3mL + 100mcg
    // concentration = 1666.6666..., dispense = 0.059999...
    const result = calculateReconstitution({
      vialMg: 5, bacWaterMl: 3, targetDoseMcg: 100, syringe: syringe1mL,
    });
    expect(result.dispenseMl).toBeCloseTo(0.06, 6);
    expect(result.syringeUnitsRounded).toBe(6);
  });
});

// ── Validation ────────────────────────────────────────────────────────────────

describe('validateReconstitutionInputs', () => {
  test('Valid inputs → null', () => {
    expect(validateReconstitutionInputs(5, 2, 250)).toBeNull();
  });
  test('Zero vial → error', () => {
    expect(validateReconstitutionInputs(0, 2, 250)).toBe('VIAL_ZERO_OR_NEGATIVE');
  });
  test('Negative vial → error', () => {
    expect(validateReconstitutionInputs(-1, 2, 250)).toBe('VIAL_ZERO_OR_NEGATIVE');
  });
  test('Zero water → error', () => {
    expect(validateReconstitutionInputs(5, 0, 250)).toBe('WATER_ZERO_OR_NEGATIVE');
  });
  test('Negative water → error', () => {
    expect(validateReconstitutionInputs(5, -1, 250)).toBe('WATER_ZERO_OR_NEGATIVE');
  });
  test('Negative dose → error', () => {
    expect(validateReconstitutionInputs(5, 2, -10)).toBe('DOSE_NEGATIVE');
  });
  test('Zero dose is valid (no injection needed)', () => {
    expect(validateReconstitutionInputs(5, 2, 0)).toBeNull();
  });
});

// ── Syringe profiles ──────────────────────────────────────────────────────────

describe('SYRINGE_PROFILES', () => {
  test('All profiles have consistent unitsPerMl × maxMl = maxUnits', () => {
    SYRINGE_PROFILES.forEach(s => {
      expect(s.unitsPerMl * s.maxMl).toBe(s.maxUnits);
    });
  });
});

// ── formatConcentration ───────────────────────────────────────────────────────

describe('formatConcentration', () => {
  test('Whole number → no decimal', () => {
    expect(formatConcentration(2500)).toBe('2,500');
  });
  test('Non-integer → 1 decimal', () => {
    expect(formatConcentration(3333.3)).toBe('3,333.3');
  });
  test('Ends in .0 → strips trailing zero', () => {
    expect(formatConcentration(1666.0)).toBe('1,666');
  });
});
