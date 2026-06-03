/**
 * Onboarding Storage — localStorage helpers
 *
 * KEPT:
 *  - getOnboardingState  — called by OnboardingAccordion
 *  - getOnboardingStep   — generic state read
 *  - setEngaged          — called by OnboardingAccordion on first open
 *  - setCompleted        — reserved for future accordion completion wiring
 *  - resetOnboarding     — dev/debug utility
 *
 * PRUNED (modal-stepper specific, no callers):
 *  setDismissed, setOnboardingStep
 */

export const LS_ONBOARDING_STATE = 'peptidex_onboarding_state';
export const LS_ONBOARDING_STEP = 'peptidex_onboarding_step';
export const LS_ONBOARDING_TS = 'peptidex_onboarding_ts';
export const LS_ONBOARDING_COMPLETED = 'peptidex_onboarding_completed';

export type OnboardingState = 'new' | 'engaged' | 'completed' | 'dismissed';

function safeSet(key: string, value: string) {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Ignore write errors (e.g., private browsing)
    }
  }
}

function safeGet(key: string): string | null {
  if (typeof window !== 'undefined') {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }
  return null;
}

function safeRemove(key: string) {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore errors
    }
  }
}

export function getOnboardingState(): OnboardingState {
  const state = safeGet(LS_ONBOARDING_STATE) as OnboardingState;
  if (!state) return 'new';
  return state;
}

export function getOnboardingStep(): number {
  const step = safeGet(LS_ONBOARDING_STEP);
  return step ? parseInt(step, 10) : 0;
}

export function setEngaged() {
  safeSet(LS_ONBOARDING_STATE, 'engaged');
  safeSet(LS_ONBOARDING_TS, new Date().toISOString());
}

export function setCompleted() {
  safeSet(LS_ONBOARDING_COMPLETED, 'true');
  safeSet(LS_ONBOARDING_STATE, 'completed');
  safeSet(LS_ONBOARDING_TS, new Date().toISOString());
}

export function resetOnboarding() {
  safeRemove(LS_ONBOARDING_STATE);
  safeRemove(LS_ONBOARDING_STEP);
  safeRemove(LS_ONBOARDING_TS);
  safeRemove(LS_ONBOARDING_COMPLETED);
}
