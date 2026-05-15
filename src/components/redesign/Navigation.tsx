'use client';
import { useEffect, useState, useCallback } from 'react';
import { Bookmark } from 'lucide-react';
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
        <a href="/" className="nav-logo">
          <span className="mark" />
          Pepti<em>Dex</em>
        </a>
        <ul className="nav-links">
          <li><a href="/library">Library</a></li>
          <li><a href="/stacks">Stacks</a></li>
          <li><a href="/tools">Tools</a></li>
          <li><a href="/vendors">Vendors</a></li>
          <li><a href="/coupon-codes">Coupons</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/about/methodology">About</a></li>
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
          {/* Saved bookmark icon — shows count badge */}
          <a href="/saved" className="nav-saved-icon" aria-label={`Saved items (${count})`}>
            <Bookmark size={18} />
            {count > 0 && (
              <span className="nav-saved-badge">{count}</span>
            )}
          </a>
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
            { label: 'Tools', href: '/tools' },
            { label: 'Vendors', href: '/vendors' },
            { label: 'Coupons', href: '/coupon-codes' },
            { label: 'Blog', href: '/blog' },
            { label: 'About', href: '/about/methodology' },
          ].map(({ label, href }, i) => (
            <li key={label}>
              <a href={href} onClick={closeMobile}>
                <span>{label}</span>
                <span className="num">§ 0{i + 1}</span>
              </a>
            </li>
          ))}
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
