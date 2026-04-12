'use client';

import { useState, useEffect } from 'react';
import { Share2, Check, X, Code2 } from 'lucide-react';

export function EmbedModal({ title, path }: { title: string; path: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');

  useEffect(() => {
    // Generate full URL dynamically on client to avoid hydration mismatch
    setEmbedUrl(`${window.location.origin}${path}?embed=true`);
  }, [path]);

  const embedCode = `<iframe src="${embedUrl}" width="100%" height="600" frameborder="0" style="border: 1px solid #27272a; border-radius: 12px; overflow: hidden;" title="PeptiDex ${title}"></iframe>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 font-semibold text-xs border border-violet-500/20 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        Embed on Your Site
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-violet-500/10 rounded-xl">
                <Code2 className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-100">Embed this Tool</h3>
                <p className="text-xs text-zinc-400">Copy this code to embed the {title} on your blog or website.</p>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 mb-5">
              <pre className="text-xs text-emerald-400 font-mono whitespace-pre-wrap word-break break-all select-all m-0 bg-transparent p-0">
                <code>{embedCode}</code>
              </pre>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-violet-500/20"
              >
                {copied ? <Check className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                {copied ? 'Copied Code' : 'Copy Embed Code'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
