'use client';

import { useState, useEffect, useRef } from 'react';
import './NewsletterStickyBanner.css';
import {
  isSubscribed,
  isBannerDismissed,
  setBannerDismissed,
  setSubscribed,
  submitNewsletter,
  nlAnalytics,
  type SubmitState,
} from './newsletter-utils';

/** Paths where the newsletter banner is suppressed */
const SUPPRESSED_PATHS = ['/admin', '/legal', '/corrections', '/editorial-process'];

function isSuppressedPath(path: string): boolean {
  return SUPPRESSED_PATHS.some((p) => path.startsWith(p));
}

export function NewsletterStickyBanner() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitState>('idle');
  const hasTrackedView = useRef(false);

  useEffect(() => {
    // Gate: not subscribed, not recently dismissed, not suppressed path
    if (isSubscribed()) return;
    if (isBannerDismissed()) return;
    if (isSuppressedPath(window.location.pathname)) return;

    setVisible(true);

    if (!hasTrackedView.current) {
      hasTrackedView.current = true;
      nlAnalytics.bannerViewed();
    }
  }, []);

  function handleDismiss() {
    setVisible(false);
    setBannerDismissed();
    nlAnalytics.bannerDismissed();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');

    try {
      const { ok } = await submitNewsletter(email, 'sticky_banner');
      if (ok) {
        setStatus('success');
        setSubscribed();
        nlAnalytics.bannerSubmitted();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (!visible) return null;

  return (
    <div className="nl-banner" role="complementary" aria-label="Newsletter signup">
      <div className="nl-banner-inner">
        <span className="nl-banner-icon" aria-hidden="true">📬</span>

        <span className="nl-banner-copy">
          <strong>Get The Peptide Brief</strong> — bi-weekly research updates, no spam.
        </span>

        {status === 'success' ? (
          <span className="nl-banner-success">✓ You&apos;re in. First issue coming soon.</span>
        ) : (
          <form className="nl-banner-form" onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              inputMode="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="nl-banner-input"
              aria-label="Email address"
              id="nl-banner-email"
              autoComplete="email"
            />
            <button
              type="submit"
              disabled={!email || status === 'loading'}
              className="nl-banner-submit"
              id="nl-banner-submit"
            >
              {status === 'loading' ? '…' : 'Subscribe'}
            </button>
          </form>
        )}

        <button
          onClick={handleDismiss}
          className="nl-banner-dismiss"
          aria-label="Dismiss newsletter banner"
          id="nl-banner-dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
