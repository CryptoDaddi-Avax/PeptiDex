'use client';
import { useEffect, useRef } from 'react';
import './ScrollProgress.css';

/**
 * ScrollProgress — horizontal lime bar fixed at top of viewport.
 * Fills proportionally as user scrolls. Uses passive scroll listener
 * + requestAnimationFrame for smooth performance.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    const bar = barRef.current as HTMLDivElement;

    let needsUpdate = true;
    let rafId: number | null = null;

    function calc() {
      const d = document.documentElement;
      const max = d.scrollHeight - window.innerHeight;
      const y = window.pageYOffset || d.scrollTop || 0;
      let p = max > 0 ? y / max : 0;
      if (p < 0) p = 0;
      else if (p > 1) p = 1;
      bar.style.transform = `scaleX(${p.toFixed(4)})`;
      needsUpdate = false;
      rafId = null;
    }

    function poke() {
      if (!needsUpdate) {
        needsUpdate = true;
        rafId = requestAnimationFrame(calc);
      }
    }

    window.addEventListener('scroll', poke, { passive: true });
    window.addEventListener('resize', poke);
    calc();

    return () => {
      window.removeEventListener('scroll', poke);
      window.removeEventListener('resize', poke);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="scroll-progress" ref={barRef} aria-hidden="true" />
  );
}
