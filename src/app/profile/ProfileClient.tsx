"use client";

/**
 * ProfileClient — user profile page for Verified Protocol Logs.
 * Shows user's logs, badges, editable display name + country.
 */
import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { AuthModal } from "@/components/auth/AuthModal";
import { createClient } from "@/lib/supabase";
import { VerificationBadge } from "@/components/logs/VerificationBadge";
import Link from "next/link";

const BADGE_CONFIG = {
    contributor: { label: "Contributor", icon: "🧪", color: "var(--ink-dim)" },
    verified_buyer: { label: "Verified Buyer", icon: "✅", color: "var(--green)" },
    lab_confirmed: { label: "Lab Confirmed", icon: "🏆", color: "var(--gold)" },
};

interface ProtocolLog {
    id: string;
    peptide_slugs: string[];
    vendor_slug: string;
    dose_mcg: number | null;
    frequency: string | null;
    duration_weeks: number | null;
    efficacy_score: number;
    side_effect_score: number;
    would_repeat: boolean;
    verification_level: string;
    status: string;
    created_at: string;
}

export default function ProfileClient() {
    const { user, profile, loading, signOut, refreshProfile } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [logs, setLogs] = useState<ProtocolLog[]>([]);
    const [editingName, setEditingName] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [saving, setSaving] = useState(false);

    const supabase = createClient();

    // Fetch user's logs
    useEffect(() => {
        if (!user) return;

        async function fetchLogs() {
            const { data } = await supabase
                .from("protocol_logs")
                .select("*")
                .eq("user_id", user!.id)
                .order("created_at", { ascending: false });

            if (data) setLogs(data as ProtocolLog[]);
        }

        fetchLogs();
    }, [user, supabase]);

    // Sync profile fields
    useEffect(() => {
        if (profile) {
            setDisplayName(profile.display_name);
            setCountryCode(profile.country_code || "");
        }
    }, [profile]);

    const handleSaveProfile = async () => {
        if (!user) return;
        setSaving(true);

        await supabase
            .from("profiles")
            .update({
                display_name: displayName.trim() || profile?.display_name,
                country_code: countryCode || null,
            })
            .eq("id", user.id);

        await refreshProfile();
        setEditingName(false);
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink-mute)", letterSpacing: "0.15em" }}>
                    LOADING...
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <>
                <div style={{ background: "var(--bg)" }}>
                    <div className="page-header">
                        <div className="page-header-grid" />
                        <div className="page-header-wrap">
                            <nav className="breadcrumb">
                                <Link href="/">Home</Link>
                                <span className="sep">/</span>
                                <span className="current">Profile</span>
                            </nav>
                            <h1 className="page-title">Your <em>Research</em> Profile</h1>
                            <p className="page-subtitle">
                                Sign in to log protocols, earn badges, and contribute to the peptide research community.
                            </p>
                        </div>
                    </div>

                    <div className="about-content" style={{ textAlign: "center", paddingTop: 60 }}>
                        <button
                            onClick={() => setShowAuthModal(true)}
                            className="inline-block py-4 px-8 rounded-lg font-semibold text-lg transition-all hover:scale-[1.02]"
                            style={{
                                background: "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)",
                                color: "#0a0a0b",
                                fontFamily: "var(--sans)",
                            }}
                        >
                            Sign In or Create Account
                        </button>
                        <p className="mt-4" style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink-dim)" }}>
                            Anonymous accounts available — no email required.
                        </p>
                    </div>
                </div>

                <AuthModal
                    isOpen={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                    context="access your profile"
                />
            </>
        );
    }

    const badgeInfo = BADGE_CONFIG[profile?.badge || "contributor"];

    return (
        <div style={{ background: "var(--bg)" }}>
            {/* Header */}
            <div className="page-header">
                <div className="page-header-grid" />
                <div className="page-header-wrap">
                    <nav className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span className="sep">/</span>
                        <span className="current">Profile</span>
                    </nav>
                    <h1 className="page-title">
                        <em>{profile?.display_name || "Researcher"}</em>
                    </h1>
                    <div className="flex items-center gap-3 mt-4">
                        <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
                            style={{
                                background: "rgba(201,169,97,0.1)",
                                border: `1px solid ${badgeInfo.color}`,
                                color: badgeInfo.color,
                                fontFamily: "var(--sans)",
                            }}
                        >
                            {badgeInfo.icon} {badgeInfo.label}
                        </span>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-mute)" }}>
                            {profile?.log_count || 0} protocol{(profile?.log_count || 0) !== 1 ? "s" : ""} logged
                        </span>
                    </div>
                </div>
            </div>

            <div className="about-content">
                {/* Profile Settings */}
                <section>
                    <h2><em>Profile</em> Settings</h2>
                    <div
                        className="rounded-xl p-6 mt-4"
                        style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
                    >
                        {/* Display Name */}
                        <div className="mb-4">
                            <label style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)", fontWeight: 500 }}>
                                Display Name (pseudonym)
                            </label>
                            {editingName ? (
                                <div className="flex gap-2 mt-1">
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        maxLength={30}
                                        className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                                        style={{
                                            background: "var(--bg-soft)",
                                            border: "1px solid var(--line-strong)",
                                            color: "var(--ink)",
                                            fontFamily: "var(--sans)",
                                        }}
                                    />
                                    <button
                                        onClick={handleSaveProfile}
                                        disabled={saving}
                                        className="px-4 py-2 rounded-lg text-sm font-medium"
                                        style={{ background: "var(--gold)", color: "#0a0a0b", fontFamily: "var(--sans)" }}
                                    >
                                        {saving ? "..." : "Save"}
                                    </button>
                                    <button
                                        onClick={() => { setEditingName(false); setDisplayName(profile?.display_name || ""); }}
                                        className="px-3 py-2 rounded-lg text-sm"
                                        style={{ color: "var(--ink-dim)", fontFamily: "var(--sans)" }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 mt-1">
                                    <span style={{ fontFamily: "var(--mono)", fontSize: 15, color: "var(--ink)" }}>
                                        {profile?.display_name}
                                    </span>
                                    <button
                                        onClick={() => setEditingName(true)}
                                        className="text-xs px-2 py-1 rounded transition-opacity hover:opacity-80"
                                        style={{ color: "var(--gold)", fontFamily: "var(--sans)" }}
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Country */}
                        <div className="mb-4">
                            <label style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)", fontWeight: 500 }}>
                                Country (optional, only country code displayed)
                            </label>
                            <input
                                type="text"
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value.toUpperCase().slice(0, 2))}
                                placeholder="US"
                                maxLength={2}
                                className="mt-1 w-20 px-3 py-2 rounded-lg text-sm outline-none"
                                style={{
                                    background: "var(--bg-soft)",
                                    border: "1px solid var(--line-strong)",
                                    color: "var(--ink)",
                                    fontFamily: "var(--mono)",
                                }}
                                onBlur={handleSaveProfile}
                            />
                        </div>

                        {/* Auth info */}
                        <div className="pt-4 border-t" style={{ borderColor: "var(--line)" }}>
                            <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)" }}>
                                ID: {user.id.substring(0, 8)}... ·{" "}
                                {user.is_anonymous ? "Anonymous session" : user.email} ·{" "}
                                <button
                                    onClick={signOut}
                                    className="underline hover:opacity-80 transition-opacity"
                                    style={{ color: "var(--ink-mute)" }}
                                >
                                    Sign out
                                </button>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Protocol Logs */}
                <section>
                    <h2>Your Protocol <em>Logs</em></h2>

                    {logs.length === 0 ? (
                        <div
                            className="rounded-xl p-8 mt-4 text-center"
                            style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
                        >
                            <div className="text-4xl mb-4">📋</div>
                            <p style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)", fontWeight: 300 }}>
                                No protocols logged yet
                            </p>
                            <p className="mt-2" style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink-dim)" }}>
                                Run a peptide protocol? Share your outcome with the research community.
                            </p>
                            <Link
                                href="/log-protocol"
                                className="inline-block mt-4 py-3 px-6 rounded-lg font-semibold transition-all hover:scale-[1.02]"
                                style={{
                                    background: "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)",
                                    color: "#0a0a0b",
                                    fontFamily: "var(--sans)",
                                    fontSize: 14,
                                }}
                            >
                                Log Your First Protocol →
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3 mt-4">
                            {logs.map((log) => (
                                <div
                                    key={log.id}
                                    className="rounded-xl p-5 transition-all hover:scale-[1.005]"
                                    style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {log.peptide_slugs.map((slug) => (
                                                    <span
                                                        key={slug}
                                                        className="px-2 py-0.5 rounded text-xs font-medium"
                                                        style={{
                                                            background: "rgba(201,169,97,0.15)",
                                                            color: "var(--gold)",
                                                            fontFamily: "var(--sans)",
                                                        }}
                                                    >
                                                        {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                                                    </span>
                                                ))}
                                                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)" }}>
                                                    via {log.vendor_slug.replace(/-/g, " ")}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 mt-2" style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)" }}>
                                                {log.dose_mcg && <span>{log.dose_mcg}mcg</span>}
                                                {log.frequency && <span>{log.frequency}</span>}
                                                {log.duration_weeks && <span>{log.duration_weeks}wk</span>}
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                                        Efficacy
                                                    </div>
                                                    <div style={{ fontFamily: "var(--sans)", fontSize: 20, fontWeight: 700, color: "var(--gold)" }}>
                                                        {log.efficacy_score}/10
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                                        Side FX
                                                    </div>
                                                    <div style={{ fontFamily: "var(--sans)", fontSize: 20, fontWeight: 700, color: log.side_effect_score <= 3 ? "var(--green)" : "var(--amber)" }}>
                                                        {log.side_effect_score}/10
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-1" style={{ fontFamily: "var(--mono)", fontSize: 10, color: log.would_repeat ? "var(--green)" : "var(--ink-mute)" }}>
                                                {log.would_repeat ? "✓ Would repeat" : "✗ Would not repeat"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 pt-3 flex items-center justify-between border-t" style={{ borderColor: "var(--line)" }}>
                                        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)" }}>
                                            {new Date(log.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                        </span>
                                        <VerificationBadge level={log.verification_level} size="sm" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
