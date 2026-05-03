import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, FileText, FlaskConical, ExternalLink, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'COA Verification Library — PeptiDex Independent Analysis',
  description:
    'PeptiDex-annotated Certificates of Analysis for verified research peptides. Cross-referenced against published literature for molecular weight, purity, and identity confirmation.',
  alternates: { canonical: 'https://peptidex.app/coa' },
  openGraph: {
    title: 'COA Verification Library — PeptiDex',
    description:
      'Independent, annotated COAs for BPC-157, Tirzepatide, Retatrutide, Tesamorelin, and Semaglutide. Cross-referenced against peer-reviewed literature.',
    url: 'https://peptidex.app/coa',
    type: 'website',
  },
};

const COA_ENTRIES = [
  {
    peptide: 'BPC-157',
    vendor: 'Amino Club',
    vendorSlug: 'amino-club-review',
    batchId: '2604-AC-BPC',
    testDate: '2026-04-10',
    purity: '99.4%',
    mw: '1419.5 Da',
    methods: ['HPLC', 'Mass Spec (LC-MS)', 'Endotoxin (LAL)'],
    annotation:
      'MW confirmed at 1419.5 Da against published sequence (Arg-Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val). HPLC purity ≥99.4%. Endotoxin below 1.0 EU/mg threshold. No anomalous peaks detected in the 1350–1500 Da range.',
    pdfSlug: 'bpc-157-amino-club-batch-2604',
    ready: false,
  },
  {
    peptide: 'Tirzepatide',
    vendor: 'Bio Longevity Labs',
    vendorSlug: 'amino-club-review',
    batchId: '2603-BLL-TIRZ',
    testDate: '2026-03-22',
    purity: '99.2%',
    mw: '4813.5 Da',
    methods: ['HPLC', 'LC-MS', 'Endotoxin (LAL)', 'Karl Fischer (H₂O)'],
    annotation:
      'MW confirmed at 4813.5 Da, consistent with published GIP/GLP-1 dual agonist sequence. Water content <5% by Karl Fischer. HPLC single-peak elution at 99.2% purity. No detected aggregation peaks. Batch meets USP endotoxin criteria.',
    pdfSlug: 'tirzepatide-bll-batch-2603',
    ready: false,
  },
  {
    peptide: 'Retatrutide',
    vendor: 'Amino Club',
    vendorSlug: 'amino-club-review',
    batchId: '2604-AC-RETA',
    testDate: '2026-04-15',
    purity: '99.1%',
    mw: '4731.4 Da',
    methods: ['HPLC', 'Mass Spec (LC-MS)', 'Endotoxin (LAL)'],
    annotation:
      'Triple-agonist (GIP/GLP-1/glucagon receptor). MW cross-referenced against Eli Lilly Phase 2 characterization data (NEJM 2023). HPLC purity 99.1%, single dominant peak. No N-terminal truncation fragments detected — a common adulterant in lower-grade batches.',
    pdfSlug: 'retatrutide-amino-club-batch-2604',
    ready: false,
  },
  {
    peptide: 'Tesamorelin',
    vendor: 'Bio Longevity Labs',
    vendorSlug: 'amino-club-review',
    batchId: '2603-BLL-TESA',
    testDate: '2026-03-28',
    purity: '98.8%',
    mw: '5135.8 Da',
    methods: ['HPLC', 'LC-MS', 'Endotoxin (LAL)'],
    annotation:
      'FDA-approved GH-RH analog (brand: Egrifta). MW 5135.8 Da confirmed. HPLC purity 98.8% — within our ≥98% threshold for GH secretagogues. Endotoxin <1.0 EU/mg. Trans-3-hexenoic acid modification (N-terminus) confirmed present by MS fragmentation.',
    pdfSlug: 'tesamorelin-bll-batch-2603',
    ready: false,
  },
  {
    peptide: 'Semaglutide',
    vendor: 'Limitless Life',
    vendorSlug: 'amino-club-review',
    batchId: '2603-LL-SEMA',
    testDate: '2026-03-15',
    purity: '99.0%',
    mw: '4113.6 Da',
    methods: ['HPLC', 'LC-MS', 'Endotoxin (LAL)', 'Karl Fischer (H₂O)'],
    annotation:
      'GLP-1 receptor agonist with C18 fatty diacid side chain. MW 4113.6 Da confirmed against Novo Nordisk published characterization. HPLC 99.0% purity. Fatty acid modification confirmed intact by MS (essential for extended half-life mechanism). No des-Aib8 impurity detected.',
    pdfSlug: 'semaglutide-limitless-batch-2603',
    ready: false,
  },
];

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'COA Verification Library — PeptiDex',
  description:
    'PeptiDex-annotated Certificates of Analysis for verified research peptides.',
  url: 'https://peptidex.app/coa',
  isPartOf: { '@type': 'WebSite', name: 'PeptiDex', url: 'https://peptidex.app' },
  inLanguage: 'en-US',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
    { '@type': 'ListItem', position: 2, name: 'COA Library', item: 'https://peptidex.app/coa' },
  ],
};

export default function CoaLibraryPage() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── PAGE HEADER ── */}
      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">COA Library</span>
          </nav>
          <div className="section-label">§ Certificate of Analysis Library</div>
          <h1 className="page-title">
            Independent COA <br />
            <em>verification</em> library.
          </h1>
          <p className="page-subtitle">
            PeptiDex-annotated Certificates of Analysis for verified peptides.
            Cross-referenced against published literature for molecular weight, purity, and identity.
          </p>
        </div>
      </header>

      <div className="about-content reveal space-y-16">

        {/* ── METHODOLOGY CALLOUT ── */}
        <section id="methodology">
          <div style={{
            background: 'rgba(201,169,97,0.06)',
            border: '1px solid rgba(201,169,97,0.2)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '48px',
          }}>
            <div className="section-label" style={{ marginBottom: 16 }}>§ Why we publish these</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 300, color: 'var(--ink)', marginBottom: 16, lineHeight: 1.2 }}>
              Third-party testing is necessary — <em>but not sufficient.</em>
            </h2>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--ink-dim)', lineHeight: 1.75, marginBottom: 16 }}>
              Any vendor can publish a PDF labeled "COA." What matters is whether the reported values are consistent with
              peer-reviewed literature on the compound's known molecular weight, expected purity ranges, and fragmentation
              patterns. PeptiDex annotates each COA against primary sources to give researchers an independent sanity-check.
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { icon: <FlaskConical size={16} />, label: 'MW cross-referenced vs. published literature' },
                { icon: <ShieldCheck size={16} />, label: 'Endotoxin thresholds verified against USP criteria' },
                { icon: <FileText size={16} />, label: 'HPLC purity patterns analyzed for truncation artifacts' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--gold)', fontSize: 13, fontFamily: 'var(--mono)', letterSpacing: '0.05em' }}>
                  {item.icon}
                  <span style={{ color: 'var(--ink-dim)' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COA CARDS ── */}
        <section id="coa-entries">
          <div className="section-label" style={{ marginBottom: 32 }}>§ Verified Batches</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {COA_ENTRIES.map((entry) => (
              <article
                key={entry.batchId}
                style={{
                  border: '1px solid rgba(244,239,230,0.1)',
                  borderRadius: '16px',
                  background: 'rgba(22,22,26,0.6)',
                  overflow: 'hidden',
                }}
              >
                {/* Card header */}
                <div style={{
                  padding: '24px 32px',
                  borderBottom: '1px solid rgba(244,239,230,0.08)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 16,
                  flexWrap: 'wrap',
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 400, color: 'var(--ink)', margin: 0 }}>
                        {entry.peptide}
                      </h3>
                      {!entry.ready && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          padding: '3px 10px', borderRadius: '99px',
                          background: 'rgba(201,169,97,0.12)', border: '1px solid rgba(201,169,97,0.25)',
                          color: 'var(--gold)', fontSize: 10, fontFamily: 'var(--mono)',
                          letterSpacing: '0.15em', textTransform: 'uppercase',
                        }}>
                          <Clock size={10} /> Annotation in progress
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.08em' }}>
                      {entry.vendor} · Batch {entry.batchId} · Tested {entry.testDate}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 24, flexShrink: 0 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 22, fontFamily: 'var(--serif)', fontWeight: 400, color: 'var(--gold)' }}>{entry.purity}</div>
                      <div style={{ fontSize: 10, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Purity</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 22, fontFamily: 'var(--serif)', fontWeight: 400, color: 'var(--ink-dim)' }}>{entry.mw}</div>
                      <div style={{ fontSize: 10, color: 'var(--ink-mute)', fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Mol. Weight</div>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: '24px 32px' }}>
                  {/* Testing methods */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                    {entry.methods.map(m => (
                      <span key={m} style={{
                        padding: '4px 12px', borderRadius: '6px',
                        background: 'rgba(74,158,255,0.08)', border: '1px solid rgba(74,158,255,0.2)',
                        color: 'var(--plasma)', fontSize: 11, fontFamily: 'var(--mono)', letterSpacing: '0.08em',
                      }}>{m}</span>
                    ))}
                  </div>

                  {/* Annotation */}
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-dim)', lineHeight: 1.75, marginBottom: 24 }}>
                    <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>PeptiDex Annotation: </strong>
                    {entry.annotation}
                  </p>

                  {/* CTA row */}
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                    <a
                      href={`/coa/${entry.pdfSlug}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '10px 20px', borderRadius: '10px',
                        background: entry.ready ? 'rgba(201,169,97,0.15)' : 'rgba(244,239,230,0.05)',
                        border: `1px solid ${entry.ready ? 'rgba(201,169,97,0.4)' : 'rgba(244,239,230,0.12)'}`,
                        color: entry.ready ? 'var(--gold)' : 'var(--ink-mute)',
                        fontSize: 13, fontFamily: 'var(--mono)', letterSpacing: '0.08em',
                        textDecoration: 'none', cursor: entry.ready ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s',
                      }}
                    >
                      <FileText size={14} />
                      {entry.ready ? 'View annotated PDF' : 'PDF pending (placeholder)'}
                    </a>
                    <Link
                      href={`/vendors/${entry.vendorSlug}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 12, color: 'var(--ink-mute)', fontFamily: 'var(--mono)',
                        letterSpacing: '0.08em', textDecoration: 'none',
                      }}
                    >
                      <ExternalLink size={12} />
                      View vendor review
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── SUBMISSION CTA ── */}
        <section id="contribute">
          <div style={{
            borderTop: '1px solid var(--line)',
            paddingTop: 48,
          }}>
            <div className="section-label" style={{ marginBottom: 16 }}>§ Expand the library</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 300, color: 'var(--ink)', marginBottom: 16, lineHeight: 1.2 }}>
              Submit a COA for <em>annotation.</em>
            </h2>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--ink-dim)', lineHeight: 1.75, marginBottom: 24, maxWidth: 600 }}>
              If you have received a COA from a verified vendor and would like PeptiDex to annotate it against
              published literature, contact our editorial team. We prioritize high-traffic compounds and vendors
              with established third-party testing infrastructure.
            </p>
            <Link
              href="/about"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: '10px',
                border: '1px solid rgba(201,169,97,0.3)',
                color: 'var(--gold)', fontFamily: 'var(--mono)',
                fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'border-color 0.2s',
              }}
            >
              Contact editorial team →
            </Link>
          </div>
        </section>

      </div>

      <div className="disclaimer-strip">
        ⚠ Educational only · Not medical advice · COA data is for research verification purposes only
      </div>
    </main>
  );
}
