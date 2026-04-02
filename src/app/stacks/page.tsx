"use client";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { stacks } from "@/data/stacks";
import { Users, BookmarkPlus, Bookmark, ArrowRight, Activity, Beaker, ShieldAlert, BookOpen } from "lucide-react";
import { peptides } from "@/data/peptides";

const SAVED_STACKS_KEY = "PeptiDex-saved-stacks";

export default function StacksPage() {
    const [savedStackIds, setSavedStackIds] = useState<string[]>([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = JSON.parse(localStorage.getItem(SAVED_STACKS_KEY) || "[]");
                setSavedStackIds(saved);
            } catch { }
        }
    }, []);

    const toggleSave = (stackName: string) => {
        setSavedStackIds((prev) => {
            const next = prev.includes(stackName) ? prev.filter(id => id !== stackName) : [...prev, stackName];
            localStorage.setItem(SAVED_STACKS_KEY, JSON.stringify(next));
            return next;
        });
    };

    const filtered = useMemo(() => {
        let list = stacks;
        if (filter === "saved") {
            list = list.filter(s => savedStackIds.includes(s.stack_name));
        }
        return list;
    }, [filter, savedStackIds]);

    return (
        <div className="max-w-3xl mx-auto px-3 py-4 md:px-4 md:py-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-pink-400" />
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold text-zinc-100">Community Stacks</h1>
                </div>
                <p className="text-sm text-zinc-400 mt-2">Curated peptide protocols for specific goals. Learn from community knowledge.</p>
            </motion.div>

            <div className="flex flex-wrap gap-2 mb-6">
                <button onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${filter === "all" ? "bg-zinc-100 text-zinc-900 border-zinc-100" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"}`}>
                    All Stacks
                </button>
                <button onClick={() => setFilter("saved")}
                    className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${filter === "saved" ? "bg-pink-500 text-white border-pink-500" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"}`}>
                    Saved ({savedStackIds.length})
                </button>
            </div>

            <div className="space-y-6">
                {filtered.map((stack, i) => (
                    <motion.div key={stack.stack_name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 overflow-hidden">

                        {/* Header */}
                        <div className="p-4 md:p-5 border-b border-zinc-800/60 bg-zinc-900/60 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-bold text-zinc-100 mb-1">{stack.stack_name}</h2>
                                <p className="text-[13px] text-zinc-400 leading-relaxed max-w-xl">{stack.goal}</p>
                            </div>
                            <button onClick={() => toggleSave(stack.stack_name)} className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl border transition-colors ${savedStackIds.includes(stack.stack_name) ? "bg-pink-500/10 border-pink-500/30 text-pink-400" : "bg-zinc-800/50 border-zinc-700/50 text-zinc-400 hover:text-zinc-200"}`}>
                                {savedStackIds.includes(stack.stack_name) ? <Bookmark className="w-5 h-5 fill-current" /> : <BookmarkPlus className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 md:p-5">
                            {/* Peptides List */}
                            <div className="mb-6">
                                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-1.5"><Beaker className="w-3.5 h-3.5" /> Stack Compounds</h3>
                                <div className="space-y-2">
                                    {stack.peptides.map((p) => {
                                        const pepData = peptides.find(x => x.name === p.name);
                                        return (
                                            <div key={p.name} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
                                                <Link href={`/library/${pepData?.slug || p.name.toLowerCase()}`} className="text-sm font-bold text-violet-400 hover:text-violet-300 w-32 shrink-0">{p.name}</Link>
                                                <span className="text-xs text-zinc-400 leading-relaxed">{p.role_in_stack}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Synergy */}
                            <div className="mb-6">
                                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Why It Works</h3>
                                <p className="text-[13px] text-zinc-300 leading-relaxed bg-zinc-800/30 p-4 rounded-xl border border-zinc-800/50">{stack.synergy_rationale}</p>
                            </div>

                            {/* Studies */}
                            <div>
                                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Key Studies</h3>
                                <ul className="space-y-1.5">
                                    {stack.supporting_studies.map((s, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-[11px] text-zinc-400">
                                            <span className="text-zinc-600 mt-0.5">•</span>
                                            <span>
                                                {s.description}   <a href={s.pubmed_url} target="_blank" rel="noopener noreferrer" className="text-violet-400/80 hover:text-violet-300 underline underline-offset-2">PubMed</a>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {filtered.length === 0 && filter === "saved" && (
                    <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl">
                        <Bookmark className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                        <h3 className="text-zinc-300 font-medium text-sm">No saved stacks yet</h3>
                        <p className="text-xs text-zinc-500 mt-1">Browse the community stacks and save your favorites.</p>
                        <button onClick={() => setFilter("all")} className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs rounded-lg transition-colors">Browse All</button>
                    </div>
                )}
            </div>
        </div>
    );
}
