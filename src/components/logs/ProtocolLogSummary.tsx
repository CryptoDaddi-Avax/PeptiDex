"use client";

/**
 * ProtocolLogSummary
 * Embeds on peptide profile pages — shows weighted community aggregate
 * for this peptide across ALL vendors.
 *
 * < 5 logs: shows CTA instead of misleading averages.
 */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { VerificationBadge } from "./VerificationBadge";

interface Stats {
    log_count: number;
    avg_efficacy: number | null;
    avg_side_effects: number | null;
    repeat_pct: number | null;
}

interface VendorStat extends Stats {
    vendor_slug: string;
}

interface RecentOutcome {
    id: string;
    outcome_text: string | null;
    efficacy_score: number;
    verification_level: string;
    created_at: string;
}

interface Props {
    peptideSlug: string;
    peptideName: string;
}

export function ProtocolLogSummary({ peptideSlug, peptideName }: Props) {
    const [stats, setStats] = useState<Stats | null>(null);
    const [vendors, setVendors] = useState<VendorStat[]>([]);
    const [outcomes, setOutcomes] = useState<RecentOutcome[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/protocol-logs/stats?peptide=${peptideSlug}`)
            .then(r => r.json())
            .then(d => {
                setStats(d.stats ?? null);
                setVendors(d.vendors ?? []);
                setLoading(false);
            })
            .catch(() => setLoading(false));

        fetch(`/api/protocol-logs/list?peptide=${peptideSlug}&limit=3&sort=recent`)
            .then(r => r.json())
            .then(d => setOutcomes((d.logs ?? []).filter((l: RecentOutcome) => l.outcome_text)))
            .catch(() => {});
    }, [peptideSlug]);

    if (loading) return (
        <div className="rounded-2xl border border-zinc-800 p-5 animate-pulse" style={{ background: "rgba(20,20,22,0.6)" }}>
            <div className="h-4 bg-zinc-800 rounded w-1/3 mb-3" />
            <div className="h-20 bg-zinc-800/50 rounded" />
        </div>
    );

    const hasData = stats && stats.log_count >= 5;

    return (
        <section className="rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(20,20,22,0.6)" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2.5">
                    <span className="text-lg">🧪</span>
                    <span style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>
                        Community Protocol Data
                    </span>
                    {stats && (
                        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", background: "rgba(255,255,255,0.05)", padding: "2px 7px", borderRadius: 4 }}>
                            {stats.log_count} log{stats.log_count !== 1 ? "s" : ""}
                        </span>
                    )}
                </div>
                <Link href={`/logs/${peptideSlug}`} style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)", textDecoration: "none" }}>
                    View all →
                </Link>
            </div>

            <div className="p-5">
                {!hasData ? (
                    /* Insufficient data CTA */
                    <div className="text-center py-6">
                        <div className="text-3xl mb-3">📋</div>
                        <p style={{ fontFamily: "var(--serif)", fontSize: 16, color: "var(--ink)", fontWeight: 300 }}>
                            {stats && stats.log_count > 0
                                ? `${stats.log_count} log${stats.log_count > 1 ? "s" : ""} submitted — need 5+ for weighted averages`
                                : "No community data yet"}
                        </p>
                        <p className="mt-1" style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)" }}>
                            Be the first to log your {peptideName} protocol.
                        </p>
                        <Link
                            href={`/log-protocol?peptide=${peptideSlug}`}
                            className="inline-block mt-4 px-5 py-2.5 rounded-lg font-semibold transition-all hover:scale-[1.02]"
                            style={{ background: "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)", color: "#0a0a0b", fontFamily: "var(--sans)", fontSize: 13 }}
                        >
                            Log {peptideName} Protocol →
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Aggregate stats */}
                        <div className="grid grid-cols-3 gap-3 mb-5">
                            {[
                                { label: "Avg Efficacy", value: stats.avg_efficacy ? `${stats.avg_efficacy}/10` : "—", color: "var(--gold)" },
                                { label: "Side Effects", value: stats.avg_side_effects ? `${stats.avg_side_effects}/10` : "—", color: stats.avg_side_effects && stats.avg_side_effects <= 3 ? "var(--green)" : "var(--amber)" },
                                { label: "Would Repeat", value: stats.repeat_pct !== null ? `${stats.repeat_pct}%` : "—", color: "var(--green)" },
                            ].map(s => (
                                <div key={s.label} className="text-center rounded-xl py-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                    <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.12em" }}>{s.label}</div>
                                    <div style={{ fontFamily: "var(--sans)", fontSize: 22, fontWeight: 700, color: s.color, marginTop: 2 }}>{s.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Top vendor breakdown (max 3) */}
                        {vendors.length > 0 && (
                            <div className="mb-5">
                                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                                    By Vendor
                                </div>
                                <div className="space-y-2">
                                    {vendors.slice(0, 3).map(v => (
                                        <Link
                                            key={v.vendor_slug}
                                            href={`/peptides/${peptideSlug}/at/${v.vendor_slug}`}
                                            className="flex items-center justify-between px-3 py-2.5 rounded-lg transition-all hover:scale-[1.01]"
                                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", textDecoration: "none" }}
                                        >
                                            <span style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--ink)", fontWeight: 500 }}>
                                                {v.vendor_slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                                                <span style={{ color: "var(--ink-mute)", fontWeight: 400, marginLeft: 6 }}>({v.log_count})</span>
                                            </span>
                                            <div style={{ fontFamily: "var(--mono)", fontSize: 11 }}>
                                                <span style={{ color: "var(--gold)", marginRight: 12 }}>{v.avg_efficacy ?? "—"} eff</span>
                                                <span style={{ color: "var(--green)" }}>{v.repeat_pct !== null ? `${v.repeat_pct}% repeat` : "—"}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recent outcomes */}
                        {outcomes.length > 0 && (
                            <div>
                                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                                    Recent Outcomes
                                </div>
                                <div className="space-y-2">
                                    {outcomes.map(o => (
                                        <Link
                                            key={o.id}
                                            href={`/logs/entry/${o.id}`}
                                            className="block px-3 py-2.5 rounded-lg transition-all hover:scale-[1.005]"
                                            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", textDecoration: "none" }}
                                        >
                                            <p style={{ fontFamily: "var(--serif)", fontSize: 13, color: "var(--ink-dim)", fontStyle: "italic", lineHeight: 1.5 }}>
                                                &ldquo;{o.outcome_text!.substring(0, 120)}{o.outcome_text!.length > 120 ? "..." : ""}&rdquo;
                                            </p>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--gold)" }}>{o.efficacy_score}/10 efficacy</span>
                                                <VerificationBadge level={o.verification_level} size="sm" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="mt-5 pt-4 border-t flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                            <span style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--ink-dim)" }}>
                                Weighted by verification level
                            </span>
                            <Link
                                href={`/log-protocol?peptide=${peptideSlug}`}
                                style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--gold)", fontWeight: 600, textDecoration: "none" }}
                            >
                                + Add your log
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
