'use client';
import { useEffect, useRef, useState } from 'react';
import './Loader.css';

const SESSION_KEY = 'peptidex_loaded';

/**
 * Loader — full-screen entrance animation matching v13 reference.
 * sessionStorage-gated: shows once per session, then skips.
 * Adds `body.loaded` on exit so the nav molecule draw-in fires.
 */
export default function Loader() {
  const [state, setState] = useState<'idle' | 'animating' | 'exiting' | 'hidden'>('idle');
  const captionRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Already loaded this session — skip entirely
    let seen = false;
    try { seen = sessionStorage.getItem(SESSION_KEY) === '1'; } catch {}

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    function markSeen() {
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch {}
    }

    function exit() {
      setState('exiting');
      document.body.classList.add('loaded');
      const fadeMs = reduced ? 260 : 600;
      const t = setTimeout(() => setState('hidden'), fadeMs + 40);
      timersRef.current.push(t);
      markSeen();
    }

    if (seen) {
      setState('hidden');
      document.body.classList.add('loaded');
      return;
    }

    if (reduced) {
      // Static loader, brief hold, then reveal
      setState('animating');
      if (captionRef.current) captionRef.current.textContent = 'ready.';
      const t = setTimeout(exit, 300);
      timersRef.current.push(t);
      return;
    }

    // Full animation sequence
    setState('animating');

    // Caption ticks
    const captions = [
      { t: 0,    text: 'indexing compounds…' },
      { t: 560,  text: 'verifying sources…' },
      { t: 1180, text: 'ready.' },
    ];
    captions.forEach(c => {
      const t1 = setTimeout(() => {
        const el = captionRef.current;
        if (!el) return;
        el.style.opacity = '0';
        const t2 = setTimeout(() => {
          el.textContent = c.text;
          el.style.opacity = '1';
        }, 160);
        timersRef.current.push(t2);
      }, c.t);
      timersRef.current.push(t1);
    });

    // Bar fill starts +300ms, runs 1100ms → done ~1400ms. Exit just after.
    const tExit = setTimeout(exit, 1480);
    timersRef.current.push(tExit);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  if (state === 'hidden') return null;

  const cls = [
    'loader',
    state === 'animating' ? 'is-animating' : '',
    state === 'exiting' ? 'is-animating is-exiting' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} id="loader" role="status" aria-label="Loading Peptidex">
      <div className="loader-stage">
        <svg className="loader-mark" viewBox="0 0 200 82" fill="none" aria-hidden="true">
          <line className="lm-bond" x1="26" y1="54" x2="74" y2="28" />
          <line className="lm-bond" x1="74" y1="28" x2="122" y2="54" />
          <line className="lm-bond" x1="122" y1="54" x2="170" y2="28" />
          <circle className="lm-node lime" cx="26" cy="54" r="13" />
          <circle className="lm-node paper" cx="74" cy="28" r="13" />
          <circle className="lm-node paper" cx="122" cy="54" r="13" />
          <circle className="lm-node lime" cx="170" cy="28" r="13" />
        </svg>
        <div className="loader-wordmark">Peptidex</div>
        <div className="loader-progress"><div className="loader-bar" /></div>
        <div className="loader-caption" ref={captionRef}>indexing compounds…</div>
      </div>
    </div>
  );
}
