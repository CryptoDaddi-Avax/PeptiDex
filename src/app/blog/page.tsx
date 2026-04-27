import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
    title: 'PeptideX Blog — Peptide Science, Research News & Analysis',
    description: 'Stay current with evidence-based peptide research. Expert analysis of clinical studies, emerging compound trends, regulatory updates, and the science behind peptide therapies.',
    alternates: {
        canonical: 'https://peptidex.app/blog',
        types: { 'application/rss+xml': '/blog/rss.xml' },
    },
};

export default function BlogIndexPage() {
    return <BlogClient />;
}
