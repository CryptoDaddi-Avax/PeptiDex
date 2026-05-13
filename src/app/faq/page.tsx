import type { Metadata } from 'next';
import FaqRedesignClient from './FaqRedesignClient';

export const metadata: Metadata = {
  title: 'Peptide FAQ — Frequently Asked Questions Answered',
  description: 'Honest answers about research peptides, vendor verification, COAs, FDA approval status, and how PeptiDex operates as an independent research index.',
  alternates: {
    canonical: 'https://peptidex.app/faq',
  },
  openGraph: {
    title: 'Peptide FAQ — Frequently Asked Questions Answered',
    description: 'Honest answers about research peptides, vendor verification, COAs, FDA approval status, and how PeptiDex operates as an independent research index.',
    url: 'https://peptidex.app/faq',
    type: 'website',
    images: [{ url: 'https://peptidex.app/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peptide FAQ — Frequently Asked Questions Answered',
    description: 'Honest answers about research peptides, vendor verification, COAs, FDA approval status, and how PeptiDex operates as an independent research index.',
    images: ['https://peptidex.app/og-image.png'],
  },
};

const FAQ_SCHEMA_ITEMS = [
  { q: 'What are research peptides?', a: 'Research peptides are synthetic amino acid chains designed for in-vitro laboratory study. Most are not FDA-approved for human consumption. They are sold by chemical suppliers for educational and research use only.' },
  { q: 'Are these compounds legal?', a: 'In the United States, research peptides exist in a regulatory gray area. They are legal to purchase and possess for research purposes, but it is illegal for vendors to market them for human consumption.' },
  { q: 'How does PeptiDex verify vendors?', a: 'We require independent third-party Certificates of Analysis (COAs) from each vendor batch. We test purity via HPLC and Mass Spectrometry. Vendors are reviewed quarterly.' },
  { q: 'Is PeptiDex a medical authority?', a: 'No. PeptiDex is an independent research index, not a medical practice. Nothing on this site is medical advice.' },
  { q: 'Does PeptiDex sell peptides?', a: 'No. PeptiDex does not sell, distribute, or directly endorse any compound for human or animal use.' },
  { q: 'What is a COA?', a: 'A Certificate of Analysis is a third-party laboratory report showing the actual purity and identity of a compound batch.' },
  { q: 'What are peptides and how do they work?', a: 'Peptides are short chains of amino acids — typically between 2 and 50 — linked by peptide bonds that act as signaling molecules in the body.' },
  { q: 'Are peptides FDA approved?', a: 'Some peptides are FDA approved, but many are not. Over 80 peptide-based drugs have received FDA approval, including semaglutide and tirzepatide.' },
  { q: 'What are GLP-1 peptides?', a: 'GLP-1 peptides mimic or enhance the activity of the natural GLP-1 hormone. FDA-approved examples include semaglutide and tirzepatide.' },
  { q: 'What are growth hormone secretagogue peptides?', a: "GHS peptides stimulate the body's natural production of growth hormone. Major examples include CJC-1295, Ipamorelin, Sermorelin, and MK-677." },
  { q: 'What are the best peptides for healing and recovery?', a: 'BPC-157 and TB-500 are the two most widely studied peptides for tissue healing and recovery.' },
  { q: 'How is AI being used in peptide drug discovery?', a: 'AI is accelerating peptide drug discovery by enabling rapid screening of amino acid sequence spaces and predicting peptide-receptor binding affinity.' },
];

export default function FaqPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_SCHEMA_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FaqRedesignClient />
    </>
  );
}
