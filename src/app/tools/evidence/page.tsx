import { Metadata } from "next";
import { peptides } from "@/data/peptides";
import { EvidenceLevel } from "@/data/types";
import EvidenceClient from "./EvidenceClient";

// ─── Evidence ranking helpers (shared with client) ──────────────────────────
const evidenceRank: Record<string, number> = {
    "very-strong": 6, "strong": 5, "moderate-strong": 4, "moderate": 3,
    "emerging": 2, "preclinical": 1, "anecdotal": 0,
};

export const evidenceLabelMap: Record<string, string> = {
    "very-strong": "Very Strong", "strong": "Strong", "moderate-strong": "Moderate-Strong",
    "moderate": "Moderate", "emerging": "Emerging", "preclinical": "Preclinical", "anecdotal": "Anecdotal",
};

function getHighestEvidence(studies: { evidence_level: EvidenceLevel }[]): EvidenceLevel {
    let best: EvidenceLevel = "anecdotal";
    let bestRank = 0;
    for (const s of studies) {
        const rank = evidenceRank[s.evidence_level] ?? 0;
        if (rank > bestRank) { bestRank = rank; best = s.evidence_level; }
    }
    return best;
}

// ─── Compute ranked list at build time ───────────────────────────────────────
export type RankedPeptide = {
    name: string;
    slug: string;
    category: string;
    key_studies_count: number;
    highestEvidence: EvidenceLevel;
    is_fda_approved: boolean;
};

function buildRankedList(): RankedPeptide[] {
    return peptides
        .map(p => ({
            name: p.name,
            slug: p.slug,
            category: p.category,
            key_studies_count: p.key_studies.length,
            highestEvidence: getHighestEvidence(p.key_studies),
            is_fda_approved: !!p.is_fda_approved,
        }))
        .sort((a, b) => {
            const diff = (evidenceRank[b.highestEvidence] ?? 0) - (evidenceRank[a.highestEvidence] ?? 0);
            return diff !== 0 ? diff : b.key_studies_count - a.key_studies_count;
        });
}

// ─── Dynamic dateModified: latest lastReviewed across all peptides ────────────
function getDateModified(): string {
    const dates = peptides
        .map(p => p.lastReviewed)
        .filter((d): d is string => !!d)
        .sort()
        .reverse();
    return dates[0] ?? new Date().toISOString().slice(0, 10);
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
const DATE_MODIFIED = getDateModified();
const FORMATTED_DATE = new Date(DATE_MODIFIED).toLocaleDateString("en-US", {
    month: "long", year: "numeric"
});

export const metadata: Metadata = {
    title: `Peptide Evidence Rankings 2026 | PeptiDex`,
    description: `The definitive ranked reference: FDA-approved to anecdotal — ${peptides.length} peptides, ${peptides.reduce((s, p) => s + p.key_studies.length, 0)}+ indexed studies. Updated ${FORMATTED_DATE}. Cite this dashboard.`,
    alternates: {
        canonical: "https://peptidex.app/tools/evidence",
    },
    openGraph: {
        title: `Peptide Evidence Rankings: ${peptides.length} Compounds Ranked by Clinical Proof | PeptiDex`,
        description: `The definitive ranked reference: FDA-approved to anecdotal — ${peptides.length} peptides sorted by clinical evidence strength. Updated ${FORMATTED_DATE}.`,
        url: "https://peptidex.app/tools/evidence",
        type: "website",
        images: [{
            url: "https://peptidex.app/og-evidence.png",
            width: 1200,
            height: 630,
            alt: `Peptide Evidence Dashboard — ${peptides.length} compounds ranked by clinical evidence strength`,
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: `Peptide Evidence Rankings: ${peptides.length} Compounds | PeptiDex`,
        description: `FDA-approved → anecdotal: ${peptides.length} peptides ranked by clinical evidence strength. Updated ${FORMATTED_DATE}.`,
        images: ["https://peptidex.app/og-evidence.png"],
    },
};

// ─── Dataset + ItemList JSON-LD ───────────────────────────────────────────────
function buildSchema(ranked: RankedPeptide[]) {
    const totalStudies = peptides.reduce((s, p) => s + p.key_studies.length, 0);

    const dataset = {
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": "Peptide Clinical Evidence Rankings — PeptiDex",
        "description": `${peptides.length} research peptides ranked by strength of clinical evidence: FDA-approved phase 3 trials, human RCTs, preclinical studies, and emerging research. Updated ${FORMATTED_DATE}.`,
        "url": "https://peptidex.app/tools/evidence",
        "license": "https://creativecommons.org/licenses/by/4.0/",
        "creator": {
            "@type": "Organization",
            "name": "PeptiDex",
            "url": "https://peptidex.app",
        },
        "publisher": {
            "@type": "Organization",
            "name": "PeptiDex",
            "url": "https://peptidex.app",
        },
        "dateModified": DATE_MODIFIED,
        "dateCreated": "2024-01-01",
        "keywords": [
            "peptide research", "clinical evidence ranking", "BPC-157",
            "semaglutide", "tirzepatide", "retatrutide", "GLP-1",
            "evidence-based medicine", "peptide trials", "FDA approved peptides",
        ],
        "distribution": {
            "@type": "DataDownload",
            "encodingFormat": "text/html",
            "contentUrl": "https://peptidex.app/tools/evidence",
        },
        "variableMeasured": "Clinical evidence strength (7-tier scale: very-strong → anecdotal)",
        "measurementTechnique": "Systematic review of PubMed-indexed publications, FDA product labels, and clinical trial registrations",
        "temporalCoverage": "2024/2026",
        "spatialCoverage": "Global",
        "size": `${peptides.length} compounds, ${totalStudies} indexed studies`,
    };

    const itemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Peptide Evidence Rankings",
        "description": `${peptides.length} peptides ranked by clinical evidence strength`,
        "url": "https://peptidex.app/tools/evidence",
        "numberOfItems": ranked.length,
        "itemListElement": ranked.map((p, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": p.name,
            "url": `https://peptidex.app/library/${p.slug}`,
        })),
    };

    return [dataset, itemList];
}

// ─── SSR-rendered table (crawler-visible, no JS required) ────────────────────
function SSRRankingTable({ ranked, dateModified }: { ranked: RankedPeptide[]; dateModified: string }) {
    const evidenceColorClass: Record<string, string> = {
        "very-strong": "#22c55e", "strong": "#3b82f6", "moderate-strong": "#6366f1",
        "moderate": "#f59e0b", "emerging": "#f97316", "preclinical": "#ef4444", "anecdotal": "#71717a",
    };

    return (
        <div
            id="ssr-ranking-table"
            aria-label="Peptide evidence rankings — server rendered for search indexing"
            style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}
        >
            {/* Visible only to crawlers — client component renders the styled version */}
            <h2>Peptide Evidence Rankings</h2>
            <p>Last updated: {dateModified}. {ranked.length} compounds ranked by clinical evidence strength.</p>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Compound</th>
                        <th>Evidence Level</th>
                        <th>Studies Indexed</th>
                        <th>Category</th>
                        <th>FDA Approved</th>
                    </tr>
                </thead>
                <tbody>
                    {ranked.map((p, i) => (
                        <tr key={p.slug} id={p.slug}>
                            <td>{i + 1}</td>
                            <td>
                                <a href={`/library/${p.slug}`}>{p.name}</a>
                            </td>
                            <td style={{ color: evidenceColorClass[p.highestEvidence] }}>
                                {evidenceLabelMap[p.highestEvidence]}
                            </td>
                            <td>{p.key_studies_count}</td>
                            <td>{p.category}</td>
                            <td>{p.is_fda_approved ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EvidencePage() {
    const ranked = buildRankedList();
    const schemas = buildSchema(ranked);

    return (
        <>
            {schemas.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            {/* SSR table — visible to crawlers, hidden from visual UI */}
            <SSRRankingTable ranked={ranked} dateModified={DATE_MODIFIED} />
            {/* Client component for interactive UI */}
            <EvidenceClient
                initialRanked={ranked}
                dateModified={DATE_MODIFIED}
                formattedDate={FORMATTED_DATE}
            />
        </>
    );
}
