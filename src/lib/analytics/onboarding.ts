/**
 * Onboarding Analytics — GA4 event helpers
 *
 * KEPT:
 *  - trackOnboardingStarted  — fired by OnboardingAccordion on first open
 *  - trackAffiliateClicked   — fired by OnboardingAccordion on supply link clicks
 *  - trackOnboardingCompleted — reserved for future accordion completion wiring
 *  - trackVendorClicked      — generic site-wide vendor click tracking
 *
 * PRUNED (modal-stepper specific, no callers):
 *  trackOnboardingViewed, trackOnboardingStepViewed, trackOnboardingStepCompleted,
 *  trackOnboardingDismissed, trackOnboardingBarShown, trackOnboardingBarClicked,
 *  trackOnboardingToolLaunched
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function fire(event: string, params: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, {
      ...params,
      source_page: window.location.pathname,
    });
  }
}

export function trackOnboardingStarted(source: 'hero_block' | 'bar' | 'deep_link') {
  fire('onboarding_started', { source });
}

export function trackAffiliateClicked(payload: {
  vendor: string;
  product: string;
  url: string;
}) {
  fire('affiliate_clicked', {
    ...payload,
    source_component: 'onboarding_supplies',
  });
}

export function trackVendorClicked(payload: {
  vendor: string;
  url: string;
}) {
  fire('vendor_clicked', {
    ...payload,
    source_component: 'onboarding_vendors',
  });
}

export function trackOnboardingCompleted(payload: {
  total_time_ms: number;
  steps_viewed: number[];
  affiliate_clicks: number;
}) {
  fire('onboarding_completed', payload);
}
