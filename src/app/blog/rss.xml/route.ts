import { getAllPosts } from '@/data/blog';

export async function GET() {
  const posts = getAllPosts();
  const baseUrl = 'https://peptidex.app';

  const rssItems = posts.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.datePublished + 'T12:00:00Z').toUTCString()}</pubDate>
      <author>contact@peptidex.app (${post.author})</author>
      <category>${post.category}</category>
    </item>`).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>PeptideX Blog — Peptide Science, Research News &amp; Analysis</title>
    <link>${baseUrl}/blog</link>
    <description>Evidence-based peptide research analysis, clinical study breakdowns, regulatory updates, and the science behind peptide therapies.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>PeptideX Blog</title>
      <link>${baseUrl}/blog</link>
    </image>
    <copyright>© ${new Date().getFullYear()} PeptideX. All rights reserved.</copyright>
    <managingEditor>contact@peptidex.app (PeptideX Editorial)</managingEditor>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
