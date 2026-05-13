'use client';
import type { ReactNode } from 'react';

// Controls whether emoji icons render globally.
// Set to false to suppress all step callout emoji site-wide.
const SHOW_CALLOUT_EMOJI = true;

interface StepCalloutProps {
  /** Optional emoji or ReactNode icon rendered at the start of the callout. */
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * StepCallout — "Why this matters" block used in every onboarding step.
 *
 * Usage:
 *   <StepCallout icon="⚠">
 *     <strong>Why this matters:</strong> ...
 *   </StepCallout>
 *
 * To disable emoji site-wide: set SHOW_CALLOUT_EMOJI = false above.
 * To hide a single callout's icon: omit the icon prop.
 */
export default function StepCallout({ icon, children }: StepCalloutProps) {
  return (
    <div className="step-callout" role="note">
      {SHOW_CALLOUT_EMOJI && icon && (
        <span className="step-callout__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="step-callout__body">{children}</div>
    </div>
  );
}
