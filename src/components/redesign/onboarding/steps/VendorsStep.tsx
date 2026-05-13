'use client';
import Link from 'next/link';
import { vendorsSorted } from '@/data/vendors';
import { trackVendorClicked, trackOnboardingToolLaunched } from '@/lib/analytics/onboarding';
import StepCallout from '../StepCallout';

export default function VendorsStep() {
  // Show all 6 vendors, Amino Club first (already sorted by sortOrder)
  const vendors = vendorsSorted;

  const handleVendorClick = (v: typeof vendors[0]) => {
    trackVendorClicked({ vendor: v.name, url: v.affiliateUrl });
  };

  return (
    <div className="onboarding-step" role="tabpanel" aria-labelledby="step-2-title">
      <h3 className="onboarding-step__title" id="step-2-title">
        Trusted <em>Vendor</em> Sources
      </h3>
      <p className="onboarding-step__subtitle">
        Not all peptide suppliers are equal. We independently review every vendor on this list —
        verifying batch-level Certificates of Analysis, testing purity claims, and monitoring
        community feedback. These are the only sources that passed.
      </p>

      <StepCallout icon="🔬">
        <strong>Why this matters:</strong> Under-dosed or contaminated peptides don&apos;t just
        waste money — they produce unreliable research data. A third-party COA is the only way to
        verify what&apos;s actually in the vial.
      </StepCallout>

      {/* Explicit legal/factual disclaimer — required above any vendor links */}
      <div className="vendor-disclaimer" role="note">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <span>
          <strong>PeptiDex does not sell peptides.</strong> Vendors listed below offer
          research-use products only. Always request and verify a third-party Certificate of
          Analysis before purchasing. This is not medical advice.
        </span>
      </div>

      <div className="vendor-mini-grid">
        {vendors.map((v) => (
          <a
            key={v.slug}
            href={v.affiliateUrl}
            target="_blank"
            onClick={() => handleVendorClick(v)}
            rel={`nofollow noopener${
              v.affiliateUrl.includes('utm_source=affiliate') ||
              v.affiliateUrl.includes('aff_c') ||
              v.affiliateUrl.includes('/ref/') ||
              v.affiliateUrl.includes('/partner/')
                ? ' sponsored'
                : ''
            }`}
            className={`vendor-mini-card${v.sortOrder === 1 ? ' vendor-mini-card--featured' : ''}`}
          >
            {v.badge && (
              <span className="vendor-mini-card__badge">{v.badge}</span>
            )}
            <div className="vendor-mini-card__name">{v.name}</div>
            <div className="vendor-mini-card__rating">
              <span className="star">★</span> {v.rating} · {v.ratingCount} reviews
            </div>
            <div className="vendor-mini-card__purity">{v.purity} purity verified</div>
            {v.discountCode && (
              <div className="vendor-mini-card__cta">
                Code {v.discountCode} → {v.discountPercent}% off
              </div>
            )}
          </a>
        ))}
      </div>

      <div className="recon-cta" style={{ marginTop: 24 }}>
        <Link
          href="/vendors"
          className="onboarding-nav__btn onboarding-nav__btn--secondary"
          onClick={() => trackOnboardingToolLaunched({ tool: 'vendors', step_number: 2 })}
        >
          Compare all vendors →
        </Link>
        <Link
          href="/tools/coa"
          className="onboarding-nav__btn onboarding-nav__btn--secondary"
          onClick={() => trackOnboardingToolLaunched({ tool: 'coa', step_number: 2 })}
        >
          Verify a COA →
        </Link>
      </div>
    </div>
  );
}
