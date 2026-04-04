const fs = require('fs');
const path = require('path');

const compareDir = path.join(__dirname, 'src', 'app', 'compare');
const compareFolders = fs.readdirSync(compareDir).filter(f => fs.statSync(path.join(compareDir, f)).isDirectory());

compareFolders.forEach(folder => {
    const filePath = path.join(compareDir, folder, 'page.tsx');
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Add imports if not present
    if (!content.includes('import { Breadcrumbs }') && !content.includes('import { AutoLink }')) {
        content = content.replace(
            /(import type { Metadata }.*?;\n)/,
            `$1import { Breadcrumbs } from '@/components/breadcrumbs';\nimport { AutoLink } from '@/components/auto-link';\n`
        );
        modified = true;
    }

    // 2. Remove old breadcrumbSchema tag
    if (content.includes('JSON.stringify(breadcrumbSchema)')) {
        content = content.replace(/<script[^>]*dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(breadcrumbSchema\)\s*\}\}\s*\/>\s*/g, '');
        modified = true;
    }

    // 3. Replace static breadcrumb nav
    if (content.includes('<nav className="flex flex-wrap items-center gap-1.5')) {
        const titleMatch = content.match(/<span className="text-zinc-300 font-medium">(.*?)<\/span>/);
        const title = titleMatch ? titleMatch[1] : folder;
        
        content = content.replace(
            /<nav className="flex flex-wrap items-center gap-1\.5[^>]*>[\s\S]*?<\/nav>/,
            `<Breadcrumbs items={[\n        { name: 'Home', url: 'https://peptidex.app/' },\n        { name: 'Compare', url: 'https://peptidex.app/compare' },\n        { name: '${title}' }\n      ]} />`
        );
        modified = true;
    }

    // 4. Wrap <article> with <AutoLink>
    if (!content.includes('<AutoLink>\n      <article')) {
        content = content.replace(/(<article[^>]*>)/, '<AutoLink>\n      $1');
        content = content.replace(/(<\/article>)/, '$1\n      </AutoLink>');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: compare/${folder}`);
    }
});
