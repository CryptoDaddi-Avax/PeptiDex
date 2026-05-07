import { getVendorPricing } from "@/data/vendor-pricing";
import { VendorOutboundLink } from "@/app/vendors/vendor-outbound-link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { PromoCodeDisplay } from "@/components/promos/PromoCodeDisplay";
import { PRIMARY_PROMO } from "@/lib/promos/config";

interface PriceComparisonTableProps {
  peptideSlug: string;
  peptideName: string;
}

export function PriceComparisonTable({ peptideSlug, peptideName }: PriceComparisonTableProps) {
  const pricingData = getVendorPricing(peptideSlug);
  const vendors = pricingData?.vendors.filter(v => v.inStock) ?? [];

  if (vendors.length === 0) {
    return (
      <div className="w2b-pricing-empty">
        <AlertTriangle size={18} className="text-amber-500" />
        <p>
          We do not currently have live pricing data for {peptideName}. 
          {/* TODO: Add pricing data to vendor-pricing.ts */}
          <br/>
          <em>See vendor websites below for current pricing and availability.</em>
        </p>
      </div>
    );
  }

  // Sort by price per mg (ascending)
  const sortedVendors = [...vendors].sort((a, b) => {
    const pricePerMgA = a.price_usd / a.vial_mg;
    const pricePerMgB = b.price_usd / b.vial_mg;
    return pricePerMgA - pricePerMgB;
  });

  return (
    <div className="vct-wrapper">
      {/* Featured promo code — above the table on all viewports */}
      {PRIMARY_PROMO.isActive && (
        <PromoCodeDisplay
          promo={PRIMARY_PROMO}
          surface="library_buy_block"
          variant="full"
          className="mb-5"
        />
      )}

      <div className="vct-label">§ Price Comparison ({peptideName})</div>
      <div className="vct-scroll-hint" aria-hidden="true">← Scroll to compare →</div>

      <div className="vct-scroll">
        <table className="vct-table">
          <thead>
            <tr className="vct-head-row">
              <th className="vct-th">Vendor</th>
              <th className="vct-th">Vial Size</th>
              <th className="vct-th">Price / Vial</th>
              <th className="vct-th">Price / mg</th>
              <th className="vct-th vct-th-cta">Shop</th>
            </tr>
          </thead>
          <tbody>
            {sortedVendors.map((vendor, i) => {
              const pricePerMg = (vendor.price_usd / vendor.vial_mg).toFixed(2);
              const isBestPrice = i === 0;

              return (
                <tr
                  key={vendor.vendor}
                  className={`vct-row${isBestPrice ? " vct-row-top" : ""}`}
                >
                  <td className="vct-td vct-td-vendor">
                    <span className="vct-vendor-link" style={{ display: 'inline-block' }}>
                      {vendor.vendor}
                    </span>
                    {vendor.badge && (
                      <span className="vct-badge-inline" style={{ color: 'var(--green)' }}>
                        {vendor.badge}
                      </span>
                    )}
                  </td>

                  <td className="vct-td">
                    <span className="font-mono text-sm">{vendor.vial_mg}mg</span>
                  </td>

                  <td className="vct-td">
                    <span className="font-mono text-sm text-zinc-200">
                      ${vendor.price_usd.toFixed(2)}
                    </span>
                  </td>

                  <td className="vct-td">
                    <span className="font-mono text-sm" style={{ color: isBestPrice ? 'var(--gold)' : 'var(--ink-dim)' }}>
                      ${pricePerMg}<span className="text-xs text-zinc-500">/mg</span>
                    </span>
                  </td>

                  <td className="vct-td vct-td-cta">
                    <VendorOutboundLink
                      href={vendor.affiliateUrl}
                      vendorName={vendor.vendor}
                      location={`w2b_pricing_${peptideSlug}`}
                      className={`vct-btn${isBestPrice ? " vct-btn-primary" : " vct-btn-ghost"}`}
                    >
                      Shop
                      <ArrowRight size={12} />
                    </VendorOutboundLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
