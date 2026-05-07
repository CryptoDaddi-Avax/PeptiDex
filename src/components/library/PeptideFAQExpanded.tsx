'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import type { Peptide } from '@/data/types';
import { legalData, legalStatusLabels } from '@/data/legal-status';
import { peptideFAQOverrides } from '@/data/peptide-faqs';

interface FAQItem {
  q: string;
  a: string;
}

function buildStandardFAQs(peptide: Peptide): FAQItem[] {
  const legalBase = legalData.find((l) => l.peptide_name === peptide.name);
  const usStatus = legalBase?.countries.find(
    (c) => c.country === 'US' || c.country === 'United States'
  )?.status;
  const legalAnswer = usStatus
    ? `In the US, ${peptide.name} is considered ${legalStatusLabels[usStatus]}. It is ${peptide.is_fda_approved ? 'FDA-approved for specific indications' : 'not FDA-approved for human therapeutic use and is sold strictly for research purposes'}. Laws vary by country — always verify current status in your jurisdiction.`
    : `${peptide.name} is ${peptide.is_fda_approved ? 'FDA-approved for specific indications' : 'not FDA-approved for human use and is generally classified as a research compound'}. Always check local regulations, as peptide laws change frequently.`;

  const dosingAnswer = peptide.dosing
    ? `In research protocols, ${peptide.name} is typically administered at ${peptide.dosing.typical_dose_mcg[0]}–${peptide.dosing.typical_dose_mcg[1]} mcg via ${peptide.dosing.route.toLowerCase()}, ${peptide.dosing.frequency.toLowerCase()}.${peptide.dosing.timing ? ` Optimal timing: ${peptide.dosing.timing.toLowerCase()}.` : ''}${peptide.dosing.notes ? ` Notes: ${peptide.dosing.notes}` : ''} This is for educational reference only — not medical advice.`
    : `Research dosing for ${peptide.name} varies significantly by protocol. Consult published clinical literature for specific ranges. This is not medical advice.`;

  const sideEffectsAnswer =
    peptide.side_effects && peptide.side_effects.length > 0
      ? `Reported side effects in published literature include ${peptide.side_effects.map((s) => s.name.toLowerCase()).join(', ')}. Most are classified as ${peptide.side_effects[0].severity} in severity. ${peptide.safety_notes}`
      : `A complete adverse effect profile for ${peptide.name} is not yet fully established in clinical literature. General safety notes: ${peptide.safety_notes}`;

  const halfLifeAnswer = peptide.half_life_hours
    ? `${peptide.name} has a documented biological half-life of approximately ${peptide.half_life_hours < 24 ? `${peptide.half_life_hours} hours` : `${(peptide.half_life_hours / 24).toFixed(1)} days`}. This influences dosing frequency in research protocols.`
    : `The precise half-life of ${peptide.name} varies by route of administration and individual metabolism. Published pharmacokinetic data for this compound is still emerging.`;

  const costAnswer = `Current research pricing for ${peptide.name} varies by vendor and vial size. Use the PEPTIDEX discount code at verified vendors for up to 20% off list price. Compare current prices at our <a href="/tools/pricing" class="text-violet-400 underline">price comparison tool</a>.`;

  return [
    {
      q: `What is ${peptide.name}?`,
      a: `${peptide.name} is a ${peptide.category.toLowerCase()} ${peptide.is_fda_approved ? '(FDA-approved)' : '(research compound)'} that ${peptide.mechanism.charAt(0).toLowerCase() + peptide.mechanism.slice(1)} ${peptide.laypersonSummary ? `In plain terms: ${peptide.laypersonSummary}` : ''}`,
    },
    {
      q: `What is the typical ${peptide.name} dosage?`,
      a: dosingAnswer,
    },
    {
      q: `What is ${peptide.name}'s half-life?`,
      a: halfLifeAnswer,
    },
    {
      q: `What are ${peptide.name} side effects?`,
      a: sideEffectsAnswer,
    },
    {
      q: `Where can I buy ${peptide.name} online?`,
      a: `${peptide.name} is available from several COA-verified research peptide vendors. We recommend checking Amino Club (PEPTIDEX = 20% off) and Bio Longevity Labs (PEPTIDEX = 15% off, stackable). Always purchase from vendors that provide batch-specific Certificates of Analysis (COA) via HPLC testing. See our <a href="/tools/pricing" class="text-violet-400 underline">vendor comparison tool</a> for current pricing.`,
    },
    {
      q: `Is ${peptide.name} legal?`,
      a: legalAnswer,
    },
    {
      q: `How is ${peptide.name} reconstituted?`,
      a: peptide.dosing?.reconstitution_ml && peptide.dosing?.typical_vial_mg
        ? `To reconstitute ${peptide.name}, add ${peptide.dosing.reconstitution_ml} ml of bacteriostatic water (BAC water) to the ${peptide.dosing.typical_vial_mg}mg vial. Swirl gently — do not shake. Store reconstituted solution refrigerated and use within 28–30 days. Use our <a href="/tools/calculator" class="text-violet-400 underline">reconstitution calculator</a> for precise syringe measurements.`
        : `Reconstitution typically involves adding bacteriostatic water (BAC water) to the lyophilized powder vial. The exact volume depends on your target dose concentration. Use our <a href="/tools/calculator" class="text-violet-400 underline">free reconstitution calculator</a> to calculate the correct measurement for your syringe size.`,
    },
    {
      q: `What does ${peptide.name} cost?`,
      a: costAnswer,
    },
  ];
}

interface PeptideFAQExpandedProps {
  peptide: Peptide;
  /** Pass false to suppress the built-in JSON-LD injection (when page.tsx already injects it server-side) */
  injectJsonLd?: boolean;
}

export function PeptideFAQExpanded({ peptide, injectJsonLd = false }: PeptideFAQExpandedProps) {
  const standardFAQs = buildStandardFAQs(peptide);
  const customFAQs = (peptideFAQOverrides[peptide.slug] ?? []).filter(
    (faq) => faq.q && faq.a // filter out stub entries
  );
  const allFAQs = [...standardFAQs, ...customFAQs];

  return (
    <div className="pd-faq-expanded mb-6">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-4 h-4 text-rose-400" />
        <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {allFAQs.map((faq, index) => (
          <FAQItem key={index} question={faq.q} answer={faq.a} />
        ))}
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-zinc-800/40 border border-zinc-700/50 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-zinc-200 pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-zinc-400 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-1">
          <p
            className="text-sm text-zinc-400 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </div>
      )}
    </div>
  );
}
