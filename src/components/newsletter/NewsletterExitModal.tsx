'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import './NewsletterExitModal.css';
import {
  isSubscribed,
  isBannerDismissed,
  hasExitModalShownThisSession,
  setExitModalShown,
  getPageCount,
  getSessionStartMs,
  setSubscribed,
  submitNewsletter,
  nlAnalytics,
  type SubmitState,
} from './newsletter-utils';

const MIN_TIME_ON_SITE_MS = 90_000; // 90 seconds
const MIN_PAGES_VISITED = 2;

interface NewsletterExitModalProps {
  /** ?testExitIntent=1 forces the modal open immediately for screenshot capture */
  forceOpen?: boolean;
}

export function NewsletterExitModal({ forceOpen = false }: NewsletterExitModalProps) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitState>('idle');
  const triggered = useRef(false);

  const tryTrigger = useCallback(() => {
    if (triggered.current) return;

    // Gate 1: already subscribed
    if (isSubscribed()) return;
    // Gate 2: banner dismissed this session (user has already signaled low interest)
    if (isBannerDismissed()) return;
    // Gate 3: modal already shown this session
    if (hasExitModalShownThisSession()) return;
    // Gate 4: not enough time on site
    if (Date.now() - getSessionStartMs() < MIN_TIME_ON_SITE_MS) return;
    // Gate 5: not enough pages visited
    if (getPageCount() < MIN_PAGES_VISITED) return;

    triggered.current = true;
    setExitModalShown();
    setShow(true);
    nlAnalytics.exitShown();
  }, []);

  useEffect(() => {
    // Force-open for screenshot capture via ?testExitIntent=1
    if (forceOpen) {
      triggered.current = true;
      setExitModalShown();
      setShow(true);
      nlAnalytics.exitShown();
      return;
    }

    // Initialize session start timestamp
    getSessionStartMs();

    // Desktop: mouse leaves top of viewport
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) tryTrigger();
    }
    document.addEventListener('mouseleave', handleMouseLeave);

    // Mobile: tab switch / visibility change
    function handleVisibility() {
      if (document.hidden) tryTrigger();
    }
    document.addEventListener('visibilitychange', handleVisibility);

    // Escape key to close if open
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && show) handleDismiss();
    }
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('keydown', handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceOpen, tryTrigger, show]);

  function handleDismiss() {
    setShow(false);
    nlAnalytics.exitDismissed();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');

    try {
      const { ok } = await submitNewsletter(email, 'exit_intent');
      if (ok) {
        setStatus('success');
        setSubscribed();
        nlAnalytics.exitSubmitted();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="nl-modal-backdrop"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="nl-exit-headline"
        className="nl-modal"
      >
        <div className="nl-modal-accent" />

        <button
          onClick={handleDismiss}
          className="nl-modal-close"
          aria-label="Close newsletter modal"
          id="nl-exit-close"
        >
          ×
        </button>

        <div className="nl-modal-body">
          {status === 'success' ? (
            <div className="nl-modal-success">
              <span className="nl-modal-success-icon">📬</span>
              <h2 className="nl-modal-success-headline">You&apos;re in.</h2>
              <p className="nl-modal-success-body">
                First issue of The Peptide Brief coming soon.
              </p>
            </div>
          ) : (
            <>
              <span className="nl-modal-eyebrow">Before you go</span>
              <h2 className="nl-modal-headline" id="nl-exit-headline">
                Get the next <em>Peptide Brief</em>
              </h2>
              <p className="nl-modal-description">
                We publish a research-grounded peptide newsletter twice a month.
                Verified vendor pricing, new study summaries, no fluff.
              </p>

              <form className="nl-modal-form" onSubmit={handleSubmit} noValidate>
                <input
                  type="email"
                  inputMode="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="nl-modal-input"
                  aria-label="Email address"
                  id="nl-exit-email"
                  autoComplete="email"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!email || status === 'loading'}
                  className="nl-modal-submit"
                  id="nl-exit-submit"
                >
                  {status === 'loading' ? '…' : 'Subscribe to The Peptide Brief'}
                </button>
                {status === 'error' && (
                  <p className="nl-modal-error">Something went wrong. Please try again.</p>
                )}
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="nl-modal-dismiss-link"
                  id="nl-exit-no-thanks"
                >
                  No thanks, I&apos;ll check back.
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
