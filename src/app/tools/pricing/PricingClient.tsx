"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { pricingData } from "@/data/pricing";
import { ArrowUpDown, Info } from "lucide-react";
import { AffiliateLink } from "@/components/affiliate-link";
import RedesignLayout from '@/components/redesign/RedesignLayout';
import './pricing-redesign.css';

type SortKey = "name" | "avg_price" | "cost_per_dose" | "doses";

export default function PricingClient() {
    const [sortKey, setSortKey] = useState<SortKey>("name");
    const [sortAsc, setSortAsc] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    /* Scroll reveal */
    useEffect(() => {
        if (!containerRef.current) return;
        const io = new IntersectionObserver(entries => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    setTimeout(() => e.target.classList.add('in'), i * 40);
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
        containerRef.current.querySelectorAll('.reveal').forEach(el => io.observe(el));
        return () => io.disconnect();
    }, []);

    const sorted = useMemo(() => {
        const list = [...pricingData];
        list.sort((a, b) => {
            let cmp = 0;
            if (sortKey === "name") cmp = a.name.localeCompare(b.name);
            else if (sortKey === "avg_price") cmp = a.avg_price_usd - b.avg_price_usd;
            else if (sortKey === "cost_per_dose") cmp = (a.cost_per_dose_usd || 0) - (b.cost_per_dose_usd || 0);
            else if (sortKey === "doses") cmp = (b.doses_per_vial || 0) - (a.doses_per_vial || 0);
            return sortAsc ? cmp : -cmp;
        });
        return list;
    }, [sortKey, sortAsc]);

    const toggleSort = (key: SortKey) => {
        if (sortKey === key) setSortAsc(!sortAsc);
        else { setSortKey(key); setSortAsc(true); }
    };

    const avgPrice = useMemo(() => {
        const prices = pricingData.map(p => p.avg_price_usd);
        return Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    }, []);

    return (
        <RedesignLayout>
            {/* Editorial Page Header */}
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
                    <div style={{
                        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em',
                        textTransform: 'uppercase' as const, color: 'var(--ink-mute)',
                        marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12
                    }}>
                        <Link href="/" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>Home</Link>
                        <span style={{ color: 'var(--line-strong)' }}>/</span>
                        <Link href="/tools/evidence" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>Tools</Link>
                        <span style={{ color: 'var(--line-strong)' }}>/</span>
                        <span style={{ color: 'var(--gold)' }}>Price Comparison</span>
                    </div>
                    <div style={{
                        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.25em',
                        textTransform: 'uppercase' as const, color: 'var(--gold)',
                        marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12
                    }}>
                        <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
                        § Research Index
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 7vw, 96px)',
                        fontWeight: 300, lineHeight: 1, letterSpacing: '-0.03em',
                        marginBottom: 24, maxWidth: 1100
                    }}>
                        Price <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Comparison</em>.
                    </h1>
                    <p style={{ fontSize: 18, color: 'var(--ink-dim)', maxWidth: 680, lineHeight: 1.6 }}>
                        Average research-grade pricing for all {pricingData.length} peptides. Sortable by vial price, cost per dose, and doses per vial.
                    </p>

                    <div style={{
                        display: 'flex', gap: 32, marginTop: 32, paddingTop: 32,
                        borderTop: '1px solid var(--line)', flexWrap: 'wrap' as const
                    }}>
                        <div style={{
                            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.15em',
                            textTransform: 'uppercase' as const, color: 'var(--ink-mute)'
                        }}>
                            Compounds: <strong style={{ color: 'var(--gold)', fontWeight: 500 }}>{pricingData.length}</strong>
                        </div>
                        <div style={{
                            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.15em',
                            textTransform: 'uppercase' as const, color: 'var(--ink-mute)'
                        }}>
                            Avg Price: <strong style={{ color: 'var(--gold)', fontWeight: 500 }}>${avgPrice}</strong>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px' }} ref={containerRef}>
                <section style={{ padding: '48px 0 80px' }}>
                    {/* Disclaimer */}
                    <div className="prc-disclaimer reveal">
                        <Info />
                        <p>Prices are estimates based on publicly available research-grade suppliers. Actual prices vary by supplier, quantity, and region. Prescription peptides (via doctor/pharmacy) may differ significantly.</p>
                    </div>

                    {/* Controls */}
                    <div className="prc-controls reveal">
                        <div className="prc-control-label">Sort</div>
                        {([["name", "Name"], ["avg_price", "Vial Price"], ["cost_per_dose", "Cost/Dose"], ["doses", "Doses/Vial"]] as [SortKey, string][]).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => toggleSort(key)}
                                className={`prc-control-btn ${sortKey === key ? "active" : ""}`}
                            >
                                {label}
                                {sortKey === key && <ArrowUpDown style={{ width: 10, height: 10 }} />}
                            </button>
                        ))}
                    </div>

                    {/* Section Label */}
                    <div className="reveal" style={{
                        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.25em',
                        textTransform: 'uppercase' as const, color: 'var(--gold)',
                        marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12
                    }}>
                        <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
                        § {sorted.length} Peptides
                    </div>

                    {/* Price Table */}
                    <div className="prc-table reveal">
                        <div className="prc-table-header">
                            <div>Peptide</div>
                            <div>Avg Price</div>
                            <div>Cost / Dose</div>
                            <div>Doses / Vial</div>
                            <div>Vendors</div>
                        </div>

                        {sorted.map((p) => (
                            <div key={p.slug} className="prc-table-row">
                                <div className="prc-table-cell" data-label="Peptide">
                                    <Link href={`/library/${p.slug}`} className="prc-pep-name">{p.name}</Link>
                                    <span className="prc-pep-vial">{p.typical_vial_mg}mg vial</span>
                                </div>
                                <div className="prc-table-cell" data-label="Avg Price">
                                    <span className="prc-price">${p.avg_price_usd}</span>
                                </div>
                                <div className="prc-table-cell" data-label="Cost/Dose">
                                    <span className="prc-dose-cost">{p.cost_per_dose_usd ? `$${p.cost_per_dose_usd.toFixed(2)}` : "—"}</span>
                                </div>
                                <div className="prc-table-cell" data-label="Doses/Vial">
                                    <span className="prc-doses">{p.doses_per_vial || "—"}</span>
                                </div>
                                <div className="prc-table-cell" data-label="Vendors" style={{ padding: 0 }}>
                                    {p.vendors?.map((v, vIdx) => (
                                        <div key={vIdx} className="prc-vend-row">
                                            <div className="prc-vend-name">
                                                <span className={`prc-vend-dot ${v.vendor === 'Amino Club' ? 'amino' : v.vendor === 'Ascension Peptides' ? 'ascension' : 'limitless'}`} />
                                                {v.vendor}
                                            </div>
                                            <div className="prc-vend-price">${v.price_usd}</div>
                                            <AffiliateLink
                                                href={v.link}
                                                peptide={p.slug}
                                                source="pricing_table"
                                                rel={v.link.startsWith('http') ? "nofollow noopener sponsored" : ""}
                                                target={v.link.startsWith('http') ? "_blank" : "_self"}
                                                className="prc-vend-action"
                                                id={`affiliate-pricing-${p.slug}-${v.vendor.toLowerCase().replace(/\s+/g, '-')}`}
                                            >
                                                Check Price →
                                            </AffiliateLink>
                                        </div>
                                    ))}
                                </div>
                                {p.notes && (
                                    <div className="prc-notes" style={{ gridColumn: '1 / -1' }}>
                                        <Info style={{ width: 14, height: 14 }} /> {p.notes}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Disclaimer Strip */}
                <div style={{
                    background: 'rgba(212,131,42,0.04)',
                    borderTop: '1px solid rgba(212,131,42,0.2)',
                    borderBottom: '1px solid rgba(212,131,42,0.2)',
                    padding: '16px 48px',
                    textAlign: 'center' as const,
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    color: 'var(--amber)',
                }}>
                    ⚠ Pricing is approximate · Not affiliated with listed suppliers unless stated · Research use only
                </div>
            </div>
        </RedesignLayout>
    );
}
