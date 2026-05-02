"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { peptides } from "@/data/peptides";
import { EvidenceLevel } from "@/data/types";
import { Filter } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";
import { ShareModal } from "@/components/share-card/share-modal";
import type { EvidenceCardData } from "@/components/share-card/card-templates";
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
    const containerRef = useRef<HTMLDivElement>(null);

    const categories = useMemo(() => {
        const cats = new Set(peptides.map((p) => p.category));
        return ["all", ...Array.from(cats).sort()];
    }, []);

    const peptidesWithEvidence = useMemo(() =>
        peptides.map((p) => ({ ...p, highestEvidence: getHighestEvidence(p.key_studies) })),
        []);

    /* Scroll reveal */
    useEffect(() => {
        if (!containerRef.current) return;
        const io = new IntersectionObserver(entries => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    setTimeout(() => e.target.classList.add('in'), i * 40);
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
        containerRef.current.querySelectorAll('.reveal').forEach(el => io.observe(el));
        return () => io.disconnect();
    }, []);

    /* Share data */
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
    const totalStudies = peptides.reduce((sum, p) => sum + p.key_studies.length, 0);
    const fdaCount = peptides.filter(p => p.is_fda_approved).length;
    const strongCount = peptidesWithEvidence.filter(p => evidenceRank[p.highestEvidence] >= 5).length;

    return (
            <>
            {/* ── PAGE HEADER ── */}
            <header className="evi-hero">
                <div className="page-header-grid" style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                    maskImage: 'radial-gradient(ellipse at 70% 30%, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at 70% 30%, black 0%, transparent 70%)',
                    opacity: 0.4, pointerEvents: 'none'
                }} />
                <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
                    <div style={{
                        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em',
                        textTransform: 'uppercase' as const, color: 'var(--ink-mute)',
                        marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12
                    }}>
                        <Link href="/" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>Home</Link>
                        <span style={{ color: 'var(--line-strong)' }}>/</span>
                        <Link href="/tools/evidence" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>Tools</Link>
                        <span style={{ color: 'var(--line-strong)' }}>/</span>
                        <span style={{ color: 'var(--gold)' }}>Evidence Dashboard</span>
                    </div>
                    <div style={{
                        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.25em',
                        textTransform: 'uppercase' as const, color: 'var(--gold)',
                        marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12
                    }}>
                        <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
                        § Research Index
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 7vw, 96px)',
                        fontWeight: 300, lineHeight: 1, letterSpacing: '-0.03em',
                        marginBottom: 24, maxWidth: 1100
                    }}>
                        Evidence <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Dashboard</em>.
                    </h1>
                    <p style={{ fontSize: 18, color: 'var(--ink-dim)', maxWidth: 680, lineHeight: 1.6 }}>
                        All {peptides.length} peptides ranked by strength of clinical evidence. Horizontal bars represent relative study count. Click any row to view full details.
                    </p>

                    {/* Page Meta */}
                    <div style={{
                        display: 'flex', gap: 32, marginTop: 32, paddingTop: 32,
                        borderTop: '1px solid var(--line)', flexWrap: 'wrap' as const
                    }}>
                        <div style={{
                            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.15em',
                            textTransform: 'uppercase' as const, color: 'var(--ink-mute)',
                            display: 'flex', alignItems: 'center', gap: 8
                        }}>
                            Compounds: <strong style={{ color: 'var(--gold)', fontWeight: 500 }}>{peptides.length}</strong>
                        </div>
                        <div style={{
                            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.15em',
                            textTransform: 'uppercase' as const, color: 'var(--ink-mute)',
                            display: 'flex', alignItems: 'center', gap: 8
                        }}>
                            Total Studies: <strong style={{ color: 'var(--gold)', fontWeight: 500 }}>{totalStudies}</strong>
                        </div>
                        <div style={{
                            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.15em',
                            textTransform: 'uppercase' as const, color: 'var(--ink-mute)',
                            display: 'flex', alignItems: 'center', gap: 8
                        }}>
                            FDA Approved: <strong style={{ color: 'var(--green)', fontWeight: 500 }}>{fdaCount}</strong>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── MAIN CONTENT ── */}
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px' }} ref={containerRef}>
                <section style={{ padding: '80px 0' }}>
                    {/* Stats Row */}
                    <div className="evi-stats-row reveal">
                        <div className="evi-stat">
                            <div className="evi-stat-label">Compounds</div>
                            <div className="evi-stat-value"><em>{peptides.length}</em></div>
                        </div>
                        <div className="evi-stat">
                            <div className="evi-stat-label">Total Studies</div>
                            <div className="evi-stat-value"><em>{totalStudies}</em></div>
                        </div>
                        <div className="evi-stat">
                            <div className="evi-stat-label">FDA Approved</div>
                            <div className="evi-stat-value"><em>{fdaCount}</em></div>
                        </div>
                        <div className="evi-stat">
                            <div className="evi-stat-label">Strong+ Evidence</div>
                            <div className="evi-stat-value"><em>{strongCount}</em></div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="evi-legend reveal">
                        {Object.keys(evidenceLabel).map((level) => (
                            <div key={level} className="evi-legend-item">
                                <div className={`evi-legend-dot evi-color-bg-${level}`} />
                                <span className="evi-legend-text">{evidenceLabel[level]}</span>
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="evi-controls reveal">
                        <div className="evi-control-group">
                            <div className="evi-control-label">
                                <Filter style={{ width: 12, height: 12 }} />
                                Sort
                            </div>
                            {(["evidence", "studies", "name"] as SortBy[]).map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSortBy(s)}
                                    className={`evi-control-btn ${sortBy === s ? "active" : ""}`}
                                >
                                    {s === "evidence" ? "Evidence" : s === "studies" ? "Studies" : "A–Z"}
                                </button>
                            ))}
                        </div>

                        <div className="evi-control-group">
                            <div className="evi-control-label">Category</div>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilterCategory(cat)}
                                    className={`evi-control-btn ${filterCategory === cat ? "active" : ""}`}
                                    style={{ textTransform: 'capitalize' }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Share */}
                    <div style={{ marginBottom: 32 }} className="reveal">
                        <ShareModal
                            data={evidenceShareData}
                            shareUrl="https://peptidex.app/tools/evidence"
                            shareText={`Peptide Evidence Tier List — ${peptides.length} compounds ranked by scientific proof 🧬 peptidex.app/tools/evidence`}
                            buttonLabel="Share Tier List"
                        />
                    </div>

                    {/* Section Label */}
                    <div className="reveal" style={{
                        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.25em',
                        textTransform: 'uppercase' as const, color: 'var(--gold)',
                        marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12
                    }}>
                        <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
                        § {sorted.length} Results
                    </div>

                    {/* Chart */}
                    <div className="evi-chart-list reveal">
                        <div className="evi-chart-header">
                            <div />
                            <div>Peptide</div>
                            <div>Evidence Bar</div>
                            <div style={{ textAlign: 'right' }}>Studies</div>
                        </div>
                        {sorted.map((p, i) => (
                            <Link
                                key={p.slug}
                                href={`/library/${p.slug}`}
                                className={`evi-card evi-color-border-${p.highestEvidence}`}
                                style={{ animationDelay: `${i * 30}ms` }}
                            >
                                <span className="evi-card-icon">{getCategoryIcon(p.category)}</span>
                                <div className="evi-card-name">
                                    <span className="evi-card-title">{p.name}</span>
                                    <span className={`evi-card-badge evi-color-bg-${p.highestEvidence}`}>
                                        {evidenceLabel[p.highestEvidence]}
                                    </span>
                                </div>
                                <div className="evi-card-bar-wrap">
                                    <div
                                        className={`evi-card-bar evi-color-bg-${p.highestEvidence}`}
                                        style={{ width: `${(p.key_studies.length / maxStudies) * 100}%` }}
                                    />
                                </div>
                                <span className="evi-card-count">{p.key_studies.length} studies</span>
                            </Link>
                        ))}
                    </div>

                    {/* Warning */}
                    <div className="evi-warning reveal">
                        <strong>⚠ Research reference only</strong>
                        Evidence levels are based on a qualitative assessment of published research. This is not a clinical recommendation. Many compounds are in early research stages and are not FDA-approved for human use.
                    </div>
                </section>

                {/* Disclaimer Strip */}
                <div style={{
                    background: 'rgba(212,131,42,0.04)',
                    borderTop: '1px solid rgba(212,131,42,0.2)',
                    borderBottom: '1px solid rgba(212,131,42,0.2)',
                    padding: '16px 48px',
                    textAlign: 'center' as const,
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    color: 'var(--amber)',
                }}>
                    ⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved
                </div>
            </div>
            </>
    );
}
