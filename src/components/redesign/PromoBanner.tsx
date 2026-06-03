'use client';

import { useState, useEffect, useRef } from 'react';
import { PRIMARY_PROMO } from '@/lib/promos/config';
import { buildAffiliateUrl, AFFILIATE_LINK_ATTRS } from '@/lib/promos/affiliateUrl';
import {
  trackBannerShown,
  trackBannerDismissed,
} from '@/lib/analytics/promo';
import {
  trackPromoView,
  trackPromoCopy,
  trackPromoClick,
} from '@/lib/analytics/promo';
import './PromoBanner.css';

// ── Constants ─────────────────────────────────────────────────────────────────

const DISMISSED_KEY = 'peptidex_banner_dismissed';
const PROMO_KEY_STORAGE = 'peptidex_banner_promo_key';
const DISMISS_DURATION_DAYS = 7;

/** Routes where the banner is suppressed */
const SUPPRESSED_PATHS = ['/admin', '/saved', '/authors', '/about', '/legal', '/corrections', '/editorial-process'];

// ── Helpers ───────────────────────────────────────────────────────────────────

function isSuppressedPath(path: string): boolean {
  return SUPPRESSED_PATHS.some((p) => path.startsWith(p));
}

function isDismissed(): boolean {
  try {
    const stored = localStorage.getItem(DISMISSED_KEY);
    const storedKey = localStorage.getItem(PROMO_KEY_STORAGE);
    if (!stored) return false;
    if (storedKey !== PRIMARY_PROMO.code) return false;
    const dismissedAt = new Date(stored).getTime();
    return Date.now() - dismissedAt < DISMISS_DURATION_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function setDismissed() {
  try {
    localStorage.setItem(DISMISSED_KEY, new Date().toISOString());
    localStorage.setItem(PROMO_KEY_STORAGE, PRIMARY_PROMO.code);
  } catch {}
}

function getIsReturnVisitor(): boolean {
  try {
    return parseInt(localStorage.getItem('peptidex_visit_count') ?? '0', 10) >= 2;
  } catch {
    return false;
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * PromoBanner — v13-restyled sticky discount banner.
 * Same data source (PRIMARY_PROMO from lib/promos/config, sourced from vendors.ts),
 * same dismiss logic, same analytics. Reskinned from amber/gold to v13 lime/ink.
 */
export default function PromoBanner() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const viewFired = useRef(false);

  useEffect(() => {
    setMounted(true);
    if (!PRIMARY_PROMO.isActive) return;
    if (isSuppressedPath(window.location.pathname)) return;
    if (isDismissed()) return;

    setVisible(true);
    // Tell CSS about combined bars height
    document.documentElement.style.setProperty('--banner-h', '40px');
    trackBannerShown({
      vendor: PRIMARY_PROMO.gaKey,
      code: PRIMARY_PROMO.code,
      surface: 'sticky_banner',
    });
  }, []);

  // Fire promo view event once
  useEffect(() => {
    if (!visible || viewFired.current) return;
    viewFired.current = true;
    trackPromoView({
      vendor: PRIMARY_PROMO.gaKey,
      code: PRIMARY_PROMO.code,
      surface: 'sticky_banner',
      is_return_visitor: getIsReturnVisitor(),
    });
  }, [visible]);

  function handleDismiss() {
    setVisible(false);
    document.documentElement.style.setProperty('--banner-h', '0px');
    setDismissed();
    trackBannerDismissed({
      vendor: PRIMARY_PROMO.gaKey,
      code: PRIMARY_PROMO.code,
      surface: 'sticky_banner',
    });
  }

  function handleCopy() {
    navigator.clipboard.writeText(PRIMARY_PROMO.code).then(() => {
      setCopied(true);
      trackPromoCopy({
        vendor: PRIMARY_PROMO.gaKey,
        code: PRIMARY_PROMO.code,
        surface: 'sticky_banner',
        is_return_visitor: getIsReturnVisitor(),
      });
      sessionStorage.setItem('peptidex_promo_clicked', 'true');
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleShopClick() {
    trackPromoClick({
      vendor: PRIMARY_PROMO.gaKey,
      code: PRIMARY_PROMO.code,
      surface: 'sticky_banner',
      is_return_visitor: getIsReturnVisitor(),
    });
    sessionStorage.setItem('peptidex_promo_clicked', 'true');
  }

  if (!mounted || !visible) return null;

  const shopUrl = buildAffiliateUrl(PRIMARY_PROMO, 'sticky_banner');

  return (
    <div className="promo-banner" role="region" aria-label="Site-wide promotion">
      <div className="promo-inner">
        {/* Left: icon + message */}
        <div className="promo-left">
          {/* Tag icon (inline SVG to avoid lucide dependency in redesign) */}
          <svg className="promo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" />
            <line x1="7" x2="7.01" y1="7" y2="7" />
          </svg>

          {/* Desktop copy */}
          <span className="promo-desktop">
            Save{' '}
            <span className="promo-highlight">{PRIMARY_PROMO.discountPercent}%</span>
            {' '}on COA-verified peptides at{' '}
            <a
              href={shopUrl}
              onClick={handleShopClick}
              {...AFFILIATE_LINK_ATTRS}
              className="promo-vendor-link"
            >
              {PRIMARY_PROMO.vendorName}
            </a>
            {' '}—{' '}
          </span>

          {/* Mobile copy */}
          <span className="promo-mobile">
            <span className="promo-highlight">{PRIMARY_PROMO.discountPercent}% off</span>
            {' '}at {PRIMARY_PROMO.vendorName} —{' '}
          </span>

          {/* Code + copy */}
          <span className="promo-code-group">
            <span className="promo-code">{PRIMARY_PROMO.code}</span>
            <button
              onClick={handleCopy}
              className="promo-copy-btn"
              aria-label={`Copy code ${PRIMARY_PROMO.code} — ${PRIMARY_PROMO.discountPercent}% off at ${PRIMARY_PROMO.vendorName}`}
            >
              {copied ? (
                <>
                  <svg className="copied-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <span style={{ color: '#34d399' }}>Copied!</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                  Copy
                </>
              )}
            </button>
          </span>

          {/* Shop arrow (desktop only) */}
          <a
            href={shopUrl}
            onClick={handleShopClick}
            {...AFFILIATE_LINK_ATTRS}
            className="promo-shop"
          >
            Shop →
          </a>
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="promo-dismiss"
          aria-label="Dismiss promotion banner"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
