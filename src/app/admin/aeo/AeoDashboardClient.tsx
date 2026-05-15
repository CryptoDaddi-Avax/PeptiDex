'use client';

import React, { useState } from 'react';

// ═══════════════════════════════════════════════════════
// AEO Dashboard — 7-panel data-dense intelligence view
// Matches PeptiDex 2026 design system (--bg, --gold, Fraunces)
// ═══════════════════════════════════════════════════════

// Mock data for initial render. In production, fetched from Supabase API routes.
const ENGINES = ['Perplexity', 'Brave', 'Anthropic', 'OpenAI'] as const;

const mockKPIs = {
  mentionRateToday: 34.2,
  mentionRate7d: 31.8,
  mentionRate30d: 28.5,
  citationRate: 12.4,
  totalQueries: 50,
  activeEngines: 4,
  costToday: 1.42,
  costMTD: 18.60,
};

const mockEngineHealth = [
  { engine: 'Perplexity', status: 'green', successRate: 100, avgResponseMs: 1200, queriesRun: 50, costToday: 0.42, dailyCap: 2.00, lastPoll: '2m ago' },
  { engine: 'Brave', status: 'green', successRate: 98, avgResponseMs: 800, queriesRun: 50, costToday: 0.38, dailyCap: 2.00, lastPoll: '3m ago' },
  { engine: 'Anthropic', status: 'green', successRate: 100, avgResponseMs: 2100, queriesRun: 50, costToday: 0.22, dailyCap: 1.00, lastPoll: '4m ago' },
  { engine: 'OpenAI', status: 'green', successRate: 95, avgResponseMs: 3400, queriesRun: 20, costToday: 0.40, dailyCap: 1.50, lastPoll: '5m ago' },
];

const mockHeatmapData = [
  { query: 'PEPTIDEX coupon', perplexity: true, brave: true, anthropic: false, openai: true },
  { query: 'amino club discount code', perplexity: true, brave: false, anthropic: true, openai: true },
  { query: 'best research peptide vendor 2026', perplexity: false, brave: true, anthropic: true, openai: false },
  { query: 'retatrutide coupon code', perplexity: true, brave: true, anthropic: true, openai: true },
  { query: 'bpc-157 coupon code', perplexity: false, brave: false, anthropic: true, openai: false },
  { query: 'tirzepatide discount code', perplexity: true, brave: false, anthropic: false, openai: true },
  { query: 'PEPTIDEX legit', perplexity: true, brave: true, anthropic: true, openai: true },
  { query: 'amino club vs peptide sciences', perplexity: false, brave: false, anthropic: true, openai: null },
];

const mockCompetitors = [
  { code: 'THANKYOU', thisWeek: 42, lastWeek: 38, delta: 4 },
  { code: 'AMINOS', thisWeek: 18, lastWeek: 22, delta: -4 },
  { code: 'CLUB40', thisWeek: 12, lastWeek: 15, delta: -3 },
  { code: 'RESEARCH20', thisWeek: 8, lastWeek: 3, delta: 5 },
];

const mockTopDomains = [
  { domain: 'reddit.com', citations: 87, trend: 'up' },
  { domain: 'aminoclub.com', citations: 52, trend: 'stable' },
  { domain: 'peptidesciences.com', citations: 41, trend: 'up' },
  { domain: 'peptidex.app', citations: 34, trend: 'up' },
  { domain: 'limitlesslifenootropics.com', citations: 28, trend: 'down' },
];

const mockTopCitedPages = [
  { path: '/library/retatrutide', citations: 18 },
  { path: '/peptidex-coupon', citations: 14 },
  { path: '/library/bpc-157', citations: 11 },
  { path: '/tools/reconstitution-calculator', citations: 7 },
  { path: '/library/tirzepatide', citations: 5 },
];

const mockEvents = [
  { type: 'gained_mention', query: 'retatrutide coupon code', engine: 'Perplexity', time: '2h ago' },
  { type: 'lost_mention', query: 'bpc-157 coupon code', engine: 'Brave', time: '6h ago' },
  { type: 'gained_citation', query: 'PEPTIDEX coupon', engine: 'Anthropic', time: '1d ago' },
  { type: 'new_competitor', query: 'amino club discount', engine: 'OpenAI', time: '1d ago', detail: 'RESEARCH20' },
  { type: 'lost_citation', query: 'amino club vs peptide sciences', engine: 'Brave', time: '2d ago' },
];

function StatusDot({ status }: { status: string }) {
  const color = status === 'green' ? 'bg-emerald-400' : status === 'yellow' ? 'bg-amber-400' : 'bg-red-400';
  return <span className={`inline-block w-2 h-2 rounded-full ${color}`} />;
}

function EventBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    gained_mention: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    gained_citation: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    lost_mention: 'bg-red-500/20 text-red-400 border-red-500/30',
    lost_citation: 'bg-red-500/20 text-red-400 border-red-500/30',
    new_competitor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  };
  const labels: Record<string, string> = {
    gained_mention: '↑ GAINED',
    gained_citation: '↑ CITED',
    lost_mention: '↓ LOST',
    lost_citation: '↓ UNCITED',
    new_competitor: '⚡ NEW CODE',
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border ${styles[type] ?? 'bg-zinc-800 text-zinc-400'}`}>
      {labels[type] ?? type}
    </span>
  );
}

export default function AeoDashboardClient() {
  const [activeTab, setActiveTab] = useState<'heatmap' | 'chart'>('heatmap');

  return (
    <div className="min-h-screen text-[var(--ink)]" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-light tracking-tight" style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}>
              AEO <em style={{ color: 'var(--gold)' }}>Performance</em> Monitor
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '11px' }}>
              4 engines · 50 queries · official APIs only
            </p>
          </div>
          <button className="px-4 py-2 rounded-md text-sm font-medium transition-all"
            style={{ background: 'rgba(201,169,97,0.1)', border: '1px solid rgba(201,169,97,0.3)', color: 'var(--gold)' }}>
            Trigger Manual Poll
          </button>
        </div>

        {/* ── PANEL 1: Headline KPIs ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
          {[
            { label: 'Mention Rate (Today)', value: `${mockKPIs.mentionRateToday}%`, sub: `7d avg: ${mockKPIs.mentionRate7d}%`, accent: true },
            { label: 'Citation-as-Source', value: `${mockKPIs.citationRate}%`, sub: '30d avg: 10.2%' },
            { label: 'Active Engines', value: `${mockKPIs.activeEngines}/4`, sub: 'All healthy' },
            { label: 'Queries Tracked', value: `${mockKPIs.totalQueries}`, sub: '20 on OpenAI' },
            { label: 'Cost Today', value: `$${mockKPIs.costToday}`, sub: '$8.00 ceiling' },
            { label: 'Cost MTD', value: `$${mockKPIs.costMTD}`, sub: '$240 budget' },
          ].map((kpi, i) => (
            <div key={i} className="p-4 rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--line)' }}>
              <p className="text-[11px] uppercase tracking-wider mb-2" style={{ color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>{kpi.label}</p>
              <p className="text-2xl font-light" style={{ fontFamily: 'var(--serif)', color: kpi.accent ? 'var(--gold)' : 'var(--ink)' }}>{kpi.value}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--ink-dim)' }}>{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* ── PANEL 2: Engine Health Strip ── */}
        <div className="mb-6 p-4 rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--line)' }}>
          <h3 className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>Engine Health</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {mockEngineHealth.map(e => (
              <div key={e.engine} className="flex items-center gap-3 p-3 rounded" style={{ background: 'var(--bg-soft)' }}>
                <StatusDot status={e.status} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{e.engine}</span>
                    <span className="text-[10px]" style={{ color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>{e.lastPoll}</span>
                  </div>
                  <div className="flex gap-3 mt-1 text-[11px]" style={{ color: 'var(--ink-dim)' }}>
                    <span>{e.successRate}% ok</span>
                    <span>{e.avgResponseMs}ms</span>
                    <span>{e.queriesRun}q</span>
                    <span>${e.costToday.toFixed(2)}/${e.dailyCap.toFixed(2)}</span>
                  </div>
                  {/* Budget bar */}
                  <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(e.costToday / e.dailyCap) * 100}%`,
                        background: (e.costToday / e.dailyCap) > 0.9 ? '#ef4444' : (e.costToday / e.dailyCap) > 0.5 ? 'var(--amber)' : 'var(--green)',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Left 2/3: Charts + Heatmap */}
          <div className="xl:col-span-2 space-y-6">

            {/* Tab Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('heatmap')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'heatmap' ? '' : 'opacity-50'}`}
                style={{ background: activeTab === 'heatmap' ? 'rgba(201,169,97,0.15)' : 'transparent', color: 'var(--gold)', border: `1px solid ${activeTab === 'heatmap' ? 'rgba(201,169,97,0.3)' : 'var(--line)'}` }}
              >
                Query × Engine Heatmap
              </button>
              <button
                onClick={() => setActiveTab('chart')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'chart' ? '' : 'opacity-50'}`}
                style={{ background: activeTab === 'chart' ? 'rgba(201,169,97,0.15)' : 'transparent', color: 'var(--gold)', border: `1px solid ${activeTab === 'chart' ? 'rgba(201,169,97,0.3)' : 'var(--line)'}` }}
              >
                Daily Trend
              </button>
            </div>

            {/* ── PANEL 3: Heatmap ── */}
            {activeTab === 'heatmap' && (
              <div className="p-5 rounded-lg overflow-x-auto" style={{ background: 'var(--bg-card)', border: '1px solid var(--line)' }}>
                <h3 className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>
                  Mention Status — Query × Engine (Today)
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <th className="text-left py-2 pr-4" style={{ color: 'var(--ink-dim)', fontFamily: 'var(--mono)', fontSize: '11px' }}>Query</th>
                      {ENGINES.map(e => (
                        <th key={e} className="text-center py-2 px-3" style={{ color: 'var(--ink-dim)', fontFamily: 'var(--mono)', fontSize: '11px' }}>{e}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockHeatmapData.map((row, i) => (
                      <tr key={i} className="cursor-pointer hover:opacity-80 transition-opacity" style={{ borderBottom: '1px solid var(--line)' }}>
                        <td className="py-2.5 pr-4 text-sm" style={{ color: 'var(--ink)' }}>{row.query}</td>
                        {(['perplexity', 'brave', 'anthropic', 'openai'] as const).map(eng => {
                          const val = row[eng];
                          const bg = val === null ? 'var(--bg-soft)' : val ? 'rgba(127,183,126,0.25)' : 'rgba(239,68,68,0.2)';
                          const label = val === null ? '—' : val ? '✓' : '✗';
                          const color = val === null ? 'var(--ink-mute)' : val ? 'var(--green)' : '#ef4444';
                          return (
                            <td key={eng} className="text-center py-2.5 px-3">
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded text-xs font-bold" style={{ background: bg, color }}>
                                {label}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── PANEL 3B: Chart placeholder ── */}
            {activeTab === 'chart' && (
              <div className="p-5 rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--line)' }}>
                <h3 className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>
                  Daily Mention Rate by Engine (Last 30 Days)
                </h3>
                <div className="h-64 flex items-center justify-center rounded" style={{ background: 'var(--bg-soft)', border: '1px dashed var(--line)' }}>
                  <p className="text-sm" style={{ color: 'var(--ink-mute)' }}>Chart renders after 7+ days of data accumulation (Recharts)</p>
                </div>
              </div>
            )}

            {/* ── PANEL 4: Competitor Tracker ── */}
            <div className="p-5 rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--line)' }}>
              <h3 className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>
                Competing Codes — Week-over-Week
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {mockCompetitors.map(c => (
                  <div key={c.code} className="p-3 rounded" style={{ background: 'var(--bg-soft)', border: '1px solid var(--line)' }}>
                    <p className="text-sm font-bold" style={{ color: 'var(--ink)', fontFamily: 'var(--mono)' }}>{c.code}</p>
                    <p className="text-xl font-light mt-1" style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}>{c.thisWeek}</p>
                    <p className="text-xs mt-1" style={{ color: c.delta > 0 ? '#ef4444' : 'var(--green)' }}>
                      {c.delta > 0 ? `↑ +${c.delta}` : `↓ ${c.delta}`} vs last week
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── PANEL 5: Domain Leaderboard ── */}
            <div className="p-5 rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--line)' }}>
              <h3 className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>
                Top Cited Domains — AI Engine Sources
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--line)' }}>
                    <th className="text-left py-2" style={{ color: 'var(--ink-dim)', fontFamily: 'var(--mono)', fontSize: '11px' }}>Domain</th>
                    <th className="text-right py-2" style={{ color: 'var(--ink-dim)', fontFamily: 'var(--mono)', fontSize: '11px' }}>Citations</th>
                    <th className="text-right py-2" style={{ color: 'var(--ink-dim)', fontFamily: 'var(--mono)', fontSize: '11px' }}>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTopDomains.map((d, i) => (
                    <tr key={d.domain} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td className="py-2.5" style={{ color: d.domain === 'peptidex.app' ? 'var(--gold)' : 'var(--ink)', fontWeight: d.domain === 'peptidex.app' ? 600 : 400 }}>
                        {i + 1}. {d.domain}
                      </td>
                      <td className="text-right py-2.5" style={{ color: 'var(--ink)', fontFamily: 'var(--mono)' }}>{d.citations}</td>
                      <td className="text-right py-2.5">
                        <span style={{ color: d.trend === 'up' ? 'var(--green)' : d.trend === 'down' ? '#ef4444' : 'var(--ink-mute)' }}>
                          {d.trend === 'up' ? '↑' : d.trend === 'down' ? '↓' : '—'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">

            {/* ── PANEL 6: Win/Loss Feed ── */}
            <div className="p-5 rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--line)' }}>
              <h3 className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>
                Win / Loss Feed
              </h3>
              <div className="space-y-3">
                {mockEvents.map((ev, i) => (
                  <div key={i} className="p-3 rounded" style={{ background: 'var(--bg-soft)', border: '1px solid var(--line)' }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <EventBadge type={ev.type} />
                      <span className="text-[10px]" style={{ color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>{ev.time}</span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--ink)' }}>"{ev.query}"</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--ink-dim)' }}>
                      {ev.engine}{ev.detail ? ` · Code: ${ev.detail}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── PANEL 7: Top Cited Pages on peptidex.app ── */}
            <div className="p-5 rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--line)' }}>
              <h3 className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>
                Top Cited Pages — peptidex.app
              </h3>
              <div className="space-y-2">
                {mockTopCitedPages.map((p, i) => (
                  <div key={p.path} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid var(--line)' }}>
                    <span className="text-sm" style={{ color: 'var(--gold)', fontFamily: 'var(--mono)' }}>{p.path}</span>
                    <span className="text-sm font-medium" style={{ color: 'var(--ink)', fontFamily: 'var(--mono)' }}>{p.citations}×</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
