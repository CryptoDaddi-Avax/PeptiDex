"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { peptides } from "@/data/peptides";
import { EvidenceLevel } from "@/data/types";
import { BarChart3, Filter } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";

const evidenceRank: Record<string, number> = {
    "very-strong": 6, "strong": 5, "moderate-strong": 4, "moderate": 3, "emerging": 2, "preclinical": 1, "anecdotal": 0,
};
const evidenceColors: Record<string, string> = {
    "very-strong": "bg-emerald-500", "strong": "bg-emerald-400", "moderate-strong": "bg-blue-500",
    "moderate": "bg-blue-400", "emerging": "bg-amber-500", "preclinical": "bg-orange-500", "anecdotal": "bg-zinc-500",
};
const evidenceBorder: Record<string, string> = {
    "very-strong": "border-emerald-500/30", "strong": "border-emerald-400/30", "moderate-strong": "border-blue-500/30",
    "moderate": "border-blue-400/30", "emerging": "border-amber-500/30", "preclinical": "border-orange-500/30", "anecdotal": "border-zinc-500/30",
};
const evidenceLabel: Record<string, string> = {
    "very-strong": "Very Strong", "strong": "Strong", "moderate-strong": "Moderate-Strong",
    "moderate": "Moderate", "emerging": "Emerging", "preclinical": "Preclinical", "anecdotal": "Anecdotal",
};

function getHighestEvidence(studies: { evidence_level: EvidenceLevel }[]): EvidenceLevel {
    let best: EvidenceLevel = "anecdotal";
    let bestRank = 0;
    for (const s of studies) {
        const rank = evidenceRank[s.evidence_level] || 0;
        if (rank > bestRank) { bestRank = rank; best = s.evidence_level; }
    }
    return best;
}

type SortBy = "evidence" | "studies" | "name";

export default function EvidencePage() {
    const [sortBy, setSortBy] = useState<SortBy>("evidence");
    const [filterCategory, setFilterCategory] = useState("all");

    const categories = useMemo(() => {
        const cats = new Set(peptides.map((p) => p.category));
        return ["all", ...Array.from(cats).sort()];
    }, []);

    const peptidesWithEvidence = useMemo(() =>
        peptides.map((p) => ({ ...p, highestEvidence: getHighestEvidence(p.key_studies) })),
        []);

    const sorted = useMemo(() => {
        let list = [...peptidesWithEvidence];
        if (filterCategory !== "all") list = list.filter((p) => p.category === filterCategory);
        if (sortBy === "evidence") {
            list.sort((a, b) => {
                const diff = (evidenceRank[b.highestEvidence] || 0) - (evidenceRank[a.highestEvidence] || 0);
                return diff !== 0 ? diff : b.key_studies.length - a.key_studies.length;
            });
        } else if (sortBy === "studies") {
            list.sort((a, b) => b.key_studies.length - a.key_studies.length);
        } else {
            list.sort((a, b) => a.name.localeCompare(b.name));
        }
        return list;
    }, [sortBy, filterCategory, peptidesWithEvidence]);

    const maxStudies = Math.max(...peptides.map((p) => p.key_studies.length));

    return (
        <div className="max-w-2xl mx-auto px-3 py-4 md:px-4 md:py-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                    <h1 className="text-xl md:text-2xl font-bold text-zinc-100">Evidence Dashboard</h1>
                </div>
                <p className="text-xs md:text-sm text-zinc-400">All {peptides.length} peptides ranked by strength of clinical evidence</p>
            </motion.div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-4">
                {Object.entries(evidenceColors).map(([level, color]) => (
                    <div key={level} className="flex items-center gap-1.5">
                        <div className={`w-3 h-3 rounded-sm ${color}`} />
                        <span className="text-[11px] text-zinc-400">{evidenceLabel[level]}</span>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-2 mb-6">
                <div className="flex items-center gap-1.5 mr-2">
                    <Filter className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="text-[10px] text-zinc-500 uppercase">Sort:</span>
                </div>
                {(["evidence", "studies", "name"] as SortBy[]).map((s) => (
                    <button key={s} onClick={() => setSortBy(s)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${sortBy === s ? "border-violet-500/40 bg-violet-500/10 text-violet-300" : "border-zinc-800 text-zinc-500 hover:border-zinc-700"}`}>
                        {s === "evidence" ? "Evidence Level" : s === "studies" ? "Study Count" : "Name"}
                    </button>
                ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-1.5 mb-6">
                {categories.map((cat) => (
                    <button key={cat} onClick={() => setFilterCategory(cat)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-medium border transition-all capitalize ${filterCategory === cat ? "border-violet-500/40 bg-violet-500/10 text-violet-300" : "border-zinc-800 text-zinc-500 hover:border-zinc-700"}`}>
                        {cat}
                    </button>
                ))}
            </div>

            {/* Chart */}
            <div className="space-y-2">
                {sorted.map((p, i) => (
                    <motion.div key={p.slug} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                        <Link href={`/library/${p.slug}`} className={`flex items-center gap-3 rounded-xl border ${evidenceBorder[p.highestEvidence]} bg-zinc-900/40 p-3 hover:bg-zinc-800/40 transition-colors group`}>
                            <span className="text-base w-6 text-center flex-shrink-0">{getCategoryIcon(p.category)}</span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-zinc-100 truncate group-hover:text-white">{p.name}</span>
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${evidenceColors[p.highestEvidence]} text-white`}>{evidenceLabel[p.highestEvidence]}</span>
                                    </div>
                                    <span className="text-[10px] text-zinc-500 flex-shrink-0 ml-2">{p.key_studies.length} studies</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${(p.key_studies.length / maxStudies) * 100}%` }}
                                        transition={{ delay: i * 0.03 + 0.2, duration: 0.5 }}
                                        className={`h-full rounded-full ${evidenceColors[p.highestEvidence]}`} />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
