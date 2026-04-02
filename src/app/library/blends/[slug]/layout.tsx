import { peptideBlends } from "@/data/blends";
import { Metadata } from "next";

export function generateStaticParams() {
    return peptideBlends.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blend = peptideBlends.find((b) => b.slug === slug);
    if (!blend) return { title: "Blend Not Found" };

    const title = `${blend.name} — "${blend.nickname}" | PeptiDex`;
    const description = `${blend.primary_benefits}. Learn about dosing, mechanism, timeline, and supporting studies for the ${blend.name} peptide blend.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            siteName: "PeptiDex",
            images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${blend.name} Peptide Blend` }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/og-image.png"],
        },
    };
}

export default async function BlendLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
