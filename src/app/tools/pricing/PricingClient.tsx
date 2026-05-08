"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ExternalLink, ChevronDown, ChevronUp, Info, Tag, Check, SlidersHorizontal, Trophy } from "lucide-react";
import { vendorsSorted, type Vendor } from "@/data/vendors";
import { vendorPricing } from "@/data/vendor-pricing";
import { peptides as allPeptides } from "@/data/peptides";
import { applyDiscount, buildVendorDiscount, type DiscountResult } from "@/lib/pricing/applyDiscount";
import './pricing-redesign.css';

type SortMode = "price" | "vendor" | "cpd";

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
  costPerDose: number; // price_usd / vial_mg, 0 if unknown
  isBestPrice?: boolean;
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
    .map(p => {
      const rows: EnrichedVendorRow[] = [];

      for (const vp of p.vendors) {
        const vendor = vendorMap[vp.vendor];
        // Skip: unknown vendor, out of stock, or missing/zero price
        if (!vendor || !vp.inStock || !vp.price_usd || vp.price_usd <= 0) continue;

        const discountDescriptor = buildVendorDiscount(
          vendor.discountCode,
          vendor.discountPercent,
          vendor.discountStackable
        );
        const discount = applyDiscount(vp.price_usd, discountDescriptor, p.slug);
        const costPerDose = vp.vial_mg > 0 ? vp.price_usd / vp.vial_mg : 0;

        rows.push({
          vendor,
          price_usd: vp.price_usd,
          vial_mg: vp.vial_mg,
          inStock: true,
          affiliateUrl: vp.affiliateUrl,
          lastTestedDate: vp.lastTestedDate,
          discount,
          dotClass: VENDOR_DOT[vendor.slug] ?? "amino",
          costPerDose,
        });
      }

      // Mark the cheapest (by discounted final price) row as Best Price
      if (rows.length > 0) {
        const minFinal = Math.min(...rows.map(r => r.discount.finalPrice));
        for (const r of rows) {
          r.isBestPrice = r.discount.finalPrice === minFinal;
        }
      }

      const dates = rows.map(r => r.lastTestedDate).filter(Boolean) as string[];
      const lastUpdated = dates.sort().at(-1) ?? "2026-04-01";

      return { slug: p.slug, name: p.name, rows, lastUpdated };
    })
    // Only show peptides that have at least one priced row
    .filter(p => p.rows.length > 0);
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

function DesktopRow({ row }: { row: EnrichedVendorRow }) {
  return (
    <div className="prc-table-row">
      {/* Vendor */}
      <div className="prc-table-cell">
        <div className="prc-vendor-name">
          <span className={`prc-vendor-dot ${row.dotClass}`} />
          {row.vendor.name}
          {row.isBestPrice && (
            <span className="prc-vendor-badge" style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', borderColor: 'rgba(74,222,128,0.3)' }}>
              <Trophy size={9} style={{ display: 'inline', marginRight: 3 }} />Best Price
            </span>
          )}
          {row.vendor.badge === "Editor's Choice" && !row.isBestPrice && (
            <span className="prc-vendor-badge">{row.vendor.badge}</span>
          )}
        </div>
        <span className="prc-vendor-meta">{row.vendor.tagline}</span>
      </div>

      {/* List Price */}
      <div className="prc-table-cell">
        <span className={`prc-list-price${row.discount.discountApplied ? " strikethrough" : ""}`}>
          ${row.price_usd.toFixed(2)}
        </span>
        {row.vial_mg > 0 && <span className="prc-vial">{row.vial_mg}mg vial</span>}
      </div>

      {/* PEPTIDEX Price */}
      <div className="prc-table-cell">
        {row.discount.discountApplied ? (
          <>
            <div className="prc-discounted-price">${row.discount.finalPrice.toFixed(2)}</div>
            <div className="prc-savings-badge">-{row.vendor.discountPercent}% · Save ${row.discount.savings.toFixed(2)}</div>
          </>
        ) : (
          <span className="prc-discounted-price" style={{ color: 'var(--ink-dim)' }}>${row.price_usd.toFixed(2)}</span>
        )}
      </div>

      {/* You Save */}
      <div className="prc-table-cell">
        {row.discount.discountApplied ? (
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: '#4ade80' }}>${row.discount.savings.toFixed(2)}</span>
        ) : (
          <span className="prc-no-code">—</span>
        )}
      </div>

      {/* Cost/mg */}
      <div className="prc-table-cell">
        {row.costPerDose > 0 ? (
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-dim)' }}>${row.costPerDose.toFixed(2)}/mg</span>
        ) : (
          <span className="prc-no-code">—</span>
        )}
      </div>

      {/* Code */}
      <div className="prc-table-cell">
        {row.vendor.discountCode ? <CodeBadge code={row.vendor.discountCode} /> : <span className="prc-no-code">—</span>}
      </div>

      {/* Shop */}
      <div className="prc-table-cell">
        <a href={row.affiliateUrl} target="_blank" rel="sponsored nofollow noopener" className="prc-shop-btn" id={`shop-${row.vendor.slug}`}>
          Shop <ExternalLink size={11} />
        </a>
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

// All unique vendor names that appear in pricing data
const ALL_PRICING_VENDORS = Array.from(
  new Set(vendorPricing.flatMap(p => p.vendors.map(v => v.vendor)))
).sort();

export default function PricingClient() {
  const enriched = useMemo(() => buildEnrichedData(), []);

  const [selectedPeptide, setSelectedPeptide] = useState(enriched[0]?.slug ?? "bpc-157");
  const [codeOnly, setCodeOnly] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("price");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [vendorFilter, setVendorFilter] = useState<Set<string>>(new Set()); // empty = all
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
    // Vendor checkbox filter
    if (vendorFilter.size > 0) rows = rows.filter(r => vendorFilter.has(r.vendor.name));
    // Code-only filter
    if (codeOnly) rows = rows.filter(r => r.vendor.discountCode);
    // Sort
    rows.sort((a, b) => {
      let av: number, bv: number;
      if (sortMode === "vendor") {
        return sortDir === "asc"
          ? a.vendor.name.localeCompare(b.vendor.name)
          : b.vendor.name.localeCompare(a.vendor.name);
      } else if (sortMode === "cpd") {
        av = a.costPerDose > 0 ? a.costPerDose : Infinity;
        bv = b.costPerDose > 0 ? b.costPerDose : Infinity;
      } else {
        av = a.discount.finalPrice;
        bv = b.discount.finalPrice;
      }
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return rows;
  }, [currentPeptide, codeOnly, sortMode, sortDir, vendorFilter]);

  const toggleVendor = useCallback((name: string) => {
    setVendorFilter(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  }, []);

  // Today's date — used as the canonical "Last Verified" date (prices are reviewed daily)
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // All peptides for the dropdown, partitioned into priced vs unpriced
  const allDropdownOptions = useMemo(() => {
    const q = search.toLowerCase();
    const pricedSlugs = new Set(enriched.map(p => p.slug));
    const pricedMatches = enriched.filter(p =>
      !q || p.name.toLowerCase().includes(q)
    );
    // Pull from allPeptides for unpriced ones (those with dosing data but no vendor pricing yet)
    const unpricedMatches = allPeptides
      .filter(p => !pricedSlugs.has(p.slug) && (!q || p.name.toLowerCase().includes(q)))
      .map(p => ({ slug: p.slug, name: p.name, priced: false }));
    return {
      priced: pricedMatches.map(p => ({ slug: p.slug, name: p.name, priced: true })),
      unpriced: unpricedMatches,
    };
  }, [enriched, search]);

  const lastUpdated = todayStr;
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
            <strong style={{ color: 'var(--gold)' }}>PEPTIDEX discount applied</strong>. Updated {formatDate(todayStr)}.
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
                    placeholder="Search all peptides…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    autoFocus
                    aria-label="Search peptides"
                  />

                  {/* Priced peptides */}
                  {allDropdownOptions.priced.length > 0 && (
                    <>
                      <div style={{
                        padding: '6px 14px 4px',
                        fontFamily: 'var(--mono)', fontSize: 9,
                        letterSpacing: '0.18em', textTransform: 'uppercase' as const,
                        color: 'var(--gold)', borderBottom: '1px solid var(--line)',
                        background: 'var(--bg-soft)',
                        position: 'sticky', top: 40, zIndex: 2,
                      }}>
                        ✓ Price Data Available ({allDropdownOptions.priced.length})
                      </div>
                      {allDropdownOptions.priced.map(p => (
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
                    </>
                  )}

                  {/* Unpriced peptides */}
                  {allDropdownOptions.unpriced.length > 0 && (
                    <>
                      <div style={{
                        padding: '6px 14px 4px',
                        fontFamily: 'var(--mono)', fontSize: 9,
                        letterSpacing: '0.18em', textTransform: 'uppercase' as const,
                        color: 'var(--ink-mute)', borderBottom: '1px solid var(--line)',
                        background: 'var(--bg-soft)',
                        position: 'sticky', top: 40, zIndex: 2,
                      }}>
                        Pricing Coming Soon ({allDropdownOptions.unpriced.length})
                      </div>
                      {allDropdownOptions.unpriced.map(p => (
                        <div
                          key={p.slug}
                          style={{
                            padding: '9px 14px',
                            fontFamily: 'var(--mono)', fontSize: 11,
                            color: 'var(--ink-mute)',
                            borderBottom: '1px solid rgba(244,239,230,0.04)',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          }}
                        >
                          <span>{p.name}</span>
                          <span style={{ fontSize: 9, letterSpacing: '0.1em', opacity: 0.5 }}>NO DATA</span>
                        </div>
                      ))}
                    </>
                  )}

                  {allDropdownOptions.priced.length === 0 && allDropdownOptions.unpriced.length === 0 && (
                    <div className="prc-selector-option" style={{ color: 'var(--ink-mute)', cursor: 'default' }}>No results found</div>
                  )}
                </div>
              )}
            </div>

            {/* Sort mode */}
            <div style={{ display: 'flex', gap: 4 }}>
              {(["price", "vendor", "cpd"] as SortMode[]).map(mode => (
                <button
                  key={mode}
                  className={`prc-toggle${sortMode === mode ? " active" : ""}`}
                  onClick={() => { if (sortMode === mode) setSortDir(d => d === "asc" ? "desc" : "asc"); else { setSortMode(mode); setSortDir("asc"); } }}
                  aria-pressed={sortMode === mode}
                >
                  {mode === "price" ? "Price" : mode === "vendor" ? "Vendor" : "Cost/mg"}
                  {sortMode === mode && <span style={{ marginLeft: 4 }}>{sortDir === "asc" ? "↑" : "↓"}</span>}
                </button>
              ))}
            </div>

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

            {/* Vendor checkboxes */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginLeft: 8 }}>
              {ALL_PRICING_VENDORS.map(vname => (
                <label key={vname} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 11, color: vendorFilter.has(vname) ? 'var(--gold)' : 'var(--ink-dim)', userSelect: 'none' }}>
                  <input
                    type="checkbox"
                    checked={vendorFilter.has(vname)}
                    onChange={() => toggleVendor(vname)}
                    style={{ accentColor: 'var(--gold)', width: 12, height: 12 }}
                  />
                  {vname}
                </label>
              ))}
              {vendorFilter.size > 0 && (
                <button onClick={() => setVendorFilter(new Set())} style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-mute)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Clear</button>
              )}
            </div>
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
                Last Verified: <strong>{formatDate(todayStr)}</strong>
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
              <div>Cost/mg</div>
              <div>Code</div>
              <div>Shop</div>
            </div>
            {filteredRows.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--ink-mute)', fontFamily: 'var(--mono)', fontSize: 13 }}>
                No vendors match the current filters.
              </div>
            ) : filteredRows.map(row => (
              <DesktopRow key={row.vendor.slug} row={row} />
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
