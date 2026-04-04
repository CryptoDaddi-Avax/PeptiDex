const fs = require('fs');
const path = require('path');

const compareDir = path.join(__dirname, 'src', 'app', 'compare');
const compareFolders = fs.readdirSync(compareDir).filter(f => fs.statSync(path.join(compareDir, f)).isDirectory());

compareFolders.forEach(folder => {
    const filePath = path.join(compareDir, folder, 'page.tsx');
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
    
    // Extract title from metadata
    const titleMatch = content.match(/const TITLE = ['"](.*?)['"];/);
    if (titleMatch) {
        let titleForOg = titleMatch[1].split('|')[0].trim();
        // compare titles are usually "Compound A vs Compound B: Details". 
        // We'll keep the whole title as it's often useful.
        titleForOg = titleForOg.replace(':', ''); 
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
        
        // Inject <ShareBar> at the bottom of the article/content
        if (!content.includes('<ShareBar')) {
            content = content.replace(
                /({\/\* ═══════ FAQ ═══════ \*\/})/,
                `<ShareBar title={TITLE} url={\`https://peptidex.app/compare/\${SLUG}\`} />\n\n      $1`
            );
        }
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated compare metadata and sharebar for: ${folder}`);
    }
});
