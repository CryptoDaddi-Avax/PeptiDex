'use client';

import { useState } from 'react';
import { Quote, Copy, Link as LinkIcon, Check } from 'lucide-react';

export function CiteThisPage({ title, url }: { title: string; url: string }) {
  const [activeTab, setActiveTab] = useState<'apa' | 'bibtex'>('apa');
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const year = new Date().getFullYear();
  // We extract a slug/id from URL for BibTex key
  const bibtexKey = url.split('/').pop() || 'peptidex';

  const apaCitation = `PeptiDex. (${year}). ${title}. PeptiDex Research Platform. ${url}`;

  const bibtexCitation = `@misc{peptidex_${year}_${bibtexKey},
  author = {{PeptiDex}},
  title = {${title}},
  year = {${year}},
  url = {${url}},
  note = {Accessed: ${new Date().toLocaleDateString('en-US')}}
}`;

  const currentCitation = activeTab === 'apa' ? apaCitation : bibtexCitation;

  const handleCopyCitation = async () => {
    try {
      await navigator.clipboard.writeText(currentCitation);
      setCopiedCitation(true);
      setTimeout(() => setCopiedCitation(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <section className="mb-6 mt-12 pt-8 border-t border-zinc-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Quote className="w-5 h-5 text-violet-400" />
          <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">Cite This Page</h3>
        </div>
        <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800">
          <button
            onClick={() => setActiveTab('apa')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'apa' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            APA 7th
          </button>
          <button
            onClick={() => setActiveTab('bibtex')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'bibtex' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            BibTeX
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900/50">
        <div className="p-4 overflow-x-auto">
          {activeTab === 'apa' ? (
            <p className="text-sm text-zinc-300 leading-relaxed font-serif select-all break-words">
              {apaCitation}
            </p>
          ) : (
            <pre className="text-xs text-emerald-400 font-mono !bg-transparent !p-0 m-0 select-all overflow-x-auto">
              <code>{bibtexCitation}</code>
            </pre>
          )}
        </div>
        
        <div className="flex sm:flex-row flex-col items-center gap-3 p-3 bg-zinc-900/80 border-t border-zinc-800">
          <button
            onClick={handleCopyCitation}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-semibold border border-zinc-700 transition-colors"
          >
            {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedCitation ? 'Copied to Clipboard' : 'Copy Citation'}
          </button>
          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-lg text-xs font-semibold border border-transparent hover:border-zinc-700 transition-colors ml-auto sm:ml-0 sm:mr-auto"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <LinkIcon className="w-3.5 h-3.5" />}
            {copiedLink ? 'Link Copied' : 'Copy Link to Page'}
          </button>
          <span className="text-[10px] text-zinc-500 text-center sm:text-right hidden sm:block">
            For academic and research purposes.
          </span>
        </div>
      </div>
    </section>
  );
}
