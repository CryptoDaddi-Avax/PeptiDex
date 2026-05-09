"use client";

import { useState, useMemo } from "react";
import { ShoppingBag, ChevronDown, AlertCircle, Shield } from "lucide-react";
import {
  getTopVendorsForPeptide,
  type EnrichedVendorOffer,
} from "@/lib/affiliate";
import type { PromoSurface } from "@/lib/promos/affiliateUrl";
import { VendorComparisonRow } from "./VendorComparisonRow";
import { VendorComparisonCard } from "./VendorComparisonRow";

// ── Props ───────────────────────────────────────────────────────────────────

interface BuyBoxProps {
  peptideSlug: string;
  peptideName: string;
  /** Max vendors to show (default 3) */
  limit?: number;
  /** Override surface label */
  surface?: PromoSurface;
}

// ── Component ───────────────────────────────────────────────────────────────

export function BuyBox({
  peptideSlug,
  peptideName,
  limit = 3,
  surface = "buy_box",
}: BuyBoxProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const offers = useMemo(
    () => getTopVendorsForPeptide(peptideSlug, surface, limit),
    [peptideSlug, surface, limit]
  );

  // ── Empty state ──────────────────────────────────────────────────────────
  if (offers.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-zinc-400">
              No verified vendors carry <strong className="text-zinc-300">{peptideName}</strong> with
              confirmed pricing yet.
            </p>
            <p className="text-[10px] text-zinc-600 mt-1">
              Check back soon — we verify new listings weekly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const cheapest = offers.find(o => o.isCheapest) ?? offers[0];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-300">
            Where to source
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-600">
          {offers.length} vendor{offers.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Best price callout */}
      {cheapest.discount.discountApplied && (
        <div className="px-4 py-2 border-b border-zinc-800 bg-amber-500/[0.04] flex items-center gap-2">
          <Shield className="w-3 h-3 text-amber-400" />
          <span className="text-[10px] text-amber-400/80">
            PEPTIDEX readers save up to{" "}
            <strong className="text-amber-400">
              ${Math.max(...offers.filter(o => o.discount.discountApplied).map(o => o.discount.savings)).toFixed(2)}
            </strong>
          </span>
        </div>
      )}

      {/* ── Desktop rows ─────────────────────────────────────────────────── */}
      <div className="hidden md:block">
        <div className="divide-y divide-zinc-800/50">
          {offers.map((offer, i) => (
            <div key={offer.vendor.slug} className="px-1">
              <VendorComparisonRow
                offer={offer}
                peptideSlug={peptideSlug}
                compact
                rank={i + 1}
                showVial={false}
                showCostPerMg={false}
                showCode={false}
                source="buy_box"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile cards ─────────────────────────────────────────────────── */}
      <div className="md:hidden">
        {/* Always show cheapest */}
        <div className="p-3">
          <VendorComparisonCard
            offer={cheapest}
            peptideSlug={peptideSlug}
            source="buy_box"
          />
        </div>

        {/* Expand for more */}
        {offers.length > 1 && (
          <>
            <button
              onClick={() => setMobileExpanded(e => !e)}
              className="w-full flex items-center justify-center gap-1 py-2.5 border-t border-zinc-800 text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {mobileExpanded ? "Show less" : `Compare ${offers.length - 1} more vendor${offers.length > 2 ? "s" : ""}`}
              <ChevronDown
                className={`w-3 h-3 transition-transform ${mobileExpanded ? "rotate-180" : ""}`}
              />
            </button>
            {mobileExpanded && (
              <div className="px-3 pb-3 space-y-2">
                {offers
                  .filter(o => o.vendor.slug !== cheapest.vendor.slug)
                  .map(offer => (
                    <VendorComparisonCard
                      key={offer.vendor.slug}
                      offer={offer}
                      peptideSlug={peptideSlug}
                      source="buy_box"
                    />
                  ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-zinc-800 bg-zinc-900/40">
        <p className="text-[9px] text-zinc-600 text-center">
          Prices verified periodically · Rankings independent · Research use only
        </p>
      </div>
    </div>
  );
}
