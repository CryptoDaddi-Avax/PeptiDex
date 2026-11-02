/**
 * VendorComparisonTable — Quick Comparison Table for /vendors
 * ============================================================
 * Sticky on desktop, horizontal scroll on mobile.
 * Columns: Rank | Vendor | Criteria score | Purity | Discount | Shop
 * Each row's vendor name is an anchor link to #slug section below.
 *
 * Design: matches vn-* CSS namespace in vendors-redesign.css
 */

import { type Vendor } from "@/data/vendors";
import { VendorOutboundLink } from "@/app/vendors/vendor-outbound-link";
import { FounderOwnershipDisclosure } from "@/components/disclosures/FounderOwnershipDisclosure";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface VendorComparisonTableProps {
  vendors: Vendor[];
}

function CriteriaScore({ total, max }: { total: number; max: number }) {
  return (
    <span className="vct-rating">
      {total}
      <span className="vct-rating-max">/{max}</span>
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
              <th className="vct-th">Score</th>
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
                  </td>

                  {/* Vendor name — anchors down the page */}
                  <td className="vct-td vct-td-vendor">
                    <a href={`#${vendor.slug}`} className="vct-vendor-link">
                      {vendor.name}
                    </a>
                    <span className="vct-badge-inline">{vendor.badge}</span>
                    <FounderOwnershipDisclosure vendorSlug={vendor.slug} variant="inline" />
                  </td>

                  {/* Published-criteria score */}
                  <td className="vct-td">
                    <CriteriaScore total={vendor.criteria.total} max={vendor.criteria.max} />
                  </td>

                  {/* Purity */}
                  <td className="vct-td">
                    <span className="vct-purity">
                      <ShieldCheck size={13} style={{ color: "var(--green)" }} />
                      {vendor.purity}
                    </span>
                    <span className="vct-review-count">vendor claim</span>
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
