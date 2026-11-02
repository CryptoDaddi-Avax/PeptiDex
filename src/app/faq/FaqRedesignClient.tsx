'use client';

import Link from 'next/link';
import './faq-redesign.css';

// ─── FAQ DATA — preserved from existing FaqClient ─────────────────

const FAQ_ITEMS = [
  {
    question: 'What are research peptides?',
    answer: 'Research peptides are synthetic amino acid chains designed for in-vitro laboratory study. Most are not FDA-approved for human consumption. They are sold by chemical suppliers for educational and research use only.',
  },
  {
    question: 'Are these compounds legal?',
    answer: 'In the United States, research peptides exist in a regulatory gray area. They are legal to purchase and possess for research purposes, but it is illegal for vendors to market them for human consumption.',
  },
  {
    question: 'How does PeptiDex rank vendors?',
    answer: 'Vendors must state that they provide COAs with HPLC purity data and an identity test (mass spectrometry, LC-MS, FTIR, or HPLC against a reference standard). We score every vendor on six published criteria — COA availability, third-party lab testing, price per mg, shipping, payment options and returns — using their own published information. PeptiDex does not test products. PeptiDex earns affiliate commission and its founder owns Elyria Bio.',
  },
  {
    question: 'Is PeptiDex a medical authority?',
    answer: 'No. PeptiDex is an independent research index, not a medical practice. Nothing on this site is medical advice.',
  },
  {
    question: 'Does PeptiDex sell peptides?',
    answer: 'No. PeptiDex does not sell, distribute, or directly endorse any compound for human or animal use.',
  },
  {
    question: 'What is a COA?',
    answer: 'A Certificate of Analysis is a third-party laboratory report showing the actual purity and identity of a compound batch.',
  },
  {
    question: 'What are peptides and how do they work?',
    answer: 'Peptides are short chains of amino acids — typically between 2 and 50 — linked by peptide bonds that act as signaling molecules in the body. They influence biological processes including immune response, tissue repair, metabolism, and hormone regulation by binding to specific cellular receptors.',
  },
  {
    question: 'What is the difference between a peptide and a protein?',
    answer: 'The primary distinction is size. Peptides are generally chains of 2–50 amino acids, while proteins exceed 50. Both are constructed from the same 20 amino acid building blocks, but their size differences influence biological stability, folding behavior, and receptor interactions.',
  },
  {
    question: 'Are peptides FDA approved?',
    answer: 'Some peptides are FDA approved, but many are not. Over 80 peptide-based drugs have received FDA approval, including tesamorelin and PT-141 (bremelanotide). However, many widely discussed research peptides — including BPC-157, TB-500, and MOTS-c — have not undergone the FDA approval process.',
  },
  {
    question: 'What routes have peptides been studied by?',
    answer: 'In published studies, peptides have been given by subcutaneous, intramuscular, intranasal, topical and oral routes.',
  },
  {
    question: 'What are the most popular peptides in 2026?',
    answer: 'GHK-Cu for anti-aging (1,016% search volume increase YoY) and BPC-157 for tissue healing lead interest. Growth hormone secretagogues like CJC-1295 and Ipamorelin remain widely studied.',
  },
  {
    question: 'Are peptides safe to use?',
    answer: 'Safety varies significantly by compound, dosage, route, and individual health status. FDA-approved peptide medications have undergone rigorous clinical trials. Many other peptides remain in research phases and have not been evaluated in large-scale human trials. Always consult a qualified healthcare provider.',
  },
  {
    question: 'Can peptides interact with other medications?',
    answer: 'Yes. Growth hormone secretagogues can influence insulin sensitivity. A qualified healthcare provider should review all current medications before initiating any peptide therapy.',
  },
  {
    question: 'What are growth hormone secretagogue peptides?',
    answer: "GHS peptides stimulate the body's natural production of growth hormone from the pituitary gland. Major examples include CJC-1295 (a GHRH analog), Ipamorelin (selective GHRP without cortisol elevation), Sermorelin, and MK-677 (oral secretagogue). Because GHRH analogs and GHRPs act on different receptors, researchers have studied them in combination.",
  },
  {
    question: 'What are the best peptides for healing and recovery?',
    answer: 'BPC-157 and TB-500 are the two most widely studied. BPC-157 accelerates healing of tendons, ligaments, muscles, and intestinal tissue through growth factor upregulation. TB-500 promotes repair via actin binding, cell migration, and anti-inflammatory mechanisms. They are frequently studied in combination.',
  },
  {
    question: 'How is AI being used in peptide drug discovery?',
    answer: 'AI is accelerating peptide drug discovery by enabling rapid screening of amino acid sequence spaces, predicting peptide-receptor binding affinity, optimizing pharmacokinetic properties, and identifying novel therapeutic targets. Companies like Google DeepMind (AlphaFold), Absci, and Nuritas are using AI to design novel peptide therapeutics.',
  },
];

export default function FaqRedesignClient() {
  return (
    <main id="main-content">
      <header className="page-header">
        <div className="page-header-grid"></div>
        <div className="page-header-wrap">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">FAQ</span>
          </div>
          <div className="section-label">§ Frequently Asked</div>
          <h1 className="page-title">
            Honest answers,<br /><em>plainly</em> stated.
          </h1>
          <p className="page-subtitle">
            The questions we get most often, answered without hedging or marketing-speak.
          </p>
        </div>
      </header>

      <div className="container">
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="faq-item">
              <summary>{item.question}</summary>
              <div className="faq-answer">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>

      
    </main>
  );
}
