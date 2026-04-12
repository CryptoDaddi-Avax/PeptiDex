const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src/app/blog');
const dirs = fs.readdirSync(blogDir).filter(f => fs.statSync(path.join(blogDir, f)).isDirectory());

const importStatement = `import { BlogVendorCallout } from '@/components/blog-vendor-callout';\n`;
const calloutComponent = `\n      <BlogVendorCallout />\n\n`;

const inContentText = `<p className="p-4 bg-violet-900/10 border border-violet-500/20 rounded-xl my-6 text-zinc-300">\n            For researchers sourcing these compounds, <a href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" target="_blank" rel="noopener noreferrer" className="font-semibold text-violet-400 hover:underline">Amino Club provides COA-verified peptides with documented purity testing. Browse peptides &rarr;</a>\n          </p>`;

let modifiedCount = 0;

for (const dir of dirs) {
    const pagePath = path.join(blogDir, dir, 'page.tsx');
    if (!fs.existsSync(pagePath)) continue;

    let content = fs.readFileSync(pagePath, 'utf8');

    // 1. Add import if missing
    if (!content.includes('BlogVendorCallout')) {
        // Find last import
        const lines = content.split('\n');
        let lastImportIdx = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('import ')) lastImportIdx = i;
        }
        if (lastImportIdx !== -1) {
            lines.splice(lastImportIdx + 1, 0, importStatement.trim());
            content = lines.join('\n');
        }
    }

    // 2. Add Component if missing
    if (!content.includes('<BlogVendorCallout />')) {
        // Insert before <AuthorBio
        content = content.replace(/(\s*)(<AuthorBio)/, `$1${calloutComponent.trim()}$1$2`);
    }

    // 3. Add In-Content Mention if missing
    if (!content.includes('For researchers sourcing these compounds')) {
        // Find the ideal injection point. 
        // We'll target an h2 or h3 halfway through or relating to purity/safety/vendor.
        // If not found, target after the third paragraph inside the main rendering.

        const purityRegex = /(<h[23][^>]*>.*?(?:Purity|Safety|Vendor|Risk|Sourcing).*?<\/h[23]>)/i;
        if (purityRegex.test(content)) {
            // Found a purity section. Let's insert the mention right AFTER this header.
            content = content.replace(purityRegex, `$1\n          ${inContentText}\n`);
        } else {
            // Fallback: inject after the 2nd paragraph of the article.
            // A typical post has `<p>` tags inside `<main`.
            
            // This regex finds the beginning of <main, then skips two closing </p> tags
            const mainContentMatch = content.match(/<main.*?>[\s\S]*?<\/p>[\s\S]*?<\/p>/);
            
            if (mainContentMatch) {
                const indexToInsert = mainContentMatch.index + mainContentMatch[0].length;
                content = content.slice(0, indexToInsert) + `\n          ${inContentText}\n` + content.slice(indexToInsert);
            } else {
                console.log(`Could not find a place to inject in ${dir}`);
            }
        }
    }

    fs.writeFileSync(pagePath, content, 'utf8');
    modifiedCount++;
}

console.log(`Successfully processed ${modifiedCount} blog posts.`);
