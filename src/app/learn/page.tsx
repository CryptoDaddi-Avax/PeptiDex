import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, GraduationCap } from "lucide-react";
import { learningModules } from "@/data/learning-modules";
import { SchemaInjector } from "@/components/schema-injector";
import LearnClient from "./LearnClient";

export const metadata: Metadata = {
    title: "Peptide Education Track — Learn Peptides Step by Step",
    description:
        "Free 5-module peptide course: amino acid basics, reconstitution, dosing, safety, and sourcing. Quiz-based learning with progress tracking.",
    alternates: { canonical: "https://peptidex.app/learn" },
    openGraph: {
        title: "Peptide Education Track — Learn Peptides Step by Step | PeptiDex",
        description:
            "Free 5-module peptide course covering amino acid basics, reconstitution, dosing protocols, safety profiles, and vendor sourcing.",
        url: "https://peptidex.app/learn",
        type: "website",
        images: [{ url: "https://peptidex.app/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Peptide Education Track | PeptiDex",
        description:
            "Free 5-module course: learn peptide science from amino acid basics through sourcing and safety.",
    },
};

// ── JSON-LD: Course schema ──────────────────────────────────────────────
const totalMinutes = learningModules.reduce((a, m) => a + m.estimatedMinutes, 0);

const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Peptide 101 — Free Peptide Education Track",
    description:
        "A self-paced, 5-module educational course covering peptide fundamentals: amino acid chemistry, reconstitution math, dosing protocols, safety profiles, and vendor sourcing. Includes quizzes and progress tracking.",
    provider: {
        "@type": "Organization",
        name: "PeptiDex",
        url: "https://peptidex.app",
    },
    url: "https://peptidex.app/learn",
    numberOfCredits: 0,
    isAccessibleForFree: true,
    educationalLevel: "Beginner",
    hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: `PT${totalMinutes}M`,
    },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://peptidex.app/" },
        { "@type": "ListItem", position: 2, name: "Learn", item: "https://peptidex.app/learn" },
    ],
};

export default function LearnPage() {
    return (
        <>
            <SchemaInjector schema={[courseSchema, breadcrumbSchema]} />

            {/* ── Server-rendered above-the-fold content ── */}
            <div className="max-w-2xl mx-auto px-3 pt-6 md:px-4 md:pt-8">
                <nav
                    aria-label="Breadcrumb"
                    className="flex items-center gap-2 mb-4"
                >
                    <Link
                        href="/"
                        className="text-zinc-500 hover:text-amber-400 transition-colors text-xs"
                    >
                        Home
                    </Link>
                    <span className="text-zinc-700 text-xs">/</span>
                    <span className="text-zinc-200 font-medium text-xs">
                        Learn
                    </span>
                </nav>

                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-violet-400" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-100">
                        Peptide Education Track
                    </h1>
                </div>

                <p className="text-[15px] text-zinc-400 leading-relaxed mb-6 max-w-xl">
                    A free, self-paced learning path that takes you from the
                    fundamentals of amino acid chemistry through reconstitution
                    math, dosing protocols, safety profiles, and responsible
                    sourcing. Each of the{" "}
                    <strong className="text-zinc-300">
                        {learningModules.length} modules
                    </strong>{" "}
                    ends with a short quiz so you can test your understanding
                    before moving on. Whether you&apos;re evaluating peptides
                    for the first time or brushing up on pharmacokinetics, this
                    track gives you the evidence-based foundation you need to
                    read the research confidently. Total study time is roughly{" "}
                    <strong className="text-zinc-300">
                        {totalMinutes} minutes
                    </strong>
                    . Progress is saved automatically in your browser.
                </p>

                {/* Quick module summary for crawlers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {learningModules.map((mod) => (
                        <div
                            key={mod.id}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-800/60 bg-zinc-900/30 text-xs text-zinc-400"
                        >
                            <BookOpen className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                            <span className="text-zinc-200 font-medium">
                                {mod.title}
                            </span>
                            <span className="ml-auto text-zinc-600">
                                {mod.estimatedMinutes} min
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Client-rendered interactive modules ── */}
            <LearnClient />
        </>
    );
}
