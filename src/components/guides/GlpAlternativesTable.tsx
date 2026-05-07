import { ExternalLink, CheckCircle2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export function GlpAlternativesTable() {
  const alternatives = [
    {
      name: 'Tirzepatide',
      slug: 'tirzepatide',
      mechanism: 'GLP-1 / GIP Dual Agonist',
      weightLoss: 'High (~20% body weight)',
      frequency: 'Weekly',
      status: 'FDA Approved',
      cost: '$$$$'
    },
    {
      name: 'Retatrutide',
      slug: 'retatrutide',
      mechanism: 'GLP-1 / GIP / GCGR Tri-Agonist',
      weightLoss: 'Very High (~24%+)',
      frequency: 'Weekly',
      status: 'Clinical Trials (Phase 3)',
      cost: '$$$$$'
    },
    {
      name: 'Tesofensine',
      slug: 'tesofensine',
      mechanism: 'SNDRI (Neurotransmitter reuptake)',
      weightLoss: 'Moderate-High (~10%)',
      frequency: 'Daily (Oral)',
      status: 'Clinical Trials',
      cost: '$$$'
    },
    {
      name: 'AOD-9604',
      slug: 'aod-9604',
      mechanism: 'GH Fragment (Lipolysis)',
      weightLoss: 'Mild-Moderate',
      frequency: 'Daily',
      status: 'Research / Orphan',
      cost: '$$'
    },
    {
      name: 'MOTS-c',
      slug: 'mots-c',
      mechanism: 'Mitochondrial Derived Peptide',
      weightLoss: 'Mild (Metabolic boost)',
      frequency: 'Pre-workout / 3x weekly',
      status: 'Research Only',
      cost: '$$'
    },
    {
      name: '5-Amino-1MQ',
      slug: '5-amino-1mq',
      mechanism: 'NNMT Inhibitor',
      weightLoss: 'Moderate',
      frequency: 'Daily (Oral)',
      status: 'Research Only',
      cost: '$$$'
    },
    {
      name: 'Tesamorelin',
      slug: 'tesamorelin',
      mechanism: 'GHRH (Visceral fat targeting)',
      weightLoss: 'Targeted (Abdominal)',
      frequency: 'Daily',
      status: 'FDA Approved (HIV Lipodystrophy)',
      cost: '$$$$'
    }
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/30 my-8">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/80 text-sm">
            <th className="py-4 px-4 font-semibold text-zinc-300">Compound</th>
            <th className="py-4 px-4 font-semibold text-zinc-300">Mechanism</th>
            <th className="py-4 px-4 font-semibold text-zinc-300">Weight Loss Potential</th>
            <th className="py-4 px-4 font-semibold text-zinc-300">Frequency</th>
            <th className="py-4 px-4 font-semibold text-zinc-300">FDA Status</th>
            <th className="py-4 px-4 font-semibold text-zinc-300">Links</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-zinc-800/50">
          {alternatives.map((alt) => (
            <tr key={alt.slug} className="hover:bg-zinc-800/30 transition-colors">
              <td className="py-3 px-4 font-bold text-white">{alt.name}</td>
              <td className="py-3 px-4 text-zinc-400">{alt.mechanism}</td>
              <td className="py-3 px-4 text-zinc-300">{alt.weightLoss}</td>
              <td className="py-3 px-4 text-zinc-400">{alt.frequency}</td>
              <td className="py-3 px-4">
                {alt.status.includes('Approved') ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-semibold px-2 py-1 rounded bg-emerald-400/10 border border-emerald-400/20">
                    <CheckCircle2 className="w-3 h-3" /> {alt.status}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-semibold px-2 py-1 rounded bg-amber-400/10 border border-amber-400/20">
                    <ShieldAlert className="w-3 h-3" /> {alt.status}
                  </span>
                )}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <Link href={`/library/${alt.slug}`} className="text-violet-400 hover:text-violet-300 text-xs font-medium">
                    Profile
                  </Link>
                  <Link href={`/buy/${alt.slug}`} className="text-amber-400 hover:text-amber-300 text-xs font-medium flex items-center gap-1">
                    Buy <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
