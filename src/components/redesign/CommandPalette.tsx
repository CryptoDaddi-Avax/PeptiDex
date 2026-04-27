'use client';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { peptides } from '@/data/peptides';
import { stacks } from '@/data/stacks';
import { goals } from '@/data/goals';
import { vendorProfiles } from '@/data/vendor-comparison';
import './CommandPalette.css';

interface IndexItem {
  type: 'peptide' | 'stack' | 'vendor' | 'study' | 'goal' | 'tool';
  title: string;
  sub: string;
  meta: string;
  tags: string;
  href?: string;
}

// Build search index from real data
function buildIndex(): IndexItem[] {
  const items: IndexItem[] = [];

  // Peptides
  peptides.forEach((p) => {
    items.push({
      type: 'peptide',
      title: p.name,
      sub: `${p.category} · ${p.primary_benefits}`,
      meta: p.category,
      tags: [p.name, ...p.aliases, p.category, p.primary_benefits, p.mechanism].join(' ').toLowerCase(),
      href: `/peptides/${p.slug}`,
    });
  });

  // Stacks
  stacks.forEach((s) => {
    const peptideNames = s.peptides.map((sp) => sp.name).join(' + ');
    items.push({
      type: 'stack',
      title: s.stack_name,
      sub: `${s.peptides.length} peptides · ${peptideNames}`,
      meta: 'Stack',
      tags: [s.stack_name, s.goal, ...s.peptides.map((sp) => sp.name)].join(' ').toLowerCase(),
      href: `/stacks/${s.slug}`,
    });
  });

  // Vendors
  Object.values(vendorProfiles).forEach((v) => {
    items.push({
      type: 'vendor',
      title: v.name,
      sub: `★ ${v.rating} · ${v.purity} purity · ${v.coaStatus}`,
      meta: 'Vendor',
      tags: [v.name, v.purity, v.coaStatus, ...v.testingMethods].join(' ').toLowerCase(),
      href: `/vendors/${v.slug}`,
    });
  });

  // Goals
  goals.forEach((g) => {
    items.push({
      type: 'goal',
      title: g.label,
      sub: g.description,
      meta: 'Goal',
      tags: [g.label, g.description, ...g.stackNames].join(' ').toLowerCase(),
      href: `/best/${g.id}`,
    });
  });

  // Key studies (top 3 per peptide — the most impactful)
  peptides.forEach((p) => {
    p.key_studies.slice(0, 2).forEach((study) => {
      items.push({
        type: 'study',
        title: study.title.length > 60 ? study.title.slice(0, 57) + '…' : study.title,
        sub: `${p.name} · ${study.evidence_level}`,
        meta: study.evidence_level === 'very-strong' || study.evidence_level === 'strong' ? 'RCT' : 'PubMed',
        tags: [study.title, p.name, study.summary, study.evidence_level].join(' ').toLowerCase(),
        href: study.pubmed_url,
      });
    });
  });

  // Static tools
  items.push(
    { type: 'tool', title: 'Cycle Planner', sub: 'Map out your research protocol', meta: 'Tool', tags: 'cycle planner schedule protocol', href: '/tools/cycle-planner' },
    { type: 'tool', title: 'Evidence Dashboard', sub: 'Study count per peptide', meta: 'Tool', tags: 'evidence dashboard studies data', href: '/tools/evidence' },
    { type: 'tool', title: "Beginner's Guide", sub: 'Reconstitution · Pinning · Supplies', meta: 'Guide', tags: "beginner guide new intro reconstitution", href: '/intro' },
    { type: 'tool', title: 'Price Comparison', sub: 'Compare vendor pricing side-by-side', meta: 'Tool', tags: 'price comparison vendor cost', href: '/tools/pricing' },
    { type: 'tool', title: 'Peptide Compare', sub: 'Side-by-side peptide comparison', meta: 'Tool', tags: 'compare peptide vs head to head', href: '/tools/compare' },
  );

  return items;
}

const sectionLabels: Record<string, string> = {
  peptide: 'Peptides', stack: 'Stacks', vendor: 'Vendors',
  goal: 'Goals', study: 'Clinical Studies', tool: 'Tools & Guides',
};
const sectionOrder: string[] = ['peptide', 'stack', 'vendor', 'goal', 'study', 'tool'];

function scoreMatch(item: IndexItem, q: string): number {
  if (!q) return 1;
  const query = q.toLowerCase();
  const title = item.title.toLowerCase();
  if (title === query) return 120;
  if (title.startsWith(query)) return 100;
  if (title.includes(query)) return 80;
  if (item.tags.includes(query)) return 60;
  if (item.sub.toLowerCase().includes(query)) return 40;
  // Fuzzy — check if all query chars exist in order
  let qi = 0;
  for (let i = 0; i < item.tags.length && qi < query.length; i++) {
    if (item.tags[i] === query[qi]) qi++;
  }
  if (qi === query.length) return 20;
  return 0;
}

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const INDEX = useMemo(() => buildIndex(), []);

  const results = useMemo(() =>
    INDEX
      .map((item) => ({ item, score: scoreMatch(item, query) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.item),
    [INDEX, query]
  );

  // Group results by type
  const grouped = useMemo(() => {
    const g: Record<string, { item: IndexItem; globalIndex: number }[]> = {};
    results.forEach((item, i) => {
      if (!g[item.type]) g[item.type] = [];
      g[item.type].push({ item, globalIndex: i });
    });
    return g;
  }, [results]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setActiveIdx(0);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = results[activeIdx];
      if (selected?.href) {
        if (selected.href.startsWith('http')) {
          window.open(selected.href, '_blank');
        } else {
          window.location.href = selected.href;
        }
      }
      onClose();
    }
    else if (e.key === 'Escape') { onClose(); }
  }, [results, activeIdx, onClose]);

  if (!isOpen) return null;

  const maxPerSection = query ? 6 : 4;

  return (
    <div className={`palette-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <div className="palette-input-wrap">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="palette-input"
            placeholder="Search peptides, studies, vendors, or stacks…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
          />
          <button className="palette-close" onClick={onClose}>esc</button>
        </div>

        <div className="palette-results">
          {results.length === 0 ? (
            <div className="palette-empty">
              <p>No matches.</p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em' }}>
                Try: &ldquo;BPC-157&rdquo;, &ldquo;fat loss&rdquo;, or &ldquo;COA&rdquo;
              </p>
            </div>
          ) : (
            sectionOrder.map((type) => {
              if (!grouped[type]) return null;
              return (
                <div key={type}>
                  <div className="palette-section">{sectionLabels[type]}</div>
                  {grouped[type].slice(0, maxPerSection).map(({ item, globalIndex }) => (
                    <div
                      key={`${item.type}-${item.title}`}
                      className={`palette-item ${globalIndex === activeIdx ? 'active' : ''}`}
                      onMouseEnter={() => setActiveIdx(globalIndex)}
                      onClick={() => {
                        if (item.href) {
                          if (item.href.startsWith('http')) window.open(item.href, '_blank');
                          else window.location.href = item.href;
                        }
                        onClose();
                      }}
                    >
                      <div className="palette-item-icon">§</div>
                      <div className="palette-item-content">
                        <div className="palette-item-title">{item.title}</div>
                        <div className="palette-item-sub">{item.sub}</div>
                      </div>
                      <div className="palette-item-meta">{item.meta}</div>
                    </div>
                  ))}
                </div>
              );
            })
          )}
        </div>

        <div className="palette-footer">
          <div className="hint"><span className="key">↑</span><span className="key">↓</span>Navigate</div>
          <div className="hint"><span className="key">↵</span>Open</div>
          <div className="hint"><span className="key">esc</span>Close</div>
          <div style={{ marginLeft: 'auto' }}>
            {results.length} result{results.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </div>
  );
}
