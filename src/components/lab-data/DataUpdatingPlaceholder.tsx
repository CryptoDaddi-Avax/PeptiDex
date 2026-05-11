"use client";
/**
 * DataUpdatingPlaceholder — shown when COA count < MIN_COA_COUNT.
 * Honest, non-misleading, with a CTA to contribute data.
 */
import React from "react";
import { FlaskConical } from "lucide-react";

interface Props {
    message?: string;
    compact?: boolean;
}

export function DataUpdatingPlaceholder({
    message = "Data updating",
    compact = false,
}: Props) {
    if (compact) {
        return (
            <span style={{
                fontFamily: "var(--mono, monospace)",
                fontSize: 10,
                color: "var(--ink-mute, #555)",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
            }}>
                <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--ink-mute, #555)",
                    animation: "pulse 2s ease-in-out infinite",
                }} />
                {message}
            </span>
        );
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "24px 16px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.02)",
            border: "1px dashed var(--line, #333)",
            textAlign: "center",
        }}>
            <FlaskConical size={20} color="var(--ink-mute, #555)" />
            <span style={{
                fontFamily: "var(--mono, monospace)",
                fontSize: 11,
                color: "var(--ink-mute, #555)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
            }}>
                {message}
            </span>
            <span style={{
                fontFamily: "var(--sans, sans-serif)",
                fontSize: 12,
                color: "var(--ink-mute, #555)",
                maxWidth: 200,
                lineHeight: 1.5,
            }}>
                COA data is collected weekly. Check back after the next crawl cycle.
            </span>
        </div>
    );
}
