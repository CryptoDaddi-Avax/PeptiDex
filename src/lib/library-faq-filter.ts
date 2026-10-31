/**
 * Library FAQ compliance filter.
 * Drops any Q&A whose question or answer covers dosing, reconstitution, injection
 * or cycle length. Applied to both the visible FAQ and the FAQPage JSON-LD so the
 * two always match.
 */
const DOSING_PATTERN =
  /\bdos(?:e|es|ed|ing|age|ages)\b|\bre-?dos\w*|\breconstitut\w*|\bbac water\b|\bbacteriostatic\b|\bsyringes?\b|\bunits\b|\binject\w*|\bcycle (?:length|duration)s?\b|\blength of (?:the |a )?cycle\b/i;

interface QA {
  q: string;
  a: string;
}

export function isDosingFaq(faq: QA): boolean {
  return DOSING_PATTERN.test(faq.q) || DOSING_PATTERN.test(faq.a);
}

export function filterDosingFaqs<T extends QA>(faqs: T[]): T[] {
  return faqs.filter((faq) => !isDosingFaq(faq));
}
