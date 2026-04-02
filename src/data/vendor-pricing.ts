/**
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

export const vendorPricing: PeptideVendorPricing[] = [
    {
        slug: "bpc-157", name: "BPC-157",
        vendors: [
            { vendor: "Amino Club", price_usd: 39.99, vial_mg: 10, inStock: true, affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX", badge: "Editor's Pick" },
            { vendor: "Ascension Peptides", price_usd: 70, vial_mg: 10, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
            { vendor: "Limitless Life", price_usd: 49, vial_mg: 5, inStock: true, affiliateUrl: "https://limitlesslifenootropics.com?ref=PeptiDex" },
            { vendor: "Core Peptides", price_usd: 52, vial_mg: 5, inStock: true, affiliateUrl: "https://corepeptides.com?ref=PeptiDex" },
            { vendor: "Amino Asylum", price_usd: 44, vial_mg: 5, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex" },
            { vendor: "Pure Lab Peptides", price_usd: 89.99, vial_mg: 10, inStock: true, affiliateUrl: "https://purelabpeptides.com/?ref=PeptiDex" },
            { vendor: "Swiss Chems", price_usd: 55, vial_mg: 5, inStock: true, affiliateUrl: "https://swisschems.is?ref=PeptiDex", badge: "Best for Intl" },
        ],
    },
    {
        slug: "tb-500", name: "TB-500",
        vendors: [
            { vendor: "Amino Club", price_usd: 39.99, vial_mg: 10, inStock: true, affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX", badge: "Editor's Pick" },
            { vendor: "Ascension Peptides", price_usd: 45, vial_mg: 5, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
            { vendor: "Limitless Life", price_usd: 62, vial_mg: 5, inStock: true, affiliateUrl: "https://limitlesslifenootropics.com?ref=PeptiDex" },
            { vendor: "Core Peptides", price_usd: 68, vial_mg: 5, inStock: true, affiliateUrl: "https://corepeptides.com?ref=PeptiDex" },
            { vendor: "Amino Asylum", price_usd: 58, vial_mg: 5, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex", badge: "Best Price" },
            { vendor: "Pure Lab Peptides", price_usd: 139.99, vial_mg: 10, inStock: true, affiliateUrl: "https://purelabpeptides.com/?ref=PeptiDex" },
            { vendor: "Swiss Chems", price_usd: 72, vial_mg: 5, inStock: true, affiliateUrl: "https://swisschems.is?ref=PeptiDex", badge: "Best for Intl" },
        ],
    },
    {
        slug: "cjc-1295", name: "CJC-1295",
        vendors: [
            { vendor: "Amino Club", price_usd: 59.99, vial_mg: 10, inStock: true, affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX", badge: "Editor's Pick" },
            { vendor: "Core Peptides", price_usd: 42, vial_mg: 2, inStock: true, affiliateUrl: "https://corepeptides.com?ref=PeptiDex", badge: "Best Price" },
            { vendor: "Amino Asylum", price_usd: 45, vial_mg: 2, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex" },
            { vendor: "Swiss Chems", price_usd: 48, vial_mg: 2, inStock: true, affiliateUrl: "https://swisschems.is?ref=PeptiDex", badge: "Best for Intl" },
        ],
    },
    {
        slug: "ipamorelin", name: "Ipamorelin",
        vendors: [
            { vendor: "Amino Club", price_usd: 59.99, vial_mg: 10, inStock: true, affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX", badge: "Editor's Pick" },
            { vendor: "Ascension Peptides", price_usd: 50, vial_mg: 5, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
            { vendor: "Core Peptides", price_usd: 44, vial_mg: 5, inStock: true, affiliateUrl: "https://corepeptides.com?ref=PeptiDex", badge: "Best Price" },
            { vendor: "Amino Asylum", price_usd: 46, vial_mg: 5, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex" },
            { vendor: "Pure Lab Peptides", price_usd: 59.99, vial_mg: 10, inStock: true, affiliateUrl: "https://purelabpeptides.com/?ref=PeptiDex" },
            { vendor: "Swiss Chems", price_usd: 50, vial_mg: 5, inStock: true, affiliateUrl: "https://swisschems.is?ref=PeptiDex", badge: "Best for Intl" },
        ],
    },
    {
        slug: "semax", name: "Semax",
        vendors: [
            { vendor: "Amino Club", price_usd: 29.99, vial_mg: 10, inStock: true, affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX", badge: "Editor's Pick" },
            { vendor: "Ascension Peptides", price_usd: 55, vial_mg: 10, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
            { vendor: "Limitless Life", price_usd: 72, vial_mg: 30, inStock: true, affiliateUrl: "https://limitlesslifenootropics.com?ref=PeptiDex" },
            { vendor: "Swiss Chems", price_usd: 78, vial_mg: 30, inStock: true, affiliateUrl: "https://swisschems.is?ref=PeptiDex", badge: "Best for Intl" },
            { vendor: "Amino Asylum", price_usd: 68, vial_mg: 30, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex" },
        ],
    },
    {
        slug: "selank", name: "Selank",
        vendors: [
            { vendor: "Amino Club", price_usd: 29.99, vial_mg: 10, inStock: true, affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX", badge: "Editor's Pick" },
            { vendor: "Ascension Peptides", price_usd: 55, vial_mg: 10, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
            { vendor: "Limitless Life", price_usd: 72, vial_mg: 30, inStock: true, affiliateUrl: "https://limitlesslifenootropics.com?ref=PeptiDex" },
            { vendor: "Swiss Chems", price_usd: 78, vial_mg: 30, inStock: true, affiliateUrl: "https://swisschems.is?ref=PeptiDex", badge: "Best for Intl" },
            { vendor: "Amino Asylum", price_usd: 68, vial_mg: 30, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex" },
        ],
    },
    {
        slug: "ghk-cu", name: "GHK-Cu",
        vendors: [
            { vendor: "Amino Club", price_usd: 29.99, vial_mg: 50, inStock: true, affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX", badge: "Editor's Pick" },
            { vendor: "Ascension Peptides", price_usd: 50, vial_mg: 100, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
            { vendor: "Limitless Life", price_usd: 52, vial_mg: 50, inStock: true, affiliateUrl: "https://limitlesslifenootropics.com?ref=PeptiDex" },
            { vendor: "Amino Asylum", price_usd: 48, vial_mg: 50, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex", badge: "Best Price" },
            { vendor: "Swiss Chems", price_usd: 58, vial_mg: 50, inStock: true, affiliateUrl: "https://swisschems.is?ref=PeptiDex", badge: "Best for Intl" },
        ],
    },
    {
        slug: "tesamorelin", name: "Tesamorelin",
        vendors: [
            { vendor: "Amino Club", price_usd: 69.99, vial_mg: 10, inStock: true, affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX", badge: "Editor's Pick" },
            { vendor: "Ascension Peptides", price_usd: 80, vial_mg: 5, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
            { vendor: "Core Peptides", price_usd: 75, vial_mg: 2, inStock: true, affiliateUrl: "https://corepeptides.com?ref=PeptiDex", badge: "Best Price" },
            { vendor: "Amino Asylum", price_usd: 82, vial_mg: 2, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex" },
            { vendor: "Pure Lab Peptides", price_usd: 129.99, vial_mg: 10, inStock: true, affiliateUrl: "https://purelabpeptides.com/?ref=PeptiDex" },
        ],
    },
    {
        slug: "aod-9604", name: "AOD-9604",
        vendors: [
            { vendor: "Amino Club", price_usd: 49.99, vial_mg: 5, inStock: true, affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX", badge: "Editor's Pick" },
            { vendor: "Ascension Peptides", price_usd: 59.99, vial_mg: 5, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
            { vendor: "Amino Asylum", price_usd: 48, vial_mg: 5, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex", badge: "Best Price" },
            { vendor: "Core Peptides", price_usd: 52, vial_mg: 5, inStock: true, affiliateUrl: "https://corepeptides.com?ref=PeptiDex" },
            { vendor: "Pure Lab Peptides", price_usd: 89.99, vial_mg: 10, inStock: true, affiliateUrl: "https://purelabpeptides.com/?ref=PeptiDex" },
            { vendor: "Swiss Chems", price_usd: 55, vial_mg: 5, inStock: true, affiliateUrl: "https://swisschems.is?ref=PeptiDex", badge: "Best for Intl" },
        ],
    },
    {
        slug: "mots-c", name: "MOTS-c",
        vendors: [
            { vendor: "Amino Club", price_usd: 39.99, vial_mg: 10, inStock: true, affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX", badge: "Editor's Pick" },
            { vendor: "Ascension Peptides", price_usd: 75, vial_mg: 10, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
            { vendor: "Limitless Life", price_usd: 78, vial_mg: 10, inStock: true, affiliateUrl: "https://limitlesslifenootropics.com?ref=PeptiDex" },
            { vendor: "Core Peptides", price_usd: 82, vial_mg: 10, inStock: true, affiliateUrl: "https://corepeptides.com?ref=PeptiDex" },
        ],
    },
    {
        slug: "epitalon", name: "Epitalon",
        vendors: [
            { vendor: "Limitless Life", price_usd: 58, vial_mg: 10, inStock: true, affiliateUrl: "https://limitlesslifenootropics.com?ref=PeptiDex", badge: "Editor's Pick" },
            { vendor: "Ascension Peptides", price_usd: 69.99, vial_mg: 10, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
            { vendor: "Swiss Chems", price_usd: 62, vial_mg: 10, inStock: true, affiliateUrl: "https://swisschems.is?ref=PeptiDex", badge: "Best for Intl" },
            { vendor: "Amino Asylum", price_usd: 55, vial_mg: 10, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex", badge: "Best Price" },
        ],
    },
    {
        slug: "thymosin-alpha-1", name: "Thymosin Alpha-1",
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 78, vial_mg: 10, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
            { vendor: "Limitless Life", price_usd: 82, vial_mg: 5, inStock: true, affiliateUrl: "https://limitlesslifenootropics.com?ref=PeptiDex", badge: "Editor's Pick" },
            { vendor: "Core Peptides", price_usd: 88, vial_mg: 5, inStock: true, affiliateUrl: "https://corepeptides.com?ref=PeptiDex" },
        ],
    },
    {
        slug: "melanotan-ii", name: "Melanotan II",
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 40, vial_mg: 10, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/", badge: "Best Price" },
            { vendor: "Amino Asylum", price_usd: 42, vial_mg: 10, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex" },
            { vendor: "Swiss Chems", price_usd: 48, vial_mg: 10, inStock: true, affiliateUrl: "https://swisschems.is?ref=PeptiDex", badge: "Best for Intl" },
        ],
    },
    {
        slug: "pt-141", name: "PT-141",
        vendors: [
            { vendor: "Pure Lab Peptides", price_usd: 44.99, vial_mg: 10, inStock: true, affiliateUrl: "https://purelabpeptides.com/?ref=PeptiDex", badge: "Best Price" },
            { vendor: "Ascension Peptides", price_usd: 45, vial_mg: 10, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
            { vendor: "Amino Asylum", price_usd: 52, vial_mg: 10, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex" },
            { vendor: "Swiss Chems", price_usd: 58, vial_mg: 10, inStock: true, affiliateUrl: "https://swisschems.is?ref=PeptiDex", badge: "Best for Intl" },
        ],
    },
    {
        slug: "dsip", name: "DSIP",
        vendors: [
            { vendor: "Amino Club", price_usd: 29.99, vial_mg: 5, inStock: true, affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX", badge: "Editor's Pick" },
            { vendor: "Ascension Peptides", price_usd: 75, vial_mg: 10, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
            { vendor: "Amino Asylum", price_usd: 55, vial_mg: 5, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex" },
            { vendor: "Swiss Chems", price_usd: 62, vial_mg: 5, inStock: true, affiliateUrl: "https://swisschems.is?ref=PeptiDex", badge: "Best for Intl" },
        ],
    },
    {
        slug: "retatrutide", name: "Retatrutide",
        vendors: [
            { vendor: "Amino Club", price_usd: 69.99, vial_mg: 10, inStock: true, affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX", badge: "Editor's Pick" },
            { vendor: "Core Peptides", price_usd: 165, vial_mg: 10, inStock: true, affiliateUrl: "https://corepeptides.com?ref=PeptiDex" },
            { vendor: "Amino Asylum", price_usd: 178, vial_mg: 10, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex" },
        ],
    },
    {
        slug: "tirzepatide", name: "Tirzepatide",
        vendors: [
            { vendor: "Core Peptides", price_usd: 125, vial_mg: 10, inStock: true, affiliateUrl: "https://corepeptides.com?ref=PeptiDex", badge: "Best Price" },
            { vendor: "Amino Asylum", price_usd: 135, vial_mg: 10, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex" },
        ],
    },
    {
        slug: "semaglutide", name: "Semaglutide",
        vendors: [
            { vendor: "Core Peptides", price_usd: 110, vial_mg: 5, inStock: true, affiliateUrl: "https://corepeptides.com?ref=PeptiDex", badge: "Best Price" },
            { vendor: "Amino Asylum", price_usd: 118, vial_mg: 5, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex" },
        ],
    },
    {
        slug: "sermorelin", name: "Sermorelin",
        vendors: [
            { vendor: "Core Peptides", price_usd: 36, vial_mg: 2, inStock: true, affiliateUrl: "https://corepeptides.com?ref=PeptiDex", badge: "Best Price" },
            { vendor: "Amino Asylum", price_usd: 40, vial_mg: 2, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex" },
            { vendor: "Ascension Peptides", price_usd: 85, vial_mg: 10, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
        ],
    },
    {
        slug: "kpv", name: "KPV",
        vendors: [
            { vendor: "Amino Club", price_usd: 39.99, vial_mg: 10, inStock: true, affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX", badge: "Editor's Pick" },
            { vendor: "Ascension Peptides", price_usd: 79.99, vial_mg: 10, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
            { vendor: "Limitless Life", price_usd: 62, vial_mg: 5, inStock: true, affiliateUrl: "https://limitlesslifenootropics.com?ref=PeptiDex" },
            { vendor: "Core Peptides", price_usd: 68, vial_mg: 5, inStock: true, affiliateUrl: "https://corepeptides.com?ref=PeptiDex" },
        ],
    },
    {
        slug: "ss-31", name: "SS-31",
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 75, vial_mg: 10, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
            { vendor: "Limitless Life", price_usd: 98, vial_mg: 10, inStock: true, affiliateUrl: "https://limitlesslifenootropics.com?ref=PeptiDex", badge: "Editor's Pick" },
        ],
    },

    {
        slug: "follistatin-344", name: "Follistatin-344",
        vendors: [
            { vendor: "Core Peptides", price_usd: 118, vial_mg: 1, inStock: true, affiliateUrl: "https://corepeptides.com?ref=PeptiDex", badge: "Best Price" },
        ],
    },
    {
        slug: "igf-1-lr3", name: "IGF-1 LR3",
        vendors: [
            { vendor: "Core Peptides", price_usd: 105, vial_mg: 1, inStock: true, affiliateUrl: "https://corepeptides.com?ref=PeptiDex", badge: "Best Price" },
            { vendor: "Amino Asylum", price_usd: 112, vial_mg: 1, inStock: true, affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex" },
        ],
    },
    {
        slug: "nad-", name: "NAD+",
        vendors: [
            { vendor: "Ascension Peptides", price_usd: 58, vial_mg: 500, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/", badge: "Best Price" },
            { vendor: "Amino Club", price_usd: 69.99, vial_mg: 500, inStock: true, affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX", badge: "Editor's Pick" },
            { vendor: "Pure Lab Peptides", price_usd: 279.99, vial_mg: 1000, inStock: true, affiliateUrl: "https://purelabpeptides.com/?ref=PeptiDex" },
        ],
    },
    {
        slug: "glutathione", name: "Glutathione",
        vendors: [
            { vendor: "Amino Club", price_usd: 59.99, vial_mg: 1500, inStock: true, affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX", badge: "Editor's Pick" },
            { vendor: "Ascension Peptides", price_usd: 149.99, vial_mg: 1500, inStock: true, affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" },
        ],
    },
    {
        slug: "cagrilintide", name: "Cagrilintide",
        vendors: [
            { vendor: "Amino Club", price_usd: 69.99, vial_mg: 10, inStock: true, affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX", badge: "Editor's Pick" },
        ],
    },
];

export function getVendorPricing(slugOrName: string): PeptideVendorPricing | undefined {
    const normalized = slugOrName.toLowerCase();
    return vendorPricing.find(
        v => v.slug === normalized || v.name.toLowerCase() === normalized
    );
}
