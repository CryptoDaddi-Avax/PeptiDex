"use client";

/**
 * <BuyBox />
 * ==========
 * Conversion surface for peptide detail pages.
 *
 * Layout:
 *   Desktop — sticky right-rail (320px), mounted inside .pd-sidebar-sticky
 *   Mobile  — inline, above-the-fold (after QuickAnswerBlock)
 *
 * Ranking — cost-per-mg ascending (NOT cost-per-vial).
 *   #1 → full hero card: large CTA, discount code badge, purity %, COA link
 *   #2-3 → compact rows
 *   Partial (<3) → show available
 *   Zero → empty state linking to /vendors
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Trophy,
  ShieldCheck,
  FileText,
  Tag,
  ChevronDown,
  AlertTriangle,
  ShoppingBag,
  Users,
} from "lucide-react";
import {
  getTopVendorsForPeptide,
  type EnrichedVendorOffer,
  AFFILIATE_LINK_ATTRS,
  trackClick,
} from "@/lib/affiliate";
import type { PromoSurface } from "@/lib/promos/affiliateUrl";
import { VendorDot } from "./atoms/VendorDot";
import { CopyCodeButton } from "./atoms/CopyCodeButton";

// ── Props ───────────────────────────────────────────────────────────────────

interface BuyBoxProps {
  peptideSlug: string;
  peptideName: string;
  /** Max vendors to display (default 3) */
  limit?: number;
  surface?: PromoSurface;
}

// ── #1 Hero Card ────────────────────────────────────────────────────────────

function HeroVendorCard({
  offer,
  peptideSlug,
}: {
  offer: EnrichedVendorOffer;
  peptideSlug: string;
}) {
  const { vendor, price_usd, vial_mg, costPerMg, discount, trackedUrl, coaUrl, lastTestedDate } =
    offer;

  const handleClick = () => trackClick(offer, "buy_box", peptideSlug);

  const testDate = lastTestedDate
    ? new Date(lastTestedDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : null;

  return (
    <div
      className="rounded-xl border p-4 mb-1"
      style={{
        borderColor: "rgba(201,169,97,0.3)",
        background:
          "linear-gradient(135deg, rgba(201,169,97,0.06) 0%, rgba(10,10,10,0.8) 100%)",
      }}
    >
      {/* Top row: rank badge + vendor name */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-mono font-bold"
          style={{ background: "rgba(201,169,97,0.2)", color: "#c9a961" }}
        >
          1
        </span>
        <VendorDot vendorSlug={vendor.slug} size={7} />
        <span className="text-sm font-bold text-zinc-200 flex-1">{vendor.name}</span>
        <span
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
          style={{
            background: "rgba(74,222,128,0.12)",
            color: "#4ade80",
            border: "1px solid rgba(74,222,128,0.25)",
          }}
        >
          <Trophy className="w-2 h-2" /> Best $/mg
        </span>
      </div>

      {/* Price block */}
      <div className="flex items-end gap-3 mb-3">
        <div>
          {discount.discountApplied ? (
            <>
              <div className="text-2xl font-mono font-bold text-amber-400 leading-none">
                ${discount.finalPrice.toFixed(2)}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-zinc-500 line-through font-mono">
                  ${price_usd.toFixed(2)}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  Save ${discount.savings.toFixed(2)}
                </span>
              </div>
            </>
          ) : (
            <div className="text-2xl font-mono font-bold text-zinc-100 leading-none">
              ${price_usd.toFixed(2)}
            </div>
          )}
        </div>
        <div className="text-right text-xs text-zinc-500 mb-0.5 leading-tight">
          <div className="font-mono">{vial_mg}mg vial</div>
          <div className="font-mono text-amber-400/70">${costPerMg.toFixed(2)}/mg</div>
        </div>
      </div>

      {/* Trust signals row */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-flex items-center gap-1 text-[10px] text-zinc-400">
          <ShieldCheck className="w-3 h-3 text-zinc-500" />
          {vendor.purity} purity
        </span>
        {coaUrl && (
          <a
            href={coaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] text-amber-400/80 hover:text-amber-400 transition-colors"
          >
            <FileText className="w-3 h-3" />
            COA{testDate ? ` · ${testDate}` : ""}
          </a>
        )}
        {!coaUrl && testDate && (
          <span className="inline-flex items-center gap-1 text-[10px] text-zinc-500">
            <FileText className="w-3 h-3" />
            Tested {testDate}
          </span>
        )}
      </div>

      {/* Discount code */}
      {discount.discountApplied && vendor.discountCode && (
        <div className="flex items-center gap-2 mb-3 p-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.06]">
          <Tag className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="text-[10px] text-amber-400/80 flex-1">
            Use code for {vendor.discountPercent}% off:
          </span>
          <CopyCodeButton code={vendor.discountCode} />
        </div>
      )}

      {/* Primary CTA */}
      <a
        href={trackedUrl}
        onClick={handleClick}
        {...AFFILIATE_LINK_ATTRS}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-bold transition-all"
        style={{
          background: "rgb(22,163,74)",
          color: "white",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgb(21,128,61)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgb(22,163,74)")}
      >
        Shop {vendor.name} <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

// ── #2-3 Compact Row ────────────────────────────────────────────────────────

function CompactVendorRow({
  offer,
  rank,
  peptideSlug,
}: {
  offer: EnrichedVendorOffer;
  rank: number;
  peptideSlug: string;
}) {
  const { vendor, price_usd, vial_mg, costPerMg, discount, trackedUrl, coaUrl } = offer;

  const handleClick = () => trackClick(offer, "buy_box", peptideSlug);

  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 border-b last:border-b-0 transition-colors"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      {/* Rank */}
      <span
        className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono font-bold"
        style={{ background: "rgba(255,255,255,0.06)", color: "#71717a" }}
      >
        {rank}
      </span>

      {/* Vendor + meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <VendorDot vendorSlug={vendor.slug} size={5} />
          <span className="text-xs font-medium text-zinc-300 truncate">{vendor.name}</span>
          {coaUrl && (
            <a
              href={coaUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View COA"
              className="text-zinc-600 hover:text-amber-400 transition-colors"
            >
              <FileText className="w-2.5 h-2.5" />
            </a>
          )}
        </div>
        <div className="text-[10px] text-zinc-600 font-mono mt-0.5">
          {vial_mg}mg · ${costPerMg.toFixed(2)}/mg
        </div>
      </div>

      {/* Price */}
      <div className="text-right shrink-0">
        {discount.discountApplied ? (
          <>
            <div className="text-xs font-mono font-bold text-amber-400">
              ${discount.finalPrice.toFixed(2)}
            </div>
            <div className="text-[9px] text-zinc-600 line-through font-mono">
              ${price_usd.toFixed(2)}
            </div>
          </>
        ) : (
          <div className="text-xs font-mono text-zinc-300">${price_usd.toFixed(2)}</div>
        )}
      </div>

      {/* Shop link */}
      <a
        href={trackedUrl}
        onClick={handleClick}
        {...AFFILIATE_LINK_ATTRS}
        className="shrink-0 flex items-center gap-0.5 px-2 py-1 rounded-md text-[10px] font-bold transition-colors"
        style={{
          background: "rgba(22,163,74,0.15)",
          color: "#4ade80",
          border: "1px solid rgba(74,222,128,0.2)",
        }}
      >
        Shop <ExternalLink className="w-2.5 h-2.5" />
      </a>
    </div>
  );
}

// ── Empty State ─────────────────────────────────────────────────────────────

function EmptyState({ peptideName, peptideSlug }: { peptideName: string; peptideSlug: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <div className="flex items-start gap-3 mb-3">
        <AlertTriangle className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Sourcing data for <strong className="text-zinc-300">{peptideName}</strong> is updating.
          </p>
          <p className="text-[10px] text-zinc-600 mt-1">
            We verify new listings weekly — check back soon.
          </p>
        </div>
      </div>
      <Link
        href="/vendors"
        className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-bold border border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 transition-colors"
      >
        <Users className="w-3 h-3" /> Browse verified vendors
      </Link>
    </div>
  );
}

// ── Mobile wrapper (collapsible) ────────────────────────────────────────────

function MobileBuyBox({ children, offerCount }: { children: React.ReactNode; offerCount: number }) {
  const [open, setOpen] = useState(false);

  if (offerCount === 0) return <div className="md:hidden mb-4">{children}</div>;

  return (
    <div className="md:hidden mb-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-900/70"
      >
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-300">
            Where to Source
          </span>
          <span className="text-[9px] font-mono text-zinc-600">
            ({offerCount} vendor{offerCount !== 1 ? "s" : ""})
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

// ── Main BuyBox ─────────────────────────────────────────────────────────────

export function BuyBox({
  peptideSlug,
  peptideName,
  limit = 3,
  surface = "buy_box",
}: BuyBoxProps) {
  const offers = useMemo(
    () => getTopVendorsForPeptide(peptideSlug, surface, limit),
    [peptideSlug, surface, limit]
  );

  const totalVendorCount = useMemo(
    () => getTopVendorsForPeptide(peptideSlug, surface, 99).length,
    [peptideSlug, surface]
  );

  const inner = (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-300">
            Where to Source
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-600">Ranked by $/mg</span>
      </div>

      {offers.length === 0 ? (
        <div className="p-3">
          <EmptyState peptideName={peptideName} peptideSlug={peptideSlug} />
        </div>
      ) : (
        <>
          {/* #1 Hero card */}
          <div className="p-3 pb-2">
            <HeroVendorCard offer={offers[0]} peptideSlug={peptideSlug} />
          </div>

          {/* #2–3 Compact rows */}
          {offers.length > 1 && (
            <div className="border-t border-zinc-800/60">
              {offers.slice(1).map((offer, i) => (
                <CompactVendorRow
                  key={offer.vendor.slug}
                  offer={offer}
                  rank={i + 2}
                  peptideSlug={peptideSlug}
                />
              ))}
            </div>
          )}

          {/* Footer: compare link + disclaimer */}
          <div
            className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between gap-2"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            <Link
              href={`/vendors#${peptideSlug}`}
              className="text-[10px] font-mono text-amber-400/70 hover:text-amber-400 transition-colors underline underline-offset-2 decoration-amber-500/30 whitespace-nowrap"
            >
              Compare all {totalVendorCount > 0 ? totalVendorCount : "6"} vendors →
            </Link>
            <p className="text-[9px] text-zinc-700 text-right leading-tight">
              Rankings independent · Research use only
            </p>
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile: collapsible banner */}
      <MobileBuyBox offerCount={offers.length}>{inner}</MobileBuyBox>

      {/* Desktop: always visible (sticky handled by .pd-sidebar-sticky in parent) */}
      <div className="hidden md:block">{inner}</div>
    </>
  );
}
