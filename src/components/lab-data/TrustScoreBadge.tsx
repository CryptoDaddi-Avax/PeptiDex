"use client";

/**
 * TrustScoreBadge — displays a vendor's composite trust score
 * with tooltip breakdown of the 4 components.
 */
import React, { useState } from "react";

interface Props {
    score: number;
    breakdown?: {
        purityConsistency: number;
        coaRecency: number;
        labCredibility: number;
        catalogCoverage: number;
    };
    size?: "sm" | "md" | "lg";
}

function scoreColor(score: number): string {
    if (score >= 80) return "var(--green)";
    if (score >= 60) return "var(--gold)";
    if (score >= 40) return "var(--amber)";
    return "var(--ink-dim)";
}

function scoreLabel(score: number): string {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Strong";
    if (score >= 55) return "Good";
    if (score >= 40) return "Fair";
    return "Limited Data";
}

export function TrustScoreBadge({ score, breakdown, size = "md" }: Props) {
    const [showTooltip, setShowTooltip] = useState(false);
    const color = scoreColor(score);
    const label = scoreLabel(score);

    const fontSize = size === "sm" ? 11 : size === "lg" ? 16 : 13;
    const scoreFontSize = size === "sm" ? 14 : size === "lg" ? 24 : 18;

    return (
        <div
            className="relative inline-flex items-center gap-1.5"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{ cursor: "default" }}
        >
            <div
                className="flex items-center gap-1.5 px-2 py-1 rounded-md"
                style={{
                    background: `color-mix(in srgb, ${color} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
                }}
            >
                <span style={{ fontFamily: "var(--sans)", fontSize: scoreFontSize, fontWeight: 700, color }}>
                    {Math.round(score)}
                </span>
                <div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: fontSize - 3, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.08em", lineHeight: 1 }}>
                        Trust
                    </div>
                    <div style={{ fontFamily: "var(--sans)", fontSize: fontSize - 2, color, fontWeight: 600, lineHeight: 1.2 }}>
                        {label}
                    </div>
                </div>
            </div>

            {/* Tooltip */}
            {showTooltip && breakdown && (
                <div
                    className="absolute bottom-full left-1/2 mb-2 p-3 rounded-xl z-50"
                    style={{
                        transform: "translateX(-50%)",
                        width: 220,
                        background: "var(--bg-card)",
                        border: "1px solid var(--line-strong)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    }}
                >
                    <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                        Score Breakdown
                    </div>
                    {[
                        { label: "Purity Consistency", value: breakdown.purityConsistency, max: 25 },
                        { label: "COA Recency", value: breakdown.coaRecency, max: 25 },
                        { label: "Lab Credibility", value: breakdown.labCredibility, max: 25 },
                        { label: "Catalog Coverage", value: breakdown.catalogCoverage, max: 25 },
                    ].map(item => (
                        <div key={item.label} className="mb-2">
                            <div className="flex justify-between" style={{ fontFamily: "var(--sans)", fontSize: 11, color: "var(--ink-dim)" }}>
                                <span>{item.label}</span>
                                <span style={{ color: scoreColor(item.value * 4), fontWeight: 600 }}>{item.value}/25</span>
                            </div>
                            <div style={{ height: 3, background: "var(--line)", borderRadius: 2, marginTop: 2 }}>
                                <div style={{ height: "100%", width: `${(item.value / item.max) * 100}%`, background: scoreColor(item.value * 4), borderRadius: 2 }} />
                            </div>
                        </div>
                    ))}
                    <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-mute)", marginTop: 6 }}>
                        <a href="/about/lab-data-methodology" style={{ color: "var(--gold)", textDecoration: "none" }}>
                            Full methodology →
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
