const fs = require('fs');

const data = [
    { name: "BPC-157", slug: "bpc-157", typical_vial_mg: 5, avg_price_usd: 55, price_range_usd: [45, 75], cost_per_dose_usd: 2.75, doses_per_vial: 20, notes: "Premium tested prices are higher than bulk." },
    { name: "TB-500", slug: "tb-500", typical_vial_mg: 5, avg_price_usd: 65, price_range_usd: [55, 85], cost_per_dose_usd: 9.28, doses_per_vial: 7 },
    { name: "CJC-1295", slug: "cjc-1295", typical_vial_mg: 2, avg_price_usd: 45, price_range_usd: [35, 60], cost_per_dose_usd: 5.62, doses_per_vial: 8 },
    { name: "Ipamorelin", slug: "ipamorelin", typical_vial_mg: 5, avg_price_usd: 48, price_range_usd: [38, 65], cost_per_dose_usd: 1.60, doses_per_vial: 30 },
    { name: "Semax", slug: "semax", typical_vial_mg: 30, avg_price_usd: 75, price_range_usd: [60, 95], cost_per_dose_usd: 1.25, doses_per_vial: 60, notes: "Pricing for 30mg nasal spray." },
    { name: "Selank", slug: "selank", typical_vial_mg: 30, avg_price_usd: 75, price_range_usd: [60, 95], cost_per_dose_usd: 1.25, doses_per_vial: 60, notes: "Pricing for 30mg nasal spray." },
    { name: "GHK-Cu", slug: "ghk-cu", typical_vial_mg: 50, avg_price_usd: 55, price_range_usd: [45, 80], cost_per_dose_usd: 2.20, doses_per_vial: 25, notes: "Typically sold in larger 50mg vials." },
    { name: "Tesamorelin", slug: "tesamorelin", typical_vial_mg: 2, avg_price_usd: 80, price_range_usd: [65, 110], cost_per_dose_usd: 8.00, doses_per_vial: 10 },
    { name: "AOD-9604", slug: "aod-9604", typical_vial_mg: 5, avg_price_usd: 55, price_range_usd: [45, 75], cost_per_dose_usd: 3.66, doses_per_vial: 15 },
    { name: "MOTS-c", slug: "mots-c", typical_vial_mg: 10, avg_price_usd: 85, price_range_usd: [70, 110], cost_per_dose_usd: 42.50, doses_per_vial: 2, notes: "Usually sold in 10mg vials, dosed at 5mg." },
    { name: "Epitalon", slug: "epitalon", typical_vial_mg: 10, avg_price_usd: 60, price_range_usd: [50, 85], cost_per_dose_usd: 3.00, doses_per_vial: 20 },
    { name: "Thymosin Alpha-1", slug: "thymosin-alpha-1", typical_vial_mg: 5, avg_price_usd: 85, price_range_usd: [65, 110], cost_per_dose_usd: 10.62, doses_per_vial: 8 },
    { name: "Melanotan II", slug: "melanotan-ii", typical_vial_mg: 10, avg_price_usd: 45, price_range_usd: [35, 65], cost_per_dose_usd: 2.25, doses_per_vial: 20 },
    { name: "PT-141", slug: "pt-141", typical_vial_mg: 10, avg_price_usd: 55, price_range_usd: [45, 75], cost_per_dose_usd: 5.50, doses_per_vial: 10 },
    { name: "DSIP", slug: "dsip", typical_vial_mg: 5, avg_price_usd: 60, price_range_usd: [50, 80], cost_per_dose_usd: 6.00, doses_per_vial: 10 },
    { name: "Retatrutide", slug: "retatrutide", typical_vial_mg: 10, avg_price_usd: 190, price_range_usd: [160, 240], cost_per_dose_usd: 38.00, doses_per_vial: 5, notes: "Premium tri-agonist, highly priced." },
    { name: "Tirzepatide", slug: "tirzepatide", typical_vial_mg: 10, avg_price_usd: 140, price_range_usd: [110, 180], cost_per_dose_usd: 35.00, doses_per_vial: 4 },
    { name: "Semaglutide", slug: "semaglutide", typical_vial_mg: 5, avg_price_usd: 120, price_range_usd: [90, 160], cost_per_dose_usd: 24.00, doses_per_vial: 5 },
    { name: "Sermorelin", slug: "sermorelin", typical_vial_mg: 2, avg_price_usd: 40, price_range_usd: [30, 55], cost_per_dose_usd: 5.71, doses_per_vial: 7 },
    { name: "KPV", slug: "kpv", typical_vial_mg: 5, avg_price_usd: 65, price_range_usd: [50, 85], cost_per_dose_usd: 6.50, doses_per_vial: 10 },
    { name: "SS-31", slug: "ss-31", typical_vial_mg: 10, avg_price_usd: 110, price_range_usd: [85, 140], cost_per_dose_usd: 22.00, doses_per_vial: 5 },
    { name: "Dihexa", slug: "dihexa", typical_vial_mg: 5, avg_price_usd: 75, price_range_usd: [60, 95], cost_per_dose_usd: 3.75, doses_per_vial: 20 },
    { name: "Follistatin-344", slug: "follistatin-344", typical_vial_mg: 1, avg_price_usd: 130, price_range_usd: [100, 170], cost_per_dose_usd: 13.00, doses_per_vial: 10 },
    { name: "IGF-1 LR3", slug: "igf-1-lr3", typical_vial_mg: 1, avg_price_usd: 110, price_range_usd: [85, 140], cost_per_dose_usd: 11.00, doses_per_vial: 10 }
];

const newData = data.map(item => {
    return `{
    name: "${item.name}",
    slug: "${item.slug}",
    typical_vial_mg: ${item.typical_vial_mg},
    avg_price_usd: ${item.avg_price_usd},
    price_range_usd: [${item.price_range_usd[0]}, ${item.price_range_usd[1]}],
    ${item.cost_per_dose_usd ? `cost_per_dose_usd: ${item.cost_per_dose_usd},` : ''}
    ${item.doses_per_vial ? `doses_per_vial: ${item.doses_per_vial},` : ''}
    ${item.notes ? `notes: "${item.notes}",` : ''}
    vendors: [
        { vendor: "Ascension Peptides", price_usd: ${item.price_range_usd[1]}, in_stock: true, link: "/vendors" },
        { vendor: "Amino Club", price_usd: ${item.avg_price_usd}, in_stock: true, link: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" },
        { vendor: "Soma Chems", price_usd: ${item.price_range_usd[0]}, in_stock: true, link: "/vendors" }
    ]
}`;
}).join(',\n    ');

const finalContent = `export interface VendorPrice {
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

export const pricingData: PeptidePricing[] = [
    ${newData}
];
`;

fs.writeFileSync('src/data/pricing.ts', finalContent);
console.log("Updated!");
