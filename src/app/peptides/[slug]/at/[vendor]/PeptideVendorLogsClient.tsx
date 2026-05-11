"use client";

/**
 * PeptideVendorLogsClient — the killer pair surface
 * Aggregated rolling data for a specific (peptide, vendor) combination.
 * This is the most SEO-valuable page on the platform.
 */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { VerificationBadge } from "@/components/logs/VerificationBadge";

interface PairStats {
    log_count: number;
    avg_efficacy: number | null;
    avg_side_effects: number | null;
    repeat_pct: number | null;
    verified_count: number;
    lab_confirmed_count: number;
    most_common_frequency: string | null;
    avg_duration_weeks: number | null;
}

interface LogEntry {
    id: string;
    dose_mcg: number | null;
    frequency: string | null;
    duration_weeks: number | null;
    goal_slug: string | null;
    efficacy_score: number;
    side_effect_score: number;
    would_repeat: boolean;
    outcome_text: string | null;
    side_effects_noted: string[];
    verification_level: string;
    created_at: string;
    profiles: { display_name: string; badge: string } | null;
}

const BADGE_ICON: Record<string, string> = {
    contributor: "🧪",
    verified_buyer: "✅",
    lab_confirmed: "🔬",
};

interface Props {
    peptideSlug: string;
    peptideName: string;
    vendorSlug: string;
    vendorName: string;
    affiliateUrl?: string;
}

export function PeptideVendorLogsClient({ peptideSlug, peptideName, vendorSlug, vendorName, affiliateUrl }: Props) {
    const [stats, setStats] = useState<PairStats | null>(null);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch(`/api/protocol-logs/stats?peptide=${peptideSlug}&vendor=${vendorSlug}`).then(r => r.json()),
            fetch(`/api/protocol-logs/list?peptide=${peptideSlug}&vendor=${vendorSlug}&limit=20&sort=verified`).then(r => r.json()),
        ]).then(([statsData, logsData]) => {
            setStats(statsData.stats ?? null);
            setLogs(logsData.logs ?? []);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [peptideSlug, vendorSlug]);

    const hasData = stats && stats.log_count >= 5;

    return (
        <div className="about-content" style={{ maxWidth: 900 }}>
            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="rounded-xl p-5 animate-pulse" style={{ background: "var(--bg-card)", border: "1px solid var(--line)", height: 80 }} />
                    ))}
                </div>
            ) : !hasData ? (
                /* ── Insufficient data CTA ── */
                <div className="rounded-2xl text-center py-16" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                    <div className="text-5xl mb-4">📊</div>
                    <p style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--ink)", fontWeight: 300 }}>
                        {stats && stats.log_count > 0
                            ? `${stats.log_count} log${stats.log_count > 1 ? "s" : ""} submitted — need 5+ for weighted averages`
                            : `No community data yet for ${peptideName} from ${vendorName}`}
                    </p>
                    <p className="mt-2" style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink-dim)" }}>
                        Purchased {peptideName} from {vendorName}? Be the first to log your protocol.
                    </p>
                    <div className="flex gap-4 justify-center mt-8 flex-wrap">
                        <Link
                            href={`/log-protocol?peptide=${peptideSlug}&vendor=${vendorSlug}`}
                            className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-[1.02]"
                            style={{ background: "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)", color: "#0a0a0b", fontFamily: "var(--sans)", fontSize: 14 }}
                        >
                            Log This Cycle →
                        </Link>
                        {affiliateUrl && (
                            <a
                                href={affiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-[1.02]"
                                style={{ background: "var(--bg-soft)", border: "1px solid var(--line-strong)", color: "var(--ink)", fontFamily: "var(--sans)", fontSize: 14 }}
                            >
                                Buy from {vendorName} →
                            </a>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    {/* ── Aggregate scorecard ── */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: "Protocols", value: String(stats.log_count), color: "var(--ink)" },
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

                    {/* ── Protocol details ── */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                        {[
                            { label: "Verified Buyer logs", value: String(stats.verified_count || 0), color: "var(--green)" },
                            { label: "Lab Confirmed", value: String(stats.lab_confirmed_count || 0), color: "var(--gold)" },
                            { label: "Common Frequency", value: stats.most_common_frequency?.replace(/_/g, "/") || "—", color: "var(--ink)" },
                            { label: "Avg Duration", value: stats.avg_duration_weeks ? `${stats.avg_duration_weeks}wk` : "—", color: "var(--ink)" },
                        ].map(s => (
                            <div key={s.label} className="rounded-lg px-4 py-3" style={{ background: "var(--bg-soft)", border: "1px solid var(--line)" }}>
                                <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
                                <div style={{ fontFamily: "var(--sans)", fontSize: 16, fontWeight: 700, color: s.color, marginTop: 2 }}>{s.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* ── CTA strip ── */}
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                        <div>
                            <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-mute)" }}>
                                {logs.length} individual log{logs.length !== 1 ? "s" : ""} · sorted by verification
                            </span>
                        </div>
                        <div className="flex gap-3">
                            {affiliateUrl && (
                                <a
                                    href={affiliateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02]"
                                    style={{ background: "var(--bg-card)", border: "1px solid var(--line-strong)", color: "var(--ink)", fontFamily: "var(--sans)" }}
                                >
                                    Buy from {vendorName}
                                </a>
                            )}
                            <Link
                                href={`/log-protocol?peptide=${peptideSlug}&vendor=${vendorSlug}`}
                                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02]"
                                style={{ background: "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)", color: "#0a0a0b", fontFamily: "var(--sans)" }}
                            >
                                + Log This Cycle
                            </Link>
                        </div>
                    </div>

                    {/* ── Individual logs ── */}
                    <div className="space-y-3">
                        {logs.map(log => (
                            <Link
                                key={log.id}
                                href={`/logs/entry/${log.id}`}
                                className="block rounded-xl p-5 transition-all hover:scale-[1.005]"
                                style={{ background: "var(--bg-card)", border: "1px solid var(--line)", textDecoration: "none" }}
                            >
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 flex-wrap mb-2">
                                            <VerificationBadge level={log.verification_level} size="sm" />
                                            {log.dose_mcg && <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)" }}>{log.dose_mcg}mcg</span>}
                                            {log.frequency && <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)" }}>{log.frequency.replace(/_/g, "/")}</span>}
                                            {log.duration_weeks && <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)" }}>{log.duration_weeks}wk</span>}
                                        </div>
                                        {log.outcome_text && (
                                            <p style={{ fontFamily: "var(--serif)", fontSize: 14, color: "var(--ink-dim)", fontStyle: "italic", lineHeight: 1.6 }}>
                                                &ldquo;{log.outcome_text.substring(0, 200)}{log.outcome_text.length > 200 ? "..." : ""}&rdquo;
                                            </p>
                                        )}
                                        {log.side_effects_noted?.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {log.side_effects_noted.map(se => (
                                                    <span key={se} style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--amber)", background: "rgba(212,131,42,0.1)", border: "1px solid rgba(212,131,42,0.2)", padding: "2px 6px", borderRadius: 4 }}>
                                                        {se.replace(/_/g, " ")}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="flex items-center gap-3">
                                            <div className="text-center">
                                                <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-mute)", textTransform: "uppercase" }}>Eff</div>
                                                <div style={{ fontFamily: "var(--sans)", fontSize: 24, fontWeight: 700, color: "var(--gold)" }}>{log.efficacy_score}</div>
                                            </div>
                                            <div className="text-center">
                                                <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-mute)", textTransform: "uppercase" }}>SFX</div>
                                                <div style={{ fontFamily: "var(--sans)", fontSize: 24, fontWeight: 700, color: log.side_effect_score <= 3 ? "var(--green)" : "var(--amber)" }}>{log.side_effect_score}</div>
                                            </div>
                                        </div>
                                        <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: log.would_repeat ? "var(--green)" : "var(--ink-mute)", marginTop: 4 }}>
                                            {log.would_repeat ? "✓ repeat" : "✗ no repeat"}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: "var(--line)" }}>
                                    <span style={{ fontFamily: "var(--sans)", fontSize: 11, color: "var(--ink-dim)" }}>
                                        {BADGE_ICON[log.profiles?.badge || "contributor"]} {log.profiles?.display_name || "Anonymous"}
                                    </span>
                                    <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)" }}>
                                        {new Date(log.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* ── Disclaimer ── */}
                    <div className="mt-8 p-4 rounded-xl" style={{ background: "rgba(201,169,97,0.05)", border: "1px solid rgba(201,169,97,0.15)" }}>
                        <p style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", lineHeight: 1.6 }}>
                            ⚠ Community data is weighted by verification level. Lab-confirmed reports carry 3× weight, verified buyer 2×, self-reported 1×.
                            Averages require 5+ logs. This is not medical advice.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
