"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { peptides } from "@/data/peptides";
import { EvidenceBadge } from "@/components/peptide-card";
import { SHORT_DISCLAIMER } from "@/data/constants";
import { Search, FlaskConical, ExternalLink, ShieldAlert } from "lucide-react";
import { EvidenceLevel } from "@/data/types";

const evidenceLevels: (EvidenceLevel | "all")[] = ["all", "very-strong", "strong", "moderate-strong", "moderate", "preclinical", "emerging"];

export default function ResearchPage() {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState<EvidenceLevel | "all">("all");

    const allStudies = useMemo(() => {
        return peptides.flatMap((p) =>
            p.key_studies.map((s) => ({ ...s, peptideName: p.name, peptideSlug: p.slug }))
        );
    }, []);

    const filtered = useMemo(() => {
        let results = allStudies;
        if (filter !== "all") results = results.filter((s) => s.evidence_level === filter);
        if (query) {
            const q = query.toLowerCase();
            results = results.filter(
                (s) => s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q) || s.peptideName.toLowerCase().includes(q)
            );
        }
        return results;
    }, [allStudies, query, filter]);

    return (
        <div className="max-w-3xl mx-auto px-3 py-4 md:px-4 md:py-6">
            {/* Disclaimer */}
            <div className="rounded-xl md:rounded-2xl bg-amber-950/25 border border-amber-500/20 p-2.5 md:p-3 mb-4 md:mb-6">
                <div className="flex items-start gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] md:text-[11px] text-amber-400/80 leading-relaxed">{SHORT_DISCLAIMER}</p>
                </div>
            </div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 md:mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <FlaskConical className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
                    <h2 className="text-xl md:text-2xl font-bold text-zinc-100">Research Hub</h2>
                </div>
                <p className="text-xs md:text-sm text-zinc-400">{allStudies.length} cited studies across {peptides.length} compounds</p>
            </motion.div>

            <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input type="text" placeholder="Search studies..." value={query} onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-colors" />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
                {evidenceLevels.map((level) => (
                    <button key={level} onClick={() => setFilter(level)}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors capitalize whitespace-nowrap ${filter === level ? "bg-violet-500/20 text-violet-300 border border-violet-500/30" : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                            }`}>
                        {level === "all" ? "All" : level.replace(/-/g, " ")}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {filtered.map((study, i) => (
                    <motion.a key={`${study.peptideName}-${i}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                        href={study.pubmed_url} target="_blank" rel="noopener noreferrer"
                        className="block rounded-xl md:rounded-2xl bg-zinc-900/80 border border-zinc-800 p-3 md:p-4 hover:border-violet-500/30 transition-colors group">
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-sm font-semibold text-zinc-200 leading-tight group-hover:text-violet-300 transition-colors">{study.title}</h3>
                            <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-violet-400 flex-shrink-0 mt-0.5" />
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-3">{study.summary}</p>
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-zinc-400 font-medium">{study.peptideName}</span>
                            <EvidenceBadge level={study.evidence_level} />
                        </div>
                    </motion.a>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12"><p className="text-zinc-400">No studies match your search.</p></div>
            )}
        </div>
    );
}
