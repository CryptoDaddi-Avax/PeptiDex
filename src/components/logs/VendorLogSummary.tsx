"use client";

/**
 * VendorLogSummary
 * Embeds on vendor review pages — shows aggregate quality perception
 * across ALL peptides from this vendor, with per-peptide breakdown.
 *
 * < 5 logs: shows CTA.
 */
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface VendorStats {
    log_count: number;
    avg_efficacy: number | null;
    avg_side_effects: number | null;
    repeat_pct: number | null;
}

interface PeptideStat {
    peptide_slug: string;
    log_count: number;
    avg_efficacy: number | null;
    avg_side_effects: number | null;
    repeat_pct: number | null;
}

interface Props {
    vendorSlug: string;
    vendorName: string;
}

export function VendorLogSummary({ vendorSlug, vendorName }: Props) {
    const [stats, setStats] = useState<VendorStats | null>(null);
    const [peptides, setPeptides] = useState<PeptideStat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/protocol-logs/stats?vendor=${vendorSlug}`)
            .then(r => r.json())
            .then(d => {
                setStats(d.stats ?? null);
                setPeptides(d.peptides ?? []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [vendorSlug]);

    if (loading) return (
        <div className="rounded-2xl border border-zinc-800 p-5 animate-pulse" style={{ background: "rgba(20,20,22,0.6)" }}>
            <div className="h-4 bg-zinc-800 rounded w-1/3 mb-3" />
            <div className="h-20 bg-zinc-800/50 rounded" />
        </div>
    );

    const hasData = stats && stats.log_count >= 5;

    return (
        <section className="rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(20,20,22,0.6)" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2.5">
                    <span className="text-lg">📊</span>
                    <span style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>
                        Community Quality Data
                    </span>
                    {stats && (
                        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", background: "rgba(255,255,255,0.05)", padding: "2px 7px", borderRadius: 4 }}>
                            {stats.log_count} verified log{stats.log_count !== 1 ? "s" : ""}
                        </span>
                    )}
                </div>
                <Link href={`/logs?vendor=${vendorSlug}`} style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)", textDecoration: "none" }}>
                    Browse all →
                </Link>
            </div>

            <div className="p-5">
                {!hasData ? (
                    <div className="text-center py-6">
                        <div className="text-3xl mb-3">🔬</div>
                        <p style={{ fontFamily: "var(--serif)", fontSize: 16, color: "var(--ink)", fontWeight: 300 }}>
                            {stats && stats.log_count > 0
                                ? `${stats.log_count} log${stats.log_count > 1 ? "s" : ""} submitted — need 5+ for weighted averages`
                                : `No community logs for ${vendorName} yet`}
                        </p>
                        <p className="mt-1" style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)" }}>
                            Purchased from {vendorName}? Log your protocol to build the dataset.
                        </p>
                        <Link
                            href={`/log-protocol?vendor=${vendorSlug}`}
                            className="inline-block mt-4 px-5 py-2.5 rounded-lg font-semibold transition-all hover:scale-[1.02]"
                            style={{ background: "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)", color: "#0a0a0b", fontFamily: "var(--sans)", fontSize: 13 }}
                        >
                            Log a Protocol →
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Overall stats */}
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

                        {/* Per-peptide breakdown */}
                        {peptides.length > 0 && (
                            <div>
                                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                                    Per Peptide
                                </div>
                                <div className="space-y-1.5">
                                    {peptides.slice(0, 5).map(p => (
                                        <Link
                                            key={p.peptide_slug}
                                            href={`/peptides/${p.peptide_slug}/at/${vendorSlug}`}
                                            className="flex items-center justify-between px-3 py-2 rounded-lg transition-all hover:scale-[1.005]"
                                            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", textDecoration: "none" }}
                                        >
                                            <span style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--ink)", fontWeight: 500 }}>
                                                {p.peptide_slug.replace(/-/g, " ").toUpperCase()}
                                                <span style={{ color: "var(--ink-mute)", fontWeight: 400, fontSize: 11, marginLeft: 6 }}>
                                                    {p.log_count} log{p.log_count !== 1 ? "s" : ""}
                                                </span>
                                            </span>
                                            <div style={{ fontFamily: "var(--mono)", fontSize: 11, display: "flex", gap: 12 }}>
                                                <span style={{ color: "var(--gold)" }}>{p.avg_efficacy ?? "—"}</span>
                                                <span style={{ color: p.avg_side_effects && p.avg_side_effects <= 3 ? "var(--green)" : "var(--amber)" }}>
                                                    SFX {p.avg_side_effects ?? "—"}
                                                </span>
                                                <span style={{ color: "var(--ink-dim)" }}>→</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-4 pt-4 border-t flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                            <span style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--ink-dim)" }}>
                                Weighted: lab-confirmed 3×, verified buyer 2×
                            </span>
                            <Link
                                href={`/log-protocol?vendor=${vendorSlug}`}
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
