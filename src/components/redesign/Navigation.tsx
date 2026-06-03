'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import './Navigation.css';

export default function Navigation({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── 1. Scroll state ── */
  useEffect(() => {
    let last = 0;
    let trailing: ReturnType<typeof setTimeout> | null = null;
    const threshold = () => (window.innerHeight || document.documentElement.clientHeight) * 0.8;

    function update() {
      last = Date.now();
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      setScrolled(y > threshold());
    }
    function onScroll() {
      const now = Date.now();
      if (now - last >= 80) {
        update();
      } else if (!trailing) {
        trailing = setTimeout(() => { trailing = null; update(); }, 80 - (now - last));
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (trailing) clearTimeout(trailing);
    };
  }, []);

  /* ── 2. Mobile menu ── */
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu(); };
    const onResize = () => { if (window.innerWidth > 900) closeMenu(); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, [menuOpen, closeMenu]);

  /* ── 3. Body .loaded for draw-in animation ── */
  useEffect(() => {
    document.body.classList.add('loaded');
  }, []);

  const navCls = [
    'site-nav',
    scrolled ? 'scrolled' : '',
    menuOpen ? 'menu-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <header className={navCls} id="siteNav" ref={navRef}>
      <div className="nav-inner">
        {/* ── Logo + molecule mark ── */}
        <a className="nav-logo" href="/" aria-label="Peptidex home">
          <svg className="nav-mark" viewBox="0 0 70 28" fill="none" aria-hidden="true">
            <line className="nm-bond" x1="10" y1="19" x2="27" y2="9" />
            <line className="nm-bond" x1="27" y1="9" x2="44" y2="19" />
            <line className="nm-bond" x1="44" y1="19" x2="60" y2="9" />
            <circle className="nm-node lime"  cx="10" cy="19" r="5" />
            <circle className="nm-node paper" cx="27" cy="9"  r="5" />
            <circle className="nm-node paper" cx="44" cy="19" r="5" />
            <circle className="nm-node lime"  cx="60" cy="9"  r="5" />
          </svg>
          <span className="nav-wordmark">Peptidex</span>
        </a>

        {/* ── Center links ── */}
        <nav className="nav-links" aria-label="Primary">
          <a href="/library">Library</a>
          <a href="/stacks">Stacks</a>
          <a href="/tools">Tools</a>
          <a href="/vendors">Vendors</a>
          <a href="/coupon-codes">Coupons</a>
          <a href="/blog">Blog</a>
          <a href="/saved">Saved</a>
        </nav>

        {/* ── Right actions ── */}
        <div className="nav-actions">
          <button className="nav-search" type="button" aria-label="Search" onClick={onSearchOpen}>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span className="label-text">Search</span>
            <span className="kbd">⌘K</span>
          </button>
          <span className="magnetic">
            <a className="btn-inner pill-btn pill-lime" href="/intro">
              Start
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </span>
          <button
            className={`nav-burger${menuOpen ? ' open' : ''}`}
            id="navBurger"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(prev => !prev)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* ── Mobile slide-down menu (always in DOM, CSS-driven visibility) ── */}
      <div className="nav-mobile">
        <a href="/library" onClick={closeMenu}>Library</a>
        <a href="/stacks" onClick={closeMenu}>Stacks</a>
        <a href="/tools" onClick={closeMenu}>Tools</a>
        <a href="/vendors" onClick={closeMenu}>Vendors</a>
        <a href="/coupon-codes" onClick={closeMenu}>Coupons</a>
        <a href="/blog" onClick={closeMenu}>Blog</a>
        <a href="/saved" onClick={closeMenu}>Saved</a>
        <span className="nav-mobile-cta">
          <a className="btn-inner pill-btn pill-lime" href="/intro" onClick={closeMenu}>
            Start
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </span>
      </div>
    </header>
  );
}
