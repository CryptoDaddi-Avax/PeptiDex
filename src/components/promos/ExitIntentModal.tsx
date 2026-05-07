"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { PRIMARY_PROMO } from "@/lib/promos/config";
import { buildAffiliateUrl, AFFILIATE_LINK_ATTRS } from "@/lib/promos/affiliateUrl";
import { PromoCodeDisplay } from "./PromoCodeDisplay";
import {
  trackExitIntentShown,
  trackExitIntentDismissed,
  trackExitIntentClicked,
  trackExitIntentDontShowAgain,
} from "@/lib/analytics/promo";

// ── Constants ─────────────────────────────────────────────────────────────────

const SESSION_SHOWN_KEY = "peptidex_exit_intent_shown";
const SUPPRESSED_KEY = "peptidex_exit_intent_suppressed";
const NO_SHOW_KEY = "peptidex_exit_no_show";
const PROMO_CLICKED_KEY = "peptidex_promo_clicked";

const SUPPRESS_DAYS = 30;
const NO_SHOW_DAYS = 180;
const MOBILE_INACTIVITY_MS = 30_000;

/**
 * Pages where exit intent fires. Only commercial/transactional paths.
 * Library, blog, about, tools (except pricing) are all excluded.
 */
const ALLOWED_PATH_PREFIXES = [
  "/buy",
  "/vendors",
  "/best",
  "/stacks",
  "/tools/pricing",
  "/where-to-buy",
  "/compare/vendors",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function isAllowedPath(path: string): boolean {
  return ALLOWED_PATH_PREFIXES.some((p) => path.startsWith(p));
}

function isSuppressed(): boolean {
  try {
    const noShow = localStorage.getItem(NO_SHOW_KEY);
    if (noShow) {
      const noShowAt = new Date(noShow).getTime();
      if (Date.now() - noShowAt < NO_SHOW_DAYS * 86400_000) return true;
    }
    const suppressed = localStorage.getItem(SUPPRESSED_KEY);
    if (suppressed) {
      const suppressedAt = new Date(suppressed).getTime();
      if (Date.now() - suppressedAt < SUPPRESS_DAYS * 86400_000) return true;
    }
    return false;
  } catch {
    return false;
  }
}

function setSuppressed() {
  try {
    localStorage.setItem(SUPPRESSED_KEY, new Date().toISOString());
  } catch {}
}

function setNoShow() {
  try {
    localStorage.setItem(NO_SHOW_KEY, new Date().toISOString());
  } catch {}
}

function hasShownThisSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_SHOWN_KEY) === "true";
  } catch {
    return false;
  }
}

function hasClickedPromoThisSession(): boolean {
  try {
    return sessionStorage.getItem(PROMO_CLICKED_KEY) === "true";
  } catch {
    return false;
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ExitIntentModal() {
  const [show, setShow] = useState(false);
  const [noShowChecked, setNoShowChecked] = useState(false);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggered = useRef(false);

  const trigger = useCallback(() => {
    if (triggered.current) return;
    triggered.current = true;

    if (!PRIMARY_PROMO.isActive) return;
    if (!isAllowedPath(window.location.pathname)) return;
    if (hasShownThisSession()) return;
    if (isSuppressed()) return;
    if (hasClickedPromoThisSession()) return;

    try { sessionStorage.setItem(SESSION_SHOWN_KEY, "true"); } catch {}
    setShow(true);
    trackExitIntentShown({
      vendor: PRIMARY_PROMO.gaKey,
      code: PRIMARY_PROMO.code,
      surface: "exit_intent_modal",
    });
  }, []);

  useEffect(() => {
    // ── Desktop: mouseleave top of viewport ──────────────────────────────
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) trigger();
    }
    document.addEventListener("mouseleave", handleMouseLeave);

    // ── Mobile: inactivity trigger ────────────────────────────────────────
    function resetInactivityTimer() {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(trigger, MOBILE_INACTIVITY_MS);
    }

    // ── Mobile: tab switch ────────────────────────────────────────────────
    function handleVisibilityChange() {
      if (document.hidden) trigger();
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      ["touchstart", "touchmove", "scroll"].forEach((ev) =>
        window.addEventListener(ev, resetInactivityTimer, { passive: true })
      );
      document.addEventListener("visibilitychange", handleVisibilityChange);
      resetInactivityTimer();
    }

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (isMobile) {
        ["touchstart", "touchmove", "scroll"].forEach((ev) =>
          window.removeEventListener(ev, resetInactivityTimer)
        );
      }
    };
  }, [trigger]);

  // Focus trap: close on Escape
  useEffect(() => {
    if (!show) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleDismiss();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [show]);

  function handleDismiss() {
    setShow(false);
    setSuppressed();
    if (noShowChecked) {
      setNoShow();
      trackExitIntentDontShowAgain({
        vendor: PRIMARY_PROMO.gaKey,
        code: PRIMARY_PROMO.code,
        surface: "exit_intent_modal",
      });
    }
    trackExitIntentDismissed({
      vendor: PRIMARY_PROMO.gaKey,
      code: PRIMARY_PROMO.code,
      surface: "exit_intent_modal",
    });
  }

  function handleShopClick() {
    trackExitIntentClicked({
      vendor: PRIMARY_PROMO.gaKey,
      code: PRIMARY_PROMO.code,
      surface: "exit_intent_modal",
    });
    try { sessionStorage.setItem(PROMO_CLICKED_KEY, "true"); } catch {}
    setShow(false);
  }

  const shopUrl = buildAffiliateUrl(PRIMARY_PROMO, "exit_intent_modal");

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Save ${PRIMARY_PROMO.discountPercent}% at ${PRIMARY_PROMO.vendorName}`}
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[440px] z-[201] rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/20"
          >
            {/* Gold top accent */}
            <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

            <div className="bg-zinc-900 border border-amber-500/20 border-t-0 rounded-b-2xl p-6 relative">
              {/* Close */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
                aria-label="Close promotion modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Headline */}
              <div className="mb-5">
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-2">
                  Before you go
                </p>
                <h2 className="text-xl font-bold text-zinc-100 leading-tight">
                  Save{" "}
                  <span className="text-amber-400">{PRIMARY_PROMO.discountPercent}%</span>
                  {" "}at {PRIMARY_PROMO.vendorName}
                </h2>
                <p className="text-sm text-zinc-400 mt-1.5">
                  COA-verified peptides. Code automatically saved for 7 days.
                </p>
              </div>

              {/* Promo code block */}
              <PromoCodeDisplay
                promo={PRIMARY_PROMO}
                surface="exit_intent_modal"
                variant="full"
                className="mb-4"
              />

              {/* Shop CTA */}
              <a
                href={shopUrl}
                onClick={handleShopClick}
                {...AFFILIATE_LINK_ATTRS}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm transition-all hover:shadow-lg hover:shadow-amber-500/20 mb-3"
              >
                Shop {PRIMARY_PROMO.vendorName}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Continue browsing */}
              <button
                onClick={handleDismiss}
                className="block w-full text-center text-xs text-zinc-600 hover:text-zinc-400 transition-colors py-1 mb-4"
              >
                Continue browsing
              </button>

              {/* Don't show again */}
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={noShowChecked}
                  onChange={(e) => setNoShowChecked(e.target.checked)}
                  className="w-3.5 h-3.5 rounded accent-amber-500"
                />
                <span className="text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  Don&apos;t show again for 6 months
                </span>
              </label>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
