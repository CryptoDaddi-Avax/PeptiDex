/**
 * VendorComparisonTable — Quick Comparison Table for /vendors
 * ============================================================
 * Sticky on desktop, horizontal scroll on mobile.
 * Columns: Rank | Vendor | Rating | Purity | Discount | Shop
 * Each row's vendor name is an anchor link to #slug section below.
 *
 * Design: matches vn-* CSS namespace in vendors-redesign.css
 */

import { type Vendor } from "@/data/vendors";
import { VendorOutboundLink } from "@/app/vendors/vendor-outbound-link";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface VendorComparisonTableProps {
  vendors: Vendor[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="vct-rating">
      <span className="vct-star">★</span>
      {rating}
      <span className="vct-rating-max">/5</span>
    </span>
  );
}

export function VendorComparisonTable({ vendors }: VendorComparisonTableProps) {
  const sorted = [...vendors].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="vct-wrapper" id="comparison-table">
      <div className="vct-label">§ Quick Comparison</div>
      <div className="vct-scroll-hint" aria-hidden="true">← Scroll to compare →</div>

      <div className="vct-scroll">
        <table className="vct-table">
          <thead>
            <tr className="vct-head-row">
              <th className="vct-th vct-th-rank">Rank</th>
              <th className="vct-th vct-th-vendor">Vendor</th>
              <th className="vct-th">Rating</th>
              <th className="vct-th">Purity</th>
              <th className="vct-th">Testing</th>
              <th className="vct-th">Discount Code</th>
              <th className="vct-th vct-th-cta">Shop</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((vendor, i) => {
              const isTop = i === 0;
              return (
                <tr
                  key={vendor.slug}
                  className={`vct-row${isTop ? " vct-row-top" : ""}`}
                >
                  {/* Rank */}
                  <td className="vct-td vct-td-rank">
                    <span className="vct-rank-num">#{i + 1}</span>
                    {isTop && (
                      <span className="vct-rank-badge">Editor's Choice</span>
                    )}
                  </td>

                  {/* Vendor name — anchors down the page */}
                  <td className="vct-td vct-td-vendor">
                    <a href={`#${vendor.slug}`} className="vct-vendor-link">
                      {vendor.name}
                    </a>
                    <span className="vct-badge-inline">{vendor.badge}</span>
                  </td>

                  {/* Rating */}
                  <td className="vct-td">
                    <StarRating rating={vendor.rating} />
                    <span className="vct-review-count">
                      {vendor.ratingCount} reviews
                    </span>
                  </td>

                  {/* Purity */}
                  <td className="vct-td">
                    <span className="vct-purity">
                      <ShieldCheck size={13} style={{ color: "var(--green)" }} />
                      {vendor.purity}
                    </span>
                  </td>

                  {/* Testing */}
                  <td className="vct-td vct-td-testing">
                    {vendor.testingMethods.join(" · ")}
                  </td>

                  {/* Discount Code */}
                  <td className="vct-td">
                    {vendor.discountCode ? (
                      <span className="vct-code">
                        <span className="vct-code-text">{vendor.discountCode}</span>
                        <span className="vct-code-pct">
                          {vendor.discountPercent}% off
                          {vendor.discountStackable && (
                            <span className="vct-stack-pill"> stacks!</span>
                          )}
                        </span>
                      </span>
                    ) : (
                      <span className="vct-no-code">—</span>
                    )}
                  </td>

                  {/* CTA */}
                  <td className="vct-td vct-td-cta">
                    <VendorOutboundLink
                      href={vendor.affiliateUrl}
                      vendorName={vendor.name}
                      location={`comparison_table_${vendor.slug}`}
                      className={`vct-btn${isTop ? " vct-btn-primary" : " vct-btn-ghost"}`}
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

      <p className="vct-footnote">
        All affiliate links are marked <code>rel="sponsored nofollow"</code>. 
        PeptiDex may earn a commission at no cost to you.{" "}
        <a href="#how-we-rank" className="vct-footnote-link">
          How we rank vendors →
        </a>
      </p>
    </div>
  );
}
