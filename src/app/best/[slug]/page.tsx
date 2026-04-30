import { notFound } from "next/navigation";
import { goalPages, getGoalPage } from "@/data/goal-pages";
import { getPeptideBySlug } from "@/data/peptides";
import { Metadata } from "next";
import BestGoalClient from "./BestGoalClient";

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

/* ── MedicalCondition metadata per goal ── */
const GOAL_CONDITIONS: Record<string, { condition: string; signs: string[] }> = {
    "fat-loss": { condition: "Obesity and Excess Adiposity", signs: ["Excess body fat", "Elevated BMI", "Insulin resistance", "Metabolic syndrome"] },
    "muscle-growth": { condition: "Muscle Atrophy and Hypogonadism", signs: ["Decreased muscle mass", "Reduced strength", "Low growth hormone levels", "Impaired recovery"] },
    "immune-support": { condition: "Immunodeficiency and Immune Dysregulation", signs: ["Frequent infections", "Slow wound healing", "Chronic fatigue", "Impaired immune cell function"] },
    "sleep-recovery": { condition: "Sleep Disorders and Impaired Recovery", signs: ["Insomnia", "Poor sleep quality", "Elevated cortisol", "Delayed recovery from exercise"] },
    "longevity": { condition: "Age-Related Physiological Decline", signs: ["Telomere shortening", "Mitochondrial dysfunction", "Oxidative stress", "Cellular senescence"] },
    "skin-aesthetic": { condition: "Dermal Aging and Collagen Loss", signs: ["Wrinkles and fine lines", "Loss of skin elasticity", "Reduced collagen synthesis", "Impaired wound healing"] },
    "gut-health": { condition: "Gastrointestinal Mucosal Injury", signs: ["Intestinal inflammation", "Leaky gut syndrome", "Impaired mucosal barrier", "Gastric ulceration"] },
    "hormonal-optimization": { condition: "Hormonal Imbalance and Hypogonadism", signs: ["Low testosterone", "Reduced growth hormone", "Impaired HPG axis function", "Metabolic slowdown"] },
    "metabolic-health": { condition: "Metabolic Syndrome and Insulin Resistance", signs: ["Elevated fasting glucose", "Insulin resistance", "Dyslipidemia", "Visceral adiposity"] },
    "body-recomposition": { condition: "Unfavorable Body Composition", signs: ["High body fat percentage", "Low lean mass", "Impaired metabolic rate", "Suboptimal fat oxidation"] },
    "injury-recovery": { condition: "Musculoskeletal Injury and Tissue Damage", signs: ["Tendon or ligament injury", "Chronic inflammation", "Impaired tissue regeneration", "Post-surgical recovery needs"] },
    "mental-clarity": { condition: "Cognitive Decline and Neurodegenerative Risk", signs: ["Brain fog", "Reduced focus", "Anxiety", "Impaired neuroplasticity"] },
};

export default async function BestPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const goal = getGoalPage(slug);
    if (!goal) notFound();

    // ─── FAQPage Schema ─────────────────────────────────────────────
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: goal.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    };

    // ─── MedicalCondition Schema ────────────────────────────────────
    const conditionMeta = GOAL_CONDITIONS[slug];
    const peptides = goal.peptideSlugs.map(getPeptideBySlug).filter(Boolean);

    const medicalConditionSchema = conditionMeta ? {
        "@context": "https://schema.org",
        "@type": "MedicalCondition",
        name: conditionMeta.condition,
        description: goal.intro,
        url: `https://peptidex.app/best/${slug}`,
        signOrSymptom: conditionMeta.signs.map((s) => ({
            "@type": "MedicalSignOrSymptom",
            name: s,
        })),
        possibleTreatment: peptides.map((p) => ({
            "@type": "Drug",
            name: p!.name,
            url: `https://peptidex.app/library/${p!.slug}`,
            description: p!.laypersonSummary || p!.mechanism.slice(0, 150),
            drugClass: p!.category,
            legalStatus: p!.is_fda_approved ? "https://schema.org/PrescriptionOnly" : "Research Compound (Not FDA Approved)",
        })),
    } : null;

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            {medicalConditionSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalConditionSchema) }} />}
            <BestGoalClient slug={slug} />
        </>
    );
}
