"use client";

import { useMemo, useState } from "react";
import { ExternalLink, ShoppingCart, ChevronDown, AlertTriangle } from "lucide-react";
import {
  calculateStackCost,
  AFFILIATE_LINK_ATTRS,
  buildTrackedAffiliateUrl,
} from "@/lib/affiliate";
import { vendorsSorted, type Vendor } from "@/data/vendors";
import type { PromoSurface } from "@/lib/promos/affiliateUrl";
import { VendorDot } from "./atoms/VendorDot";

// ── Props ───────────────────────────────────────────────────────────────────

interface StackCartBuilderProps {
  peptideSlugs: string[];
  stackName: string;
  surface?: PromoSurface;
}

interface VendorCartResult {
  vendor: Vendor;
  total: number;
  savings: number;
  itemCount: number;
  missingCount: number;
  ctaUrl: string;
}

// ── Component ───────────────────────────────────────────────────────────────

export function StackCartBuilder({
  peptideSlugs,
  stackName,
  surface = "stack_cart_builder",
}: StackCartBuilderProps) {
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null);

  const vendorResults = useMemo(() => {
    const results: VendorCartResult[] = [];

    for (const vendor of vendorsSorted) {
      // Only consider injectable vendors (oral vendors won't carry full stacks)
      if (vendor.category !== "injectable") continue;

      const cost = calculateStackCost(peptideSlugs, vendor.slug, surface);
      // Only show vendor if they carry at least 1 peptide from the stack
      if (cost.items.length === 0) continue;

      results.push({
        vendor,
        total: cost.total,
        savings: cost.savings,
        itemCount: cost.items.length,
        missingCount: cost.missingCount,
        ctaUrl: buildTrackedAffiliateUrl(vendor, surface),
      });
    }

    // Sort by total cost ascending (vendors with more coverage break ties)
    results.sort((a, b) => {
      // Prioritize vendors with full or near-full coverage
      const aCoverage = a.itemCount / (a.itemCount + a.missingCount);
      const bCoverage = b.itemCount / (b.itemCount + b.missingCount);
      if (Math.abs(aCoverage - bCoverage) > 0.3) return bCoverage - aCoverage;
      return a.total - b.total;
    });

    return results.slice(0, 3);
  }, [peptideSlugs, surface]);

  // ── No data state ────────────────────────────────────────────────────────
  if (vendorResults.length === 0 || vendorResults.every(v => v.itemCount === 0)) {
    return null; // Don't render if no pricing data for any vendor
  }

  const totalPeptides = peptideSlugs.length;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-zinc-800">
        <div className="flex items-center gap-2 mb-1">
          <ShoppingCart className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-bold text-zinc-200">Build This Stack</span>
        </div>
        <p className="text-[11px] text-zinc-500">
          Estimated total cost for the{" "}
          <strong className="text-zinc-400">{stackName}</strong> stack ({totalPeptides} compounds)
          across verified vendors.
        </p>
      </div>

      {/* Vendor cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
        {vendorResults.map((result, idx) => {
          const isExpanded = expandedVendor === result.vendor.slug;
          const hasFullCoverage = result.missingCount === 0;

          return (
            <div
              key={result.vendor.slug}
              className="p-4 flex flex-col"
            >
              {/* Vendor name + rank */}
              <div className="flex items-center gap-2 mb-3">
                <VendorDot vendorSlug={result.vendor.slug} />
                <span className="text-sm font-medium text-zinc-200">{result.vendor.name}</span>
                {idx === 0 && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/25">
                    Best Value
                  </span>
                )}
              </div>

              {/* Total price */}
              <div className="mb-2">
                <div className="text-2xl font-mono font-bold text-zinc-100">
                  ${result.total.toFixed(2)}
                </div>
                {result.savings > 0 && (
                  <div className="text-[11px] font-mono text-emerald-400">
                    Save ${result.savings.toFixed(2)} with PEPTIDEX
                  </div>
                )}
              </div>

              {/* Coverage indicator */}
              <div className="flex items-center gap-1.5 mb-3">
                {hasFullCoverage ? (
                  <span className="text-[10px] text-emerald-400 font-mono">
                    ✓ All {totalPeptides} peptides available
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] text-amber-400/80 font-mono">
                    <AlertTriangle className="w-2.5 h-2.5" />
                    {result.itemCount} of {totalPeptides} available
                  </span>
                )}
              </div>

              {/* Details toggle */}
              <button
                onClick={() => setExpandedVendor(isExpanded ? null : result.vendor.slug)}
                className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-zinc-300 font-mono mb-3 transition-colors"
              >
                Price breakdown
                <ChevronDown className={`w-2.5 h-2.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </button>

              {isExpanded && (
                <div className="mb-3 space-y-1 text-[10px] font-mono">
                  {calculateStackCost(peptideSlugs, result.vendor.slug, surface).items.map(item => (
                    <div key={item.vendor.slug + "-" + item.affiliateUrl} className="flex justify-between text-zinc-400">
                      <span className="truncate">{item.vial_mg}mg</span>
                      <span className="text-zinc-300">${item.discount.finalPrice.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              <a
                href={result.ctaUrl}
                {...AFFILIATE_LINK_ATTRS}
                className="mt-auto flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
                style={{
                  background: idx === 0 ? "rgb(22,163,74)" : "rgba(255,255,255,0.06)",
                  color: idx === 0 ? "white" : "#d4d4d8",
                }}
              >
                Build cart at {result.vendor.name} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="px-5 py-2 border-t border-zinc-800 bg-zinc-900/40">
        <p className="text-[9px] text-zinc-600 text-center">
          Totals are estimates — individual products must be added at vendor checkout.
          Affiliate links · Rankings independent.
        </p>
      </div>
    </div>
  );
}
