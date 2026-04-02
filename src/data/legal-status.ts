export type LegalStatus = "approved" | "prescription" | "research-only" | "banned" | "unregulated" | "investigational";

export interface CountryStatus {
    country: string;
    flag: string;
    status: LegalStatus;
    notes?: string;
}

export interface PeptideLegalInfo {
    peptide_name: string;
    countries: CountryStatus[];
    last_updated: string;
}

export const legalStatusColors: Record<LegalStatus, string> = {
    "approved": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    "prescription": "bg-blue-500/15 text-blue-400 border-blue-500/30",
    "research-only": "bg-amber-500/15 text-amber-400 border-amber-500/30",
    "banned": "bg-red-500/15 text-red-400 border-red-500/30",
    "unregulated": "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
    "investigational": "bg-violet-500/15 text-violet-400 border-violet-500/30",
};

export const legalStatusLabels: Record<LegalStatus, string> = {
    "approved": "FDA/TGA Approved",
    "prescription": "Prescription Only",
    "research-only": "Research Only",
    "banned": "Banned / Restricted",
    "unregulated": "Unregulated",
    "investigational": "Investigational",
};

export const legalData: PeptideLegalInfo[] = [
    {
        peptide_name: "BPC-157", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "research-only", notes: "Not FDA-approved. Classified as a research chemical. FDA has warned against unapproved BPC-157." },
            { country: "Canada", flag: "🇨🇦", status: "research-only" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated" },
            { country: "Australia", flag: "🇦🇺", status: "prescription", notes: "Available through compounding pharmacies with script." },
        ]
    },
    {
        peptide_name: "TB-500", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "research-only" },
            { country: "Canada", flag: "🇨🇦", status: "research-only" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated" },
            { country: "Australia", flag: "🇦🇺", status: "prescription" },
        ]
    },
    {
        peptide_name: "CJC-1295", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "research-only" },
            { country: "Canada", flag: "🇨🇦", status: "research-only" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated" },
            { country: "Australia", flag: "🇦🇺", status: "prescription" },
        ]
    },
    {
        peptide_name: "Ipamorelin", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "research-only" },
            { country: "Canada", flag: "🇨🇦", status: "research-only" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated" },
            { country: "Australia", flag: "🇦🇺", status: "prescription" },
        ]
    },
    {
        peptide_name: "Semaglutide", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "approved", notes: "FDA-approved as Ozempic (diabetes) and Wegovy (obesity). Prescription required." },
            { country: "Canada", flag: "🇨🇦", status: "approved", notes: "Health Canada approved." },
            { country: "UK", flag: "🇬🇧", status: "approved", notes: "MHRA approved. Available as Wegovy." },
            { country: "EU", flag: "🇪🇺", status: "approved", notes: "EMA approved." },
            { country: "Australia", flag: "🇦🇺", status: "approved", notes: "TGA approved." },
        ]
    },
    {
        peptide_name: "Tirzepatide", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "approved", notes: "FDA-approved as Mounjaro (diabetes) and Zepbound (obesity)." },
            { country: "Canada", flag: "🇨🇦", status: "approved" },
            { country: "UK", flag: "🇬🇧", status: "approved", notes: "MHRA approved as Mounjaro." },
            { country: "EU", flag: "🇪🇺", status: "approved", notes: "EMA approved." },
            { country: "Australia", flag: "🇦🇺", status: "approved", notes: "TGA approved." },
        ]
    },
    {
        peptide_name: "PT-141", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "approved", notes: "FDA-approved as Vyleesi for HSDD in premenopausal women." },
            { country: "Canada", flag: "🇨🇦", status: "research-only" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated" },
            { country: "Australia", flag: "🇦🇺", status: "research-only" },
        ]
    },
    {
        peptide_name: "Tesamorelin", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "approved", notes: "FDA-approved as Egrifta for HIV-associated lipodystrophy." },
            { country: "Canada", flag: "🇨🇦", status: "approved" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated" },
            { country: "Australia", flag: "🇦🇺", status: "research-only" },
        ]
    },
    {
        peptide_name: "Thymosin Alpha-1", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "research-only", notes: "Not FDA-approved in US. Available as research chemical." },
            { country: "Canada", flag: "🇨🇦", status: "research-only" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "approved", notes: "Approved in 35+ countries as Zadaxin for hepatitis B/C." },
            { country: "Australia", flag: "🇦🇺", status: "prescription" },
        ]
    },
    {
        peptide_name: "Melanotan II", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "research-only", notes: "FDA warns against use. Not approved." },
            { country: "Canada", flag: "🇨🇦", status: "banned", notes: "Health Canada has issued warnings." },
            { country: "UK", flag: "🇬🇧", status: "banned", notes: "MHRA warns against use." },
            { country: "EU", flag: "🇪🇺", status: "banned", notes: "Multiple EU agencies warn against use." },
            { country: "Australia", flag: "🇦🇺", status: "banned", notes: "TGA has actively warned against Melanotan II." },
        ]
    },
    {
        peptide_name: "Retatrutide", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "investigational", notes: "Phase 3 TRIUMPH trials in progress." },
            { country: "Canada", flag: "🇨🇦", status: "investigational" },
            { country: "UK", flag: "🇬🇧", status: "investigational" },
            { country: "EU", flag: "🇪🇺", status: "investigational" },
            { country: "Australia", flag: "🇦🇺", status: "investigational" },
        ]
    },
    {
        peptide_name: "Semax", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "research-only" },
            { country: "Canada", flag: "🇨🇦", status: "research-only" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated" },
            { country: "Australia", flag: "🇦🇺", status: "research-only" },
        ]
    },
    {
        peptide_name: "Selank", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "research-only" },
            { country: "Canada", flag: "🇨🇦", status: "research-only" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated" },
            { country: "Australia", flag: "🇦🇺", status: "research-only" },
        ]
    },
    {
        peptide_name: "GHK-Cu", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "unregulated", notes: "Sold as cosmetic ingredient. Not regulated as a drug." },
            { country: "Canada", flag: "🇨🇦", status: "unregulated" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated", notes: "Available in cosmetics." },
            { country: "Australia", flag: "🇦🇺", status: "unregulated" },
        ]
    },
    {
        peptide_name: "AOD-9604", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "research-only" },
            { country: "Canada", flag: "🇨🇦", status: "research-only" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated" },
            { country: "Australia", flag: "🇦🇺", status: "approved", notes: "TGA listed as complementary medicine ingredient." },
        ]
    },
    {
        peptide_name: "Epitalon", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "research-only" },
            { country: "Canada", flag: "🇨🇦", status: "research-only" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated" },
            { country: "Australia", flag: "🇦🇺", status: "research-only" },
        ]
    },
    {
        peptide_name: "MOTS-c", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "research-only" },
            { country: "Canada", flag: "🇨🇦", status: "research-only" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated" },
            { country: "Australia", flag: "🇦🇺", status: "research-only" },
        ]
    },
    {
        peptide_name: "DSIP", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "research-only" },
            { country: "Canada", flag: "🇨🇦", status: "research-only" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated" },
            { country: "Australia", flag: "🇦🇺", status: "research-only" },
        ]
    },
    {
        peptide_name: "Sermorelin", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "prescription", notes: "Previously FDA-approved (Geref). Now available through compounding pharmacies." },
            { country: "Canada", flag: "🇨🇦", status: "prescription" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated" },
            { country: "Australia", flag: "🇦🇺", status: "prescription" },
        ]
    },
    {
        peptide_name: "KPV", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "research-only" },
            { country: "Canada", flag: "🇨🇦", status: "research-only" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated" },
            { country: "Australia", flag: "🇦🇺", status: "research-only" },
        ]
    },
    {
        peptide_name: "SS-31", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "investigational", notes: "Fast Track and Orphan Drug designations. Phase 2/3 trials." },
            { country: "Canada", flag: "🇨🇦", status: "investigational" },
            { country: "UK", flag: "🇬🇧", status: "investigational" },
            { country: "EU", flag: "🇪🇺", status: "investigational" },
            { country: "Australia", flag: "🇦🇺", status: "investigational" },
        ]
    },

    {
        peptide_name: "Follistatin-344", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "research-only" },
            { country: "Canada", flag: "🇨🇦", status: "research-only" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated" },
            { country: "Australia", flag: "🇦🇺", status: "research-only" },
        ]
    },
    {
        peptide_name: "IGF-1 LR3", last_updated: "2026-01", countries: [
            { country: "USA", flag: "🇺🇸", status: "research-only" },
            { country: "Canada", flag: "🇨🇦", status: "research-only" },
            { country: "UK", flag: "🇬🇧", status: "unregulated" },
            { country: "EU", flag: "🇪🇺", status: "unregulated" },
            { country: "Australia", flag: "🇦🇺", status: "research-only" },
        ]
    },
];
