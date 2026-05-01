"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BarChart3, ShieldCheck, TrendingDown } from "lucide-react";
import { vendorPricing } from "@/data/vendor-pricing";
import { trackOutboundClick, trackCTAClick } from "@/lib/ga4-events";

interface StickyQuickCompareProps {
    peptideSlug: string;
    peptideName: string;
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
    const bestVendor = inStockVendors.length > 0
        ? inStockVendors.reduce((a, b) => a.price_usd < b.price_usd ? a : b)
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
        // Run once on mount to set initial state
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Don't render at all if no pricing data or not mounted
    if (!bestVendor || !mounted) return null;

    const pricePerMg = bestVendor.vial_mg > 0
        ? (bestVendor.price_usd / bestVendor.vial_mg).toFixed(2)
        : null;

    // Use createPortal to escape any parent transform/filter stacking context
    // which would otherwise break `position: fixed`
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
                        bottom: 0,  // Sits at screen bottom (BottomNav removed)
                        left: 0,
                        right: 0,
                        zIndex: 50,
                    }}
                    className="md:hidden"
                    aria-label="Quick compare bar"
                >
                    {/* Scroll Progress Line */}
                    <div className="h-[3px] bg-zinc-800/80 relative overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-emerald-400 transition-[width] duration-100"
                            style={{ width: `${scrollProgress * 100}%` }}
                        />
                    </div>

                    {/* Main Bar */}
                    <div className="bg-zinc-950/97 backdrop-blur-xl border-t border-blue-500/25 px-3 py-2.5 shadow-[0_-12px_40px_rgba(0,0,0,0.7)]">
                        <div className="flex items-center justify-between gap-2 max-w-2xl mx-auto">

                            {/* Left: Price Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                    <TrendingDown className="w-3 h-3 text-blue-400 flex-shrink-0" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400">
                                        Best Current Price
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-lg font-black text-white leading-none">
                                        ${bestVendor.price_usd}
                                    </span>
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

                            {/* Right: Action Buttons */}
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                {/* COA Button — only if available */}
                                {bestVendor.coaUrl && (
                                    <a
                                        href={bestVendor.coaUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackOutboundClick(bestVendor.vendor, bestVendor.coaUrl!, `sticky_bar_coa_${peptideSlug}`)}
                                        className="flex items-center justify-center gap-1 px-2.5 py-2 min-h-[44px] min-w-[44px] rounded-xl border border-zinc-700 bg-zinc-900 text-[10px] font-semibold text-zinc-300 hover:border-blue-500/40 hover:text-blue-300 transition-all"
                                        aria-label="View Certificate of Analysis"
                                    >
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                    </a>
                                )}

                                {/* Compare Vendors Button */}
                                <Link
                                    href={`/vendors#${peptideSlug}`}
                                    onClick={() => trackCTAClick(`Compare Vendors - ${peptideName}`, `/vendors#${peptideSlug}`)}
                                    className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-all shadow-lg shadow-emerald-500/20 whitespace-nowrap"
                                >
                                    <BarChart3 className="w-3.5 h-3.5" />
                                    Compare Vendors
                                </Link>
                            </div>
                        </div>

                        {/* Vendor count context line */}
                        {inStockVendors.length > 1 && (
                            <p className="text-[9px] text-zinc-600 text-center mt-1 max-w-2xl mx-auto">
                                {inStockVendors.length} verified vendors compared ·{" "}
                                <span className="text-zinc-500">Prices updated April 2026</span>
                            </p>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    // Portal to document.body to escape any parent stacking context (transform, filter, etc.)
    return createPortal(bar, document.body);
}
