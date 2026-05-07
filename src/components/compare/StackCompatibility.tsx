import { Layers, CheckCircle2, XCircle } from 'lucide-react';

interface StackCompatibilityProps {
  nameA: string;
  nameB: string;
  note: string;
  compatible: boolean;
}

export function StackCompatibility({ nameA, nameB, note, compatible }: StackCompatibilityProps) {
  return (
    <div className={`rounded-2xl border p-6 ${compatible ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-amber-500/30 bg-amber-500/5'}`}>
      <div className="flex items-center gap-2 mb-3">
        <Layers className={`w-5 h-5 ${compatible ? 'text-emerald-400' : 'text-amber-400'}`} />
        <h3 className="font-bold text-zinc-100">
          Can you stack {nameA} + {nameB}?
        </h3>
        {compatible
          ? <CheckCircle2 className="w-5 h-5 text-emerald-400 ml-auto" />
          : <XCircle className="w-5 h-5 text-amber-400 ml-auto" />
        }
      </div>
      <p className="text-sm text-zinc-300 leading-relaxed">{note}</p>
    </div>
  );
}
