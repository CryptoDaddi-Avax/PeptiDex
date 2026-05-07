/**
 * Promo Analytics Events
 * ======================
 * Thin wrapper around window.gtag for all promo-code conversion surfaces.
 * Consistent property schema across every surface for clean GA4 reporting.
 *
 * All events include:
 *   - vendor      (gaKey: amino_club, bio_longevity_labs, etc.)
 *   - code        (PEPTIDEX)
 *   - surface     (sticky_banner, exit_intent_modal, etc.)
 *   - page_path   (window.location.pathname)
 *   - is_return_visitor (boolean string)
 *
 * No PII is tracked. All identifiers are anonymous.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

interface PromoEventBase {
  vendor: string;
  code: string;
  surface: string;
  is_return_visitor?: boolean;
}

function fireEvent(name: string, params: PromoEventBase | Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, {
    page_path: window.location.pathname,
    ...params,
  });
}

// ── Event Fires ───────────────────────────────────────────────────────────────

/** Fires when a PromoCodeDisplay component enters the viewport */
export function trackPromoView(p: PromoEventBase) {
  fireEvent("promo_code_view", p);
}

/** Fires when user clicks the copy-to-clipboard button */
export function trackPromoCopy(p: PromoEventBase) {
  fireEvent("promo_code_copy", p);
}

/** Fires when user clicks the "Shop now" CTA from a promo block */
export function trackPromoClick(p: PromoEventBase) {
  fireEvent("promo_code_click", p);
}

/** Fires when the sticky banner is shown */
export function trackBannerShown(p: PromoEventBase) {
  fireEvent("banner_shown", p);
}

/** Fires when user dismisses the sticky banner */
export function trackBannerDismissed(p: PromoEventBase) {
  fireEvent("banner_dismissed", p);
}

/** Fires when exit-intent modal appears */
export function trackExitIntentShown(p: PromoEventBase) {
  fireEvent("exit_intent_shown", p);
}

/** Fires when user dismisses the exit-intent modal (X or "continue browsing") */
export function trackExitIntentDismissed(p: PromoEventBase) {
  fireEvent("exit_intent_dismissed", p);
}

/** Fires when user clicks the Shop CTA inside the exit-intent modal */
export function trackExitIntentClicked(p: PromoEventBase) {
  fireEvent("exit_intent_clicked", p);
}

/** Fires when user checks "Don't show again" in the exit-intent modal */
export function trackExitIntentDontShowAgain(p: PromoEventBase) {
  fireEvent("exit_intent_dont_show_again", p);
}

/** Fires when personalized hero variant is served to a return visitor */
export function trackHeroVariant(variant: "first_visit" | "return_visitor") {
  fireEvent("hero_variant_served", { variant });
}
