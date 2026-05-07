"use client";

import { useState, useEffect } from "react";
import { X, Tag } from "lucide-react";
import { PRIMARY_PROMO } from "@/lib/promos/config";
import { buildAffiliateUrl, AFFILIATE_LINK_ATTRS } from "@/lib/promos/affiliateUrl";
import { PromoCodeDisplay } from "./PromoCodeDisplay";
import {
  trackBannerShown,
  trackBannerDismissed,
} from "@/lib/analytics/promo";

// ── Constants ─────────────────────────────────────────────────────────────────

const DISMISSED_KEY = "peptidex_banner_dismissed";
const PROMO_KEY_STORAGE = "peptidex_banner_promo_key";
const DISMISS_DURATION_DAYS = 7;

/** Routes where the banner is suppressed (low-intent / friction pages) */
const SUPPRESSED_PATHS = ["/admin", "/saved", "/authors", "/about", "/legal", "/corrections", "/editorial-process"];

// ── Helpers ───────────────────────────────────────────────────────────────────

function isSuppressedPath(path: string): boolean {
  return SUPPRESSED_PATHS.some((p) => path.startsWith(p));
}

function isDismissed(): boolean {
  try {
    const stored = localStorage.getItem(DISMISSED_KEY);
    const storedKey = localStorage.getItem(PROMO_KEY_STORAGE);
    if (!stored) return false;
    // Re-show if a different promo is now primary
    if (storedKey !== PRIMARY_PROMO.code) return false;
    // Re-show after 7 days
    const dismissedAt = new Date(stored).getTime();
    const now = Date.now();
    return now - dismissedAt < DISMISS_DURATION_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function setDismissed() {
  try {
    localStorage.setItem(DISMISSED_KEY, new Date().toISOString());
    localStorage.setItem(PROMO_KEY_STORAGE, PRIMARY_PROMO.code);
  } catch {
    // ignore
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export function StickyDiscountBanner() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!PRIMARY_PROMO.isActive) return;
    if (isSuppressedPath(window.location.pathname)) return;
    if (isDismissed()) return;

    setVisible(true);
    trackBannerShown({
      vendor: PRIMARY_PROMO.gaKey,
      code: PRIMARY_PROMO.code,
      surface: "sticky_banner",
    });
  }, []);

  function handleDismiss() {
    setVisible(false);
    setDismissed();
    trackBannerDismissed({
      vendor: PRIMARY_PROMO.gaKey,
      code: PRIMARY_PROMO.code,
      surface: "sticky_banner",
    });
  }

  // Reserve height server-side to prevent CLS — content is hidden until mounted
  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        style={{ height: "44px", minHeight: "44px" }}
        className="hidden md:block"
      />
    );
  }

  if (!visible) return null;

  const shopUrl = buildAffiliateUrl(PRIMARY_PROMO, "sticky_banner");

  return (
    <div
      role="region"
      aria-label="Site-wide promotion"
      className="sticky top-0 z-50 w-full bg-zinc-900/95 backdrop-blur-md border-b border-amber-500/20 px-4 py-2.5 md:py-2"
      style={{ minHeight: "44px" }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Left: icon + message */}
        <div className="flex items-center gap-2 min-w-0">
          <Tag className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" aria-hidden="true" />

          {/* Desktop copy */}
          <span className="hidden md:inline text-xs text-zinc-300 leading-tight">
            Save{" "}
            <span className="text-amber-400 font-bold">{PRIMARY_PROMO.discountPercent}%</span>
            {" "}on COA-verified peptides at{" "}
            <a
              href={shopUrl}
              {...AFFILIATE_LINK_ATTRS}
              className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 transition-colors"
            >
              {PRIMARY_PROMO.vendorName}
            </a>
            {" "}—{" "}
          </span>

          {/* Mobile copy (shorter) */}
          <span className="md:hidden text-xs text-zinc-300 leading-tight">
            <span className="text-amber-400 font-bold">{PRIMARY_PROMO.discountPercent}% off</span>
            {" "}at {PRIMARY_PROMO.vendorName} —{" "}
          </span>

          {/* Inline code display */}
          <PromoCodeDisplay
            promo={PRIMARY_PROMO}
            surface="sticky_banner"
            variant="compact"
          />

          {/* Shop arrow */}
          <a
            href={shopUrl}
            {...AFFILIATE_LINK_ATTRS}
            className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors ml-1"
          >
            Shop →
          </a>
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
          aria-label="Dismiss promotion banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
