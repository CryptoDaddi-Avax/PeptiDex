import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Citation Dashboard | PeptiDex Admin',
};

// Mock data to demonstrate the UI requested in Phase 4.
// In production, this pulls from PostgreSQL citations_search_discovery and citations_search_runs tables.
const mockDiscoveryFeed = [
  { id: 1, domain: 'reddit.com/r/Peptides', url: 'https://reddit.com/...', title: 'Amino Club discount code?', classification: 'community_post', date: '2 hours ago' },
  { id: 2, domain: 'aminoclub.com', url: 'https://aminoclub.com/affiliates', title: 'Official Amino Club Partners', classification: 'direct_merchant', date: '1 day ago' },
  { id: 3, domain: 'wethrift.com', url: 'https://wethrift.com/amino-club', title: 'Amino Club Coupons', classification: 'direct_aggregator', date: '3 days ago' },
];

const mockActionItems = [
  "⚠️ Ascension Peptides official promotions page does NOT list PEPTIDEX yet. Consider outreach.",
  "💡 Reddit user /u/biohacker99 mentioned PEPTIDEX yesterday. Engagement recommended.",
  "📉 DealsPlus listing has decayed and dropped from index. Manual refresh needed."
];

export default function CitationDashboardPage() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-zinc-950 text-zinc-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100">Citation Discovery Dashboard</h1>
          <p className="text-zinc-400 mt-1">Passive organic AEO monitoring across the open web.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/citations" className="px-4 py-2 border border-zinc-700 bg-zinc-900 rounded-md hover:bg-zinc-800 transition">
            Manage Aggregators
          </Link>
          <button className="px-4 py-2 bg-gold/10 border border-gold/30 text-gold rounded-md hover:bg-gold/20 transition">
            Run Manual Search Poller
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-zinc-400">Total Unique Domains</h3>
          <p className="text-3xl font-bold text-zinc-100 mt-2">14</p>
          <span className="text-emerald-400 text-xs font-medium">↑ +2 this week</span>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-zinc-400">Organic Mentions</h3>
          <p className="text-3xl font-bold text-zinc-100 mt-2">42</p>
          <span className="text-emerald-400 text-xs font-medium">↑ +7 this week</span>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-zinc-400">Competing Codes (THANKYOU)</h3>
          <p className="text-3xl font-bold text-zinc-100 mt-2">89</p>
          <span className="text-red-400 text-xs font-medium">↓ -12 this week</span>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-zinc-400">Weekly API Cost</h3>
          <p className="text-3xl font-bold text-zinc-100 mt-2">$2.14</p>
          <span className="text-zinc-500 text-xs font-medium">Budget: $35.00</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Panel: Discovery Feed */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-zinc-100 mb-4">Search Discovery Feed</h2>
            <div className="space-y-4">
              {mockDiscoveryFeed.map(feed => (
                <div key={feed.id} className="flex items-start justify-between p-4 border border-zinc-800 bg-zinc-950/50 rounded-md">
                  <div>
                    <h4 className="text-zinc-200 font-medium">{feed.title}</h4>
                    <a href={feed.url} target="_blank" className="text-sm text-blue-400 hover:underline">{feed.domain}</a>
                    <div className="mt-2">
                      <span className="inline-flex px-2 py-1 rounded text-xs border border-zinc-700 bg-zinc-800 text-zinc-300">
                        {feed.classification.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500">{feed.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-zinc-100 mb-4">Top Citing Domains</h2>
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-800">
                <tr>
                  <th className="pb-3 text-zinc-400 font-medium">Domain</th>
                  <th className="pb-3 text-zinc-400 font-medium">Citations</th>
                  <th className="pb-3 text-zinc-400 font-medium">Authority Signal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr><td className="py-3 font-medium text-zinc-200">reddit.com</td><td className="py-3">18</td><td className="py-3"><span className="text-emerald-400">High</span></td></tr>
                <tr><td className="py-3 font-medium text-zinc-200">aminoclub.com</td><td className="py-3">1</td><td className="py-3"><span className="text-emerald-400">High (Direct)</span></td></tr>
                <tr><td className="py-3 font-medium text-zinc-200">wethrift.com</td><td className="py-3">3</td><td className="py-3"><span className="text-amber-400">Medium</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Action Items */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-lg font-bold text-zinc-100 mb-4">Action Items</h2>
            <ul className="space-y-3">
              {mockActionItems.map((item, i) => (
                <li key={i} className="text-sm bg-zinc-950 p-3 rounded border border-zinc-800 text-zinc-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Aggregator Status Sidebar */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-zinc-100">Aggregators</h2>
              <Link href="/admin/citations" className="text-xs text-gold hover:underline">Manage &rarr;</Link>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-zinc-300">WorthEPenny</span><span className="text-emerald-400">Live</span></div>
              <div className="flex justify-between text-sm"><span className="text-zinc-300">Wethrift</span><span className="text-emerald-400">Live</span></div>
              <div className="flex justify-between text-sm"><span className="text-zinc-300">SimplyCodes</span><span className="text-zinc-500">Not Submitted</span></div>
              <div className="flex justify-between text-sm"><span className="text-zinc-300">Knoji</span><span className="text-zinc-500">Not Submitted</span></div>
              <div className="flex justify-between text-sm"><span className="text-zinc-300">HotDeals</span><span className="text-amber-400">Submitted</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
