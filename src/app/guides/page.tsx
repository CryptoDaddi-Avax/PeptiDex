import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Research Guides — PeptiDex',
  description: 'In-depth peptide research guides: reconstitution protocols, GLP-1 alternatives, and more.',
  alternates: { canonical: 'https://peptidex.app/guides' },
};

const guides = [
  {
    slug: 'reconstitution',
    title: 'Peptide Reconstitution Guide',
    description: 'Step-by-step instructions for reconstituting lyophilized research peptides with bacteriostatic water.',
    emoji: '🧪',
  },
  {
    slug: 'glp1-alternatives',
    title: 'GLP-1 Alternatives Guide',
    description: 'Research compounds beyond Semaglutide and Tirzepatide: Tesofensine, AOD-9604, and other non-incretin approaches.',
    emoji: '💊',
  },
];

export default function GuidesIndexPage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f4f4f5', marginBottom: 8 }}>
        Research <em style={{ color: '#8b5cf6' }}>Guides</em>
      </h1>
      <p style={{ color: '#a1a1aa', fontSize: '1.1rem', marginBottom: 40, maxWidth: 600 }}>
        Comprehensive guides for peptide researchers.
      </p>
      <div style={{ display: 'grid', gap: 16 }}>
        {guides.map(g => (
          <Link key={g.slug} href={`/guides/${g.slug}`} style={{
            display: 'block', padding: '24px', borderRadius: 12,
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            textDecoration: 'none', transition: 'all 0.2s',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>{g.emoji}</div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e4e4e7', margin: 0 }}>{g.title}</h2>
            <p style={{ fontSize: '0.85rem', color: '#71717a', marginTop: 6 }}>{g.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
