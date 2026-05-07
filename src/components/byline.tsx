import Link from 'next/link';
import Image from 'next/image';
import { Calendar, BadgeCheck, Stethoscope, FileSearch } from 'lucide-react';
import { getAuthorBySlug, getAuthorSlug, type Author } from '@/lib/authors';

interface BylineProps {
  author?: string;
  medicallyReviewedBy?: string;
  factCheckedBy?: string;
  reviewedDate?: string;
  publishedDate?: string;
}

function resolveAuthor(input?: string): Author | undefined {
  if (!input) return undefined;
  const direct = getAuthorBySlug(input);
  if (direct) return direct;
  return getAuthorBySlug(getAuthorSlug(input));
}

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function PersonChip({
  author,
  label,
  icon: Icon,
}: {
  author: Author;
  label: string;
  icon: typeof Stethoscope;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Link
        href={`/team/${author.slug}`}
        className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 relative"
        aria-label={`${label}: ${author.name}`}
      >
        {author.photo ? (
          <Image
            src={author.photo}
            alt={author.imageAlt || author.name}
            fill
            className="object-cover"
            sizes="32px"
            unoptimized
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-zinc-300">
            {author.name
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </span>
        )}
      </Link>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
          <Icon className="w-3 h-3" /> {label}
        </p>
        <Link
          href={`/team/${author.slug}`}
          className="text-xs text-zinc-200 font-semibold hover:text-violet-400 transition-colors"
        >
          {author.name}
          {author.title ? <span className="text-zinc-500 font-normal">, {author.title}</span> : null}
        </Link>
      </div>
    </div>
  );
}

export function Byline({
  author,
  medicallyReviewedBy,
  factCheckedBy,
  reviewedDate,
  publishedDate,
}: BylineProps) {
  const a = resolveAuthor(author);
  const r = resolveAuthor(medicallyReviewedBy);
  const f = resolveAuthor(factCheckedBy);
  const reviewedFmt = formatDate(reviewedDate);
  const publishedFmt = formatDate(publishedDate);

  if (!a && !r && !f) return null;

  return (
    <section
      aria-label="Article byline and review credits"
      className="rounded-xl bg-zinc-900/40 border border-zinc-800 p-4 my-6"
    >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {a && <PersonChip author={a} label="Author" icon={BadgeCheck} />}
        {r && <PersonChip author={r} label="Medically Reviewed By" icon={Stethoscope} />}
        {f && <PersonChip author={f} label="Fact Checked By" icon={FileSearch} />}
      </div>
      {(reviewedFmt || publishedFmt) && (
        <div className="mt-3 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-zinc-500">
          {publishedFmt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> Published {publishedFmt}
            </span>
          )}
          {reviewedFmt && (
            <span className="flex items-center gap-1.5">
              <Stethoscope className="w-3 h-3" /> Reviewed {reviewedFmt}
            </span>
          )}
          <Link
            href="/editorial-process"
            className="ml-auto text-violet-400 hover:text-violet-300 underline-offset-2 hover:underline"
          >
            How we review
          </Link>
        </div>
      )}
    </section>
  );
}
