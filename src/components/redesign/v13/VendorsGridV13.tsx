'use client';

import { vendorsSorted, type Vendor } from '@/data/vendors';
import { getPromoForVendor } from '@/lib/promos/config';
import { buildAffiliateUrl, AFFILIATE_LINK_ATTRS } from '@/lib/promos/affiliateUrl';
import '../Sections.css';
import './VendorsGridV13.css';

/**
 * VendorsGridV13 — v13 verified vendors section (§08).
 * 4 glass vendor cards with affiliate CTAs, matching the reference at
 * /_design-reference/v13/index.html §08.
 *
 * All vendor identity and affiliate URLs are sourced from src/data/vendors.ts.
 * All Shop links use buildAffiliateUrl() — zero hardcoded vendor hostnames.
 */

// Show top 4 injectable vendors (matches the v13 reference exactly)
const DISPLAY_VENDORS = vendorsSorted.filter((v) => v.category === 'injectable').slice(0, 4);

/** Star rating string for display */
function starString(rating: number): string {
  const full = Math.floor(rating);
  return '★'.repeat(full) + (rating % 1 >= 0.5 ? '★' : '');
}

function VendorCardV13({ vendor, isPrimary }: { vendor: Vendor; isPrimary: boolean }) {
  const promo = getPromoForVendor(vendor.slug);
  const shopUrl = promo
    ? buildAffiliateUrl(promo, 'vendor_review')
    : vendor.affiliateUrl;

  return (
    <div className="v13-vendor-cell">
      <div className="v13-vendor-card glass">
        {/* Badge tag */}
        <span className="v13-vendor-tag">{vendor.badge}</span>

        {/* Name */}
        <h3 className="v13-vendor-name">{vendor.name}</h3>

        {/* Rating */}
        <div className="v13-vendor-rating">
          <span className="stars">{starString(vendor.rating)}</span>
          {' '}{vendor.rating}{' '}
          <span>({vendor.ratingCount})</span>
        </div>

        {/* Purity */}
        <span className="v13-vendor-purity">{vendor.purity} purity</span>

        {/* Rule */}
        <div className="v13-vendor-rule" aria-hidden="true" />

        {/* Discount */}
        {promo && (
          <p className="v13-vendor-discount">
            Code <span className="code-chip">{promo.code}</span> — {promo.discountPercent}% off
          </p>
        )}

        {/* CTA */}
        <div className="v13-vendor-cta">
          <a
            className={`btn-inner pill-btn ${isPrimary ? 'pill-lime' : 'pill-glass'}`}
            href={shopUrl}
            {...AFFILIATE_LINK_ATTRS}
          >
            {isPrimary ? `Shop ${vendor.name}` : 'Shop'}
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function VendorsGridV13() {
  return (
    <section className="sec" id="vendors" aria-label="Verified vendors">
      <div className="sec-inner">
        <header className="sec-head">
          <div className="section-rule fade-up" aria-hidden="true">
            <span className="rule-line" />
            <span className="rule-mark">§<span className="num">08</span></span>
            <span className="rule-line" />
          </div>
          <p className="sec-eyebrow fade-up" style={{ '--delay': '60ms' } as React.CSSProperties}>VERIFIED SOURCING</p>
          <h2 className="sec-h2 fade-up" style={{ '--delay': '140ms' } as React.CSSProperties}>
            COA-verified <span className="em">vendors</span>.
          </h2>
          <p className="sec-sub fade-up" style={{ '--delay': '240ms' } as React.CSSProperties}>
            Independently tested via HPLC and Mass Spectrometry. Use code{' '}
            <span className="code-chip">PEPTIDEX</span> for discounts.
          </p>
        </header>

        <div className="v13-vendor-grid stagger-children">
          {DISPLAY_VENDORS.map((vendor, i) => (
            <VendorCardV13
              key={vendor.slug}
              vendor={vendor}
              isPrimary={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
