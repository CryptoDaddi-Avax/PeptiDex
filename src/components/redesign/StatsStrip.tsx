'use client';
import { useEffect, useRef, useState } from 'react';
import { peptides } from '@/data/peptides';
import { stacks } from '@/data/stacks';
import './StatsStrip.css';

// Count total unique studies across all peptides
const totalStudies = peptides.reduce((sum, p) => sum + p.key_studies.length, 0);

const stats = [
  { count: peptides.length, suffix: '+', label: 'Research Peptides' },
  { count: stacks.length, suffix: '', label: 'Curated Stacks' },
  { count: totalStudies, suffix: '+', label: 'Peer-Reviewed Studies' },
  { count: 99, suffix: '%', label: 'COA Purity Threshold' },
];

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  // Initialize as null so SSR renders nothing — avoids mismatch when
  // the animation resets to 0 on first client paint.
  const [counts, setCounts] = useState<number[] | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Set real values immediately on mount so non-visible strip shows numbers
    setCounts(stats.map((s) => s.count));

    if (!ref.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated.current) return;
          hasAnimated.current = true;
          observer.disconnect();

          // Animate from 0 to final — entirely client-side, no SSR involved
          setCounts(stats.map(() => 0));

          const start = performance.now();
          const duration = 1400;

          function tick(now: number) {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounts(stats.map((s) => Math.round(s.count * eased)));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" ref={ref}>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat" key={s.label}>
            <div className="stat-num" suppressHydrationWarning>
              {counts !== null ? counts[i] : s.count}<em>{s.suffix}</em>
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
