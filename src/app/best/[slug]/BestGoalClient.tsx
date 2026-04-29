"use client";

import Link from "next/link";
import { getPeptideBySlug } from "@/data/peptides";
import { getGoalPage } from "@/data/goal-pages";
import { getCategoryIcon } from "@/data/category-icons";
import RedesignLayout from '@/components/redesign/RedesignLayout';
import './best-goal-redesign.css';

interface BestGoalClientProps {
    slug: string;
}

/* Dosing role text helper */
function getPepRole(pep: { category?: string; primary_benefits?: string }, index: number): string {
    const roles = ['Anchor', 'Support', 'Pulse', 'Modulator', 'Optimizer', 'Auxiliary'];
    const label = roles[index] || `Compound ${index + 1}`;
    const desc = pep.primary_benefits || pep.category || '';
    return `§ ${label} — ${desc}`;
}

export default function BestGoalClient({ slug }: BestGoalClientProps) {
    const goal = getGoalPage(slug);
    if (!goal) return null; // Server caught 404

    const peptides = goal.peptideSlugs.map(getPeptideBySlug).filter(Boolean) as NonNullable<ReturnType<typeof getPeptideBySlug>>[];

    /* Derive a clean display name for the title */
    const titleText = goal.h1.replace(/^Best Peptides for\s*/i, '');

    return (
        <RedesignLayout>
            {/* ═══ HERO ═══ */}
            <header className="goal-hero">
                <div className="goal-hero-grid" />
                <div className="goal-hero-wrap">
                    <nav className="goal-breadcrumb">
                        <Link href="/">Home</Link>
                        <span className="sep">/</span>
                        <Link href="/stacks">Goals</Link>
                        <span className="sep">/</span>
                        <span className="current">{titleText}</span>
                    </nav>
                    <div className="goal-icon-large">{goal.emoji}</div>
                    <div className="goal-section-label">§ Research Goal</div>
                    <h1 className="goal-page-title">
                        {titleText.split(' ').slice(0, -1).join(' ')}{' '}
                        <em>{titleText.split(' ').slice(-1)[0]?.toLowerCase()}</em>.
                    </h1>
                    <p className="goal-page-subtitle">{goal.intro}</p>
                    <div className="goal-page-meta">
                        <div className="goal-meta-item"><strong>{goal.stackNames.length}</strong> curated stack{goal.stackNames.length !== 1 ? 's' : ''}</div>
                        <div className="goal-meta-item"><strong>{peptides.length}</strong> peptides involved</div>
                        <div className="goal-meta-item"><strong>12</strong> week protocol</div>
                        <div className="goal-meta-item"><strong>Intermediate</strong> level</div>
                    </div>
                </div>
            </header>

            {/* ═══ PROTOCOL SECTION ═══ */}
            <section className="goal-protocol-section reveal">
                <div className="goal-container">
                    <div className="goal-section-label">§ The Protocol</div>
                    <h2 className="goal-protocol-title">
                        The <em>{titleText}</em> stack.
                    </h2>
                    <p className="goal-protocol-desc">
                        A balanced protocol engineered for {titleText.toLowerCase()} via targeted peptide synergy.
                    </p>

                    <div className="goal-protocol-block">
                        <div className="goal-section-label">§ The Stack</div>
                        <h3 className="goal-protocol-block-title">
                            {peptides.length} peptides, <em>precisely</em> sequenced.
                        </h3>
                        <p className="goal-protocol-block-desc">
                            Each peptide plays a specific role. Removing any one breaks the synergy.
                        </p>

                        <div className="goal-protocol-grid">
                            {peptides.map((pep, i) => (
                                <Link key={pep.slug} href={`/library/${pep.slug}`} className="goal-protocol-pep">
                                    <div className="goal-pep-role">{getPepRole(pep, i)}</div>
                                    <h4>{pep.name}</h4>
                                    <p>{pep.mechanism?.slice(0, 180) || pep.primary_benefits}</p>
                                </Link>
                            ))}
                            <Link href={`/tools/cycle-planner?goal=${slug}`} className="goal-protocol-pep cta-card">
                                <div className="goal-pep-role">§ Build your version</div>
                                <h4>Customize this protocol</h4>
                                <p>Open this protocol in the Cycle Planner to adjust duration, swap peptides, and generate your reference dosing chart.</p>
                            </Link>
                        </div>
                    </div>

                    {/* Expected outcomes */}
                    <div className="goal-section-label goal-outcomes-label">§ Expected Outcomes</div>
                    <h3 className="goal-outcomes-title">Based on published <em>trial data</em>.</h3>

                    <div className="goal-expected-results">
                        <div className="goal-result-card">
                            <div className="goal-result-label">Primary target</div>
                            <div className="goal-result-value">{titleText}</div>
                            <div className="goal-result-desc">Optimized through peptide synergy</div>
                        </div>
                        <div className="goal-result-card">
                            <div className="goal-result-label">Compounds</div>
                            <div className="goal-result-value">{peptides.length} active</div>
                            <div className="goal-result-desc">Covering {peptides.length} complementary pathways</div>
                        </div>
                        <div className="goal-result-card">
                            <div className="goal-result-label">Stacks</div>
                            <div className="goal-result-value">{goal.stackNames.length} curated</div>
                            <div className="goal-result-desc">{goal.stackNames.join(', ')}</div>
                        </div>
                    </div>

                    <div className="goal-cta-row">
                        <Link href={`/tools/cycle-planner?goal=${slug}`} className="btn-primary">
                            <span>Plan this cycle</span>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5"/></svg>
                        </Link>
                        <Link href="/vendors" className="btn-ghost">Find verified sources</Link>
                    </div>
                </div>
            </section>

            {/* ═══ FAQ ═══ */}
            {goal.faqs.length > 0 && (
                <section className="goal-faq-section">
                    <div className="goal-container">
                        <div className="goal-section-label">§ Knowledge Base</div>
                        <h2 className="goal-faq-title">Frequently asked <em>questions</em>.</h2>
                        <div className="goal-faq-list">
                            {goal.faqs.map((faq, i) => (
                                <div key={i} className="goal-faq-item">
                                    <h3>{faq.question}</h3>
                                    <p>{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══ RELATED GOALS ═══ */}
            {goal.relatedGoals.length > 0 && (
                <section className="goal-related-section">
                    <div className="goal-container">
                        <div className="goal-related-label">§ Related Goals</div>
                        <div className="goal-related-grid">
                            {goal.relatedGoals.map(rg => {
                                const related = getGoalPage(rg);
                                if (!related) return null;
                                const relatedTitle = related.h1.replace(/^Best Peptides for\s*/i, '');
                                return (
                                    <Link key={rg} href={`/best/${rg}`} className="goal-related-link">
                                        {related.emoji} {relatedTitle}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══ DISCLAIMER ═══ */}
            <div className="goal-disclaimer">
                ⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved
            </div>
        </RedesignLayout>
    );
}
