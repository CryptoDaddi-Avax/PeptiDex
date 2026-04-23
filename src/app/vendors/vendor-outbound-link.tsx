"use client";

import { trackOutboundClick } from "@/lib/ga4-events";

interface VendorOutboundLinkProps {
  href: string;
  vendorName: string;
  location: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * A wrapper around <a> that fires GA4 outbound_click tracking
 * before navigating to the vendor's external site.
 */
export function VendorOutboundLink({
  href,
  vendorName,
  location,
  className,
  children,
}: VendorOutboundLinkProps) {
  const handleClick = () => {
    trackOutboundClick(vendorName, href, location);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener sponsored"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
