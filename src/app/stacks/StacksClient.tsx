'use client';

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { stacks } from "@/data/stacks";
import { Users, BookmarkPlus, Bookmark, Activity, Beaker, BookOpen } from "lucide-react";
import { peptides } from "@/data/peptides";
import RedesignLayout from '@/components/redesign/RedesignLayout';
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

    const toggleSave = (stackName: string) => {
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
        <RedesignLayout>
            <div className="stacks-wrap">
                <div className="stacks-header">
                    <h1 className="stacks-title">
                        <div className="stacks-title-icon">
                            <Users />
                        </div>
                        Community Stacks
                    </h1>
                    <p className="stacks-subtitle">
                        Curated peptide protocols for specific goals. Learn from community knowledge.
                    </p>
                </div>

                <div className="stacks-filters">
                    <button 
                        onClick={() => setFilter("all")}
                        className={`stacks-filter-btn ${filter === "all" ? "active" : ""}`}
                    >
                        All Stacks
                    </button>
                    <button 
                        onClick={() => setFilter("saved")}
                        className={`stacks-filter-btn ${filter === "saved" ? "active" : ""}`}
                    >
                        Saved ({savedStackIds.length})
                    </button>
                </div>

                <div className="stacks-grid">
                    {filtered.map((stack, i) => (
                        <div key={stack.stack_name} className="stack-card">
                            {/* Header */}
                            <div className="stack-card-header">
                                <div>
                                    <h2 className="stack-card-title">{stack.stack_name}</h2>
                                    <p className="stack-card-goal">{stack.goal}</p>
                                </div>
                                <button 
                                    onClick={() => toggleSave(stack.stack_name)} 
                                    className={`stack-save-btn ${savedStackIds.includes(stack.stack_name) ? "saved" : ""}`}
                                    aria-label="Save stack"
                                >
                                    {savedStackIds.includes(stack.stack_name) ? <Bookmark style={{fill: "currentColor"}} /> : <BookmarkPlus />}
                                </button>
                            </div>

                            {/* Content */}
                            <div className="stack-card-content">
                                {/* Peptides List */}
                                <div className="stack-section">
                                    <h3 className="stack-section-title"><Beaker /> Stack Compounds</h3>
                                    <div className="stack-compounds">
                                        {stack.peptides.map((p) => {
                                            const pepData = peptides.find(x => x.name === p.name);
                                            return (
                                                <div key={p.name} className="stack-compound">
                                                    <Link 
                                                        href={`/library/${pepData?.slug || p.name.toLowerCase()}`} 
                                                        className="stack-compound-name"
                                                    >
                                                        {p.name}
                                                    </Link>
                                                    <span className="stack-compound-role">{p.role_in_stack}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Synergy */}
                                <div className="stack-section">
                                    <h3 className="stack-section-title"><Activity /> Why It Works</h3>
                                    <p className="stack-text-box">{stack.synergy_rationale}</p>
                                </div>

                                {/* Studies */}
                                <div className="stack-section">
                                    <h3 className="stack-section-title"><BookOpen /> Key Studies</h3>
                                    <ul className="stack-studies-list">
                                        {stack.supporting_studies.map((s, idx) => (
                                            <li key={idx} className="stack-study-item">
                                                <span>
                                                    {s.description}   
                                                    <a href={s.pubmed_url} target="_blank" rel="noopener noreferrer" className="stack-study-link">PubMed</a>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && filter === "saved" && (
                        <div className="stacks-empty">
                            <Bookmark />
                            <h3>No saved stacks yet</h3>
                            <p>Browse the community stacks and save your favorites.</p>
                            <button onClick={() => setFilter("all")} className="stacks-empty-btn">Browse All</button>
                        </div>
                    )}
                </div>
            </div>
        </RedesignLayout>
    );
}
