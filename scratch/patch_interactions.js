const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'stack-interactions.ts');
let source = fs.readFileSync(filePath, 'utf8');

// Replace 266135 with 265572
source = source.replace(/pubmed\.ncbi\.nlm\.nih\.gov\/266135\//g, 'pubmed.ncbi.nlm.nih.gov/265572/');

fs.writeFileSync(filePath, source, 'utf8');
console.log('Successfully patched stack-interactions.ts to use correct PNAS DSIP PMID 265572!');
