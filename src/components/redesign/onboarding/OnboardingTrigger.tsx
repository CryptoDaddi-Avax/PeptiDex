'use client';

import { useEffect, useRef } from 'react';
import { trackOnboardingViewed } from '@/lib/analytics/onboarding';

interface OnboardingTriggerProps {
  onOpen: () => void;
}

export default function OnboardingTrigger({ onOpen }: OnboardingTriggerProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      trackOnboardingViewed();
      hasTracked.current = true;
    }
  }, []);

  return (
    <button
      className="onboarding-trigger"
      onClick={onOpen}
      aria-expanded={false}
      aria-controls="onboarding-stepper"
      id="onboarding-trigger"
    >
      <div className="onboarding-trigger__badge">5-STEP GUIDE</div>
      <div className="onboarding-trigger__inner">
        <div className="onboarding-trigger__icon">🧬</div>
        <div className="onboarding-trigger__text">
          <h3>New to <em>peptides</em>? Start here.</h3>
          <p>Skip the guesswork — supplies, sourcing, reconstitution, and safe injection in one guided walkthrough.</p>
          {/* New slot: reassurance microcopy */}
          <p className="onboarding-trigger__reassurance">
            Free · 4 minutes · No account required
          </p>
        </div>
        <div className="onboarding-trigger__arrow">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </button>
  );
}
