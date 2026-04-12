'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function GlobalEmbedHandler() {
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get('embed') === 'true';

  useEffect(() => {
    if (isEmbed) {
      document.body.classList.add('is-embed');
    } else {
      document.body.classList.remove('is-embed');
    }
  }, [isEmbed]);

  if (!isEmbed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 py-2 px-4 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between z-[9999]">
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-zinc-500 font-medium">Powered by</span>
        <a href="https://peptidex.app" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-violet-400 hover:text-violet-300">
          PeptiDex
        </a>
      </div>
      <a href="https://peptidex.app/tools" target="_blank" rel="noopener noreferrer" className="text-[10px] text-zinc-400 hover:text-white px-2 py-1 rounded bg-zinc-800">
        Get this widget
      </a>
    </div>
  );
}
