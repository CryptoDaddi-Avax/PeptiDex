import { notFound } from "next/navigation";
import { goalPages, getGoalPage } from "@/data/goal-pages";
import { getPeptideBySlug } from "@/data/peptides";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FlaskConical, HelpCircle, ChevronRight, Sparkles } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";

export function generateStaticParams() {
    return goalPages.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const goal = getGoalPage(slug);
    if (!goal) return { title: "Not Found" };
    return {
        title: goal.title,
        description: goal.metaDescription,
        keywords: goal.keywords,
        openGraph: { type: "article", title: goal.h1, description: goal.metaDescription, siteName: "PeptiDex" },
    };
}

export default async function BestPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const goal = getGoalPage(slug);
    if (!goal) notFound();

    const peptides = goal.peptideSlugs.map(getPeptideBySlug).filter(Boolean);

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: goal.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
                {/* Header */}
                <div className="text-center mb-6">
                    <span className="text-3xl mb-2 block">{goal.emoji}</span>
                    <h1 className="text-2xl font-bold text-zinc-100 mb-2">{goal.h1}</h1>
                    <p className="text-xs text-zinc-500 mb-3">Updated 2026 · Research-backed · PeptiDex</p>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-lg mx-auto">{goal.intro}</p>
                </div>

                {/* Featured Peptides */}
                <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-violet-400" /> Top Peptides
                </h2>
                <div className="space-y-3 mb-8">
                    {peptides.map((pep) => {
                        if (!pep) return null;
                        return (
                            <Link
                                key={pep.slug}
                                href={`/library/${pep.slug}`}
                                className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors group"
                            >
                                <span className="text-lg">{getCategoryIcon(pep.category)}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors">{pep.name}</h3>
                                        <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                                    </div>
                                    <p className="text-xs text-zinc-400 mt-0.5">{pep.primary_benefits}</p>
                                    <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2">{pep.mechanism.slice(0, 150)}...</p>
                                    {pep.dosing && (
                                        <div className="flex gap-3 mt-2">
                                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500">
                                                {pep.dosing.typical_dose_mcg[0]}-{pep.dosing.typical_dose_mcg[1]} mcg
                                            </span>
                                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500">
                                                {pep.dosing.route}
                                            </span>
                                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500">
                                                {pep.dosing.frequency}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Recommended Stacks */}
                {goal.stackNames.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-400" /> Recommended Stacks
                        </h2>
                        <div className="space-y-2">
                            {goal.stackNames.map((name) => (
                                <Link
                                    key={name}
                                    href="/stacks"
                                    className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 hover:border-emerald-500/30 transition-colors"
                                >
                                    <span className="text-sm font-medium text-zinc-200">{name}</span>
                                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* FAQs */}
                <div className="mb-8">
                    <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-amber-400" /> Frequently Asked Questions
                    </h2>
                    <div className="space-y-3">
                        {goal.faqs.map((faq, i) => (
                            <div key={i} className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
                                <h3 className="text-sm font-medium text-zinc-200 mb-1.5">{faq.question}</h3>
                                <p className="text-xs text-zinc-400 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related Goals */}
                <div className="mb-6">
                    <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Related Goals</h2>
                    <div className="flex flex-wrap gap-2">
                        {goal.relatedGoals.map((rg) => {
                            const related = getGoalPage(rg);
                            if (!related) return null;
                            return (
                                <Link
                                    key={rg}
                                    href={`/best/${rg}`}
                                    className="text-xs px-3 py-1.5 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
                                >
                                    {related.emoji} {related.h1.replace("Best Peptides for ", "")}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                        href="/quiz"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-semibold hover:brightness-110 transition-all"
                    >
                        Find Your Stack <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/library"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm font-medium hover:bg-zinc-700 transition-colors"
                    >
                        Browse All Peptides
                    </Link>
                </div>
            </div>
        </>
    );
}
