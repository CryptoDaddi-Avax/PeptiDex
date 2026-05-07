import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/tools/'],
        disallow: ['/admin', '/saved', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'Google-Extended', 'PerplexityBot', 'OAI-SearchBot'],
        allow: ['/', '/tools/'],
      }
    ],
    sitemap: 'https://peptidex.app/sitemap.xml',
  };
}
