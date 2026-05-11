"use client";

import React from "react";

interface VerificationBadgeProps {
    level: string;
    size?: "sm" | "md";
}

const BADGES: Record<string, { label: string; color: string; icon: string }> = {
    lab_confirmed: { label: "Lab Confirmed", color: "#c9a961", icon: "🔬" },
    verified_buyer: { label: "Verified Buyer", color: "#7fb77e", icon: "✅" },
    self_reported: { label: "Self-Reported", color: "#5a564f", icon: "📝" },
};

export function VerificationBadge({ level, size = "sm" }: VerificationBadgeProps) {
    const badge = BADGES[level] || BADGES.self_reported;
    const fontSize = size === "sm" ? 10 : 12;
    const padding = size === "sm" ? "3px 8px" : "4px 12px";

    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding,
                borderRadius: 6,
                fontSize,
                fontFamily: "var(--mono)",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                background: `${badge.color}15`,
                color: badge.color,
                border: `1px solid ${badge.color}30`,
                whiteSpace: "nowrap",
            }}
        >
            <span style={{ fontSize: fontSize + 2 }}>{badge.icon}</span>
            {badge.label}
        </span>
    );
}
