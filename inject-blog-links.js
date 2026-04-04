const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'src', 'app', 'blog');
const blogFolders = fs.readdirSync(blogsDir).filter(f => fs.statSync(path.join(blogsDir, f)).isDirectory());

blogFolders.forEach(folder => {
    const filePath = path.join(blogsDir, folder, 'page.tsx');
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Add imports if not present
    if (!content.includes('import { Breadcrumbs }') && !content.includes('import { RelatedPosts }')) {
        content = content.replace(
            /(import type { Metadata }.*?;\n)/,
            `$1import { Breadcrumbs } from '@/components/breadcrumbs';\nimport { AutoLink } from '@/components/auto-link';\nimport { RelatedPosts } from '@/components/related-posts';\n`
        );
        modified = true;
    }

    // 2. Remove old breadcrumbSchema tag
    if (content.includes('JSON.stringify(breadcrumbSchema)')) {
        content = content.replace(/<script[^>]*dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(breadcrumbSchema\)\s*\}\}\s*\/>\s*/g, '');
        modified = true;
    }

    // 3. Replace static breadcrumb nav (regex heuristic)
    if (content.includes('<nav className="flex flex-wrap items-center gap-2')) {
        // Find the title from the metadata or header
        const titleMatch = content.match(/<span className="text-[^"]+">(.*?)<\/span>/);
        const title = titleMatch ? titleMatch[1] : folder;
        
        content = content.replace(
            /<nav className="flex flex-wrap items-center gap-2[^>]*>[\s\S]*?<\/nav>/,
            `<Breadcrumbs items={[\n        { name: 'Home', url: 'https://peptidex.app/' },\n        { name: 'Blog', url: 'https://peptidex.app/blog' },\n        { name: '${title}' }\n      ]} />`
        );
        modified = true;
    }

    // 4. Wrap <article> with <AutoLink>
    if (!content.includes('<AutoLink>\n      {/* Article Content */}')) {
        // We will wrap the <article> tag block
        content = content.replace(/(<article[^>]*>)/, '<AutoLink>\n      $1');
        content = content.replace(/(<\/article>)/, '$1\n      </AutoLink>');
        modified = true;
    }

    // 5. Inject <RelatedPosts> at the end
    if (!content.includes('<RelatedPosts')) {
        content = content.replace(
            /(<\/div>\n\s*);\n\}/,
            `  <RelatedPosts currentSlug="${folder}" />\n    $1`
        );
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${folder}`);
    }
});
