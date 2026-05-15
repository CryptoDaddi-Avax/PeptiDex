import Link from 'next/link';

export function GlobalDisclaimerBanner() {
  return (
    <div className="w-full bg-[#1c140a] border-b border-amber-900/30 py-1.5 px-3 z-50 relative shrink-0">
      <div className="max-w-5xl mx-auto flex items-center justify-center text-center">
        <p className="text-[10px] md:text-xs text-amber-500/80 leading-tight font-mono tracking-tight max-w-[90%]">
          <span className="font-bold text-amber-500">⚠️ Research Use Only</span> — 
          Compounds discussed are research chemicals, not FDA-approved for human use. Not medical advice.{' '}
          <Link href="/disclaimers" className="underline hover:text-amber-400 transition-colors ml-1">
            Full disclaimers →
          </Link>
        </p>
      </div>
    </div>
  );
}
