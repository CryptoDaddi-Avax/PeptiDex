'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { SUPPLY_PRODUCTS, STEPS } from './onboarding/onboarding-data';
import { PRIMARY_PROMO } from '@/lib/promos/config';
import { buildAffiliateUrl, AFFILIATE_LINK_ATTRS } from '@/lib/promos/affiliateUrl';
import {
  getOnboardingState,
  setEngaged,
} from '@/lib/storage/onboarding';
import {
  trackOnboardingStarted,
  trackAffiliateClicked,
} from '@/lib/analytics/onboarding';
import './OnboardingAccordion.css';

// ── SVG atoms ──────────────────────────────────────────────────────────────────

const ChevronDown = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowUpRight = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckMark = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Component ──────────────────────────────────────────────────────────────────

/**
 * OnboardingAccordion — v13 inline #getting-started section.
 *
 * Replaces the old modal-based OnboardingStepper with an inline <details>
 * accordion. Step 01 expands into a supplies checklist with affiliate links;
 * steps 02, 03, 05 are nav links; step 04 is static (no page yet).
 *
 * DATA LAYER:
 *  - BAC water link is built via buildAffiliateUrl(PRIMARY_PROMO, 'onboarding_supplies')
 *    sourced from src/data/vendors.ts — NOT hardcoded.
 *  - Amazon links come from onboarding-data.ts SUPPLY_PRODUCTS.
 *
 * ANALYTICS:
 *  - trackOnboardingStarted() fires on first <details> toggle.
 *  - trackAffiliateClicked() fires on supply link clicks.
 *  - getOnboardingState() + setEngaged() manage localStorage state.
 */
export default function OnboardingAccordion() {
  const hasFiredStart = useRef(false);

  // Build the BAC water affiliate URL from the data layer
  const bacWaterUrl = buildAffiliateUrl(PRIMARY_PROMO, 'onboarding_supplies');

  // On first accordion toggle, fire onboarding analytics + persist engagement
  function handleToggle(e: React.SyntheticEvent<HTMLDetailsElement>) {
    const details = e.currentTarget;
    if (details.open && !hasFiredStart.current) {
      hasFiredStart.current = true;
      const state = getOnboardingState();
      if (state === 'new') {
        setEngaged();
        trackOnboardingStarted('hero_block');
      }
    }
  }

  // Fire affiliate click event for supply products
  function handleAffiliateClick(product: typeof SUPPLY_PRODUCTS[number]) {
    trackAffiliateClicked({
      vendor: product.vendor === 'amino_club' ? 'amino_club' : 'amazon',
      product: product.gaProductKey,
      url: product.vendor === 'amino_club' ? bacWaterUrl : product.href,
    });
  }

  // Check if already engaged on mount — skip re-firing
  useEffect(() => {
    const state = getOnboardingState();
    if (state === 'engaged' || state === 'completed') {
      hasFiredStart.current = true;
    }
  }, []);

  const step01 = STEPS[0];

  return (
    <section className="gs-section sec" id="getting-started" aria-label="Getting started with peptide research">
      <div className="sec-inner">
        <header className="sec-head">
          <div className="section-rule fade-up" aria-hidden="true">
            <span className="rule-line" />
            <span className="rule-mark">§<span className="num">07</span></span>
            <span className="rule-line" />
          </div>
          <p className="sec-eyebrow fade-up" style={{ '--delay': '60ms' } as React.CSSProperties}>FIRST VIAL</p>
          <h2 className="sec-h2 fade-up" style={{ '--delay': '140ms' } as React.CSSProperties}>
            Getting started, <span className="em">step by step</span>.
          </h2>
          <p className="sec-sub fade-up" style={{ '--delay': '240ms' } as React.CSSProperties}>
            Five steps from an empty vial to safe, sterile research practice — beginning with everything you need on hand.
          </p>
        </header>

        <ol className="gs-steps stagger-children">

          {/* ── STEP 01: Supplies Checklist (accordion) ── */}
          <li className="gs-step">
            <details className="gs-acc" open onToggle={handleToggle}>
              <summary className="gs-row gs-summary">
                <span className="gs-num">01</span>
                <span className="gs-text">
                  <span className="gs-title">{step01.title}</span>
                  <span className="gs-desc">{step01.subtitle}</span>
                </span>
                <span className="gs-chevron" aria-hidden="true">
                  <ChevronDown />
                </span>
              </summary>

              <div className="gs-panel">
                <p className="supply-callout supply-why">
                  <strong>Why this matters:</strong> Contamination is the #1 cause of injection-site reactions. Using sterile, single-use supplies isn&apos;t optional — it&apos;s the baseline for safe research practice.
                </p>
                <p className="supply-callout supply-aff">
                  <strong>Affiliate Disclosure:</strong> Some links below earn PeptiDex a small commission at no extra cost to you. This keeps the site free and ad-free. We only recommend products we&apos;ve independently verified and actually use in our own research.
                </p>

                <ul className="supplies-list">
                  {SUPPLY_PRODUCTS.map((product) => {
                    const isFeatured = product.vendor === 'amino_club';
                    const href = isFeatured ? bacWaterUrl : product.href;
                    const linkLabel = isFeatured ? 'Shop' : 'Get it';

                    return (
                      <li key={product.id} className="supply-item">
                        <span className="supply-check" aria-hidden="true">
                          <CheckMark />
                        </span>
                        <span className="supply-body">
                          <span className="supply-name">{product.name}</span>
                          <span className="supply-note">{product.description}</span>
                        </span>
                        <a
                          className={`supply-link${isFeatured ? ' supply-link-lime' : ''}`}
                          href={href}
                          onClick={() => handleAffiliateClick(product)}
                          {...AFFILIATE_LINK_ATTRS}
                        >
                          {linkLabel} <ArrowUpRight />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </details>
          </li>

          {/* ── STEP 02: Trusted Vendors (link) ── */}
          <li className="gs-step">
            <Link className="gs-row gs-link" href="/vendors">
              <span className="gs-num">02</span>
              <span className="gs-text">
                <span className="gs-title">{STEPS[1].title}</span>
                <span className="gs-desc">{STEPS[1].subtitle}</span>
              </span>
              <span className="gs-arrow" aria-hidden="true"><ArrowUpRight /></span>
            </Link>
          </li>

          {/* ── STEP 03: Reconstitution (link) ── */}
          <li className="gs-step">
            <Link className="gs-row gs-link" href="/tools/calculator">
              <span className="gs-num">03</span>
              <span className="gs-text">
                <span className="gs-title">{STEPS[2].title}</span>
                <span className="gs-desc">{STEPS[2].subtitle}</span>
              </span>
              <span className="gs-arrow" aria-hidden="true"><ArrowUpRight /></span>
            </Link>
          </li>

          {/* ── STEP 04: Dosing & Safe Injection (static, no page yet) ── */}
          <li className="gs-step">
            <div className="gs-row gs-static">
              <span className="gs-num">04</span>
              <span className="gs-text">
                <span className="gs-title">{STEPS[3].title}</span>
                <span className="gs-desc">{STEPS[3].subtitle}</span>
              </span>
            </div>
          </li>

          {/* ── STEP 05: Explore Toolkit (link) ── */}
          <li className="gs-step">
            <Link className="gs-row gs-link" href="/tools">
              <span className="gs-num">05</span>
              <span className="gs-text">
                <span className="gs-title">{STEPS[4].title}</span>
                <span className="gs-desc">{STEPS[4].subtitle}</span>
              </span>
              <span className="gs-arrow" aria-hidden="true"><ArrowUpRight /></span>
            </Link>
          </li>

        </ol>
      </div>
    </section>
  );
}
