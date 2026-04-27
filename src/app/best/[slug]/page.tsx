import { notFound } from "next/navigation";
import { goalPages, getGoalPage } from "@/data/goal-pages";
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

export default async function BestPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const goal = getGoalPage(slug);
    if (!goal) notFound();

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
            <BestGoalClient slug={slug} />
        </>
    );
}
