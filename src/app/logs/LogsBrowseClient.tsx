"use client";

import React, { useState, useEffect, useCallback } from "react";
import { peptides } from "@/data/peptides";
import { vendors } from "@/data/vendors";
import { FlagButton } from "@/components/logs/FlagButton";
import { VerificationBadge } from "@/components/logs/VerificationBadge";
import Link from "next/link";

interface LogEntry {
    id: string;
    peptide_slugs: string[];
    vendor_slug: string;
    dose_mcg: number | null;
    frequency: string | null;
    duration_weeks: number | null;
    goal_slug: string | null;
    efficacy_score: number;
    side_effect_score: number;
    would_repeat: boolean;
    outcome_text: string | null;
    verification_level: string;
    created_at: string;
    profiles: { display_name: string; badge: string; country_code: string | null };
}

interface Pagination { page: number; limit: number; total: number; totalPages: number; }

const BADGE_ICON: Record<string, string> = { contributor: "🧪", verified_buyer: "✅", lab_confirmed: "🏆" };

export default function LogsBrowseClient() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
    const [loading, setLoading] = useState(true);
    const [peptideFilter, setPeptideFilter] = useState("");
    const [vendorFilter, setVendorFilter] = useState("");
    const [sort, setSort] = useState("recent");

    const fetchLogs = useCallback(async (page = 1) => {
        setLoading(true);
        const params = new URLSearchParams({ page: String(page), limit: "20", sort });
        if (peptideFilter) params.set("peptide", peptideFilter);
        if (vendorFilter) params.set("vendor", vendorFilter);

        const res = await fetch(`/api/protocol-logs/list?${params}`);
        if (res.ok) {
            const data = await res.json();
            setLogs(data.logs);
            setPagination(data.pagination);
        }
        setLoading(false);
    }, [peptideFilter, vendorFilter, sort]);

    useEffect(() => { fetchLogs(1); }, [fetchLogs]);

    const chipStyle = (active: boolean) => ({
        padding: "6px 14px", borderRadius: 8, fontSize: 12, fontFamily: "var(--sans)", fontWeight: 500 as const,
        cursor: "pointer" as const, transition: "all 0.15s", border: "1px solid",
        borderColor: active ? "var(--gold)" : "var(--line-strong)",
        background: active ? "rgba(201,169,97,0.15)" : "var(--bg-soft)",
        color: active ? "var(--gold)" : "var(--ink-dim)",
    });

    return (
        <div style={{ background: "var(--bg)" }}>
            <div className="page-header">
                <div className="page-header-grid" />
                <div className="page-header-wrap">
                    <nav className="breadcrumb">
                        <Link href="/">Home</Link><span className="sep">/</span><span className="current">Protocol Logs</span>
                    </nav>
                    <h1 className="page-title">Verified Protocol <em>Logs</em></h1>
                    <p className="page-subtitle">
                        Real-world protocol outcomes from the research community. Weighted by verification level.
                    </p>
                </div>
            </div>

            <div className="about-content" style={{ maxWidth: 960 }}>
                {/* Filters */}
                <div className="rounded-xl p-5 mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label style={{ fontFamily: "var(--sans)", fontSize: 11, color: "var(--ink-mute)", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Peptide</label>
                            <select value={peptideFilter} onChange={e => setPeptideFilter(e.target.value)}
                                style={{ width: "100%", marginTop: 4, padding: "8px 12px", borderRadius: 8, background: "var(--bg-soft)", border: "1px solid var(--line-strong)", color: "var(--ink)", fontFamily: "var(--sans)", fontSize: 13, outline: "none" }}>
                                <option value="">All peptides</option>
                                {peptides.slice(0, 52).map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ fontFamily: "var(--sans)", fontSize: 11, color: "var(--ink-mute)", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Vendor</label>
                            <select value={vendorFilter} onChange={e => setVendorFilter(e.target.value)}
                                style={{ width: "100%", marginTop: 4, padding: "8px 12px", borderRadius: 8, background: "var(--bg-soft)", border: "1px solid var(--line-strong)", color: "var(--ink)", fontFamily: "var(--sans)", fontSize: 13, outline: "none" }}>
                                <option value="">All vendors</option>
                                {vendors.map(v => <option key={v.slug} value={v.slug}>{v.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ fontFamily: "var(--sans)", fontSize: 11, color: "var(--ink-mute)", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Sort</label>
                            <div className="flex gap-2 mt-1">
                                {[["recent", "Recent"], ["efficacy", "Efficacy"], ["verified", "Verified"]].map(([k, v]) => (
                                    <button key={k} onClick={() => setSort(k)} style={chipStyle(sort === k)}>{v}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats bar */}
                <div className="flex items-center justify-between mb-6">
                    <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-mute)" }}>
                        {pagination.total} protocol{pagination.total !== 1 ? "s" : ""} logged
                    </span>
                    <Link href="/log-protocol" className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02]"
                        style={{ background: "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)", color: "#0a0a0b", fontFamily: "var(--sans)" }}>
                        + Log Protocol
                    </Link>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-12">
                        <div style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink-mute)", letterSpacing: "0.15em" }}>LOADING...</div>
                    </div>
                )}

                {/* Empty state */}
                {!loading && logs.length === 0 && (
                    <div className="text-center py-16 rounded-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                        <div className="text-5xl mb-4">📋</div>
                        <p style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--ink)", fontWeight: 300 }}>No protocols logged yet</p>
                        <p className="mt-2" style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink-dim)" }}>
                            Be the first to contribute data for this filter.
                        </p>
                        <Link href="/log-protocol" className="inline-block mt-6 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-[1.02]"
                            style={{ background: "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)", color: "#0a0a0b", fontFamily: "var(--sans)", fontSize: 14 }}>
                            Log Your First Protocol →
                        </Link>
                    </div>
                )}

                {/* Log cards */}
                {!loading && logs.length > 0 && (
                    <div className="space-y-3">
                        {logs.map(log => (
                            <div key={log.id} className="rounded-xl p-5 transition-all hover:border-[var(--gold)]/20"
                                style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {log.peptide_slugs.map(slug => (
                                                <Link key={slug} href={`/logs/${slug}`}
                                                    className="px-2 py-0.5 rounded text-xs font-medium transition-colors hover:bg-[rgba(201,169,97,0.25)]"
                                                    style={{ background: "rgba(201,169,97,0.15)", color: "var(--gold)", fontFamily: "var(--sans)" }}>
                                                    {peptides.find(p => p.slug === slug)?.name || slug}
                                                </Link>
                                            ))}
                                            <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)" }}>
                                                via {vendors.find(v => v.slug === log.vendor_slug)?.name || log.vendor_slug}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-2" style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--ink-dim)" }}>
                                            {log.dose_mcg && <span>{log.dose_mcg}mcg</span>}
                                            {log.frequency && <span>{log.frequency.replace(/_/g, "/")}</span>}
                                            {log.duration_weeks && <span>{log.duration_weeks}wk</span>}
                                        </div>
                                        {log.outcome_text && (
                                            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-dim)", fontFamily: "var(--serif)", fontStyle: "italic" }}>
                                                &quot;{log.outcome_text.substring(0, 200)}{log.outcome_text.length > 200 ? "..." : ""}&quot;
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 shrink-0">
                                        <div className="text-center">
                                            <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-mute)", textTransform: "uppercase" as const, letterSpacing: "0.12em" }}>Efficacy</div>
                                            <div style={{ fontFamily: "var(--sans)", fontSize: 22, fontWeight: 700, color: "var(--gold)" }}>{log.efficacy_score}</div>
                                        </div>
                                        <div className="text-center">
                                            <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-mute)", textTransform: "uppercase" as const, letterSpacing: "0.12em" }}>Side FX</div>
                                            <div style={{ fontFamily: "var(--sans)", fontSize: 22, fontWeight: 700, color: log.side_effect_score <= 3 ? "var(--green)" : "var(--amber)" }}>{log.side_effect_score}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 flex items-center justify-between border-t" style={{ borderColor: "var(--line)" }}>
                                    <div className="flex items-center gap-2">
                                        <span style={{ fontSize: 14 }}>{BADGE_ICON[log.profiles?.badge] || "🧪"}</span>
                                        <span style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--ink-dim)" }}>
                                            {log.profiles?.display_name}
                                            {log.profiles?.country_code && <span className="ml-1 opacity-50">({log.profiles.country_code})</span>}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <VerificationBadge level={log.verification_level} size="sm" />
                                        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)" }}>
                                            {new Date(log.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                        </span>
                                        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: log.would_repeat ? "var(--green)" : "var(--ink-mute)" }}>
                                            {log.would_repeat ? "✓ repeat" : "✗ no repeat"}
                                        </span>
                                        <FlagButton logId={log.id} vendorSlug={log.vendor_slug} />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="flex justify-center gap-2 pt-6">
                                {Array.from({ length: Math.min(pagination.totalPages, 7) }, (_, i) => i + 1).map(p => (
                                    <button key={p} onClick={() => fetchLogs(p)}
                                        className="w-9 h-9 rounded-lg text-sm font-medium transition-all"
                                        style={{
                                            background: pagination.page === p ? "var(--gold)" : "var(--bg-card)",
                                            color: pagination.page === p ? "#0a0a0b" : "var(--ink-dim)",
                                            border: `1px solid ${pagination.page === p ? "var(--gold)" : "var(--line)"}`,
                                            fontFamily: "var(--sans)",
                                        }}>
                                        {p}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
