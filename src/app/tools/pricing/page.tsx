"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { pricingData } from "@/data/pricing";
import { DollarSign, ArrowUpDown, Info } from "lucide-react";
import { SHORT_DISCLAIMER } from "@/data/constants";

type SortKey = "name" | "avg_price" | "cost_per_dose" | "doses";

export default function PricingPage() {
    const [sortKey, setSortKey] = useState<SortKey>("name");
    const [sortAsc, setSortAsc] = useState(true);

    const sorted = useMemo(() => {
        const list = [...pricingData];
        list.sort((a, b) => {
            let cmp = 0;
            if (sortKey === "name") cmp = a.name.localeCompare(b.name);
            else if (sortKey === "avg_price") cmp = a.avg_price_usd - b.avg_price_usd;
            else if (sortKey === "cost_per_dose") cmp = (a.cost_per_dose_usd || 0) - (b.cost_per_dose_usd || 0);
            else if (sortKey === "doses") cmp = (b.doses_per_vial || 0) - (a.doses_per_vial || 0);
            return sortAsc ? cmp : -cmp;
        });
        return list;
    }, [sortKey, sortAsc]);

    const toggleSort = (key: SortKey) => {
        if (sortKey === key) setSortAsc(!sortAsc);
        else { setSortKey(key); setSortAsc(true); }
    };

    return (
        <div className="max-w-2xl mx-auto px-3 py-4 md:px-4 md:py-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                    <h1 className="text-xl md:text-2xl font-bold text-zinc-100">Price Comparison</h1>
                </div>
                <p className="text-xs md:text-sm text-zinc-400">Average research-grade pricing for all {pricingData.length} peptides</p>
            </motion.div>

            {/* Disclaimer */}
            <div className="rounded-xl bg-amber-950/20 border border-amber-500/15 p-3 mb-4">
                <div className="flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-amber-400/70">Prices are estimates based on publicly available research-grade suppliers. Actual prices vary by supplier, quantity, and region. Prescription peptides (via doctor/pharmacy) may differ significantly.</p>
                </div>
            </div>

            {/* Sort Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
                {([["name", "Name"], ["avg_price", "Vial Price"], ["cost_per_dose", "Cost/Dose"], ["doses", "Doses/Vial"]] as [SortKey, string][]).map(([key, label]) => (
                    <button key={key} onClick={() => toggleSort(key)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${sortKey === key ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : "border-zinc-800 text-zinc-500 hover:border-zinc-700"}`}>
                        {label}
                        {sortKey === key && <ArrowUpDown className="w-3 h-3" />}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="space-y-4">
                {sorted.map((p, i) => (
                    <motion.div key={p.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
                        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4 transition-colors">
                            <div className="flex items-center justify-between mb-3 border-b border-zinc-800/50 pb-3">
                                <Link href={`/peptides/${p.slug}`} className="text-base font-bold text-zinc-100 hover:text-emerald-400 transition-colors">
                                    {p.name}
                                </Link>
                                <span className="text-xs font-semibold text-zinc-400 bg-zinc-800/50 px-2 py-1 rounded">{p.typical_vial_mg}mg vial</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <div className="rounded-lg bg-zinc-800/40 px-2.5 py-2">
                                    <span className="text-[10px] text-zinc-500 uppercase font-semibold block mb-0.5">Avg Price</span>
                                    <span className="text-[15px] font-bold text-emerald-400">${p.avg_price_usd}</span>
                                </div>
                                <div className="rounded-lg bg-zinc-800/40 px-2.5 py-2">
                                    <span className="text-[10px] text-zinc-500 uppercase font-semibold block mb-0.5">Per Dose</span>
                                    <span className="text-[15px] font-bold text-blue-400">{p.cost_per_dose_usd ? `$${p.cost_per_dose_usd.toFixed(2)}` : "N/A"}</span>
                                </div>
                                <div className="rounded-lg bg-zinc-800/40 px-2.5 py-2">
                                    <span className="text-[10px] text-zinc-500 uppercase font-semibold block mb-0.5">Doses/Vial</span>
                                    <span className="text-[15px] font-bold text-violet-400">{p.doses_per_vial || "-"}</span>
                                </div>
                            </div>
                            
                            {/* Multi-Vendor Comparison Matrix */}
                            <div className="bg-zinc-950/50 rounded-lg border border-zinc-800/50 overflow-hidden">
                                <div className="grid grid-cols-12 gap-2 text-[10px] uppercase font-bold text-zinc-500 bg-zinc-900/40 px-4 py-2 border-b border-zinc-800/50">
                                    <div className="col-span-6 md:col-span-5">Verified Vendor</div>
                                    <div className="col-span-3 md:col-span-4 text-center">Unit Price</div>
                                    <div className="col-span-3 md:col-span-3 text-right">Action</div>
                                </div>
                                {p.vendors?.map((v, vIdx) => (
                                    <div key={vIdx} className="grid grid-cols-12 gap-2 items-center px-4 py-2.5 border-b border-zinc-800/30 last:border-0 hover:bg-zinc-800/20 transition-colors">
                                        <div className="col-span-6 md:col-span-5 flex items-center gap-2">
                                            {v.vendor === "Ascension Peptides" && <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>}
                                            {v.vendor === "Amino Club" && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
                                            {v.vendor === "Soma Chems" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                                            <span className="text-xs md:text-sm font-semibold text-zinc-300">{v.vendor}</span>
                                        </div>
                                        <div className="col-span-3 md:col-span-4 text-center">
                                            <span className="text-sm font-bold text-zinc-100">${v.price_usd}</span>
                                        </div>
                                        <div className="col-span-3 md:col-span-3 text-right">
                                            <Link href={v.link} rel={v.link.startsWith('http') ? "nofollow noopener sponsored" : ""} target={v.link.startsWith('http') ? "_blank" : "_self"} className="text-[10px] md:text-xs font-bold text-zinc-400 hover:text-emerald-400 flex items-center justify-end gap-1 transition-colors">
                                                Check <span className="hidden md:inline">Price</span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {p.notes && <p className="text-[10px] text-zinc-500 mt-3 flex gap-1.5 items-start"><Info className="w-3.5 h-3.5 flex-shrink-0" />{p.notes}</p>}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
