/**
 * PDF Extractor — Extracts purity, MW, lab name, batch ID, test date from COA PDFs
 * Uses pdf-parse (no native deps, works in serverless).
 *
 * NOTE: Run `npm install pdf-parse` before using.
 */

import type { RawCoaEntry } from "./types";

// ── Regex patterns for data extraction ──────────────────────────────────────

const PURITY_PATTERNS = [
    /purity[:\s]*(\d{2,3}(?:\.\d{1,2})?)\s*%/i,
    /HPLC[:\s]*(\d{2,3}(?:\.\d{1,2})?)\s*%/i,
    /(\d{2,3}\.\d{1,2})\s*%\s*(?:purity|pure)/i,
    /result[:\s]*(\d{2,3}(?:\.\d{1,2})?)\s*%/i,
];

const MW_PATTERNS = [
    /(?:molecular\s*weight|MW)[:\s]*([\d,.]+)\s*(?:Da|g\/mol|Dalton)/i,
    /(?:mass|M\+H)[:\s]*([\d,.]+)\s*(?:Da|m\/z)/i,
];

const BATCH_PATTERNS = [
    /(?:batch|lot)\s*(?:#|no\.?|number|id)?[:\s]*([A-Z0-9][\w-]{3,20})/i,
    /(?:Batch|LOT)\s*([A-Z0-9][\w-]{3,20})/,
];

const DATE_PATTERNS = [
    /(?:date|tested|analysis)[:\s]*(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/i,
    /(\d{4}-\d{2}-\d{2})/,
    /(\w+\s+\d{1,2},?\s+\d{4})/,
];

const LAB_PATTERNS = [
    /(?:laboratory|lab|tested\s*by|performed\s*by)[:\s]*([A-Z][\w\s&.'-]{3,40})/i,
    /(?:Janoshik|Colmaric|MZ Biolabs|Freedom Diagnostics|SIMEC|Eurofins|Intertek|SGS|GenScript)/i,
];

const METHOD_KEYWORDS = [
    "HPLC", "LC-MS", "Mass Spec", "LC-MS/MS", "GC-MS",
    "NMR", "Endotoxin", "Karl Fischer", "Heavy Metals",
    "Residual Solvents", "SDS-PAGE",
];

// ── Main extraction function ─────────────────────────────────────────────────

export async function extractFromPdf(
    pdfBuffer: Buffer,
    fallbackSlug: string,
    sourceUrl: string
): Promise<Partial<RawCoaEntry>> {
    // Dynamic import — pdf-parse is optional dependency
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let pdfParse: (buf: Buffer) => Promise<{ text: string }>;
    try {
        // Dynamic import — pdf-parse is an optional runtime dependency
        // Using variable to avoid TS module resolution at build time
        const moduleName = "pdf-parse";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pdfParse = ((await import(/* webpackIgnore: true */ moduleName)) as any).default;
    } catch {
        return { peptideSlug: fallbackSlug, sourceUrl };
    }

    const { text } = await pdfParse(pdfBuffer);
    const result: Partial<RawCoaEntry> = {
        peptideSlug: fallbackSlug,
        sourceUrl,
    };

    // Extract purity
    for (const pat of PURITY_PATTERNS) {
        const m = text.match(pat);
        if (m) {
            const val = parseFloat(m[1]);
            if (val >= 50 && val <= 100) {
                result.purity = val;
                break;
            }
        }
    }

    // Extract molecular weight
    for (const pat of MW_PATTERNS) {
        const m = text.match(pat);
        if (m) {
            result.molecularWeight = m[1].replace(/,/g, "");
            break;
        }
    }

    // Extract batch ID
    for (const pat of BATCH_PATTERNS) {
        const m = text.match(pat);
        if (m) {
            result.batchId = m[1].trim();
            break;
        }
    }

    // Extract test date
    for (const pat of DATE_PATTERNS) {
        const m = text.match(pat);
        if (m) {
            result.testDate = m[1];
            break;
        }
    }

    // Extract lab name
    for (const pat of LAB_PATTERNS) {
        const m = text.match(pat);
        if (m) {
            result.labName = (m[1] || m[0]).trim();
            break;
        }
    }

    // Extract methods
    result.methods = METHOD_KEYWORDS.filter(kw =>
        text.toLowerCase().includes(kw.toLowerCase())
    );

    return result;
}

// ── Hash helper ──────────────────────────────────────────────────────────────

export async function hashBuffer(buf: Buffer): Promise<string> {
    const { createHash } = await import("crypto");
    return createHash("sha256").update(buf).digest("hex");
}
