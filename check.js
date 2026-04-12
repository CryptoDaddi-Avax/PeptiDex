const fs = require('fs');

async function run() {
    const content = fs.readFileSync('c:/Users/ender/.gemini/antigravity/peptide-app/src/data/peptides.ts', 'utf8');
    const matches = [...content.matchAll(/name:\s*"(.*?)"/g)];
    const slugs = matches.map(m => m[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    
    for (const slug of slugs) {
        try {
            const res = await fetch('https://www.aminoclub.com/us/products/' + slug);
            console.log(slug + ': ' + res.status);
        } catch(e) {
            console.log(slug + ': ' + e.message);
        }
    }
}

run();
