"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { vendorPricing, VendorPrice, PeptideVendorPricing } from "@/data/vendor-pricing";
import {
    ExternalLink, Star, Search, ArrowUpDown,
    ShieldCheck, Truck, Award, Globe, Tag, Filter
} from "lucide-react";

/* ──────── Badge Components ──────── */

function VendorBadge({ badge }: { badge: string }) {
    const config: Record<string, { icon: React.ReactNode; color: string }> = {
        "Best Price": { icon: <Tag className="w-2.5 h-2.5" />, color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" },
        "Editor's Pick": { icon: <Award className="w-2.5 h-2.5" />, color: "bg-violet-500/15 border-violet-500/30 text-violet-400" },
        "Best for Intl": { icon: <Globe className="w-2.5 h-2.5" />, color: "bg-cyan-500/15 border-cyan-500/30 text-cyan-400" },
    };
    const c = config[badge] || config["Best Price"];
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold border ${c.color}`}>
            {c.icon} {badge}
        </span>
    );
}

/* ──────── Vendor Row ──────── */

function VendorRow({ v, cheapest }: { v: VendorPrice; cheapest: boolean }) {
    return (
        <motion.a
            href={v.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:scale-[1.01] ${
                cheapest
                    ? "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40"
                    : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
            }`}
            whileTap={{ scale: 0.99 }}
        >
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                    {v.vendor.charAt(0)}
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-zinc-200">{v.vendor}</p>
                        {v.badge && <VendorBadge badge={v.badge} />}
                    </div>
                    <p className="text-[10px] text-zinc-500">
                        {v.vial_mg}mg vial · {v.inStock ? "✅ In Stock" : "❌ Out of Stock"}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className={`text-base font-bold ${cheapest ? "text-emerald-400" : "text-zinc-200"}`}>
                        ${v.price_usd}
                    </p>
                    <p className="text-[9px] text-zinc-600">
                        ${(v.price_usd / v.vial_mg).toFixed(2)}/mg
                    </p>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-600" />
            </div>
        </motion.a>
    );
}

/* ──────── Peptide Card ──────── */

function PeptideVendorCard({ pep }: { pep: PeptideVendorPricing }) {
    const sorted = [...pep.vendors].sort((a, b) => a.price_usd - b.price_usd);
    const cheapestPrice = sorted[0]?.price_usd;

    return (
        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-zinc-100">{pep.name}</h2>
                <span className="text-[10px] text-zinc-500 px-2 py-0.5 rounded-full bg-zinc-800">
                    {pep.vendors.length} vendor{pep.vendors.length > 1 ? "s" : ""}
                </span>
            </div>
            <div className="space-y-2">
                {sorted.map((v) => (
                    <VendorRow key={v.vendor} v={v} cheapest={v.price_usd === cheapestPrice} />
                ))}
            </div>
        </div>
    );
}

/* ──────── Main Page ──────── */

export default function WhereToBuyPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "price">("name");

    const filtered = vendorPricing
        .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === "price") {
                const aMin = Math.min(...a.vendors.map((v) => v.price_usd));
                const bMin = Math.min(...b.vendors.map((v) => v.price_usd));
                return aMin - bMin;
            }
            return a.name.localeCompare(b.name);
        });

    // Unique vendors for the trust bar
    const allVendors = [...new Set(vendorPricing.flatMap((p) => p.vendors.map((v) => v.vendor)))];

    return (
        <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-zinc-100 mb-2">Where to Buy</h1>
                <p className="text-sm text-zinc-400">Compare prices across vetted peptide vendors</p>
            </div>

            {/* Trust Bar */}
            <div className="mb-6 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                    <p className="text-xs text-zinc-300 font-medium">{allVendors.length} Vetted Vendors · {vendorPricing.length} Peptides</p>
                    <p className="text-[10px] text-zinc-500">All vendors are third-party tested · prices updated regularly</p>
                </div>
            </div>

            {/* Vendor Chips */}
            <div className="flex flex-wrap gap-2 mb-4">
                {allVendors.map((v) => (
                    <span key={v} className="text-[10px] px-2.5 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-400 font-medium">
                        {v}
                    </span>
                ))}
            </div>

            {/* Search & Sort */}
            <div className="flex gap-2 mb-5">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search peptides..."
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-600 focus:border-violet-500/50 focus:outline-none"
                    />
                </div>
                <button
                    onClick={() => setSortBy(sortBy === "name" ? "price" : "name")}
                    className="px-3 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
                >
                    <ArrowUpDown className="w-3.5 h-3.5" />
                    {sortBy === "name" ? "A-Z" : "Price"}
                </button>
            </div>

            {/* Peptide Cards */}
            <div className="space-y-4">
                {filtered.map((pep, i) => (
                    <motion.div
                        key={pep.slug}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.04, 0.5) }}
                    >
                        <PeptideVendorCard pep={pep} />
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-sm text-zinc-500">No peptides match your search</p>
                </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
                <p className="text-[10px] text-zinc-600 leading-relaxed text-center">
                    Prices shown are approximate and may vary. PeptiDex may earn a small commission from purchases made through affiliate links, at no additional cost to you. This helps support our free educational content. All peptides are sold for research purposes only.
                </p>
            </div>
        </div>
    );
}
