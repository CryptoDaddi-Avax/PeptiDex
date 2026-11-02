/**
 * @deprecated — Will be consolidated into /data/vendors.ts pricing module.
 * This file is preserved for backward compatibility. Migration date: 2026-04-30
 */

export interface VendorPrice {
    vendor: string;
    price_usd: number;
    vial_mg: number;
    inStock: boolean;
    affiliateUrl: string;
    badge?: "Best Price" | "Editor's Pick" | "Best for Intl" | "Triple-Tested";
    coaUrl?: string; 
    lastTestedDate?: string; 
}

export interface PeptideVendorPricing {
    slug: string;
    name: string;
    vendors: VendorPrice[];
}

/**
 * Date the prices in vendorPricing were last checked against the vendors'
 * sites (YYYY-MM-DD). Rendered as "Prices checked: <date>" on /tools/pricing
 * and /peptides/[slug]/at/[vendor]. Update it whenever prices are re-verified.
 */
export const PRICES_LAST_CHECKED = "2026-05-09";

export const PRICES_LAST_CHECKED_LABEL = new Date(`${PRICES_LAST_CHECKED}T00:00:00Z`).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }
);

export const vendorPricing: PeptideVendorPricing[] = 
[
    {
        "slug": "bpc-157",
        "name": "BPC-157",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 39.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX",
                "badge": "Editor's Pick",
                "coaUrl": "https://aminoclub.com/coa/bpc-157-latest.pdf",
                "lastTestedDate": "2026-04-10"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 49.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/",
                "lastTestedDate": "2026-04-01"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 99.97,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "tb-500",
        "name": "TB-500",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 39.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 44.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/",
                "lastTestedDate": "2026-04-01"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 164.97,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "cjc-1295",
        "name": "CJC-1295",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 59.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            }
        ]
    },
    {
        "slug": "ipamorelin",
        "name": "Ipamorelin",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 59.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 54.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/",
                "lastTestedDate": "2026-04-01"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 79.97,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "semax",
        "name": "Semax",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 29.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 44.99,
                "vial_mg": 30,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/",
                "lastTestedDate": "2026-04-01"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 64.97,
                "vial_mg": 20,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "badge": "Triple-Tested",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "selank",
        "name": "Selank",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 29.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 44.99,
                "vial_mg": 30,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/",
                "lastTestedDate": "2026-04-01"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 134.97,
                "vial_mg": 20,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "badge": "Triple-Tested",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "ghk-cu",
        "name": "GHK-Cu",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 29.99,
                "vial_mg": 50,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 39.99,
                "vial_mg": 50,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/",
                "lastTestedDate": "2026-04-01"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 84.97,
                "vial_mg": 50,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "badge": "Triple-Tested",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "tesamorelin",
        "name": "Tesamorelin",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 69.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 89.98,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "aod-9604",
        "name": "AOD-9604",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 49.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            }
        ]
    },
    {
        "slug": "mots-c",
        "name": "MOTS-c",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 39.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 64.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/",
                "lastTestedDate": "2026-04-01"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 65.98,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "badge": "Triple-Tested",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "epitalon",
        "name": "Epitalon",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 56.98,
                "vial_mg": 20,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "thymosin-alpha-1",
        "name": "Thymosin Alpha-1",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 129.97,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "melanotan-ii",
        "name": "Melanotan II",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 55.97,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/melanotan-1-10mg/",
                "badge": "Triple-Tested"
            }
        ]
    },
    {
        "slug": "pt-141",
        "name": "PT-141",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 47.97,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/pt141-5mg/",
                "badge": "Triple-Tested"
            }
        ]
    },
    {
        "slug": "dsip",
        "name": "DSIP",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 29.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 55.97,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/dsip-5mg/",
                "badge": "Triple-Tested"
            }
        ]
    },
    {
        "slug": "sermorelin",
        "name": "Sermorelin",
        "vendors": [
        ]
    },
    {
        "slug": "kpv",
        "name": "KPV",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 39.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 54.99,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/",
                "lastTestedDate": "2026-04-01"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 99.97,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/kpv-10mg/",
                "badge": "Triple-Tested"
            }
        ]
    },
    {
        "slug": "ss-31",
        "name": "SS-31",
        "vendors": [
        ]
    },
    {
        "slug": "follistatin-344",
        "name": "Follistatin-344",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 499,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://biolongevitylabs.com/product/follistatin/",
                "badge": "Triple-Tested"
            }
        ]
    },
    {
        "slug": "igf-1-lr3",
        "name": "IGF-1 LR3",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 69.99,
                "vial_mg": 1,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX"
            }
        ]
    },
    {
        "slug": "nad",
        "name": "NAD+",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 69.99,
                "vial_mg": 500,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            },
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 174.98,
                "vial_mg": 500,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "lastTestedDate": "2026-04-20"
            }
        ]
    },
    {
        "slug": "glutathione",
        "name": "Glutathione",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 59.99,
                "vial_mg": 1500,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX",
                "badge": "Editor's Pick"
            }
        ]
    },
    {
        "slug": "ghrp-2",
        "name": "GHRP-2",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 86.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 97,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "ghrp-6",
        "name": "GHRP-6",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 54.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 65,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "hexarelin",
        "name": "Hexarelin",
        "vendors": [
            {
                "vendor": "Amino Club",
                "price_usd": 55.99,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=vendor_pricing&code=PEPTIDEX"
            },
            {
                "vendor": "Limitless Life",
                "price_usd": 66,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://www.kb6dp3dq.com/PEPTIDEX/"
            }
        ]
    },
    {
        "slug": "kisspeptin-10",
        "name": "Kisspeptin-10",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 64.97,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "badge": "Triple-Tested",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "ll-37",
        "name": "LL-37",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 94.97,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "badge": "Triple-Tested",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "mk-677",
        "name": "MK-677",
        "vendors": [
            // Prices pending verification
        ]
    },
    // NAD+ pricing lives in the "nad" entry above
    {
        "slug": "argireline",
        "name": "Argireline",
        "vendors": [
            // Prices pending verification
        ]
    },
    {
        "slug": "5-amino-1mq",
        "name": "5-Amino-1MQ",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 74.97,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "badge": "Triple-Tested",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "ara-290",
        "name": "ARA-290",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 95.00,
                "vial_mg": 15,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "badge": "Triple-Tested",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "gonadorelin",
        "name": "Gonadorelin",
        "vendors": [
            // Prices pending verification
        ]
    },
    {
        "slug": "larazotide",
        "name": "Larazotide",
        "vendors": [
            // Prices pending verification
        ]
    },
    {
        "slug": "vip",
        "name": "VIP",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 74.97,
                "vial_mg": 5,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "badge": "Triple-Tested",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "oxytocin",
        "name": "Oxytocin",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 64.97,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "badge": "Triple-Tested",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "thymalin",
        "name": "Thymalin",
        "vendors": [
            // Prices pending verification
        ]
    },
    {
        "slug": "humanin",
        "name": "Humanin",
        "vendors": [
            // Prices pending verification
        ]
    },
    {
        "slug": "pe-22-28",
        "name": "PE-22-28",
        "vendors": [
            // Prices pending verification
        ]
    },
    {
        "slug": "pinealon",
        "name": "Pinealon",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 69.97,
                "vial_mg": 20,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "badge": "Triple-Tested",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "cortagen",
        "name": "Cortagen",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 69.97,
                "vial_mg": 20,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "badge": "Triple-Tested",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "dihexa",
        "name": "Dihexa",
        "vendors": [
            // Prices pending verification
        ]
    },
    {
        "slug": "foxo4-dri",
        "name": "FOXO4-DRI",
        "vendors": [
            {
                "vendor": "Bio Longevity Labs",
                "price_usd": 274.97,
                "vial_mg": 10,
                "inStock": true,
                "affiliateUrl": "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
                "badge": "Triple-Tested",
                "lastTestedDate": "2026-05-08"
            }
        ]
    },
    {
        "slug": "klotho",
        "name": "Klotho",
        "vendors": [
            // Prices pending verification
        ]
    },
    {
        "slug": "os-01",
        "name": "OS-01",
        "vendors": [
            // Prices pending verification
        ]
    },
    {
        "slug": "synapsin",
        "name": "Synapsin",
        "vendors": [
            // Prices pending verification
        ]
    },
    {
        "slug": "fgl-loop",
        "name": "FGL Loop",
        "vendors": [
            // Prices pending verification
        ]
    }
];

export function getVendorPricing(slugOrName: string): PeptideVendorPricing | undefined {
    const normalized = slugOrName.toLowerCase();
    return vendorPricing.find(
        v => v.slug === normalized || v.name.toLowerCase() === normalized
    );
}

