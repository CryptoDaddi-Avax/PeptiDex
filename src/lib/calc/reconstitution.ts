/**
 * Reconstitution Calculator — Pure Functions
 * ==========================================
 * All math is isolated here for testability.
 * No React, no side effects.
 */

export interface SyringeProfile {
  id: string;
  label: string;
  /** Units per mL (graduation density). Standard insulin syringes = 100 u/mL */
  unitsPerMl: number;
  /** Max capacity in mL */
  maxMl: number;
  /** Max units displayed on scale */
  maxUnits: number;
}

export const SYRINGE_PROFILES: readonly SyringeProfile[] = [
  { id: '1mL_100u',  label: '1 mL / 100u',  unitsPerMl: 100, maxMl: 1.0, maxUnits: 100 },
  { id: '0.5mL_50u', label: '0.5 mL / 50u', unitsPerMl: 100, maxMl: 0.5, maxUnits: 50  },
  { id: '0.3mL_30u', label: '0.3 mL / 30u', unitsPerMl: 100, maxMl: 0.3, maxUnits: 30  },
] as const;

export function getSyringeProfile(id: string): SyringeProfile {
  return SYRINGE_PROFILES.find(s => s.id === id) ?? SYRINGE_PROFILES[0];
}

export interface ReconstitutionInput {
  vialMg: number;
  bacWaterMl: number;
  targetDoseMcg: number;
  syringe: SyringeProfile;
}

export interface ReconstitutionResult {
  concentrationMcgPerMl: number;
  dispenseMl: number;
  /** Floating-point units for display (e.g. 7.5) */
  syringeUnits: number;
  /** Nearest whole unit (for SVG positioning) */
  syringeUnitsRounded: number;
  /** True if dispense volume exceeds syringe capacity */
  exceedsCapacity: boolean;
}

export type ReconstitutionError =
  | 'VIAL_ZERO_OR_NEGATIVE'
  | 'WATER_ZERO_OR_NEGATIVE'
  | 'DOSE_NEGATIVE';

/**
 * Validates inputs. Returns an error key or null if valid.
 */
export function validateReconstitutionInputs(
  vialMg: number,
  bacWaterMl: number,
  targetDoseMcg: number,
): ReconstitutionError | null {
  if (vialMg <= 0) return 'VIAL_ZERO_OR_NEGATIVE';
  if (bacWaterMl <= 0) return 'WATER_ZERO_OR_NEGATIVE';
  if (targetDoseMcg < 0) return 'DOSE_NEGATIVE';
  return null;
}

export const RECONSTITUTION_ERROR_MESSAGES: Record<ReconstitutionError, string> = {
  VIAL_ZERO_OR_NEGATIVE: 'Vial mass must be greater than 0 mg.',
  WATER_ZERO_OR_NEGATIVE: 'Diluent volume must be greater than 0 mL.',
  DOSE_NEGATIVE: 'Target dose cannot be negative.',
};

/**
 * Core calculation. Assumes inputs are already validated (vialMg > 0, bacWaterMl > 0, targetDoseMcg >= 0).
 *
 * Float precision: uses parseFloat + toFixed(10) before further arithmetic to
 * eliminate IEEE 754 rounding artifacts (e.g. 0.15000000000000002 → 0.15).
 */
export function calculateReconstitution(input: ReconstitutionInput): ReconstitutionResult {
  const { vialMg, bacWaterMl, targetDoseMcg, syringe } = input;

  const concentrationMcgPerMl = (vialMg * 1000) / bacWaterMl;

  // Fix float precision on concentration before dividing
  const concentrationSafe = parseFloat(concentrationMcgPerMl.toFixed(10));
  const dispenseMl = parseFloat((targetDoseMcg / concentrationSafe).toFixed(10));

  // Compute syringe units, round to 1 decimal to avoid .9999 artifacts
  const rawUnits = dispenseMl * syringe.unitsPerMl;
  const syringeUnits = Math.round(rawUnits * 10) / 10;
  const syringeUnitsRounded = Math.round(syringeUnits);

  const exceedsCapacity = dispenseMl > syringe.maxMl;

  return {
    concentrationMcgPerMl: concentrationSafe,
    dispenseMl,
    syringeUnits,
    syringeUnitsRounded,
    exceedsCapacity,
  };
}

/**
 * Formats concentration for display. Shows whole number if clean, 1 decimal otherwise.
 */
export function formatConcentration(value: number): string {
  return Number.isInteger(value)
    ? value.toLocaleString()
    : value.toFixed(1).replace(/\.0$/, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
