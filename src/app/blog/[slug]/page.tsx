import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AutoLink } from '@/components/auto-link';
import Link from 'next/link';
import { Calendar, User, BookOpen } from 'lucide-react';
import { ShareBar } from '@/components/share-bar';
import { CiteThisPage } from '@/components/cite-page';
import { AuthorBio } from '@/components/author-bio';
import { FeedbackModal } from '@/components/feedback-modal';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { getAuthorSlug } from '@/data/authors';
import { getPostBySlug, getAllSlugs } from '@/lib/markdown';
import ReactMarkdown from 'react-markdown';
import { AffiliateLink } from '@/components/affiliate-link';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema';

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.frontmatter.title} | PeptiDex Research Blog`,
    description: post.frontmatter.description,
    alternates: { canonical: `https://peptidex.app/blog/${params.slug}` },
    openGraph: {
      type: 'article',
      url: `https://peptidex.app/blog/${params.slug}`,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      siteName: 'PeptiDex',
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { title, description, publishDate, lastReviewed, author, faqSchema, readingTime } = post.frontmatter;
  const canonical = `https://peptidex.app/blog/${params.slug}`;

  const articleSchema = buildArticleSchema({
    headline: title,
    description: description,
    datePublished: publishDate,
    dateModified: lastReviewed,
    author: { name: author || 'PeptiDex Editorial', url: `https://peptidex.app/about/${getAuthorSlug(author || 'PeptiDex Editorial')}` },
    url: canonical
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://peptidex.app/' },
    { name: 'Blog', url: 'https://peptidex.app/blog' },
    { name: title, url: canonical }
  ]);

  const parsedFaqSchema = typeof faqSchema === 'string' ? JSON.parse(faqSchema) : faqSchema;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {parsedFaqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(parsedFaqSchema) }} />
      )}

      <Breadcrumbs items={[
        { name: 'Home', url: 'https://peptidex.app/' },
        { name: 'Blog', url: 'https://peptidex.app/blog' },
        { name: title }
      ]} />

      <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-4">
        <p className="text-sm text-amber-400/80 leading-relaxed font-medium">
          <strong>EDUCATIONAL CONTENT:</strong> {SHORT_DISCLAIMER}
        </p>
      </div>

      <header className="space-y-6 border-b border-zinc-800/50 pb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-violet-400" />
            <Link href={`/about/${getAuthorSlug(author || 'PeptiDex Editorial')}`} className="font-semibold text-zinc-200 hover:text-violet-400 transition-colors">{author || 'PeptiDex Editorial'}</Link>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span className="text-emerald-400 font-medium">{readingTime || '12 Min Read'}</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-zinc-500" />
            <span>{publishDate}</span>
          </div>
        </div>
        <ShareBar title={title} url={canonical} />
      </header>

      <AutoLink>
        <article className="prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:text-zinc-200 prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-zinc-800 prose-h3:text-xl prose-h3:text-zinc-300 prose-p:text-zinc-300 prose-p:leading-loose prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-200 prose-ul:text-zinc-300 prose-li:marker:text-emerald-500">
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => {
                if (props.href?.includes('aminoclub.com')) {
                  return (
                    <AffiliateLink
                      href={props.href}
                      vendor="amino_club"
                      source="blog_inline"
                      className="font-bold text-emerald-400 underline"
                    >
                      {props.children}
                    </AffiliateLink>
                  );
                }
                return <a {...props} />;
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </AutoLink>

      <div className="mb-12 mt-12">
        <CiteThisPage title={title} url={canonical} />
      </div>

      <AuthorBio name={author || 'PeptiDex Editorial'} />

      <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50 text-xs text-zinc-600">
        <span>Last fact-checked: <time dateTime={lastReviewed}>{lastReviewed}</time></span>
        <FeedbackModal pageUrl={canonical} />
      </div>

    </div>
  );
}
