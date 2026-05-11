/**
 * Trust Score Calculator
 * ======================
 * Computes composite vendor trust scores from coa_records.
 * Four components, 25 points each, total 0–100.
 *
 * 1. Purity Consistency (low σ = good)
 * 2. COA Recency (fresh = good)
 * 3. Lab Credibility (reputable labs = good)
 * 4. Catalog Coverage (% of catalog with public COAs)
 */

import { lookupLab, type LabTier } from "@/data/coa-labs";
import { vendors } from "@/data/vendors";

interface CoaRow {
    purity_pct: number | null;
    test_date: string | null;
    lab_name: string | null;
    lab_tier: string | null;
}

export interface TrustScoreResult {
    vendorSlug: string;
    trustScore: number;
    purityConsistency: number;
    coaRecencyScore: number;
    labCredibility: number;
    catalogCoverage: number;
    totalCoas: number;
    avgPurity: number | null;
    stddevPurity: number | null;
    lastCoaDate: string | null;
}

// ── Component 1: Purity Consistency (25 pts) ─────────────────────────────────

function scorePurityConsistency(rows: CoaRow[]): { score: number; avg: number | null; stddev: number | null } {
    const purities = rows.map(r => r.purity_pct).filter((p): p is number => p !== null);
    if (purities.length < 2) return { score: 15, avg: purities[0] ?? null, stddev: null }; // Insufficient data — neutral

    const avg = purities.reduce((s, v) => s + v, 0) / purities.length;
    const variance = purities.reduce((s, v) => s + (v - avg) ** 2, 0) / purities.length;
    const stddev = Math.sqrt(variance);

    let score: number;
    if (stddev < 0.5) score = 25;
    else if (stddev < 1.0) score = 20;
    else if (stddev < 2.0) score = 12;
    else score = 5;

    return { score, avg: Math.round(avg * 100) / 100, stddev: Math.round(stddev * 100) / 100 };
}

// ── Component 2: COA Recency (25 pts) ─────────────────────────────────────────

function scoreCoaRecency(rows: CoaRow[]): { score: number; lastDate: string | null } {
    const dates = rows
        .map(r => r.test_date)
        .filter((d): d is string => d !== null)
        .map(d => new Date(d).getTime())
        .sort((a, b) => b - a);

    if (dates.length === 0) return { score: 3, lastDate: null };

    const latestMs = dates[0];
    const ageInDays = (Date.now() - latestMs) / (1000 * 60 * 60 * 24);

    let score: number;
    if (ageInDays < 30) score = 25;
    else if (ageInDays < 60) score = 20;
    else if (ageInDays < 90) score = 15;
    else if (ageInDays < 180) score = 8;
    else score = 3;

    return { score, lastDate: new Date(latestMs).toISOString().split("T")[0] };
}

// ── Component 3: Lab Credibility (25 pts) ─────────────────────────────────────

function scoreLabCredibility(rows: CoaRow[]): number {
    if (rows.length === 0) return 5;

    const tiers: LabTier[] = rows.map(r => {
        if (r.lab_tier) return r.lab_tier as LabTier;
        if (r.lab_name) {
            const lab = lookupLab(r.lab_name);
            return lab?.tier ?? "unverified";
        }
        return "unverified";
    });

    if (tiers.some(t => t === "flagged")) return 0;

    const reputablePct = tiers.filter(t => t === "reputable").length / tiers.length;
    if (reputablePct >= 1.0) return 25;
    if (reputablePct >= 0.5) return 18;
    if (reputablePct > 0) return 12;
    return 5;
}

// ── Component 4: Catalog Coverage (25 pts) ─────────────────────────────────────

function scoreCatalogCoverage(vendorSlug: string, uniquePeptideSlugs: string[]): number {
    const vendor = vendors.find(v => v.slug === vendorSlug);
    if (!vendor) return 5;

    // Parse catalog size (e.g., "40+ compounds" → 40)
    const catalogMatch = vendor.catalogSize.match(/(\d+)/);
    const catalogSize = catalogMatch ? parseInt(catalogMatch[1]) : 30; // Default estimate

    const coveragePct = (uniquePeptideSlugs.length / catalogSize) * 100;

    if (coveragePct >= 80) return 25;
    if (coveragePct >= 50) return 18;
    if (coveragePct >= 25) return 12;
    if (coveragePct >= 10) return 6;
    return 2;
}

// ── Main calculator ──────────────────────────────────────────────────────────

export function calculateTrustScore(vendorSlug: string, rows: CoaRow[]): TrustScoreResult {
    const { score: purityConsistency, avg: avgPurity, stddev: stddevPurity } = scorePurityConsistency(rows);
    const { score: coaRecencyScore, lastDate: lastCoaDate } = scoreCoaRecency(rows);
    const labCredibility = scoreLabCredibility(rows);

    const uniquePeptides = [...new Set(
        rows.map(r => (r as unknown as Record<string, unknown>).peptide_slug as string).filter(Boolean)
    )];
    const catalogCoverage = scoreCatalogCoverage(vendorSlug, uniquePeptides);

    const trustScore = purityConsistency + coaRecencyScore + labCredibility + catalogCoverage;

    return {
        vendorSlug,
        trustScore,
        purityConsistency,
        coaRecencyScore,
        labCredibility,
        catalogCoverage,
        totalCoas: rows.length,
        avgPurity,
        stddevPurity,
        lastCoaDate,
    };
}
