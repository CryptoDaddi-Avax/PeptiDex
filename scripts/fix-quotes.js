const fs = require('fs');
const path = require('path');
const f = path.resolve('src/data/matchups.ts');
let code = fs.readFileSync(f, 'utf8');
code = code.replace(/href=\\"/g, "href='").replace(/\\" class=\\"/g, "' class='").replace(/\\">/g, "'>");
fs.writeFileSync(f, code);
console.log('Fixed quotes in matchups.ts');
