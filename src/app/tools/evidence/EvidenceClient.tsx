"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { peptides } from "@/data/peptides";
import { EvidenceLevel } from "@/data/types";
import { BarChart3, Filter } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";
import { ShareModal } from "@/components/share-card/share-modal";
import type { EvidenceCardData } from "@/components/share-card/card-templates";
import RedesignLayout from '@/components/redesign/RedesignLayout';
import './evidence-redesign.css';

const evidenceRank: Record<string, number> = {
    "very-strong": 6, "strong": 5, "moderate-strong": 4, "moderate": 3, "emerging": 2, "preclinical": 1, "anecdotal": 0,
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

export default function EvidenceClient() {
    const [sortBy, setSortBy] = useState<SortBy>("evidence");
    const [filterCategory, setFilterCategory] = useState("all");

    const categories = useMemo(() => {
        const cats = new Set(peptides.map((p) => p.category));
        return ["all", ...Array.from(cats).sort()];
    }, []);

    const peptidesWithEvidence = useMemo(() =>
        peptides.map((p) => ({ ...p, highestEvidence: getHighestEvidence(p.key_studies) })),
        []);

    const evidenceShareData: EvidenceCardData = useMemo(() => {
        const tierMap: Record<string, string[]> = {
            "very-strong": [], "strong": [], "moderate-strong": [], "moderate": [],
            "emerging": [], "preclinical": [], "anecdotal": [],
        };
        peptidesWithEvidence.forEach(p => {
            if (tierMap[p.highestEvidence]) tierMap[p.highestEvidence].push(p.name);
        });
        return {
            type: "evidence" as const,
            tiers: [
                { label: "FDA Approved", color: "emerald", peptides: peptides.filter(p => p.is_fda_approved).map(p => p.name) },
                { label: "Strong Clinical", color: "blue", peptides: [...tierMap["very-strong"], ...tierMap["strong"]].filter(n => !peptides.find(p => p.name === n)?.is_fda_approved) },
                { label: "Moderate / Preclinical", color: "amber", peptides: [...tierMap["moderate-strong"], ...tierMap["moderate"], ...tierMap["preclinical"]] },
                { label: "Emerging / Limited", color: "zinc", peptides: [...tierMap["emerging"], ...tierMap["anecdotal"]] },
            ],
            totalPeptides: peptides.length,
        };
    }, [peptidesWithEvidence]);

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
        <RedesignLayout>
            <div className="evi-wrap">
                <div className="evi-header">
                    <h1 className="evi-title">
                        <div className="evi-icon-wrap"><BarChart3 /></div>
                        Evidence Dashboard
                    </h1>
                    <p className="evi-subtitle">All {peptides.length} peptides ranked by strength of clinical evidence</p>
                </div>

                <div style={{ marginBottom: "24px" }}>
                    <ShareModal
                        data={evidenceShareData}
                        shareUrl="https://peptidex.app/tools/evidence"
                        shareText="Peptide Evidence Tier List — 33 compounds ranked by scientific proof \uD83E\uDDEC peptidex.app/tools/evidence"
                        buttonLabel="Share Tier List"
                    />
                </div>

                <div className="evi-legend">
                    {Object.keys(evidenceLabel).map((level) => (
                        <div key={level} className="evi-legend-item">
                            <div className={`evi-legend-dot evi-color-bg-${level}`} />
                            <span className="evi-legend-text">{evidenceLabel[level]}</span>
                        </div>
                    ))}
                </div>

                <div className="evi-controls">
                    <div className="evi-control-group">
                        <div className="evi-control-label"><Filter /> Sort:</div>
                        {(["evidence", "studies", "name"] as SortBy[]).map((s) => (
                            <button key={s} onClick={() => setSortBy(s)} className={`evi-control-btn ${sortBy === s ? "active" : ""}`}>
                                {s === "evidence" ? "Evidence Level" : s === "studies" ? "Study Count" : "Name"}
                            </button>
                        ))}
                    </div>

                    <div className="evi-control-group" style={{ textTransform: "capitalize" }}>
                        <div className="evi-control-label">Category:</div>
                        {categories.map((cat) => (
                            <button key={cat} onClick={() => setFilterCategory(cat)} className={`evi-control-btn ${filterCategory === cat ? "active" : ""}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="evi-chart-list">
                    {sorted.map((p, i) => (
                        <motion.div key={p.slug} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                            <Link href={`/library/${p.slug}`} className={`evi-card evi-color-border-${p.highestEvidence}`}>
                                <span className="evi-card-icon">{getCategoryIcon(p.category)}</span>
                                <div className="evi-card-content">
                                    <div className="evi-card-top">
                                        <div className="evi-card-title-group">
                                            <span className="evi-card-title">{p.name}</span>
                                            <span className={`evi-card-badge evi-color-bg-${p.highestEvidence}`}>{evidenceLabel[p.highestEvidence]}</span>
                                        </div>
                                        <span className="evi-card-count">{p.key_studies.length} studies</span>
                                    </div>
                                    <div className="evi-card-bar-wrap">
                                        <motion.div 
                                            initial={{ width: 0 }} 
                                            animate={{ width: `${(p.key_studies.length / maxStudies) * 100}%` }}
                                            transition={{ delay: i * 0.03 + 0.2, duration: 0.5 }}
                                            className={`evi-card-bar evi-color-bg-${p.highestEvidence}`} 
                                        />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </RedesignLayout>
    );
}
