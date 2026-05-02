const fs = require('fs');

// After removing RedesignLayout, the return() now has bare JSX siblings without a fragment.
// We need to wrap them in <> </> 

function wrapReturnInFragment(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Pattern: return (\n        {/* comment or content starting directly */}
  // We need to replace the return( ) with return(<>...</>)
  // Find the return( line and add <> after it, then add </> before the last )
  
  const lines = content.split('\n');
  
  // Find the return( line index
  let returnIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^\s*return\s*\(\s*$/)) {
      returnIdx = i;
      break;
    }
  }
  
  if (returnIdx === -1) {
    console.log('SKIP (no bare return(\\n): ' + filePath);
    return;
  }
  
  // Check if the next non-empty line starts with {/* or <header or <div (not <> or <RedesignLayout)
  let nextContentIdx = returnIdx + 1;
  while (nextContentIdx < lines.length && lines[nextContentIdx].trim() === '') nextContentIdx++;
  const nextLine = lines[nextContentIdx]?.trim() || '';
  
  if (nextLine.startsWith('<>') || nextLine.startsWith('</') || nextLine.startsWith('<React') || nextLine.startsWith('<RedesignLayout')) {
    console.log('SKIP (already has fragment or other wrapper): ' + filePath);
    return;
  }
  
  // Find the matching closing ) - it should be the last line that is just ) or );
  let closeIdx = -1;
  for (let i = lines.length - 1; i > returnIdx; i--) {
    if (lines[i].match(/^\s*\)\s*;?\s*$/) || lines[i].match(/^\s*\)\s*;\s*$/)) {
      closeIdx = i;
      break;
    }
  }
  
  if (closeIdx === -1) {
    console.log('SKIP (no closing found): ' + filePath);
    return;
  }
  
  // Insert <> after return( and </> before closing )
  const indent = (lines[nextContentIdx].match(/^(\s*)/)?.[1] || '    ');
  lines.splice(closeIdx, 0, indent + '</>');
  lines.splice(returnIdx + 1, 0, indent + '<>');
  
  const result = lines.join('\n');
  fs.writeFileSync(filePath, result, 'utf8');
  console.log('OK: ' + filePath);
}

const files = [
  'src/app/library/LibraryClient.tsx',
  'src/app/stacks/StacksClient.tsx',
  'src/app/vendors/VendorsClient.tsx',
  'src/app/tools/ToolsClient.tsx',
  'src/app/tools/cycle-planner/CyclePlannerClient.tsx',
  'src/app/tools/evidence/EvidenceClient.tsx',
  'src/app/tools/pricing/PricingClient.tsx',
  'src/app/best/[slug]/BestGoalClient.tsx',
  'src/app/library/[slug]/client.tsx',
];

for (const f of files) {
  wrapReturnInFragment(f);
}
