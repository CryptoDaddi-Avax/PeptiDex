"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ChevronDown, ChevronUp, ExternalLink, CheckCircle, TrendingDown } from "lucide-react";
import Link from "next/link";
import { getVendorPricing } from "@/data/vendor-pricing";
import { getPeptideBySlug } from "@/data/peptides";
import { AffiliateLink } from "@/components/affiliate-link";

interface StackPeptide {
    name: string;
    role_in_stack: string;
}

interface Props {
    peptides: StackPeptide[];
    stackName: string;
}

const badgeStyles: Record<string, string> = {
    "Best Price": "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    "Editor's Pick": "bg-violet-500/15 border-violet-500/30 text-violet-400",
    "Best for Intl": "bg-blue-500/15 border-blue-500/30 text-blue-400",
};

export function StackPriceAggregator({ peptides, stackName }: Props) {
    const [open, setOpen] = useState(false);
    const [activePeptide, setActivePeptide] = useState<string | null>(null);

    // Look up vendor pricing and peptide slugs for every peptide in the stack
    const enriched = peptides.map(p => {
        // Find slug by name match
        const slug = (() => {
            const lower = p.name.toLowerCase().replace(/\s+/g, "-");
            return lower;
        })();
        const peptideData = getPeptideBySlug(slug);
        const pricing = getVendorPricing(slug) ?? getVendorPricing(p.name);
        const lowestPrice = pricing ? Math.min(...pricing.vendors.map(v => v.price_usd)) : null;
        return { ...p, slug, peptideData, pricing, lowestPrice };
    });

    const totalEstimate = enriched.reduce((sum, p) => sum + (p.lowestPrice ?? 0), 0);

    return (
        <div className="mt-3">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-950/50 to-emerald-900/30 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group"
            >
                <div className="flex items-center gap-2.5">
                    <ShoppingCart className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-300">Shop This Stack</span>
                    <span className="text-[10px] text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
                        {peptides.length} peptides · est. from ${totalEstimate.toFixed(0)}
                    </span>
                </div>
                {open
                    ? <ChevronUp className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                    : <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                }
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pt-2 space-y-2">
                            {enriched.map((p) => (
                                <div key={p.name} className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 overflow-hidden">
                                    {/* Peptide header row */}
                                    <button
                                        onClick={() => setActivePeptide(ap => ap === p.name ? null : p.name)}
                                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-800/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span className="text-base">{p.peptideData?.category_icon ?? "🧬"}</span>
                                            <div className="text-left min-w-0">
                                                <p className="text-sm font-semibold text-zinc-100">{p.name}</p>
                                                <p className="text-[10px] text-zinc-500 truncate max-w-[220px]">{p.role_in_stack}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            {p.lowestPrice && (
                                                <span className="text-xs font-bold text-emerald-400">
                                                    from ${p.lowestPrice}
                                                </span>
                                            )}
                                            {!p.pricing && (
                                                <span className="text-[10px] text-zinc-500"> </span>
                                            )}
                                            {activePeptide === p.name
                                                ? <ChevronUp className="w-3.5 h-3.5 text-zinc-500" />
                                                : <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
                                            }
                                        </div>
                                    </button>

                                    {/* Vendor price rows */}
                                    <AnimatePresence>
                                        {activePeptide === p.name && p.pricing && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden border-t border-zinc-800/50"
                                            >
                                                <div className="p-3 space-y-2">
                                                    {/* Sort by price */}
                                                    {[...p.pricing.vendors].sort((a, b) => a.price_usd - b.price_usd).map((v, vi) => (
                                                        <div key={v.vendor}
                                                            className={`flex items-center justify-between rounded-lg px-3 py-2 ${vi === 0 ? "bg-emerald-950/30 border border-emerald-500/15" : "bg-zinc-800/30"}`}>
                                                            <div className="flex items-center gap-2">
                                                                {vi === 0 && <TrendingDown className="w-3 h-3 text-emerald-400 shrink-0" />}
                                                                <span className="text-xs text-zinc-200 font-medium">{v.vendor}</span>
                                                                {v.badge && (
                                                                    <span className={`px-1.5 py-0.5 rounded border text-[9px] font-semibold ${badgeStyles[v.badge]}`}>{v.badge}</span>
                                                                )}
                                                                <span className="text-[10px] text-zinc-500">{v.vial_mg}mg vial</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-bold text-zinc-100">${v.price_usd}</span>
                                                                <AffiliateLink
                                                                    href={v.affiliateUrl}
                                                                    peptide={p.slug}
                                                                    source="stack_price"
                                                                    className="flex items-center gap-1 px-3 py-2.5 min-h-[44px] rounded-lg bg-violet-500/15 border border-violet-500/25 text-[11px] font-semibold text-violet-300 hover:bg-violet-500/25 transition-colors"
                                                                >
                                                                    Buy <ExternalLink className="w-3 h-3" />
                                                                </AffiliateLink>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {/* Link to library */}
                                                    <div className="flex items-center justify-between pt-1">
                                                        <Link href={`/library/${p.slug}`}
                                                            className="text-[10px] text-zinc-500 hover:text-violet-400 transition-colors flex items-center gap-1">
                                                            <CheckCircle className="w-3 h-3" /> View full research guide →
                                                        </Link>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                        {activePeptide === p.name && !p.pricing && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden border-t border-zinc-800/50"
                                            >
                                                <p className="px-4 py-3 text-xs text-zinc-500">No vendor pricing tracked yet for {p.name}.</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                            {/* Total estimate + disclaimer */}
                            <div className="flex items-center justify-between rounded-xl bg-zinc-900/60 border border-zinc-800/50 px-4 py-3">
                                <div>
                                    <p className="text-xs text-zinc-400">Estimated stack cost</p>
                                    <p className="text-[10px] text-zinc-600">Best available prices · for research use only</p>
                                </div>
                                <span className="text-lg font-black text-emerald-400">~${totalEstimate.toFixed(0)}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
