"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackAffiliateClick, vendorKeyFromUrl, type AffiliateSource } from "@/lib/ga4-events";
import { trackClick } from "@/lib/tracking/click";

type TrackedOutboundLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  /** Vendor slug as stored in affiliate_clicks.vendor_slug, e.g. "amino-club" */
  vendorSlug: string;
  peptideSlug?: string;
  /** Distinct per placement so clicks can be attributed to the surface */
  surface: AffiliateSource | (string & {});
};

/**
 * Drop-in replacement for an outbound vendor <a>: renders the same anchor
 * (all attributes passed through unchanged) and dual-writes the click to
 * GA4 affiliate_click and /api/track. Usable from server components.
 */
export function TrackedOutboundLink({
  vendorSlug,
  peptideSlug = "general",
  surface,
  onClick,
  ...anchorProps
}: TrackedOutboundLinkProps) {
  const handleClick: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"] = (e) => {
    onClick?.(e);
    trackAffiliateClick({
      vendor: vendorKeyFromUrl(anchorProps.href),
      peptide: peptideSlug,
      source_component: surface as AffiliateSource,
      url: anchorProps.href,
    });
    trackClick({
      peptide_slug: peptideSlug,
      vendor_slug: vendorSlug,
      page_path: window.location.pathname,
      surface,
    });
  };

  return <a {...anchorProps} onClick={handleClick} />;
}
