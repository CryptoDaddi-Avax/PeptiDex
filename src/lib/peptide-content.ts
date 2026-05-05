import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'peptides');

export interface PeptideReference {
  id: number;
  authors: string;
  year: number;
  title: string;
  journal: string;
  url: string;
  type: string;
}

export interface PeptideContentFrontmatter {
  slug: string;
  displayName: string;
  title: string;
  quickAnswer: string;
  author?: string;
  medicallyReviewedBy?: string | null;
  factCheckedBy?: string | null;
  reviewedDate?: string;
  relatedStacks?: string[];
  relatedGoals?: string[];
  relatedComparisons?: string[];
  references?: PeptideReference[];
}

export interface PeptideContent {
  slug: string;
  frontmatter: PeptideContentFrontmatter;
  body: string;
}

const _cache = new Map<string, PeptideContent | null>();

export function getPeptideContent(slug: string): PeptideContent | null {
  if (_cache.has(slug)) return _cache.get(slug)!;

  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    _cache.set(slug, null);
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const fm = data as PeptideContentFrontmatter;

  const body = transformBody(content, fm);

  const result: PeptideContent = {
    slug: fm.slug ?? slug,
    frontmatter: fm,
    body,
  };
  _cache.set(slug, result);
  return result;
}

export function hasPeptideContent(slug: string): boolean {
  return getPeptideContent(slug) !== null;
}

function transformBody(content: string, fm: PeptideContentFrontmatter): string {
  let out = content;

  out = out.replace(/\{frontmatter\.quickAnswer\}/g, fm.quickAnswer ?? '');
  out = out.replace(/\{frontmatter\.reviewedDate\}/g, fm.reviewedDate ?? 'the date this profile was last reviewed');
  out = out.replace(/\{frontmatter\.displayName\}/g, fm.displayName ?? '');

  out = out.replace(
    /\{\/\*\s*TODO:\s*([\s\S]*?)\s*\*\/\}/g,
    (_match, body: string) => {
      const cleaned = body.replace(/\s+/g, ' ').trim();
      return `\n> **TODO — verification needed.** ${cleaned}\n`;
    }
  );

  out = out.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

  return out.trim();
}

export function countWords(content: PeptideContent): number {
  const stripped = content.body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return stripped ? stripped.split(/\s+/).length : 0;
}

export function countCitations(content: PeptideContent): number {
  return content.frontmatter.references?.length ?? 0;
}

export function countTodos(content: PeptideContent): number {
  return (content.body.match(/TODO — verification needed/g) ?? []).length;
}
