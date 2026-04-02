"use client";
import { useMemo } from "react";

interface HalfLifeChartProps {
    halfLifeHours: number;
    name: string;
}

export function HalfLifeChart({ halfLifeHours, name }: HalfLifeChartProps) {
    const points = useMemo(() => {
        const totalTime = halfLifeHours * 5; // show ~5 half-lives
        const steps = 50;
        const pts: { x: number; y: number }[] = [];
        for (let i = 0; i <= steps; i++) {
            const t = (i / steps) * totalTime;
            const conc = 100 * Math.exp(-0.693 * t / halfLifeHours);
            pts.push({ x: i / steps, y: conc / 100 });
        }
        return pts;
    }, [halfLifeHours]);

    const pathD = useMemo(() => {
        const w = 280, h = 100;
        return points.map((p, i) => {
            const x = p.x * w + 40;
            const y = (1 - p.y) * h + 10;
            return `${i === 0 ? "M" : "L"}${x},${y}`;
        }).join(" ");
    }, [points]);

    const areaD = useMemo(() => {
        const w = 280, h = 100;
        const line = points.map((p, i) => {
            const x = p.x * w + 40;
            const y = (1 - p.y) * h + 10;
            return `${i === 0 ? "M" : "L"}${x},${y}`;
        }).join(" ");
        return `${line} L320,110 L40,110 Z`;
    }, [points]);

    const timeLabel = halfLifeHours >= 24 ? `${Math.round(halfLifeHours / 24)}d` : halfLifeHours >= 1 ? `${halfLifeHours}h` : `${Math.round(halfLifeHours * 60)}min`;

    return (
        <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4">
            <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-zinc-200">⏱️ Half-Life: {timeLabel}</h4>
                <span className="text-[10px] text-zinc-500">Plasma concentration over time</span>
            </div>
            <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 150 }}>
                <defs>
                    <linearGradient id={`grad-${name}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* Grid lines */}
                <line x1="40" y1="10" x2="40" y2="110" stroke="rgb(63,63,70)" strokeWidth="0.5" />
                <line x1="40" y1="110" x2="320" y2="110" stroke="rgb(63,63,70)" strokeWidth="0.5" />
                <line x1="40" y1="60" x2="320" y2="60" stroke="rgb(63,63,70)" strokeWidth="0.3" strokeDasharray="4,4" />
                {/* Labels */}
                <text x="35" y="15" textAnchor="end" fill="rgb(113,113,122)" fontSize="8">100%</text>
                <text x="35" y="63" textAnchor="end" fill="rgb(113,113,122)" fontSize="8">50%</text>
                <text x="35" y="113" textAnchor="end" fill="rgb(113,113,122)" fontSize="8">0%</text>
                <text x="40" y="125" textAnchor="start" fill="rgb(113,113,122)" fontSize="8">0</text>
                <text x="180" y="125" textAnchor="middle" fill="rgb(113,113,122)" fontSize="8">t½ = {timeLabel}</text>
                {/* Area fill */}
                <path d={areaD} fill={`url(#grad-${name})`} />
                {/* Line */}
                <path d={pathD} fill="none" stroke="rgb(139, 92, 246)" strokeWidth="2" strokeLinecap="round" />
                {/* Half-life marker */}
                <line x1={40 + 280 * 0.2} y1="10" x2={40 + 280 * 0.2} y2="110" stroke="rgb(139, 92, 246)" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.5" />
            </svg>
        </div>
    );
}
