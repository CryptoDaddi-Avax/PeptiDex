/**
 * COA Crawler — Shared Types
 */

export interface RawCoaEntry {
    peptideSlug: string;
    sourceUrl: string;
    pdfUrl?: string;
    pdfHash?: string;
    purity?: number;
    batchId?: string;
    testDate?: string;
    labName?: string;
    molecularWeight?: string;
    methods?: string[];
}

export interface VendorCoaAdapter {
    vendorSlug: string;
    vendorName: string;
    discover(): Promise<RawCoaEntry[]>;
}

export interface CrawlResult {
    vendorSlug: string;
    found: number;
    newInserts: number;
    errors: string[];
}

export interface CoaRecord {
    id: string;
    vendor_slug: string;
    peptide_slug: string;
    batch_id: string | null;
    test_date: string | null;
    purity_pct: number | null;
    molecular_weight: string | null;
    lab_name: string | null;
    lab_tier: string | null;
    test_methods: string[];
    source_url: string;
    source_type: string;
    pdf_hash: string | null;
    raw_extracted: Record<string, unknown> | null;
    flagged: boolean;
    flag_reason: string | null;
    crawl_run_id: string | null;
    created_at: string;
}
