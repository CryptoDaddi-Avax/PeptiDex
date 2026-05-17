'use client';

import { useEffect, useRef, useState } from 'react';
import './NewsletterInlineBlock.css';
import {
  isSubscribed,
  setSubscribed,
  submitNewsletter,
  nlAnalytics,
  type SubmitState,
} from './newsletter-utils';

export function NewsletterInlineBlock() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitState>('idle');
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const blockRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  // Fire inline_viewed once on intersection
  useEffect(() => {
    if (!blockRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTrackedView.current) {
          hasTrackedView.current = true;
          nlAnalytics.inlineViewed();
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(blockRef.current);
    return () => obs.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');

    try {
      const { ok, alreadySubscribed: already } = await submitNewsletter(email, 'inline_homepage');
      if (ok) {
        setStatus('success');
        setAlreadySubscribed(already ?? false);
        if (!already) {
          setSubscribed();
          nlAnalytics.inlineSubmitted();
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      className="nl-inline"
      id="newsletter-inline"
      ref={blockRef}
      aria-label="Newsletter signup"
    >
      <div className="nl-inline-inner">
        {/* Copy */}
        <div className="nl-inline-copy">
          <span className="nl-inline-eyebrow">§ Stay Current</span>
          <h2 className="nl-inline-headline">
            Get the next issue of <em>The Peptide Brief</em>
          </h2>
          <p className="nl-inline-body">
            Twice a month: new research summaries, vendor pricing updates, and protocol
            analyses. Read by researchers and biohackers.
          </p>
        </div>

        {/* Form */}
        <div className="nl-inline-form-wrap">
          {status === 'success' ? (
            <div className="nl-inline-success">
              <span className="nl-inline-success-icon">✓</span>
              <span>
                {alreadySubscribed
                  ? "You're already on the list."
                  : "You're in. First issue coming soon."}
              </span>
            </div>
          ) : (
            <>
              <form className="nl-inline-form" onSubmit={handleSubmit} noValidate>
                <input
                  type="email"
                  inputMode="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="nl-inline-input"
                  aria-label="Email address"
                  id="nl-inline-email"
                  autoComplete="email"
                />
                <button
                  type="submit"
                  disabled={!email || status === 'loading'}
                  className="nl-inline-submit"
                  id="nl-inline-submit"
                >
                  {status === 'loading' ? '…' : 'Subscribe →'}
                </button>
              </form>
              {status === 'error' && (
                <p className="nl-inline-error">Something went wrong. Try again.</p>
              )}
              <p className="nl-inline-fine">No spam. Unsubscribe anytime.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
