'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ { q: string; a: string; }

export function ComparisonFAQ({ faqs, faqSchema }: { faqs: FAQ[]; faqSchema?: object }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-bold text-zinc-100 mb-6">Frequently Asked Questions</h2>
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={`rounded-xl border transition-all ${openIndex === i ? 'border-violet-500/40 bg-violet-500/5' : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700'}`}
        >
          <button
            className="w-full text-left flex items-center justify-between gap-4 px-5 py-4"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="font-semibold text-zinc-200 text-sm leading-snug">{faq.q}</span>
            {openIndex === i
              ? <ChevronUp className="w-4 h-4 text-violet-400 flex-shrink-0" />
              : <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            }
          </button>
          {openIndex === i && (
            <div className="px-5 pb-5">
              <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
