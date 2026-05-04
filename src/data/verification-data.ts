/**
 * Verification Data Registry — Single Source of Truth
 * Created: 2026-05-04
 *
 * Centralizes all verification data from three sources:
 *   1. Vendor-supplied COAs
 *   2. Community-submitted COAs
 *   3. Independent testing (Finnrick + our own HPLC program)
 */

// ── Types ────────────────────────────────────────────────────────────────────

export type VerificationSource = "vendor" | "community" | "independent";
export type TestMethod = "HPLC" | "LC-MS" | "Mass Spec" | "Endotoxin" | "Karl Fischer" | "Heavy Metals" | "Residual Solvents";
export type VerificationTier = "gold" | "silver" | "bronze" | "unverified";

export interface COAEntry {
  id: string;
  peptide: string;
  batchId: string;
  testDate: string;
  purity: number;
  molecularWeight?: string;
  methods: TestMethod[];
  source: VerificationSource;
  sourceDetail: string;
  documentUrl?: string;
  annotation?: string;
  annotationReady: boolean;
  passed: boolean;
}

export interface CommunitySubmission {
  id: string;
  submitter: string;
  peptide: string;
  vendorSlug: string;
  submittedDate: string;
  purity?: number;
  notes?: string;
  verified: boolean;
}

export interface IndependentTestSummary {
  source: string;
  sourceUrl: string;
  totalTests: number;
  passedTests: number;
  averagePurity?: number;
  lastTestDate?: string;
  vendorScore?: string;
  attributionText: string;
  isOwnData: boolean;
}

export interface VendorVerification {
  vendorSlug: string;
  vendorName: string;
  tier: VerificationTier;
  vendorCOAs: COAEntry[];
  communitySubmissions: CommunitySubmission[];
  independentTests: IndependentTestSummary[];
  stats: {
    totalDocuments: number;
    totalIndependentTests: number;
    overallPassRate: number | null;
    averagePurity: number | null;
    lastUpdated: string;
  };
}

// ── Data ─────────────────────────────────────────────────────────────────────

const FINNRICK_ATTRIBUTION = "Source: Finnrick Independent Testing Database. PeptiDex has no editorial control over Finnrick data. View full results at finnrick.com.";

export const vendorVerifications: VendorVerification[] = [
  {
    vendorSlug: "amino-club", vendorName: "Amino Club", tier: "gold",
    vendorCOAs: [
      { id: "ac-bpc157-2604", peptide: "BPC-157", batchId: "2604-AC-BPC", testDate: "2026-04-10", purity: 99.4, molecularWeight: "1419.5 Da", methods: ["HPLC", "Mass Spec", "Endotoxin"], source: "vendor", sourceDetail: "Amino Club", documentUrl: "https://aminoclub.com/coa/bpc-157-latest.pdf", annotation: "MW confirmed at 1419.5 Da. HPLC purity ≥99.4%. Endotoxin below 1.0 EU/mg. No anomalous peaks in 1350–1500 Da range.", annotationReady: true, passed: true },
      { id: "ac-reta-2604", peptide: "Retatrutide", batchId: "2604-AC-RETA", testDate: "2026-04-15", purity: 99.1, molecularWeight: "4731.4 Da", methods: ["HPLC", "Mass Spec", "Endotoxin"], source: "vendor", sourceDetail: "Amino Club", annotation: "Triple-agonist. MW cross-referenced against Eli Lilly Phase 2 data. HPLC 99.1%, single dominant peak.", annotationReady: true, passed: true },
      { id: "ac-tirz-2604", peptide: "Tirzepatide", batchId: "2604-AC-TIRZ", testDate: "2026-04-12", purity: 99.3, molecularWeight: "4813.5 Da", methods: ["HPLC", "LC-MS", "Endotoxin"], source: "vendor", sourceDetail: "Amino Club", annotation: "Dual GIP/GLP-1 agonist. MW 4813.5 Da confirmed. Single-peak HPLC elution.", annotationReady: true, passed: true },
      { id: "ac-sema-2603", peptide: "Semaglutide", batchId: "2603-AC-SEMA", testDate: "2026-03-20", purity: 98.9, molecularWeight: "4113.6 Da", methods: ["HPLC", "LC-MS", "Endotoxin"], source: "vendor", sourceDetail: "Amino Club", annotation: "GLP-1 agonist. MW confirmed. C18 fatty diacid modification intact per MS.", annotationReady: true, passed: true },
      { id: "ac-ipa-2604", peptide: "Ipamorelin", batchId: "2604-AC-IPA", testDate: "2026-04-08", purity: 99.5, molecularWeight: "711.9 Da", methods: ["HPLC", "Mass Spec"], source: "vendor", sourceDetail: "Amino Club", annotation: "GH secretagogue pentapeptide. MW 711.9 Da confirmed. Highest purity in dataset.", annotationReady: true, passed: true },
    ],
    communitySubmissions: [
      { id: "cs-ac-001", submitter: "Anonymous Researcher", peptide: "BPC-157", vendorSlug: "amino-club", submittedDate: "2026-04-18", purity: 99.2, notes: "Private lab verification consistent with vendor COA.", verified: false },
      { id: "cs-ac-002", submitter: "Reddit u/peptide_research", peptide: "Tirzepatide", vendorSlug: "amino-club", submittedDate: "2026-04-22", purity: 99.0, notes: "Community-tested batch. Consistent with published COA values.", verified: false },
    ],
    independentTests: [
      { source: "Finnrick", sourceUrl: "https://finnrick.com/vendors/amino-club", totalTests: 47, passedTests: 44, averagePurity: 98.6, lastTestDate: "2026-04-28", vendorScore: "A", attributionText: FINNRICK_ATTRIBUTION, isOwnData: false },
    ],
    stats: { totalDocuments: 7, totalIndependentTests: 47, overallPassRate: 93.6, averagePurity: 98.6, lastUpdated: "2026-05-04" },
  },
  {
    vendorSlug: "bio-longevity-labs", vendorName: "Bio Longevity Labs", tier: "gold",
    vendorCOAs: [
      { id: "bll-tirz-2603", peptide: "Tirzepatide", batchId: "2603-BLL-TIRZ", testDate: "2026-03-22", purity: 99.2, molecularWeight: "4813.5 Da", methods: ["HPLC", "LC-MS", "Endotoxin", "Karl Fischer"], source: "vendor", sourceDetail: "Bio Longevity Labs", annotation: "MW confirmed. Water content <5%. HPLC 99.2%. USP endotoxin criteria met.", annotationReady: true, passed: true },
      { id: "bll-tesa-2603", peptide: "Tesamorelin", batchId: "2603-BLL-TESA", testDate: "2026-03-28", purity: 98.8, molecularWeight: "5135.8 Da", methods: ["HPLC", "LC-MS", "Endotoxin"], source: "vendor", sourceDetail: "Bio Longevity Labs", annotation: "FDA-approved GH-RH analog. MW 5135.8 Da confirmed. Trans-3-hexenoic acid modification confirmed by MS.", annotationReady: true, passed: true },
      { id: "bll-bpc-2604", peptide: "BPC-157", batchId: "2604-BLL-BPC", testDate: "2026-04-05", purity: 99.6, molecularWeight: "1419.5 Da", methods: ["HPLC", "LC-MS", "Endotoxin"], source: "vendor", sourceDetail: "Bio Longevity Labs", annotation: "Triple-tested. Highest BPC-157 purity in dataset (99.6%).", annotationReady: true, passed: true },
      { id: "bll-ghk-2604", peptide: "GHK-Cu", batchId: "2604-BLL-GHK", testDate: "2026-04-10", purity: 99.1, molecularWeight: "340.4 Da", methods: ["HPLC", "Mass Spec"], source: "vendor", sourceDetail: "Bio Longevity Labs", annotation: "Copper-peptide tripeptide. MW 340.4 Da confirmed.", annotationReady: true, passed: true },
    ],
    communitySubmissions: [
      { id: "cs-bll-001", submitter: "Anonymous Researcher", peptide: "Tirzepatide", vendorSlug: "bio-longevity-labs", submittedDate: "2026-04-25", purity: 99.0, notes: "Independent verification consistent with vendor COA.", verified: false },
    ],
    independentTests: [
      { source: "Finnrick", sourceUrl: "https://finnrick.com/vendors/bio-longevity-labs", totalTests: 62, passedTests: 59, averagePurity: 98.9, lastTestDate: "2026-04-30", vendorScore: "A+", attributionText: FINNRICK_ATTRIBUTION, isOwnData: false },
    ],
    stats: { totalDocuments: 5, totalIndependentTests: 62, overallPassRate: 95.2, averagePurity: 98.9, lastUpdated: "2026-05-04" },
  },
  {
    vendorSlug: "limitless-life", vendorName: "Limitless Life", tier: "silver",
    vendorCOAs: [
      { id: "ll-sema-2603", peptide: "Semaglutide", batchId: "2603-LL-SEMA", testDate: "2026-03-15", purity: 99.0, molecularWeight: "4113.6 Da", methods: ["HPLC", "LC-MS", "Endotoxin", "Karl Fischer"], source: "vendor", sourceDetail: "Limitless Life", annotation: "GLP-1 agonist. MW confirmed against Novo Nordisk characterization. Fatty acid modification intact.", annotationReady: true, passed: true },
      { id: "ll-bpc-2604", peptide: "BPC-157", batchId: "2604-LL-BPC", testDate: "2026-04-02", purity: 98.7, molecularWeight: "1419.5 Da", methods: ["HPLC", "Mass Spec"], source: "vendor", sourceDetail: "Limitless Life", annotation: "Purity 98.7% — passes ≥98% threshold. MW confirmed.", annotationReady: true, passed: true },
      { id: "ll-tb500-2604", peptide: "TB-500", batchId: "2604-LL-TB5", testDate: "2026-04-08", purity: 98.5, molecularWeight: "4963.4 Da", methods: ["HPLC", "Mass Spec"], source: "vendor", sourceDetail: "Limitless Life", annotation: "Thymosin Beta-4 fragment. MW confirmed. HPLC 98.5%.", annotationReady: true, passed: true },
    ],
    communitySubmissions: [],
    independentTests: [
      { source: "Finnrick", sourceUrl: "https://finnrick.com/vendors/limitless-life", totalTests: 38, passedTests: 33, averagePurity: 97.8, lastTestDate: "2026-04-22", vendorScore: "B+", attributionText: FINNRICK_ATTRIBUTION, isOwnData: false },
    ],
    stats: { totalDocuments: 3, totalIndependentTests: 38, overallPassRate: 86.8, averagePurity: 97.8, lastUpdated: "2026-05-04" },
  },
  {
    vendorSlug: "ascension-peptides", vendorName: "Ascension Peptides", tier: "silver",
    vendorCOAs: [
      { id: "asc-bpc-2604", peptide: "BPC-157", batchId: "2604-ASC-BPC", testDate: "2026-04-01", purity: 98.9, molecularWeight: "1419.5 Da", methods: ["HPLC", "Mass Spec"], source: "vendor", sourceDetail: "Ascension Peptides", documentUrl: "https://ascensionpeptides.com/coa/bpc157.pdf", annotation: "Two-method verification. MW confirmed. Passes ≥98% threshold.", annotationReady: true, passed: true },
      { id: "asc-ipa-2604", peptide: "Ipamorelin", batchId: "2604-ASC-IPA", testDate: "2026-04-05", purity: 98.4, molecularWeight: "711.9 Da", methods: ["HPLC", "Mass Spec"], source: "vendor", sourceDetail: "Ascension Peptides", annotation: "GH secretagogue. MW confirmed. Purity 98.4%.", annotationReady: true, passed: true },
    ],
    communitySubmissions: [],
    independentTests: [
      { source: "Finnrick", sourceUrl: "https://finnrick.com/vendors/ascension-peptides", totalTests: 24, passedTests: 20, averagePurity: 97.4, lastTestDate: "2026-04-18", vendorScore: "B", attributionText: FINNRICK_ATTRIBUTION, isOwnData: false },
    ],
    stats: { totalDocuments: 2, totalIndependentTests: 24, overallPassRate: 83.3, averagePurity: 97.4, lastUpdated: "2026-05-04" },
  },
  {
    vendorSlug: "pantheon-peptides", vendorName: "Pantheon Peptides", tier: "bronze",
    vendorCOAs: [
      { id: "pan-bpc-2604", peptide: "BPC-157", batchId: "2604-PAN-BPC", testDate: "2026-04-10", purity: 98.2, molecularWeight: "1419.5 Da", methods: ["HPLC", "Mass Spec"], source: "vendor", sourceDetail: "Pantheon Peptides", annotation: "MW confirmed. Purity 98.2% — narrowly passes threshold.", annotationReady: true, passed: true },
    ],
    communitySubmissions: [],
    independentTests: [
      { source: "Finnrick", sourceUrl: "https://finnrick.com/vendors/pantheon-peptides", totalTests: 12, passedTests: 9, averagePurity: 96.8, lastTestDate: "2026-04-10", vendorScore: "B-", attributionText: FINNRICK_ATTRIBUTION, isOwnData: false },
    ],
    stats: { totalDocuments: 1, totalIndependentTests: 12, overallPassRate: 75.0, averagePurity: 96.8, lastUpdated: "2026-05-04" },
  },
  {
    vendorSlug: "lvlup-health", vendorName: "LVLUP Health", tier: "bronze",
    vendorCOAs: [
      { id: "lv-bpc-oral-2604", peptide: "BPC-157 (Oral)", batchId: "2604-LV-BPCO", testDate: "2026-04-05", purity: 97.8, molecularWeight: "1419.5 Da", methods: ["HPLC", "Mass Spec"], source: "vendor", sourceDetail: "LVLUP Health", annotation: "Oral formulation. Slightly lower HPLC purity due to excipient matrix. MW confirmed.", annotationReady: true, passed: false },
    ],
    communitySubmissions: [],
    independentTests: [
      { source: "Finnrick", sourceUrl: "https://finnrick.com/vendors/lvlup-health", totalTests: 8, passedTests: 5, averagePurity: 96.2, lastTestDate: "2026-03-28", vendorScore: "C+", attributionText: FINNRICK_ATTRIBUTION, isOwnData: false },
    ],
    stats: { totalDocuments: 1, totalIndependentTests: 8, overallPassRate: 62.5, averagePurity: 96.2, lastUpdated: "2026-05-04" },
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export const verificationBySlug: Record<string, VendorVerification> = Object.fromEntries(
  vendorVerifications.map(v => [v.vendorSlug, v])
);

export function getTierLabel(tier: VerificationTier): string {
  const labels: Record<VerificationTier, string> = { gold: "Extensively Verified", silver: "Verified", bronze: "Partially Verified", unverified: "Insufficient Data" };
  return labels[tier];
}

export function getTierColor(tier: VerificationTier): string {
  const colors: Record<VerificationTier, string> = { gold: "#c9a961", silver: "#a8a196", bronze: "#d4832a", unverified: "#6b6860" };
  return colors[tier];
}

export function getGlobalStats() {
  const totalVendors = vendorVerifications.length;
  const totalCOAs = vendorVerifications.reduce((s, v) => s + v.vendorCOAs.length, 0);
  const totalCommunity = vendorVerifications.reduce((s, v) => s + v.communitySubmissions.length, 0);
  const totalIndependent = vendorVerifications.reduce((s, v) => s + v.stats.totalIndependentTests, 0);
  return { totalVendors, totalCOAs, totalCommunity, totalIndependent, totalDocuments: totalCOAs + totalCommunity, totalDataPoints: totalCOAs + totalCommunity + totalIndependent };
}
