'use client';

import React, { useState } from 'react';

type Aggregator = {
  name: string;
  domain: string;
  submissionType: string;
  categoryPolicy: string;
  notes: string;
};

export default function CitationTableClient({ aggregators }: { aggregators: Aggregator[] }) {
  const [packetTarget, setPacketTarget] = useState<Aggregator | null>(null);

  const getBadgeStyle = (policy: string) => {
    switch (policy) {
      case 'allows_research_peptides':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'prohibits_research_chemicals':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'ambiguous_supplements':
      case 'unverified':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  const getCategoryMapping = (domain: string) => {
    switch (domain) {
      case 'worthepenny.com': return 'Health & Wellness / Supplements';
      case 'wethrift.com': return 'Vitamins & Supplements';
      case 'simplycodes.com':
      case 'knoji.com':
        return 'Match Limitless Life category';
      case 'hotdeals.com':
        return 'Match Amino Asylum category';
      default:
        return 'Supplements';
    }
  };

  const generatePacket = (agg: Aggregator) => {
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const packet = `
--- PEPTIDEX SUBMISSION PACKET ---
Site: ${agg.name} (${agg.domain})

Title: PEPTIDEX — 20% Off Research Peptides at Amino Club
Code: PEPTIDEX
URL: https://peptidex.app/peptidex-coupon

Description:
Code PEPTIDEX provides 20% off the full Amino Club catalog of research peptides. Verified working as of ${today}. Stacks with sale prices.

Category Mapping: ${getCategoryMapping(agg.domain)}

FTC Disclosure:
Affiliate code — PeptiDex.app earns a commission on purchases. 
Disclosure: https://peptidex.app/affiliate-disclosure
-----------------------------------`;
    navigator.clipboard.writeText(packet);
    setPacketTarget(agg);
    setTimeout(() => setPacketTarget(null), 3000);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-zinc-950 border-b border-zinc-800 text-sm text-zinc-400 uppercase">
            <th className="p-4 font-semibold">Aggregator</th>
            <th className="p-4 font-semibold">Category Policy</th>
            <th className="p-4 font-semibold">Submission Status</th>
            <th className="p-4 font-semibold">Last Checked</th>
            <th className="p-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {aggregators.map((agg) => (
            <tr key={agg.domain} className="hover:bg-zinc-800/50 transition-colors">
              <td className="p-4">
                <div className="font-medium text-zinc-100">{agg.name}</div>
                <div className="text-xs text-zinc-500">{agg.domain}</div>
              </td>
              <td className="p-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getBadgeStyle(agg.categoryPolicy)}`}>
                  {agg.categoryPolicy.replace(/_/g, ' ')}
                </span>
              </td>
              <td className="p-4">
                <select className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-sm text-zinc-300 focus:ring-1 focus:ring-gold">
                  <option>Not Submitted</option>
                  <option>Submitted</option>
                  <option>Live</option>
                  <option>Expired</option>
                </select>
              </td>
              <td className="p-4 text-sm text-zinc-400">
                Never
              </td>
              <td className="p-4 text-right">
                {agg.categoryPolicy !== 'prohibits_research_chemicals' ? (
                  <button 
                    onClick={() => generatePacket(agg)}
                    className="inline-flex items-center justify-center px-3 py-1.5 border border-zinc-700 bg-zinc-800 text-sm font-medium rounded-md text-zinc-200 hover:bg-zinc-700 transition-colors"
                  >
                    {packetTarget?.domain === agg.domain ? 'Copied to Clipboard!' : 'Generate Packet'}
                  </button>
                ) : (
                  <span className="text-xs text-red-500 font-medium">Excluded (ToS Ban)</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
