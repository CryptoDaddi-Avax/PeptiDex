import { Project, SyntaxKind } from 'ts-morph';
import fs from 'fs';
import path from 'path';

// Parse domain stopwords (read the ts file directly or import)
const stopwordsSource = fs.readFileSync(path.resolve(process.cwd(), 'src/data/_lint/domain-stopwords.ts'), 'utf8');
const domainStopwords = (stopwordsSource.match(/"([^"]+)"/g) || []).map(w => w.replace(/"/g, '').toLowerCase());

const project = new Project({
  tsConfigFilePath: 'tsconfig.json',
});

// Read verified PMIDs
const verifiedPmidsSource = fs.readFileSync(path.resolve(process.cwd(), 'src/data/_lint/verified-pmids.ts'), 'utf8');
const verifiedPmidsKeys = Array.from(verifiedPmidsSource.matchAll(/"(\d{5,8})":/g)).map(m => m[1]);

// Utility to calculate Jaccard similarity of words
function calculateSimilarity(textA, textB, applyStopwords = false) {
  const getWords = (text) => {
    let words = (text.toLowerCase().match(/\b[a-z0-9-]+\b/g) || []);
    if (applyStopwords) {
      words = words.filter(w => !domainStopwords.includes(w));
    }
    return new Set(words);
  };
  
  const wordsA = getWords(textA);
  const wordsB = getWords(textB);
  
  if (wordsA.size === 0 && wordsB.size === 0) return 0;
  
  let intersection = 0;
  for (const word of wordsA) {
    if (wordsB.has(word)) intersection++;
  }
  
  const union = wordsA.size + wordsB.size - intersection;
  return intersection / union;
}

// Word count utility
function countWords(text) {
  return (text.match(/\b\w+\b/g) || []).length;
}

// Extract PMIDs
function getPMIDs(text) {
  const matches = text.match(/PMID:\s*(\d+)/gi) || [];
  return matches.map(m => m.replace(/PMID:\s*/i, ''));
}

// Count first person tokens
function checkFirstPersonDensity(text, wordCount) {
  const firstPersonTokens = ["\\bi\\b", "\\bmy\\b", "\\bi've\\b", "\\bi'm\\b", "\\bi'd\\b", "i pulled", "my protocol", "n=1"];
  const regex = new RegExp(`(${firstPersonTokens.join('|')})`, 'gi');
  const count = (text.match(regex) || []).length;
  
  const expected = wordCount / 200;
  const required = expected * 0.5; // <50% of expected fails
  
  return { count, expected, required, pass: count >= required };
}

const FILES_TO_CHECK = [
  { path: 'src/data/guides.ts', varName: 'guides', minWords: 1200 },
  { path: 'src/data/research.ts', varName: 'researchArticles', minWords: 1200 },
  { path: 'src/data/where-to-buy-spokes.ts', varName: 'whereToBuyArticles', minWords: 1500 },
  { path: 'src/data/coupon-spokes.ts', varName: 'couponArticles', minWords: 1500 },
  { path: 'src/data/cost-analysis-spokes.ts', varName: 'costAnalysisArticles', minWords: 1500 },
  { path: 'src/data/calculator-spokes.ts', varName: 'calculatorArticles', minWords: 1200 },
  { path: 'src/data/matchups.ts', varName: 'matchups', minWords: 1200 },
];

let hasErrors = false;

for (const fileDef of FILES_TO_CHECK) {
  const filePath = path.resolve(process.cwd(), fileDef.path);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}, skipping...`);
    continue;
  }
  
  const sourceFile = project.getSourceFileOrThrow(fileDef.path);
  const arrayDeclaration = sourceFile.getVariableDeclaration(fileDef.varName);
  
  if (!arrayDeclaration) {
    console.error(`❌ Could not find exported array '${fileDef.varName}' in ${fileDef.path}`);
    hasErrors = true;
    continue;
  }

  const arrayLiteral = arrayDeclaration.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
  if (!arrayLiteral) continue;

  const elements = arrayLiteral.getElements();
  const entries = [];

  for (const element of elements) {
    if (element.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
    const fullText = element.getText();
    const slugProp = element.getProperty('slug');
    let slug = 'unknown';
    if (slugProp && slugProp.getKind() === SyntaxKind.PropertyAssignment) {
      const init = slugProp.getInitializer();
      if (init) slug = init.getText().replace(/['"]/g, '');
    }
    entries.push({ slug, fullText });
  }

  console.log(`\nAnalyzing ${fileDef.path} (${entries.length} entries)...`);

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const words = countWords(entry.fullText);
    
    // Skip empty/scaffold entries
    if (words < 100) {
      console.log(`⚠️ [${fileDef.varName} / ${entry.slug}] Skipped (empty/scaffold)`);
      continue;
    }

    // 1. Word Count Check
    if (words < fileDef.minWords) {
      console.error(`❌ [${fileDef.varName} / ${entry.slug}] Word count ${words} is below minimum ${fileDef.minWords}`);
      hasErrors = true;
    } else {
      console.log(`✅ [${fileDef.varName} / ${entry.slug}] Word count: ${words}`);
    }

    // 2. Citation Check
    const pmidsFound = getPMIDs(entry.fullText);
    
    // De-duplicate PMIDs
    const uniquePmids = [...new Set(pmidsFound)];
    
    // Check citation count
    let citationCount = uniquePmids.length;
    // We also look for citations array just in case they used DOIs instead of PMIDs
    const citationsMatch = entry.fullText.match(/citations:\s*\[(.*?)\]/s);
    if (citationsMatch && citationCount === 0) {
       citationCount = (citationsMatch[1].match(/['"]/g) || []).length / 2;
    }
    
    if (citationCount < 2) {
      console.error(`❌ [${fileDef.varName} / ${entry.slug}] Less than 2 citations found (${citationCount})`);
      hasErrors = true;
    } else {
      console.log(`✅ [${fileDef.varName} / ${entry.slug}] Citations found: ${Math.floor(citationCount)}`);
    }

    // Verify PMIDs against registry
    for (const pmid of uniquePmids) {
      if (!/^\d{5,8}$/.test(pmid)) {
        console.error(`❌ [${fileDef.varName} / ${entry.slug}] Invalid PMID format: ${pmid}`);
        hasErrors = true;
      } else if (!verifiedPmidsKeys.includes(pmid)) {
        console.error(`❌ [${fileDef.varName} / ${entry.slug}] PMID ${pmid} not in verified registry. Run citation verification before shipping.`);
        hasErrors = true;
      }
    }

    // 3. Link Audit
    const links = (entry.fullText.match(/href=['"`](.*?)['"`]/g) || []);
    let hasCoupon = false;
    let hasPillar = false;
    let crossClusterCount = 0;
    
    for (const link of links) {
      if (link.includes('peptidex-coupon')) hasCoupon = true;
      if (link.includes('/library/')) hasPillar = true;
      if (link.includes('/vs/') || link.includes('/where-to-buy/') || link.includes('/guides/') || link.includes('/research/') || link.includes('/tools/')) {
        crossClusterCount++;
      }
    }

    if (!hasCoupon || !hasPillar || crossClusterCount < 2) {
      console.error(`❌ [${fileDef.varName} / ${entry.slug}] Link audit failed. (Coupon: ${hasCoupon}, Pillar: ${hasPillar}, Cross-Cluster: ${crossClusterCount})`);
      hasErrors = true;
    } else {
      console.log(`✅ [${fileDef.varName} / ${entry.slug}] Link audit passed.`);
    }

    // 4. First Person Density Check
    const fp = checkFirstPersonDensity(entry.fullText, words);
    if (!fp.pass) {
      console.error(`❌ [${fileDef.varName} / ${entry.slug}] First-person density too low. Found ${fp.count}, expected ~${Math.round(fp.expected)}, required min ${Math.round(fp.required)}.`);
      hasErrors = true;
    } else {
      console.log(`✅ [${fileDef.varName} / ${entry.slug}] First-person density passed (${fp.count} tokens).`);
    }

    // 5. Uniqueness Check (Two-Layer Jaccard)
    for (let j = i + 1; j < entries.length; j++) {
      const other = entries[j];
      if (countWords(other.fullText) < 100) continue;

      const simLayer1 = calculateSimilarity(entry.fullText, other.fullText, false);
      const simLayer2 = calculateSimilarity(entry.fullText, other.fullText, true);

      if (simLayer1 > 0.70 || simLayer2 > 0.45) {
         console.error(`❌ [${fileDef.varName}] High similarity between ${entry.slug} and ${other.slug}: Layer 1: ${(simLayer1*100).toFixed(1)}% (limit 70%), Layer 2 (no-stopwords): ${(simLayer2*100).toFixed(1)}% (limit 45%)`);
         hasErrors = true;
      }
    }
  }
}

// ----- Numeric Claims AST Lint -----
function checkNumericClaims() {
  console.log('\nAnalyzing AST for hardcoded numeric claims...');
  const whitelistPath = path.resolve(process.cwd(), 'scripts/seo-lint-whitelist.json');
  let whitelistPatterns = [];
  let whitelistFiles = [];
  if (fs.existsSync(whitelistPath)) {
    const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));
    whitelistPatterns = whitelist.patterns.map(p => new RegExp(p, 'i'));
    whitelistFiles = whitelist.files;
  }

  function isPathWhitelisted(filePath) {
    if (filePath.includes('__tests__') || filePath.includes('.test.')) return true;
    for (const glob of whitelistFiles) {
      const cleanGlob = glob.replace('**', '');
      if (filePath.replace(/\\/g, '/').includes(cleanGlob)) return true;
    }
    return false;
  }

  const targetPatterns = [
    /\b(?!202\d)\d+\s+peptides?\b/i,
    /\b(?!202\d)\d+\s+compounds?\b/i,
    /\b(?!202\d)\d+\s+stacks?\b/i,
    /\b(?!202\d)\d+\s+vendors?\b/i,
    /\b(?!202\d)\d+\s+tools?\b/i,
    /\b(?!202\d)\d+\s+studies\b/i,
    /\b99(?:\.\d+)?(?:\+)?%\b/i,
    /\b\d+%\+/i
  ];

  const sourceFiles = project.getSourceFiles('src/**/*.{ts,tsx}');
  console.log(`Checking ${sourceFiles.length} files for numeric claims...`);
  
  for (const sourceFile of sourceFiles) {
    const filePath = sourceFile.getFilePath();
    if (isPathWhitelisted(filePath)) continue;

    sourceFile.forEachDescendant(node => {
      // @ts-ignore - SyntaxKind not fully exported for some reason? we use literal strings or imports
      if (node.getKindName() !== 'StringLiteral' &&
          node.getKindName() !== 'NoSubstitutionTemplateLiteral' &&
          node.getKindName() !== 'TemplateExpression' &&
          node.getKindName() !== 'JsxText') {
        return;
      }

      let text = node.getText().replace(/^["'`]/, '').replace(/["'`]$/, '').trim();
      if (node.getKindName() === 'TemplateExpression') {
        // Replace dynamic template interpolations ${...} with empty/placeholder to test the static text parts
        text = text.replace(/\$\{.*?\}/g, ' ');
      }
      if (!text) return;

      let matchedPattern = null;
      for (const pat of targetPatterns) {
        if (pat.test(text)) {
          matchedPattern = pat;
          break;
        }
      }
      if (!matchedPattern) return;

      for (const wPat of whitelistPatterns) {
        if (wPat.test(text)) return;
      }

      let isCandidate = false;
      let contextName = '';

      const normalizedPath = filePath.replace(/\\/g, '/');
      const isAppOrComponent = normalizedPath.includes('/src/app/') || normalizedPath.includes('/src/components/');

      if (isAppOrComponent) {
        isCandidate = true;
        contextName = `App/Component Text`;
      } else {
        const parent = node.getParent();
        if (parent) {
          if (parent.getKindName() === 'PropertyAssignment') {
            // @ts-ignore
            const propName = parent.getName();
            if (/^(title|description|desc|label|keywords|alt|content|text)$/.test(propName)) {
              isCandidate = true;
              contextName = `Property: ${propName}`;
            }
          } else if (parent.getKindName() === 'JsxAttribute') {
            if (typeof parent.getName === 'function') {
              const attrName = parent.getName();
              if (/^(title|description|desc|label|alt|content|text)$/.test(attrName)) {
                isCandidate = true;
                contextName = `JSX Attribute: ${attrName}`;
              }
            }
          } else if (node.getKindName() === 'JsxText') {
            const jsxElement = parent.getParent();
            if (jsxElement && (jsxElement.getKindName() === 'JsxElement' || jsxElement.getKindName() === 'JsxSelfClosingElement')) {
              // @ts-ignore
              const tagName = jsxElement.getKindName() === 'JsxElement' ? jsxElement.getOpeningElement().getTagNameNode().getText() : jsxElement.getTagNameNode().getText();
              
              if (/^h[1-6]$/i.test(tagName)) {
                 isCandidate = true;
                 contextName = `Heading: ${tagName}`;
              } else if (/^(title|meta)$/i.test(tagName)) {
                 isCandidate = true;
                 contextName = `Meta Tag: ${tagName}`;
              } else {
                 let ancestor = jsxElement;
                 let depth = 0;
                 while (ancestor && depth < 10) {
                    if (ancestor.getKindName() === 'JsxElement' || ancestor.getKindName() === 'JsxSelfClosingElement') {
                       // @ts-ignore
                       const elemName = ancestor.getKindName() === 'JsxElement' ? ancestor.getOpeningElement().getTagNameNode().getText() : ancestor.getTagNameNode().getText();
                       if (/footer/i.test(elemName) || /hero/i.test(elemName)) {
                          isCandidate = true;
                          contextName = `Component: ${elemName}`;
                          break;
                       }
                    }
                    if (isCandidate) break;
                    ancestor = ancestor.getParent();
                    depth++;
                 }
              }
            }
          }
        }
      }

      if (isCandidate) {
        console.error(`❌ Numeric Claim Violation in ${filePath.replace(process.cwd().replace(/\\/g, '/'), '')}:${node.getStartLineNumber()}`);
        console.error(`   Context: ${contextName}`);
        console.error(`   Text: "${text}"`);
        hasErrors = true;
      }
    });
  }
}

checkNumericClaims();

if (hasErrors) {
  console.error('\n🚨 SEO Lint Failed. Fix errors before building.');
  process.exit(1);
} else {
  console.log('\n✨ All SEO Lints Passed!');
}
