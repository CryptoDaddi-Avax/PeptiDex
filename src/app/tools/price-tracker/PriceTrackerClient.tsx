"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ExternalLink, ChevronUp, ChevronDown, Check, Copy, ShieldCheck, AlertTriangle } from "lucide-react";
import { peptides as allPeptides } from "@/data/peptides";
import { DisclaimerCard } from "@/components/ui/DisclaimerCard";
import { costPerDose, getDefaultDoseMcg } from "@/lib/pricing/costPerDose";
import "./price-tracker.css";

// ─── Types ─────────────────────────────────────────────────────────────────────

/** Shape of a row from the `listings` table (matches NormalizedListing + DB fields) */
export interface ListingRow {
  id: string;
  vendor_name: string;
  vendor_slug: string;
  peptide_name: string;
  peptide_slug: string;
  route: "Injection" | "Oral" | "Topical" | "Nasal" | "Other";
  vial_size_mg: number | null;
  quantity: number;
  total_mg: number | null;
  price_raw: number;
  currency_raw: string;
  price_usd: number;
  price_per_mg_usd: number | null;
  discount_code: string | null;
  discount_percent: number | null;
  in_stock: boolean;
  affiliate_url: string;
  source_type: string;
  last_checked_at: string;
  coa_url: string | null;
  third_party_tested: boolean | null;
}

interface Props {
  listings: ListingRow[];
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Vendor dot color palette (slug → CSS color) */
const VENDOR_COLORS: Record<string, string> = {
  "amino-club":        "#c9a961",
  "bio-longevity-labs": "#7c3aed",
  "limitless-life":    "#22c55e",
  "pantheon-peptides": "#f97316",
  "lvlup-health":      "#06b6d4",
  "uk-peptides":       "#4a9eff",
  "canada-peptides":   "#e879f9",
  "peptide-eu":        "#fb7185",
};

function vendorColor(slug: string): string {
  return VENDOR_COLORS[slug] ?? "#6b6860";
}

/** Route → abbreviated badge class */
function routeClass(route: string): string {
  if (route === "Injection") return "inj";
  if (route === "Oral")      return "oral";
  if (route === "Topical")   return "top";
  if (route === "Nasal")     return "nas";
  return "";
}

/** Relative time from ISO timestamp */
function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 24)   return `${hrs}h ago`;
  const days = Math.floor(diff / 86400000);
  return `${days}d ago`;
}

const STALE_THRESHOLD_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
function isStale(iso: string): boolean {
  return Date.now() - new Date(iso).getTime() > STALE_THRESHOLD_MS;
}

/** Build a map from peptide_slug → default dose_mcg using peptides.ts data */
function buildDoseMap(): Map<string, number> {
  const map = new Map<string, number>();
  for (const p of allPeptides) {
    const dose = getDefaultDoseMcg(p.dosing);
    if (dose !== null) map.set(p.slug, dose);
  }
  return map;
}

const DEFAULT_DOSE_MCG = buildDoseMap();

type SortCol = "price_per_mg_usd" | "price_usd" | "vendor_name" | "peptide_name" | "cost_per_dose";
type SortDir = "asc" | "desc";

// ─── Click-to-copy code badge ──────────────────────────────────────────────────
function CodeBadge({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, [code]);
  return (
    <button
      onClick={copy}
      className={`pt-code${copied ? " copied" : ""}`}
      aria-label={copied ? "Copied!" : `Copy code ${code}`}
      title={copied ? "Copied!" : "Click to copy"}
    >
      {copied ? <Check size={10} /> : <Copy size={10} />}
      {code}
    </button>
  );
}

// ─── Main Client Component ─────────────────────────────────────────────────────

export default function PriceTrackerClient({ listings }: Props) {
  // ── Sort state ──────────────────────────────────────────────────────────────
  const [sortCol, setSortCol] = useState<SortCol>("price_per_mg_usd");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // ── Filter state ────────────────────────────────────────────────────────────
  const [search, setSearch]         = useState("");
  const [routeFilter, setRouteFilter] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [testedOnly, setTestedOnly]  = useState(false);

  // ── Mobile card expand state ────────────────────────────────────────────────
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // ── Reveal animation ────────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("in"), i * 30);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -60px 0px" }
    );
    containerRef.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [listings]);

  // ── Enriched rows: attach computed cost/dose ────────────────────────────────
  const enriched = useMemo(() => {
    return listings.map((row) => {
      const doseMcg = DEFAULT_DOSE_MCG.get(row.peptide_slug) ?? null;
      const cpdResult =
        row.total_mg && doseMcg && row.price_usd > 0
          ? costPerDose({ price_usd: row.price_usd, total_mg: row.total_mg, dose_mcg: doseMcg })
          : null;
      return { ...row, defaultDoseMcg: doseMcg, cpdResult };
    });
  }, [listings]);

  // ── Filtered + sorted rows ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return enriched
      .filter((r) => {
        if (inStockOnly && !r.in_stock) return false;
        if (testedOnly && !r.third_party_tested) return false;
        if (routeFilter !== "all" && r.route !== routeFilter) return false;
        if (q) {
          const hay = `${r.vendor_name} ${r.peptide_name} ${r.peptide_slug} ${r.route}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        let av: number, bv: number;
        const dir = sortDir === "asc" ? 1 : -1;
        switch (sortCol) {
          case "price_per_mg_usd":
            av = a.price_per_mg_usd ?? Infinity;
            bv = b.price_per_mg_usd ?? Infinity;
            return (av - bv) * dir;
          case "price_usd":
            return (a.price_usd - b.price_usd) * dir;
          case "vendor_name":
            return a.vendor_name.localeCompare(b.vendor_name) * dir;
          case "peptide_name":
            return a.peptide_name.localeCompare(b.peptide_name) * dir;
          case "cost_per_dose":
            av = a.cpdResult?.costPerDose ?? Infinity;
            bv = b.cpdResult?.costPerDose ?? Infinity;
            return (av - bv) * dir;
          default:
            return 0;
        }
      });
  }, [enriched, search, routeFilter, inStockOnly, testedOnly, sortCol, sortDir]);

  // ── Stat chips (from filtered rows to reflect live query scope) ─────────────
  const stats = useMemo(() => ({
    listings: filtered.length,
    peptides: new Set(filtered.map((r) => r.peptide_slug)).size,
    vendors:  new Set(filtered.map((r) => r.vendor_slug)).size,
    inStock:  filtered.filter((r) => r.in_stock).length,
  }), [filtered]);

  // ── Best $/mg per peptide (for gold highlight) ──────────────────────────────
  const bestPerMgMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of filtered) {
      if (r.price_per_mg_usd === null) continue;
      const cur = map.get(r.peptide_slug);
      if (cur === undefined || r.price_per_mg_usd < cur) {
        map.set(r.peptide_slug, r.price_per_mg_usd);
      }
    }
    return map;
  }, [filtered]);

  // ── Sort header helper ──────────────────────────────────────────────────────
  function SortHeader({
    col, label, className,
  }: { col: SortCol; label: React.ReactNode; className?: string }) {
    const active = sortCol === col;
    const dir = active ? sortDir : "asc";
    const toggle = () => {
      if (active) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      else { setSortCol(col); setSortDir("asc"); }
    };
    const ariaSortAttr = active
      ? (sortDir === "asc" ? "ascending" : "descending")
      : "none";
    return (
      <th scope="col" aria-sort={ariaSortAttr} className={className}>
        <button onClick={toggle} aria-label={`Sort by ${label}`}>
          {label}
          {active
            ? dir === "asc"
              ? <ChevronUp size={10} className="pt-th-sort-icon active" aria-hidden="true" />
              : <ChevronDown size={10} className="pt-th-sort-icon active" aria-hidden="true" />
            : <ChevronDown size={10} className="pt-th-sort-icon" aria-hidden="true" />
          }
        </button>
      </th>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ══ HERO ══ */}
      <header className="pt-hero" role="banner">
        <div className="pt-hero-grid" aria-hidden="true" />
        <div className="pt-hero-inner">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">/</span>
            <Link href="/tools">Tools</Link>
            <span className="sep" aria-hidden="true">/</span>
            <span className="current" aria-current="page">Price Tracker</span>
          </nav>

          <h1 className="page-title">
            Peptide <em>Price Tracker</em>
          </h1>
          <p className="page-subtitle">
            Live vendor listings for research peptides — sorted by real USD&nbsp;cost&nbsp;per&nbsp;mg,
            not ad spend.
          </p>
        </div>
      </header>

      {/* ══ MAIN CONTENT ══ */}
      <main id="pt-main" ref={containerRef}>
        <div className="pt-body">

          {/* Disclaimer */}
          <DisclaimerCard variant="vendor" className="mb-6" />

          {/* Affiliate disclosure */}
          <div className="pt-disclosure" role="note" aria-label="Affiliate disclosure">
            <p>
              <strong>Ranking methodology:</strong> Rows are sorted by{" "}
              <strong>$/mg (USD)</strong> — a normalized price-per-milligram computed from
              total_mg across all vials, always in USD regardless of the vendor&apos;s
              listing currency. Affiliate status has{" "}
              <strong>zero influence on sort order.</strong> PeptiDex may earn a commission
              on qualifying purchases made through the links and discount codes below.
            </p>
          </div>

          {/* Stat chips */}
          <div className="pt-stats reveal" role="status" aria-live="polite" aria-label="Listing statistics">
            <span className="pt-stat-chip"><strong>{stats.listings}</strong> listings</span>
            <span className="pt-stat-chip"><strong>{stats.peptides}</strong> peptides</span>
            <span className="pt-stat-chip"><strong>{stats.vendors}</strong> vendors</span>
            <span className="pt-stat-chip"><strong>{stats.inStock}</strong> in stock</span>
          </div>

          {/* Filter / search bar */}
          <div className="pt-filters" role="search" aria-label="Filter listings">
            <input
              type="search"
              className="pt-search"
              placeholder="Search peptide, vendor…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search peptides and vendors"
            />

            <label className="sr-only" htmlFor="pt-route-filter">Filter by route</label>
            <select
              id="pt-route-filter"
              className="pt-filter-select"
              value={routeFilter}
              onChange={(e) => setRouteFilter(e.target.value)}
            >
              <option value="all">All routes</option>
              <option value="Injection">Injection</option>
              <option value="Oral">Oral</option>
              <option value="Topical">Topical</option>
              <option value="Nasal">Nasal</option>
            </select>

            <button
              className={`pt-toggle-btn${inStockOnly ? " active" : ""}`}
              onClick={() => setInStockOnly((v) => !v)}
              aria-pressed={inStockOnly}
              type="button"
            >
              <span className="pt-toggle-dot" aria-hidden="true" />
              In stock only
            </button>

            <button
              className={`pt-toggle-btn${testedOnly ? " active" : ""}`}
              onClick={() => setTestedOnly((v) => !v)}
              aria-pressed={testedOnly}
              type="button"
            >
              <span className="pt-toggle-dot" aria-hidden="true" />
              3rd-party tested
            </button>
          </div>

          {/* ── DESKTOP TABLE ── */}
          <div className="pt-table-wrap reveal" role="region" aria-label="Price comparison table">
            {filtered.length === 0 ? (
              <div className="pt-empty" role="status">No listings match your filters.</div>
            ) : (
              <table className="pt-table" aria-label="Peptide price comparison">
                <colgroup>
                  <col className="col-vendor" />
                  <col className="col-peptide" />
                  <col className="col-route" />
                  <col className="col-size" />
                  <col className="col-qty" />
                  <col className="col-price" />
                  <col className="col-code" />
                  <col className="col-permg" />
                  <col className="col-cpd" />
                  <col className="col-tested" />
                  <col className="col-stock" />
                  <col className="col-updated" />
                  <col className="col-link" />
                </colgroup>
                <thead>
                  <tr>
                    <SortHeader col="vendor_name"     label="Vendor" />
                    <SortHeader col="peptide_name"    label="Peptide" />
                    <th scope="col">Route</th>
                    <th scope="col">Size</th>
                    <th scope="col">Qty</th>
                    <SortHeader col="price_usd"       label="Price" />
                    <th scope="col">Code</th>
                    <SortHeader col="price_per_mg_usd" label="$/mg (USD)" />
                    <SortHeader col="cost_per_dose"   label="Cost/Dose" />
                    <th scope="col">Tested</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Updated</th>
                    <th scope="col"><span className="sr-only">Shop link</span></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => {
                    const isBest = row.price_per_mg_usd !== null &&
                      bestPerMgMap.get(row.peptide_slug) === row.price_per_mg_usd;
                    const stale = isStale(row.last_checked_at);
                    const routeCls = routeClass(row.route);
                    return (
                      <tr
                        key={row.id}
                        className={[
                          !row.in_stock ? "unavailable" : "",
                          isBest ? "best-row" : "",
                        ].filter(Boolean).join(" ")}
                        aria-label={`${row.vendor_name} — ${row.peptide_name}`}
                      >
                        {/* Vendor */}
                        <td>
                          <div className="pt-vendor-wrap">
                            <span
                              className="pt-vendor-dot"
                              style={{ background: vendorColor(row.vendor_slug) }}
                              aria-hidden="true"
                            />
                            <span className="pt-vendor-name">{row.vendor_name}</span>
                          </div>
                        </td>

                        {/* Peptide */}
                        <td>
                          <Link
                            href={`/peptides/${row.peptide_slug}`}
                            className="pt-peptide-name"
                            title={`View ${row.peptide_name} library entry`}
                          >
                            {row.peptide_name}
                          </Link>
                        </td>

                        {/* Route */}
                        <td>
                          <span className={`pt-route-badge ${routeCls}`}>
                            {row.route}
                          </span>
                        </td>

                        {/* Size */}
                        <td>
                          {row.vial_size_mg !== null
                            ? <span>{row.vial_size_mg}mg</span>
                            : <span style={{ color: "var(--ink-mute)" }}>—</span>
                          }
                        </td>

                        {/* Qty */}
                        <td>{row.quantity}</td>

                        {/* Price */}
                        <td>
                          <div className="pt-price">
                            ${row.price_usd.toFixed(2)}
                          </div>
                          {row.currency_raw !== "USD" && (
                            <div className="pt-price-sub">
                              ({row.currency_raw} {row.price_raw.toFixed(2)})
                            </div>
                          )}
                        </td>

                        {/* Discount code */}
                        <td>
                          {row.discount_code
                            ? <CodeBadge code={row.discount_code} />
                            : <span className="pt-no-code">—</span>
                          }
                        </td>

                        {/* $/mg (USD) — always USD, never mixed */}
                        <td>
                          {row.price_per_mg_usd !== null ? (
                            <span className={`pt-permg${isBest ? " best" : ""}`}>
                              ${row.price_per_mg_usd.toFixed(3)}
                              {isBest && (
                                <span className="pt-best-badge" aria-label="Best price per mg">best</span>
                              )}
                            </span>
                          ) : (
                            <span style={{ color: "var(--ink-mute)" }}>—</span>
                          )}
                        </td>

                        {/* Cost/Dose */}
                        <td>
                          {row.cpdResult ? (
                            <>
                              <div className="pt-cpd">
                                ${row.cpdResult.costPerDose.toFixed(3)}
                              </div>
                              {row.defaultDoseMcg && (
                                <div className="pt-cpd-dose">
                                  @ {row.defaultDoseMcg}mcg · {row.cpdResult.dosesPerListing} doses
                                </div>
                              )}
                            </>
                          ) : (
                            <span style={{ color: "var(--ink-mute)" }}>—</span>
                          )}
                        </td>

                        {/* Tested */}
                        <td>
                          {row.third_party_tested ? (
                            row.coa_url ? (
                              <a
                                href={row.coa_url}
                                className="pt-tested-badge"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View COA — 3rd-party tested"
                              >
                                <ShieldCheck size={10} aria-hidden="true" />
                                COA
                              </a>
                            ) : (
                              <span className="pt-tested-badge" aria-label="3rd-party tested">
                                <ShieldCheck size={10} aria-hidden="true" />
                                ✓
                              </span>
                            )
                          ) : (
                            <span style={{ color: "var(--ink-mute)", fontSize: 10 }}>—</span>
                          )}
                        </td>

                        {/* Stock */}
                        <td>
                          {row.in_stock
                            ? <span className="pt-in-stock" aria-label="In stock">✓</span>
                            : <span className="pt-out-stock" aria-label="Out of stock">Out</span>
                          }
                        </td>

                        {/* Updated — real per-row timestamp, never hardcoded */}
                        <td>
                          <time
                            dateTime={row.last_checked_at}
                            className="pt-updated"
                            title={new Date(row.last_checked_at).toLocaleString()}
                          >
                            {relativeTime(row.last_checked_at)}
                          </time>
                          {stale && (
                            <span className="pt-stale" aria-label="Price data is stale">
                              <AlertTriangle size={9} aria-hidden="true" /> stale
                            </span>
                          )}
                        </td>

                        {/* Shop link */}
                        <td>
                          <a
                            href={row.affiliate_url}
                            className="pt-shop-btn"
                            rel="sponsored nofollow"
                            target="_blank"
                            aria-label={`Shop ${row.peptide_name} at ${row.vendor_name}`}
                          >
                            Buy
                            <ExternalLink size={9} aria-hidden="true" />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* ── MOBILE CARDS ── */}
          <div className="pt-cards reveal" role="region" aria-label="Price listings (mobile)">
            {filtered.length === 0 ? (
              <div className="pt-empty" role="status">No listings match your filters.</div>
            ) : filtered.map((row) => {
              const isBest = row.price_per_mg_usd !== null &&
                bestPerMgMap.get(row.peptide_slug) === row.price_per_mg_usd;
              const stale = isStale(row.last_checked_at);
              const open = expandedCard === row.id;
              return (
                <article key={row.id} className="pt-card">
                  <div
                    className="pt-card-head"
                    onClick={() => setExpandedCard(open ? null : row.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setExpandedCard(open ? null : row.id)}
                    aria-expanded={open}
                    aria-controls={`pt-card-body-${row.id}`}
                    aria-label={`${row.vendor_name} — ${row.peptide_name}, ${open ? "collapse" : "expand"} details`}
                  >
                    <div className="pt-card-head-left">
                      <div className="pt-card-vendor-row">
                        <span
                          className="pt-vendor-dot"
                          style={{ background: vendorColor(row.vendor_slug) }}
                          aria-hidden="true"
                        />
                        <span className="pt-card-vendor-name">{row.vendor_name}</span>
                        {isBest && (
                          <span className="pt-best-badge" aria-label="Best price per mg">best</span>
                        )}
                      </div>
                      <div className="pt-card-sub">
                        <Link href={`/peptides/${row.peptide_slug}`}>{row.peptide_name}</Link>
                        {" · "}{row.route}
                        {row.vial_size_mg !== null && ` · ${row.vial_size_mg}mg × ${row.quantity}`}
                      </div>
                    </div>
                    <div className="pt-card-price-block">
                      <div className="pt-card-price-main">${row.price_usd.toFixed(2)}</div>
                      {row.price_per_mg_usd !== null && (
                        <div className="pt-card-price-mg">${row.price_per_mg_usd.toFixed(3)}/mg</div>
                      )}
                    </div>
                  </div>

                  <div
                    id={`pt-card-body-${row.id}`}
                    className={`pt-card-body${open ? " open" : ""}`}
                    role="region"
                    aria-label={`Details for ${row.vendor_name} ${row.peptide_name}`}
                  >
                    {row.cpdResult && row.defaultDoseMcg && (
                      <div className="pt-card-row">
                        <span className="pt-card-label">Cost/Dose ({row.defaultDoseMcg}mcg)</span>
                        <span className="pt-card-value">${row.cpdResult.costPerDose.toFixed(3)} · {row.cpdResult.dosesPerListing} doses</span>
                      </div>
                    )}
                    {row.discount_code && (
                      <div className="pt-card-row">
                        <span className="pt-card-label">Discount code</span>
                        <CodeBadge code={row.discount_code} />
                      </div>
                    )}
                    <div className="pt-card-row">
                      <span className="pt-card-label">In stock</span>
                      <span className="pt-card-value">{row.in_stock ? "Yes" : "No"}</span>
                    </div>
                    {row.third_party_tested && (
                      <div className="pt-card-row">
                        <span className="pt-card-label">3rd-party tested</span>
                        <span className="pt-card-value">
                          {row.coa_url
                            ? <a href={row.coa_url} className="pt-tested-badge" target="_blank" rel="noopener noreferrer"><ShieldCheck size={10} />COA</a>
                            : <span className="pt-tested-badge"><ShieldCheck size={10} />✓</span>
                          }
                        </span>
                      </div>
                    )}
                    <div className="pt-card-row">
                      <span className="pt-card-label">Last checked</span>
                      <span className="pt-card-value">
                        <time dateTime={row.last_checked_at}>{relativeTime(row.last_checked_at)}</time>
                        {stale && <span className="pt-stale">⚠ stale</span>}
                      </span>
                    </div>
                    <div className="pt-card-actions">
                      <a
                        href={row.affiliate_url}
                        className="pt-shop-btn"
                        rel="sponsored nofollow"
                        target="_blank"
                        aria-label={`Shop ${row.peptide_name} at ${row.vendor_name}`}
                      >
                        Buy <ExternalLink size={10} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Footnote / methodology */}
          <footer className="pt-footnote" aria-label="Data methodology">
            <p>
              <strong>$/mg (USD)</strong> — Computed from <code>price_usd ÷ total_mg</code>, where{" "}
              <code>total_mg = vial_size_mg × quantity</code>. All prices normalized to USD
              at the time of each listing&apos;s <code>last_checked_at</code>. Sorting always
              uses the USD-normalized value regardless of original listing currency.
            </p>
            <p>
              <strong>Cost/Dose</strong> — Uses the peptide&apos;s lowest typical research dose
              from published literature (via{" "}
              <Link href="/tools/calculator">our reconstitution calculator</Link>). Override
              dose in the calculator for custom protocols.
            </p>
            <p>
              Prices are for research peptide acquisition and reflect published vendor
              listings. Not therapeutic products. Data freshness shown per row.
              Rows older than 7 days are marked <em>stale</em>.{" "}
              <Link href="/disclaimers">Full disclaimers →</Link>
            </p>
          </footer>

        </div>
      </main>
    </>
  );
}
