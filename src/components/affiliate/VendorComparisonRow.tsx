"use client";

import { ExternalLink, Trophy } from "lucide-react";
import { type EnrichedVendorOffer, AFFILIATE_LINK_ATTRS, trackClick } from "@/lib/affiliate";
import { VendorDot } from "./atoms/VendorDot";
import { CopyCodeButton } from "./atoms/CopyCodeButton";
import type { AffiliateSource } from "@/lib/ga4-events";

// ── Props ───────────────────────────────────────────────────────────────────

interface VendorComparisonRowProps {
  offer: EnrichedVendorOffer;
  peptideSlug?: string;
  /** Show vial size column */
  showVial?: boolean;
  /** Show cost/mg column */
  showCostPerMg?: boolean;
  /** Show discount code column */
  showCode?: boolean;
  /** Compact mode for inline use (BuyBox, detail pages) */
  compact?: boolean;
  /** Rank number for display (1, 2, 3) */
  rank?: number;
  /** Surface tag for tracking */
  source?: AffiliateSource;
}

// ── Component ───────────────────────────────────────────────────────────────

export function VendorComparisonRow({
  offer,
  peptideSlug,
  showVial = true,
  showCostPerMg = true,
  showCode = true,
  compact = false,
  rank,
  source = "vendor_row",
}: VendorComparisonRowProps) {
  const { vendor, price_usd, vial_mg, costPerMg, discount, trackedUrl, isCheapest } = offer;

  const handleClick = () => {
    trackClick(offer, source, peptideSlug);
  };

  // ── Compact mode (used in BuyBox, detail pages) ──────────────────────────
  if (compact) {
    return (
      <div
        className="flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg border transition-colors"
        style={{
          borderColor: isCheapest ? "rgba(74,222,128,0.25)" : "rgba(255,255,255,0.06)",
          background: isCheapest ? "rgba(74,222,128,0.04)" : "rgba(255,255,255,0.02)",
        }}
      >
        {/* Left: rank + vendor */}
        <div className="flex items-center gap-2 min-w-0">
          {rank && (
            <span
              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold"
              style={{
                background: rank === 1 ? "rgba(201,169,97,0.2)" : "rgba(255,255,255,0.06)",
                color: rank === 1 ? "#c9a961" : "#71717a",
              }}
            >
              {rank}
            </span>
          )}
          <VendorDot vendorSlug={vendor.slug} size={6} />
          <span className="text-xs font-medium text-zinc-200 truncate">{vendor.name}</span>
          {isCheapest && (
            <span className="flex-shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
              <Trophy className="w-2 h-2" /> Best $/mg
            </span>
          )}
        </div>

        {/* Right: price + CTA */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            {discount.discountApplied ? (
              <>
                <div className="text-sm font-mono font-bold text-amber-400">${discount.finalPrice.toFixed(2)}</div>
                <div className="text-[10px] text-zinc-500 line-through">${price_usd.toFixed(2)}</div>
              </>
            ) : (
              <div className="text-sm font-mono font-bold text-zinc-200">${price_usd.toFixed(2)}</div>
            )}
          </div>
          {vendor.discountCode && <CopyCodeButton code={vendor.discountCode} />}
          <a
            href={trackedUrl}
            onClick={handleClick}
            {...AFFILIATE_LINK_ATTRS}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors whitespace-nowrap"
          >
            Shop <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    );
  }

  // ── Full mode (used in pricing tables) ───────────────────────────────────
  return (
    <div
      className="grid items-center gap-4 py-3 px-4 border-b transition-colors hover:bg-white/[0.02]"
      style={{
        gridTemplateColumns: showVial
          ? "1.8fr 0.8fr 0.9fr 0.7fr 0.6fr 0.7fr 0.5fr"
          : "2fr 1fr 1fr 0.8fr 0.8fr 0.6fr",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      {/* Vendor */}
      <div className="flex items-center gap-2 min-w-0">
        <VendorDot vendorSlug={vendor.slug} size={8} />
        <span className="text-sm font-medium text-zinc-200 truncate">{vendor.name}</span>
        {isCheapest && (
          <span className="flex-shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
            <Trophy className="w-2.5 h-2.5" /> Best Price
          </span>
        )}
        {vendor.badge === "Editor's Choice" && !isCheapest && (
          <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/25">
            {vendor.badge}
          </span>
        )}
      </div>

      {/* List Price */}
      <div>
        <span className={`font-mono text-sm ${discount.discountApplied ? "line-through text-zinc-500" : "text-zinc-200"}`}>
          ${price_usd.toFixed(2)}
        </span>
        {showVial && vial_mg > 0 && (
          <span className="block text-[10px] text-zinc-600 font-mono">{vial_mg}mg vial</span>
        )}
      </div>

      {/* PEPTIDEX Price */}
      <div>
        {discount.discountApplied ? (
          <>
            <div className="font-mono text-sm font-bold text-amber-400">${discount.finalPrice.toFixed(2)}</div>
            <div className="text-[10px] text-emerald-400 font-mono">-{vendor.discountPercent}% · Save ${discount.savings.toFixed(2)}</div>
          </>
        ) : (
          <span className="font-mono text-sm text-zinc-400">${price_usd.toFixed(2)}</span>
        )}
      </div>

      {/* You Save */}
      <div>
        {discount.discountApplied ? (
          <span className="font-mono text-sm text-emerald-400">${discount.savings.toFixed(2)}</span>
        ) : (
          <span className="text-zinc-600">—</span>
        )}
      </div>

      {/* Cost/mg */}
      {showCostPerMg && (
        <div>
          {costPerMg > 0 ? (
            <span className="font-mono text-xs text-zinc-400">${costPerMg.toFixed(2)}/mg</span>
          ) : (
            <span className="text-zinc-600">—</span>
          )}
        </div>
      )}

      {/* Code */}
      {showCode && (
        <div>
          {vendor.discountCode ? (
            <CopyCodeButton code={vendor.discountCode} />
          ) : (
            <span className="text-zinc-600 text-xs">—</span>
          )}
        </div>
      )}

      {/* Shop */}
      <div>
        <a
          href={trackedUrl}
          onClick={handleClick}
          {...AFFILIATE_LINK_ATTRS}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors whitespace-nowrap"
        >
          Shop <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

// ── Mobile card variant ─────────────────────────────────────────────────────

export function VendorComparisonCard({
  offer,
  peptideSlug,
  source = "vendor_row",
}: {
  offer: EnrichedVendorOffer;
  peptideSlug?: string;
  source?: AffiliateSource;
}) {
  const { vendor, price_usd, vial_mg, discount, trackedUrl, isCheapest } = offer;

  const handleClick = () => trackClick(offer, source, peptideSlug);

  return (
    <div
      className="rounded-xl border p-4 transition-colors"
      style={{
        borderColor: isCheapest ? "rgba(74,222,128,0.25)" : "rgba(255,255,255,0.06)",
        background: isCheapest ? "rgba(74,222,128,0.04)" : "rgba(255,255,255,0.02)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <VendorDot vendorSlug={vendor.slug} size={8} />
          <span className="text-sm font-medium text-zinc-200">{vendor.name}</span>
          {isCheapest && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
              <Trophy className="w-2 h-2" /> Best
            </span>
          )}
        </div>
        <div className="text-right">
          {discount.discountApplied ? (
            <>
              <div className="text-lg font-mono font-bold text-amber-400">${discount.finalPrice.toFixed(2)}</div>
              <div className="text-[10px] text-zinc-500 line-through">${price_usd.toFixed(2)}</div>
            </>
          ) : (
            <div className="text-lg font-mono font-bold text-zinc-200">${price_usd.toFixed(2)}</div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
        <div>
          <span className="text-zinc-500">Vial:</span>{" "}
          <span className="text-zinc-300 font-mono">{vial_mg}mg</span>
        </div>
        {discount.discountApplied && (
          <div>
            <span className="text-zinc-500">Save:</span>{" "}
            <span className="text-emerald-400 font-mono">${discount.savings.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {vendor.discountCode && <CopyCodeButton code={vendor.discountCode} />}
        <a
          href={trackedUrl}
          onClick={handleClick}
          {...AFFILIATE_LINK_ATTRS}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
        >
          Shop Now <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
