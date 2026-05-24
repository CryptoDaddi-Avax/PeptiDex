const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, '..', 'src', 'data', '_lint', 'verified-pmids.ts');
const registrySource = fs.readFileSync(registryPath, 'utf8');

const regex1 = /"(\d{6,8})":\s*\{/g;
const regex2 = /"(\d{7,8})":\s*\{/g;

const pmids1 = [...registrySource.matchAll(regex1)].map(m => m[1]);
const pmids2 = [...registrySource.matchAll(regex2)].map(m => m[1]);

console.log('Using 6-8 digits count:', pmids1.length, 'Includes 862769:', pmids1.includes('862769'));
console.log('Using 7-8 digits count:', pmids2.length, 'Includes 862769:', pmids2.includes('862769'));

const gatePath = path.join(__dirname, '..', 'scripts', 'pmid-gate.mjs');
const gateSource = fs.readFileSync(gatePath, 'utf8');
console.log('Gate source regex for registry:', gateSource.match(/registryPmids.*$/m));
console.log('Gate source extractPmids function:', gateSource.match(/function extractPmids[\s\S]*?}/));
