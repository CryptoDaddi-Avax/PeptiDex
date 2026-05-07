"use client";

import { ExternalLink } from "lucide-react";
import { PRIMARY_PROMO } from "@/lib/promos/config";
import { buildAffiliateUrl, AFFILIATE_LINK_ATTRS } from "@/lib/promos/affiliateUrl";
import { PromoCodeDisplay } from "./PromoCodeDisplay";
import type { PromoSurface } from "@/lib/promos/affiliateUrl";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ToolPageConversionBlockProps {
  /** Which tool page — used for analytics surface label */
  surface: PromoSurface;
  /** Optional peptide context for link specificity */
  peptide?: string;
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Contextual next-step conversion block for tool pages.
 * Renders AFTER the primary tool output — feels like a useful suggestion,
 * not an interruption.
 *
 * Intentionally small and understated: icon + one sentence + compact code.
 */
export function ToolPageConversionBlock({
  surface,
  className = "",
}: ToolPageConversionBlockProps) {
  if (!PRIMARY_PROMO.isActive) return null;

  const shopUrl = buildAffiliateUrl(PRIMARY_PROMO, surface);

  return (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-amber-500/15 bg-amber-950/10 ${className}`}
      role="complementary"
      aria-label="Vendor recommendation"
    >
      {/* Left: message */}
      <p className="text-xs text-zinc-400 leading-snug">
        Need a vial?{" "}
        <span className="text-amber-400 font-semibold">
          Save {PRIMARY_PROMO.discountPercent}%
        </span>
        {" "}at {PRIMARY_PROMO.vendorName} — code{" "}
        <PromoCodeDisplay
          promo={PRIMARY_PROMO}
          surface={surface}
          variant="compact"
          className="inline-flex"
        />
      </p>

      {/* Right: shop link */}
      <a
        href={shopUrl}
        {...AFFILIATE_LINK_ATTRS}
        className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-xs font-bold text-amber-400 transition-colors whitespace-nowrap"
        aria-label={`Shop ${PRIMARY_PROMO.vendorName} with ${PRIMARY_PROMO.discountPercent}% off`}
      >
        Shop {PRIMARY_PROMO.vendorName}
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}
