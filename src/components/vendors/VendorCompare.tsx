import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { allVendorReviews } from '@/data/reviews';

interface VendorCompareProps {
  currentSlug: string;
}

/**
 * Renders a "Compare to other vendors" block on vendor review pages.
 * Logic: sort all vendor reviews by overallRating desc, exclude current vendor, take top 3.
 * Deterministic and content-driven — no randomness.
 */
export function VendorCompare({ currentSlug }: VendorCompareProps) {
  const others = allVendorReviews
    .filter((r) => r.slug !== currentSlug)
    .sort((a, b) => b.overallRating - a.overallRating)
    .slice(0, 3);

  if (others.length === 0) return null;

  return (
    <section id="compare-vendors" className="vr-compare-section">
      <div className="vr-section-head">
        <Star className="w-6 h-6 text-amber-400 flex-shrink-0" />
        <h2>Compare to Other Vendors</h2>
      </div>
      <div className="vr-compare-grid">
        {others.map((vendor) => (
          <Link
            key={vendor.slug}
            href={`/vendors/${vendor.slug}`}
            className="vr-compare-card"
          >
            <div className="vr-compare-card-header">
              <span className="vr-compare-name">{vendor.name}</span>
              <span className="vr-compare-rating">
                {vendor.overallRating.toFixed(1)}
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline ml-1" />
              </span>
            </div>
            <div className="vr-compare-meta">
              <span>{vendor.purity} purity</span>
              <span className="vr-compare-dot" />
              <span>{vendor.coaType}</span>
            </div>
            <div className="vr-compare-cta">
              Read review <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
