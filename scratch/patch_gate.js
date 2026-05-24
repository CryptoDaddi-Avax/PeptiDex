const fs = require('fs');
const path = require('path');

const gatePath = path.join(__dirname, '..', 'scripts', 'pmid-gate.mjs');
let source = fs.readFileSync(gatePath, 'utf8');

// Replace \d{7,8} with \d{6,8}
source = source.replace(/\\d\{7,8\}/g, '\\d{6,8}');

fs.writeFileSync(gatePath, source, 'utf8');
console.log('Successfully patched pmid-gate.mjs to support 6-8 digit PMIDs!');
