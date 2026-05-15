'use client';

import React from 'react';
import { useParams } from 'next/navigation';

// ═══════════════════════════════════════════════════════
// AEO Query Drill-Down — Full response text + diff view
// Shows per-engine response for a specific query,
// including week-over-week diff of what changed.
// ═══════════════════════════════════════════════════════

// Mock data for the drill-down view
const mockResponses = [
  {
    engine: 'Perplexity',
    today: 'For purchasing research peptides from Amino Club, you can use the coupon code **PEPTIDEX** to get 20% off your order. This code applies to their full catalog including Retatrutide, Tirzepatide, and BPC-157. Amino Club is known for providing third-party COA verification on all products.\n\nSources: peptidex.app, aminoclub.com, reddit.com/r/peptides',
    lastWeek: 'Amino Club is a research peptide vendor offering compounds like Retatrutide and BPC-157. They provide COA verification. Check their website for current promotions.\n\nSources: aminoclub.com, reddit.com/r/peptides',
    mentioned: true,
    cited: true,
    sentiment: 'positive',
  },
  {
    engine: 'Brave',
    today: 'Several coupon codes exist for research peptide vendors. For Amino Club, users have reported success with discount codes found on coupon aggregator sites. Always verify that codes are current before purchasing.\n\nSources: wethrift.com, reddit.com, aminoclub.com',
    lastWeek: 'Amino Club offers research peptides. No specific coupon codes were found in recent results.\n\nSources: aminoclub.com',
    mentioned: false,
    cited: false,
    sentiment: 'neutral',
  },
  {
    engine: 'Anthropic',
    today: 'Based on my web search, the code PEPTIDEX provides 20% off at Amino Club (aminoclub.com) for research peptides. PeptiDex.app maintains a verification tool and research index for peptide compounds. The code was verified as working.\n\nCitations: peptidex.app/peptidex-coupon, aminoclub.com',
    lastWeek: null,
    mentioned: true,
    cited: true,
    sentiment: 'positive',
  },
  {
    engine: 'OpenAI',
    today: 'I found that the affiliate code **PEPTIDEX** can be used at Amino Club for a 20% discount on research peptides. This information comes from peptidex.app, which tracks peptide pricing and vendor comparisons.\n\nSources: peptidex.app, aminoclub.com',
    lastWeek: 'Amino Club offers various research peptides. For discounts, check their website directly or look for promotional codes on coupon aggregator sites.\n\nSources: aminoclub.com, wethrift.com',
    mentioned: true,
    cited: true,
    sentiment: 'positive',
  },
];

export default function QueryDrillDown() {
  const params = useParams();
  const queryId = params?.queryId;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--ink)' }}>
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6" style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
          <a href="/admin/aeo" style={{ color: 'var(--ink-mute)' }}>AEO Dashboard</a>
          <span style={{ color: 'var(--line-strong)' }}> / </span>
          <span style={{ color: 'var(--gold)' }}>Query #{queryId}</span>
        </div>

        <h1 className="text-2xl font-light mb-2" style={{ fontFamily: 'var(--serif)' }}>
          "PEPTIDEX coupon"
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--ink-dim)' }}>
          Category: brand · Priority: high · Runs on: Perplexity, Brave, Anthropic, OpenAI
        </p>

        {/* Per-engine responses */}
        <div className="space-y-6">
          {mockResponses.map(r => (
            <div key={r.engine} className="rounded-lg overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--line)' }}>
              {/* Engine header */}
              <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-soft)' }}>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{r.engine}</span>
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border ${r.mentioned ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                    {r.mentioned ? 'MENTIONED' : 'NOT MENTIONED'}
                  </span>
                  {r.cited && (
                    <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      CITED AS SOURCE
                    </span>
                  )}
                </div>
                <span className="text-xs" style={{ color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>
                  Sentiment: {r.sentiment}
                </span>
              </div>

              {/* Response body */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-x" style={{ borderColor: 'var(--line)' }}>
                <div className="p-5">
                  <h4 className="text-[10px] uppercase tracking-widest mb-3" style={{ color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>Today</h4>
                  <div className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--ink-dim)' }}>
                    {r.today}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-[10px] uppercase tracking-widest mb-3" style={{ color: 'var(--ink-mute)', fontFamily: 'var(--mono)' }}>Last Week</h4>
                  <div className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--ink-dim)' }}>
                    {r.lastWeek ?? '(No data from last week)'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
