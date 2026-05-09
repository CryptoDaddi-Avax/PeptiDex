"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { getCheapestVendor, AFFILIATE_LINK_ATTRS, trackClick } from "@/lib/affiliate";
import type { PromoSurface } from "@/lib/promos/affiliateUrl";
import { RoleBadge } from "./atoms/RoleBadge";
import { CopyCodeButton } from "./atoms/CopyCodeButton";
import { VendorDot } from "./atoms/VendorDot";

// ── Props ───────────────────────────────────────────────────────────────────

interface PeptideStackCardProps {
  peptideSlug: string;
  peptideName: string;
  /** Role in the stack: "primary" | "synergist" | "support" */
  role: string;
  /** Dosing summary (e.g. "250mcg 5x/week") */
  dosingSummary: string;
  /** Brief rationale for inclusion */
  rationale: string;
  surface?: PromoSurface;
}

// ── Component ───────────────────────────────────────────────────────────────

export function PeptideStackCard({
  peptideSlug,
  peptideName,
  role,
  dosingSummary,
  rationale,
  surface = "stack_card",
}: PeptideStackCardProps) {
  const cheapest = useMemo(
    () => getCheapestVendor(peptideSlug, surface),
    [peptideSlug, surface]
  );

  const handleClick = () => {
    if (cheapest) trackClick(cheapest, "stack_card", peptideSlug);
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 md:p-5 transition-colors hover:border-zinc-700">
      {/* Top row: name + role */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <Link
            href={`/library/${peptideSlug}`}
            className="text-base font-semibold text-zinc-100 hover:text-amber-400 transition-colors truncate"
          >
            {peptideName}
          </Link>
          <RoleBadge role={role} />
        </div>
        <span className="text-[10px] font-mono text-zinc-600 whitespace-nowrap shrink-0">
          {dosingSummary}
        </span>
      </div>

      {/* Rationale */}
      <p className="text-xs text-zinc-400 leading-relaxed mb-3 line-clamp-2">{rationale}</p>

      {/* Pricing + CTA row */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-zinc-800">
        {cheapest ? (
          <>
            {/* Pricing info */}
            <div className="flex items-center gap-2 min-w-0">
              <VendorDot vendorSlug={cheapest.vendor.slug} size={6} />
              <span className="text-xs text-zinc-500 truncate">From</span>
              {cheapest.discount.discountApplied ? (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-mono font-bold text-amber-400">
                    ${cheapest.discount.finalPrice.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-zinc-600 line-through font-mono">
                    ${cheapest.price_usd.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-sm font-mono font-bold text-zinc-200">
                  ${cheapest.price_usd.toFixed(2)}
                </span>
              )}
              <span className="text-[10px] text-zinc-600">at {cheapest.vendor.name}</span>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 shrink-0">
              {cheapest.vendor.discountCode && (
                <CopyCodeButton code={cheapest.vendor.discountCode} className="hidden sm:inline-flex" />
              )}
              <a
                href={cheapest.trackedUrl}
                onClick={handleClick}
                {...AFFILIATE_LINK_ATTRS}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors whitespace-nowrap"
              >
                Shop <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </>
        ) : (
          <Link
            href={`/library/${peptideSlug}`}
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-amber-400 transition-colors"
          >
            View Details <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
