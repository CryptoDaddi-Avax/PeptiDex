import Link from 'next/link';
import { Metadata } from "next";
import BlogClient from "./BlogClient";
import { SchemaInjector } from "@/components/schema-injector";

export const metadata: Metadata = {
    title: 'PeptiDex Blog — Peptide Science, Research News & Analysis',
    description: 'Stay current with evidence-based peptide research. Expert analysis of clinical studies, emerging compound trends, regulatory updates, and the science behind peptide therapies.',
    alternates: {
        canonical: 'https://peptidex.app/blog',
        types: { 'application/rss+xml': '/blog/rss.xml' },
    },
    openGraph: {
        title: 'PeptiDex Blog — Evidence-Based Peptide Research',
        description: 'Expert analysis of clinical studies, emerging compound trends, regulatory updates, and the science behind peptide therapies.',
        url: 'https://peptidex.app/blog',
        type: 'website',
        images: [{ url: 'https://peptidex.app/og-image.png', width: 1200, height: 630, alt: 'PeptiDex Research Blog' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PeptiDex Blog — Peptide Science & Research',
        description: 'Evidence-based peptide research: clinical studies, compound trends, regulatory updates.',
        images: ['https://peptidex.app/og-image.png'],
    },
};

export default function BlogIndexPage() {
    const schemaArray = [
        {
            "@type": "CollectionPage",
            name: "PeptiDex Blog — Evidence-Based Peptide Research",
            url: "https://peptidex.app/blog",
            description: "Expert analysis of clinical studies, emerging compound trends, regulatory updates, and the science behind peptide therapies.",
            isPartOf: { "@type": "WebSite", url: "https://peptidex.app" }
        }
    ];

    return (
        <>
            <SchemaInjector schema={schemaArray} />
            <BlogClient />
        </>
    );
}
