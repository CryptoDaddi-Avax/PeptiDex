import type { Metadata } from 'next';
import Link from 'next/link';
import { goalPages } from '@/data/goal-pages';

export const metadata: Metadata = {
  title: 'Best Peptides by Goal — Research-Backed Protocols | PeptiDex',
  description: 'Browse curated peptide stacks organized by research goal: fat loss, muscle growth, injury recovery, longevity, cognitive enhancement, and more.',
  alternates: { canonical: 'https://peptidex.app/best' },
};

export default function BestIndexPage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f4f4f5', marginBottom: 8 }}>
        Best Peptides by <em style={{ color: '#8b5cf6' }}>Goal</em>
      </h1>
      <p style={{ color: '#a1a1aa', fontSize: '1.1rem', marginBottom: 40, maxWidth: 600 }}>
        Research-backed peptide protocols organized by health and performance objective.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {goalPages.map(g => (
          <Link key={g.slug} href={`/best/${g.slug}`} style={{
            display: 'block', padding: '24px', borderRadius: 12,
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            textDecoration: 'none', transition: 'all 0.2s',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>{g.emoji}</div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e4e4e7', margin: 0 }}>
              {g.h1.replace(/^Best Peptides for\s*/i, '')}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#71717a', marginTop: 6 }}>
              {g.peptideSlugs.length} peptides · {g.stackNames.length} stack{g.stackNames.length !== 1 ? 's' : ''}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
