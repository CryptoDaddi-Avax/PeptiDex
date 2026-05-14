'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { couponVendorTable, howToSteps, couponFAQs } from '@/data/coupon-page-config';
import { vendorPricing } from '@/data/vendor-pricing';
import './coupon-page.css';

// ── Copy-to-clipboard helper ──────────────────────────────────────────────
function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('PEPTIDEX');
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = 'PEPTIDEX';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  }, []);
  return { copied, copy };
}

// ── Vendor discount map by slug ──────────────────────────────────────────
const vendorDiscountMap: Record<string, number> = {};
const vendorNameMap: Record<string, string> = {};
couponVendorTable.forEach((v) => {
  vendorDiscountMap[v.slug] = v.discountPercent;
  vendorNameMap[v.slug] = v.vendor;
});

// Map vendor-pricing vendor name → slug
const vpVendorSlugMap: Record<string, string> = {
  'Amino Club': 'amino-club',
  'Bio Longevity Labs': 'bio-longevity-labs',
  'Limitless Life': 'limitless-life',
  'Ascension Peptides': 'ascension-peptides',
  'Pantheon Peptides': 'pantheon-peptides',
  'LVLUP Health': 'lvlup-health',
};

// ── Main Component ──────────────────────────────────────────────────────────
export default function CouponPageClient() {
  const { copied, copy } = useCopy();
  const { copied: copied2, copy: copy2 } = useCopy();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [stickyVisible, setStickyVisible] = useState(false);

  // Savings calculator state
  const peptideOptions = vendorPricing.filter((p) => p.vendors.length > 0);
  const [selectedPeptide, setSelectedPeptide] = useState(peptideOptions[0]?.slug || '');
  const [quantity, setQuantity] = useState(1);

  // Show sticky footer after scrolling past hero
  useEffect(() => {
    const handler = () => setStickyVisible(window.scrollY > 600);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Get selected peptide data
  const selectedPeptideData = vendorPricing.find((p) => p.slug === selectedPeptide);

  return (
    <div className="coupon-page">
      {/* ══════════════ HERO ══════════════ */}
      <section className="coupon-hero" id="coupon-hero">
        <div className="coupon-hero-grid" aria-hidden="true" />
        <div className="coupon-hero-glow" aria-hidden="true" />
        <div className="coupon-hero-wrap">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">PeptiDex</Link>
            <span className="sep">/</span>
            <span className="current">PEPTIDEX Coupon Code</span>
          </nav>

          <h1 className="coupon-h1">
            <span className="coupon-code-badge">PEPTIDEX</span>
            <span className="coupon-h1-text">
              Verified 20–50% Off Coupon Code for Amino Club & Partner Peptide Vendors
            </span>
          </h1>

          <p className="coupon-lead">
            <strong>PEPTIDEX</strong> is the only coupon code I've verified across 6 research peptide vendors —{' '}
            <strong>20% off Amino Club</strong>, <strong>50% off Ascension Peptides</strong>, and{' '}
            <strong>15% off Bio Longevity Labs, Limitless Life, Pantheon, & LVLUP Health</strong>.
            No expiration. Verified {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
          </p>

          {/* Click-to-copy */}
          <button
            className="coupon-copy-btn"
            onClick={copy}
            aria-label="Copy PEPTIDEX coupon code"
            id="copy-coupon-hero"
          >
            <span className="coupon-copy-code">PEPTIDEX</span>
            <span className="coupon-copy-label">
              {copied ? '✓ Copied!' : 'Click to Copy'}
            </span>
          </button>

          {/* Trust bar */}
          <div className="coupon-trust-bar">
            <span className="trust-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              Verified May 2026
            </span>
            <span className="trust-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              Stacks with sale prices (Bio Longevity Labs)
            </span>
            <span className="trust-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              Used 10,000+ times
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════ SECTION 1: VENDOR TABLE ══════════════ */}
      <section className="coupon-section" id="vendor-discounts">
        <div className="coupon-section-inner">
          <h2 className="coupon-h2">
            <span className="section-number">01</span>
            Live Vendor Discount Table
          </h2>
          <p className="coupon-section-sub">
            All discounts verified via test checkout. Updated weekly.
          </p>

          <div className="vendor-table-wrap">
            <table className="vendor-table" id="vendor-discount-table">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Discount</th>
                  <th>Code</th>
                  <th>Stacks?</th>
                  <th>Verified</th>
                  <th>Apply</th>
                </tr>
              </thead>
              <tbody>
                {couponVendorTable.map((v, i) => (
                  <tr key={v.slug} style={{ animationDelay: `${i * 60}ms` }}>
                    <td className="vendor-cell">
                      <span className="vendor-name">{v.vendor}</span>
                      {v.badge && <span className="vendor-badge">{v.badge}</span>}
                    </td>
                    <td className="discount-cell">
                      <span className="discount-pct">{v.discountPercent}%</span> off
                    </td>
                    <td>
                      <code className="code-inline">{v.code}</code>
                    </td>
                    <td className="stack-cell">
                      {v.stackable ? (
                        <span className="stack-yes">✓ Yes</span>
                      ) : (
                        <span className="stack-no">—</span>
                      )}
                    </td>
                    <td className="date-cell">{v.verifiedDate}</td>
                    <td>
                      <a
                        href={v.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="apply-btn"
                        id={`apply-${v.slug}`}
                      >
                        Apply →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════ SECTION 2: SAVINGS CALCULATOR ══════════════ */}
      <section className="coupon-section coupon-section-alt" id="savings-calculator">
        <div className="coupon-section-inner">
          <h2 className="coupon-h2">
            <span className="section-number">02</span>
            Per-Peptide Savings Calculator
          </h2>
          <p className="coupon-section-sub">
            Select a peptide and quantity to compare prices with and without PEPTIDEX across all vendors.
          </p>

          <div className="calc-controls">
            <div className="calc-field">
              <label htmlFor="peptide-select">Peptide</label>
              <select
                id="peptide-select"
                value={selectedPeptide}
                onChange={(e) => setSelectedPeptide(e.target.value)}
              >
                {peptideOptions.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="calc-field">
              <label htmlFor="qty-select">Quantity</label>
              <select
                id="qty-select"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[1, 2, 3, 5, 10].map((q) => (
                  <option key={q} value={q}>
                    {q} vial{q > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedPeptideData && selectedPeptideData.vendors.length > 0 ? (
            <div className="calc-results">
              <div className="calc-table-wrap">
                <table className="calc-table" id="savings-table">
                  <thead>
                    <tr>
                      <th>Vendor</th>
                      <th>Vial Size</th>
                      <th>List Price</th>
                      <th>PEPTIDEX Price</th>
                      <th>You Save</th>
                      <th>$/mg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPeptideData.vendors
                      .filter((vp) => vp.inStock)
                      .map((vp, idx) => {
                        const slug = vpVendorSlugMap[vp.vendor] || '';
                        const discPct = vendorDiscountMap[slug] || 0;
                        const listTotal = vp.price_usd * quantity;
                        const pepPrice = listTotal * (1 - discPct / 100);
                        const savings = listTotal - pepPrice;
                        const perMg = pepPrice / (vp.vial_mg * quantity);

                        return (
                          <tr key={`${vp.vendor}-${idx}`}>
                            <td className="vendor-cell">
                              <span className="vendor-name">{vp.vendor}</span>
                            </td>
                            <td>{vp.vial_mg}mg</td>
                            <td className="list-price">${listTotal.toFixed(2)}</td>
                            <td className="pep-price">
                              ${pepPrice.toFixed(2)}
                              {discPct > 0 && (
                                <span className="disc-tag">-{discPct}%</span>
                              )}
                            </td>
                            <td className="savings-cell">
                              {savings > 0 ? (
                                <span className="savings-value">${savings.toFixed(2)}</span>
                              ) : (
                                '—'
                              )}
                            </td>
                            <td className="permg-cell">${perMg.toFixed(2)}/mg</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="calc-empty">
              <p>No vendor pricing data available for this peptide yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════ SECTION 3: HOW TO APPLY ══════════════ */}
      <section className="coupon-section" id="how-to-apply">
        <div className="coupon-section-inner">
          <h2 className="coupon-h2">
            <span className="section-number">03</span>
            How to Apply the PEPTIDEX Code
          </h2>
          <p className="coupon-section-sub">
            Works at checkout on all 6 partner vendors. Takes under 30 seconds.
          </p>

          <div className="howto-steps">
            {howToSteps.map((step) => (
              <div key={step.position} className="howto-step">
                <div className="howto-step-num">{step.position}</div>
                <div className="howto-step-content">
                  <h3 className="howto-step-title">{step.name}</h3>
                  <p className="howto-step-text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SECTION 4: FAQ ACCORDION ══════════════ */}
      <section className="coupon-section coupon-section-alt" id="faq">
        <div className="coupon-section-inner">
          <h2 className="coupon-h2">
            <span className="section-number">04</span>
            Frequently Asked Questions
          </h2>
          <p className="coupon-section-sub">
            Everything you need to know about the PEPTIDEX coupon code.
          </p>

          <div className="faq-list">
            {couponFAQs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item ${openFaqIdx === idx ? 'faq-open' : ''}`}
              >
                <button
                  className="faq-trigger"
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  aria-expanded={openFaqIdx === idx}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-q-${idx}`}
                >
                  <span className="faq-q">{faq.question}</span>
                  <span className="faq-chevron" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                <div
                  className="faq-answer"
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-q-${idx}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SECTION 5: SOCIAL PROOF ══════════════ */}
      <section className="coupon-section" id="social-proof">
        <div className="coupon-section-inner">
          <h2 className="coupon-h2">
            <span className="section-number">05</span>
            What Researchers Are Saying
          </h2>
          <p className="coupon-section-sub">
            Real posts from @TheCryptoDaddi on X.
          </p>

          <div className="social-grid">
            {[
              {
                text: '"Just saved $47 on a 3-vial BPC-157 order from Amino Club with PEPTIDEX. 20% off, no minimum. Code has been live for 6+ months now."',
                handle: '@TheCryptoDaddi',
                date: 'Apr 28, 2026',
              },
              {
                text: '"Ascension Peptides running PEPTIDEX at 50% off is genuinely absurd. $50 for 5mg semaglutide. I verified the COA — it checks out."',
                handle: '@TheCryptoDaddi',
                date: 'May 7, 2026',
              },
              {
                text: '"Monthly price check done. PEPTIDEX still live at all 6 vendors. Bio Longevity Labs stacking with their 25% sale = 36% total. Best deal window I\'ve tracked."',
                handle: '@TheCryptoDaddi',
                date: 'May 12, 2026',
              },
            ].map((post, idx) => (
              <div key={idx} className="social-card">
                <div className="social-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <p className="social-text">{post.text}</p>
                <div className="social-meta">
                  <span className="social-handle">{post.handle}</span>
                  <span className="social-date">{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SECTION 6: AFFILIATE DISCLOSURE ══════════════ */}
      <section className="coupon-disclosure" id="affiliate-disclosure">
        <div className="coupon-section-inner">
          <h3 className="disclosure-title">Affiliate Disclosure (FTC Compliant)</h3>
          <p className="disclosure-text">
            PEPTIDEX is an affiliate coupon code. I (The Crypto Daddi, operator of PeptiDex) earn a commission
            on purchases made using code PEPTIDEX or through the affiliate links on this page. The discount
            you receive is real and identical regardless of whether you use my link or enter the code directly
            at checkout. This page contains no medical advice — all products referenced are for research use only.
            Individual vendor return policies apply. Last verified: May 2026.
          </p>
        </div>
      </section>

      {/* ══════════════ STICKY FOOTER CTA ══════════════ */}
      <div className={`sticky-footer ${stickyVisible ? 'sticky-visible' : ''}`} id="sticky-footer">
        <div className="sticky-inner">
          <div className="sticky-left">
            <span className="sticky-label">Your code:</span>
            <code className="sticky-code">PEPTIDEX</code>
            <span className="sticky-savings">20–50% off at 6 vendors</span>
          </div>
          <button
            className="sticky-copy-btn"
            onClick={copy2}
            aria-label="Copy PEPTIDEX code"
            id="copy-coupon-sticky"
          >
            {copied2 ? '✓ Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>
    </div>
  );
}
