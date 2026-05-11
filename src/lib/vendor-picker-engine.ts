/**
 * SmartVendorPicker Engine
 * ========================
 * Pure scoring logic — no React, fully deterministic.
 * Returns ranked vendors with human-readable reasoning.
 */
import { vendors, Vendor } from "@/data/vendors";
import { vendorPricing } from "@/data/vendor-pricing";

// ── Types ────────────────────────────────────────────────────────────────────

export type Region = "us-only" | "international";
export type Payment = "credit-card" | "crypto" | "either";
export type Priority = "cheapest" | "fastest-shipping" | "highest-purity" | "best-coa";

export interface PickerInput {
    peptideSlug: string;    // e.g. "bpc-157"
    peptideName: string;    // e.g. "BPC-157"
    region: Region;
    payment: Payment;
    priority: Priority;
}

export interface VendorRecommendation {
    vendor: Vendor;
    score: number;
    price: number | null;       // USD, after PEPTIDEX discount applied
    priceRaw: number | null;    // Pre-discount
    reasoning: string;          // Human-readable 1-sentence explanation
    bullets: string[];          // Supporting detail bullets
    affiliateUrl: string;       // With UTM source=vendor_picker
}

// ── Shipping speed → numeric days (lower = faster) ───────────────────────────

function parseShippingDays(speed: string): number {
    const m = speed.match(/(\d+)/);
    return m ? parseInt(m[1]) : 99;
}

// ── Payment check ────────────────────────────────────────────────────────────

function paymentMatch(vendor: Vendor, payment: Payment): boolean {
    if (payment === "either") return true;
    if (payment === "credit-card") return vendor.paymentMethods.some(p => p.toLowerCase().includes("credit"));
    if (payment === "crypto") return vendor.paymentMethods.some(p => p.toLowerCase().includes("crypto"));
    return false;
}

// ── Region check ─────────────────────────────────────────────────────────────

function regionMatch(vendor: Vendor, region: Region): boolean {
    if (region === "us-only") return vendor.shipsTo.some(s => s === "USA" || s === "US");
    // international: vendor must ship somewhere outside USA
    return vendor.shipsTo.length > 1 || vendor.shipsTo.some(s => s === "International");
}

// ── Get price for this peptide from this vendor ───────────────────────────────

function getPriceForVendor(vendor: Vendor, peptideSlug: string): { raw: number | null; discounted: number | null } {
    const entry = vendorPricing.find(vp => vp.slug === peptideSlug);
    if (!entry) return { raw: null, discounted: null };

    // Match by name (vendor-pricing uses name strings)
    const priceEntry = entry.vendors.find(v => v.vendor === vendor.name && v.inStock);
    if (!priceEntry) return { raw: null, discounted: null };

    const raw = priceEntry.price_usd;
    const discount = vendor.discountPercent ?? 0;
    const discounted = raw * (1 - discount / 100);
    return { raw, discounted: Math.round(discounted * 100) / 100 };
}

// ── COA score (higher = better documentation) ─────────────────────────────────

function coaScore(vendor: Vendor): number {
    const methods = vendor.testingMethods.length;
    const hasBatchCoa = vendor.coaStatus.toLowerCase().includes("batch");
    const hasEndotoxin = vendor.testingMethods.some(m => m.toLowerCase().includes("endotoxin"));
    const tier = vendor.verificationTier === "gold" ? 3 : vendor.verificationTier === "silver" ? 2 : 1;
    return methods * 2 + (hasBatchCoa ? 4 : 0) + (hasEndotoxin ? 2 : 0) + tier;
}

// ── Purity score ──────────────────────────────────────────────────────────────

function purityScore(vendor: Vendor): number {
    if (vendor.purity.includes("99%")) return 2;
    if (vendor.purity.includes("98%")) return 1;
    return 0;
}

// ── Main ranking function ─────────────────────────────────────────────────────

export function rankVendors(input: PickerInput): VendorRecommendation[] {
    const { peptideSlug, region, payment, priority } = input;

    // Step 1: Filter by hard constraints
    const eligible = vendors.filter(v =>
        regionMatch(v, region) && paymentMatch(v, payment)
    );

    if (eligible.length === 0) return [];

    // Step 2: Score each vendor
    const scored = eligible.map(vendor => {
        const { raw, discounted } = getPriceForVendor(vendor, peptideSlug);
        let score = 0;

        // Base scores always applied
        score += vendor.rating * 2;          // Rating quality signal (0–10)
        score += purityScore(vendor) * 3;    // Purity
        score += coaScore(vendor) * 0.5;     // COA documentation

        // Priority multipliers
        if (priority === "cheapest") {
            if (discounted !== null) {
                // Invert price: lower price = higher score. Scale to 0–30 range.
                score += Math.max(0, 30 - discounted);
            } else {
                score -= 10; // Penalize no price data
            }
        } else if (priority === "fastest-shipping") {
            const days = parseShippingDays(vendor.shippingSpeed);
            score += Math.max(0, 20 - days * 3); // Faster = more points
        } else if (priority === "highest-purity") {
            score += purityScore(vendor) * 8; // Heavily weight purity
            score += vendor.testingMethods.length * 3;
        } else if (priority === "best-coa") {
            score += coaScore(vendor) * 4; // Heavily weight COA
        }

        // Discount bonus for "cheapest" priority
        if (priority === "cheapest" && vendor.discountCode) {
            score += 3;
        }

        return { vendor, score, raw, discounted };
    });

    // Step 3: Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    // Step 4: Build recommendation objects with reasoning
    return scored.map(({ vendor, score, raw, discounted }, idx) => {
        const bullets: string[] = [
            `${vendor.purity} purity · ${vendor.coaStatus}`,
            vendor.shippingSpeed,
            vendor.returnPolicy,
        ];
        if (vendor.discountCode) {
            bullets.push(`Code ${vendor.discountCode} saves ${vendor.discountPercent}%`);
        }
        if (vendor.editorialNote) {
            bullets.push(vendor.editorialNote.substring(0, 80));
        }

        // Build reasoning
        let reasoning = "";
        const priceStr = discounted !== null ? `$${discounted.toFixed(2)}` : "pricing unavailable";

        if (priority === "cheapest") {
            reasoning = `${vendor.name} offers ${peptideSlug.replace(/-/g, " ").toUpperCase()} at ${priceStr}${vendor.discountCode ? ` with code ${vendor.discountCode}` : ""}, the most competitive price for your region.`;
        } else if (priority === "fastest-shipping") {
            reasoning = `${vendor.name} ships in ${vendor.shippingSpeed} — the fastest available option meeting your payment and region requirements.`;
        } else if (priority === "highest-purity") {
            reasoning = `${vendor.name} provides ${vendor.purity} purity verified via ${vendor.testingMethods.join(", ")} — highest verification level for your search.`;
        } else if (priority === "best-coa") {
            const methods = vendor.testingMethods.join(" + ");
            reasoning = `${vendor.name} offers the most rigorous documentation: ${vendor.coaStatus} using ${methods}${vendor.lastTestedDate ? `, last tested ${vendor.lastTestedDate}` : ""}.`;
        }

        // UTM-tagged URL
        const affiliateUrl = vendor.affiliateUrl.includes("?")
            ? `${vendor.affiliateUrl}&utm_source=vendor_picker&utm_medium=tool&utm_content=${idx === 0 ? "primary" : "runner_up"}`
            : `${vendor.affiliateUrl}?utm_source=vendor_picker&utm_medium=tool&utm_content=${idx === 0 ? "primary" : "runner_up"}`;

        return {
            vendor,
            score,
            price: discounted,
            priceRaw: raw,
            reasoning,
            bullets,
            affiliateUrl,
        };
    });
}
