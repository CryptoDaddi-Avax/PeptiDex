import type { CSSProperties } from "react";
import { vendorBySlug } from "@/data/vendors";

/** Material-connection disclosure for vendors owned by PeptiDex's founder. */
export const FOUNDER_OWNERSHIP_DISCLOSURE =
  "PeptiDex's founder owns Elyria Bio. Its placement and pricing are shown alongside other vendors; we earn more when you buy from Elyria.";

export function isFounderOwned(vendorSlug?: string | null): boolean {
  return Boolean(vendorSlug && vendorBySlug[vendorSlug]?.ownedByFounder);
}

const boxStyle: CSSProperties = {
  margin: "12px 0",
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid rgba(245, 158, 11, 0.45)",
  background: "rgba(245, 158, 11, 0.08)",
  fontSize: 13,
  lineHeight: 1.5,
};

const inlineStyle: CSSProperties = {
  display: "block",
  marginTop: 4,
  fontSize: 11,
  lineHeight: 1.4,
  opacity: 0.85,
};

/**
 * Renders the disclosure when `vendorSlug` is founder-owned (or always, when
 * `vendorSlug` is omitted). `box` for page-level notices, `inline` under a
 * vendor name, CTA or promo. No hooks, so it works in server and client trees.
 */
export function FounderOwnershipDisclosure({
  vendorSlug,
  variant = "box",
  className,
  style,
}: {
  vendorSlug?: string | null;
  variant?: "box" | "inline";
  className?: string;
  style?: CSSProperties;
}) {
  if (vendorSlug !== undefined && !isFounderOwned(vendorSlug)) return null;
  const Tag = variant === "box" ? "p" : "span";
  return (
    <Tag
      role="note"
      data-disclosure="founder-ownership"
      className={className}
      style={{ ...(variant === "box" ? boxStyle : inlineStyle), ...style }}
    >
      <strong>Disclosure:</strong> {FOUNDER_OWNERSHIP_DISCLOSURE}
    </Tag>
  );
}
