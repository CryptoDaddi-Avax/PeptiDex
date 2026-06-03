import Link from 'next/link';
import './DisclaimerBar.css';

/**
 * DisclaimerBar — v13 "Research Use Only" fixed bar.
 * Sits at the very top of the viewport, above the promo banner and nav.
 * Matches /_design-reference/v13/ disclaimer-bar markup exactly.
 * Not dismissible (v13 reference keeps it persistent).
 */
export default function DisclaimerBar() {
  return (
    <div className="disclaimer-bar" role="note">
      <span className="warn">⚠ Research Use Only</span>
      <span className="dim verbose">— Not FDA-approved for human use. Not medical advice.</span>
      <Link href="/disclaimers">Full disclaimers →</Link>
    </div>
  );
}
