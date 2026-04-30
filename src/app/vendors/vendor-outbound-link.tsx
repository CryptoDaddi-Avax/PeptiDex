"use client";

import { type ReactNode } from "react";
import { trackAffiliateClick, vendorKeyFromUrl } from "@/lib/ga4-events";

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
 * Fires both `affiliate_click` (rich segmentation) for revenue attribution.
 * source_component is always "vendor_card" for /vendors page links.
 */
export function VendorOutboundLink({
  href,
  vendorName,
  location,
  className,
  children,
}: VendorOutboundLinkProps) {
  const vendor = vendorKeyFromUrl(href);

  const handleClick = () => {
    trackAffiliateClick({
      vendor,
      peptide: "general",
      source_component: "vendor_card",
      url: href,
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
