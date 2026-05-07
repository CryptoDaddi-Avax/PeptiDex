"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import type { PromoCode } from "@/lib/promos/config";
import { buildAffiliateUrl, AFFILIATE_LINK_ATTRS } from "@/lib/promos/affiliateUrl";
import {
  trackPromoView,
  trackPromoCopy,
  trackPromoClick,
} from "@/lib/analytics/promo";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PromoCodeDisplayProps {
  promo: PromoCode;
  /** Which UI surface this renders in (for analytics) */
  surface: string;
  /**
   * compact  — code + copy button only (inline use in tables / hero)
   * full     — vendor name, discount %, code, copy, Shop CTA
   * inline   — single sentence: "Save 20% at Amino Club — code PEPTIDEX"
   */
  variant?: "compact" | "full" | "inline";
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function PromoCodeDisplay({
  promo,
  surface,
  variant = "full",
  className = "",
}: PromoCodeDisplayProps) {
  const [copied, setCopied] = useState(false);
  const viewFired = useRef(false);
  const shopUrl = buildAffiliateUrl(promo, surface);

  // Fire view event once on mount
  useEffect(() => {
    if (!viewFired.current) {
      viewFired.current = true;
      trackPromoView({
        vendor: promo.gaKey,
        code: promo.code,
        surface,
        is_return_visitor: getIsReturnVisitor(),
      });
    }
  }, [promo, surface]);

  function handleCopy() {
    navigator.clipboard.writeText(promo.code).then(() => {
      setCopied(true);
      trackPromoCopy({
        vendor: promo.gaKey,
        code: promo.code,
        surface,
        is_return_visitor: getIsReturnVisitor(),
      });
      // Mark promo as clicked this session (suppresses exit modal)
      sessionStorage.setItem("peptidex_promo_clicked", "true");
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleShopClick() {
    trackPromoClick({
      vendor: promo.gaKey,
      code: promo.code,
      surface,
      is_return_visitor: getIsReturnVisitor(),
    });
    // Mark promo as clicked this session (suppresses exit modal)
    sessionStorage.setItem("peptidex_promo_clicked", "true");
  }

  // ── Inline variant ────────────────────────────────────────────────────────

  if (variant === "inline") {
    return (
      <span className={`inline-flex items-center gap-1.5 flex-wrap ${className}`}>
        <span className="text-zinc-300">
          Save{" "}
          <span className="text-amber-400 font-semibold">{promo.discountPercent}%</span>
          {" "}at{" "}
          <a
            href={shopUrl}
            onClick={handleShopClick}
            {...AFFILIATE_LINK_ATTRS}
            className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
          >
            {promo.vendorName}
          </a>
          {" "}with code
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 font-mono text-sm font-bold text-amber-400 hover:bg-amber-500/25 transition-colors"
          aria-label={`Copy discount code ${promo.code}`}
        >
          {promo.code}
          {copied ? (
            <Check className="w-3 h-3 text-emerald-400" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </button>
      </span>
    );
  }

  // ── Compact variant ───────────────────────────────────────────────────────

  if (variant === "compact") {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <span className="font-mono text-sm font-bold text-amber-400 tracking-wider">
          {promo.code}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-xs font-semibold text-amber-400 hover:bg-amber-500/25 transition-colors"
          aria-label={`Copy code ${promo.code} — ${promo.discountPercent}% off at ${promo.vendorName}`}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </span>
    );
  }

  // ── Full variant ──────────────────────────────────────────────────────────

  return (
    <div
      className={`rounded-2xl border border-amber-500/20 bg-amber-950/15 p-5 ${className}`}
      role="region"
      aria-label={`${promo.discountPercent}% discount at ${promo.vendorName}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">
            Reader Discount
          </p>
          <p className="text-base font-bold text-zinc-100">
            {promo.vendorName}
          </p>
          {promo.badge && (
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              {promo.badge}
            </span>
          )}
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-2xl font-black text-amber-400">
            {promo.discountPercent}%
          </p>
          <p className="text-[10px] text-zinc-500">off everything</p>
        </div>
      </div>

      {/* Code block */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 px-4 py-3 rounded-xl bg-zinc-900 border border-amber-500/25 font-mono text-lg font-black text-amber-400 tracking-widest text-center">
          {promo.code}
        </div>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 flex items-center gap-1.5 px-4 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-sm font-bold text-amber-400 transition-all"
          aria-label={`Copy discount code ${promo.code}`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Shop CTA */}
      <a
        href={shopUrl}
        onClick={handleShopClick}
        {...AFFILIATE_LINK_ATTRS}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-bold transition-all hover:shadow-lg hover:shadow-amber-500/20"
      >
        Shop {promo.vendorName}
        <ExternalLink className="w-3.5 h-3.5" />
      </a>

      {/* Affiliate disclosure */}
      <p className="text-[9px] text-zinc-600 text-center mt-3 leading-relaxed">
        PeptiDex earns a commission on verified purchases.{" "}
        <a href="/about/methodology" className="underline hover:text-zinc-400">
          See our methodology.
        </a>
      </p>
    </div>
  );
}

// ── Utility ────────────────────────────────────────────────────────────────────

function getIsReturnVisitor(): boolean {
  try {
    const count = parseInt(localStorage.getItem("peptidex_visit_count") ?? "0", 10);
    return count >= 2;
  } catch {
    return false;
  }
}
