'use client';

import { ExternalLink, Tag, ShieldCheck, ArrowRight } from 'lucide-react';
import type { PeptideVendorPricing } from '@/data/vendor-pricing';
import type { Vendor } from '@/data/vendors';

interface WhereToBuySectionProps {
  peptideName: string;
  peptideSlug: string;
  pricingEntry: PeptideVendorPricing | undefined;
  allVendors: Vendor[];
}

/** Apply vendor discount code to get discounted price */
function applyDiscount(price: number, discountPercent: number): number {
  return Math.round(price * (1 - discountPercent / 100) * 100) / 100;
}

export function WhereToBuySection({
  peptideName,
  peptideSlug,
  pricingEntry,
  allVendors,
}: WhereToBuySectionProps) {
  const hasPricing = pricingEntry && pricingEntry.vendors.length > 0;
  const inStockVendors = pricingEntry?.vendors.filter((v) => v.inStock) ?? [];

  // Match each priced vendor to the full vendor registry (for discount data)
  const enrichedVendors = inStockVendors
    .map((vp) => {
      const vendorRecord = allVendors.find(
        (v) => v.name.toLowerCase() === vp.vendor.toLowerCase()
      );
      return { ...vp, vendorRecord };
    })
    .sort((a, b) => {
      // Editor's Pick first, then by price asc
      if (a.badge === "Editor's Pick") return -1;
      if (b.badge === "Editor's Pick") return 1;
      return a.price_usd - b.price_usd;
    });

  return (
    <section className="pd-where-to-buy" id="where-to-buy">
      {/* Section header */}
      <div className="pd-wtb-header">
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        <div>
          <h2 className="pd-wtb-title">Where to Buy {peptideName}</h2>
          <p className="pd-wtb-subtitle">
            COA-verified vendors · Use code{' '}
            <strong className="pd-wtb-code">PEPTIDEX</strong> for up to 20% off
          </p>
        </div>
      </div>

      {hasPricing ? (
        <>
          {/* Desktop table */}
          <div className="pd-wtb-table-wrap">
            <table className="pd-wtb-table">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Purity</th>
                  <th>List Price</th>
                  <th>With PEPTIDEX</th>
                  <th>Code</th>
                  <th>Shop</th>
                </tr>
              </thead>
              <tbody>
                {enrichedVendors.map((v) => {
                  const discount = v.vendorRecord?.discountPercent ?? 0;
                  const discounted = discount > 0 ? applyDiscount(v.price_usd, discount) : null;
                  const purity = v.vendorRecord?.purity ?? '98%+';
                  const code = v.vendorRecord?.discountCode;

                  return (
                    <tr key={v.vendor} className={v.badge === "Editor's Pick" ? 'pd-wtb-row-featured' : ''}>
                      <td>
                        <div className="pd-wtb-vendor-cell">
                          <span className="pd-wtb-vendor-name">{v.vendor}</span>
                          {v.badge && (
                            <span className="pd-wtb-badge">{v.badge}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="pd-wtb-purity">{purity}</span>
                      </td>
                      <td>
                        <span className={discounted ? 'pd-wtb-price-original' : 'pd-wtb-price'}>
                          ${v.price_usd.toFixed(2)}
                        </span>
                        <span className="pd-wtb-vial-size">/{v.vial_mg}mg</span>
                      </td>
                      <td>
                        {discounted ? (
                          <div className="pd-wtb-discount-cell">
                            <span className="pd-wtb-price-discounted">${discounted.toFixed(2)}</span>
                            <span className="pd-wtb-savings">Save {discount}%</span>
                          </div>
                        ) : (
                          <span className="pd-wtb-no-code">—</span>
                        )}
                      </td>
                      <td>
                        {code ? (
                          <span className="pd-wtb-code-badge">
                            <Tag className="w-3 h-3" />
                            {code}
                          </span>
                        ) : (
                          <span className="pd-wtb-no-code">—</span>
                        )}
                      </td>
                      <td>
                        <a
                          href={v.affiliateUrl}
                          target="_blank"
                          rel="sponsored nofollow noopener"
                          className="pd-wtb-shop-btn"
                          aria-label={`Buy ${peptideName} from ${v.vendor}`}
                        >
                          Shop <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="pd-wtb-cards">
            {enrichedVendors.map((v) => {
              const discount = v.vendorRecord?.discountPercent ?? 0;
              const discounted = discount > 0 ? applyDiscount(v.price_usd, discount) : null;
              const code = v.vendorRecord?.discountCode;

              return (
                <div
                  key={v.vendor}
                  className={`pd-wtb-card ${v.badge === "Editor's Pick" ? 'pd-wtb-card-featured' : ''}`}
                >
                  <div className="pd-wtb-card-top">
                    <span className="pd-wtb-vendor-name">{v.vendor}</span>
                    {v.badge && <span className="pd-wtb-badge">{v.badge}</span>}
                  </div>
                  <div className="pd-wtb-card-prices">
                    <span className={discounted ? 'pd-wtb-price-original' : 'pd-wtb-price'}>
                      ${v.price_usd.toFixed(2)}/{v.vial_mg}mg
                    </span>
                    {discounted && (
                      <>
                        <ArrowRight className="w-3 h-3 text-zinc-500" />
                        <span className="pd-wtb-price-discounted">${discounted.toFixed(2)}</span>
                        <span className="pd-wtb-savings">−{discount}%</span>
                      </>
                    )}
                  </div>
                  {code && (
                    <p className="pd-wtb-code-note">
                      Use code <strong>{code}</strong> for {discount}% off at {v.vendor}.
                    </p>
                  )}
                  <a
                    href={v.affiliateUrl}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="pd-wtb-shop-btn-full"
                    aria-label={`Buy ${peptideName} from ${v.vendor}`}
                  >
                    Shop at {v.vendor} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>

          {/* Disclosure */}
          <p className="pd-wtb-disclosure">
            <strong>Affiliate disclosure:</strong> PeptiDex may earn commissions from purchases
            made through vendor links. This does not affect our editorial ranking.{' '}
            <a href="/about/methodology" className="pd-wtb-disclosure-link">See our methodology</a>.
            Prices shown are list prices at time of last update — verify on vendor site.
          </p>
        </>
      ) : (
        /* Fallback for peptides without pricing data */
        <div className="pd-wtb-fallback">
          <p className="pd-wtb-fallback-text">
            Verified pricing for <strong>{peptideName}</strong> is not yet available in our
            database. Browse all COA-verified vendors on our{' '}
            <a href="/tools/pricing" className="pd-wtb-disclosure-link">
              price comparison tool
            </a>
            , or check individual vendor pages.
          </p>
          <a
            href={`/tools/pricing?q=${peptideSlug}`}
            className="pd-wtb-fallback-btn"
          >
            Compare All Vendors <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </section>
  );
}
