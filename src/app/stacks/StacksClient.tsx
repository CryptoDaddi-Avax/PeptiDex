'use client';

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { stacks } from "@/data/stacks";
import { BookmarkPlus, Bookmark } from "lucide-react";
import './stacks-redesign.css';

const SAVED_STACKS_KEY = "PeptiDex-saved-stacks";

export default function StacksClient() {
    const [savedStackIds, setSavedStackIds] = useState<string[]>([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = JSON.parse(localStorage.getItem(SAVED_STACKS_KEY) || "[]");
                setSavedStackIds(saved);
            } catch { }
        }
    }, []);

    const toggleSave = (e: React.MouseEvent, stackName: string) => {
        e.preventDefault();
        setSavedStackIds((prev) => {
            const next = prev.includes(stackName) ? prev.filter(id => id !== stackName) : [...prev, stackName];
            localStorage.setItem(SAVED_STACKS_KEY, JSON.stringify(next));
            return next;
        });
    };

    const filtered = useMemo(() => {
        let list = stacks;
        if (filter === "saved") {
            list = list.filter(s => savedStackIds.includes(s.stack_name));
        }
        return list;
    }, [filter, savedStackIds]);

    return (
            <>
            <header className="page-header">
                <div className="page-header-grid"></div>
                <div className="page-header-wrap">
                    <div className="breadcrumb">
                        <Link href="/">Home</Link><span className="sep">/</span><span className="current">Stacks</span>
                    </div>
                    <div className="section-label">§ Curated Protocols</div>
                    <h1 className="page-title">12 expert-curated <em>stacks</em>.</h1>
                    <p className="page-subtitle">Each protocol is built around a specific outcome, dosed against published literature, and cross-referenced with sourcing data. Pick a goal, get a stack, plan a cycle.</p>
                    <div className="page-meta">
                        <div className="page-meta-item"><strong>{stacks.length}</strong> protocols</div>
                        <div className="page-meta-item"><strong>{stacks.length}</strong> goal categories</div>
                        <div className="page-meta-item"><strong>Updated</strong> for 2026</div>
                    </div>
                </div>
            </header>

            <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
                <div className="stacks-filters" style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
                    <button 
                        onClick={() => setFilter("all")}
                        className={`filter-btn ${filter === "all" ? "active" : ""}`}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '4px',
                            fontFamily: 'var(--sans)',
                            fontSize: '13px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            border: '1px solid var(--line)',
                            background: filter === 'all' ? 'var(--gold)' : 'rgba(244,239,230,0.02)',
                            color: filter === 'all' ? 'var(--bg)' : 'var(--ink-mute)',
                            transition: 'all 0.2s'
                        }}
                    >
                        All Stacks
                    </button>
                    <button 
                        onClick={() => setFilter("saved")}
                        className={`filter-btn ${filter === "saved" ? "active" : ""}`}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '4px',
                            fontFamily: 'var(--sans)',
                            fontSize: '13px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            border: '1px solid var(--line)',
                            background: filter === 'saved' ? 'var(--gold)' : 'rgba(244,239,230,0.02)',
                            color: filter === 'saved' ? 'var(--bg)' : 'var(--ink-mute)',
                            transition: 'all 0.2s'
                        }}
                    >
                        Saved ({savedStackIds.length})
                    </button>
                </div>

                <div className="stacks-grid">
                    {filtered.map((stack, i) => {
                        const category = stack.stack_name.replace(/ Stack$/i, '');
                        const isSaved = savedStackIds.includes(stack.stack_name);
                        return (
                            <Link key={stack.stack_name} href={`/stacks/${stack.slug}`} className="stack-card">
                                <div className="stack-header">
                                    <div className="stack-goal">{category}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {i === 0 && filter === 'all' && <span className="stack-tag">Most popular</span>}
                                        <button 
                                            onClick={(e) => toggleSave(e, stack.stack_name)} 
                                            className="stack-save-btn"
                                            aria-label="Save stack"
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: isSaved ? 'var(--gold)' : 'var(--ink-mute)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '4px',
                                                transition: 'color 0.2s'
                                            }}
                                        >
                                            {isSaved ? <Bookmark style={{fill: "currentColor"}} size={18} /> : <BookmarkPlus size={18} />}
                                        </button>
                                    </div>
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 className="stack-name">{stack.stack_name.replace(/ Stack$/i, '')}</h3>
                                    <p className="stack-desc">{stack.goal}</p>
                                </div>
                                <div className="stack-peptides">
                                    {stack.peptides.map(p => (
                                        <span key={p.name} className="pep">{p.name}</span>
                                    ))}
                                </div>
                                <div className="stack-meta">
                                    <span>{stack.peptides.length} compounds</span>
                                    <span className="stack-arrow">→</span>
                                </div>
                            </Link>
                        );
                    })}

                    {filtered.length === 0 && filter === "saved" && (
                        <div className="stacks-empty" style={{ gridColumn: '1 / -1', padding: '60px 24px', textAlign: 'center', border: '1px dashed var(--line)', background: 'rgba(244,239,230,0.02)', borderRadius: '12px' }}>
                            <Bookmark size={32} style={{ color: 'var(--ink-mute)', marginBottom: '16px' }} />
                            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: 'var(--ink)', margin: '0 0 12px' }}>No saved stacks yet</h3>
                            <p style={{ color: 'var(--ink-dim)', marginBottom: '24px' }}>Browse the community stacks and save your favorites.</p>
                            <button 
                                onClick={() => setFilter("all")} 
                                style={{
                                    padding: '12px 24px',
                                    background: 'transparent',
                                    color: 'var(--ink)',
                                    border: '1px solid var(--line-strong)',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--sans)',
                                    fontSize: '13px',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    transition: 'all 0.3s'
                                }}
                            >
                                Browse All
                            </button>
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '80px', padding: '48px', background: 'var(--bg-card)', borderLeft: '3px solid var(--gold)' }} className="fade-up is-visible">
                    <div className="section-label">§ Need help choosing?</div>
                    <h3 style={{ fontFamily: 'var(--serif)', fontSize: '36px', fontWeight: 300, marginBottom: '16px', letterSpacing: '-0.02em' }}>
                        Try the <em className="text-gold italic">Cycle Planner</em>.
                    </h3>
                    <p style={{ color: 'var(--ink-dim)', fontSize: '16px', lineHeight: 1.6, maxWidth: '680px', marginBottom: '24px' }}>
                        Get a personalized peptide protocol based on your goals, experience level, and timeline. Free, instant, and based on published research dosing.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Link href="/tools/cycle-planner" className="btn-primary">
                            <span>Open the Cycle Planner</span>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '8px' }}><path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5"/></svg>
                        </Link>
                        <Link href="/tools/compare" className="btn-ghost">
                            Compare peptides
                        </Link>
                    </div>
                </div>
            </div>
            </>
    );
}
