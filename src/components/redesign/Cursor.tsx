'use client';
import { useEffect, useRef, useState } from 'react';
import './Cursor.css';

/**
 * Cursor — custom dot + trailing ring, matching v13 interaction.js.
 * Only renders on fine-pointer (non-touch) devices.
 * Respects prefers-reduced-motion: completely hidden.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (!dotRef.current || !ringRef.current) return;
    const d = dotRef.current as HTMLDivElement;
    const r = ringRef.current as HTMLDivElement;

    document.body.classList.add('has-custom-cursor');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;
    let downFrames = 0;
    let rafId: number | null = null;
    let running = false;

    function frame() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      const ts = targetScale * (downFrames > 0 ? 0.82 : 1);
      scale += (ts - scale) * 0.2;
      d.style.transform = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;
      r.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%) scale(${scale.toFixed(3)})`;
      if (downFrames > 0) downFrames--;

      const needMore =
        Math.abs(mx - rx) > 0.1 ||
        Math.abs(my - ry) > 0.1 ||
        Math.abs(ts - scale) > 0.005 ||
        downFrames > 0;

      if (needMore) {
        rafId = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    }

    function wake() {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(frame);
      }
    }

    function updateState(target: EventTarget | null) {
      if (!(target instanceof HTMLElement)) return;
      const link = target.closest('a, button, .pill-btn, [role="button"], .magnetic');
      const glass = target.closest('.glass, .glass-light, .card-shell, .price-card');
      const light = target.closest('[data-cursor="light"], .glass-light, .tier-light, .card-shell-light');

      r.classList.toggle('is-link', !!link);
      r.classList.toggle('is-glass', !!glass && !link);
      r.classList.toggle('on-light', !!light);
      d.classList.toggle('on-light', !!light);

      targetScale = link ? 1.8 : (glass ? 1.4 : 1);
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      d.style.transform = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;
      updateState(e.target);
      wake();
    };
    const onDown = () => { downFrames = 9; wake(); };
    const onLeave = () => { d.style.opacity = '0'; r.style.opacity = '0'; };
    const onEnter = () => { d.style.opacity = '1'; r.style.opacity = '1'; };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    wake();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      if (rafId !== null) cancelAnimationFrame(rafId);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true">
        <span className="cursor-label">explore</span>
      </div>
    </>
  );
}
