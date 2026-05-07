import type { Peptide } from '@/data/types';
import { Clock, Syringe, BadgeCheck, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function QuickReference({ peptide }: { peptide: Peptide }) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-violet-400" />
          Quick {peptide.name} Facts
        </h2>
        <Link href={`/library/${peptide.slug}`} className="hidden sm:flex items-center gap-1 text-sm font-semibold text-violet-400 hover:text-violet-300">
          Read full profile <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-zinc-400 text-sm font-medium">
            <Syringe className="w-4 h-4" /> Typical Dose
          </div>
          <div className="text-zinc-100 font-medium">
            {peptide.dosing ? `${peptide.dosing.typical_dose_mcg[0]}-${peptide.dosing.typical_dose_mcg[1]} mcg` : 'Varies by protocol'}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-zinc-400 text-sm font-medium">
            <Clock className="w-4 h-4" /> Half-Life
          </div>
          <div className="text-zinc-100 font-medium">
            {peptide.half_life_hours ? (peptide.half_life_hours > 24 ? `${(peptide.half_life_hours/24).toFixed(1)} days` : `${peptide.half_life_hours} hours`) : 'Unknown'}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-zinc-400 text-sm font-medium">
            <BadgeCheck className="w-4 h-4" /> FDA Status
          </div>
          <div className="text-zinc-100 font-medium">
            {peptide.is_fda_approved ? <span className="text-emerald-400">Approved</span> : 'Research Only'}
          </div>
        </div>
      </div>
      
      <Link href={`/library/${peptide.slug}`} className="sm:hidden mt-6 flex items-center justify-center gap-1 text-sm font-semibold text-violet-400 hover:text-violet-300 w-full py-2 border border-violet-500/30 rounded-lg bg-violet-500/5">
        Read full profile <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
