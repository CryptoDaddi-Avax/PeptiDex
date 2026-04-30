'use client';
import { useEffect, useState, useCallback } from 'react';
import { useSavedItems } from '@/hooks/useSavedItems';
import './Navigation.css';

export default function Navigation({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const [shrunk, setShrunk] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useSavedItems();

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleMobile = () => {
    if (mobileOpen) {
      closeMobile();
    } else {
      setMobileOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  // Auto-close mobile menu when viewport becomes desktop-width
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 769px)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) closeMobile();
    };
    mql.addEventListener('change', handler);
    // Also close immediately if already desktop
    if (mql.matches && mobileOpen) closeMobile();
    return () => mql.removeEventListener('change', handler);
  }, [mobileOpen, closeMobile]);

  return (
    <>
      <nav className={shrunk ? 'nav-shrunk' : ''}>
        <div className="nav-logo">
          <span className="mark" />
          Pepti<em>Dex</em>
        </div>
        <ul className="nav-links">
          <li><a href="/library">Library</a></li>
          <li><a href="/stacks">Stacks</a></li>
          <li><a href="/vendors">Vendors</a></li>
          <li><a href="/tools/evidence">Research</a></li>
          <li><a href="/blog">Journal</a></li>
          <li>
            <a href="/saved" style={{ position: 'relative' }}>
              Saved
              {count > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -6,
                  right: -14,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  color: 'var(--bg)',
                  fontSize: 10,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--mono)',
                }}>{count}</span>
              )}
            </a>
          </li>
        </ul>
        <div className="nav-right">
          <button className="search-trigger" onClick={onSearchOpen}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span className="placeholder">Search peptides, studies, vendors…</span>
            <span className="kbd">⌘K</span>
          </button>
          {/* Mobile search button — 44pt touch target, visible ≤768px */}
          <button
            className="mobile-search-btn"
            onClick={onSearchOpen}
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
          <a href="/intro" className="nav-cta">Start</a>
          <button
            className={`mobile-menu-btn ${mobileOpen ? 'open' : ''}`}
            onClick={toggleMobile}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer — only render when open */}
      {mobileOpen && (
      <div className="mobile-menu open">
        <ul className="mobile-menu-links">
          {[
            { label: 'Library', href: '/library' },
            { label: 'Stacks', href: '/stacks' },
            { label: 'Vendors', href: '/vendors' },
            { label: 'Research', href: '/tools/evidence' },
            { label: 'Journal', href: '/blog' },
          ].map(({ label, href }, i) => (
            <li key={label}>
              <a href={href} onClick={closeMobile}>
                <span>{label}</span>
                <span className="num">§ 0{i + 1}</span>
              </a>
            </li>
          ))}
          <li>
            <a href="/saved" onClick={closeMobile}>
              <span>Saved{count > 0 ? ` (${count})` : ''}</span>
              <span className="num">§ 06</span>
            </a>
          </li>
          <li>
            <a href="/intro" onClick={closeMobile}>
              <span><em>Subscribe</em></span>
              <span className="num">§ 07</span>
            </a>
          </li>
        </ul>
        <div className="mobile-menu-footer">
          <div className="meta">§ Search the index</div>
          <button className="search-mobile" onClick={() => { closeMobile(); setTimeout(() => onSearchOpen?.(), 300); }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            <span>Peptides, studies, vendors…</span>
          </button>
          <div className="meta" style={{ marginTop: 16 }}>
            Vol. I · Edition 2026 · <span style={{ color: 'var(--gold)' }}>Independent</span>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

