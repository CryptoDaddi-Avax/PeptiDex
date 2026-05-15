import fs from 'fs';
import path from 'path';
import CitationTableClient from './CitationTableClient';

export const metadata = {
  title: 'Citation Submissions | PeptiDex Admin',
};

// Fetch config server-side
async function getAggregators() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'coupon-aggregators.json');
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export default async function CitationsAdminPage() {
  const aggregators = await getAggregators();

  // In a real app we'd fetch actual DB status here via Supabase.
  // We'll pass the base config to the client component.

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-zinc-100 mb-2">Aggregator Submissions</h1>
      <p className="text-zinc-400 mb-8">
        Manage 100% ToS-compliant manual coupon submissions. Honey and Capital One Shopping are excluded.
      </p>

      <CitationTableClient aggregators={aggregators} />
    </div>
  );
}
