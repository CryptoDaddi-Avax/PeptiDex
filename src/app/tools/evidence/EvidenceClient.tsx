"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { peptides } from "@/data/peptides";
import { Filter, Link2, Check } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";
import { ShareModal } from "@/components/share-card/share-modal";
import type { EvidenceCardData } from "@/components/share-card/card-templates";
import type { RankedPeptide } from "./page";
import './evidence-redesign.css';

const evidenceRank: Record<string, number> = {
    "very-strong": 6, "strong": 5, "moderate-strong": 4, "moderate": 3,
    "emerging": 2, "preclinical": 1, "anecdotal": 0,
};

export const evidenceLabelMap: Record<string, string> = {
    "very-strong": "Very Strong", "strong": "Strong", "moderate-strong": "Moderate-Strong",
    "moderate": "Moderate", "emerging": "Emerging", "preclinical": "Preclinical", "anecdotal": "Anecdotal",
};

type SortBy = "evidence" | "studies" | "name";

interface Props {
    initialRanked: RankedPeptide[];
    dateModified: string;   // ISO date "2026-05-07"
    formattedDate: string;  // "May 2026"
}

// ─── Cite-link button ─────────────────────────────────────────────────────────
function CiteAnchorButton({ slug }: { slug: string }) {
    const [copied, setCopied] = useState(false);

    const copy = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const url = `https://peptidex.app/tools/evidence#${slug}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [slug]);

    return (
        <button
            onClick={copy}
            title={`Copy link: /tools/evidence#${slug}`}
            aria-label={`Copy anchor link for ${slug}`}
            style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "2px 4px", borderRadius: 4,
                color: copied ? "var(--green, #22c55e)" : "var(--ink-mute)",
                opacity: 0, transition: "opacity 0.15s, color 0.15s",
                display: "flex", alignItems: "center",
            }}
            className="evi-cite-btn"
        >
            {copied
                ? <Check style={{ width: 12, height: 12 }} />
                : <Link2 style={{ width: 12, height: 12 }} />
            }
        </button>
    );
}

export default function EvidenceClient({ initialRanked, dateModified, formattedDate }: Props) {
    const [sortBy, setSortBy] = useState<SortBy>("evidence");
    const [filterCategory, setFilterCategory] = useState("all");
    const containerRef = useRef<HTMLDivElement>(null);

    // ── Scroll-to-anchor on mount ──────────────────────────────────────────
    useEffect(() => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            // Wait for render then scroll
            requestAnimationFrame(() => {
                const el = document.getElementById(hash);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
            });
        }
    }, []);

    const categories = useMemo(() => {
        const cats = new Set(peptides.map((p) => p.category));
        return ["all", ...Array.from(cats).sort()];
    }, []);

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
        initialRanked.forEach(p => {
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
    }, [initialRanked]);

    /* Client-side filtering/sorting — starts from server-computed list */
    const sorted = useMemo(() => {
        let list = [...initialRanked];
        if (filterCategory !== "all") list = list.filter((p) => p.category === filterCategory);
        if (sortBy === "evidence") {
            list.sort((a, b) => {
                const diff = (evidenceRank[b.highestEvidence] ?? 0) - (evidenceRank[a.highestEvidence] ?? 0);
                return diff !== 0 ? diff : b.key_studies_count - a.key_studies_count;
            });
        } else if (sortBy === "studies") {
            list.sort((a, b) => b.key_studies_count - a.key_studies_count);
        } else {
            list.sort((a, b) => a.name.localeCompare(b.name));
        }
        return list;
    }, [sortBy, filterCategory, initialRanked]);

    const maxStudies = Math.max(...initialRanked.map((p) => p.key_studies_count));
    const totalStudies = initialRanked.reduce((sum, p) => sum + p.key_studies_count, 0);
    const fdaCount = initialRanked.filter(p => p.is_fda_approved).length;
    const strongCount = initialRanked.filter(p => (evidenceRank[p.highestEvidence] ?? 0) >= 5).length;

    // ── Suggested citation text ─────────────────────────────────────────────
    const citationText = `PeptiDex Editorial Team. (${dateModified.slice(0, 4)}). Peptide Clinical Evidence Rankings. PeptiDex. https://peptidex.app/tools/evidence`;

    const [citationCopied, setCitationCopied] = useState(false);
    const copyCitation = useCallback(() => {
        navigator.clipboard.writeText(citationText).then(() => {
            setCitationCopied(true);
            setTimeout(() => setCitationCopied(false), 2500);
        });
    }, [citationText]);

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
                        borderTop: '1px solid var(--line)', flexWrap: 'wrap' as const,
                        alignItems: 'center',
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
                        {/* Timestamp — server-side date, live on page */}
                        <div style={{
                            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.15em',
                            textTransform: 'uppercase' as const, color: 'var(--ink-mute)',
                            display: 'flex', alignItems: 'center', gap: 8,
                            marginLeft: 'auto',
                        }}>
                            <span style={{ opacity: 0.5 }}>↻</span>
                            Last updated: <strong style={{ color: 'var(--ink-dim)', fontWeight: 500 }}>{formattedDate}</strong>
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

                    {/* ── CITE THIS block ── */}
                    <div className="reveal" style={{
                        margin: '32px 0',
                        padding: '20px 24px',
                        borderRadius: 12,
                        border: '1px solid var(--line)',
                        background: 'rgba(212,131,42,0.04)',
                        display: 'flex',
                        flexWrap: 'wrap' as const,
                        alignItems: 'center',
                        gap: 16,
                    }}>
                        <div style={{ flex: 1, minWidth: 280 }}>
                            <div style={{
                                fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em',
                                textTransform: 'uppercase' as const, color: 'var(--gold)',
                                marginBottom: 8,
                            }}>
                                Cite this dataset
                            </div>
                            <p style={{
                                fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-mute)',
                                lineHeight: 1.6, margin: 0,
                                userSelect: 'all' as const,
                            }}>
                                {citationText}
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                            <button
                                onClick={copyCitation}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    padding: '8px 14px', borderRadius: 8,
                                    border: '1px solid var(--line)',
                                    background: citationCopied ? 'rgba(34,197,94,0.1)' : 'var(--surface)',
                                    color: citationCopied ? 'var(--green, #22c55e)' : 'var(--ink-dim)',
                                    fontFamily: 'var(--mono)', fontSize: 11, cursor: 'pointer',
                                    letterSpacing: '0.1em', transition: 'all 0.2s',
                                }}
                            >
                                {citationCopied
                                    ? <><Check style={{ width: 12, height: 12 }} /> Copied</>
                                    : "Copy citation"
                                }
                            </button>
                            <a
                                href="https://creativecommons.org/licenses/by/4.0/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em',
                                    color: 'var(--ink-mute)', textDecoration: 'none',
                                    padding: '8px 10px', borderRadius: 8,
                                    border: '1px solid var(--line)',
                                    whiteSpace: 'nowrap' as const,
                                    transition: 'color 0.15s',
                                }}
                            >
                                CC-BY 4.0
                            </a>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="evi-legend reveal">
                        {Object.keys(evidenceLabelMap).map((level) => (
                            <div key={level} className="evi-legend-item">
                                <div className={`evi-legend-dot evi-color-bg-${level}`} />
                                <span className="evi-legend-text">{evidenceLabelMap[level]}</span>
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
                            <div
                                key={p.slug}
                                id={p.slug}
                                className="evi-row-anchor"
                                style={{ scrollMarginTop: 80 }}
                            >
                                <Link
                                    href={`/library/${p.slug}`}
                                    className={`evi-card evi-color-border-${p.highestEvidence}`}
                                    style={{ animationDelay: `${i * 30}ms` }}
                                >
                                    <span className="evi-card-icon">{getCategoryIcon(p.category)}</span>
                                    <div className="evi-card-name">
                                        <span className="evi-card-title">{p.name}</span>
                                        <span className={`evi-card-badge evi-color-bg-${p.highestEvidence}`}>
                                            {evidenceLabelMap[p.highestEvidence]}
                                        </span>
                                    </div>
                                    <div className="evi-card-bar-wrap">
                                        <div
                                            className={`evi-card-bar evi-color-bg-${p.highestEvidence}`}
                                            style={{ width: `${(p.key_studies_count / maxStudies) * 100}%` }}
                                        />
                                    </div>
                                    <span className="evi-card-count">{p.key_studies_count} studies</span>
                                </Link>
                                <CiteAnchorButton slug={p.slug} />
                            </div>
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
                    ⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved · Data: {formattedDate}
                </div>
            </div>
        </>
    );
}
