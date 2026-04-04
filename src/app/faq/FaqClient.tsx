'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Search, Beaker, ShieldCheck, Layers, TrendingUp, HelpCircle, ChevronDown } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AutoLink } from '@/components/auto-link';

const LAST_UPDATED = 'April 3, 2026';

// ─── FAQ CATEGORY DEFINITIONS ────────────────────────────────────

type CategoryId = 'basics' | 'safety' | 'categories' | 'trending';

interface FaqCategory {
  id: CategoryId;
  label: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  borderColor: string;
}

const FAQ_CATEGORIES: FaqCategory[] = [
  { id: 'basics', label: 'Peptide Basics', icon: Beaker, iconColor: 'text-violet-400', bgColor: 'bg-violet-500/10', borderColor: 'border-violet-500/20' },
  { id: 'safety', label: 'Peptide Safety', icon: ShieldCheck, iconColor: 'text-emerald-400', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/20' },
  { id: 'categories', label: 'Peptide Categories', icon: Layers, iconColor: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20' },
  { id: 'trending', label: 'Trending Topics', icon: TrendingUp, iconColor: 'text-amber-400', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/20' },
];

// ─── FAQ DATA ────────────────────────────────────────────────────

interface FaqItem {
  question: string;
  answer: string;       // plain text for schema
  answerJsx: React.ReactNode; // rich JSX for rendering
  category: CategoryId;
}

const FAQ_ITEMS: FaqItem[] = [
  // ── PEPTIDE BASICS ──
  {
    category: 'basics',
    question: 'What are peptides and how do they work?',
    answer: 'Peptides are short chains of amino acids — typically between 2 and 50 — linked by peptide bonds that act as signaling molecules in the body. They influence biological processes including immune response, tissue repair, metabolism, and hormone regulation by binding to specific cellular receptors and triggering downstream signaling cascades. Over 80 peptide-based drugs have been approved by the FDA to date, spanning therapeutic areas from diabetes management to oncology.',
    answerJsx: <>Peptides are short chains of amino acids — typically between 2 and 50 — linked by peptide bonds that act as signaling molecules in the body. They influence biological processes including immune response, tissue repair, metabolism, and hormone regulation by binding to specific cellular receptors and triggering downstream signaling cascades. Over 80 peptide-based drugs have been approved by the FDA to date, spanning therapeutic areas from diabetes management to oncology. <Link href="/beginners-guide" className="text-violet-400 hover:text-violet-300 transition-colors">Read our Beginner&apos;s Guide to Peptides →</Link></>,
  },
  {
    category: 'basics',
    question: 'What is the difference between a peptide and a protein?',
    answer: 'The primary distinction between peptides and proteins is size. Peptides are generally defined as chains of 2–50 amino acids, while proteins are larger molecules typically exceeding 50 amino acids. Both are constructed from the same 20 standard amino acid building blocks, but their size differences influence their biological stability, folding behavior, and how they interact with cellular receptors. Many therapeutic peptides are designed to mimic specific functional domains of larger proteins.',
    answerJsx: <>The primary distinction between peptides and proteins is size. Peptides are generally defined as chains of 2–50 amino acids, while proteins are larger molecules typically exceeding 50 amino acids. Both are constructed from the same 20 standard amino acid building blocks, but their size differences influence their biological stability, folding behavior, and how they interact with cellular receptors. Many therapeutic peptides are designed to mimic specific functional domains of larger proteins.</>,
  },
  {
    category: 'basics',
    question: 'Are peptides natural or synthetic?',
    answer: 'Peptides can be both natural and synthetic. The human body naturally produces hundreds of peptides — including insulin, oxytocin, and GHK-Cu — that regulate critical physiological processes. Synthetic peptides are manufactured in laboratories to replicate, modify, or enhance the effects of naturally occurring peptides. Many FDA-approved peptide drugs, such as semaglutide, are synthetic analogs designed for improved stability and targeted therapeutic action.',
    answerJsx: <>Peptides can be both natural and synthetic. The human body naturally produces hundreds of peptides — including insulin, oxytocin, and <Link href="/peptides/ghk-cu" className="text-violet-400 hover:text-violet-300 transition-colors">GHK-Cu</Link> — that regulate critical physiological processes. Synthetic peptides are manufactured in laboratories to replicate, modify, or enhance the effects of naturally occurring peptides. Many FDA-approved peptide drugs, such as <Link href="/peptides/semaglutide" className="text-violet-400 hover:text-violet-300 transition-colors">semaglutide</Link>, are synthetic analogs designed for improved stability and targeted therapeutic action.</>,
  },
  {
    category: 'basics',
    question: 'How are peptides administered?',
    answer: 'Peptides are most commonly administered via subcutaneous injection, which allows direct absorption into the bloodstream while bypassing the digestive system. Other routes include intramuscular injection, intranasal spray (used for peptides like Semax and Selank), topical creams (popular for GHK-Cu skin applications), and — increasingly — oral formulations. Recent FDA approvals of oral semaglutide and orforglipron in 2025–2026 have demonstrated that oral peptide delivery is now a viable clinical reality.',
    answerJsx: <>Peptides are most commonly administered via subcutaneous injection, which allows direct absorption into the bloodstream while bypassing the digestive system. Other routes include intramuscular injection, intranasal spray (used for peptides like <Link href="/peptides/semax" className="text-violet-400 hover:text-violet-300 transition-colors">Semax</Link> and <Link href="/peptides/selank" className="text-violet-400 hover:text-violet-300 transition-colors">Selank</Link>), topical creams (popular for <Link href="/peptides/ghk-cu" className="text-violet-400 hover:text-violet-300 transition-colors">GHK-Cu</Link> skin applications), and — increasingly — oral formulations. Recent FDA approvals of <Link href="/blog/oral-peptide-revolution" className="text-violet-400 hover:text-violet-300 transition-colors">oral semaglutide and orforglipron</Link> in 2025–2026 have demonstrated that oral peptide delivery is now a viable clinical reality.</>,
  },
  {
    category: 'basics',
    question: 'What are the most popular peptides in 2026?',
    answer: 'The most popular peptides in 2026 are GLP-1 receptor agonists like semaglutide and tirzepatide for weight management, GHK-Cu for anti-aging and skin regeneration (which saw a 1,016% increase in search volume year-over-year), and BPC-157 for tissue healing and recovery. Growth hormone secretagogues like CJC-1295 and Ipamorelin remain widely studied, while newer compounds like retatrutide (a triple-receptor agonist) and MOTS-c (a mitochondrial peptide) are rapidly gaining research attention.',
    answerJsx: <>The most popular peptides in 2026 are GLP-1 receptor agonists like <Link href="/peptides/semaglutide" className="text-violet-400 hover:text-violet-300 transition-colors">semaglutide</Link> and <Link href="/peptides/tirzepatide" className="text-violet-400 hover:text-violet-300 transition-colors">tirzepatide</Link> for weight management, <Link href="/peptides/ghk-cu" className="text-violet-400 hover:text-violet-300 transition-colors">GHK-Cu</Link> for anti-aging and skin regeneration (which saw a <Link href="/blog/ghk-cu-breakout-peptide-2026" className="text-violet-400 hover:text-violet-300 transition-colors">1,016% increase in search volume</Link> year-over-year), and <Link href="/peptides/bpc-157" className="text-violet-400 hover:text-violet-300 transition-colors">BPC-157</Link> for tissue healing. Growth hormone secretagogues like <Link href="/peptides/cjc-1295" className="text-violet-400 hover:text-violet-300 transition-colors">CJC-1295</Link> and <Link href="/peptides/ipamorelin" className="text-violet-400 hover:text-violet-300 transition-colors">Ipamorelin</Link> remain widely studied, while <Link href="/peptides/retatrutide" className="text-violet-400 hover:text-violet-300 transition-colors">retatrutide</Link> and <Link href="/peptides/mots-c" className="text-violet-400 hover:text-violet-300 transition-colors">MOTS-c</Link> are rapidly gaining attention.</>,
  },

  // ── PEPTIDE SAFETY ──
  {
    category: 'safety',
    question: 'Are peptides safe to use?',
    answer: 'Peptide safety varies significantly by compound, dosage, route of administration, and individual health status. FDA-approved peptide medications like semaglutide and tirzepatide have undergone rigorous Phase I–III clinical trials demonstrating acceptable safety profiles for their approved indications. Many other peptides remain in research phases and have not been evaluated in large-scale human trials. Always consult a qualified healthcare provider before starting any peptide therapy.',
    answerJsx: <>Peptide safety varies significantly by compound, dosage, route of administration, and individual health status. FDA-approved peptide medications like <Link href="/peptides/semaglutide" className="text-violet-400 hover:text-violet-300 transition-colors">semaglutide</Link> and <Link href="/peptides/tirzepatide" className="text-violet-400 hover:text-violet-300 transition-colors">tirzepatide</Link> have undergone rigorous Phase I–III clinical trials demonstrating acceptable safety profiles. Many other peptides remain in research phases and have not been evaluated in large-scale human trials. Always consult a qualified healthcare provider before starting any peptide therapy.</>,
  },
  {
    category: 'safety',
    question: 'What are common side effects of peptide therapy?',
    answer: 'Common side effects of peptide therapy depend on the specific compound but frequently include injection site reactions (redness, swelling, bruising), mild nausea, headache, and fatigue. GLP-1 peptides like semaglutide are particularly associated with gastrointestinal effects including nausea, vomiting, and diarrhea, especially during dose titration. Growth hormone secretagogues may cause water retention and increased appetite. Side effect profiles are documented in published clinical literature for FDA-approved compounds.',
    answerJsx: <>Common side effects depend on the specific compound but frequently include injection site reactions (redness, swelling, bruising), mild nausea, headache, and fatigue. GLP-1 peptides like semaglutide are particularly associated with gastrointestinal effects including nausea, vomiting, and diarrhea, especially during dose titration. Growth hormone secretagogues may cause water retention and increased appetite. Side effect profiles are documented in published clinical literature for FDA-approved compounds.</>,
  },
  {
    category: 'safety',
    question: 'Do peptides require a prescription?',
    answer: 'Whether peptides require a prescription depends on the specific compound and jurisdiction. FDA-approved peptide medications like semaglutide (Ozempic, Wegovy) and tirzepatide (Mounjaro, Zepbound) require a medical prescription. Many other peptides are available through compounding pharmacies with a physician\'s prescription. Some peptides are sold as "research use only" compounds and are not approved for human consumption — their purchase and use falls into a regulatory gray area that varies by country.',
    answerJsx: <>Whether peptides require a prescription depends on the specific compound and jurisdiction. FDA-approved peptide medications like semaglutide (Ozempic, Wegovy) and tirzepatide (Mounjaro, Zepbound) require a medical prescription. Many other peptides are available through compounding pharmacies with a physician&apos;s prescription. Some peptides are sold as &quot;research use only&quot; compounds — their regulatory status <Link href="/blog/are-research-peptides-legal" className="text-violet-400 hover:text-violet-300 transition-colors">varies by country</Link>.</>,
  },
  {
    category: 'safety',
    question: 'Are peptides FDA approved?',
    answer: 'Some peptides are FDA approved, but many are not. As of 2026, over 80 peptide-based drugs have received FDA approval for specific clinical indications, including semaglutide for type 2 diabetes and weight management, tirzepatide for obesity, and tesamorelin for HIV-associated lipodystrophy. However, many widely discussed research peptides — including BPC-157, TB-500, and MOTS-c — have not undergone the FDA approval process and are classified as investigational compounds.',
    answerJsx: <>Some peptides are FDA approved, but many are not. As of 2026, over 80 peptide-based drugs have received FDA approval for specific clinical indications, including <Link href="/peptides/semaglutide" className="text-violet-400 hover:text-violet-300 transition-colors">semaglutide</Link> for type 2 diabetes and weight management, <Link href="/peptides/tirzepatide" className="text-violet-400 hover:text-violet-300 transition-colors">tirzepatide</Link> for obesity, and <Link href="/peptides/tesamorelin" className="text-violet-400 hover:text-violet-300 transition-colors">tesamorelin</Link> for HIV-associated lipodystrophy. However, many widely discussed research peptides — including <Link href="/peptides/bpc-157" className="text-violet-400 hover:text-violet-300 transition-colors">BPC-157</Link>, <Link href="/peptides/tb-500" className="text-violet-400 hover:text-violet-300 transition-colors">TB-500</Link>, and <Link href="/peptides/mots-c" className="text-violet-400 hover:text-violet-300 transition-colors">MOTS-c</Link> — have not undergone FDA approval and are classified as investigational.</>,
  },
  {
    category: 'safety',
    question: 'Can peptides interact with other medications?',
    answer: 'Yes, peptides can interact with other medications. GLP-1 receptor agonists like semaglutide may delay gastric emptying, potentially affecting the absorption of other oral medications. Growth hormone secretagogues can influence insulin sensitivity and should be used with caution alongside diabetes medications. Immune-modulating peptides like Thymosin Alpha-1 may interact with immunosuppressive therapies. A qualified healthcare provider should review all current medications before any peptide therapy is initiated.',
    answerJsx: <>Yes, peptides can interact with other medications. GLP-1 receptor agonists like semaglutide may delay gastric emptying, potentially affecting the absorption of other oral medications. Growth hormone secretagogues can influence insulin sensitivity and should be used with caution alongside diabetes medications. Immune-modulating peptides like <Link href="/peptides/thymosin-alpha-1" className="text-violet-400 hover:text-violet-300 transition-colors">Thymosin Alpha-1</Link> may interact with immunosuppressive therapies. A qualified healthcare provider should review all current medications before any peptide therapy is initiated.</>,
  },

  // ── PEPTIDE CATEGORIES ──
  {
    category: 'categories',
    question: 'What are GLP-1 peptides?',
    answer: 'GLP-1 (glucagon-like peptide-1) peptides are a class of compounds that mimic or enhance the activity of the natural GLP-1 hormone, which is released by the gut in response to food intake. They work by stimulating insulin secretion, suppressing glucagon release, slowing gastric emptying, and reducing appetite through central nervous system signaling. FDA-approved GLP-1 medications include semaglutide (Ozempic, Wegovy) and tirzepatide (Mounjaro, Zepbound), which have demonstrated 15–25% total body weight loss in clinical trials.',
    answerJsx: <>GLP-1 (glucagon-like peptide-1) peptides are a class of compounds that mimic or enhance the activity of the natural GLP-1 hormone released by the gut in response to food intake. They work by stimulating insulin secretion, suppressing glucagon release, slowing gastric emptying, and reducing appetite. FDA-approved GLP-1 medications include <Link href="/peptides/semaglutide" className="text-violet-400 hover:text-violet-300 transition-colors">semaglutide</Link> (Ozempic, Wegovy) and <Link href="/peptides/tirzepatide" className="text-violet-400 hover:text-violet-300 transition-colors">tirzepatide</Link> (Mounjaro, Zepbound), which have demonstrated 15–25% total body weight loss in clinical trials. <Link href="/blog/best-peptides-for-fat-loss" className="text-violet-400 hover:text-violet-300 transition-colors">Read our full GLP-1 research review →</Link></>,
  },
  {
    category: 'categories',
    question: 'What peptides are used for anti-aging and skin health?',
    answer: 'GHK-Cu (copper tripeptide-1) is the most widely studied peptide for anti-aging and skin health, with published research demonstrating collagen stimulation, wound healing acceleration, and the ability to modulate over 4,000 human genes toward younger expression patterns. Epitalon (epithalamin) is investigated for its role in telomerase activation and circadian rhythm regulation. Glutathione and NAD+ are also studied for their antioxidant and cellular repair properties. Clinical trials have shown topical GHK-Cu outperforming both vitamin C and retinoic acid for collagen production.',
    answerJsx: <><Link href="/peptides/ghk-cu" className="text-violet-400 hover:text-violet-300 transition-colors">GHK-Cu</Link> (copper tripeptide-1) is the most widely studied peptide for anti-aging and skin health, with research demonstrating collagen stimulation, wound healing acceleration, and the ability to modulate over 4,000 human genes toward younger expression patterns. <Link href="/peptides/epitalon" className="text-violet-400 hover:text-violet-300 transition-colors">Epitalon</Link> is investigated for telomerase activation, while <Link href="/peptides/glutathione" className="text-violet-400 hover:text-violet-300 transition-colors">Glutathione</Link> and <Link href="/peptides/nad" className="text-violet-400 hover:text-violet-300 transition-colors">NAD+</Link> are studied for antioxidant and cellular repair properties. Clinical trials have shown topical GHK-Cu outperforming both vitamin C and retinoic acid for collagen production.</>,
  },
  {
    category: 'categories',
    question: 'What are the best peptides for healing and recovery?',
    answer: 'BPC-157 (Body Protection Compound-157) and TB-500 (Thymosin Beta-4 fragment) are the two most widely studied peptides for tissue healing and recovery. BPC-157 has demonstrated the ability to accelerate healing of tendons, ligaments, muscles, and intestinal tissue in preclinical models, primarily through upregulation of growth factor expression and angiogenesis. TB-500 promotes tissue repair via actin binding, cell migration, and anti-inflammatory mechanisms. These two peptides are frequently studied in combination for their complementary healing pathways.',
    answerJsx: <><Link href="/peptides/bpc-157" className="text-violet-400 hover:text-violet-300 transition-colors">BPC-157</Link> (Body Protection Compound-157) and <Link href="/peptides/tb-500" className="text-violet-400 hover:text-violet-300 transition-colors">TB-500</Link> (Thymosin Beta-4 fragment) are the two most widely studied peptides for tissue healing and recovery. BPC-157 accelerates healing of tendons, ligaments, muscles, and intestinal tissue through growth factor upregulation and angiogenesis. TB-500 promotes repair via actin binding, cell migration, and anti-inflammatory mechanisms. These two are frequently <Link href="/blog/bpc-157-vs-tb-500" className="text-violet-400 hover:text-violet-300 transition-colors">studied in combination</Link> for complementary healing pathways.</>,
  },
  {
    category: 'categories',
    question: 'What are longevity peptides?',
    answer: 'Longevity peptides are compounds investigated for their potential to slow, prevent, or reverse biological aging processes at the cellular level. Key longevity peptides include MOTS-c, a mitochondrial-derived peptide that regulates metabolic homeostasis and insulin sensitivity; SS-31 (elamipretide), which targets the inner mitochondrial membrane to reduce oxidative stress; Epitalon, a telomerase activator studied for its effects on pineal gland function and circadian regulation; and GHK-Cu, which modulates gene expression patterns associated with aging. This category is experiencing rapid growth in 2026, driven by advances in mitochondrial biology and aging research.',
    answerJsx: <>Longevity peptides are compounds investigated for their potential to slow, prevent, or reverse biological aging processes at the cellular level. Key examples include <Link href="/peptides/mots-c" className="text-violet-400 hover:text-violet-300 transition-colors">MOTS-c</Link>, a mitochondrial-derived peptide regulating metabolic homeostasis; <Link href="/peptides/ss-31" className="text-violet-400 hover:text-violet-300 transition-colors">SS-31</Link> (elamipretide), targeting the inner mitochondrial membrane to reduce oxidative stress; <Link href="/peptides/epitalon" className="text-violet-400 hover:text-violet-300 transition-colors">Epitalon</Link>, a telomerase activator; and <Link href="/peptides/ghk-cu" className="text-violet-400 hover:text-violet-300 transition-colors">GHK-Cu</Link>, which modulates gene expression patterns associated with aging. This category is experiencing rapid growth in 2026.</>,
  },
  {
    category: 'categories',
    question: 'What are growth hormone secretagogue peptides?',
    answer: 'Growth hormone secretagogues (GHS) are peptides that stimulate the body\'s natural production and release of growth hormone from the pituitary gland, rather than introducing exogenous growth hormone directly. Major GHS peptides include CJC-1295 (a GHRH analog that extends GH release duration), Ipamorelin (a selective GHRP that stimulates GH without raising cortisol), Sermorelin (a truncated GHRH analog), and MK-677 (an oral, non-peptide GH secretagogue). These compounds are frequently stacked — particularly CJC-1295 with Ipamorelin — for synergistic amplification of natural GH pulses.',
    answerJsx: <>Growth hormone secretagogues (GHS) are peptides that stimulate the body&apos;s natural production of growth hormone from the pituitary gland, rather than introducing exogenous GH directly. Major GHS peptides include <Link href="/peptides/cjc-1295" className="text-violet-400 hover:text-violet-300 transition-colors">CJC-1295</Link> (a GHRH analog), <Link href="/peptides/ipamorelin" className="text-violet-400 hover:text-violet-300 transition-colors">Ipamorelin</Link> (a selective GHRP without cortisol elevation), <Link href="/peptides/sermorelin" className="text-violet-400 hover:text-violet-300 transition-colors">Sermorelin</Link>, and <Link href="/peptides/mk-677" className="text-violet-400 hover:text-violet-300 transition-colors">MK-677</Link> (an oral secretagogue). These are frequently <Link href="/blog/ipamorelin-vs-cjc-1295" className="text-violet-400 hover:text-violet-300 transition-colors">stacked together</Link> for synergistic GH pulse amplification.</>,
  },

  // ── TRENDING TOPICS ──
  {
    category: 'trending',
    question: 'What is the difference between oral and injectable peptides?',
    answer: 'The key difference between oral and injectable peptides is their route of absorption and bioavailability. Injectable peptides (subcutaneous or intramuscular) bypass the digestive system, providing near-complete absorption and predictable dosing. Oral peptides must survive stomach acid and enzymatic degradation in the GI tract, which historically limited their viability. However, recent advances in SNAC absorption enhancers (used in oral semaglutide) and non-peptide oral mimetics like orforglipron have overcome these barriers, with the FDA approving two oral GLP-1 medications in early 2026.',
    answerJsx: <>The key difference is their route of absorption and bioavailability. Injectable peptides bypass the digestive system, providing near-complete absorption and predictable dosing. Oral peptides must survive stomach acid and enzymatic degradation, which historically limited their viability. However, recent advances in SNAC absorption enhancers and non-peptide oral mimetics like orforglipron have overcome these barriers, with the <Link href="/blog/oral-peptide-revolution" className="text-violet-400 hover:text-violet-300 transition-colors">FDA approving two oral GLP-1 medications</Link> in early 2026.</>,
  },
  {
    category: 'trending',
    question: 'What is orforglipron (Foundayo)?',
    answer: 'Orforglipron (brand name Foundayo) is the first non-peptide, orally active GLP-1 receptor agonist approved by the FDA for weight management. Developed by Eli Lilly, it was approved in March 2026 after Phase III trials demonstrated approximately 14.7% total body weight loss over 72 weeks. Unlike semaglutide, orforglipron is a small molecule rather than a peptide, meaning it is naturally stable in the GI tract and does not require the absorption-enhancing technology used in oral semaglutide formulations. This makes it significantly cheaper to manufacture and more convenient to administer.',
    answerJsx: <>Orforglipron (brand name Foundayo) is the first non-peptide, orally active GLP-1 receptor agonist approved by the FDA for weight management. Developed by Eli Lilly, it was approved in March 2026 after Phase III trials demonstrated approximately 14.7% total body weight loss over 72 weeks. Unlike semaglutide, orforglipron is a small molecule rather than a peptide, meaning it is naturally stable in the GI tract without requiring absorption-enhancing technology. <Link href="/blog/oral-peptide-revolution" className="text-violet-400 hover:text-violet-300 transition-colors">Read our full analysis of the oral peptide revolution →</Link></>,
  },
  {
    category: 'trending',
    question: 'What is GHK-Cu copper peptide?',
    answer: 'GHK-Cu (glycyl-L-histidyl-L-lysine copper complex) is a naturally occurring tripeptide bound to a copper ion that was first isolated from human blood plasma in 1973. It functions as a regenerative signaling molecule involved in wound healing, collagen synthesis, anti-inflammatory response, and gene expression modulation. Research published through the Broad Institute\'s Connectivity Map found that GHK-Cu influences the expression of over 4,000 human genes, shifting aged gene expression patterns toward younger profiles. In 2026, GHK-Cu experienced a 1,016% year-over-year increase in search volume, making it the fastest-growing peptide in public interest.',
    answerJsx: <><Link href="/peptides/ghk-cu" className="text-violet-400 hover:text-violet-300 transition-colors">GHK-Cu</Link> (glycyl-L-histidyl-L-lysine copper complex) is a naturally occurring tripeptide bound to a copper ion, first isolated from human blood plasma in 1973. It functions as a regenerative signaling molecule involved in wound healing, collagen synthesis, anti-inflammatory response, and gene expression modulation. Research found it influences over 4,000 human genes, shifting aged expression patterns toward younger profiles. In 2026, GHK-Cu experienced a <Link href="/blog/ghk-cu-breakout-peptide-2026" className="text-violet-400 hover:text-violet-300 transition-colors">1,016% year-over-year increase in search volume</Link>.</>,
  },
  {
    category: 'trending',
    question: 'What are multi-receptor agonist peptides like retatrutide?',
    answer: 'Multi-receptor agonist peptides are compounds designed to simultaneously activate two or more metabolic hormone receptors, producing amplified therapeutic effects compared to single-receptor drugs. Retatrutide is a triple agonist targeting GLP-1, GIP, and glucagon receptors simultaneously. In Phase II clinical trials, retatrutide produced up to 24.2% total body weight loss over 48 weeks — the highest weight loss ever recorded for any anti-obesity drug in a controlled trial. Tirzepatide (Mounjaro/Zepbound) is a dual GLP-1/GIP agonist. This multi-receptor approach represents a major frontier in metabolic peptide drug design.',
    answerJsx: <>Multi-receptor agonist peptides simultaneously activate two or more metabolic hormone receptors for amplified therapeutic effects. <Link href="/peptides/retatrutide" className="text-violet-400 hover:text-violet-300 transition-colors">Retatrutide</Link> is a triple agonist targeting GLP-1, GIP, and glucagon receptors, which produced up to 24.2% weight loss in Phase II trials — the highest ever recorded for an anti-obesity drug. <Link href="/peptides/tirzepatide" className="text-violet-400 hover:text-violet-300 transition-colors">Tirzepatide</Link> (Mounjaro/Zepbound) is a dual GLP-1/GIP agonist. This multi-receptor approach represents a major frontier in metabolic peptide drug design.</>,
  },
  {
    category: 'trending',
    question: 'How is AI being used in peptide drug discovery?',
    answer: 'Artificial intelligence is accelerating peptide drug discovery by enabling rapid screening of vast amino acid sequence spaces, predicting peptide-receptor binding affinity, optimizing pharmacokinetic properties, and identifying novel therapeutic targets. Machine learning models can now predict peptide stability, membrane permeability, and oral bioavailability — critical parameters that historically required expensive wet-lab testing. Companies like Google DeepMind (AlphaFold), Absci, and Nuritas are using AI to design novel peptide therapeutics with optimized binding profiles, potentially compressing discovery timelines from years to months.',
    answerJsx: <>Artificial intelligence is accelerating peptide drug discovery by enabling rapid screening of vast amino acid sequence spaces, predicting peptide-receptor binding affinity, optimizing pharmacokinetic properties, and identifying novel therapeutic targets. Machine learning models can now predict peptide stability, membrane permeability, and oral bioavailability — parameters that historically required expensive wet-lab testing. Companies like Google DeepMind (AlphaFold), Absci, and Nuritas are using AI to design novel peptide therapeutics, potentially compressing discovery timelines from years to months.</>,
  },
];

// ─── CLIENT COMPONENT ────────────────────────────────────────────

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-10">

      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { name: 'Home', url: 'https://peptidex.app/' },
        { name: 'FAQ' },
      ]} />

      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-100">
              Frequently Asked Questions
            </h1>
            <p className="text-sm text-zinc-500 font-medium mt-1">Last Updated: {LAST_UPDATED}</p>
          </div>
        </div>
        <p className="text-[15px] text-zinc-400 leading-relaxed max-w-2xl">
          Evidence-based answers to the most common questions about peptides, peptide safety, compound categories, and emerging research trends. All answers are supported by published scientific literature.
        </p>
      </header>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
            activeCategory === 'all'
              ? 'bg-violet-600 border-violet-500 text-white'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
          }`}
        >
          All ({FAQ_ITEMS.length})
        </button>
        {FAQ_CATEGORIES.map((cat) => {
          const count = FAQ_ITEMS.filter((f) => f.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                activeCategory === cat.id
                  ? `${cat.bgColor} ${cat.iconColor} ${cat.borderColor}`
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* FAQ Sections */}
      <div className="space-y-8">
        {FAQ_CATEGORIES.filter((cat) => activeCategory === 'all' || activeCategory === cat.id).map((cat) => {
          const categoryFaqs = filteredFaqs.filter((f) => f.category === cat.id);
          if (categoryFaqs.length === 0) return null;
          const Icon = cat.icon;

          return (
            <section key={cat.id} id={cat.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${cat.bgColor} border ${cat.borderColor} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${cat.iconColor}`} />
                </div>
                <h2 className="text-xl font-bold text-zinc-100">{cat.label}</h2>
              </div>

              <div className="space-y-2">
                {categoryFaqs.map((faq) => {
                  const globalIndex = FAQ_ITEMS.indexOf(faq);
                  const isOpen = openItems.has(globalIndex);

                  return (
                    <div key={globalIndex} className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-800/30 transition-colors"
                      >
                        <h3 className="font-semibold text-zinc-200 text-sm pr-4">{faq.question}</h3>
                        <ChevronDown className={`w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 -mt-1">
                          <AutoLink>
                            <p className="text-sm text-zinc-400 leading-relaxed">{faq.answerJsx}</p>
                          </AutoLink>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12 text-zinc-500">
            <p className="text-sm">No questions match your search. Try a different keyword.</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="rounded-2xl bg-gradient-to-br from-violet-900/20 to-zinc-900 border border-violet-500/20 p-6 md:p-8 text-center space-y-4 mt-8">
        <h2 className="text-lg font-bold text-zinc-100">Still have questions?</h2>
        <p className="text-sm text-zinc-400 max-w-md mx-auto">
          Explore our peptide library for detailed compound profiles or contact our editorial team.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/peptides" className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors">
            Browse Peptide Library
          </Link>
          <Link href="/about" className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-sm transition-colors border border-zinc-700">
            Contact Us
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="pt-6 border-t border-zinc-800">
        <p className="text-xs text-zinc-500 leading-relaxed text-center">
          All answers are for educational purposes only and do not constitute medical advice. <Link href="/disclaimer" className="text-violet-400 hover:text-violet-300 transition-colors">Read our full medical disclaimer.</Link>
        </p>
      </div>
    </div>
  );
}
