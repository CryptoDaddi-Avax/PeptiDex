"use client";

/**
 * SmartVendorPicker
 * =================
 * 4-step modal wizard. Runs entirely client-side with zero API calls.
 * Pure scoring logic lives in src/lib/vendor-picker-engine.ts.
 *
 * Placements:
 *  - Floating CTA on peptide pages (mode="float")
 *  - Embedded in cycle planner output (mode="inline")
 *  - Standalone /tools/vendor-picker page (mode="page")
 */
import React, { useState, useRef, useEffect } from "react";
import { peptides } from "@/data/peptides";
import { rankVendors, PickerInput, VendorRecommendation, Region, Payment, Priority } from "@/lib/vendor-picker-engine";

// ── Types ────────────────────────────────────────────────────────────────────

export type PickerMode = "float" | "inline" | "page";

interface Props {
    mode: PickerMode;
    /** Pre-seed the peptide (e.g. from peptide page context) */
    initialPeptideSlug?: string;
}

// ── Step labels ───────────────────────────────────────────────────────────────

const STEP_LABELS = ["Peptide", "Region", "Payment", "Priority"];

const REGIONS: { value: Region; label: string; icon: string; desc: string }[] = [
    { value: "us-only", label: "US Only", icon: "🇺🇸", desc: "Ships within the United States" },
    { value: "international", label: "International", icon: "🌍", desc: "Ships outside the US" },
];

const PAYMENTS: { value: Payment; label: string; icon: string }[] = [
    { value: "credit-card", label: "Credit Card", icon: "💳" },
    { value: "crypto", label: "Crypto", icon: "₿" },
    { value: "either", label: "Either", icon: "✓" },
];

const PRIORITIES: { value: Priority; label: string; icon: string; desc: string }[] = [
    { value: "cheapest", label: "Cheapest Price", icon: "💰", desc: "Lowest cost after discount codes" },
    { value: "fastest-shipping", label: "Fastest Shipping", icon: "⚡", desc: "Gets here soonest" },
    { value: "highest-purity", label: "Highest Purity", icon: "🔬", desc: "Most rigorous testing methods" },
    { value: "best-coa", label: "Best COA Docs", icon: "📋", desc: "Best Certificate of Analysis documentation" },
];

// ── Peptide selector data ─────────────────────────────────────────────────────

const ALL_PEPTIDES = peptides.map(p => ({ slug: p.slug, name: p.name })).sort((a, b) => a.name.localeCompare(b.name));

// ── Main Component ────────────────────────────────────────────────────────────

export function SmartVendorPicker({ mode, initialPeptideSlug }: Props) {
    const [isOpen, setIsOpen] = useState(mode !== "float");
    const [step, setStep] = useState(initialPeptideSlug ? 1 : 0);
    const [peptideSlug, setPeptideSlug] = useState(initialPeptideSlug || "");
    const [peptideName, setPeptideName] = useState(
        initialPeptideSlug ? ALL_PEPTIDES.find(p => p.slug === initialPeptideSlug)?.name || "" : ""
    );
    const [search, setSearch] = useState("");
    const [region, setRegion] = useState<Region | "">("");
    const [payment, setPayment] = useState<Payment | "">("");
    const [priority, setPriority] = useState<Priority | "">("");
    const [results, setResults] = useState<VendorRecommendation[] | null>(null);
    const [showRunnerUp, setShowRunnerUp] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on outside click (float mode only)
    useEffect(() => {
        if (mode !== "float") return;
        function handleClick(e: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [isOpen, mode]);

    function handleReset() {
        setStep(initialPeptideSlug ? 1 : 0);
        setPeptideSlug(initialPeptideSlug || "");
        setPeptideName(initialPeptideSlug ? ALL_PEPTIDES.find(p => p.slug === initialPeptideSlug)?.name || "" : "");
        setSearch("");
        setRegion("");
        setPayment("");
        setPriority("");
        setResults(null);
        setShowRunnerUp(false);
    }

    function handleSubmit() {
        if (!peptideSlug || !region || !payment || !priority) return;
        const ranked = rankVendors({
            peptideSlug,
            peptideName,
            region: region as Region,
            payment: payment as Payment,
            priority: priority as Priority,
        });
        setResults(ranked);
        setStep(4);
    }

    const filteredPeptides = ALL_PEPTIDES.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    // ── Render ─────────────────────────────────────────────────────────────

    if (mode === "float" && !isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full font-semibold shadow-2xl transition-all hover:scale-105"
                style={{
                    background: "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)",
                    color: "#0a0a0b",
                    fontFamily: "var(--sans)",
                    fontSize: 14,
                    boxShadow: "0 8px 32px rgba(201,169,97,0.35)",
                }}
            >
                <span>🔍</span>
                Find my vendor →
            </button>
        );
    }

    const containerStyle: React.CSSProperties = mode === "float"
        ? {
            position: "fixed",
            bottom: 80,
            right: 24,
            zIndex: 9999,
            width: 440,
            maxWidth: "calc(100vw - 48px)",
            borderRadius: 20,
            boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            background: "var(--bg-card)",
            border: "1px solid var(--line-strong)",
        }
        : {
            width: "100%",
            borderRadius: 16,
            background: "var(--bg-card)",
            border: "1px solid var(--line)",
        };

    return (
        <div ref={modalRef} style={containerStyle}>
            {/* Header */}
            <div
                className="flex items-center justify-between px-5 py-4 border-b"
                style={{ borderColor: "var(--line)" }}
            >
                <div>
                    <div style={{ fontFamily: "var(--sans)", fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>
                        🔍 Vendor Finder
                    </div>
                    {step < 4 && (
                        <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", marginTop: 2 }}>
                            Step {step + 1} of 4 — {STEP_LABELS[step]}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {step > 0 && step < 4 && (
                        <button
                            onClick={() => setStep(s => s - 1)}
                            style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-dim)", background: "none", border: "none", cursor: "pointer", padding: "4px 8px" }}
                        >
                            ← Back
                        </button>
                    )}
                    {mode === "float" && (
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{ fontFamily: "var(--mono)", fontSize: 14, color: "var(--ink-mute)", background: "none", border: "none", cursor: "pointer", width: 28, height: 28 }}
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Progress bar */}
            {step < 4 && (
                <div style={{ height: 2, background: "var(--line)" }}>
                    <div
                        style={{
                            height: "100%",
                            width: `${((step + 1) / 4) * 100}%`,
                            background: "linear-gradient(90deg, var(--gold), var(--amber))",
                            transition: "width 0.3s ease",
                        }}
                    />
                </div>
            )}

            <div className="p-5">

                {/* ── STEP 0: Peptide ── */}
                {step === 0 && (
                    <div>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)", marginBottom: 12 }}>
                            Which peptide are you sourcing?
                        </p>
                        <input
                            type="text"
                            placeholder={`Search ${peptides.length}+ peptides...`}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            autoFocus
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                borderRadius: 8,
                                border: "1px solid var(--line-strong)",
                                background: "var(--bg-soft)",
                                color: "var(--ink)",
                                fontFamily: "var(--mono)",
                                fontSize: 13,
                                outline: "none",
                                marginBottom: 8,
                                boxSizing: "border-box",
                            }}
                        />
                        <div style={{ maxHeight: 240, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
                            {filteredPeptides.map(p => (
                                <button
                                    key={p.slug}
                                    onClick={() => {
                                        setPeptideSlug(p.slug);
                                        setPeptideName(p.name);
                                        setStep(1);
                                    }}
                                    style={{
                                        textAlign: "left",
                                        padding: "8px 12px",
                                        borderRadius: 8,
                                        border: peptideSlug === p.slug ? "1px solid var(--gold)" : "1px solid transparent",
                                        background: peptideSlug === p.slug ? "rgba(201,169,97,0.1)" : "transparent",
                                        color: peptideSlug === p.slug ? "var(--gold)" : "var(--ink)",
                                        fontFamily: "var(--sans)",
                                        fontSize: 13,
                                        cursor: "pointer",
                                        fontWeight: peptideSlug === p.slug ? 600 : 400,
                                    }}
                                >
                                    {p.name}
                                </button>
                            ))}
                            {filteredPeptides.length === 0 && (
                                <p style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-mute)", padding: "12px" }}>
                                    No matches. Try a shorter search term.
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* ── STEP 1: Region ── */}
                {step === 1 && (
                    <div>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)", marginBottom: 16 }}>
                            Where are you located?
                        </p>
                        <div className="space-y-3">
                            {REGIONS.map(r => (
                                <button
                                    key={r.value}
                                    onClick={() => { setRegion(r.value); setStep(2); }}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                        padding: "14px 16px",
                                        borderRadius: 12,
                                        border: region === r.value ? "2px solid var(--gold)" : "1px solid var(--line-strong)",
                                        background: region === r.value ? "rgba(201,169,97,0.08)" : "var(--bg-soft)",
                                        cursor: "pointer",
                                        textAlign: "left",
                                    }}
                                >
                                    <span style={{ fontSize: 24 }}>{r.icon}</span>
                                    <div>
                                        <div style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{r.label}</div>
                                        <div style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--ink-dim)" }}>{r.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── STEP 2: Payment ── */}
                {step === 2 && (
                    <div>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)", marginBottom: 16 }}>
                            Payment preference?
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                            {PAYMENTS.map(p => (
                                <button
                                    key={p.value}
                                    onClick={() => { setPayment(p.value); setStep(3); }}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 6,
                                        padding: "16px 8px",
                                        borderRadius: 12,
                                        border: payment === p.value ? "2px solid var(--gold)" : "1px solid var(--line-strong)",
                                        background: payment === p.value ? "rgba(201,169,97,0.08)" : "var(--bg-soft)",
                                        cursor: "pointer",
                                    }}
                                >
                                    <span style={{ fontSize: 22 }}>{p.icon}</span>
                                    <span style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{p.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── STEP 3: Priority ── */}
                {step === 3 && (
                    <div>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)", marginBottom: 16 }}>
                            What matters most to you?
                        </p>
                        <div className="space-y-2">
                            {PRIORITIES.map(p => (
                                <button
                                    key={p.value}
                                    onClick={() => {
                                        setPriority(p.value);
                                        // Auto-submit on selection
                                        const ranked = rankVendors({
                                            peptideSlug,
                                            peptideName,
                                            region: region as Region,
                                            payment: payment as Payment,
                                            priority: p.value,
                                        });
                                        setResults(ranked);
                                        setStep(4);
                                    }}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                        padding: "12px 14px",
                                        borderRadius: 10,
                                        border: "1px solid var(--line-strong)",
                                        background: "var(--bg-soft)",
                                        cursor: "pointer",
                                        textAlign: "left",
                                    }}
                                >
                                    <span style={{ fontSize: 20, flexShrink: 0 }}>{p.icon}</span>
                                    <div>
                                        <div style={{ fontFamily: "var(--sans)", fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{p.label}</div>
                                        <div style={{ fontFamily: "var(--sans)", fontSize: 11, color: "var(--ink-dim)" }}>{p.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── STEP 4: Result ── */}
                {step === 4 && results !== null && (
                    <div>
                        {results.length === 0 ? (
                            <div className="text-center py-6">
                                <div className="text-3xl mb-3">😕</div>
                                <p style={{ fontFamily: "var(--serif)", fontSize: 15, color: "var(--ink)", fontWeight: 300 }}>
                                    No vendors match all your requirements.
                                </p>
                                <p style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)", marginTop: 8 }}>
                                    Try changing your region or payment preference.
                                </p>
                                <button onClick={handleReset} style={linkStyle}>← Start over</button>
                            </div>
                        ) : (
                            <>
                                <VendorResultCard rec={results[0]} isPrimary />

                                {/* Runner-up */}
                                {results.length > 1 && !showRunnerUp && (
                                    <button
                                        onClick={() => setShowRunnerUp(true)}
                                        style={{ ...linkStyle, display: "block", marginTop: 16, textAlign: "center", width: "100%" }}
                                    >
                                        Show me the runner-up →
                                    </button>
                                )}

                                {showRunnerUp && results.length > 1 && (
                                    <div className="mt-4">
                                        <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                                            Runner-up
                                        </div>
                                        <VendorResultCard rec={results[1]} isPrimary={false} />
                                    </div>
                                )}

                                <div className="flex items-center justify-between mt-5 pt-4 border-t" style={{ borderColor: "var(--line)" }}>
                                    <button onClick={handleReset} style={linkStyle}>← Start over</button>
                                    <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)" }}>
                                        {peptideName} · {region} · {priority.replace(/-/g, " ")}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// ── Vendor Result Card ────────────────────────────────────────────────────────

function VendorResultCard({ rec, isPrimary }: { rec: VendorRecommendation; isPrimary: boolean }) {
    return (
        <div
            style={{
                borderRadius: 14,
                border: isPrimary ? "1px solid var(--gold)" : "1px solid var(--line)",
                background: isPrimary ? "rgba(201,169,97,0.05)" : "var(--bg-soft)",
                overflow: "hidden",
            }}
        >
            {/* Vendor header */}
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: isPrimary ? "rgba(201,169,97,0.2)" : "var(--line)" }}>
                <div>
                    <div style={{ fontFamily: "var(--sans)", fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>
                        {isPrimary && <span style={{ color: "var(--gold)", marginRight: 6 }}>★</span>}
                        {rec.vendor.name}
                    </div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)" }}>
                        {rec.vendor.badge}
                    </div>
                </div>
                {rec.price !== null && (
                    <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "var(--sans)", fontSize: 22, fontWeight: 700, color: "var(--gold)" }}>
                            ${rec.price.toFixed(2)}
                        </div>
                        {rec.priceRaw && rec.priceRaw !== rec.price && (
                            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", textDecoration: "line-through" }}>
                                ${rec.priceRaw.toFixed(2)}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Reasoning */}
            <div className="px-4 py-3">
                <p style={{ fontFamily: "var(--serif)", fontSize: 13, color: "var(--ink-dim)", fontStyle: "italic", lineHeight: 1.5, marginBottom: 10 }}>
                    {rec.reasoning}
                </p>

                {/* Bullets */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                    {rec.bullets.filter(Boolean).map((b, i) => (
                        <li key={i} style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--ink-dim)", display: "flex", gap: 6 }}>
                            <span style={{ color: "var(--green)" }}>✓</span>
                            <span>{b}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <a
                    href={rec.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        marginTop: 14,
                        padding: "11px 16px",
                        borderRadius: 10,
                        fontFamily: "var(--sans)",
                        fontSize: 13,
                        fontWeight: 700,
                        textDecoration: "none",
                        background: isPrimary
                            ? "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)"
                            : "var(--bg-card)",
                        color: isPrimary ? "#0a0a0b" : "var(--ink)",
                        border: isPrimary ? "none" : "1px solid var(--line-strong)",
                        transition: "opacity 0.15s",
                    }}
                >
                    {isPrimary ? `Shop ${rec.vendor.name} →` : `View ${rec.vendor.name} →`}
                    {rec.vendor.discountCode && (
                        <span style={{
                            fontSize: 10,
                            padding: "2px 6px",
                            borderRadius: 4,
                            background: "rgba(0,0,0,0.15)",
                        }}>
                            {rec.vendor.discountCode}
                        </span>
                    )}
                </a>
            </div>
        </div>
    );
}

const linkStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--mono)",
    fontSize: 12,
    color: "var(--gold)",
    padding: 0,
    textDecoration: "underline",
};
