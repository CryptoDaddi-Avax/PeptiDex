"use client";

import { type ReactNode } from "react";
import {
  trackAffiliateClick,
  vendorKeyFromUrl,
  type AffiliateVendor,
  type AffiliateSource,
} from "@/lib/ga4-events";
import { trackClick, type TrackSurface } from "@/lib/tracking/click";

interface AffiliateLinkProps {
  href: string;
  /** Human-readable vendor key. If omitted, inferred from the URL. */
  vendor?: AffiliateVendor | "unknown";
  /** Vendor slug for server-side tracking (e.g. "amino-club"). Inferred if omitted. */
  vendorSlug?: string;
  /** Peptide slug this click is associated with, or "general". */
  peptide?: string;
  /** Which UI surface the link lives in — used to segment reports. */
  source: AffiliateSource | TrackSurface | string;
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
 * Universal affiliate link component — dual-write tracking.
 *
 * 1. Fires GA4 `affiliate_click` event (existing pipeline).
 * 2. Posts to /api/track for server-side conversion analytics.
 *    - peptide_slug, vendor_slug, page_path, surface, session_id (rotating hash)
 *    - NO IP, NO user-agent, NO PII logged.
 *
 * All affiliate links on the site must use this component.
 */
export function AffiliateLink({
  href,
  vendor,
  vendorSlug,
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

  // Derive vendorSlug from vendorKey if not explicitly provided
  const resolvedVendorSlug =
    vendorSlug ??
    (resolvedVendor !== "unknown"
      ? resolvedVendor.replace(/_/g, "-")
      : "unknown");

  const handleClick = () => {
    // 1. GA4 — existing pipeline (no change)
    trackAffiliateClick({
      vendor: resolvedVendor,
      peptide,
      source_component: source,
      url: href,
    });

    // 2. Server-side tracking — fire-and-forget
    trackClick({
      peptide_slug: peptide,
      vendor_slug: resolvedVendorSlug,
      page_path: window.location.pathname,
      surface: source,
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
