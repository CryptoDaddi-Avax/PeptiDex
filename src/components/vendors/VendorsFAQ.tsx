"use client";

/**
 * VendorsFAQ — 8-question accordion FAQ for /vendors page.
 * =========================================================
 * Client component — uses local state for accordion expand/collapse.
 * Data is passed in as props so JSON-LD can be generated server-side
 * from the same source (VENDORS_FAQ_ITEMS from vendorsJsonLd.ts).
 * from the same source (VENDORS_FAQ_ITEMS from faqData.ts).
 *
 * Design: vfaq-* CSS namespace.
 */

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle } from "lucide-react";
import type { FaqItem } from "@/app/vendors/faqData";

interface VendorsFAQProps {
  faqs: FaqItem[];
}

function FAQAccordionItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`vfaq-item${isOpen ? " vfaq-item-open" : ""}`}
      id={`faq-${index}`}
    >
      <button
        className="vfaq-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-trigger-${index}`}
      >
        <span className="vfaq-q-text">{faq.q}</span>
        <ChevronDown
          size={18}
          className={`vfaq-chevron${isOpen ? " vfaq-chevron-open" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="vfaq-answer"
          id={`faq-answer-${index}`}
          role="region"
          aria-labelledby={`faq-trigger-${index}`}
        >
          <p className="vfaq-answer-text">{faq.a}</p>
        </div>
      )}
    </div>
  );
}

export function VendorsFAQ({ faqs }: VendorsFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="vfaq-section" id="faq" aria-label="Frequently Asked Questions">
      <div className="vfaq-header">
        <div className="vn-section-label">§ FAQ</div>
        <h2 className="vfaq-title">
          Frequently Asked <em>Questions</em>
        </h2>
        <p className="vfaq-subtitle">
          Common questions about where to buy peptides online, legal status, and
          how to verify purity.
        </p>
      </div>

      <div
        className="vfaq-list"
        role="list"
        aria-label="FAQ accordion"
      >
        {faqs.map((faq, i) => (
          <div role="listitem" key={i}>
            <FAQAccordionItem
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          </div>
        ))}
      </div>

      {/* Internal links for SEO / UX */}
      <div className="vfaq-footer">
        <p className="vfaq-footer-text">
          More questions?{" "}
          <Link href="/faq" className="vfaq-footer-link">
            Visit our full Research FAQ
          </Link>{" "}
          or use the{" "}
          <Link href="/tools/coa" className="vfaq-footer-link">
            COA Analyzer
          </Link>{" "}
          to verify any Certificate of Analysis.
        </p>
        <div className="vfaq-disclaimer">
          <HelpCircle size={12} />
          <span>
            PeptiDex is an independent research index. We are not affiliated
            with any vendor. All peptides in this index are for laboratory
            research use only.{" "}
            <Link href="/disclaimer" className="vfaq-footer-link">
              Read full disclaimer →
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
