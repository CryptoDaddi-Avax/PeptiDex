/**
 * Ascension Peptides COA Adapter
 * ================================
 * Source: ascensionpeptides.com/certificates-of-analysis/
 *
 * KEY FINDING (verified via browser inspection 2026-05-10):
 * - COAs are WebP images, NOT PDFs. No pdf-parse needed.
 * - Purity, batch number, and analysis date are TEXT in the DOM next to each image.
 * - Image URLs follow: /wp-content/uploads/[year]/[month]/COA_[PeptideName]_[batch]-scaled.webp
 * - Structure: Elementor grid, each COA block has h5/heading (peptide name),
 *   then image link, then text fields for "Analysis Date", "Batch/Lot #", "Purity"
 *
 * Strategy: Fetch the index page HTML once, parse with cheerio, extract all COA blocks.
 * No PDF downloading. One HTTP request total. Very lightweight.
 */

import type { VendorCoaAdapter, RawCoaEntry } from "../types";
import * as cheerio from "cheerio";

const COA_INDEX_URL = "https://ascensionpeptides.com/certificates-of-analysis/";

/**
 * Map peptide name strings found in COA filenames/headings → our slugs.
 * Ascension uses display names; we normalise to our data layer slugs.
 */
const NAME_TO_SLUG: Record<string, string> = {
    "bpc-157": "bpc-157",
    "bpc157": "bpc-157",
    "tb-500": "tb-500",
    "tb500": "tb-500",
    "cjc-1295": "cjc-1295",
    "cjc1295": "cjc-1295",
    "ipamorelin": "ipamorelin",
    "semaglutide": "semaglutide",
    "tirzepatide": "tirzepatide",
    "retatrutide": "retatrutide",
    "sermorelin": "sermorelin",
    "tesamorelin": "tesamorelin",
    "ghk-cu": "ghk-cu",
    "ghk cu": "ghk-cu",
    "selank": "selank",
    "semax": "semax",
    "epitalon": "epitalon",
    "epithalon": "epitalon",
    "pt-141": "pt-141",
    "pt141": "pt-141",
    "melanotan ii": "melanotan-ii",
    "melanotan-ii": "melanotan-ii",
    "aod-9604": "aod-9604",
    "aod9604": "aod-9604",
    "dsip": "dsip",
    "mots-c": "mots-c",
    "motsc": "mots-c",
    "ss-31": "ss-31",
    "ss31": "ss-31",
    "igf-1 lr3": "igf-1-lr3",
    "igf-1lr3": "igf-1-lr3",
    "igf1 lr3": "igf-1-lr3",
    "nad+": "nad-plus",
    "nad": "nad-plus",
    "thymosin alpha-1": "thymosin-alpha-1",
    "thymosin alpha 1": "thymosin-alpha-1",
    "thymosin-alpha-1": "thymosin-alpha-1",
    "follistatin 344": "follistatin-344",
    "follistatin-344": "follistatin-344",
    "kpv": "kpv",
};

function slugFromName(rawName: string): string | null {
    const normalised = rawName.toLowerCase().trim().replace(/\s+/g, " ");
    // Direct lookup
    if (NAME_TO_SLUG[normalised]) return NAME_TO_SLUG[normalised];
    // Partial match
    for (const [key, slug] of Object.entries(NAME_TO_SLUG)) {
        if (normalised.includes(key) || key.includes(normalised)) return slug;
    }
    return null;
}

function slugFromImageUrl(url: string): string | null {
    // Extract peptide name from filename like COA_BPC-157_2025-03-26_...-scaled.webp
    const match = url.match(/COA_([^_]+(?:_[^_]+)?)/i);
    if (!match) return null;
    return slugFromName(match[1].replace(/_/g, " ").replace(/-/g, " "));
}

function parsePurityFromText(text: string): number | null {
    const m = text.match(/(\d{2,3}(?:\.\d{1,3})?)\s*%?$/);
    if (m) {
        const val = parseFloat(m[1]);
        if (val >= 50 && val <= 100) return val;
    }
    return null;
}

function parseDateFromText(text: string): string | null {
    // e.g. "July 31, 2025" or "2025-07-31"
    const iso = text.match(/(\d{4}-\d{2}-\d{2})/);
    if (iso) return iso[1];
    const longDate = text.match(/(\w+ \d{1,2},? \d{4})/);
    if (longDate) {
        const parsed = new Date(longDate[1]);
        if (!isNaN(parsed.getTime())) return parsed.toISOString().split("T")[0];
    }
    return null;
}

export class AscensionAdapter implements VendorCoaAdapter {
    vendorSlug = "ascension-peptides";
    vendorName = "Ascension Peptides";

    async discover(): Promise<RawCoaEntry[]> {
        const results: RawCoaEntry[] = [];

        let html: string;
        try {
            const res = await fetch(COA_INDEX_URL, {
                signal: AbortSignal.timeout(15000),
                headers: {
                    "User-Agent": "PeptiDex-COA-Crawler/1.0 (peptidex.app; research aggregator)",
                    "Accept": "text/html,application/xhtml+xml",
                },
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            html = await res.text();
        } catch (err) {
            throw new Error(`Failed to fetch Ascension COA index: ${(err as Error).message}`);
        }

        const $ = cheerio.load(html);

        // Strategy: find all wp-content image links with COA_ in the filename
        // Each Elementor block contains: heading (peptide name) + image link + text fields
        const coaImageLinks = $("a[href*='wp-content/uploads'][href*='COA']");

        coaImageLinks.each((_i, el) => {
            const imageUrl = $(el).attr("href") || "";
            if (!imageUrl) return;

            // Try to resolve peptide slug from the image URL filename
            let peptideSlug = slugFromImageUrl(imageUrl);

            // Walk up to find the containing block, then look for surrounding text
            const container = $(el).closest(
                ".elementor-widget-container, .elementor-column, .elementor-element, .wp-block-column, div[class*='col']"
            );

            // Try to get peptide name from heading within the block
            if (!peptideSlug) {
                const heading = container.find("h1,h2,h3,h4,h5,h6,.elementor-heading-title").first().text().trim();
                if (heading) peptideSlug = slugFromName(heading);
            }

            // Also look in the broader section (sibling containers)
            const section = $(el).closest(".elementor-section, .wp-block-group, section");
            if (!peptideSlug) {
                const sectionHeading = section.find("h1,h2,h3,h4,h5,h6").first().text().trim();
                if (sectionHeading) peptideSlug = slugFromName(sectionHeading);
            }

            // Extract text content from the entire container block
            const blockText = container.text();
            const sectionText = section.text();
            const allText = blockText || sectionText;

            // Extract purity from text
            let purity: number | null = null;
            const purityMatch = allText.match(/[Pp]urity[:\s]+([\d.]+)\s*%?/);
            if (purityMatch) purity = parsePurityFromText(purityMatch[1]);
            // Fallback: look for standalone numbers that look like purity
            if (purity === null) {
                const purityFallback = allText.match(/\b(9[5-9]\.\d{1,3}|100\.0)\b/);
                if (purityFallback) purity = parseFloat(purityFallback[1]);
            }

            // Extract analysis date
            let testDate: string | null = null;
            const dateMatch = allText.match(/(?:[Aa]nalysis [Dd]ate|[Dd]ate)[:\s]+([A-Za-z]+ \d{1,2},? \d{4}|\d{4}-\d{2}-\d{2})/);
            if (dateMatch) testDate = parseDateFromText(dateMatch[1]);

            // Extract batch/lot number
            let batchId: string | null = null;
            const batchMatch = allText.match(/(?:[Bb]atch|[Ll]ot)[\/\s#]*([A-Z0-9][\w-]{3,20})/);
            if (batchMatch) batchId = batchMatch[1].trim();

            // Also try to extract date from the image URL itself (it's often embedded)
            if (!testDate) {
                const urlDateMatch = imageUrl.match(/(\d{4})(\d{2})(\d{2})/);
                if (urlDateMatch) {
                    testDate = `${urlDateMatch[1]}-${urlDateMatch[2]}-${urlDateMatch[3]}`;
                } else {
                    // Try /uploads/2025/08/ pattern
                    const uploadDate = imageUrl.match(/\/uploads\/(\d{4})\/(\d{2})\//);
                    if (uploadDate) testDate = `${uploadDate[1]}-${uploadDate[2]}-01`;
                }
            }

            if (!peptideSlug) return; // Can't identify peptide — skip

            // Deduplicate by image URL
            if (results.some(r => r.sourceUrl === imageUrl)) return;

            results.push({
                peptideSlug,
                sourceUrl: imageUrl,        // Links to the image (we never republish)
                purity: purity ?? undefined,
                batchId: batchId ?? undefined,
                testDate: testDate ?? undefined,
                labName: "Colmaric Analyticals", // Ascension uses Colmaric (confirmed from verification-data.ts)
                methods: ["HPLC", "Mass Spec"],   // Ascension standard methods per verification-data.ts
            });
        });

        return results;
    }
}
