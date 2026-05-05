import ReactMarkdown from 'react-markdown';
import { getPeptideContent } from '@/lib/peptide-content';
import { MedicalDisclaimer } from '@/components/medical-disclaimer';

interface Props {
  slug: string;
}

export function PeptideExpandedContent({ slug }: Props) {
  const content = getPeptideContent(slug);
  if (!content) return null;

  const fm = content.frontmatter;

  const faqEntries = extractFaqEntries(content.body);
  const faqSchema = faqEntries.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqEntries.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null;

  return (
    <section
      id="full-research-profile"
      aria-label="In-depth research profile"
      className="max-w-4xl mx-auto px-4 py-10 md:py-14 border-t border-zinc-800"
    >
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400 px-2 py-1 rounded bg-violet-500/10 border border-violet-500/20">
          § In-Depth Research Profile
        </span>
        {fm.reviewedDate && (
          <span className="text-xs text-zinc-500">
            Last reviewed {fm.reviewedDate}
          </span>
        )}
      </div>

      <article className="peptide-expanded prose prose-invert prose-zinc max-w-none">
        <ReactMarkdown
          components={{
            h1: () => null,
            h2: ({ children }) => (
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-100 mt-10 mb-4 border-b border-zinc-800 pb-2">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg md:text-xl font-bold text-zinc-100 mt-6 mb-3">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed my-3">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="my-3 ml-4 space-y-1.5 text-sm md:text-[15px] text-zinc-300 leading-relaxed list-disc">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="my-3 ml-4 space-y-1.5 text-sm md:text-[15px] text-zinc-300 leading-relaxed list-decimal">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="pl-1">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="my-4 rounded-lg border-l-4 border-violet-500/40 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-300 italic">
                {children}
              </blockquote>
            ),
            table: ({ children }) => (
              <div className="my-4 overflow-x-auto rounded-lg border border-zinc-800">
                <table className="w-full text-sm">{children}</table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-zinc-900 text-zinc-300">{children}</thead>
            ),
            th: ({ children }) => (
              <th className="px-3 py-2 text-left font-bold text-zinc-200 border-b border-zinc-800">
                {children}
              </th>
            ),
            tr: ({ children }) => (
              <tr className="border-b border-zinc-900 last:border-b-0">{children}</tr>
            ),
            td: ({ children }) => (
              <td className="px-3 py-2 text-zinc-300 align-top">{children}</td>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-violet-400 underline hover:text-violet-300 underline-offset-2"
              >
                {children}
              </a>
            ),
            strong: ({ children }) => (
              <strong className="font-bold text-zinc-100">{children}</strong>
            ),
            code: ({ children }) => (
              <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 text-[13px]">
                {children}
              </code>
            ),
            hr: () => <hr className="my-8 border-zinc-800" />,
          }}
        >
          {content.body}
        </ReactMarkdown>
      </article>

      <MedicalDisclaimer variant="compact" className="mt-8" />
    </section>
  );
}

interface FaqEntry {
  question: string;
  answer: string;
}

function extractFaqEntries(body: string): FaqEntry[] {
  const faqHeadingMatch = body.match(/##\s*Frequently Asked Questions[^\n]*\n([\s\S]*?)(?=\n##\s|$)/);
  if (!faqHeadingMatch) return [];

  const faqSection = faqHeadingMatch[1];
  const entries: FaqEntry[] = [];
  const re = /\*\*Q\d+\.\s*([^*]+?)\*\*\s*\n([\s\S]*?)(?=\n\*\*Q\d+\.|\n##\s|$)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(faqSection)) !== null) {
    const question = m[1].trim();
    const answer = m[2]
      .replace(/\{[^}]*\}/g, '')
      .replace(/\[(\d+)\]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 800);
    if (question && answer) entries.push({ question, answer });
  }
  return entries;
}
