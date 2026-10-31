import { notFound } from "next/navigation";
import { peptides, getPeptideBySlug } from "@/data/peptides";
import { stacks } from "@/data/stacks";
import { vendorPricing } from "@/data/vendor-pricing";
import { vendors } from "@/data/vendors";
import type { EvidenceLevel } from "@/data/types";
import { PeptideDetailRedesign } from "./client";
import { buildDrugSchema, buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildLibraryMedicalWebPageSchema, buildLibraryFAQSchema } from "@/lib/seo/schema/library";
import { buildProductSchema } from "@/lib/seo/schema/product";
import { SchemaInjector } from "@/components/schema-injector";
import { legalData, legalStatusLabels } from "@/data/legal-status";
import { peptideFAQOverrides } from "@/data/peptide-faqs";
import { filterDosingFaqs } from "@/lib/library-faq-filter";
import { entityCardOverrides } from "@/data/entity-cards";
import { buildEntityCardSchema } from "@/components/library/EntityCard";
import { citationMap, qualifiers, buildCitationIndex, getAllCitedPmids } from "@/data/citation-map";
import type { ReferenceEntry } from "@/components/citations/ReferenceList";

export function generateStaticParams() {
    return peptides.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    return params.then(({ slug }) => {
        const peptide = getPeptideBySlug(slug);
        if (!peptide) return { title: "Not Found" };

        const year = new Date().getFullYear();
        const title = `${peptide.name}: Half-Life, Mechanism & Research (${year}) | PeptiDex`;

        // Description: ≤155 chars, factual research overview (no dosing, no purchasing)
        const description = `${peptide.name}: research overview, mechanism, half-life and published studies.`.substring(0, 155);

        const url = `https://peptidex.app/library/${slug}`;

        return {
            title,
            description,
            keywords: [
                peptide.name,
                ...(peptide.aliases ?? []),
                `${peptide.name} half-life`,
                `${peptide.name} mechanism`,
                `${peptide.name} research`,
                `${peptide.name} side effects`,
                "research peptides",
                peptide.category,
            ],
            alternates: { canonical: url },
            openGraph: {
                type: "article",
                url,
                title,
                description,
                siteName: "PeptiDex",
                images: [{ url: "https://peptidex.app/og-image.png", width: 1200, height: 630, alt: `${peptide.name} — PeptiDex Research Guide` }],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: ["https://peptidex.app/og-image.png"],
            },
        };
    });
}

/* ── FDA-approved peptide slugs ── */
const FDA_APPROVED_SLUGS = new Set(["tesamorelin", "pt-141"]);

/* ── FDA indication map for Drug enrichment ── */
const FDA_INDICATIONS: Record<string, string> = {
    tesamorelin: "Reduction of excess abdominal fat in HIV-infected patients with lipodystrophy",
    "pt-141": "Treatment of hypoactive sexual desire disorder (HSDD) in premenopausal women",
};

/* ── Evidence grade → numeric rating map ── */
const EVIDENCE_RATING: Record<EvidenceLevel, number> = {
    "very-strong":      4.8,
    "strong":           4.5,
    "moderate-strong":  4.2,
    "moderate":         4.0,
    "preclinical":      3.5,
    "emerging":         3.0,
    "anecdotal":        2.5,
};

/** Build the server-side FAQPage JSON-LD (8 required Qs + custom overrides) */
function buildLibraryFAQItems(peptide: ReturnType<typeof getPeptideBySlug>) {
    if (!peptide) return [];

    const legalBase = legalData.find((l) => l.peptide_name === peptide.name);
    const usStatus = legalBase?.countries.find(
        (c) => c.country === "US" || c.country === "United States"
    )?.status;
    const legalAnswer = usStatus
        ? `In the US, ${peptide.name} is considered ${legalStatusLabels[usStatus]}. It is ${peptide.is_fda_approved ? "FDA-approved for specific indications" : "not FDA-approved for human therapeutic use and sold strictly for research purposes"}. Always verify current status in your jurisdiction.`
        : `${peptide.name} is ${peptide.is_fda_approved ? "FDA-approved for specific indications" : "not FDA-approved for human use and generally classified as a research compound"}. Always verify local regulations.`;

    const sideEffectsAnswer =
        peptide.side_effects && peptide.side_effects.length > 0
            ? `Reported side effects include ${peptide.side_effects.map((s) => s.name.toLowerCase()).join(", ")}. Most are classified as ${peptide.side_effects[0].severity}. ${peptide.safety_notes}`
            : `Side effect profile not fully established. ${peptide.safety_notes}`;

    const halfLifeAnswer = peptide.half_life_hours
        ? `${peptide.name} has a half-life of approximately ${peptide.half_life_hours < 24 ? `${peptide.half_life_hours} hours` : `${(peptide.half_life_hours / 24).toFixed(1)} days`}.`
        : `The precise half-life of ${peptide.name} varies by route and individual metabolism.`;

    const standardFAQs = [
        { q: `What is ${peptide.name}?`, a: `${peptide.name} is a ${peptide.category.toLowerCase()} ${peptide.is_fda_approved ? "(FDA-approved)" : "(research compound)"} that ${peptide.mechanism.charAt(0).toLowerCase() + peptide.mechanism.slice(1)}` },
        { q: `What is ${peptide.name}'s half-life?`, a: halfLifeAnswer },
        { q: `What are ${peptide.name} side effects?`, a: sideEffectsAnswer },
        { q: `Is ${peptide.name} legal?`, a: legalAnswer },
    ];

    const customFAQs = (peptideFAQOverrides[peptide.slug] ?? []).filter((f) => f.q && f.a);

    // Compliance: no dosing / reconstitution / injection / cycle-length / purchasing Q&As in FAQPage schema
    return filterDosingFaqs([...standardFAQs, ...customFAQs]);
}

export default async function PeptideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const peptide = getPeptideBySlug(slug);
    if (!peptide) notFound();

    const relatedStacks = stacks.filter((s) =>
        s.peptides.some((sp) => sp.name.toLowerCase().includes(peptide.name.toLowerCase()))
    );

    // ─── Vendor pricing data (passed to client for WhereToBuySection) ──────
    const pricingEntry = vendorPricing.find((p) => p.slug === slug);

    // ─── JSON-LD: Breadcrumb ────────────────────────────────────────────────
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: "PeptiDex", url: "https://peptidex.app" },
        { name: "Library", url: "https://peptidex.app/library" },
        { name: peptide.name, url: `https://peptidex.app/library/${slug}` }
    ]);

    // ─── JSON-LD: Drug ──────────────────────────────────────────────────────
    const isFDA = FDA_APPROVED_SLUGS.has(slug);
    const topEvidenceLevel = peptide.key_studies.reduce<EvidenceLevel | null>((best, s) => {
        if (!best) return s.evidence_level;
        return EVIDENCE_RATING[s.evidence_level] > EVIDENCE_RATING[best] ? s.evidence_level : best;
    }, null);
    const ratingValue = topEvidenceLevel ? EVIDENCE_RATING[topEvidenceLevel] : 3.0;
    const ratingCount = Math.max(peptide.key_studies.length, 1);

    const drugSchemaObj = buildDrugSchema({
        name: peptide.name,
        alternateName: peptide.aliases,
        description: peptide.laypersonSummary || peptide.mechanism.slice(0, 200),
        mechanismOfAction: peptide.mechanism,
        clinicalPharmacology: `${peptide.mechanism} Primary benefits include ${peptide.primary_benefits.toLowerCase()}.${peptide.half_life_hours ? ` Biological half-life: approximately ${peptide.half_life_hours} hours.` : ""}`,
    });

    const drugSchema: Record<string, unknown> = {
        ...drugSchemaObj,
        drugClass: peptide.category,
        warning: peptide.safety_notes,
        url: `https://peptidex.app/library/${slug}`,
    };

    if (isFDA) {
        drugSchema.legalStatus = "FDA-approved for specific indications";
        if (FDA_INDICATIONS[slug]) {
            drugSchema.recognizedBy = { "@type": "Organization", name: "U.S. Food and Drug Administration (FDA)" };
            drugSchema.indication = FDA_INDICATIONS[slug];
        }
    } else {
        drugSchema.legalStatus = "Research Compound (Not FDA Approved)";
    }

    // ─── JSON-LD: MedicalWebPage ────────────────────────────────────────────
    const dateModified = peptide.reviewedDate ?? new Date().toISOString().slice(0, 10);
    const medicalWebPageSchema = buildLibraryMedicalWebPageSchema({
        name: `${peptide.name}: Half-Life, Mechanism & Research`,
        description: peptide.laypersonSummary ?? peptide.mechanism.slice(0, 200),
        url: `https://peptidex.app/library/${slug}`,
        dateModified,
        datePublished: "2026-01-15",
        reviewedBy: { name: "Dr. E. Vance, PhD", url: "https://peptidex.app/team/peptidex-research" },
        about: drugSchema,
        keywords: [
            peptide.name,
            `${peptide.name} half-life`,
            `${peptide.name} mechanism`,
            peptide.category,
            "research peptide",
        ],
    });

    // ─── JSON-LD: Article ───────────────────────────────────────────────────
    // Build citation references for Article schema
    const citedPmids = getAllCitedPmids(slug);
    const citationRefs = citedPmids.size > 0
        ? Array.from(citedPmids).map(pmid => ({
            "@type": "CreativeWork" as const,
            url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
            name: peptide.key_studies.find(s => s.pubmed_url.includes(pmid))?.title ?? `PubMed ${pmid}`,
        }))
        : undefined;

    const articleSchema = {
        ...buildArticleSchema({
            headline: `${peptide.name}: Half-Life, Mechanism & Research`,
            description: peptide.laypersonSummary || peptide.mechanism.slice(0, 200),
            datePublished: "2026-01-15",
            dateModified,
            author: { name: "Dr. E. Vance", url: "https://peptidex.app/team/peptidex-research" },
            url: `https://peptidex.app/library/${slug}`,
        }),
        ...(citationRefs ? { citation: citationRefs } : {}),
    };

    // ─── JSON-LD: FAQPage (server-side) ────────────────────────────────────
    const faqItems = buildLibraryFAQItems(peptide);
    const faqSchema = buildLibraryFAQSchema(faqItems);

    // ─── JSON-LD: Product (no offers) ──────────────────────────────────────
    const productSchema = buildProductSchema({
        id: `https://peptidex.app/library/${slug}#product`,
        name: peptide.name,
        description: peptide.laypersonSummary || peptide.mechanism.slice(0, 200),
        // image is required by Google for Product rich results — fixes GSC critical error.
        // Uses /api/og?title=NAME&type=profile which returns 200 image/png (confirmed live).
        image: `https://peptidex.app/api/og?title=${encodeURIComponent(peptide.name)}&type=profile`,
        brand: "PEPTIDEX Reviewed",
        aggregateRating: topEvidenceLevel ? {
            ratingValue: ratingValue.toFixed(1),
            ratingCount: ratingCount
        } : undefined
    });

    // ─── Assemble All Schemas ──────────────────────────────────────────────
    // Link Product to Drug via isRelatedTo
    (productSchema as any).isRelatedTo = { "@id": `https://peptidex.app/library/${slug}#drug` };
    drugSchema["@id"] = `https://peptidex.app/library/${slug}#drug`;

    const allSchemas: Record<string, unknown>[] = [
        breadcrumbSchema,
        drugSchema,
        productSchema,
        medicalWebPageSchema,
        articleSchema,
    ];
    if (faqSchema) allSchemas.push(faqSchema);

    // ─── JSON-LD: DefinedTerm (entity card for AI extraction) ──────────────
    const entityCardData = entityCardOverrides[slug];
    if (entityCardData) {
        allSchemas.push(buildEntityCardSchema(entityCardData, slug));
    }

    // ─── CITATION DATA ────────────────────────────────────────────────────
    const fieldCitations = citationMap[slug] ?? {};
    const fieldQuals = qualifiers[slug] ?? {};
    const citationIdx = buildCitationIndex(slug);

    // Build reference entries from cited PMIDs
    const references: ReferenceEntry[] = [];
    const extractPmid = (url: string) => url.match(/\/(\d+)\/?$/)?.[1] ?? null;
    for (const [pmid, n] of citationIdx) {
        const study = peptide.key_studies.find(s => extractPmid(s.pubmed_url) === pmid);
        if (study) {
            references.push({
                n,
                pmid,
                title: study.title,
                evidenceLevel: study.evidence_level,
            });
        }
    }
    references.sort((a, b) => a.n - b.n);

    // Determine last reviewed date
    const lastReviewedDate = peptide.reviewedDate ?? dateModified;

    return (
        <>
            <SchemaInjector schema={allSchemas} />
            <PeptideDetailRedesign
                peptide={peptide}
                relatedStacks={relatedStacks}
                pricingEntry={pricingEntry}
                allVendors={vendors}
                citationIndex={citationIdx}
                fieldCitations={fieldCitations}
                fieldQualifiers={fieldQuals}
                references={references}
                lastReviewedDate={lastReviewedDate}
            />
        </>
    );
}
