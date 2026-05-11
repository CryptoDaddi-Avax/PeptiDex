"use client";

import React, { useState, useEffect, useCallback } from "react";
import { vendors } from "@/data/vendors";
import { peptides } from "@/data/peptides";
import { VerificationBadge } from "@/components/logs/VerificationBadge";
import Link from "next/link";

interface LogEntry {
    id: string;
    peptide_slugs: string[];
    vendor_slug: string;
    dose_mcg: number | null;
    frequency: string | null;
    duration_weeks: number | null;
    efficacy_score: number;
    side_effect_score: number;
    would_repeat: boolean;
    outcome_text: string | null;
    verification_level: string;
    created_at: string;
    profiles: { display_name: string; badge: string; country_code: string | null };
}

interface Stats {
    log_count: number;
    avg_efficacy: number | null;
    avg_side_effects: number | null;
    repeat_pct: number | null;
}

const BADGE_ICON: Record<string, string> = { contributor: "🧪", verified_buyer: "✅", lab_confirmed: "🏆" };

export default function PeptideLogsClient({ peptideSlug, peptideName }: { peptideSlug: string; peptideName: string }) {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [vendorBreakdown, setVendorBreakdown] = useState<(Stats & { vendor_slug: string })[]>([]);
    const [loading, setLoading] = useState(true);
    const [vendorFilter, setVendorFilter] = useState("");

    const fetchData = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams({ peptide: peptideSlug, limit: "30", sort: "recent" });
        if (vendorFilter) params.set("vendor", vendorFilter);

        const [logsRes, statsRes] = await Promise.all([
            fetch(`/api/protocol-logs/list?${params}`),
            fetch(`/api/protocol-logs/stats?peptide=${peptideSlug}`),
        ]);

        if (logsRes.ok) { const d = await logsRes.json(); setLogs(d.logs); }
        if (statsRes.ok) { const d = await statsRes.json(); setStats(d.stats); setVendorBreakdown(d.vendors || []); }
        setLoading(false);
    }, [peptideSlug, vendorFilter]);

    useEffect(() => { fetchData(); }, [fetchData]);

    return (
        <div style={{ background: "var(--bg)" }}>
            <div className="page-header">
                <div className="page-header-grid" />
                <div className="page-header-wrap">
                    <nav className="breadcrumb">
                        <Link href="/">Home</Link><span className="sep">/</span>
                        <Link href="/logs">Logs</Link><span className="sep">/</span>
                        <span className="current">{peptideName}</span>
                    </nav>
                    <h1 className="page-title"><em>{peptideName}</em> Protocol Logs</h1>
                    <p className="page-subtitle">Community-reported outcomes for {peptideName}. Weighted by verification level.</p>
                </div>
            </div>

            <div className="about-content" style={{ maxWidth: 960 }}>
                {/* Aggregate stats */}
                {stats && stats.log_count >= 5 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: "Protocols", value: stats.log_count, color: "var(--ink)" },
                            { label: "Avg Efficacy", value: stats.avg_efficacy ? `${stats.avg_efficacy}/10` : "—", color: "var(--gold)" },
                            { label: "Avg Side FX", value: stats.avg_side_effects ? `${stats.avg_side_effects}/10` : "—", color: stats.avg_side_effects && stats.avg_side_effects <= 3 ? "var(--green)" : "var(--amber)" },
                            { label: "Would Repeat", value: stats.repeat_pct !== null ? `${stats.repeat_pct}%` : "—", color: "var(--green)" },
                        ].map(s => (
                            <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.12em" }}>{s.label}</div>
                                <div style={{ fontFamily: "var(--sans)", fontSize: 28, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Vendor breakdown */}
                {vendorBreakdown.length > 0 && (
                    <div className="rounded-xl p-5 mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                        <h3 style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>By Vendor</h3>
                        <div className="space-y-2">
                            {vendorBreakdown.map(vb => (
                                <button key={vb.vendor_slug} onClick={() => setVendorFilter(vendorFilter === vb.vendor_slug ? "" : vb.vendor_slug)}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all hover:bg-white/3"
                                    style={{ background: vendorFilter === vb.vendor_slug ? "rgba(201,169,97,0.08)" : "transparent", border: `1px solid ${vendorFilter === vb.vendor_slug ? "var(--gold)" : "var(--line)"}` }}>
                                    <span style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink)" }}>
                                        {vendors.find(v => v.slug === vb.vendor_slug)?.name || vb.vendor_slug}
                                        <span className="ml-2 opacity-50">({vb.log_count} logs)</span>
                                    </span>
                                    <div className="flex items-center gap-4" style={{ fontFamily: "var(--mono)", fontSize: 12 }}>
                                        <span style={{ color: "var(--gold)" }}>{vb.avg_efficacy ?? "—"}</span>
                                        <span style={{ color: vb.avg_side_effects && vb.avg_side_effects <= 3 ? "var(--green)" : "var(--amber)" }}>{vb.avg_side_effects ?? "—"}</span>
                                        <span style={{ color: "var(--green)" }}>{vb.repeat_pct !== null ? `${vb.repeat_pct}%` : "—"}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="flex items-center justify-between mb-6">
                    <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-mute)" }}>
                        {logs.length} log{logs.length !== 1 ? "s" : ""}
                        {stats && stats.log_count < 5 && " · Need 5+ for weighted stats"}
                    </span>
                    <Link href="/log-protocol" className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02]"
                        style={{ background: "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)", color: "#0a0a0b", fontFamily: "var(--sans)" }}>
                        + Log {peptideName}
                    </Link>
                </div>

                {loading && <div className="text-center py-12"><div style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink-mute)" }}>LOADING...</div></div>}

                {!loading && logs.length === 0 && (
                    <div className="text-center py-16 rounded-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                        <div className="text-5xl mb-4">📋</div>
                        <p style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--ink)", fontWeight: 300 }}>No {peptideName} protocols yet</p>
                        <p className="mt-2" style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink-dim)" }}>Be the first to log your {peptideName} protocol.</p>
                    </div>
                )}

                {!loading && logs.length > 0 && (
                    <div className="space-y-3">
                        {logs.map(log => (
                            <div key={log.id} className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2" style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)" }}>
                                            <span>{vendors.find(v => v.slug === log.vendor_slug)?.name}</span>
                                            {log.peptide_slugs.length > 1 && <span className="opacity-50">+{log.peptide_slugs.filter(s => s !== peptideSlug).map(s => peptides.find(p => p.slug === s)?.name || s).join(", ")}</span>}
                                        </div>
                                        <div className="flex items-center gap-3 mt-1" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)" }}>
                                            {log.dose_mcg && <span>{log.dose_mcg}mcg</span>}
                                            {log.frequency && <span>{log.frequency.replace(/_/g, "/")}</span>}
                                            {log.duration_weeks && <span>{log.duration_weeks}wk</span>}
                                        </div>
                                        {log.outcome_text && <p className="mt-2 text-sm" style={{ color: "var(--ink-dim)", fontFamily: "var(--serif)", fontStyle: "italic" }}>&quot;{log.outcome_text.substring(0, 200)}{log.outcome_text.length > 200 ? "..." : ""}&quot;</p>}
                                    </div>
                                    <div className="flex items-center gap-4 shrink-0">
                                        <div className="text-center"><div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Eff</div><div style={{ fontFamily: "var(--sans)", fontSize: 22, fontWeight: 700, color: "var(--gold)" }}>{log.efficacy_score}</div></div>
                                        <div className="text-center"><div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.12em" }}>SFX</div><div style={{ fontFamily: "var(--sans)", fontSize: 22, fontWeight: 700, color: log.side_effect_score <= 3 ? "var(--green)" : "var(--amber)" }}>{log.side_effect_score}</div></div>
                                    </div>
                                </div>
                                <div className="mt-3 pt-2 flex items-center justify-between border-t" style={{ borderColor: "var(--line)" }}>
                                    <span style={{ fontFamily: "var(--sans)", fontSize: 11, color: "var(--ink-dim)" }}>
                                        {BADGE_ICON[log.profiles?.badge] || "🧪"} {log.profiles?.display_name}
                                        <span className="mx-2 opacity-50">·</span>
                                        <VerificationBadge level={log.verification_level} size="sm" />
                                    </span>
                                    <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: log.would_repeat ? "var(--green)" : "var(--ink-mute)" }}>{log.would_repeat ? "✓ would repeat" : "✗ no repeat"}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
