import { notFound } from "next/navigation";
import { peptides, getPeptideBySlug } from "@/data/peptides";
import { stacks } from "@/data/stacks";
import { vendorPricing } from "@/data/vendor-pricing";
import type { EvidenceLevel } from "@/data/types";
import { PeptideDetailRedesign } from "./client";
import { PeptideExpandedContent } from "@/components/peptide-expanded";
import { getAuthorBySlug, getPersonSchema } from "@/lib/authors";

export function generateStaticParams() {
    return peptides.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    return params.then(({ slug }) => {
        const peptide = getPeptideBySlug(slug);
        if (!peptide) return { title: "Not Found" };

        const halfLifeStr = peptide.half_life_hours
            ? peptide.half_life_hours >= 24
                ? `${(peptide.half_life_hours / 24).toFixed(0)}-day half-life`
                : `${peptide.half_life_hours}h half-life`
            : "";
        const year = new Date().getFullYear();
        const title = `${peptide.name} Dosage, Studies & Side Effects (${year} Research Guide)`;
        const description = `${peptide.name} research guide: mechanism of action, dosing (${peptide.dosing?.typical_dose_mcg?.[0] ?? ""}–${peptide.dosing?.typical_dose_mcg?.[1] ?? ""}mcg), ${halfLifeStr}, clinical studies, and safety profile. ${peptide.mechanism.slice(0, 100)}`;
        const url = `https://peptidex.app/library/${slug}`;

        return {
            title,
            description,
            keywords: [
                peptide.name,
                ...(peptide.aliases ?? []),
                `${peptide.name} dosage`,
                `${peptide.name} half-life`,
                `${peptide.name} benefits`,
                `${peptide.name} side effects`,
                `${peptide.name} research`,
                `${peptide.name} protocol`,
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
                images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${peptide.name} — PeptiDex Research Guide` }],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: ["/og-image.png"],
            },
        };
    });
}

/* ── FDA-approved peptide slugs ── */
const FDA_APPROVED_SLUGS = new Set(["semaglutide", "tirzepatide", "tesamorelin", "pt-141"]);

/* ── FDA indication map for PrescriptionDrug enrichment ── */
const FDA_INDICATIONS: Record<string, string> = {
    semaglutide: "Type 2 diabetes mellitus; Chronic weight management in adults with obesity or overweight",
    tirzepatide: "Type 2 diabetes mellitus; Chronic weight management in adults with obesity or overweight",
    tesamorelin: "Reduction of excess abdominal fat in HIV-infected patients with lipodystrophy",
    "pt-141": "Treatment of hypoactive sexual desire disorder (HSDD) in premenopausal women",
};

/* ── Evidence grade → numeric rating map ────────────────────────────────
   Scale reflects strength of clinical evidence (not user reviews).
   Communicated in aggregateRating.description per schema.org guidance.
   moderate-strong (4.2) sits between moderate (4.0) and strong (4.5). ── */
const EVIDENCE_RATING: Record<EvidenceLevel, number> = {
    "very-strong":      4.8,
    "strong":           4.5,
    "moderate-strong":  4.2,
    "moderate":         4.0,
    "preclinical":      3.5,
    "emerging":         3.0,
    "anecdotal":        2.5,
};

export default async function PeptideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const peptide = getPeptideBySlug(slug);
    if (!peptide) notFound();

    const relatedStacks = stacks.filter((s) =>
        s.peptides.some((sp) => sp.name.toLowerCase().includes(peptide.name.toLowerCase()))
    );

    // ─── JSON-LD: Drug / PrescriptionDrug Schema ────────────────────
    const isFDA = FDA_APPROVED_SLUGS.has(slug);

    // ── aggregateRating: derived from highest evidence grade across studies
    const topEvidenceLevel = peptide.key_studies.reduce<EvidenceLevel | null>((best, s) => {
        if (!best) return s.evidence_level;
        return EVIDENCE_RATING[s.evidence_level] > EVIDENCE_RATING[best] ? s.evidence_level : best;
    }, null);
    const ratingValue = topEvidenceLevel ? EVIDENCE_RATING[topEvidenceLevel] : 3.0;
    const ratingCount = Math.max(peptide.key_studies.length, 1); // schema.org requires ≥1

    const aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: ratingValue.toFixed(1),
        bestRating: "5",
        worstRating: "1",
        ratingCount,
        description: "Rating reflects strength of clinical evidence indexed by PeptiDex, not consumer reviews.",
    };

    // ── offers: AggregateOffer pulled from vendor-pricing registry
    const pricingEntry = vendorPricing.find((p) => p.slug === slug);
    const inStockVendors = pricingEntry?.vendors.filter((v) => v.inStock) ?? [];
    const prices = inStockVendors.map((v) => v.price_usd);
    const aggregateOffer = inStockVendors.length > 0 ? {
        "@type": "AggregateOffer",
        lowPrice: Math.min(...prices).toFixed(2),
        highPrice: Math.max(...prices).toFixed(2),
        priceCurrency: "USD",
        offerCount: inStockVendors.length,
        offers: inStockVendors.map((v) => ({
            "@type": "Offer",
            price: v.price_usd.toFixed(2),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: v.affiliateUrl,
            seller: { "@type": "Organization", name: v.vendor },
            description: `${v.vial_mg}mg vial`,
        })),
    } : null;

    const drugSchema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Drug",
        name: peptide.name,
        alternateName: peptide.aliases,
        description: peptide.laypersonSummary || peptide.mechanism.slice(0, 200),
        drugClass: peptide.category,
        mechanismOfAction: peptide.mechanism,
        clinicalPharmacology: `${peptide.mechanism} Primary benefits include ${peptide.primary_benefits.toLowerCase()}.${peptide.half_life_hours ? ` Biological half-life: approximately ${peptide.half_life_hours} hours.` : ""}`,
        warning: peptide.safety_notes,
        url: `https://peptidex.app/library/${slug}`,
        aggregateRating,
        ...(aggregateOffer ? { offers: aggregateOffer } : {}),
    };

    if (isFDA) {
        drugSchema.legalStatus = "https://schema.org/PrescriptionOnly";
        drugSchema.prescriptionStatus = "https://schema.org/PrescriptionOnly";
        if (FDA_INDICATIONS[slug]) {
            drugSchema.recognizedBy = { "@type": "Organization", name: "U.S. Food and Drug Administration (FDA)" };
            drugSchema.indication = FDA_INDICATIONS[slug];
        }
    } else {
        drugSchema.legalStatus = "Research Compound (Not FDA Approved)";
    }

    // ─── JSON-LD: HowTo Schema (dosing protocol) ───────────────────
    let howToSchema: Record<string, unknown> | null = null;
    if (peptide.dosing) {
        const steps: { "@type": string; name: string; text: string; position: number }[] = [];
        let pos = 1;

        if (peptide.dosing.reconstitution_ml && peptide.dosing.typical_vial_mg) {
            steps.push({
                "@type": "HowToStep",
                name: "Reconstitution",
                text: `Reconstitute the ${peptide.dosing.typical_vial_mg}mg vial with ${peptide.dosing.reconstitution_ml} ml of bacteriostatic water (BAC water). Swirl gently — do not shake.`,
                position: pos++,
            });
        }

        steps.push({
            "@type": "HowToStep",
            name: "Dose selection",
            text: `Typical research dose range is ${peptide.dosing.typical_dose_mcg[0]}–${peptide.dosing.typical_dose_mcg[1]} mcg, administered via ${peptide.dosing.route}.`,
            position: pos++,
        });

        steps.push({
            "@type": "HowToStep",
            name: "Frequency",
            text: `Administer ${peptide.dosing.frequency.toLowerCase()}.`,
            position: pos++,
        });

        if (peptide.dosing.timing) {
            steps.push({
                "@type": "HowToStep",
                name: "Timing",
                text: `Optimal administration timing: ${peptide.dosing.timing.toLowerCase()}.`,
                position: pos++,
            });
        }

        if (peptide.dosing.cycle_weeks) {
            steps.push({
                "@type": "HowToStep",
                name: "Cycle length",
                text: `Typical research cycle: ${peptide.dosing.cycle_weeks[0]}–${peptide.dosing.cycle_weeks[1]} weeks. Allow adequate off-cycle recovery.`,
                position: pos++,
            });
        }

        howToSchema = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: `Research dosing protocol for ${peptide.name}`,
            description: `Standard research dosing reference for ${peptide.name} based on published literature. For educational and research purposes only — not medical advice. Consult a healthcare professional before using any peptide.`,
            step: steps,
        };
    }

    // ─── JSON-LD: Article Schema ────────────────────────────────────
    const authorRecord = getAuthorBySlug(peptide.author ?? "peptidex-research");
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${peptide.name} — Research Guide, Dosage & Studies`,
        datePublished: "2026-01-15",
        dateModified: peptide.lastReviewed ?? "2026-04-29",
        author: authorRecord
            ? getPersonSchema(authorRecord)
            : { "@type": "Person", name: "PeptiDex Research", url: "https://peptidex.app/team/peptidex-research" },
        publisher: { "@type": "Organization", name: "PeptiDex", url: "https://peptidex.app", logo: { "@type": "ImageObject", url: "https://peptidex.app/icon-512.png" } },
        mainEntityOfPage: `https://peptidex.app/library/${slug}`,
        description: peptide.laypersonSummary || peptide.mechanism.slice(0, 200),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(drugSchema) }} />
            {howToSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <PeptideDetailRedesign peptide={peptide} relatedStacks={relatedStacks} />
            <PeptideExpandedContent slug={slug} />
        </>
    );
}
