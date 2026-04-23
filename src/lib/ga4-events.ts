/**
 * Centralized GA4 event tracking utilities.
 * Uses the gtag global injected by @next/third-parties/google.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Track an outbound click to a vendor's external site.
 * Fires a custom GA4 event: `outbound_click`
 */
export function trackOutboundClick(
  vendorName: string,
  url: string,
  location: string
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "outbound_click", {
      vendor_name: vendorName,
      outbound_url: url,
      click_location: location,
    });
  }
}

/**
 * Track a "Save Stack" action.
 */
export function trackSaveStack(stackName: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "save_stack", {
      stack_name: stackName,
    });
  }
}

/**
 * Track CTA engagement — when a user clicks a primary action card.
 */
export function trackCTAClick(ctaLabel: string, destination: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "cta_click", {
      cta_label: ctaLabel,
      destination: destination,
    });
  }
}
