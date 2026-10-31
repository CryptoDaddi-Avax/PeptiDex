/**
 * Library FAQ compliance filter.
 * Drops any Q&A that covers dosing, reconstitution, injection technique, cycle
 * length, or purchasing. Applied to both the visible FAQ and the FAQPage JSON-LD
 * so the two always match.
 *
 * - Questions are tested with the broad dosing pattern (dose, injection, units,
 *   syringe, reconstitution, cycle length) and the purchase pattern (buy, price,
 *   vendor, coupon...).
 * - Answers are tested with a stricter pattern that only catches actual dosing
 *   instructions (numeric amounts with units, "dosing"/"dosage", reconstitution,
 *   diluent/water mentions, syringes, "units", cycle length) plus vendor /
 *   discount-code mentions. A bare mention of "injection" or "dose" in an answer
 *   (e.g. "injection-site redness" as a side effect) does not drop the Q&A.
 */
const QUESTION_DOSING_PATTERN =
  /\bdos(?:e|es|ed|ing|age|ages)\b|\bre-?dos\w*|\breconstitut\w*|\bbac\w*\s+water\b|\bbacterio\w*|\bsyringes?\b|\bunits\b|\binject\w*|\bcycle (?:length|duration)s?\b|\blength of (?:the |a )?cycle\b/i;

const ANSWER_DOSING_PATTERN =
  /\b\d[\d,.]*\s*(?:(?:-|–|to)\s*\d[\d,.]*\s*)?(?:mcg|µg|mg|iu|ml)\b(?!\/d[lL])|\bdos(?:ing|age|ages)\b|\bre-?dos\w*|\breconstitut\w*|\bbac\w*\s+water\b|\bbacterio\w*|\bsyringes?\b|\bunits\b|\bcycle (?:length|duration)s?\b|\blength of (?:the |a )?cycle\b/i;

const QUESTION_PURCHASE_PATTERN =
  /\b(?:buy|buying|purchas\w*|cost|costs|price|prices|pricing|vendors?|coupon|discount|for sale|order(?:ing)? online)\b|\bwhere (?:can|to|do|should) (?:i |you |we )?(?:get|find|order|source)\b/i;

const ANSWER_PURCHASE_PATTERN =
  /\bPEPTIDEX\b(?! (?:research|library|team))|\bcoupon\b|\bdiscount code\b|\b\d+% off\b|\/tools\/pricing\b/;

interface QA {
  q: string;
  a: string;
}

export function isDosingFaq(faq: QA): boolean {
  return QUESTION_DOSING_PATTERN.test(faq.q) || ANSWER_DOSING_PATTERN.test(faq.a);
}

export function isPurchaseFaq(faq: QA): boolean {
  return QUESTION_PURCHASE_PATTERN.test(faq.q) || ANSWER_PURCHASE_PATTERN.test(faq.a);
}

export function filterDosingFaqs<T extends QA>(faqs: T[]): T[] {
  return faqs.filter((faq) => !isDosingFaq(faq) && !isPurchaseFaq(faq));
}
