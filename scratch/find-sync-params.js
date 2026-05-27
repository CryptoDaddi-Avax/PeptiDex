const fs = require('fs');
const glob = require('glob');
const path = require('path');

const files = [
'src/app/about/[slug]/page.tsx',
'src/app/admin/aeo/query/[queryId]/page.tsx',
'src/app/best/[slug]/BestGoalClient.tsx',
'src/app/best/[slug]/page.tsx',
'src/app/blog/[slug]/page.tsx',
'src/app/buy/[slug]/page.tsx',
'src/app/compare/vendors/[slug]/page.tsx',
'src/app/compare/[slug]/page.tsx',
'src/app/coupon-codes/[vendor-slug]/page.tsx',
'src/app/coupon-codes/[vendor-slug]/VendorCouponPageClient.tsx',
'src/app/learn/[slug]/page.tsx',
'src/app/library/blends/[slug]/layout.tsx',
'src/app/library/blends/[slug]/loading.tsx',
'src/app/library/blends/[slug]/page.tsx',
'src/app/library/[slug]/client.tsx',
'src/app/library/[slug]/loading.tsx',
'src/app/library/[slug]/page.tsx',
'src/app/logs/entry/[id]/page.tsx',
'src/app/logs/[slug]/page.tsx',
'src/app/logs/[slug]/PeptideLogsClient.tsx',
'src/app/peptides/[slug]/page.tsx',
'src/app/peptides/[slug]/at/[vendor]/page.tsx',
'src/app/peptides/[slug]/at/[vendor]/PeptideVendorContent.tsx',
'src/app/peptides/[slug]/at/[vendor]/PeptideVendorLogsClient.tsx',
'src/app/stacks/[slug]/page.tsx',
'src/app/team/[slug]/page.tsx',
'src/app/tools/reconstitution-calculator/[slug]/page.tsx',
'src/app/vendors/amino-club/[peptide]/page.tsx',
'src/app/vendors/[slug]/page.tsx',
'src/app/vs/[slug]/client.tsx',
'src/app/vs/[slug]/page.tsx',
'src/app/where-to-buy/[slug]/page.tsx'
];

for (const file of files) {
  const fullPath = path.join(process.cwd(), file);
  if (!fs.existsSync(fullPath)) continue;
  
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');
  
  let hasParams = false;
  let isAsync = false;
  let hasAwaitParams = false;
  let hasSyncParams = false;
  
  lines.forEach((line, index) => {
    if (line.includes('params')) {
      hasParams = true;
      if (line.includes('await params') || line.includes('params.then')) {
        hasAwaitParams = true;
      }
      if (line.match(/params\.(slug|id|peptide|queryId|vendor|vendor\-slug)/)) {
        hasSyncParams = true;
        console.log(`[SYNC] ${file}:${index + 1} -> ${line.trim()}`);
      }
      if (line.match(/\{.*:\s*slug\s*\}\s*=\s*params/)) {
        hasSyncParams = true;
        console.log(`[SYNC DESTRUCT] ${file}:${index + 1} -> ${line.trim()}`);
      }
    }
  });
  
  if (hasParams) {
    if (!hasAwaitParams && !hasSyncParams) {
       console.log(`[UNKNOWN] ${file} uses params but pattern not matched`);
    } else if (hasAwaitParams && !hasSyncParams) {
       console.log(`[ASYNC-OK] ${file}`);
    } else if (hasAwaitParams && hasSyncParams) {
       console.log(`[MIXED] ${file}`);
    }
  }
}
