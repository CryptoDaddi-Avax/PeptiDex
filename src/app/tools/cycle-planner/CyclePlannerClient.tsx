"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { goals } from "@/data/goals";
import { stacks } from "@/data/stacks";
import { peptides } from "@/data/peptides";
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
    ExternalLink, DollarSign,
} from "lucide-react";
import { Goal, Stack } from "@/data/types";
import { ShareModal } from "@/components/share-card/share-modal";
import type { CycleCardData } from "@/components/share-card/card-templates";
import './cycle-planner-redesign.css';

/* ── Peptides DB for timeline/dosing reference display ── */
const PEPTIDES_DB: Record<string, { dose: string; freq: string; route: string; evidence: string }> = {
  'BPC-157': { dose: '250 mcg', freq: '2x daily', route: 'SC', evidence: 'preclinical' },
  'TB-500': { dose: '2 mg', freq: '2x weekly', route: 'SC/IM', evidence: 'preclinical' },
  'CJC-1295': { dose: '100 mcg', freq: 'Daily', route: 'SC', evidence: 'moderate' },
  'Ipamorelin': { dose: '200 mcg', freq: '2-3x daily', route: 'SC', evidence: 'moderate' },
  'Tesamorelin': { dose: '1 mg', freq: 'Daily', route: 'SC', evidence: 'very-strong' },
  'Semaglutide': { dose: '0.25-2.4 mg', freq: 'Weekly', route: 'SC', evidence: 'very-strong' },
  'Tirzepatide': { dose: '2.5-15 mg', freq: 'Weekly', route: 'SC', evidence: 'very-strong' },
  'Retatrutide': { dose: '1-12 mg', freq: 'Weekly', route: 'SC', evidence: 'strong' },
  'GHK-Cu': { dose: '1-2 mg', freq: 'Daily', route: 'SC/Topical', evidence: 'moderate' },
  'Epitalon': { dose: '5-10 mg', freq: 'Daily x 10-20 days', route: 'SC', evidence: 'preclinical' },
  'Selank': { dose: '250-500 mcg', freq: 'Daily', route: 'IN/SC', evidence: 'moderate' },
  'Semax': { dose: '300-600 mcg', freq: 'Daily', route: 'IN', evidence: 'moderate' },
  'DSIP': { dose: '100-500 mcg', freq: 'Pre-bed', route: 'SC', evidence: 'moderate' },
  'MOTS-c': { dose: '5-10 mg', freq: '2-3x weekly', route: 'SC', evidence: 'emerging' },
  'IGF-1 LR3': { dose: '20-50 mcg', freq: 'Daily', route: 'SC', evidence: 'preclinical' },
  'NAD+': { dose: '100-300 mg', freq: 'Daily', route: 'SC/IV', evidence: 'strong' },
  'Thymosin Alpha-1': { dose: '1.6 mg', freq: '2x weekly', route: 'SC', evidence: 'strong' },
  'Hexarelin': { dose: '200 mcg', freq: '2x daily', route: 'SC', evidence: 'moderate' },
  'Sermorelin': { dose: '200-400 mcg', freq: 'Daily', route: 'SC', evidence: 'strong' },
  'MK-677': { dose: '15-25 mg', freq: 'Daily (oral)', route: 'PO', evidence: 'moderate' },
  'PT-141': { dose: '1.75-2 mg', freq: 'As needed', route: 'SC', evidence: 'very-strong' },
  'Glutathione': { dose: '200-600 mg', freq: 'Daily', route: 'SC/IV', evidence: 'strong' },
  'LL-37': { dose: '50-100 mcg', freq: 'Daily', route: 'SC', evidence: 'moderate' },
  'KPV': { dose: '200-500 mcg', freq: 'Daily', route: 'SC/Oral', evidence: 'preclinical' },
  'Follistatin-344': { dose: '100-300 mcg', freq: 'Daily x 10 days', route: 'SC', evidence: 'preclinical' },
  'Melanotan II': { dose: '250-500 mcg', freq: 'Daily loading', route: 'SC', evidence: 'moderate' },
  'AOD-9604': { dose: '300 mcg', freq: 'Daily', route: 'SC', evidence: 'preclinical' },
  'GHRP-2': { dose: '100-300 mcg', freq: '2-3x daily', route: 'SC', evidence: 'moderate' },
  'GHRP-6': { dose: '100-300 mcg', freq: '2-3x daily', route: 'SC', evidence: 'moderate' },
  'SS-31': { dose: '5-20 mg', freq: 'Daily', route: 'SC', evidence: 'moderate' },
  'Kisspeptin-10': { dose: '50-100 mcg', freq: 'Daily', route: 'SC', evidence: 'moderate' },
  'Tesofensine': { dose: '0.25-0.5 mg', freq: 'Daily (oral)', route: 'PO', evidence: 'strong' },
  'Cagrilintide': { dose: '1.2-4.5 mg', freq: 'Weekly', route: 'SC', evidence: 'strong' },
  // New 2026 peptides
  '5-Amino-1MQ': { dose: '50-100 mg', freq: 'Daily (oral)', route: 'PO', evidence: 'preclinical' },
  'ARA-290': { dose: '4 mg', freq: 'Daily x28d', route: 'SC', evidence: 'moderate' },
  'Gonadorelin': { dose: '100-200 mcg', freq: '2-3x weekly', route: 'SC', evidence: 'strong' },
  'Larazotide': { dose: '500 mcg', freq: '3x daily', route: 'PO', evidence: 'strong' },
  'VIP': { dose: '50 mcg', freq: '4x daily', route: 'IN', evidence: 'emerging' },
  'Oxytocin': { dose: '24-40 IU', freq: '1-2x daily', route: 'IN', evidence: 'moderate' },
  'Thymalin': { dose: '10 mg', freq: 'Daily x10d', route: 'IM', evidence: 'emerging' },
  'Humanin': { dose: '50-200 mcg', freq: 'Daily', route: 'SC', evidence: 'preclinical' },
  'PE-22-28': { dose: '500-1000 mcg', freq: 'Daily', route: 'SC', evidence: 'preclinical' },
  'Pinealon': { dose: '5-10 mg', freq: 'Daily x10d', route: 'SC', evidence: 'preclinical' },
  'Cortagen': { dose: '5-10 mg', freq: 'Daily x10d', route: 'SC', evidence: 'preclinical' },
  'Dihexa': { dose: '5-20 mcg', freq: '2-3x weekly', route: 'PO', evidence: 'preclinical' },
  'FOXO4-DRI': { dose: '5-10 mg', freq: '3x weekly', route: 'SC', evidence: 'preclinical' },
  'Synapsin': { dose: '100-200 mcg', freq: 'Daily', route: 'IN', evidence: 'preclinical' },
  'FGL Loop': { dose: '1-5 mg', freq: 'Daily', route: 'SC', evidence: 'preclinical' },
};

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

    /* ── Goal select handler ── */
    const handleGoalSelect = useCallback((goalKey: string) => {
        setSelectedGoal(goalKey);
        const protocol = GOAL_PROTOCOLS[goalKey];
        if (protocol) {
            setSelectedPeptides([...protocol.peptides]);
            setDuration(protocol.duration);
            // Sync with engine
            const names = new Set(protocol.peptides);
            setEnabledPeptides(names);
            const newConfigs = new Map<string, CyclePeptideConfig>();
            protocol.peptides.forEach(name => {
                newConfigs.set(name, { ...getDefaultConfig(name), cycleWeeks: protocol.duration });
            });
            setConfigs(newConfigs);
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

    /* ── All peptide names (for the checkbox list) ── */
    const allPeptideNames = useMemo(() => Object.keys(PEPTIDES_DB), []);

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
                        {/* Goal */}
                        <div className="control-group">
                            <div className="control-label">Goal</div>
                            <div className="goal-pills">
                                {Object.entries(GOAL_PROTOCOLS).map(([key, proto]) => (
                                    <button
                                        key={key}
                                        className={`goal-pill ${selectedGoal === key ? 'active' : ''}`}
                                        onClick={() => handleGoalSelect(key)}
                                    >
                                        {proto.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="control-group">
                            <div className="control-label">Duration</div>
                            <div className="duration-slider">
                                <input
                                    type="range"
                                    min={2}
                                    max={16}
                                    value={duration}
                                    onChange={e => {
                                        const val = parseInt(e.target.value);
                                        setDuration(val);
                                        // Sync engine configs
                                        setConfigs(prev => {
                                            const next = new Map(prev);
                                            for (const [name, config] of next.entries()) {
                                                next.set(name, { ...config, cycleWeeks: val });
                                            }
                                            return next;
                                        });
                                    }}
                                />
                                <div className="duration-value">{duration} weeks</div>
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="control-group">
                            <div className="control-label">Experience</div>
                            <div className="experience-tabs">
                                {EXPERIENCE_LEVELS.map(level => (
                                    <button
                                        key={level}
                                        className={`exp-tab ${experience === level ? 'active' : ''}`}
                                        onClick={() => setExperience(level)}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selected Peptides */}
                        <div className="control-group">
                            <div className="control-label">Selected Peptides</div>
                            <div className="peptide-checks">
                                {allPeptideNames.map(name => {
                                    const isChecked = selectedPeptides.includes(name);
                                    const info = PEPTIDES_DB[name];
                                    return (
                                        <label
                                            key={name}
                                            className={`pep-check ${isChecked ? 'checked' : ''}`}
                                        >
                                            <input
                                                type="checkbox"
                                                className="pep-check-input"
                                                checked={isChecked}
                                                onChange={e => togglePeptide(name, e.target.checked)}
                                            />
                                            <span className="pep-check-label">{name}</span>
                                            {info?.route && (
                                                <span className="pep-check-route">{info.route}</span>
                                            )}
                                        </label>
                                    );
                                })}
                            </div>
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
                                    const info = PEPTIDES_DB[name];
                                    return (
                                        <div className="timeline-row" key={name}>
                                            <div className="timeline-pep">
                                                {name}
                                                <small>{info?.freq || ''}</small>
                                            </div>
                                            <div className="timeline-bars" style={{ gridTemplateColumns: `repeat(${duration}, 1fr)` }}>
                                                {Array.from({ length: duration }, (_, w) => {
                                                    let cls = 'bar active';
                                                    if (w === 0 && experience === 'beginner') cls = 'bar ramp';
                                                    else if (w === duration - 1 && duration > 4) cls = 'bar taper';
                                                    return <div className={cls} key={w} title={`Week ${w + 1}`} />;
                                                })}
                                            </div>
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
                                    const info = PEPTIDES_DB[name] || {};
                                    const evLabel = (info.evidence || '').replace('-', ' ');
                                    return (
                                        <div className="dt-row" key={name}>
                                            <div className="pep-cell">{name}</div>
                                            <div className="num-cell" data-label="Dose">{info.dose || '—'}</div>
                                            <div className="num-cell" data-label="Freq">{info.freq || '—'}</div>
                                            <div className="num-cell" data-label="Route">{info.route || '—'}</div>
                                            <div className="num-cell" data-label="Evidence">
                                                <span
                                                    className={`evidence-badge ${info.evidence || ''}`}
                                                    style={{ fontSize: 9, padding: '3px 8px' }}
                                                >
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
                            <Link href="/vendors" className="btn-ghost">
                                Find vendors →
                            </Link>
                        </div>

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
