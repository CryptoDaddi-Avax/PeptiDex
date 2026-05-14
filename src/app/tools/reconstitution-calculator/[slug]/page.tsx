import { notFound } from "next/navigation";
import { calculatorArticles } from "@/data/calculator-spokes";
import { Metadata } from "next";

export function generateStaticParams() {
    return calculatorArticles.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const article = calculatorArticles.find((c) => c.slug === slug);
    if (!article) return { title: "Not Found" };

    return {
        title: article.title,
        description: article.metaDescription,
        alternates: { canonical: `https://peptidex.app/tools/reconstitution-calculator/${slug}` },
        openGraph: {
            type: "article",
            title: article.title,
            description: article.metaDescription,
            siteName: "PeptiDex",
        },
    };
}

export default async function ReconstitutionCalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = calculatorArticles.find((c) => c.slug === slug);
    
    if (!article) notFound();

    // JSON-LD Schemas: SoftwareApplication, HowTo, FAQPage, BreadcrumbList
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": `PeptiDex ${article.peptide} Reconstitution Calculator`,
        "operatingSystem": "All",
        "applicationCategory": "HealthApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to Reconstitute ${article.peptide}`,
        "step": article.commonScenarios.map((sc, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": sc.scenarioTitle,
            "text": sc.mathExplanation
        }))
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": article.faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([softwareSchema, howToSchema, faqSchema]) }} />
            <div className="pd-container mt-12 mb-24">
                <h1 className="text-4xl font-bold font-serif mb-6">{article.title}</h1>
                
                {/* ABOVE CALCULATOR CONTENT */}
                <div className="prose prose-invert mb-12">
                    <p>{article.introParagraph}</p>
                </div>

                <div className="bg-zinc-900 border border-violet-500/30 p-6 rounded-xl mb-12">
                    <h3 className="text-xl font-bold text-violet-400 mb-4">{article.peptide} Data Sheet</h3>
                    <ul className="space-y-2 text-zinc-300">
                        <li><strong>Available Vials:</strong> {article.vialSizesAvailable.join(', ')}</li>
                        <li><strong>Recommended BAC Water:</strong> {article.recommendedBacWaterRange}</li>
                        <li><strong>Typical Doses:</strong> {article.commonResearchDoses.join(', ')}</li>
                    </ul>
                </div>

                {/* THE ACTUAL CALCULATOR COMPONENT WOULD GO HERE */}
                {/* <Calculator peptideSlug={article.slug} /> */}
                <div className="border border-dashed border-zinc-700 p-12 text-center rounded-xl mb-12">
                    <span className="text-zinc-500">[Interactive Reconstitution Calculator Component]</span>
                </div>

                {/* BELOW CALCULATOR CONTENT */}
                <h2 className="text-2xl font-bold mt-12 mb-6">Common Reconstitution Scenarios for {article.peptide}</h2>
                <div className="space-y-6 mb-12">
                    {article.commonScenarios.map((scenario, i) => (
                        <div key={i} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                            <h4 className="font-bold text-lg mb-2">{scenario.scenarioTitle}</h4>
                            <p className="text-zinc-400">{scenario.mathExplanation}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold mt-12 mb-6">Storage and Stability Notes</h2>
                <div className="prose prose-invert mb-12">
                    <p>{article.storageAndStability}</p>
                </div>

                <h2 className="text-2xl font-bold mt-12 mb-6">Where to Source Verified {article.peptide}</h2>
                <div className="prose prose-invert mb-12" dangerouslySetInnerHTML={{ __html: article.whereToSource }} />

                <h2 className="text-2xl font-bold mt-12 mb-6">Reconstitution FAQ</h2>
                <div className="space-y-4 mb-12">
                    {article.faqs.map((faq, i) => (
                        <div key={i} className="border border-zinc-800 p-4 rounded-xl">
                            <h4 className="font-bold text-gold mb-2">{faq.question}</h4>
                            <p className="text-zinc-300">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
