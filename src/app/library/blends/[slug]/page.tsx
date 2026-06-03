/**
 * /library/blends/[slug] — Server Component
 * ============================================
 * fix(seo): B4 — Converted from "use client" + useParams() to a proper
 * Next.js App Router server component with:
 *  - generateStaticParams() for static pre-rendering at build time
 *  - generateMetadata() for per-blend title/description/canonical/OG
 *  - Server-rendered HTML content (all blend data is static — no SSR overhead)
 *  - JSON-LD structured data (BreadcrumbList, MedicalWebPage, FAQPage)
 *
 * The motion.div animations have been replaced with standard divs because
 * framer-motion requires "use client". If animations are desired in the future,
 * extract the animated wrappers into a small "BlendAnimatedSection" client child.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    FlaskConical,
    Clock,
    Beaker,
    AlertTriangle,
    BookOpen,
    TrendingUp,
    ExternalLink,
    ShieldCheck,
} from "lucide-react";
import { peptideBlends, getBlendBySlug } from "@/data/blends";
import { getPeptideBySlug } from "@/data/peptides";
import { getCategoryIcon } from "@/data/category-icons";

// ─── Static Params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
    return peptideBlends.map((b) => ({ slug: b.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const blend = getBlendBySlug(slug);
    if (!blend) return {};

    const title = `${blend.name} Stack — Dosing, Mechanism & Research | PeptiDex`;
    const description =
        `${blend.nickname}: ${blend.primary_benefits}. ` +
        `Research-backed blend combining ${blend.components.join(", ")}. ` +
        blend.dosing_notes.slice(0, 80);

    return {
        title,
        description: description.slice(0, 160),
        alternates: {
            canonical: `https://peptidex.app/library/blends/${slug}`,
        },
        openGraph: {
            title,
            description: description.slice(0, 160),
            url: `https://peptidex.app/library/blends/${slug}`,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: description.slice(0, 160),
        },
    };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlendDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const blend = getBlendBySlug(slug);

    if (!blend) notFound();

    const timelineSteps = [
        { key: "week_1", label: "Week 1", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
        { key: "week_2_4", label: "Weeks 2–4", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
        { key: "month_2_3", label: "Months 2–3", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
        { key: "long_term", label: "Long-term", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    ] as const;

    // ─── JSON-LD ──────────────────────────────────────────────────────────────

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://peptidex.app/" },
            { "@type": "ListItem", position: 2, name: "Library", item: "https://peptidex.app/library" },
            { "@type": "ListItem", position: 3, name: "Blends", item: "https://peptidex.app/library/blends" },
            { "@type": "ListItem", position: 4, name: blend.name, item: `https://peptidex.app/library/blends/${slug}` },
        ],
    };

    const medicalPageSchema = {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: `${blend.name} — Research Peptide Stack`,
        description: blend.primary_benefits,
        url: `https://peptidex.app/library/blends/${slug}`,
        about: {
            "@type": "Drug",
            name: blend.name,
            description: blend.mechanism,
            alternateName: blend.nickname,
        },
        audience: { "@type": "Audience", audienceType: "Research professionals" },
        lastReviewed: "2026-05-29",
        reviewedBy: { "@type": "Organization", name: "PeptiDex Editorial Team", url: "https://peptidex.app/about" },
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: `What is the ${blend.name} stack used for?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: blend.primary_benefits,
                },
            },
            {
                "@type": "Question",
                name: `How does ${blend.name} work?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: blend.mechanism,
                },
            },
            {
                "@type": "Question",
                name: `What are the safety notes for ${blend.name}?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: blend.safety_notes,
                },
            },
        ],
    };

    // ─── Component peptide link validation (fix for audit section 8B) ─────────
    // Generate slugs the same way blends.ts does, then validate against peptides.ts.
    // Only render a link if the slug matches a known peptide — avoids dead /library/ URLs.
    function getValidPeptideSlug(compName: string): string | null {
        const derived = compName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const match = getPeptideBySlug(derived);
        return match ? derived : null;
    }

    return (
        <div className="max-w-3xl mx-auto px-3 py-4 md:px-4 md:py-6">
            {/* JSON-LD */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalPageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* Back Link */}
            <Link href="/library/blends" className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-violet-400 transition-colors mb-4">
                <ArrowLeft className="w-3 h-3" /> All Blends
            </Link>

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{getCategoryIcon(blend.category)}</span>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-zinc-100">{blend.name}</h1>
                        <p className="text-xs text-zinc-500 italic">&quot;{blend.nickname}&quot;</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {blend.components.map((comp) => (
                        <span key={comp} className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-medium text-violet-300">
                            {comp}
                        </span>
                    ))}
                    <span className="px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs text-zinc-400">
                        {blend.category}
                    </span>
                </div>
            </div>

            {/* Benefits */}
            <div className="mb-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-sm font-semibold text-zinc-200">Benefits</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{blend.primary_benefits}</p>
            </div>

            {/* Why This Blend? */}
            <div className="mb-4 p-4 rounded-2xl bg-violet-500/5 border border-violet-500/15">
                <div className="flex items-center gap-2 mb-2">
                    <FlaskConical className="w-4 h-4 text-violet-400" />
                    <h2 className="text-sm font-semibold text-zinc-200">Why This Blend?</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{blend.why_blend}</p>
            </div>

            {/* Mechanism */}
            <div className="mb-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="flex items-center gap-2 mb-2">
                    <Beaker className="w-4 h-4 text-cyan-400" />
                    <h2 className="text-sm font-semibold text-zinc-200">Mechanism of Action</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{blend.mechanism}</p>
            </div>

            {/* Dosing */}
            <div className="mb-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15">
                <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-sm font-semibold text-zinc-200">Dosing Protocol</h2>
                </div>
                <div className="space-y-1.5">
                    <p className="text-xs text-zinc-400"><strong className="text-zinc-300">Typical Ratio:</strong> {blend.typical_ratio}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{blend.dosing_notes}</p>
                </div>
            </div>

            {/* Outcomes Timeline */}
            <div className="mb-4">
                <h2 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-violet-400" />
                    Expected Timeline
                </h2>
                <div className="space-y-2">
                    {timelineSteps.map(({ key, label, color, bg }) => {
                        const text = blend.outcomes_timeline[key];
                        if (!text) return null;
                        return (
                            <div key={key} className={`p-3 rounded-xl ${bg} border`}>
                                <p className={`text-xs font-semibold ${color} mb-0.5`}>{label}</p>
                                <p className="text-xs text-zinc-300">{text}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Studies */}
            <div className="mb-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <h2 className="text-sm font-semibold text-zinc-200">Supporting Studies</h2>
                </div>
                <div className="space-y-2">
                    {blend.key_studies.map((study, i) => (
                        <a key={i} href={study.pubmed_url} target="_blank" rel="noopener noreferrer" className="block p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-blue-500/30 transition-colors group">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-xs font-medium text-zinc-200 group-hover:text-blue-300 transition-colors">{study.title}</p>
                                    <p className="text-[10px] text-zinc-500 mt-0.5">{study.summary}</p>
                                </div>
                                <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" />
                            </div>
                            <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-medium bg-blue-500/10 text-blue-400 mt-1.5">
                                {study.evidence_level}
                            </span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Safety */}
            <div className="mb-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15">
                <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <h2 className="text-sm font-semibold text-zinc-200">Safety Notes</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{blend.safety_notes}</p>
            </div>

            {/* Component Links — validated against peptides.ts (fix: audit section 8B) */}
            <div className="mb-6">
                <h2 className="text-sm font-semibold text-zinc-200 mb-3">📚 Individual Peptide Profiles</h2>
                <div className="flex flex-wrap gap-2">
                    {blend.components.map((comp) => {
                        const validSlug = getValidPeptideSlug(comp);
                        if (!validSlug) return (
                            <span key={comp} className="px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 text-xs font-medium text-zinc-500">
                                {comp}
                            </span>
                        );
                        return (
                            <Link key={comp} href={`/library/${validSlug}`} className="px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 text-xs font-medium text-violet-300 hover:bg-violet-500/10 hover:border-violet-500/30 transition-colors">
                                {comp} →
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Research disclaimer */}
            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15 flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-400/80 leading-relaxed">
                    Research use only. Not FDA-approved for the combination described. Consult a qualified healthcare provider before use.
                </p>
            </div>
        </div>
    );
}
