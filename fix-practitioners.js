const fs = require('fs');
let c = fs.readFileSync('src/app/practitioners/page.tsx', 'utf8');
if (!c.includes("from 'next/link'") && !c.includes('from "next/link"')) {
  // Insert after "use client"; line
  c = c.replace('"use client";', '"use client";\nimport Link from "next/link";');
  fs.writeFileSync('src/app/practitioners/page.tsx', c, 'utf8');
  console.log('Fixed practitioners Link import');
} else {
  console.log('Already has Link import');
}
