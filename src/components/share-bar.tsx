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

  const btnStyle: React.CSSProperties = {
    width: 40, height: 40,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg-soft)',
    border: '1px solid var(--line)',
    color: 'var(--ink-dim)',
    cursor: 'pointer',
    transition: 'all 0.3s',
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'row', alignItems: 'center',
      justifyContent: 'space-between', gap: 16,
      padding: '16px 0',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
    }}>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: 'var(--gold)',
      }}>
        Share this article
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          style={btnStyle}
          aria-label="Share on X / Twitter"
        >
          <Twitter style={{ width: 14, height: 14 }} />
        </a>
        <a
          href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          style={btnStyle}
          aria-label="Share on Reddit"
        >
          <svg style={{ width: 14, height: 14 }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.505 1.12-.835 2.72-1.385 4.475-1.472l.859-4.032c.03-.122.148-.204.275-.204.015 0 .03 0 .046.002l2.846.598A1.246 1.246 0 0 1 17.01 4.744zm-7.617 8.35c0-.756-.612-1.368-1.368-1.368-.756 0-1.368.612-1.368 1.368 0 .756.612 1.368 1.368 1.368.756 0 1.368-.612 1.368-1.368zm6.541 2.378c-.766.766-2.434.823-3.934.823-1.5 0-3.168-.057-3.934-.823-.178-.178-.178-.466 0-.644.178-.178.466-.178.644 0 .493.493 1.839.553 3.29.553 1.45 0 2.797-.06 3.29-.553.178-.178.466-.178.644 0 .178.178.178.466 0 .644zm-1.173-1.01c-.756 0-1.368-.612-1.368-1.368 0-.756.612-1.368 1.368-1.368.756 0 1.368.612 1.368 1.368 0 .756-.612 1.368-1.368 1.368z" />
          </svg>
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          style={btnStyle}
          aria-label="Share on LinkedIn"
        >
          <Linkedin style={{ width: 14, height: 14 }} />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          style={btnStyle}
          aria-label="Share on Facebook"
        >
          <Facebook style={{ width: 14, height: 14 }} />
        </a>
        <button
          onClick={handleCopyLink}
          style={{
            ...btnStyle,
            ...(copied ? { borderColor: 'var(--gold)', color: 'var(--gold)', background: 'rgba(201,169,97,0.08)' } : {}),
          }}
          aria-label="Copy link"
        >
          {copied ? <Check style={{ width: 14, height: 14 }} /> : <LinkIcon style={{ width: 14, height: 14 }} />}
        </button>
      </div>
    </div>
  );
}
