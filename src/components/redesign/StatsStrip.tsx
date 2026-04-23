'use client';
import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (!ref.current) return;

    // Reveal animation: add 'in' class when stat comes into view
    const revealEls = ref.current.querySelectorAll<HTMLElement>('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        (e.target as HTMLElement).classList.add('in');
        revealObserver.unobserve(e.target);
      });
    }, { threshold: 0.2 });
    revealEls.forEach((el) => revealObserver.observe(el));

    // Count-up animation: animate numbers when visible
    const countEls = ref.current.querySelectorAll<HTMLElement>('[data-count]');
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const target = parseInt(el.dataset.count || '0');
        const suffix = el.dataset.suffix || '';
        const start = performance.now();
        const duration = 1400;
        function tick(now: number) {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * eased);
          el.innerHTML = `${current}<em>${suffix}</em>`;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    countEls.forEach((el) => countObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      countObserver.disconnect();
    };
  }, []);

  return (
    <section className="stats" ref={ref}>
      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat-num" data-count={s.count} data-suffix={s.suffix}>
              0<em>{s.suffix}</em>
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
