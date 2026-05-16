import { Project, SyntaxKind, Node } from 'ts-morph';
import fs from 'fs';
import path from 'path';

const whitelistPath = path.resolve(process.cwd(), 'scripts/seo-lint-whitelist.json');
const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));
const whitelistPatterns = whitelist.patterns.map(p => new RegExp(p, 'i'));

const project = new Project({
  tsConfigFilePath: 'tsconfig.json',
});

function isPathWhitelisted(filePath) {
  if (filePath.includes('__tests__') || filePath.includes('.test.')) return true;
  for (const glob of whitelist.files) {
    const cleanGlob = glob.replace('**', '');
    if (filePath.replace(/\\/g, '/').includes(cleanGlob)) return true;
  }
  return false;
}

const targetPatterns = [
  /\b\d+\s+peptides?\b/i,
  /\b\d+\s+compounds?\b/i,
  /\b\d+\s+stacks?\b/i,
  /\b\d+\s+vendors?\b/i,
  /\b\d+\s+tools?\b/i,
  /\b\d+\s+studies\b/i,
  /\b99(?:\.\d+)?(?:\+)?%\b/i,
  /\b\d+%\+/i
];

let hasErrors = false;

console.log('Running Numeric Claims AST Lint...');

const sourceFiles = project.getSourceFiles('src/**/*.{ts,tsx}');

for (const sourceFile of sourceFiles) {
  const filePath = sourceFile.getFilePath();
  if (isPathWhitelisted(filePath)) continue;

  sourceFile.forEachDescendant(node => {
    if (
      node.getKind() !== SyntaxKind.StringLiteral &&
      node.getKind() !== SyntaxKind.NoSubstitutionTemplateLiteral &&
      node.getKind() !== SyntaxKind.JsxText
    ) {
      return;
    }

    const text = node.getText().replace(/^["'`]/, '').replace(/["'`]$/, '').trim();
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

    const parent = node.getParent();
    if (parent) {
      if (parent.getKind() === SyntaxKind.PropertyAssignment) {
        const propName = parent.getName();
        if (/^(title|description|desc|label|keywords|alt|content|text)$/.test(propName)) {
          isCandidate = true;
          contextName = `Property: ${propName}`;
        }
      } else if (Node.isJsxAttribute(parent)) {
        const attrName = parent.getName();
        if (/^(title|description|desc|label|alt|content|text)$/.test(attrName)) {
          isCandidate = true;
          contextName = `JSX Attribute: ${attrName}`;
        }
      } else if (node.getKind() === SyntaxKind.JsxText) {
        const jsxElement = parent.getParent();
        if (jsxElement && (Node.isJsxElement(jsxElement) || Node.isJsxSelfClosingElement(jsxElement))) {
          const tagName = Node.isJsxElement(jsxElement) ? jsxElement.getOpeningElement().getTagNameNode().getText() : jsxElement.getTagNameNode().getText();
          
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
                if (Node.isJsxElement(ancestor) || Node.isJsxSelfClosingElement(ancestor)) {
                   const elemName = Node.isJsxElement(ancestor) ? ancestor.getOpeningElement().getTagNameNode().getText() : ancestor.getTagNameNode().getText();
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

    if (isCandidate) {
      console.log(`❌ Violation in ${filePath.replace(process.cwd().replace(/\\/g, '/'), '')}:${node.getStartLineNumber()}`);
      console.log(`   Context: ${contextName}`);
      console.log(`   Text: "${text}"`);
      hasErrors = true;
    }
  });
}

if (hasErrors) {
  process.exit(1);
} else {
  console.log('✅ No hardcoded numeric claims found in tracked contexts.');
}
