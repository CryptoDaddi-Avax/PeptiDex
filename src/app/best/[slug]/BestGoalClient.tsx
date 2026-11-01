"use client";

import Link from "next/link";
import { getPeptideBySlug } from "@/data/peptides";
import { getGoalPage } from "@/data/goal-pages";
import { getCategoryIcon } from "@/data/category-icons";
import { SaveButton } from "@/components/save-button";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { AuthorByline } from '@/components/shared/AuthorByline';
import { LAST_REVIEWED_DATE, LAST_REVIEWED_ISO, EVIDENCE_SCALE } from '@/data/constants';
import { PeptideStackCard } from '@/components/affiliate/PeptideStackCard';
import { StackCartBuilder } from '@/components/affiliate/StackCartBuilder';
import './best-goal-redesign.css';

interface BestGoalClientProps {
    slug: string;
}

/* ── Stack card helpers ──────────────────────────────────────────────────── */

const ROLE_SEQUENCE = ['primary', 'synergist', 'support', 'support', 'support', 'support'] as const;
type PepRole = typeof ROLE_SEQUENCE[number];

function getPepCardRole(index: number): PepRole {
    return ROLE_SEQUENCE[index] ?? 'support';
}

function getPepEvidenceLabel(pep: { key_studies?: { evidence_level?: string }[]; category?: string }): string {
    const level = pep.key_studies?.[0]?.evidence_level;
    if (level && EVIDENCE_SCALE[level]) return `${EVIDENCE_SCALE[level].label} evidence`.slice(0, 28);
    return (pep.category ?? 'See library').slice(0, 28);
}

function getPepRationale(pep: { primary_benefits?: string; mechanism?: string | null }): string {
    const src = pep.primary_benefits || pep.mechanism || '';
    return src.slice(0, 120);
}

export default function BestGoalClient({ slug }: BestGoalClientProps) {
    const goal = getGoalPage(slug);
    if (!goal) return null; // Server caught 404

    const peptides = goal.peptideSlugs.map(getPeptideBySlug).filter(Boolean) as NonNullable<ReturnType<typeof getPeptideBySlug>>[];

    /* Derive a clean display name for the title */
    const titleText = goal.h1.replace(/^Best Peptides for\s*/i, '');

    /* Studies cited for this goal (goal references + key studies of featured peptides), de-duplicated by URL */
    const citedStudyCount = new Set([
        ...peptides.flatMap(p => p.key_studies.map(s => s.pubmed_url)),
        ...(goal.references ?? []).map(r => r.link),
    ].filter(Boolean)).size;

    /* Side-by-side comparison of the featured peptides (compare tool accepts up to 3) */
    const compareHref = peptides.length >= 2
        ? `/tools/compare?p=${peptides.slice(0, 3).map(p => p.slug).join(',')}`
        : '/tools/compare';

    return (
            <>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <h1 className="goal-page-title">
                            {titleText.split(' ').slice(0, -1).join(' ')}{' '}
                            <em>{titleText.split(' ').slice(-1)[0]?.toLowerCase()}</em>.
                        </h1>
                        <SaveButton type="goal" slug={slug} title={goal.h1} />
                    </div>

                    <AuthorByline name="Dr. E. Vance" date={LAST_REVIEWED_DATE} variant="compact" className="justify-center mt-6 mb-2" />

                    <p className="goal-page-subtitle">{goal.intro}</p>
                    <div className="goal-page-meta">
                        <div className="goal-meta-item"><strong>{goal.stackNames.length}</strong> curated stack{goal.stackNames.length !== 1 ? 's' : ''}</div>
                        <div className="goal-meta-item"><strong>{peptides.length}</strong> peptides involved</div>
                        {citedStudyCount > 0 && (
                            <div className="goal-meta-item"><strong>{citedStudyCount}</strong> cited stud{citedStudyCount !== 1 ? 'ies' : 'y'}</div>
                        )}
                        <div className="goal-meta-item"><strong>Intermediate</strong> level</div>
                    </div>
                </div>
            </header>

            {/* ═══ STACK SECTION ═══ */}
            <section className="goal-protocol-section fade-up">
                <div className="goal-container">
                    <div className="goal-section-label">§ The Research</div>
                    <h2 className="goal-protocol-title">
                        The <em>{titleText}</em> stack.
                    </h2>
                    <p className="goal-protocol-desc">
                        Peptides studied for {titleText.toLowerCase()}, grouped by complementary mechanisms of action.
                    </p>

                    <div className="goal-protocol-block">
                        <div className="goal-section-label">§ The Stack</div>
                        <h3 className="goal-protocol-block-title">
                            {peptides.length} peptides, <em>complementary</em> roles.
                        </h3>
                        <p className="goal-protocol-block-desc">
                            Each peptide has been studied through a different mechanism; no controlled human trial has tested these compounds as a combination.
                        </p>

                        {/* ── PeptideStackCard grid ── */}
                        <div className="goal-protocol-grid">
                            {peptides.map((pep, i) => (
                                <PeptideStackCard
                                    key={pep.slug}
                                    peptideSlug={pep.slug}
                                    peptideName={pep.name}
                                    role={getPepCardRole(i)}
                                    summaryLabel={getPepEvidenceLabel(pep)}
                                    rationale={getPepRationale(pep)}
                                    surface="goal_page"
                                />
                            ))}
                            <Link href={compareHref} className="goal-protocol-pep cta-card">
                                <div className="goal-pep-role">§ Go deeper</div>
                                <h4>Compare these peptides</h4>
                                <p>See evidence levels, half-lives, synergies, and safety notes side by side in the Compare tool.</p>
                            </Link>
                        </div>
                    </div>

                    {/* Research overview */}
                    <div className="goal-section-label goal-outcomes-label">§ Research Overview</div>
                    <h3 className="goal-outcomes-title">Outcomes reported in <em>published studies</em>.</h3>

                    <div className="goal-expected-results">
                        <div className="goal-result-card">
                            <div className="goal-result-label">Research area</div>
                            <div className="goal-result-value">{titleText}</div>
                            <div className="goal-result-desc">Mostly preclinical or small human studies; see citations below</div>
                        </div>
                        <div className="goal-result-card">
                            <div className="goal-result-label">Compounds</div>
                            <div className="goal-result-value">{peptides.length} active</div>
                            <div className="goal-result-desc">Studied via {peptides.length} distinct mechanisms</div>
                        </div>
                        <div className="goal-result-card">
                            <div className="goal-result-label">Stacks</div>
                            <div className="goal-result-value">{goal.stackNames.length} curated</div>
                            <div className="goal-result-desc">{goal.stackNames.join(', ')}</div>
                        </div>
                    </div>

                    <div className="goal-cta-row">
                        <Link href={compareHref} className="btn-primary">
                            <span>Compare side by side</span>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5"/></svg>
                        </Link>
                        <Link href="/vendors" className="btn-ghost">Find verified sources</Link>
                    </div>
                </div>
            </section>

            {/* ═══ EXPANDED EDITORIAL CONTENT ═══ */}
            {(goal.whyThesePeptides || goal.whatResearchShows || goal.howToEvaluate || goal.alternativeApproaches) && (
                <section className="goal-editorial-section" style={{ padding: '48px 32px', maxWidth: 800, margin: '0 auto', color: '#e4e4e7', lineHeight: 1.6 }}>
                    {goal.whyThesePeptides && (
                        <div className="editorial-block mb-12 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: goal.whyThesePeptides }} />
                    )}
                    {goal.whatResearchShows && (
                        <div className="editorial-block mb-12 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: goal.whatResearchShows }} />
                    )}
                    {goal.howToEvaluate && (
                        <div className="editorial-block mb-12 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: goal.howToEvaluate }} />
                    )}
                    {goal.alternativeApproaches && (
                        <div className="editorial-block mb-12 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: goal.alternativeApproaches }} />
                    )}
                </section>
            )}

            {/* ═══ REFERENCES ═══ */}
            {goal.references && goal.references.length > 0 && (
                <section className="goal-references-section" style={{ padding: '0 32px 48px', maxWidth: 800, margin: '0 auto' }}>
                    <div className="goal-section-label mb-6" style={{ color: '#8b5cf6', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>§ Citations</div>
                    <ol className="list-decimal pl-5 text-sm text-zinc-400 space-y-3">
                        {goal.references.map(ref => (
                            <li key={ref.id}>
                                {ref.text} <a href={ref.link} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">PubMed</a>
                            </li>
                        ))}
                    </ol>
                </section>
            )}

            {/* ═══ STACK CART BUILDER ═══ */}
            {peptides.length > 0 && (
                <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 48px' }}>
                    <div className="goal-section-label mb-4" style={{ color: '#c9a961', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        § Source This Stack
                    </div>
                    <StackCartBuilder
                        peptideSlugs={goal.peptideSlugs}
                        stackName={goal.h1.replace(/^Best Peptides for\s*/i, '')}
                        surface="stack_builder"
                    />
                </section>
            )}

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

            {/* ═══ NEWSLETTER ═══ */}
            <div style={{ padding: '0 32px', maxWidth: 800, margin: '0 auto' }}>
                <NewsletterSignup source={`goal_${slug}`} />
            </div>



            {/* Last Reviewed */}
            <div className="goal-last-reviewed">
                Last reviewed: <time dateTime={LAST_REVIEWED_ISO}>{LAST_REVIEWED_DATE}</time> · PeptiDex Editorial Team
            </div>

            {/* ═══ DISCLAIMER ═══ */}
            <div className="goal-disclaimer">
                ⚠ Educational only · Not medical advice · Most peptides discussed here are not FDA-approved and are sold for research use only, not for human consumption
            </div>
            </>
    );
}
