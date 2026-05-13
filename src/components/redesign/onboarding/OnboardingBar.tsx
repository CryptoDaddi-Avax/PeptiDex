'use client';
import { trackOnboardingBarClicked } from '@/lib/analytics/onboarding';

interface OnboardingBarProps {
  resumeStep: number;
  onReopen: () => void;
  onDismiss: () => void;
}

export default function OnboardingBar({ resumeStep, onReopen, onDismiss }: OnboardingBarProps) {
  return (
    <div className="onboarding-bar" role="region" aria-label="Resume getting started guide">
      <div className="onboarding-bar__text">
        <strong>Still setting up?</strong> Pick up where you left off →
      </div>
      <button
        className="onboarding-bar__btn"
        onClick={() => {
          trackOnboardingBarClicked(resumeStep);
          onReopen();
        }}
      >
        Resume Guide
      </button>
      <button
        className="onboarding-bar__dismiss"
        onClick={onDismiss}
        aria-label="Dismiss guide bar"
      >
        ✕
      </button>
    </div>
  );
}
