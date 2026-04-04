import type { Metadata } from 'next';
import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: 'Peptide FAQ — Frequently Asked Questions About Peptides | PeptideX',
  description: 'Expert answers to 20+ frequently asked questions about peptides: safety, FDA approval, GLP-1 peptides, GHK-Cu, oral peptides, and more. Evidence-based, cited sources.',
  alternates: {
    canonical: 'https://peptidex.app/faq',
  },
  openGraph: {
    title: 'Peptide FAQ — Frequently Asked Questions | PeptideX',
    description: 'Expert answers to 20+ FAQs about peptides: safety, FDA approval, GLP-1 peptides, GHK-Cu, oral peptides, and more.',
    url: 'https://peptidex.app/faq',
    type: 'website',
    images: [{ url: 'https://peptidex.app/api/og?title=Frequently%20Asked%20Questions&type=default', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peptide FAQ — 20+ Expert Answers | PeptideX',
    description: 'Evidence-based answers about peptide safety, FDA status, GLP-1, GHK-Cu, oral peptides, and more.',
    images: ['https://peptidex.app/api/og?title=Frequently%20Asked%20Questions&type=default'],
  },
};

// ─── ALL FAQ ITEMS (plain text for schema) ──────────────────────

const FAQ_SCHEMA_ITEMS = [
  { q: 'What are peptides and how do they work?', a: 'Peptides are short chains of amino acids — typically between 2 and 50 — linked by peptide bonds that act as signaling molecules in the body. They influence biological processes including immune response, tissue repair, metabolism, and hormone regulation by binding to specific cellular receptors and triggering downstream signaling cascades. Over 80 peptide-based drugs have been approved by the FDA to date, spanning therapeutic areas from diabetes management to oncology.' },
  { q: 'What is the difference between a peptide and a protein?', a: 'The primary distinction between peptides and proteins is size. Peptides are generally defined as chains of 2–50 amino acids, while proteins are larger molecules typically exceeding 50 amino acids. Both are constructed from the same 20 standard amino acid building blocks, but their size differences influence their biological stability, folding behavior, and how they interact with cellular receptors.' },
  { q: 'Are peptides natural or synthetic?', a: 'Peptides can be both natural and synthetic. The human body naturally produces hundreds of peptides — including insulin, oxytocin, and GHK-Cu — that regulate critical physiological processes. Synthetic peptides are manufactured in laboratories to replicate, modify, or enhance the effects of naturally occurring peptides.' },
  { q: 'How are peptides administered?', a: 'Peptides are most commonly administered via subcutaneous injection, which allows direct absorption into the bloodstream while bypassing the digestive system. Other routes include intramuscular injection, intranasal spray, topical creams, and — increasingly — oral formulations. Recent FDA approvals of oral semaglutide and orforglipron in 2025–2026 have demonstrated that oral peptide delivery is now a viable clinical reality.' },
  { q: 'What are the most popular peptides in 2026?', a: 'The most popular peptides in 2026 are GLP-1 receptor agonists like semaglutide and tirzepatide for weight management, GHK-Cu for anti-aging and skin regeneration (which saw a 1,016% increase in search volume year-over-year), and BPC-157 for tissue healing and recovery. Growth hormone secretagogues like CJC-1295 and Ipamorelin remain widely studied.' },
  { q: 'Are peptides safe to use?', a: 'Peptide safety varies significantly by compound, dosage, route of administration, and individual health status. FDA-approved peptide medications like semaglutide and tirzepatide have undergone rigorous Phase I–III clinical trials demonstrating acceptable safety profiles for their approved indications. Many other peptides remain in research phases. Always consult a qualified healthcare provider before starting any peptide therapy.' },
  { q: 'What are common side effects of peptide therapy?', a: 'Common side effects of peptide therapy depend on the specific compound but frequently include injection site reactions (redness, swelling, bruising), mild nausea, headache, and fatigue. GLP-1 peptides like semaglutide are particularly associated with gastrointestinal effects including nausea, vomiting, and diarrhea, especially during dose titration.' },
  { q: 'Do peptides require a prescription?', a: "Whether peptides require a prescription depends on the specific compound and jurisdiction. FDA-approved peptide medications like semaglutide (Ozempic, Wegovy) and tirzepatide (Mounjaro, Zepbound) require a medical prescription. Many other peptides are available through compounding pharmacies with a physician's prescription." },
  { q: 'Are peptides FDA approved?', a: 'Some peptides are FDA approved, but many are not. As of 2026, over 80 peptide-based drugs have received FDA approval for specific clinical indications, including semaglutide for type 2 diabetes and weight management, tirzepatide for obesity, and tesamorelin for HIV-associated lipodystrophy. Many widely discussed research peptides — including BPC-157, TB-500, and MOTS-c — have not undergone the FDA approval process.' },
  { q: 'Can peptides interact with other medications?', a: 'Yes, peptides can interact with other medications. GLP-1 receptor agonists like semaglutide may delay gastric emptying, potentially affecting the absorption of other oral medications. Growth hormone secretagogues can influence insulin sensitivity. A qualified healthcare provider should review all current medications before any peptide therapy is initiated.' },
  { q: 'What are GLP-1 peptides?', a: 'GLP-1 (glucagon-like peptide-1) peptides are a class of compounds that mimic or enhance the activity of the natural GLP-1 hormone, which is released by the gut in response to food intake. They work by stimulating insulin secretion, suppressing glucagon release, slowing gastric emptying, and reducing appetite. FDA-approved GLP-1 medications include semaglutide and tirzepatide, which have demonstrated 15–25% total body weight loss in clinical trials.' },
  { q: 'What peptides are used for anti-aging and skin health?', a: 'GHK-Cu (copper tripeptide-1) is the most widely studied peptide for anti-aging and skin health, with published research demonstrating collagen stimulation, wound healing acceleration, and the ability to modulate over 4,000 human genes toward younger expression patterns. Epitalon is investigated for telomerase activation, while Glutathione and NAD+ are studied for antioxidant and cellular repair properties.' },
  { q: 'What are the best peptides for healing and recovery?', a: 'BPC-157 (Body Protection Compound-157) and TB-500 (Thymosin Beta-4 fragment) are the two most widely studied peptides for tissue healing and recovery. BPC-157 accelerates healing of tendons, ligaments, muscles, and intestinal tissue through growth factor upregulation and angiogenesis. TB-500 promotes tissue repair via actin binding, cell migration, and anti-inflammatory mechanisms.' },
  { q: 'What are longevity peptides?', a: 'Longevity peptides are compounds investigated for their potential to slow, prevent, or reverse biological aging processes at the cellular level. Key longevity peptides include MOTS-c, SS-31, Epitalon, and GHK-Cu. This category is experiencing rapid growth in 2026, driven by advances in mitochondrial biology and aging research.' },
  { q: 'What are growth hormone secretagogue peptides?', a: "Growth hormone secretagogues (GHS) are peptides that stimulate the body's natural production and release of growth hormone from the pituitary gland. Major GHS peptides include CJC-1295, Ipamorelin, Sermorelin, and MK-677. These compounds are frequently stacked for synergistic amplification of natural GH pulses." },
  { q: 'What is the difference between oral and injectable peptides?', a: 'The key difference between oral and injectable peptides is their route of absorption and bioavailability. Injectable peptides bypass the digestive system, providing near-complete absorption. Oral peptides must survive stomach acid and enzymatic degradation. Recent advances in SNAC absorption enhancers and non-peptide oral mimetics have overcome these barriers, with the FDA approving two oral GLP-1 medications in early 2026.' },
  { q: 'What is orforglipron (Foundayo)?', a: 'Orforglipron (brand name Foundayo) is the first non-peptide, orally active GLP-1 receptor agonist approved by the FDA for weight management. Developed by Eli Lilly, it was approved in March 2026 after Phase III trials demonstrated approximately 14.7% total body weight loss over 72 weeks. Unlike semaglutide, orforglipron is a small molecule that is naturally stable in the GI tract.' },
  { q: 'What is GHK-Cu copper peptide?', a: "GHK-Cu (glycyl-L-histidyl-L-lysine copper complex) is a naturally occurring tripeptide bound to a copper ion that was first isolated from human blood plasma in 1973. It functions as a regenerative signaling molecule involved in wound healing, collagen synthesis, anti-inflammatory response, and gene expression modulation. Research found it influences over 4,000 human genes. In 2026, GHK-Cu experienced a 1,016% year-over-year increase in search volume." },
  { q: 'What are multi-receptor agonist peptides like retatrutide?', a: 'Multi-receptor agonist peptides are compounds designed to simultaneously activate two or more metabolic hormone receptors. Retatrutide is a triple agonist targeting GLP-1, GIP, and glucagon receptors simultaneously. In Phase II clinical trials, retatrutide produced up to 24.2% total body weight loss over 48 weeks — the highest weight loss ever recorded for any anti-obesity drug.' },
  { q: 'How is AI being used in peptide drug discovery?', a: 'Artificial intelligence is accelerating peptide drug discovery by enabling rapid screening of vast amino acid sequence spaces, predicting peptide-receptor binding affinity, optimizing pharmacokinetic properties, and identifying novel therapeutic targets. Companies like Google DeepMind, Absci, and Nuritas are using AI to design novel peptide therapeutics, potentially compressing discovery timelines from years to months.' },
];

export default function FaqPage() {
  // ─── JSON-LD SCHEMAS ────────────────────────────────────────


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
      <FaqClient />
    </>
  );
}
