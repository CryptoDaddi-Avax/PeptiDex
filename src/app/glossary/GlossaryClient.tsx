"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { glossary, GlossaryTerm } from "@/data/glossary";
import { peptides } from "@/data/peptides";
import { Search, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";

const categories = [
    { id: "all", label: "All", color: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30" },
    { id: "administration", label: "Administration", color: "bg-teal-500/15 text-teal-300 border-teal-500/30" },
    { id: "biology", label: "Biology", color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
    { id: "pharmacology", label: "Pharmacology", color: "bg-violet-500/15 text-violet-300 border-violet-500/30" },
    { id: "chemistry", label: "Chemistry", color: "bg-blue-500/15 text-blue-300 border-blue-500/30" },
    { id: "clinical", label: "Clinical", color: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
    { id: "general", label: "General", color: "bg-pink-500/15 text-pink-300 border-pink-500/30" },
];

const categoryColors: Record<string, string> = {
    administration: "border-teal-500/30 bg-teal-500/5",
    biology: "border-emerald-500/30 bg-emerald-500/5",
    pharmacology: "border-violet-500/30 bg-violet-500/5",
    chemistry: "border-blue-500/30 bg-blue-500/5",
    clinical: "border-amber-500/30 bg-amber-500/5",
    general: "border-pink-500/30 bg-pink-500/5",
};

const categoryBadge: Record<string, string> = {
    administration: "bg-teal-500/15 text-teal-400",
    biology: "bg-emerald-500/15 text-emerald-400",
    pharmacology: "bg-violet-500/15 text-violet-400",
    chemistry: "bg-blue-500/15 text-blue-400",
    clinical: "bg-amber-500/15 text-amber-400",
    general: "bg-pink-500/15 text-pink-400",
};

export default function GlossaryClient() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

    const filtered = useMemo(() => {
        let terms = glossary;
        if (activeCategory !== "all") {
            terms = terms.filter((t) => t.category === activeCategory);
        }
        if (search) {
            const q = search.toLowerCase();
            terms = terms.filter((t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q));
        }
        return terms;
    }, [search, activeCategory]);

    // Group by first letter
    const grouped = useMemo(() => {
        const groups: Record<string, GlossaryTerm[]> = {};
        filtered.forEach((t) => {
            const letter = t.term[0].toUpperCase();
            if (!groups[letter]) groups[letter] = [];
            groups[letter].push(t);
        });
        return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
    }, [filtered]);

    return (
        <div className="max-w-3xl mx-auto px-4 py-4 md:py-6">
            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input type="text" placeholder="Search terms..." value={search} onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 transition-colors" />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat) => (
                    <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${activeCategory === cat.id ? cat.color : "border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-zinc-700"}`}>
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Terms */}
            <div className="space-y-6">
                {grouped.map(([letter, terms]) => (
                    <div key={letter}>
                        <div className="sticky top-0 z-10 bg-zinc-950/90 backdrop-blur-sm py-1 mb-2">
                            <span className="text-lg font-bold text-violet-400">{letter}</span>
                            <span className="text-xs text-zinc-600 ml-2">{terms.length} term{terms.length > 1 ? "s" : ""}</span>
                        </div>
                        <div className="space-y-2">
                            {terms.map((term) => {
                                const isExpanded = expandedTerm === term.term;
                                return (
                                    <motion.div key={term.term} layout>
                                        <button
                                            onClick={() => setExpandedTerm(isExpanded ? null : term.term)}
                                            className={`w-full text-left rounded-xl border p-3.5 transition-all ${isExpanded ? categoryColors[term.category] : "border-zinc-800/60 bg-zinc-900/40 hover:border-zinc-700"}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-sm font-semibold text-zinc-100">{term.term}</h3>
                                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase ${categoryBadge[term.category]}`}>{term.category}</span>
                                                </div>
                                                {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                                            </div>
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                                                        <p className="text-xs text-zinc-400 leading-relaxed mt-2">{term.definition}</p>
                                                        {term.related_peptides && term.related_peptides.length > 0 && (
                                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                                <span className="text-[10px] text-zinc-500">Related:</span>
                                                                {term.related_peptides.map((name) => {
                                                                    const pep = peptides.find((p) => p.name === name);
                                                                    return pep ? (
                                                                        <Link key={name} href={`/library/${pep.slug}`} onClick={(e) => e.stopPropagation()}
                                                                            className="px-2 py-0.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-[10px] text-violet-300 font-medium hover:bg-violet-500/20 transition-colors">
                                                                            {getCategoryIcon(pep.category)} {name}
                                                                        </Link>
                                                                    ) : (
                                                                        <span key={name} className="px-2 py-0.5 rounded-lg bg-zinc-800 text-[10px] text-zinc-400">{name}</span>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <BookOpen className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                    <p className="text-sm text-zinc-500">No terms found for &ldquo;{search}&rdquo;</p>
                </div>
            )}
        </div>
    );
}
