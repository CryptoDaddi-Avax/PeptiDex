/**
 * Amino Club COA Adapter
 * ======================
 * Pattern: aminoclub.com/coa/[peptide]-latest.pdf
 * Direct PDF links — the cleanest vendor to crawl.
 */

import type { VendorCoaAdapter, RawCoaEntry } from "../types";
import { extractFromPdf, hashBuffer } from "../pdf-extractor";
import { peptides } from "@/data/peptides";

/** Known slug → COA filename overrides (where URL pattern differs) */
const SLUG_OVERRIDES: Record<string, string> = {
    "ghk-cu": "ghk-cu-latest",
    "igf-1-lr3": "igf1-lr3-latest",
    "melanotan-ii": "melanotan-2-latest",
    "thymosin-alpha-1": "thymosin-alpha1-latest",
    "5-amino-1mq": "5-amino-1mq-latest",
};

function toCoaFilename(slug: string): string {
    return SLUG_OVERRIDES[slug] ?? `${slug}-latest`;
}

export class AminoClubAdapter implements VendorCoaAdapter {
    vendorSlug = "amino-club";
    vendorName = "Amino Club";

    async discover(): Promise<RawCoaEntry[]> {
        const results: RawCoaEntry[] = [];

        // Try all known peptide slugs
        for (const peptide of peptides) {
            const filename = toCoaFilename(peptide.slug);
            const pdfUrl = `https://aminoclub.com/coa/${filename}.pdf`;

            try {
                const res = await fetch(pdfUrl, {
                    signal: AbortSignal.timeout(8000),
                    headers: { "User-Agent": "PeptiDex-COA-Crawler/1.0 (peptidex.app)" },
                });

                if (!res.ok) continue; // 404 = no COA for this peptide
                const contentType = res.headers.get("content-type") || "";
                if (!contentType.includes("pdf")) continue;

                const buf = Buffer.from(await res.arrayBuffer());
                const hash = await hashBuffer(buf);
                const extracted = await extractFromPdf(buf, peptide.slug, pdfUrl);

                results.push({
                    peptideSlug: peptide.slug,
                    sourceUrl: pdfUrl,
                    pdfUrl,
                    pdfHash: hash,
                    purity: extracted.purity,
                    batchId: extracted.batchId,
                    testDate: extracted.testDate,
                    labName: extracted.labName,
                    molecularWeight: extracted.molecularWeight,
                    methods: extracted.methods,
                });

                // Rate limit: 2s between requests
                await new Promise(r => setTimeout(r, 2000));
            } catch {
                // Network error / timeout — skip this peptide
                continue;
            }
        }

        return results;
    }
}
