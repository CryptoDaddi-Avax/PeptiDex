const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'src', 'app', 'blog');
const blogFolders = fs.readdirSync(blogsDir).filter(f => fs.statSync(path.join(blogsDir, f)).isDirectory());

blogFolders.forEach(folder => {
    const filePath = path.join(blogsDir, folder, 'page.tsx');
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Add import ShareBar
    if (!content.includes('import { ShareBar }')) {
        content = content.replace(
            /(import { Breadcrumbs }.*?;)/,
            `$1\nimport { ShareBar } from '@/components/share-bar';`
        );
        modified = true;
    }

    // Replace metadata block to ensure dynamic OG tags using regex
    // We already have openGraph and twitter blocks, but let's replace the 'images' line in both
    // Look for `url: '/og-image.png'` or similar
    
    // Extract title from metadata
    const titleMatch = content.match(/title:\s*['"](.*?)['"]/);
    if (titleMatch) {
        const titleForOg = titleMatch[1].split('|')[0].trim();
        const encodedTitle = encodeURIComponent(titleForOg);
        
        // replace OG image array
        content = content.replace(
            /images:\s*\[\{.*?\}\],/g,
            `images: [{ url: 'https://peptidex.app/api/og?title=${encodedTitle}', width: 1200, height: 630 }],`
        );
        content = content.replace(
            /images:\s*\['\/og-image\.png'\],/g,
            `images: ['https://peptidex.app/api/og?title=${encodedTitle}'],`
        );
        
        // Inject <ShareBar> at the bottom before <RelatedPosts>
        if (!content.includes('<ShareBar')) {
            content = content.replace(
                /<RelatedPosts currentSlug="(.*?)" \/>/,
                `<ShareBar title="${titleForOg}" url="https://peptidex.app/blog/${folder}" />\n  <RelatedPosts currentSlug="$1" />`
            );
        }
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated blog metadata and sharebar for: ${folder}`);
    }
});
