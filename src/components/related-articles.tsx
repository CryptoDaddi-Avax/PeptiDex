"use client";
import Link from 'next/link';
import { getPostsForPeptide, BlogPost } from '@/data/blog';
import { Newspaper, ArrowRight, Calendar } from 'lucide-react';

interface RelatedArticlesProps {
  peptideName: string;
  aliases: string[];
}

/**
 * "Related Articles" section for peptide detail pages.
 * Automatically finds blog posts that mention this peptide.
 */
export function RelatedArticles({ peptideName, aliases }: RelatedArticlesProps) {
  const posts = getPostsForPeptide(peptideName, aliases);

  if (posts.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Newspaper className="w-4 h-4 text-violet-400" />
        <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">Related Articles</h3>
      </div>
      <div className="space-y-2.5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-start gap-3 p-3.5 rounded-xl bg-zinc-800/40 border border-zinc-700/40 hover:border-violet-500/30 hover:bg-zinc-800/60 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Newspaper className="w-4 h-4 text-violet-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-zinc-200 group-hover:text-violet-300 transition-colors leading-tight line-clamp-2">
                {post.title}
              </h4>
              <p className="text-[11px] text-zinc-500 mt-1 line-clamp-1">{post.excerpt}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 font-semibold uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-zinc-600">
                  <Calendar className="w-3 h-3" />
                  {post.datePublished}
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-violet-400 flex-shrink-0 mt-2 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
