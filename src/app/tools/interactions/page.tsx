"use client";
import Link from 'next/link';
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { peptides } from "@/data/peptides";
import { checkInteractions } from "@/data/peptide-interactions";
import { SHORT_DISCLAIMER } from "@/data/constants";
import { ShieldAlert, X, Search, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";

export default function InteractionsPage() {
    const [selected, setSelected] = useState<string[]>([]);
    const [search, setSearch] = useState("");

    const interactions = useMemo(() => checkInteractions(selected), [selected]);

    const filtered = useMemo(() => {
        if (!search) return peptides;
        const q = search.toLowerCase();
        return peptides.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }, [search]);

    const toggle = (name: string) => {
        setSelected((prev) => prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]);
    };

    const synergies = interactions.filter((i) => i.type === "synergy");
    const cautions = interactions.filter((i) => i.type === "caution");
    const contraindicated = interactions.filter((i) => i.type === "contraindicated");

    return (
        <div className="max-w-3xl mx-auto px-4 py-4 md:py-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 pt-2">
        <Link href="/" className="text-zinc-500 hover:text-amber-400 transition-colors text-xs">Home</Link>
        <span className="text-zinc-700 text-xs">/</span>
        <Link href="/tools" className="text-zinc-500 hover:text-amber-400 transition-colors text-xs">Tools</Link>
        <span className="text-zinc-700 text-xs">/</span>
        <span className="text-zinc-200 font-medium text-xs">Interaction Checker</span>
      </nav>
      
            <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-2.5 mb-4">
                <div className="flex items-start gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] md:text-[11px] text-amber-400/80 leading-relaxed">{SHORT_DISCLAIMER}</p>
                </div>
            </div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <ShieldAlert className="w-5 h-5 text-amber-400" />
                    <h1 className="text-xl md:text-2xl font-bold text-zinc-100">Interaction Checker</h1>
                </div>
                <p className="text-xs md:text-sm text-zinc-400">Select peptides to check for synergies, cautions, and conflicts</p>
            </motion.div>

            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
                {selected.map((name) => {
                    const p = peptides.find((x) => x.name === name);
                    return (
                        <motion.button key={name} initial={{ scale: 0 }} animate={{ scale: 1 }}
                            onClick={() => toggle(name)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-500/15 border border-violet-500/30 text-sm text-violet-300 font-medium hover:bg-red-500/15 hover:border-red-500/30 hover:text-red-300 transition-colors">
                            <span>{getCategoryIcon(p?.category || "")}</span> {name} <X className="w-3 h-3" />
                        </motion.button>
                    );
                })}
                {selected.length === 0 && <p className="text-sm text-zinc-600 py-1.5">No peptides selected   tap below to add</p>}
            </div>

            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input type="text" placeholder="Search peptides..." value={search} onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 transition-colors" />
            </div>

            {/* Peptide Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                {filtered.map((p) => {
                    const isSelected = selected.includes(p.name);
                    return (
                        <button key={p.slug} onClick={() => toggle(p.name)}
                            className={`text-left px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${isSelected ? "border-violet-500/40 bg-violet-500/10 text-violet-300" : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"}`}>
                            <span className="mr-1">{getCategoryIcon(p.category)}</span> {p.name}
                        </button>
                    );
                })}
            </div>

            {/* Results */}
            {selected.length >= 2 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">
                        {interactions.length} interaction{interactions.length !== 1 ? "s" : ""} found
                    </h2>

                    {contraindicated.length > 0 && (
                        <div className="space-y-2">
                            {contraindicated.map((int, i) => (
                                <div key={i} className="rounded-xl bg-red-950/30 border border-red-500/30 p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <XCircle className="w-4 h-4 text-red-400" />
                                        <span className="text-sm font-bold text-red-300">⚠️ AVOID: {int.peptide_a} + {int.peptide_b}</span>
                                    </div>
                                    <p className="text-xs text-red-400/80">{int.notes_a || int.notes_b}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {cautions.length > 0 && (
                        <div className="space-y-2">
                            {cautions.map((int, i) => (
                                <div key={i} className="rounded-xl bg-amber-950/30 border border-amber-500/30 p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                                        <span className="text-sm font-bold text-amber-300">Caution: {int.peptide_a} + {int.peptide_b}</span>
                                    </div>
                                    <p className="text-xs text-amber-400/80">{int.notes_a || int.notes_b}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {synergies.length > 0 && (
                        <div className="space-y-2">
                            {synergies.map((int, i) => (
                                <div key={i} className="rounded-xl bg-emerald-950/30 border border-emerald-500/30 p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                                        <span className="text-sm font-bold text-emerald-300">Synergy: {int.peptide_a} + {int.peptide_b}</span>
                                    </div>
                                    <p className="text-xs text-emerald-400/80">{int.notes_a || int.notes_b}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {interactions.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-sm text-zinc-500">No known interactions between selected peptides.</p>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
}
