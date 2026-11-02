'use client';
import Link from 'next/link';
import { vendorsSorted, VENDOR_COUNT, type Vendor } from '@/data/vendors';
import { TrackedOutboundLink } from '@/components/tracked-outbound-link';
import { FounderOwnershipDisclosure } from '@/components/disclosures/FounderOwnershipDisclosure';
import './VendorSection.css';

// Show top 4 on homepage, link to /vendors for the rest
const displayVendors = vendorsSorted.slice(0, 4);
const remainingCount = VENDOR_COUNT - displayVendors.length;

function VendorCard({ v }: { v: Vendor }) {
  return (
    <TrackedOutboundLink
      className="vendor-card"
      href={v.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      vendorSlug={v.slug}
      surface="redesign_vendor_section"
    >
      {v.badge && <div className="vendor-badge">{v.badge}</div>}
      <div className="vendor-header">
        <div className="vendor-name-row">
          <h3>{v.name}</h3>
          <div className="vendor-rating">
            {v.criteria.total}<span className="count">/100</span>
          </div>
        </div>
        <div className="vendor-purity">{v.purity} purity (vendor claim)</div>
        <FounderOwnershipDisclosure vendorSlug={v.slug} variant="inline" />
      </div>

      {/* Discount callout strip — only for vendors with a discount code */}
      {v.discountCode && (
        <div className="vendor-discount-strip">
          <span className="discount-tag">🏷</span>
          <span>
            Use code <strong>{v.discountCode}</strong> for {v.discountPercent}% off
            {v.discountStackable && <span className="stackable-note"> — stacks with sales</span>}
          </span>
        </div>
      )}

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
          <span className="feature-label">Catalog</span>
          <span className="feature-value">{v.catalogSize}</span>
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
    </TrackedOutboundLink>
  );
}

export default function VendorSection() {
  return (
    <section className="vendors-section" id="vendors">
      <div className="vendors-head">
        <div className="section-label">§ Sourcing</div>
        <h2 className="section-title">
          COA-verified<br /><em>vendors</em>
        </h2>
        <p className="vendors-sub">
          Vendors are ranked by score on our published criteria — COA availability, third-party lab
          testing, price per mg, shipping, payment options and returns. PeptiDex does not test products.
        </p>
      </div>
      <div className="vendors-grid">
        {displayVendors.map((v) => (
          <VendorCard key={v.slug} v={v} />
        ))}
      </div>
      <div className="vendors-cta-row">
        <Link href="/vendors" className="btn-primary">
          <span>Compare all {VENDOR_COUNT} places to buy peptides</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
