"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { goals } from "@/data/goals";
import { stacks } from "@/data/stacks";
import { peptides } from "@/data/peptides";
import { Peptide } from "@/data/types";
import { SHORT_DISCLAIMER } from "@/data/constants";
import {
    getDefaultConfig,
    calculateCycle,
    generateShoppingList,
    CyclePeptideConfig,
    CyclePeptideResult,
    ShoppingListSummary,
} from "@/lib/cycle-engine";
import { generateCycleIcs } from "@/lib/ics-generator";
import {
    ShieldAlert, ChevronRight, ArrowRight, Calendar,
    ExternalLink, DollarSign, Search,
} from "lucide-react";
import { Goal, Stack } from "@/data/types";
import { ShareModal } from "@/components/share-card/share-modal";
import type { CycleCardData } from "@/components/share-card/card-templates";
import { ShoppingList } from "@/components/shopping-list";
import './cycle-planner-redesign.css';
import { SmartVendorPicker } from '@/components/tools/SmartVendorPicker';

/* ── Helpers: derive display fields from canonical peptides.ts ── */
const EV_RANK: Record<string, number> = { 'very-strong': 5, 'strong': 4, 'moderate-strong': 3.5, 'moderate': 3, 'emerging': 2, 'preclinical': 1, 'anecdotal': 0 };
function topEvidence(p: Peptide): string {
  if (!p.key_studies?.length) return 'preclinical';
  let best = 'preclinical', bestR = 0;
  for (const s of p.key_studies) { const r = EV_RANK[s.evidence_level] ?? 0; if (r > bestR) { bestR = r; best = s.evidence_level; } }
  return best;
}
function fmtDose(d: Peptide['dosing']): string {
  if (!d?.typical_dose_mcg) return '—';
  const [lo, hi] = d.typical_dose_mcg;
  const f = (v: number) => v >= 1000 ? `${+(v/1000).toFixed(1)} mg` : `${v} mcg`;
  return lo === hi ? f(lo) : `${f(lo)}–${f(hi)}`;
}

/* ── Goal → peptide map for the planner sidebar ── */
const GOAL_PROTOCOLS: Record<string, { name: string; peptides: string[]; duration: number }> = {
  'recovery':  { name: 'Injury Recovery',       peptides: ['BPC-157', 'TB-500'],                         duration: 6  },
  'fat-loss':  { name: 'Fat Loss',              peptides: ['Semaglutide', 'CJC-1295', 'Ipamorelin'],     duration: 12 },
  'muscle':    { name: 'Muscle Growth',          peptides: ['CJC-1295', 'Ipamorelin', 'BPC-157'],         duration: 12 },
  'recomp':    { name: 'Body Recomposition',     peptides: ['Tesamorelin', 'BPC-157', 'Ipamorelin'],      duration: 12 },
  'longevity': { name: 'Longevity',             peptides: ['Epitalon', 'NAD+', 'MOTS-c'],                duration: 6  },
  'cognitive': { name: 'Cognitive',             peptides: ['Selank', 'Semax'],                            duration: 8  },
  'sleep':     { name: 'Sleep',                 peptides: ['DSIP', 'Epitalon'],                           duration: 4  },
  'aesthetic': { name: 'Aesthetic',             peptides: ['GHK-Cu', 'NAD+'],                             duration: 8  },
  'immune':    { name: 'Immune',                peptides: ['Thymosin Alpha-1', 'BPC-157'],                duration: 6  },
};

const EXPERIENCE_LEVELS = ['beginner', 'intermediate', 'advanced'] as const;

export default function CyclePlannerClient() {
    /* ── Local state for the two-panel planner ── */
    const [selectedGoal, setSelectedGoal] = useState<string>('recovery');
    const [duration, setDuration] = useState(6);
    const [experience, setExperience] = useState<string>('beginner');
    const [selectedPeptides, setSelectedPeptides] = useState<string[]>(['BPC-157', 'TB-500']);

    /* ── Also keep the engine state for the shopping list (existing data model) ── */
    const [enabledPeptides, setEnabledPeptides] = useState<Set<string>>(new Set());
    const [configs, setConfigs] = useState<Map<string, CyclePeptideConfig>>(new Map());
    const [includeSupplies, setIncludeSupplies] = useState(true);

    /* ── Combobox state ── */
    const [searchQuery, setSearchQuery] = useState('');
    const [comboboxOpen, setComboboxOpen] = useState(false);
    const [highlightedIdx, setHighlightedIdx] = useState(0);
    const comboboxRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    /* ── Canonical peptide lookup ── */
    const peptideMap = useMemo(() => new Map(peptides.map(p => [p.name, p])), []);

    const filteredPeptides = useMemo(() => {
        if (!searchQuery.trim()) return peptides;
        const q = searchQuery.toLowerCase();
        return peptides.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.aliases?.some(a => a.toLowerCase().includes(q)) ||
            p.category.toLowerCase().includes(q)
        );
    }, [searchQuery]);

    /* ── Reveal observer ── */
    const containerRef = useRef<HTMLDivElement>(null);
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
    }, [selectedPeptides]);

    /* ── Close combobox on outside click ── */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (comboboxRef.current && !comboboxRef.current.contains(e.target as Node)) setComboboxOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    /* ── Goal select handler ── */
    const handleGoalSelect = useCallback((goalKey: string) => {
        setSelectedGoal(goalKey);
        const protocol = GOAL_PROTOCOLS[goalKey];
        if (protocol) {
            setSelectedPeptides([...protocol.peptides]);
            setDuration(protocol.duration);
            const names = new Set(protocol.peptides);
            setEnabledPeptides(names);
            const newConfigs = new Map<string, CyclePeptideConfig>();
            protocol.peptides.forEach(name => {
                newConfigs.set(name, { ...getDefaultConfig(name), cycleWeeks: protocol.duration });
            });
            setConfigs(newConfigs);
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'cycle_planner_peptide_added_via_quickstack', { stack_name: protocol.name, peptides: protocol.peptides.join(',') });
            }
        }
    }, []);

    /* ── Toggle peptide checkbox ── */
    const togglePeptide = useCallback((name: string, checked: boolean) => {
        setSelectedPeptides(prev => {
            if (checked && !prev.includes(name)) return [...prev, name];
            if (!checked) return prev.filter(p => p !== name);
            return prev;
        });
        setEnabledPeptides(prev => {
            const next = new Set(prev);
            if (checked) next.add(name);
            else next.delete(name);
            return next;
        });
        if (checked) {
            setConfigs(prev => {
                const next = new Map(prev);
                if (!next.has(name)) {
                    next.set(name, { ...getDefaultConfig(name), cycleWeeks: duration });
                }
                return next;
            });
        }
    }, [duration]);

    /* ── Add from dropdown ── */
    const addFromDropdown = useCallback((name: string) => {
        if (selectedPeptides.includes(name)) return;
        togglePeptide(name, true);
        setSearchQuery(''); setComboboxOpen(false); setHighlightedIdx(0);
        const p = peptideMap.get(name);
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'cycle_planner_peptide_added_via_dropdown', { peptide_slug: p?.slug ?? name, has_dosing: !!p?.dosing });
        }
    }, [selectedPeptides, togglePeptide, peptideMap]);

    const handleComboboxKey = useCallback((e: React.KeyboardEvent) => {
        const max = filteredPeptides.length;
        if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightedIdx(i => (i + 1) % max); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlightedIdx(i => (i - 1 + max) % max); }
        else if (e.key === 'Enter' && max > 0) { e.preventDefault(); addFromDropdown(filteredPeptides[highlightedIdx].name); }
        else if (e.key === 'Escape') { setComboboxOpen(false); }
    }, [filteredPeptides, highlightedIdx, addFromDropdown]);

    const fireSearchAnalytics = useCallback((q: string) => {
        if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
        searchTimerRef.current = setTimeout(() => {
            if (q.length >= 2 && typeof window !== 'undefined' && (window as any).gtag)
                (window as any).gtag('event', 'cycle_planner_peptide_searched', { search_query: q });
        }, 500);
    }, []);

    /* ── Engine results for shopping list ── */
    const results: CyclePeptideResult[] = useMemo(() => {
        return Array.from(enabledPeptides)
            .map(name => {
                const config = configs.get(name);
                if (!config) return null;
                return calculateCycle(config);
            })
            .filter((r): r is CyclePeptideResult => r !== null);
    }, [enabledPeptides, configs]);

    const shoppingList: ShoppingListSummary = useMemo(() => generateShoppingList(results, includeSupplies), [results, includeSupplies]);

    const handleDownloadIcs = useCallback(() => {
        if (results.length === 0) return;
        const icsString = generateCycleIcs(results);
        const blob = new Blob([icsString], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Peptidex_Cycle_Schedule.ics";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [results]);

    /* ── (allPeptideNames retired — combobox uses filteredPeptides from canonical peptides.ts) ── */

    /* ── Find matching goal from data/goals for engine ── */
    const matchedGoal = useMemo(() => goals.find(g => g.id === selectedGoal || g.label.toLowerCase().includes(GOAL_PROTOCOLS[selectedGoal]?.name.toLowerCase() || '')), [selectedGoal]);
    const matchedStack = useMemo(() => {
        if (!matchedGoal) return null;
        return stacks.find(s => s.stack_name === matchedGoal.stackNames[0]) || null;
    }, [matchedGoal]);

    /* ── Initialize on mount ── */
    useEffect(() => {
        handleGoalSelect('recovery');
    }, [handleGoalSelect]);

    const goalName = GOAL_PROTOCOLS[selectedGoal]?.name || 'Custom';

    return (
            <>
            {/* ── PAGE HEADER ── */}
            <header className="planner-hero">
                <div className="page-header-grid" />
                <div className="page-header-wrap" style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
                    <div className="breadcrumb" style={{
                        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em',
                        textTransform: 'uppercase' as const, color: 'var(--ink-mute)',
                        marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12
                    }}>
                        <Link href="/" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>Home</Link>
                        <span style={{ color: 'var(--line-strong)' }}>/</span>
                        <Link href="/tools/evidence" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>Tools</Link>
                        <span style={{ color: 'var(--line-strong)' }}>/</span>
                        <span style={{ color: 'var(--gold)' }}>Cycle Planner</span>
                    </div>
                    <div className="section-label" style={{
                        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.25em',
                        textTransform: 'uppercase' as const, color: 'var(--gold)',
                        marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12
                    }}>
                        <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
                        § Interactive Tool
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 7vw, 96px)',
                        fontWeight: 300, lineHeight: 1, letterSpacing: '-0.03em',
                        marginBottom: 24, maxWidth: 1100
                    }}>
                        Cycle <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Planner</em>.
                    </h1>
                    <p style={{
                        fontSize: 18, color: 'var(--ink-dim)', maxWidth: 680, lineHeight: 1.6
                    }}>
                        Design a research protocol around your goals, experience level, and timeline. Dosing references pulled directly from published literature. Visualize the entire cycle on one timeline.
                    </p>
                </div>
            </header>

            {/* ── TWO-PANEL APP ── */}
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px' }} ref={containerRef}>
                <div className="planner-app">
                    {/* SIDEBAR CONTROLS */}
                    <aside className="planner-controls">
                        {/* Quick Add Stacks */}
                        <div className="control-group">
                            <div className="control-label">Quick Add Stacks</div>
                            <div className="goal-pills">
                                {Object.entries(GOAL_PROTOCOLS).map(([key, proto]) => (
                                    <button key={key} className={`goal-pill ${selectedGoal === key ? 'active' : ''}`} onClick={() => handleGoalSelect(key)}>{proto.name}</button>
                                ))}
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="control-group">
                            <div className="control-label">Duration</div>
                            <div className="duration-slider">
                                <input type="range" min={2} max={16} value={duration} onChange={e => {
                                    const val = parseInt(e.target.value);
                                    setDuration(val);
                                    setConfigs(prev => { const next = new Map(prev); for (const [n, c] of next.entries()) next.set(n, { ...c, cycleWeeks: val }); return next; });
                                }} />
                                <div className="duration-value">{duration} weeks</div>
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="control-group">
                            <div className="control-label">Experience</div>
                            <div className="experience-tabs">
                                {EXPERIENCE_LEVELS.map(level => (
                                    <button key={level} className={`exp-tab ${experience === level ? 'active' : ''}`} onClick={() => setExperience(level)}>{level}</button>
                                ))}
                            </div>
                        </div>

                        <div className="custom-divider"><span>or build custom</span></div>

                        {/* Searchable Peptide Dropdown */}
                        <div className="control-group">
                            <div className="control-label">Add Peptide</div>
                            <div className="peptide-combobox" ref={comboboxRef}>
                                <div className="combobox-input-wrap">
                                    <Search style={{ width: 14, height: 14, color: 'var(--ink-mute)', position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                    <input ref={searchInputRef} type="text" className="combobox-input" placeholder="Search peptides (name, alias, category)..."
                                        value={searchQuery}
                                        onChange={e => { setSearchQuery(e.target.value); setHighlightedIdx(0); if (!comboboxOpen) setComboboxOpen(true); fireSearchAnalytics(e.target.value); }}
                                        onFocus={() => { setComboboxOpen(true); if (typeof window !== 'undefined' && (window as any).gtag) (window as any).gtag('event', 'cycle_planner_dropdown_opened'); }}
                                        onKeyDown={handleComboboxKey}
                                    />
                                </div>
                                {comboboxOpen && (
                                    <div className="combobox-dropdown">
                                        {filteredPeptides.length === 0 ? (
                                            <div className="combobox-empty">No peptides match — try a different term</div>
                                        ) : filteredPeptides.slice(0, 10).map((p, i) => {
                                            const inCycle = selectedPeptides.includes(p.name);
                                            return (
                                                <button key={p.slug} className={`combobox-option ${i === highlightedIdx ? 'highlighted' : ''} ${inCycle ? 'disabled' : ''}`}
                                                    onClick={() => !inCycle && addFromDropdown(p.name)} onMouseEnter={() => setHighlightedIdx(i)}>
                                                    <div className="combobox-option-main">
                                                        <span className="combobox-name">{p.name}</span>
                                                        {p.aliases?.[0] && <span className="combobox-alias">{p.aliases[0]}</span>}
                                                    </div>
                                                    <div className="combobox-option-meta">
                                                        <span className="combobox-category-badge">{p.category}</span>
                                                        {inCycle && <span className="combobox-in-cycle">✓ in cycle</span>}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Selected Peptides — Tag Chips */}
                        <div className="control-group">
                            <div className="control-label">In Cycle ({selectedPeptides.length})</div>
                            {selectedPeptides.length === 0 ? (
                                <div style={{ color: 'var(--ink-mute)', fontSize: 13, fontStyle: 'italic' }}>Select a stack or search to add peptides</div>
                            ) : (
                                <div className="selected-tags">
                                    {selectedPeptides.map(name => {
                                        const pep = peptideMap.get(name);
                                        return (
                                            <div className="selected-tag" key={name}>
                                                <span>{name}</span>
                                                {pep?.dosing?.route && <span className="pep-check-route">{pep.dosing.route}</span>}
                                                {!pep?.dosing && <span style={{ fontSize: 9, color: 'var(--amber)' }}>⚠</span>}
                                                <button onClick={() => togglePeptide(name, false)} title="Remove from cycle">×</button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* MAIN OUTPUT */}
                    <main className="planner-output">
                        {/* Summary Banner */}
                        <div className="summary-banner reveal">
                            <h3>Your <em>research</em> protocol.</h3>
                            <p className="summary-subtitle">Based on published dosing references and protocol literature.</p>
                            <div className="summary-stats">
                                <div className="summary-stat">
                                    <div className="summary-stat-label">Goal</div>
                                    <div className="summary-stat-value">{goalName}</div>
                                </div>
                                <div className="summary-stat">
                                    <div className="summary-stat-label">Duration</div>
                                    <div className="summary-stat-value"><em>{duration}</em> weeks</div>
                                </div>
                                <div className="summary-stat">
                                    <div className="summary-stat-label">Peptides</div>
                                    <div className="summary-stat-value"><em>{selectedPeptides.length}</em> peptides</div>
                                </div>
                                <div className="summary-stat">
                                    <div className="summary-stat-label">Level</div>
                                    <div className="summary-stat-value">{experience.charAt(0).toUpperCase() + experience.slice(1)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Timeline */}
                        <div className="section-label reveal" style={{
                            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.25em',
                            textTransform: 'uppercase' as const, color: 'var(--gold)',
                            marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12
                        }}>
                            <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
                            § Visual Timeline
                        </div>

                        {selectedPeptides.length > 0 ? (
                            <div className="timeline reveal">
                                {/* Week Headers */}
                                <div className="timeline-header">
                                    <div />
                                    <div className="weeks-row" style={{ gridTemplateColumns: `repeat(${duration}, 1fr)` }}>
                                        {Array.from({ length: duration }, (_, i) => (
                                            <span key={i}>W{i + 1}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Peptide Rows */}
                                {selectedPeptides.map(name => {
                                    const pep = peptideMap.get(name);
                                    return (
                                        <div className="timeline-row" key={name}>
                                            <div className="timeline-pep">
                                                {name}
                                                <small>{pep?.dosing?.frequency || ''}</small>
                                            </div>
                                            <div className="timeline-bars" style={{ gridTemplateColumns: `repeat(${duration}, 1fr)` }}>
                                                {Array.from({ length: duration }, (_, w) => {
                                                    let cls = 'bar active';
                                                    if (w === 0 && experience === 'beginner') cls = 'bar ramp';
                                                    else if (w === duration - 1 && duration > 4) cls = 'bar taper';
                                                    return <div className={cls} key={w} title={`Week ${w + 1}`} />;
                                                })}
                                            </div>
                                            {!pep?.dosing && (
                                                <div className="dosing-pending">Dosing data pending in peptide index — research-only placeholders shown. <a href={`/library/${pep?.slug}`}>View research notes →</a></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{
                                padding: '60px 32px', textAlign: 'center',
                                background: 'var(--bg-soft)', border: '1px solid var(--line)',
                                color: 'var(--ink-mute)', fontFamily: 'var(--serif)',
                                fontStyle: 'italic', fontSize: 18
                            }}>
                                Select peptides from the sidebar to visualize your timeline.
                            </div>
                        )}

                        {/* Reference Dosing */}
                        <div className="section-label reveal" style={{
                            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.25em',
                            textTransform: 'uppercase' as const, color: 'var(--gold)',
                            marginTop: 32, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12
                        }}>
                            <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
                            § Reference Dosing
                        </div>

                        {selectedPeptides.length > 0 && (
                            <div className="dosing-table reveal">
                                <div className="dt-row header">
                                    <div>Peptide</div>
                                    <div>Dose</div>
                                    <div>Frequency</div>
                                    <div>Route</div>
                                    <div>Evidence</div>
                                </div>
                                {selectedPeptides.map(name => {
                                    const pep = peptideMap.get(name);
                                    const ev = pep ? topEvidence(pep) : 'preclinical';
                                    const evLabel = ev.replace(/-/g, ' ');
                                    return (
                                        <div className="dt-row" key={name}>
                                            <div className="pep-cell">{name}</div>
                                            <div className="num-cell" data-label="Dose">{fmtDose(pep?.dosing)}</div>
                                            <div className="num-cell" data-label="Freq">{pep?.dosing?.frequency || '—'}</div>
                                            <div className="num-cell" data-label="Route">{pep?.dosing?.route || '—'}</div>
                                            <div className="num-cell" data-label="Evidence">
                                                <span className={`evidence-badge ${ev}`} style={{ fontSize: 9, padding: '3px 8px' }}>
                                                    {evLabel}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Action Row */}
                        <div className="action-row reveal">
                            <button className="btn-primary" onClick={() => window.print()}>
                                <span>Export protocol PDF</span>
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 12 L8 7 L13 12 M8 7 L8 14 M3 2 L13 2" stroke="currentColor" strokeWidth="1.3" />
                                </svg>
                            </button>
                            <button className="btn-ghost" onClick={handleDownloadIcs}>
                                <Calendar style={{ width: 14, height: 14 }} /> Add to Calendar
                            </button>
                            <button className="btn-ghost" onClick={() => {
                                document.getElementById('shopping-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}>
                                <DollarSign style={{ width: 14, height: 14 }} /> Procurement bridge ↓
                            </button>
                        </div>

                        {/* Inline Vendor Picker — appears after action row */}
                        {selectedPeptides.length > 0 && (
                            <div style={{ marginTop: 32 }}>
                                <div className="section-label" style={{
                                    fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.25em',
                                    textTransform: 'uppercase' as const, color: 'var(--gold)',
                                    marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12
                                }}>
                                    <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
                                    § Find Your Vendor
                                </div>
                                <SmartVendorPicker
                                    mode="inline"
                                    initialPeptideSlug={selectedPeptides[0] ? peptides.find(p => p.name === selectedPeptides[0])?.slug : undefined}
                                />
                            </div>
                        )}

                        {/* ── Procurement Bridge — ShoppingList ── */}
                        {selectedPeptides.length > 0 && results.length > 0 && (
                            <div style={{ marginTop: 40 }}>
                                <div className="section-label reveal" style={{
                                    fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.25em',
                                    textTransform: 'uppercase' as const, color: 'var(--gold)',
                                    marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12
                                }}>
                                    <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
                                    § Procurement Bridge
                                </div>
                                <ShoppingList
                                    cycleResults={results}
                                    maxVendors={5}
                                />
                            </div>
                        )}

                        {/* Warning */}
                        <div className="tool-warning reveal">
                            <strong>⚠ Research reference only</strong>
                            {SHORT_DISCLAIMER}
                        </div>
                    </main>
                </div>

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
                    ⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved
                </div>
            </div>
            </>
    );
}
