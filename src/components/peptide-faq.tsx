"use client";

import { useState } from "react";
import { Peptide } from "@/data/types";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { legalData, legalStatusLabels } from "@/data/legal-status";

export function PeptideFAQ({ peptide }: { peptide: Peptide }) {
    const relatedPeptideStr = peptide.interactions?.synergies?.[0] || 'other compounds';
    
    // Find legal context from existing data or fallback
    const legalBase = legalData.find((l) => l.peptide_name === peptide.name);
    const usStatus = legalBase?.countries.find(c => c.country === "US" || c.country === "United States")?.status;
    const legalAnswer = usStatus ? `In the US, it is currently considered ${legalStatusLabels[usStatus]}. Always check local regulations as peptide laws change frequently.` : `Laws vary by country. It is generally not FDA-approved for human use and often sold strictly for research purposes.`;

    const faqs = [
        {
            question: `What is ${peptide.name}?`,
            answer: `${peptide.name} is a ${peptide.category.toLowerCase()} that functions by ${peptide.mechanism.charAt(0).toLowerCase() + peptide.mechanism.slice(1)}`
        },
        {
            question: `What are the benefits of ${peptide.name}?`,
            answer: `The primary benefits of ${peptide.name} include ${peptide.primary_benefits.toLowerCase()}. Clinical and preclinical studies suggest it can help with these areas when used in research settings.`
        },
        {
            question: `What is the recommended dosage for ${peptide.name}?`,
            answer: peptide.dosing 
                ? `In research protocols, the typical dosage ranges from ${peptide.dosing.typical_dose_mcg[0]} to ${peptide.dosing.typical_dose_mcg[1]}mcg, administered via ${peptide.dosing.route.toLowerCase()}. It is commonly taken ${peptide.dosing.frequency.toLowerCase()}.${peptide.dosing.notes ? ` ${peptide.dosing.notes}` : ''}`
                : `Dosage varies significantly based on the research protocol. Consult emerging clinical literature for specific ranges.`
        },
        {
            question: `Is ${peptide.name} legal?`,
            answer: legalAnswer
        },
        {
            question: `What are the side effects of ${peptide.name}?`,
            answer: peptide.side_effects && peptide.side_effects.length > 0 
                ? `Observed side effects can include ${peptide.side_effects.map(s => s.name.toLowerCase()).join(', ')}. Most are generally reported as ${peptide.side_effects[0].severity}. ${peptide.safety_notes}`
                : `A complete safety profile requires more clinical data. Safety notes state: ${peptide.safety_notes}`
        },
        {
            question: `How does ${peptide.name} compare to ${relatedPeptideStr}?`,
            answer: `While ${peptide.name} focuses on ${peptide.primary_benefits.toLowerCase().split(',')[0]}, ${relatedPeptideStr} may be used synergistically or as an alternative depending on the specific protocol goals.`
        }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">Frequently Asked Questions</h3>
            </div>
            
            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>

            {/* Injects the JSON-LD directly into the HTML to be parsed by Google */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </div>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rounded-2xl bg-zinc-800/40 border border-zinc-700/50 overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
                <span className="text-sm font-semibold text-zinc-200">{question}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-zinc-400 shrink-0 ml-4" /> : <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0 ml-4" />}
            </button>
            {isOpen && (
                <div className="px-4 pb-4 pt-1">
                    <p className="text-sm text-zinc-400 leading-relaxed">{answer}</p>
                </div>
            )}
        </div>
    );
}
