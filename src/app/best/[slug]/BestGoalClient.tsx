"use client";

import Link from "next/link";
import { getPeptideBySlug } from "@/data/peptides";
import { getGoalPage } from "@/data/goal-pages";
import { ArrowRight, FlaskConical, HelpCircle, ChevronRight, Sparkles } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";
import RedesignLayout from '@/components/redesign/RedesignLayout';
import './best-goal-redesign.css';

interface BestGoalClientProps {
    slug: string;
}

export default function BestGoalClient({ slug }: BestGoalClientProps) {
    const goal = getGoalPage(slug);
    if (!goal) return null; // Server caught 404

    const peptides = goal.peptideSlugs.map(getPeptideBySlug).filter(Boolean) as NonNullable<ReturnType<typeof getPeptideBySlug>>[];

    return (
        <RedesignLayout>
            <div className="goal-wrap">
                <div className="goal-header">
                    <span className="goal-emoji">{goal.emoji}</span>
                    <h1 className="goal-title">{goal.h1}</h1>
                    <div className="goal-meta">Updated 2026 \u00b7 Research-backed \u00b7 PeptiDex</div>
                    <p className="goal-intro">{goal.intro}</p>
                </div>

                <div className="goal-section-title"><FlaskConical style={{width:16}}/> Top Peptides</div>
                <div className="goal-pep-list">
                    {peptides.map(pep => (
                        <Link key={pep.slug} href={`/library/${pep.slug}`} className="goal-pep-card">
                            <div className="goal-pep-icon">{getCategoryIcon(pep.category)}</div>
                            <div className="goal-pep-content">
                                <div className="goal-pep-top">
                                    <h3 className="goal-pep-name">{pep.name}</h3>
                                    <ChevronRight />
                                </div>
                                <p className="goal-pep-desc">{pep.primary_benefits}</p>
                                <p className="goal-pep-mech">{pep.mechanism.slice(0, 150)}...</p>
                                {pep.dosing && (
                                    <div className="goal-pep-badges">
                                        <span className="goal-pep-badge">{pep.dosing.typical_dose_mcg[0]}-{pep.dosing.typical_dose_mcg[1]} mcg</span>
                                        <span className="goal-pep-badge">{pep.dosing.route}</span>
                                        <span className="goal-pep-badge">{pep.dosing.frequency}</span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {goal.stackNames.length > 0 && (
                    <>
                        <div className="goal-section-title alt1"><Sparkles style={{width:16}}/> Recommended Stacks</div>
                        <div className="goal-stack-list">
                            {goal.stackNames.map(name => (
                                <Link key={name} href="/stacks" className="goal-stack-card">
                                    <span className="goal-stack-name">{name}</span>
                                    <ArrowRight />
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                <div className="goal-section-title alt2"><HelpCircle style={{width:16}}/> Frequently Asked Questions</div>
                <div className="goal-faq-list">
                    {goal.faqs.map((faq, i) => (
                        <div key={i} className="goal-faq-card">
                            <h3 className="goal-faq-q">{faq.question}</h3>
                            <p className="goal-faq-a">{faq.answer}</p>
                        </div>
                    ))}
                </div>

                {goal.relatedGoals.length > 0 && (
                    <div className="goal-related">
                        <div className="goal-related-title">Related Goals</div>
                        <div className="goal-related-tags">
                            {goal.relatedGoals.map(rg => {
                                const related = getGoalPage(rg);
                                if (!related) return null;
                                return (
                                    <Link key={rg} href={`/best/${rg}`} className="goal-related-tag">
                                        {related.emoji} {related.h1.replace("Best Peptides for ", "")}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )}

                <div className="goal-cta-wrap">
                    <Link href="/quiz" className="goal-cta-btn primary">
                        Find Your Stack <ArrowRight style={{width:16}}/>
                    </Link>
                    <Link href="/library" className="goal-cta-btn secondary">
                        Browse All Peptides
                    </Link>
                </div>
            </div>
        </RedesignLayout>
    );
}
