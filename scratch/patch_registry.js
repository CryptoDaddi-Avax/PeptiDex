const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, '..', 'src', 'data', '_lint', 'verified-pmids.ts');
let source = fs.readFileSync(registryPath, 'utf8');

const entry = `    "265572": {
        authors: "Schoenenberger GA, Monnier M",
        title: "Characterization of a delta-electroencephalogram (-sleep)-inducing peptide",
        journal: "Proc Natl Acad Sci U S A",
        year: 1977,
        verified_date: "2026-05-24",
        verified_by: "Antigravity/NLM-API"
    },
};`;

source = source.replace(/\};\s*$/, entry);

fs.writeFileSync(registryPath, source, 'utf8');
console.log('Successfully added Schoenenberger 1977 (265572) sleep paper to registry verified-pmids.ts!');
