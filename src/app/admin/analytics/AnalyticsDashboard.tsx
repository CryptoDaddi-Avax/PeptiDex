"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  MousePointerClick,
  Users,
  ShoppingCart,
  Zap,
  Activity,
  Award,
  ArrowUpRight,
} from "lucide-react";
import type { AnalyticsSummary } from "@/lib/analytics/affiliate-stats";

interface Props {
  summary: AnalyticsSummary | null;
  error: string | null;
  days: number;
}

function DeltaBadge({ pct }: { pct: number | null }) {
  if (pct === null) return <span className="text-zinc-500 text-xs">N/A</span>;
  if (pct > 0)
    return (
      <span className="flex items-center gap-0.5 text-emerald-400 text-xs font-medium">
        <TrendingUp className="w-3 h-3" />+{pct}%
      </span>
    );
  if (pct < 0)
    return (
      <span className="flex items-center gap-0.5 text-red-400 text-xs font-medium">
        <TrendingDown className="w-3 h-3" />
        {pct}%
      </span>
    );
  return (
    <span className="flex items-center gap-0.5 text-zinc-400 text-xs">
      <Minus className="w-3 h-3" />
      0%
    </span>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  accent = "gold",
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  delta?: number | null;
  accent?: "gold" | "teal" | "violet" | "emerald";
}) {
  const colors = {
    gold: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    teal: "text-teal-400 bg-teal-500/10 border-teal-500/20",
    violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
          {label}
        </span>
        <div className={`p-1.5 rounded-lg border ${colors[accent]}`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>
      <div className="text-3xl font-bold text-zinc-100 font-mono">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      {delta !== undefined && <DeltaBadge pct={delta} />}
    </div>
  );
}

function RankTable({
  title,
  rows,
  keyLabel,
}: {
  title: string;
  rows: { key: string; clicks: number; unique_sessions: number }[];
  keyLabel: string;
}) {
  const maxClicks = rows[0]?.clicks ?? 1;

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
      <h3 className="text-xs text-zinc-400 uppercase tracking-widest font-semibold mb-4 flex items-center gap-2">
        <Award className="w-3.5 h-3.5 text-amber-400" />
        {title}
      </h3>
      <div className="space-y-2">
        {rows.slice(0, 10).map((row, i) => (
          <div key={row.key} className="group">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-600 w-4 font-mono">
                  {i + 1}
                </span>
                <span className="text-sm text-zinc-200 font-medium">
                  {row.key}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <span className="font-mono">{row.clicks.toLocaleString()} clicks</span>
                <span className="text-zinc-600">{row.unique_sessions} uniq</span>
              </div>
            </div>
            {/* Bar */}
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all"
                style={{ width: `${(row.clicks / maxClicks) * 100}%` }}
              />
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="text-zinc-600 text-sm py-4 text-center">
            No data yet
          </p>
        )}
      </div>
    </div>
  );
}

const TOOLTIP_STYLE = {
  backgroundColor: "#18181b",
  border: "1px solid #3f3f46",
  borderRadius: 8,
  color: "#e4e4e7",
  fontSize: 12,
};

export function AnalyticsDashboard({ summary, error, days }: Props) {
  const [activeDays, setActiveDays] = useState(days);

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 max-w-md text-center">
          <Zap className="w-6 h-6 text-red-400 mx-auto mb-3" />
          <p className="text-red-300 font-medium mb-2">Analytics Error</p>
          <p className="text-zinc-400 text-sm">{error}</p>
          <p className="text-zinc-600 text-xs mt-4">
            Ensure Supabase is configured and the affiliate_clicks table exists.
          </p>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Activity className="w-6 h-6 text-amber-400 animate-pulse" />
      </div>
    );
  }

  const conversionRate =
    summary.totalClicks > 0
      ? ((summary.conversions / summary.totalClicks) * 100).toFixed(2)
      : "0.00";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/40 backdrop-blur px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <MousePointerClick className="w-5 h-5 text-amber-400" />
              Affiliate Analytics
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Last {activeDays} days · Privacy-safe · No PII stored
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[7, 14, 30, 90].map((d) => (
              <a
                key={d}
                href={`?days=${d}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeDays === d
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700"
                }`}
                onClick={() => setActiveDays(d)}
              >
                {d}d
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Total Clicks"
            value={summary.totalClicks}
            icon={MousePointerClick}
            delta={summary.deltaPct.clicks}
            accent="gold"
          />
          <StatCard
            label="Unique Sessions"
            value={summary.totalUniqueSessions}
            icon={Users}
            accent="teal"
          />
          <StatCard
            label="Conversions"
            value={summary.conversions}
            icon={ShoppingCart}
            delta={summary.deltaPct.conversions}
            accent="emerald"
          />
          <StatCard
            label="Est. Conv. Rate"
            value={`${conversionRate}%`}
            icon={ArrowUpRight}
            accent="violet"
          />
        </div>

        {/* Click Trend Chart */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
          <h3 className="text-xs text-zinc-400 uppercase tracking-widest font-semibold mb-5 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            Daily Click Trend
          </h3>
          {summary.clicksByDay.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={summary.clicksByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#71717a" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#71717a" }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  labelStyle={{ color: "#a1a1aa" }}
                />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                  name="Clicks"
                />
                <Line
                  type="monotone"
                  dataKey="unique_sessions"
                  stroke="#2dd4bf"
                  strokeWidth={1.5}
                  dot={false}
                  name="Unique Sessions"
                  strokeDasharray="4 2"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-zinc-600 text-sm">
              No click data yet for this period
            </div>
          )}
        </div>

        {/* Top Dimensions Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          <RankTable
            title="Top Peptides"
            rows={summary.topPeptides}
            keyLabel="Peptide"
          />
          <RankTable
            title="Top Vendors"
            rows={summary.topVendors}
            keyLabel="Vendor"
          />
          <RankTable
            title="Top Surfaces"
            rows={summary.topSurfaces}
            keyLabel="Surface"
          />
        </div>

        {/* Surface Clicks Bar Chart */}
        {summary.topSurfaces.length > 0 && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
            <h3 className="text-xs text-zinc-400 uppercase tracking-widest font-semibold mb-5 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-violet-400" />
              Clicks by Surface
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={summary.topSurfaces.slice(0, 10)}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: "#71717a" }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="key"
                  tick={{ fontSize: 11, fill: "#a1a1aa" }}
                  tickLine={false}
                  axisLine={false}
                  width={120}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar
                  dataKey="clicks"
                  fill="#8b5cf6"
                  radius={[0, 4, 4, 0]}
                  name="Clicks"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Funnel Note */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 text-sm text-zinc-400">
          <h3 className="text-xs text-zinc-300 font-semibold uppercase tracking-widest mb-2 flex items-center gap-2">
            <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
            Funnel: Pageview → Click → Conversion
          </h3>
          <p>
            <span className="text-zinc-300 font-medium">Pageviews</span> — use
            GA4 for pageview counts (not stored here for privacy).
            &nbsp;&nbsp;→&nbsp;&nbsp;
            <span className="text-amber-300 font-medium">
              {summary.totalClicks.toLocaleString()} clicks
            </span>{" "}
            tracked server-side this period.
            &nbsp;&nbsp;→&nbsp;&nbsp;
            <span className="text-emerald-300 font-medium">
              {summary.conversions} conversions
            </span>{" "}
            received via vendor postbacks.
            {summary.conversions === 0 && (
              <span className="text-zinc-600 ml-2">
                (Configure vendor postback webhook at{" "}
                <code className="text-zinc-400">
                  GET /api/track?vendor=VENDOR&amp;order_id=XYZ
                </code>
                )
              </span>
            )}
          </p>
        </div>

        {/* Privacy Note */}
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg px-4 py-3 text-xs text-zinc-600 flex items-start gap-2">
          <span className="text-zinc-500 mt-0.5">🔒</span>
          <span>
            Privacy-safe tracking: no IP address, no user-agent, no cookies,
            no PII stored. Session IDs are daily-rotating SHA-256 hashes
            generated client-side — they cannot be traced to any individual.
          </span>
        </div>
      </div>
    </div>
  );
}
