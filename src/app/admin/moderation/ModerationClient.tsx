"use client";

import React, { useState, useEffect, useCallback } from "react";
import { peptides } from "@/data/peptides";
import { vendors } from "@/data/vendors";
import { VerificationBadge } from "@/components/logs/VerificationBadge";
import Link from "next/link";

interface FlagEntry {
    id: string;
    log_id: string;
    vendor_slug: string;
    reason: string;
    adjudication: string | null;
    created_at: string;
    protocol_logs: {
        id: string;
        peptide_slugs: string[];
        vendor_slug: string;
        efficacy_score: number;
        side_effect_score: number;
        would_repeat: boolean;
        outcome_text: string | null;
        verification_level: string;
        created_at: string;
        profiles: { display_name: string; badge: string };
    };
}

export default function ModerationClient() {
    const [adminKey, setAdminKey] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [flags, setFlags] = useState<FlagEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState<"pending" | "dismissed" | "upheld">("pending");

    const fetchFlags = useCallback(async () => {
        setLoading(true);
        const res = await fetch(`/api/vendor-flags?status=${tab}`, {
            headers: { "x-admin-key": adminKey },
        });
        if (res.ok) {
            const data = await res.json();
            setFlags(data.flags || []);
        }
        setLoading(false);
    }, [adminKey, tab]);

    useEffect(() => { if (authenticated) fetchFlags(); }, [authenticated, tab, fetchFlags]);

    const handleAdjudicate = async (flagId: string, action: "dismissed" | "upheld") => {
        await fetch("/api/vendor-flags/adjudicate", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
            body: JSON.stringify({ flag_id: flagId, action }),
        });
        fetchFlags();
    };

    if (!authenticated) {
        return (
            <div style={{ background: "var(--bg)" }} className="min-h-screen">
                <div className="page-header"><div className="page-header-grid" /><div className="page-header-wrap">
                    <h1 className="page-title">Admin <em>Moderation</em></h1>
                </div></div>
                <div className="about-content" style={{ maxWidth: 500, textAlign: "center" }}>
                    <div className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                        <label style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)" }}>Service Role Key</label>
                        <input type="password" value={adminKey} onChange={e => setAdminKey(e.target.value)}
                            className="mt-2 w-full px-4 py-3 rounded-lg text-sm outline-none"
                            style={{ background: "var(--bg-soft)", border: "1px solid var(--line-strong)", color: "var(--ink)", fontFamily: "var(--mono)" }}
                            placeholder="sb_secret_..." />
                        <button onClick={() => { if (adminKey.startsWith("sb_secret_")) setAuthenticated(true); }}
                            className="mt-4 w-full py-3 rounded-lg font-semibold"
                            style={{ background: "var(--gold)", color: "#0a0a0b", fontFamily: "var(--sans)" }}>
                            Enter Moderation Queue
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const chipStyle = (active: boolean) => ({
        padding: "8px 16px", borderRadius: 8, fontSize: 13, fontFamily: "var(--sans)", fontWeight: 500 as const,
        cursor: "pointer" as const, border: "1px solid",
        borderColor: active ? "var(--gold)" : "var(--line-strong)",
        background: active ? "rgba(201,169,97,0.15)" : "var(--bg-soft)",
        color: active ? "var(--gold)" : "var(--ink-dim)",
    });

    return (
        <div style={{ background: "var(--bg)" }} className="min-h-screen">
            <div className="page-header"><div className="page-header-grid" /><div className="page-header-wrap">
                <nav className="breadcrumb">
                    <Link href="/">Home</Link><span className="sep">/</span>
                    <span className="current">Moderation</span>
                </nav>
                <h1 className="page-title">Moderation <em>Queue</em></h1>
                <p className="page-subtitle">{flags.length} {tab} flag{flags.length !== 1 ? "s" : ""}</p>
            </div></div>

            <div className="about-content" style={{ maxWidth: 960 }}>
                <div className="flex gap-2 mb-8">
                    {(["pending", "dismissed", "upheld"] as const).map(t => (
                        <button key={t} onClick={() => setTab(t)} style={chipStyle(tab === t)}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>

                {loading && <div className="text-center py-12" style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink-mute)" }}>LOADING...</div>}

                {!loading && flags.length === 0 && (
                    <div className="text-center py-16 rounded-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                        <div className="text-4xl mb-4">✅</div>
                        <p style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--ink)", fontWeight: 300 }}>Queue clear</p>
                    </div>
                )}

                {!loading && flags.map(flag => (
                    <div key={flag.id} className="rounded-xl mb-4 overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                        {/* Flag header */}
                        <div className="p-4 border-b" style={{ borderColor: "var(--line)", background: "rgba(212,131,42,0.05)" }}>
                            <div className="flex items-center justify-between">
                                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--amber)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                                    ⚑ FLAG · {vendors.find(v => v.slug === flag.vendor_slug)?.name || flag.vendor_slug}
                                </span>
                                <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)" }}>
                                    {new Date(flag.created_at).toLocaleString()}
                                </span>
                            </div>
                            <p className="mt-2" style={{ fontFamily: "var(--serif)", fontSize: 15, color: "var(--ink-dim)", fontStyle: "italic" }}>
                                &quot;{flag.reason}&quot;
                            </p>
                        </div>

                        {/* Flagged log */}
                        {flag.protocol_logs && (
                            <div className="p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {flag.protocol_logs.peptide_slugs.map(slug => (
                                                <span key={slug} className="px-2 py-0.5 rounded text-xs font-medium"
                                                    style={{ background: "rgba(201,169,97,0.15)", color: "var(--gold)", fontFamily: "var(--sans)" }}>
                                                    {peptides.find(p => p.slug === slug)?.name || slug}
                                                </span>
                                            ))}
                                        </div>
                                        {flag.protocol_logs.outcome_text && (
                                            <p className="mt-2 text-sm" style={{ color: "var(--ink-dim)", fontFamily: "var(--serif)" }}>
                                                &quot;{flag.protocol_logs.outcome_text.substring(0, 300)}&quot;
                                            </p>
                                        )}
                                        <div className="mt-2" style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)" }}>
                                            by {flag.protocol_logs.profiles?.display_name} · <VerificationBadge level={flag.protocol_logs.verification_level} size="sm" />
                                        </div>
                                    </div>
                                    <div className="flex gap-3 shrink-0">
                                        <div className="text-center">
                                            <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-mute)" }}>EFF</div>
                                            <div style={{ fontFamily: "var(--sans)", fontSize: 20, fontWeight: 700, color: "var(--gold)" }}>{flag.protocol_logs.efficacy_score}</div>
                                        </div>
                                        <div className="text-center">
                                            <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-mute)" }}>SFX</div>
                                            <div style={{ fontFamily: "var(--sans)", fontSize: 20, fontWeight: 700, color: flag.protocol_logs.side_effect_score <= 3 ? "var(--green)" : "var(--amber)" }}>{flag.protocol_logs.side_effect_score}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        {tab === "pending" && (
                            <div className="p-4 border-t flex gap-3" style={{ borderColor: "var(--line)" }}>
                                <button onClick={() => handleAdjudicate(flag.id, "dismissed")}
                                    className="px-4 py-2 rounded-lg text-sm font-medium"
                                    style={{ background: "rgba(127,183,126,0.15)", color: "var(--green)", border: "1px solid rgba(127,183,126,0.3)", fontFamily: "var(--sans)" }}>
                                    ✓ Dismiss (keep log)
                                </button>
                                <button onClick={() => handleAdjudicate(flag.id, "upheld")}
                                    className="px-4 py-2 rounded-lg text-sm font-medium"
                                    style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)", fontFamily: "var(--sans)" }}>
                                    ✗ Uphold flag (remove log)
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
