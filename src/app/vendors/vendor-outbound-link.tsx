"use client";

import { type ReactNode } from "react";
import { trackAffiliateClick, vendorKeyFromUrl } from "@/lib/ga4-events";
import { trackClick } from "@/lib/tracking/click";

interface VendorOutboundLinkProps {
  href: string;
  vendorName: string;
  /** Legacy 'location' string for back-compat. Maps to source_component in GA4. */
  location: string;
  className?: string;
  children: ReactNode;
}

/**
 * Vendor outbound link for /vendors page cards.
 * Dual-writes: GA4 affiliate_click + /api/track server log.
 */
export function VendorOutboundLink({
  href,
  vendorName,
  location,
  className,
  children,
}: VendorOutboundLinkProps) {
  const vendor = vendorKeyFromUrl(href);
  const vendorSlug = vendor !== "unknown" ? vendor.replace(/_/g, "-") : vendorName.toLowerCase().replace(/\s+/g, "-");

  // Infer surface from location string
  const surface = location.startsWith("comparison_table") ? "pricing_table"
    : location.startsWith("rank_card") ? "vendor_card"
    : location.startsWith("w2b_pricing") ? "pricing_table"
    : "vendor_card";

  const handleClick = () => {
    // 1. GA4
    trackAffiliateClick({
      vendor,
      peptide: "general",
      source_component: surface,
      url: href,
    });
    // 2. Server-side
    trackClick({
      peptide_slug: "general",
      vendor_slug: vendorSlug,
      page_path: window.location.pathname,
      surface,
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener sponsored"
      onClick={handleClick}
      className={className}
      id={`affiliate-vendor-card-${location}`}
    >
      {children}
    </a>
  );
}
