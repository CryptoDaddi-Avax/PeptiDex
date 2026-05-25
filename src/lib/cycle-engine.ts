import { peptides } from "@/data/peptides";
import { pricingData } from "@/data/pricing";
import { Peptide } from "@/data/types";

/* ───────────────────────── TYPES ───────────────────────── */

export interface CyclePeptideConfig {
    peptideName: string;
    cycleWeeks: number;
    doseMcg: number;
    injectionsPerWeek: number;
    bacWaterMl: number;
    vialMg: number;
}

export interface CyclePeptideResult {
    peptideName: string;
    vialMg: number;               // added for receipt
    concentration: number;        // mcg per ml
    doseVolumeMl: number;         // ml per injection
    syringeUnits: number;         // U-100 insulin syringe
    dosesPerVial: number;         // how many injections from 1 vial
    totalInjections: number;      // total injections for the full cycle
    vialsNeeded: number;          // total vials to order
    bacWaterMlNeeded: number;     // total bac water needed for this peptide across all vials
    vialDaysLast: number;         // how many days one vial lasts
    costPerVial: number | null;   // avg cost per vial
    totalCost: number | null;     // total cost for the cycle
    vendorPrices: VendorCyclePrice[];
    cycleWeeks: number;
    doseMcg: number;
    injectionsPerWeek: number;
    frequency: string;
    timing: string;
    route: string;
    cycleNotes: string;
}

export interface VendorCyclePrice {
    vendor: string;
    pricePerVial: number;
    totalCost: number;
    link: string;
    inStock: boolean;
}

export interface ShoppingListSummary {
    peptides: CyclePeptideResult[];
    vendorTotals: { vendor: string; total: number; originalTotal?: number; discountCode?: string; link: string }[];
    totalBacWaterMl: number;
    totalSyringes: number;
    
    // New Cost Breakdown Properties
    maxCycleWeeks: number;
    supplies: {
        bacWater: { quantity: number; unitPrice: number; subtotal: number };
        syringes: { quantity: number; unitPrice: number; subtotal: number };
        swabs:    { quantity: number; unitPrice: number; subtotal: number };
    };
    peptideSubtotal: number;
    suppliesSubtotal: number;
    grandTotal: number;
    costPerWeek: number;
    costPerDay: number;
}

/* ───────────────────── FREQUENCY PARSER ────────────────── */

/**
 * Parses a human-readable frequency string into injections per week.
 *   "Daily"           → 7
 *   "1-2x daily"      → 10.5 (avg, round to 10)
 *   "2x/week"         → 2
 *   "3x/week"         → 3
 *   "5 on 2 off"      → 5
 *   "Once weekly"      → 1
 *   "Every other day"  → 3.5 → 4
 *   "EOD"             → 4
 */
export function parseFrequency(freq: string): number {
    if (!freq) return 7; // default daily
    const f = freq.toLowerCase().trim();

    // "daily" variants
    if (f === "daily" || f === "once daily" || f === "1x daily") return 7;
    if (f === "1-2x daily") return 10; // conservative avg: ~1.5x/day
    if (f === "2x daily" || f === "twice daily" || f === "2x/day") return 14;

    // "Nx/week" variants
    const weekMatch = f.match(/(\d+)\s*x?\s*\/?\s*(per\s+)?week/i);
    if (weekMatch) return parseInt(weekMatch[1]);

    // "once weekly" / "weekly"
    if (f.includes("weekly") || f.includes("once per week") || f.includes("once a week")) return 1;
    if (f.includes("biweekly") || f.includes("every 2 weeks")) return 0.5;

    // "5 on 2 off"
    const onOffMatch = f.match(/(\d+)\s*(?:days?\s*)?on/i);
    if (onOffMatch) return parseInt(onOffMatch[1]);

    // "every other day" / "EOD"
    if (f.includes("every other day") || f === "eod") return 4; // 3.5 rounded up

    // "3-5x/week"
    const rangeMatch = f.match(/(\d+)\s*-\s*(\d+)\s*x?\s*\/?\s*week/i);
    if (rangeMatch) return Math.ceil((parseInt(rangeMatch[1]) + parseInt(rangeMatch[2])) / 2);

    return 7; // default daily
}

/* ──────────────────── CYCLE CALCULATOR ─────────────────── */

export function calculateCycle(config: CyclePeptideConfig): CyclePeptideResult {
    const peptide = peptides.find(p => p.name === config.peptideName);
    const pricing = pricingData.find(p => p.name === config.peptideName);

    const { cycleWeeks, doseMcg, injectionsPerWeek, bacWaterMl, vialMg } = config;

    // Core math
    const concentration = (vialMg * 1000) / bacWaterMl;    // mcg per ml
    const doseVolumeMl = doseMcg / concentration;           // ml per injection
    const syringeUnits = Math.round(doseVolumeMl * 100);   // U-100 insulin units
    const dosesPerVial = Math.floor(bacWaterMl / doseVolumeMl); // integer doses per vial
    const totalInjections = injectionsPerWeek * cycleWeeks;
    const vialsNeeded = Math.ceil(totalInjections / dosesPerVial);
    const bacWaterMlNeeded = vialsNeeded * bacWaterMl;
    const vialDaysLast = dosesPerVial / (injectionsPerWeek / 7);

    // Pricing
    const vendorPrices: VendorCyclePrice[] = (pricing?.vendors || []).map(v => ({
        vendor: v.vendor,
        pricePerVial: v.price_usd,
        totalCost: parseFloat((v.price_usd * vialsNeeded).toFixed(2)),
        link: v.link,
        inStock: v.in_stock,
    }));

    const avgCost = pricing && pricing.avg_price_usd ? pricing.avg_price_usd : 49.99; // Fallback price

    return {
        peptideName: config.peptideName,
        vialMg: config.vialMg,
        concentration,
        doseVolumeMl,
        syringeUnits,
        dosesPerVial,
        totalInjections,
        vialsNeeded,
        bacWaterMlNeeded,
        vialDaysLast: Math.round(vialDaysLast),
        costPerVial: avgCost,
        totalCost: parseFloat((avgCost * vialsNeeded).toFixed(2)),
        vendorPrices,
        cycleWeeks,
        doseMcg,
        injectionsPerWeek,
        frequency: peptide?.dosing?.frequency || "Daily",
        timing: peptide?.dosing?.timing || "",
        route: peptide?.dosing?.route || "SubQ",
        cycleNotes: peptide?.dosing?.notes || "",
    };
}

/* ──────────────────── SHOPPING LIST ───────────────────── */

export function generateShoppingList(results: CyclePeptideResult[], includeSupplies: boolean = true): ShoppingListSummary {
    // Aggregate per-vendor totals
    const vendorMap = new Map<string, { total: number; link: string }>();
    let totalBacWaterMl = 0;
    let totalSyringes = 0;
    let maxCycleWeeks = 0;
    let peptideSubtotal = 0;

    results.forEach(r => {
        totalBacWaterMl += r.bacWaterMlNeeded;
        totalSyringes += r.totalInjections;
        peptideSubtotal += (r.totalCost || 0);
        if (r.cycleWeeks > maxCycleWeeks) maxCycleWeeks = r.cycleWeeks;

        r.vendorPrices.forEach(vp => {
            const existing = vendorMap.get(vp.vendor);
            if (existing) {
                existing.total += vp.totalCost;
            } else {
                vendorMap.set(vp.vendor, { total: vp.totalCost, link: vp.link });
            }
        });
    });

    // Verified vendor discount rates (source: vendor-cart-config.ts)
    const VENDOR_DISCOUNTS: Record<string, { percent: number; code: string }> = {
        "Amino Club":          { percent: 20, code: "PEPTIDEX" },
        // "Ascension Peptides" omitted — deactivated 2026-05-24
        "Bio Longevity Labs":  { percent: 15, code: "PEPTIDEX" },
        "Limitless Life":      { percent: 15, code: "PEPTIDEX" },
        "Pantheon Peptides":   { percent: 10, code: "peptidex10" },
    };

    const vendorTotals = Array.from(vendorMap.entries())
        .map(([vendor, data]) => {
            let total = parseFloat(data.total.toFixed(2));
            let originalTotal = undefined;
            let discountCode = undefined;

            const discount = VENDOR_DISCOUNTS[vendor];
            if (discount) {
                originalTotal = total;
                total = parseFloat((total * (1 - discount.percent / 100)).toFixed(2));
                discountCode = discount.code;
            }

            return {
                vendor,
                total,
                originalTotal,
                discountCode,
                link: data.link,
            };
        })
        .sort((a, b) => a.total - b.total); // cheapest first

    // Supply logic & pricing constants
    const BAC_UNIT_PRICE = 12.00;
    const SYRINGE_BOX_PRICE = 15.00; // 100 ct
    const SWAB_BOX_PRICE = 8.00;     // 200 ct

    const bacWaterQuantity = Math.ceil(totalBacWaterMl / 30) || (results.length > 0 ? 1 : 0);
    const syringesQuantity = Math.ceil(totalSyringes / 100) || (results.length > 0 ? 1 : 0);
    const swabsQuantity = Math.ceil(totalSyringes / 200) || (results.length > 0 ? 1 : 0);

    const supplies = {
        bacWater: { quantity: bacWaterQuantity, unitPrice: BAC_UNIT_PRICE, subtotal: bacWaterQuantity * BAC_UNIT_PRICE },
        syringes: { quantity: syringesQuantity, unitPrice: SYRINGE_BOX_PRICE, subtotal: syringesQuantity * SYRINGE_BOX_PRICE },
        swabs: { quantity: swabsQuantity, unitPrice: SWAB_BOX_PRICE, subtotal: swabsQuantity * SWAB_BOX_PRICE }
    };

    const suppliesSubtotal = includeSupplies ? (supplies.bacWater.subtotal + supplies.syringes.subtotal + supplies.swabs.subtotal) : 0;
    const grandTotal = peptideSubtotal + suppliesSubtotal;
    const costPerWeek = maxCycleWeeks > 0 ? (grandTotal / maxCycleWeeks) : 0;
    const costPerDay = costPerWeek / 7;

    return { 
        peptides: results, 
        vendorTotals, 
        totalBacWaterMl, 
        totalSyringes,
        maxCycleWeeks,
        supplies,
        peptideSubtotal,
        suppliesSubtotal,
        grandTotal,
        costPerWeek,
        costPerDay
    };
}

/* ──────────────── DEFAULT CONFIG FROM PEPTIDE ─────────── */

export function getDefaultConfig(peptideName: string): CyclePeptideConfig {
    const peptide = peptides.find(p => p.name === peptideName);
    const dosing = peptide?.dosing;

    return {
        peptideName,
        cycleWeeks: dosing?.cycle_weeks ? dosing.cycle_weeks[0] : 8,
        doseMcg: dosing?.typical_dose_mcg ? dosing.typical_dose_mcg[0] : 250,
        injectionsPerWeek: dosing ? parseFrequency(dosing.frequency) : 7,
        bacWaterMl: dosing?.reconstitution_ml || 2.5,
        vialMg: dosing?.typical_vial_mg || 5,
    };
}
