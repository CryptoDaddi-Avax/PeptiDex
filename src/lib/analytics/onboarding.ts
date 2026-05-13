/**
 * Onboarding Analytics — GA4 event helpers
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

export function trackOnboardingViewed() {
  fire('onboarding_viewed');
}

export function trackOnboardingStarted(source: 'hero_block' | 'bar' | 'deep_link') {
  fire('onboarding_started', { source });
}

export function trackOnboardingStepViewed(payload: {
  step_number: number;
  step_name: string;
  time_on_previous_step_ms: number;
}) {
  fire('onboarding_step_viewed', payload);
}

export function trackOnboardingStepCompleted(payload: {
  step_number: number;
  step_name: string;
  dwell_time_ms: number;
}) {
  fire('onboarding_step_completed', payload);
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

export function trackOnboardingToolLaunched(payload: {
  tool: string;
  step_number: number;
}) {
  fire('onboarding_tool_launched', payload);
}

export function trackOnboardingCompleted(payload: {
  total_time_ms: number;
  steps_viewed: number[];
  affiliate_clicks: number;
}) {
  fire('onboarding_completed', payload);
}

export function trackOnboardingDismissed(payload: {
  dismissed_at_step: number;
  total_time_ms: number;
}) {
  fire('onboarding_dismissed', payload);
}

// Keeping the bar metrics around, unless they're not needed
export function trackOnboardingBarShown(returning_after_days: number) {
  fire('onboarding_bar_shown', { returning_after_days });
}

export function trackOnboardingBarClicked(resume_step: number) {
  fire('onboarding_bar_clicked', { resume_step });
}
