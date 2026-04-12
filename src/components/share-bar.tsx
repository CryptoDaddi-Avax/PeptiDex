'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Facebook, Link as LinkIcon, Check } from 'lucide-react';

export function ShareBar({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-y border-zinc-800">
      <div className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
        Share this article
      </div>
      <div className="flex items-center gap-3">
        {/* Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-500/10 transition-colors"
          aria-label="Share on X / Twitter"
        >
          <Twitter className="w-4 h-4" />
        </a>

        {/* Reddit */}
        <a
          href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-orange-500 hover:border-orange-500/50 hover:bg-orange-500/10 transition-colors"
          aria-label="Share on Reddit"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.505 1.12-.835 2.72-1.385 4.475-1.472l.859-4.032c.03-.122.148-.204.275-.204.015 0 .03 0 .046.002l2.846.598A1.246 1.246 0 0 1 17.01 4.744zm-7.617 8.35c0-.756-.612-1.368-1.368-1.368-.756 0-1.368.612-1.368 1.368 0 .756.612 1.368 1.368 1.368.756 0 1.368-.612 1.368-1.368zm6.541 2.378c-.766.766-2.434.823-3.934.823-1.5 0-3.168-.057-3.934-.823-.178-.178-.178-.466 0-.644.178-.178.466-.178.644 0 .493.493 1.839.553 3.29.553 1.45 0 2.797-.06 3.29-.553.178-.178.466-.178.644 0 .178.178.178.466 0 .644zm-1.173-1.01c-.756 0-1.368-.612-1.368-1.368 0-.756.612-1.368 1.368-1.368.756 0 1.368.612 1.368 1.368 0 .756-.612 1.368-1.368 1.368z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-blue-500 hover:border-blue-600/50 hover:bg-blue-600/10 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-blue-600 hover:border-blue-700/50 hover:bg-blue-700/10 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`w-10 h-10 rounded-full bg-zinc-900 border flex items-center justify-center transition-colors ${
            copied ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' : 'border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
          }`}
          aria-label="Copy link"
        >
          {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
