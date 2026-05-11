"use client";
/**
 * PuritySparkline — inline SVG sparkline showing purity over time.
 * Renders a thin line chart from an array of {date, purity} points.
 * Zero dependencies (no recharts) — pure SVG for performance.
 */
import React from "react";

interface DataPoint {
    date: string;       // ISO date string
    purity: number;     // 0–100
}

interface Props {
    data: DataPoint[];
    width?: number;
    height?: number;
    color?: string;
    showDots?: boolean;
    labelLatest?: boolean;
}

export function PuritySparkline({
    data,
    width = 120,
    height = 36,
    color = "var(--green, #4ade80)",
    showDots = false,
    labelLatest = true,
}: Props) {
    if (!data || data.length < 2) {
        return (
            <span style={{
                fontFamily: "var(--mono, monospace)",
                fontSize: 10,
                color: "var(--ink-mute, #666)",
                display: "inline-block",
                width,
                height,
                lineHeight: `${height}px`,
                textAlign: "center",
            }}>
                —
            </span>
        );
    }

    const pad = 4;
    const W = width - pad * 2;
    const H = height - pad * 2;

    const purities = data.map((d) => d.purity);
    const minP = Math.min(...purities);
    const maxP = Math.max(...purities);
    const range = maxP - minP || 1;

    const toX = (i: number) => pad + (i / (data.length - 1)) * W;
    const toY = (p: number) => pad + H - ((p - minP) / range) * H;

    const points = data.map((d, i) => `${toX(i)},${toY(d.purity)}`).join(" ");
    const latest = data[data.length - 1];
    const latestX = toX(data.length - 1);
    const latestY = toY(latest.purity);

    // Gradient fill area
    const areaPoints = [
        `${pad},${pad + H}`,
        ...data.map((d, i) => `${toX(i)},${toY(d.purity)}`),
        `${pad + W},${pad + H}`,
    ].join(" ");

    const gradId = `sg-${Math.random().toString(36).slice(2, 8)}`;

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            aria-hidden="true"
            style={{ display: "block", overflow: "visible" }}
        >
            <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.18} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
            </defs>

            {/* Area fill */}
            <polygon points={areaPoints} fill={`url(#${gradId})`} />

            {/* Line */}
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth={1.5}
                strokeLinejoin="round"
                strokeLinecap="round"
            />

            {/* Dots */}
            {showDots && data.map((d, i) => (
                <circle
                    key={i}
                    cx={toX(i)}
                    cy={toY(d.purity)}
                    r={2}
                    fill={color}
                    opacity={0.7}
                />
            ))}

            {/* Latest value dot + label */}
            <circle cx={latestX} cy={latestY} r={3} fill={color} />
            {labelLatest && (
                <text
                    x={latestX + 5}
                    y={latestY + 4}
                    fontSize={9}
                    fontFamily="var(--mono, monospace)"
                    fill={color}
                >
                    {latest.purity.toFixed(1)}%
                </text>
            )}
        </svg>
    );
}
