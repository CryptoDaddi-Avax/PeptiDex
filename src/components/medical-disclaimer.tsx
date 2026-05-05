import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export const MEDICAL_DISCLAIMER_TEXT =
  'PeptiDex content is for research and educational purposes only. Peptides discussed are research chemicals not approved by the FDA for human use. Information here is not medical advice. Consult a licensed physician before any decision involving peptides.';

interface Props {
  variant?: 'callout' | 'compact';
  className?: string;
}

export function MedicalDisclaimer({ variant = 'callout', className = '' }: Props) {
  if (variant === 'compact') {
    return (
      <aside
        aria-label="Medical disclaimer"
        className={`rounded-lg bg-amber-950/25 border border-amber-500/20 p-3 ${className}`}
      >
        <div className="flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-amber-300/90 leading-relaxed">
            <strong className="font-bold text-amber-300">Medical Disclaimer.</strong>{' '}
            {MEDICAL_DISCLAIMER_TEXT}
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Medical disclaimer"
      className={`rounded-xl bg-amber-950/30 border border-amber-500/30 p-5 my-8 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
          <ShieldAlert className="w-5 h-5 text-amber-400" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-2">
            Medical Disclaimer
          </h2>
          <p className="text-sm text-amber-100/90 leading-relaxed">
            {MEDICAL_DISCLAIMER_TEXT}
          </p>
          <p className="mt-3 text-xs text-amber-200/70">
            Read the full{' '}
            <Link href="/disclaimer" className="underline hover:text-amber-200 transition-colors">
              disclaimer
            </Link>{' '}
            and our{' '}
            <Link href="/editorial-process" className="underline hover:text-amber-200 transition-colors">
              editorial process
            </Link>
            .
          </p>
        </div>
      </div>
    </aside>
  );
}
