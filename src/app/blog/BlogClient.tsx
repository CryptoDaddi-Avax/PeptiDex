"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Calendar, User, Clock, BookOpen, Rss } from 'lucide-react';
import { getAllPosts, BLOG_CATEGORIES, formatDate } from '@/data/blog';
import type { BlogCategory } from '@/data/blog';
import './blog-redesign.css';

export default function BlogClient() {
    const allPosts = getAllPosts();
    const [filter, setFilter] = useState<BlogCategory | "All">("All");

    const displayedPosts = filter === "All" ? allPosts : allPosts.filter(p => p.category === filter);
    const featured = displayedPosts[0];
    const gridPosts = displayedPosts.slice(1);

    return (
        <div className="blog-wrap">
            <nav className="blog-breadcrumbs">
                <Link href="/">Home</Link>
                <ChevronRight style={{width: 14}} />
                <span>Blog</span>
            </nav>

            <header className="blog-header">
                <div className="blog-header-inner">
                    <div style={{maxWidth: 600}}>
                        <p className="blog-subtitle">Peptide Science, Research News & Analysis</p>
                        <h1 className="blog-title">PeptideX Blog</h1>
                        <p className="blog-desc">Evidence-based analysis of clinical studies, emerging compound trends, regulatory developments, and the science behind peptide therapies. Every claim is cited. Every article is reviewed.</p>
                    </div>
                    <div>
                        <Link href="/blog/rss.xml" className="blog-rss"><Rss style={{width:14}}/> RSS Feed</Link>
                    </div>
                </div>
            </header>

            <div className="blog-filters">
                <button onClick={() => setFilter("All")} className={`blog-filter-btn ${filter === "All" ? "active" : ""}`}>All</button>
                {BLOG_CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`blog-filter-btn ${filter === cat ? "active" : ""}`}>{cat}</button>
                ))}
            </div>

            {featured && (
                <Link href={`/blog/${featured.slug}`} className="blog-feat">
                    <div className="blog-feat-img">
                        {featured.image ? (
                            <Image src={featured.image} alt={featured.imageAlt || featured.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" unoptimized referrerPolicy="no-referrer" />
                        ) : (
                            <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                <BookOpen style={{width:48, height:48, color:'var(--line-strong)'}}/>
                            </div>
                        )}
                    </div>
                    <div className="blog-feat-content">
                        <div className="blog-feat-meta">
                            <span className="blog-meta-tag">Latest</span>
                            <span className="blog-feat-cat">{featured.category}</span>
                        </div>
                        <h2 className="blog-feat-title">{featured.title}</h2>
                        <p className="blog-feat-excerpt">{featured.excerpt}</p>
                        <div className="blog-meta-footer">
                            <span className="blog-meta-item"><User style={{width:14}}/> {featured.author}</span>
                            <span className="dot" />
                            <span className="blog-meta-item"><Calendar style={{width:14}}/> {formatDate(featured.datePublished)}</span>
                            <span className="dot" />
                            <span className="blog-meta-item"><Clock style={{width:14}}/> {featured.readingTime}</span>
                        </div>
                    </div>
                </Link>
            )}

            <div className="blog-grid">
                {gridPosts.map(post => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                        <div className="blog-card-img">
                            {post.image ? (
                                <Image src={post.image} alt={post.imageAlt || post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" unoptimized referrerPolicy="no-referrer" />
                            ) : (
                                <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <BookOpen style={{width:32, height:32, color:'var(--line-strong)'}}/>
                                </div>
                            )}
                            <span className="blog-card-cat" style={{
                                borderColor: post.category === 'Research News' ? 'rgba(52, 211, 153, 0.3)' : 'rgba(139, 92, 246, 0.3)',
                                color: post.category === 'Research News' ? '#6ee7b7' : '#c4b5fd'
                            }}>{post.category}</span>
                        </div>
                        <div className="blog-card-content">
                            <h2 className="blog-card-title">{post.title}</h2>
                            <p className="blog-card-excerpt">{post.excerpt}</p>
                            <div className="blog-card-footer">
                                <span className="blog-meta-item"><User style={{width:12}}/> {post.author}</span>
                                <span className="blog-meta-item"><Calendar style={{width:12}}/> {formatDate(post.datePublished)}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="blog-seo">
                <h2>About This Blog</h2>
                <p>The PeptideX Blog is a peer-cited educational resource covering the most important developments in peptide science. Our editorial team reviews published research from PubMed-indexed journals, FDA regulatory filings, and registered clinical trials to deliver accurate, accessible analysis. We do not accept paid placements or sponsored content. All claims are supported by cited sources.</p>
                <p>All content is for educational purposes only. PeptideX does not sell peptides or make therapeutic claims.</p>
            </div>
        </div>
    );
}
