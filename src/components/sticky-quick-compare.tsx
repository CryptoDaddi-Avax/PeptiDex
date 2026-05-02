"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BarChart3, ShieldCheck, TrendingDown, ShoppingCart } from "lucide-react";
import { vendorPricing } from "@/data/vendor-pricing";
import { trackOutboundClick, trackCTAClick } from "@/lib/ga4-events";

interface StickyQuickCompareProps {
    peptideSlug: string;
    peptideName: string;
}

// ── Discount registry: source of truth is /data/vendors.ts discountPercent ──
const VENDOR_DISCOUNTS: Record<string, { code: string; pct: number }> = {
    "Amino Club":        { code: "PEPTIDEX", pct: 15 },
    "Bio Longevity Labs": { code: "PEPTIDEX", pct: 15 },
};

/** Post-discount price for a given sticker price + vendor name */
function discountedPrice(vendor: string, price: number): number {
    const d = VENDOR_DISCOUNTS[vendor];
    return d ? price * (1 - d.pct / 100) : price;
}

export function StickyQuickCompare({ peptideSlug, peptideName }: StickyQuickCompareProps) {
    const [visible, setVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mounted, setMounted] = useState(false);
    const SCROLL_THRESHOLD = 0.30; // 30%

    // Only portal-render on client (SSR guard)
    useEffect(() => {
        setMounted(true);
    }, []);

    // Pricing data for this peptide
    const pricing = vendorPricing.find(p => p.slug === peptideSlug);
    const inStockVendors = pricing?.vendors.filter(v => v.inStock) ?? [];

    // Pick best vendor by POST-DISCOUNT price per mg (apples-to-apples)
    const bestVendor = inStockVendors.length > 0
        ? inStockVendors.reduce((a, b) => {
            const aPricePerMg = a.vial_mg > 0 ? discountedPrice(a.vendor, a.price_usd) / a.vial_mg : Infinity;
            const bPricePerMg = b.vial_mg > 0 ? discountedPrice(b.vendor, b.price_usd) / b.vial_mg : Infinity;
            return aPricePerMg <= bPricePerMg ? a : b;
        })
        : null;

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;
            const progress = Math.min(scrollTop / docHeight, 1);
            setScrollProgress(progress);
            setVisible(progress > SCROLL_THRESHOLD);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Don't render at all if no pricing data or not mounted
    if (!bestVendor || !mounted) return null;

    const stickerPrice = bestVendor.price_usd;
    const discount = VENDOR_DISCOUNTS[bestVendor.vendor];
    const finalPrice = discountedPrice(bestVendor.vendor, stickerPrice);
    const hasDiscount = !!discount;

    const pricePerMg = bestVendor.vial_mg > 0
        ? (finalPrice / bestVendor.vial_mg).toFixed(2)
        : null;

    const handleBuyNow = () => {
        trackOutboundClick(
            bestVendor.vendor,
            bestVendor.affiliateUrl,
            `detail_sticky_bar_buy_now`
        );
    };

    // Use createPortal to escape any parent transform/filter stacking context
    const bar = (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="sticky-compare-bar"
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 80 }}
                    transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.8 }}
                    style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 50,
                    }}
                    className="md:hidden"
                    aria-label="Quick buy bar"
                >
                    {/* Scroll Progress Line */}
                    <div className="h-[3px] bg-zinc-800/80 relative overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-emerald-400 transition-[width] duration-100"
                            style={{ width: `${scrollProgress * 100}%` }}
                        />
                    </div>

                    {/* Main Bar */}
                    <div className="bg-zinc-950/97 backdrop-blur-xl border-t border-blue-500/25 px-3 pt-2.5 pb-3 shadow-[0_-12px_40px_rgba(0,0,0,0.7)]">
                        <div className="max-w-2xl mx-auto flex flex-col gap-2">

                            {/* Row 1: Price Info + In Stock + Vendor attribution */}
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <TrendingDown className="w-3 h-3 text-blue-400 flex-shrink-0" />
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400">
                                            Best Current Price
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {/* Post-discount price (primary) */}
                                        <span className="text-lg font-black text-amber-400 leading-none">
                                            ${finalPrice.toFixed(2)}
                                        </span>
                                        {/* Sticker price struck through if discounted */}
                                        {hasDiscount && (
                                            <span className="text-sm font-medium text-zinc-500 line-through leading-none">
                                                ${stickerPrice.toFixed(2)}
                                            </span>
                                        )}
                                        <span className="text-[10px] text-zinc-400">
                                            / {bestVendor.vial_mg}mg vial
                                        </span>
                                        {pricePerMg && (
                                            <span className="text-[9px] text-zinc-500">
                                                (${pricePerMg}/mg)
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            <span className="text-[9px] font-bold text-emerald-400">In Stock</span>
                                        </span>
                                    </div>
                                    <p className="text-[9px] text-zinc-500 mt-0.5 truncate">
                                        via {bestVendor.vendor}
                                        {bestVendor.badge && (
                                            <span className="ml-1 text-blue-400">· {bestVendor.badge}</span>
                                        )}
                                    </p>
                                </div>

                                {/* COA Button — only if available */}
                                {bestVendor.coaUrl && (
                                    <a
                                        href={bestVendor.coaUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackOutboundClick(bestVendor.vendor, bestVendor.coaUrl!, `sticky_bar_coa_${peptideSlug}`)}
                                        className="flex items-center justify-center gap-1 px-2.5 py-2 min-h-[44px] min-w-[44px] rounded-xl border border-zinc-700 bg-zinc-900 text-[10px] font-semibold text-zinc-300 hover:border-blue-500/40 hover:text-blue-300 transition-all flex-shrink-0"
                                        aria-label="View Certificate of Analysis"
                                    >
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                    </a>
                                )}
                            </div>

                            {/* Row 2: Discount callout (only for vendors with discount codes) */}
                            {hasDiscount && (
                                <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-amber-500/8 border border-amber-500/20">
                                    <span className="text-base leading-none">💰</span>
                                    <span className="text-[10px] text-amber-300 font-medium">
                                        Save {discount.pct}% with code{" "}
                                        <strong className="font-bold tracking-wider">{discount.code}</strong>
                                        {" "}→ final:{" "}
                                        <strong className="text-amber-400">${finalPrice.toFixed(2)}</strong>
                                    </span>
                                </div>
                            )}

                            {/* Row 3: CTA Buttons */}
                            <div className="flex items-center gap-2">
                                {/* PRIMARY: Buy Now */}
                                <a
                                    href={bestVendor.affiliateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleBuyNow}
                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[44px] rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-[11px] font-black transition-all shadow-lg shadow-amber-500/25 whitespace-nowrap"
                                    aria-label={`Buy ${peptideName} at ${bestVendor.vendor}`}
                                >
                                    <ShoppingCart className="w-3.5 h-3.5" />
                                    Buy at {bestVendor.vendor} →
                                </a>

                                {/* SECONDARY: Compare All Vendors */}
                                <Link
                                    href={`/tools/compare?a=${peptideSlug}`}
                                    onClick={() => trackCTAClick(`Compare Vendors - ${peptideName}`, `/tools/compare?a=${peptideSlug}`)}
                                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[44px] rounded-xl border border-zinc-600 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[11px] font-bold transition-all whitespace-nowrap"
                                    aria-label="Compare all vendors"
                                >
                                    <BarChart3 className="w-3.5 h-3.5" />
                                    Compare
                                </Link>
                            </div>

                            {/* Vendor count context line */}
                            {inStockVendors.length > 1 && (
                                <p className="text-[9px] text-zinc-600 text-center">
                                    {inStockVendors.length} verified vendors compared ·{" "}
                                    <span className="text-zinc-500">Prices updated April 2026</span>
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    // Portal to document.body to escape any parent stacking context (transform, filter, etc.)
    return createPortal(bar, document.body);
}
