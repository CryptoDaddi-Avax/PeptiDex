'use client';
import { SUPPLY_PRODUCTS } from '../onboarding-data';
import { trackAffiliateClick, vendorKeyFromUrl } from '@/lib/ga4-events';
import { trackAffiliateClicked } from '@/lib/analytics/onboarding';
import StepCallout from '../StepCallout';

export default function SuppliesStep() {
  function handleClick(product: typeof SUPPLY_PRODUCTS[0]) {
    // Dual-fire: onboarding funnel + revenue attribution
    trackAffiliateClicked({
      vendor: product.vendor,
      product: product.gaProductKey,
      url: product.href,
    });
    trackAffiliateClick({
      vendor: product.vendor === 'amino_club' ? 'amino_club' : vendorKeyFromUrl(product.href),
      peptide: 'general',
      source_component: 'onboarding_supplies',
      url: product.href,
    });
  }

  return (
    <div className="onboarding-step" role="tabpanel" aria-labelledby="step-1-title">
      <h3 className="onboarding-step__title" id="step-1-title">
        Your <em>Supplies</em> Checklist
      </h3>
      <p className="onboarding-step__subtitle">
        Before you open your first vial, you need exactly five things. Nothing exotic — most ship
        in two days. Order these before your peptides arrive so you&apos;re ready the moment they
        land.
      </p>

      {/* "Why this matters" callout — above affiliate content */}
      <StepCallout icon="⚠">
        <strong>Why this matters:</strong> Contamination is the #1 cause of injection-site
        reactions. Using sterile, single-use supplies isn&apos;t optional — it&apos;s the baseline
        for safe research practice.
      </StepCallout>

      {/* FTC Disclosure — above the fold, before product grid */}
      <div className="ftc-disclosure">
        <strong>Affiliate Disclosure:</strong> Some links below earn PeptiDex a small commission
        at no extra cost to you. This keeps the site free and ad-free. We only recommend products
        we&apos;ve independently verified and actually use in our own research.
      </div>

      <div className="supplies-grid">
        {SUPPLY_PRODUCTS.map((product) => (
          <a
            key={product.id}
            href={product.href}
            target="_blank"
            rel="nofollow noopener sponsored"
            className={`supply-card${product.featured ? ' supply-card--featured' : ''}`}
            onClick={() => handleClick(product)}
            id={`onboarding-supply-${product.id}`}
          >
            {product.vendor === 'amino_club' && (
              <div className="supply-card__vendor-badge">Amino Club</div>
            )}
            <div className="supply-card__name">{product.name}</div>
            <div className="supply-card__desc">{product.description}</div>
            <div className="supply-card__cta">
              {product.vendor === 'amino_club' ? 'Shop Amino Club →' : 'View on Amazon →'}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
