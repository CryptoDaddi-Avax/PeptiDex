const fs = require('fs');
const content = fs.readFileSync('src/data/peptides.ts', 'utf8');

const results = [];
const blocks = content.split('p({');
for (const block of blocks.slice(1)) {
    const nameMatch = block.match(/name:\s*"(.*?)"/);
    if (!nameMatch) continue;
    const name = nameMatch[1];
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    if (['semaglutide', 'tirzepatide', 'retatrutide', 'aod-9604', 'tesamorelin', 'mots-c', 'bpc-157', 'ipamorelin', 'cjc-1295', 'sermorelin', 'igf-1-lr3', 'follistatin-344'].includes(slug)) {
        const studies = [];
        const studyRegex = /title:\s*"(.*?)",\s*pubmed_url:\s*"(.*?)",\s*summary:\s*"(.*?)"/g;
        let match;
        while ((match = studyRegex.exec(block)) !== null) {
            studies.push({
                title: match[1],
                pubmed_url: match[2],
                summary: match[3]
            });
        }
        results.push({slug, studies});
    }
}
fs.writeFileSync('studies.json', JSON.stringify(results, null, 2));
console.log('Done');
