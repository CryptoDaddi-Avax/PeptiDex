import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/saved', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'Google-Extended', 'PerplexityBot', 'OAI-SearchBot'],
        allow: '/',
      }
    ],
    sitemap: 'https://peptidex.app/sitemap.xml',
  };
}
