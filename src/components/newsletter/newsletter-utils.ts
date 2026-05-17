/**
 * newsletter-utils.ts
 * Shared utilities for all newsletter signup placements.
 * All three surfaces (sticky banner, inline block, exit modal) share:
 * - The same /api/subscribe endpoint
 * - The same cookie/storage keys for dismissal state
 * - The same gtag event wrapper
 */

// ── Storage Keys ─────────────────────────────────────────────────────────────

/** localStorage: ISO timestamp when user dismissed the sticky banner (7-day TTL) */
export const NL_BANNER_DISMISSED_KEY = 'peptidex_nl_banner_dismissed';

/** localStorage: set when user successfully subscribes (permanent — suppresses all future surfaces) */
export const NL_SUBSCRIBED_KEY = 'peptidex_nl_subscribed';

/** sessionStorage: set when exit modal has been shown this session */
export const NL_EXIT_SHOWN_KEY = 'peptidex_nl_exit_shown';

/** sessionStorage: page visit counter for exit intent gating */
export const NL_PAGE_COUNT_KEY = 'peptidex_nl_page_count';

/** sessionStorage: timestamp of first page load this session (for 90s gate) */
export const NL_SESSION_START_KEY = 'peptidex_nl_session_start';

const BANNER_DISMISS_DAYS = 7;

// ── State Checks ─────────────────────────────────────────────────────────────

export function isSubscribed(): boolean {
  try {
    return localStorage.getItem(NL_SUBSCRIBED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function isBannerDismissed(): boolean {
  try {
    const stored = localStorage.getItem(NL_BANNER_DISMISSED_KEY);
    if (!stored) return false;
    const dismissedAt = new Date(stored).getTime();
    return Date.now() - dismissedAt < BANNER_DISMISS_DAYS * 86_400_000;
  } catch {
    return false;
  }
}

export function setBannerDismissed(): void {
  try {
    localStorage.setItem(NL_BANNER_DISMISSED_KEY, new Date().toISOString());
  } catch {}
}

export function setSubscribed(): void {
  try {
    localStorage.setItem(NL_SUBSCRIBED_KEY, 'true');
  } catch {}
}

export function hasExitModalShownThisSession(): boolean {
  try {
    return sessionStorage.getItem(NL_EXIT_SHOWN_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setExitModalShown(): void {
  try {
    sessionStorage.setItem(NL_EXIT_SHOWN_KEY, 'true');
  } catch {}
}

/** Increment page visit counter. Call once per page navigation. */
export function incrementPageCount(): void {
  try {
    const current = parseInt(sessionStorage.getItem(NL_PAGE_COUNT_KEY) ?? '0', 10);
    sessionStorage.setItem(NL_PAGE_COUNT_KEY, String(current + 1));
  } catch {}
}

export function getPageCount(): number {
  try {
    return parseInt(sessionStorage.getItem(NL_PAGE_COUNT_KEY) ?? '0', 10);
  } catch {
    return 0;
  }
}

export function getSessionStartMs(): number {
  try {
    const stored = sessionStorage.getItem(NL_SESSION_START_KEY);
    if (stored) return parseInt(stored, 10);
    const now = Date.now();
    sessionStorage.setItem(NL_SESSION_START_KEY, String(now));
    return now;
  } catch {
    return Date.now();
  }
}

// ── API Submit ────────────────────────────────────────────────────────────────

export type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export async function submitNewsletter(
  email: string,
  source: string
): Promise<{ ok: boolean; alreadySubscribed?: boolean }> {
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source }),
  });
  if (!res.ok) return { ok: false };
  const data = await res.json();
  return { ok: true, alreadySubscribed: data.alreadySubscribed };
}

// ── Analytics ─────────────────────────────────────────────────────────────────

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag(...args);
  }
}

export const nlAnalytics = {
  bannerViewed: () => gtag('event', 'newsletter_sticky_banner_viewed'),
  bannerDismissed: () => gtag('event', 'newsletter_sticky_banner_dismissed'),
  bannerSubmitted: () => gtag('event', 'newsletter_sticky_banner_submitted'),

  inlineViewed: () => gtag('event', 'newsletter_inline_block_viewed'),
  inlineSubmitted: () => gtag('event', 'newsletter_inline_block_submitted'),

  exitShown: () => gtag('event', 'newsletter_exit_intent_shown'),
  exitSubmitted: () => gtag('event', 'newsletter_exit_intent_submitted'),
  exitDismissed: () => gtag('event', 'newsletter_exit_intent_dismissed'),
};
