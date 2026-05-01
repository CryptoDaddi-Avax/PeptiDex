'use client';
import { vendorProfiles, type VendorProfile } from '@/data/vendor-comparison';
import { VENDOR_COUNT } from '@/data/vendors';
import './VendorSection.css';

const allVendors = Object.values(vendorProfiles).sort((a, b) => b.rating - a.rating);
// Show top 3 on homepage, link to /vendors for the rest
const displayVendors = allVendors.slice(0, 3);
const remainingCount = VENDOR_COUNT - displayVendors.length;

function VendorCard({ v }: { v: VendorProfile }) {
  return (
    <a
      className="vendor-card"
      href={v.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {v.badge && <div className="vendor-badge">{v.badge}</div>}
      <div className="vendor-header">
        <div className="vendor-name-row">
          <h3>{v.name}</h3>
          <div className="vendor-rating">
            <span className="star">★</span> {v.rating}
            <span className="count">({v.ratingCount})</span>
          </div>
        </div>
        <div className="vendor-purity">{v.purity} purity verified</div>
      </div>

      <ul className="vendor-features">
        <li>
          <span className="feature-label">COA</span>
          <span className="feature-value">{v.coaStatus}</span>
        </li>
        <li>
          <span className="feature-label">Testing</span>
          <span className="feature-value">{v.testingMethods.join(', ')}</span>
        </li>
        <li>
          <span className="feature-label">Shipping</span>
          <span className="feature-value">{v.shippingSpeed}</span>
        </li>
        <li>
          <span className="feature-label">Ships To</span>
          <span className="feature-value">{v.shipsTo.join(', ')}</span>
        </li>
        <li>
          <span className="feature-label">Catalog</span>
          <span className="feature-value">{v.catalogSize}</span>
        </li>
        <li>
          <span className="feature-label">Payment</span>
          <span className="feature-value">{v.paymentMethods.join(', ')}</span>
        </li>
        <li>
          <span className="feature-label">Returns</span>
          <span className="feature-value">{v.returnPolicy}</span>
        </li>
      </ul>

      <div className="vendor-cta">
        <span>Shop {v.name}</span>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </a>
  );
}

export default function VendorSection() {
  return (
    <section className="vendors-section" id="vendors">
      <div className="vendors-head">
        <div className="section-label">§ Verified Sourcing</div>
        <h2 className="section-title">
          COA-verified<br /><em>vendors</em>
        </h2>
        <p className="vendors-sub">
          Every vendor in our index is independently verified with third-party Certificates of Analysis.
          We test purity via HPLC and Mass Spectrometry before any recommendation.
        </p>
      </div>
      <div className="vendors-grid">
        {displayVendors.map((v) => (
          <VendorCard key={v.slug} v={v} />
        ))}
      </div>
      <div className="vendors-cta-row">
        <a href="/vendors" className="btn-primary">
          + {remainingCount} more verified vendors
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
        <a href="/vendors/amino-club-review" className="btn-ghost" style={{ marginLeft: '12px' }}>
          Read our Amino Club Review
        </a>
      </div>
    </section>
  );
}

