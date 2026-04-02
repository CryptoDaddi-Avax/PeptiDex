"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { peptides } from "@/data/peptides";
import { EvidenceBadge } from "@/components/peptide-card";
import { SHORT_DISCLAIMER } from "@/data/constants";
import { GitCompare, ChevronDown, ShieldAlert, Clock, Syringe, Activity } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";

export default function ComparePage() {
    const [selected, setSelected] = useState<string[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

    const compared = useMemo(() => selected.map((slug) => peptides.find((p) => p.slug === slug)).filter(Boolean), [selected]);

    const addSlot = () => { if (selected.length < 3) setSelected([...selected, ""]); };
    const removeSlot = (i: number) => setSelected(selected.filter((_, idx) => idx !== i));
    const setSlot = (i: number, slug: string) => {
        const next = [...selected];
        next[i] = slug;
        setSelected(next);
        setDropdownOpen(null);
    };

    const availableFor = (i: number) => peptides.filter((p) => !selected.includes(p.slug) || selected[i] === p.slug);

    return (
        <div className="max-w-4xl mx-auto px-3 py-4 md:px-4 md:py-6">
            <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-2.5 mb-4">
                <div className="flex items-start gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] md:text-[11px] text-amber-400/80 leading-relaxed">{SHORT_DISCLAIMER}</p>
                </div>
            </div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <GitCompare className="w-5 h-5 text-violet-400" />
                    <h1 className="text-xl md:text-2xl font-bold text-zinc-100">Peptide Comparison</h1>
                </div>
                <p className="text-xs md:text-sm text-zinc-400">Select 2-3 peptides to compare side-by-side</p>
            </motion.div>

            {/* Selectors */}
            <div className="flex flex-wrap gap-2 mb-6">
                {selected.map((slug, i) => (
                    <div key={i} className="relative">
                        <button onClick={() => setDropdownOpen(dropdownOpen === i ? null : i)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-sm text-zinc-200 hover:border-violet-500/40 transition-colors min-w-[160px]">
                            <span className="flex-1 text-left">{slug ? peptides.find((p) => p.slug === slug)?.name : "Select..."}</span>
                            <ChevronDown className="w-4 h-4 text-zinc-500" />
                        </button>
                        {dropdownOpen === i && (
                            <div className="absolute z-50 mt-1 w-64 max-h-64 overflow-auto rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
                                {availableFor(i).map((p) => (
                                    <button key={p.slug} onClick={() => setSlot(i, p.slug)}
                                        className="w-full text-left px-4 py-2.5 text-sm text-zinc-200 hover:bg-violet-500/10 transition-colors border-b border-zinc-800/50 last:border-0">
                                        <span className="mr-2">{getCategoryIcon(p.category)}</span>{p.name}
                                    </button>
                                ))}
                            </div>
                        )}
                        <button onClick={() => removeSlot(i)} className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-zinc-700 text-zinc-300 text-xs flex items-center justify-center hover:bg-red-500 transition-colors">×</button>
                    </div>
                ))}
                {selected.length < 3 && (
                    <button onClick={addSlot} className="px-4 py-2.5 rounded-xl border-2 border-dashed border-zinc-700 text-sm text-zinc-500 hover:border-violet-500/40 hover:text-violet-400 transition-colors">+ Add peptide</button>
                )}
            </div>

            {/* Comparison Table */}
            {compared.length >= 2 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    {/* Header Row */}
                    <div className={`grid gap-3`} style={{ gridTemplateColumns: `160px repeat(${compared.length}, 1fr)` }}>
                        <div />
                        {compared.map((p) => p && (
                            <div key={p.slug} className="text-center">
                                <span className="text-2xl">{getCategoryIcon(p.category)}</span>
                                <h3 className="text-base font-bold text-zinc-100 mt-1">{p.name}</h3>
                                <span className="text-[10px] text-zinc-500 uppercase">{p.category}</span>
                            </div>
                        ))}
                    </div>

                    {/* Rows */}
                    {[
                        { label: "Benefits", icon: <Activity className="w-4 h-4 text-emerald-400" />, render: (p: typeof compared[0]) => p?.primary_benefits },
                        { label: "Mechanism", icon: <Activity className="w-4 h-4 text-blue-400" />, render: (p: typeof compared[0]) => p?.mechanism },
                        { label: "Evidence", icon: <Activity className="w-4 h-4 text-violet-400" />, render: (p: typeof compared[0]) => p && <EvidenceBadge level={p.key_studies[0]?.evidence_level || "preclinical"} /> },
                        { label: "Half-Life", icon: <Clock className="w-4 h-4 text-amber-400" />, render: (p: typeof compared[0]) => p?.half_life_hours ? (p.half_life_hours >= 24 ? `${Math.round(p.half_life_hours / 24)}d` : p.half_life_hours >= 1 ? `${p.half_life_hours}h` : `${Math.round(p.half_life_hours * 60)}min`) : "N/A" },
                        { label: "Route", icon: <Syringe className="w-4 h-4 text-teal-400" />, render: (p: typeof compared[0]) => p?.dosing?.route || "N/A" },
                        { label: "Dose Range", icon: <Syringe className="w-4 h-4 text-teal-400" />, render: (p: typeof compared[0]) => p?.dosing ? `${p.dosing.typical_dose_mcg[0]}-${p.dosing.typical_dose_mcg[1]} mcg` : "N/A" },
                        { label: "Frequency", icon: <Clock className="w-4 h-4 text-amber-400" />, render: (p: typeof compared[0]) => p?.dosing?.frequency || "N/A" },
                        { label: "Cycle", icon: <Clock className="w-4 h-4 text-amber-400" />, render: (p: typeof compared[0]) => p?.dosing?.cycle_weeks ? `${p.dosing.cycle_weeks[0]}-${p.dosing.cycle_weeks[1]} weeks` : "N/A" },
                        { label: "FDA Status", icon: <ShieldAlert className="w-4 h-4 text-emerald-400" />, render: (p: typeof compared[0]) => p?.is_fda_approved ? "✅ Approved" : "âŒ Not Approved" },
                        { label: "Safety", icon: <ShieldAlert className="w-4 h-4 text-red-400" />, render: (p: typeof compared[0]) => p?.safety_notes },
                    ].map((row) => (
                        <div key={row.label} className={`grid gap-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 p-3`} style={{ gridTemplateColumns: `160px repeat(${compared.length}, 1fr)` }}>
                            <div className="flex items-start gap-2">
                                {row.icon}
                                <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">{row.label}</span>
                            </div>
                            {compared.map((p) => (
                                <div key={p?.slug} className="text-xs text-zinc-400 leading-relaxed">
                                    {row.render(p)}
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            )}

            {compared.length < 2 && (
                <div className="text-center py-16">
                    <GitCompare className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                    <p className="text-zinc-500">Select at least 2 peptides to compare</p>
                </div>
            )}
        </div>
    );
}
