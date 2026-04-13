import * as fs from 'fs';
import * as path from 'path';
import { pricingData } from './src/data/pricing';
import { vendorPricing } from './src/data/vendor-pricing';

const allowedVendors = ["Ascension Peptides", "Amino Club"];

function cleanData() {
    // 1. Rewrite vendorPricing
    const newVendorPricing = vendorPricing.map(p => ({
        ...p,
        vendors: p.vendors.filter(v => allowedVendors.includes(v.vendor))
    }));

    const vpContent = `/**
 * Vendor-specific pricing for each peptide, keyed by slug.
 * Each entry lists the vendors that carry it and their price + affiliate link.
 * All prices are for a single standard vial at the most common size.
 */

export interface VendorPrice {
    vendor: string;
    price_usd: number;
    vial_mg: number;
    inStock: boolean;
    affiliateUrl: string;
    badge?: "Best Price" | "Editor's Pick" | "Best for Intl";
}

export interface PeptideVendorPricing {
    slug: string;
    name: string;
    vendors: VendorPrice[];
}

export const vendorPricing: PeptideVendorPricing[] = ${JSON.stringify(newVendorPricing, null, 4)};

export function getVendorPricing(slugOrName: string): PeptideVendorPricing | undefined {
    const normalized = slugOrName.toLowerCase();
    return vendorPricing.find(
        v => v.slug === normalized || v.name.toLowerCase() === normalized
    );
}
`;
    fs.writeFileSync(path.join(__dirname, 'src/data/vendor-pricing.ts'), vpContent);
    console.log('Cleaned vendor-pricing.ts');

    // 2. Rewrite pricingData
    const newPricingData = pricingData.map(p => {
        const allowed = p.vendors.filter(v => allowedVendors.includes(v.vendor));
        
        let avg_price_usd = 0;
        let price_range_usd: [number, number] = [0, 0];
        let cost_per_dose_usd = undefined;

        if (allowed.length > 0) {
            const sum = allowed.reduce((acc, v) => acc + v.price_usd, 0);
            avg_price_usd = parseFloat((sum / allowed.length).toFixed(2));
            const min = Math.min(...allowed.map(v => v.price_usd));
            const max = Math.max(...allowed.map(v => v.price_usd));
            price_range_usd = [min, max];
            
            if (p.doses_per_vial) {
                cost_per_dose_usd = parseFloat((avg_price_usd / p.doses_per_vial).toFixed(2));
            }
        }

        return {
            ...p,
            vendors: allowed,
            avg_price_usd,
            price_range_usd,
            cost_per_dose_usd
        };
    });

    const pContent = `export interface VendorPrice {
    vendor: string;
    price_usd: number;
    in_stock: boolean;
    link: string;
}

export interface PeptidePricing {
    name: string;
    slug: string;
    typical_vial_mg: number;
    avg_price_usd: number;
    price_range_usd: [number, number];
    cost_per_dose_usd?: number;
    doses_per_vial?: number;
    notes?: string;
    vendors: VendorPrice[];
}

export const pricingData: PeptidePricing[] = ${JSON.stringify(newPricingData, null, 4)};
`;

    fs.writeFileSync(path.join(__dirname, 'src/data/pricing.ts'), pContent);
    console.log('Cleaned pricing.ts');
    
    // 3. Clean blends
    const blendsPath = path.join(__dirname, 'src/data/blends.ts');
    let blendsContent = fs.readFileSync(blendsPath, 'utf8');
    blendsContent = blendsContent.replace(/popular_vendors:\s*\[.*?\]/g, 'popular_vendors: ["Amino Club", "Ascension Peptides"]');
    fs.writeFileSync(blendsPath, blendsContent);
    console.log('Cleaned blends.ts');
}

cleanData();
