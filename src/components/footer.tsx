import Link from 'next/link';
import { ShieldAlert, BookOpen, Beaker, HelpCircle, ArrowRight, GraduationCap, Store, FlaskConical, Tag } from 'lucide-react';
import { getAllPosts } from '@/data/blog';
import { PromoCodeDisplay } from '@/components/promos/PromoCodeDisplay';
import { PRIMARY_PROMO } from '@/lib/promos/config';

export function Footer() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 mt-12 pb-24 md:pb-12" role="contentinfo">
      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* Research Disclaimer — Full block for SEO authority */}
        <div className="mb-10 rounded-xl bg-amber-950/15 border border-amber-500/15 p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Research Disclaimer</p>
              <p className="text-xs text-amber-400/70 leading-relaxed">
                All information on PeptiDex is for educational and research purposes only. None of the compounds discussed are FDA-approved for human consumption unless explicitly noted (e.g., Semaglutide under prescription). Always consult a qualified medical professional before considering any peptide protocol. The vendors listed operate as raw chemical and laboratory supply companies. Their products are intended solely for authorized laboratory, educational, and research purposes. PeptiDex does not sell, distribute, or endorse any compound for human or animal use.
              </p>
              {/* Affiliate disclosure — immediately below research disclaimer */}
              <p className="text-[10px] text-amber-400/40 leading-relaxed mt-2 border-t border-amber-500/10 pt-2">
                PeptiDex participates in affiliate programs. We may earn a commission on verified vendor purchases at no extra cost to you.{" "}
                <Link href="/about/methodology" className="underline hover:text-amber-400/70">See our methodology.</Link>
              </p>
            </div>
          </div>
        </div>

        {/* Reader Discount — persistent promo reminder */}
        {PRIMARY_PROMO.isActive && (
          <div className="mb-8 flex items-center gap-3 px-4 py-3 rounded-xl border border-amber-500/15 bg-amber-950/10">
            <Tag className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-xs text-zinc-400">
              Reader discount:{" "}
              <PromoCodeDisplay
                promo={PRIMARY_PROMO}
                surface="footer_reminder"
                variant="inline"
              />
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Column 1: Brand */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-xl font-bold text-zinc-100">PeptiDex</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              The independent, evidence-based peptide research index. Trusted by researchers worldwide.
            </p>
          </div>

          {/* Column 2: Learn & Research (Educational Hub) */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-400" /> Learn & Research
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/intro" className="hover:text-blue-400 transition-colors">Peptide 101 Hub</Link></li>
              <li><Link href="/library" className="hover:text-blue-400 transition-colors">Peptide Library</Link></li>
              <li><Link href="/tools/evidence" className="hover:text-blue-400 transition-colors">Evidence Dashboard</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5"/> Research Blog</Link></li>
              <li><Link href="/faq" className="hover:text-blue-400 transition-colors flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5"/> FAQ</Link></li>
            </ul>
          </div>

          {/* Column 3: Compare & Source (Commercial Tool) */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest flex items-center gap-1.5">
              <Store className="w-4 h-4 text-emerald-400" /> Compare & Source
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/vendors" className="hover:text-emerald-400 transition-colors">Vendor Reviews</Link></li>
              <li><Link href="/tools/pricing" className="hover:text-emerald-400 transition-colors">Price Comparison</Link></li>
              <li><Link href="/tools/compare" className="hover:text-emerald-400 transition-colors">Compare Tool</Link></li>
              <li><Link href="/tools/cycle-planner" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"><FlaskConical className="w-3.5 h-3.5"/> Cycle Planner</Link></li>
              <li><Link href="/stacks" className="hover:text-emerald-400 transition-colors">Community Stacks</Link></li>
            </ul>
          </div>

          {/* Column 4: Recent Articles */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-violet-400" /> Recent Articles
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              {recentPosts.map(post => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="hover:text-violet-400 transition-colors flex items-center gap-2 group line-clamp-2 leading-tight">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-zinc-600">
          <p>&copy; {new Date().getFullYear()} PeptiDex. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/about" className="hover:text-zinc-400 transition-colors">About Us</Link>
            <Link href="/team" className="hover:text-zinc-400 transition-colors">Team &amp; Reviewers</Link>
            <Link href="/editorial-process" className="hover:text-zinc-400 transition-colors">Editorial Process</Link>
            <Link href="/corrections" className="hover:text-zinc-400 transition-colors">Corrections</Link>
            <Link href="/about/methodology" className="hover:text-zinc-400 transition-colors">Methodology</Link>
            <Link href="/disclaimer" className="hover:text-zinc-400 transition-colors">Medical Disclaimer</Link>
            <Link href="/legal" className="hover:text-zinc-400 transition-colors">Privacy &amp; Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
