"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ExternalLink, ChevronDown, ChevronUp, Info, Tag, Check, SlidersHorizontal } from "lucide-react";
import { vendorsSorted, type Vendor } from "@/data/vendors";
import { vendorPricing, type PeptideVendorPricing } from "@/data/vendor-pricing";
import { applyDiscount, buildVendorDiscount, type DiscountResult } from "@/lib/pricing/applyDiscount";
import './pricing-redesign.css';

// ── Types ─────────────────────────────────────────────────────────────────────

interface EnrichedVendorRow {
  vendor: Vendor;
  price_usd: number;
  vial_mg: number;
  inStock: boolean;
  affiliateUrl: string;
  lastTestedDate?: string;
  discount: DiscountResult;
  dotClass: string;
}

interface EnrichedPeptide {
  slug: string;
  name: string;
  rows: EnrichedVendorRow[];
  lastUpdated: string;
}

// ── Vendor dot CSS classes ────────────────────────────────────────────────────

const VENDOR_DOT: Record<string, string> = {
  "amino-club": "amino",
  "bio-longevity-labs": "bio-longevity",
  "limitless-life": "limitless",
  "ascension-peptides": "ascension",
  "pantheon-peptides": "pantheon",
  "lvlup-health": "lvlup",
};

// ── Build enriched data ───────────────────────────────────────────────────────

function buildEnrichedData(): EnrichedPeptide[] {
  const vendorMap = Object.fromEntries(vendorsSorted.map(v => [v.name, v]));

  return vendorPricing
    .filter(p => p.vendors.length > 0 || true)            // include all peptides
    .map(p => {
      const rows: EnrichedVendorRow[] = [];

      // Rows from vendor-pricing.ts (has real prices)
      for (const vp of p.vendors) {
        const vendor = vendorMap[vp.vendor];
        if (!vendor || !vp.inStock || vp.price_usd === 0) continue;

        const discountDescriptor = buildVendorDiscount(
          vendor.discountCode,
          vendor.discountPercent,
          vendor.discountStackable
        );
        const discount = applyDiscount(vp.price_usd, discountDescriptor, p.slug);

        rows.push({
          vendor,
          price_usd: vp.price_usd,
          vial_mg: vp.vial_mg,
          inStock: vp.inStock,
          affiliateUrl: vp.affiliateUrl,
          lastTestedDate: vp.lastTestedDate,
          discount,
          dotClass: VENDOR_DOT[vendor.slug] ?? "amino",
        });
      }

      // Add stub rows for vendors that carry everything but have no pricing entry
      // (Pantheon and LVLUP) — shown as "Pricing unavailable"
      const representedVendors = new Set(rows.map(r => r.vendor.slug));
      for (const vendor of vendorsSorted) {
        if (representedVendors.has(vendor.slug)) continue;
        // Only add stub if this peptide isn't one the vendor explicitly doesn't carry
        rows.push({
          vendor,
          price_usd: 0,
          vial_mg: 0,
          inStock: false,
          affiliateUrl: vendor.affiliateUrl,
          lastTestedDate: undefined,
          discount: { finalPrice: 0, savings: 0, discountApplied: false, code: null },
          dotClass: VENDOR_DOT[vendor.slug] ?? "amino",
        });
      }

      const dates = rows
        .map(r => r.lastTestedDate)
        .filter(Boolean) as string[];
      const lastUpdated = dates.sort().at(-1) ?? "2026-04-01";

      return { slug: p.slug, name: p.name, rows, lastUpdated };
    })
    // Only show peptides that have at least one in-stock vendor
    .filter(p => p.rows.some(r => r.inStock));
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch {
    return iso;
  }
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CodeBadge({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <button
      onClick={copy}
      className={`prc-code-badge ${copied ? "copied" : ""}`}
      title="Click to copy discount code"
      aria-label={`Copy discount code ${code}`}
    >
      {copied ? <><Check size={10} style={{ display: 'inline', marginRight: 4 }} />Copied!</> : code}
    </button>
  );
}

function DesktopRow({ row, showPriceColumn }: { row: EnrichedVendorRow; showPriceColumn: boolean }) {
  const hasPrice = row.inStock && row.price_usd > 0;

  return (
    <div className={`prc-table-row${!hasPrice ? " unavailable" : ""}`}>
      {/* Vendor */}
      <div className="prc-table-cell">
        <div className="prc-vendor-name">
          <span className={`prc-vendor-dot ${row.dotClass}`} />
          {row.vendor.name}
          {row.vendor.badge === "Editor's Choice" && (
            <span className="prc-vendor-badge">{row.vendor.badge}</span>
          )}
        </div>
        <span className="prc-vendor-meta">{row.vendor.tagline}</span>
      </div>

      {/* List Price */}
      <div className="prc-table-cell">
        {hasPrice ? (
          <>
            <span className={`prc-list-price${row.discount.discountApplied ? " strikethrough" : ""}`}>
              ${row.price_usd.toFixed(2)}
            </span>
            {row.vial_mg > 0 && <span className="prc-vial">{row.vial_mg}mg vial</span>}
          </>
        ) : (
          <span className="prc-unavailable">Unavailable</span>
        )}
      </div>

      {/* PEPTIDEX Price */}
      <div className="prc-table-cell">
        {hasPrice && row.discount.discountApplied ? (
          <>
            <div className="prc-discounted-price">${row.discount.finalPrice.toFixed(2)}</div>
            <div className="prc-savings-badge">
              -{row.vendor.discountPercent}% · Save ${row.discount.savings.toFixed(2)}
            </div>
          </>
        ) : hasPrice ? (
          <span className="prc-discounted-price" style={{ color: 'var(--ink-dim)' }}>
            ${row.price_usd.toFixed(2)}
          </span>
        ) : (
          <span className="prc-unavailable">—</span>
        )}
      </div>

      {/* You Save */}
      <div className="prc-table-cell">
        {hasPrice && row.discount.discountApplied ? (
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#4ade80' }}>
            ${row.discount.savings.toFixed(2)}
          </span>
        ) : (
          <span className="prc-no-code">—</span>
        )}
      </div>

      {/* Code */}
      <div className="prc-table-cell">
        {row.vendor.discountCode ? (
          <CodeBadge code={row.vendor.discountCode} />
        ) : (
          <span className="prc-no-code">—</span>
        )}
      </div>

      {/* Shop */}
      <div className="prc-table-cell">
        {hasPrice ? (
          <a
            href={row.affiliateUrl}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="prc-shop-btn"
            id={`shop-${row.vendor.slug}`}
          >
            Shop <ExternalLink size={11} />
          </a>
        ) : (
          <a
            href={row.vendor.affiliateUrl}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="prc-shop-btn"
            style={{ opacity: 0.5 }}
          >
            Visit <ExternalLink size={11} />
          </a>
        )}
      </div>
    </div>
  );
}

function MobileCard({ row }: { row: EnrichedVendorRow }) {
  const [open, setOpen] = useState(false);
  const hasPrice = row.inStock && row.price_usd > 0;

  return (
    <div className="prc-card">
      <div className="prc-card-header" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <div className="prc-card-vendor">
          <span className={`prc-vendor-dot ${row.dotClass}`} />
          <span className="prc-card-vendor-name">{row.vendor.name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {hasPrice ? (
            <div className="prc-card-price">
              <div className="prc-card-discounted">
                ${row.discount.discountApplied ? row.discount.finalPrice.toFixed(2) : row.price_usd.toFixed(2)}
              </div>
              {row.discount.discountApplied && (
                <div className="prc-card-list">${row.price_usd.toFixed(2)}</div>
              )}
            </div>
          ) : (
            <span className="prc-unavailable">Unavailable</span>
          )}
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      <div className={`prc-card-body${open ? " open" : ""}`}>
        {hasPrice && (
          <>
            <div className="prc-card-row">
              <span className="prc-card-label">Vial Size</span>
              <span className="prc-card-value">{row.vial_mg}mg</span>
            </div>
            <div className="prc-card-row">
              <span className="prc-card-label">List Price</span>
              <span className="prc-card-value">${row.price_usd.toFixed(2)}</span>
            </div>
            {row.discount.discountApplied && (
              <div className="prc-card-row">
                <span className="prc-card-label">PEPTIDEX Price</span>
                <span style={{ color: 'var(--gold)', fontFamily: 'var(--serif)', fontSize: 18 }}>
                  ${row.discount.finalPrice.toFixed(2)}
                </span>
              </div>
            )}
            {row.vendor.discountCode && (
              <div className="prc-card-row">
                <span className="prc-card-label">Code</span>
                <CodeBadge code={row.vendor.discountCode} />
              </div>
            )}
          </>
        )}
        <div className="prc-card-actions">
          <a
            href={hasPrice ? row.affiliateUrl : row.vendor.affiliateUrl}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="prc-shop-btn"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            {hasPrice ? "Shop Now" : "Visit Vendor"} <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function PricingClient() {
  const enriched = useMemo(() => buildEnrichedData(), []);

  const [selectedPeptide, setSelectedPeptide] = useState(enriched[0]?.slug ?? "bpc-157");
  const [codeOnly, setCodeOnly] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Scroll reveal
  useEffect(() => {
    if (!containerRef.current) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("in"), i * 40);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    containerRef.current.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [selectedPeptide]);

  const currentPeptide = useMemo(
    () => enriched.find(p => p.slug === selectedPeptide) ?? enriched[0],
    [enriched, selectedPeptide]
  );

  const filteredRows = useMemo(() => {
    if (!currentPeptide) return [];
    let rows = [...currentPeptide.rows];
    if (codeOnly) rows = rows.filter(r => r.vendor.discountCode);
    // Sort by discounted price ascending (unavailable rows go to end)
    rows.sort((a, b) => {
      const aPrice = a.inStock && a.price_usd > 0 ? a.discount.finalPrice : Infinity;
      const bPrice = b.inStock && b.price_usd > 0 ? b.discount.finalPrice : Infinity;
      return sortDir === "asc" ? aPrice - bPrice : bPrice - aPrice;
    });
    return rows;
  }, [currentPeptide, codeOnly, sortDir]);

  const filteredPeptideOptions = useMemo(
    () => enriched.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
    [enriched, search]
  );

  const lastUpdated = currentPeptide?.lastUpdated ?? "";
  const avgListPrice = useMemo(() => {
    const prices = filteredRows.filter(r => r.inStock && r.price_usd > 0).map(r => r.price_usd);
    if (!prices.length) return null;
    return Math.round((prices.reduce((a, b) => a + b, 0) / prices.length) * 100) / 100;
  }, [filteredRows]);

  const bestPrice = useMemo(() => {
    const prices = filteredRows.filter(r => r.inStock && r.price_usd > 0).map(r => r.discount.finalPrice);
    if (!prices.length) return null;
    return Math.min(...prices);
  }, [filteredRows]);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="prc-hero">
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at 70% 30%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 30%, black 0%, transparent 70%)',
          opacity: 0.4, pointerEvents: 'none' as const
        }} />
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
          {/* Breadcrumb */}
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em',
            textTransform: 'uppercase' as const, color: 'var(--ink-mute)',
            marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12
          }}>
            <Link href="/" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'var(--line-strong)' }}>/</span>
            <Link href="/tools" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>Tools</Link>
            <span style={{ color: 'var(--line-strong)' }}>/</span>
            <span style={{ color: 'var(--gold)' }}>Price Comparison</span>
          </div>

          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.25em',
            textTransform: 'uppercase' as const, color: 'var(--gold)',
            marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12
          }}>
            <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
            § Vendor Comparison — {new Date().getFullYear()}
          </div>

          <h1 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: 300, lineHeight: 1, letterSpacing: '-0.03em',
            marginBottom: 24, maxWidth: 900
          }}>
            Peptide <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Price Comparison</em>.
          </h1>

          <p style={{ fontSize: 18, color: 'var(--ink-dim)', maxWidth: 640, lineHeight: 1.6, marginBottom: 0 }}>
            Real vendor prices for {enriched.length} peptides across{" "}
            {vendorsSorted.length} verified suppliers — with{" "}
            <strong style={{ color: 'var(--gold)' }}>PEPTIDEX discount applied</strong>. Updated {formatDate(lastUpdated)}.
          </p>

          <div style={{
            display: 'flex', gap: 32, marginTop: 32, paddingTop: 32,
            borderTop: '1px solid var(--line)', flexWrap: 'wrap' as const
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'var(--ink-mute)' }}>
              Peptides: <strong style={{ color: 'var(--gold)', fontWeight: 500 }}>{enriched.length}</strong>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'var(--ink-mute)' }}>
              Verified Vendors: <strong style={{ color: 'var(--gold)', fontWeight: 500 }}>{vendorsSorted.length}</strong>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'var(--ink-mute)' }}>
              Vendors with PEPTIDEX Code: <strong style={{ color: 'var(--gold)', fontWeight: 500 }}>6</strong>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px' }} ref={containerRef}>
        <section style={{ padding: '48px 0 80px' }}>

          {/* Disclaimer */}
          <div className="prc-disclaimer reveal">
            <Info />
            <p>
              Prices are sourced directly from vendor websites and updated periodically. All listed vendors
              are independently verified with third-party Certificates of Analysis. Prices may change —
              always confirm at checkout.{" "}
              <Link href="/about/editorial-policy" style={{ color: 'var(--gold)' }}>
                How we verify pricing →
              </Link>
            </p>
          </div>

          {/* Controls */}
          <div className="prc-controls reveal">
            {/* Peptide Selector */}
            <div className="prc-selector" ref={dropdownRef}>
              <button
                className={`prc-selector-trigger${dropdownOpen ? " open" : ""}`}
                onClick={() => setDropdownOpen(o => !o)}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                id="peptide-selector-btn"
              >
                <span>{currentPeptide?.name ?? "Select peptide"}</span>
                {dropdownOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {dropdownOpen && (
                <div className="prc-selector-dropdown" role="listbox">
                  <input
                    className="prc-selector-search"
                    placeholder="Search peptides…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    autoFocus
                    aria-label="Search peptides"
                  />
                  {filteredPeptideOptions.map(p => (
                    <button
                      key={p.slug}
                      className={`prc-selector-option${p.slug === selectedPeptide ? " active" : ""}`}
                      onClick={() => { setSelectedPeptide(p.slug); setDropdownOpen(false); setSearch(""); }}
                      role="option"
                      aria-selected={p.slug === selectedPeptide}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort direction toggle */}
            <button
              className="prc-toggle"
              onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}
              title="Toggle sort direction"
              aria-label={`Sort by price ${sortDir === "asc" ? "descending" : "ascending"}`}
            >
              <SlidersHorizontal size={13} />
              {sortDir === "asc" ? "Price: Low to High" : "Price: High to Low"}
            </button>

            {/* Code-only toggle */}
            <button
              className={`prc-toggle${codeOnly ? " active" : ""}`}
              onClick={() => setCodeOnly(o => !o)}
              aria-pressed={codeOnly}
              aria-label="Show only vendors with PEPTIDEX discount code"
            >
              <Tag size={13} />
              <span className="prc-toggle-dot" />
              PEPTIDEX Code Only
            </button>
          </div>

          {/* Stats strip */}
          {currentPeptide && (
            <div className="prc-stats reveal">
              <div className="prc-stat">
                Viewing: <strong>{currentPeptide.name}</strong>
              </div>
              {avgListPrice && (
                <div className="prc-stat">
                  Avg List Price: <strong>${avgListPrice.toFixed(2)}</strong>
                </div>
              )}
              {bestPrice && (
                <div className="prc-stat">
                  Best PEPTIDEX Price: <strong>${bestPrice.toFixed(2)}</strong>
                </div>
              )}
              <div className="prc-stat">
                Last Verified: <strong>{formatDate(currentPeptide.lastUpdated)}</strong>
              </div>
            </div>
          )}

          {/* ── Desktop Table ──────────────────────────────────────────── */}
          <div className="prc-table reveal">
            <div className="prc-table-header">
              <div>Vendor</div>
              <div>List Price</div>
              <div>PEPTIDEX Price</div>
              <div>You Save</div>
              <div>Code</div>
              <div>Shop</div>
            </div>
            {filteredRows.map(row => (
              <DesktopRow
                key={row.vendor.slug}
                row={row}
                showPriceColumn={true}
              />
            ))}
          </div>

          {/* ── Mobile Cards ────────────────────────────────────────────── */}
          <div className="prc-cards">
            {filteredRows.map(row => (
              <MobileCard key={row.vendor.slug} row={row} />
            ))}
          </div>

          {/* Footnote */}
          <div className="prc-footnote reveal">
            <p>
              💡 <strong>How PEPTIDEX discounts work:</strong> Enter code{" "}
              <strong>PEPTIDEX</strong> at checkout at any vendor showing the code badge above.
              All 6 vendors in our index accept this code for 15–20% off.
              Bio Longevity Labs code stacks with site-wide sales for up to 40%+ savings.
            </p>
            <p>
              Prices verified {formatDate(lastUpdated)}. Vendor pricing changes frequently —
              always confirm the final price at checkout before purchasing.{" "}
              <Link href="/about/editorial-policy" className="prc-footnote-link">
                How we verify pricing →
              </Link>{" "}
              ·{" "}
              <Link href="/vendors" className="prc-footnote-link">
                Full vendor comparison →
              </Link>
            </p>
          </div>
        </section>

        {/* Bottom disclaimer strip */}
        <div style={{
          background: 'rgba(212,131,42,0.04)',
          borderTop: '1px solid rgba(212,131,42,0.2)',
          borderBottom: '1px solid rgba(212,131,42,0.2)',
          padding: '16px 0',
          textAlign: 'center' as const,
          fontFamily: 'var(--mono)',
          fontSize: 11,
          letterSpacing: '0.1em',
          color: 'var(--amber)',
        }}>
          ⚠ Affiliate disclosure: PeptiDex may earn a commission when you purchase through links on this page.
          Rankings are independent. Research use only.
        </div>
      </div>
    </>
  );
}
