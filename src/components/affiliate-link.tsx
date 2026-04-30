"use client";

import { type ReactNode } from "react";
import {
  trackAffiliateClick,
  vendorKeyFromUrl,
  type AffiliateVendor,
  type AffiliateSource,
} from "@/lib/ga4-events";

interface AffiliateLinkProps {
  href: string;
  /** Human-readable vendor key. If omitted, inferred from the URL. */
  vendor?: AffiliateVendor | "unknown";
  /** Peptide slug this click is associated with, or "general". */
  peptide?: string;
  /** Which UI surface the link lives in — used to segment GA4 reports. */
  source: AffiliateSource | string;
  className?: string;
  children: ReactNode;
  /** Override rel attribute (defaults to "nofollow noopener sponsored") */
  rel?: string;
  /** Override target (defaults to "_blank") */
  target?: string;
  /** Optional id for testing */
  id?: string;
  /** Optional aria-label for accessibility */
  "aria-label"?: string;
}

/**
 * Universal affiliate link component.
 *
 * Fires a GA4 `affiliate_click` event with:
 *   - vendor  (amino_club | limitless_life | ascension | unknown)
 *   - peptide (slug or "general")
 *   - source_component (vendor_card | pricing_table | detail_sourcing | blog_cta | blog_inline | ...)
 *   - source_page (window.location.pathname — auto-captured)
 *   - outbound_url (the full affiliate URL)
 *
 * All affiliate links on the site should use this component.
 */
export function AffiliateLink({
  href,
  vendor,
  peptide = "general",
  source,
  className,
  children,
  rel = "nofollow noopener sponsored",
  target = "_blank",
  id,
  "aria-label": ariaLabel,
}: AffiliateLinkProps) {
  const resolvedVendor: AffiliateVendor | "unknown" =
    vendor ?? vendorKeyFromUrl(href);

  const handleClick = () => {
    trackAffiliateClick({
      vendor: resolvedVendor,
      peptide,
      source_component: source,
      url: href,
    });
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={handleClick}
      className={className}
      id={id}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
