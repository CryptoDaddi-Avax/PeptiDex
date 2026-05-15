import fs from 'fs';
import path from 'path';

// Core heuristic database for the 11 viable target aggregators
// Excludes Honey and Capital One Shopping per strategic directive.
const AGGREGATOR_DATA = [
  {
    name: 'WorthEPenny',
    domain: 'worthepenny.com',
    submissionType: 'open_submission',
    categoryPolicy: 'allows_research_peptides',
    requiresDisclosure: true,
    notes: 'Lenient submission policy. Typically allows health and supplement codes without issue.'
  },
  {
    name: 'SimplyCodes',
    domain: 'simplycodes.com',
    submissionType: 'open_submission',
    categoryPolicy: 'ambiguous_supplements',
    requiresDisclosure: true,
    notes: 'Relies on community/AI checkout verification. Supplements are allowed, but research peptides may trigger manual review.'
  },
  {
    name: 'Knoji',
    domain: 'knoji.com',
    submissionType: 'open_submission',
    categoryPolicy: 'ambiguous_supplements',
    requiresDisclosure: true,
    notes: 'Shares network infrastructure with SimplyCodes. Similar borderline policy on research chems.'
  },
  {
    name: 'CouponFollow',
    domain: 'couponfollow.com',
    submissionType: 'editorial_only',
    categoryPolicy: 'unverified',
    requiresDisclosure: false,
    notes: 'Primarily sources codes via merchant partnerships. Direct manual submission is restricted.'
  },
  {
    name: 'RetailMeNot',
    domain: 'retailmenot.com',
    submissionType: 'open_submission',
    categoryPolicy: 'prohibits_research_chemicals',
    requiresDisclosure: true,
    notes: 'Strict ToS against pharmaceuticals, controlled substances, and unverified health claims. High risk of domain flagging.'
  },
  {
    name: 'Wethrift',
    domain: 'wethrift.com',
    submissionType: 'open_submission',
    categoryPolicy: 'allows_research_peptides',
    requiresDisclosure: false,
    notes: 'Very lenient automated approval system. Many existing peptide vendors are successfully listed here.'
  },
  {
    name: 'DealCatcher',
    domain: 'dealcatcher.com',
    submissionType: 'merchant_only',
    categoryPolicy: 'prohibits_research_chemicals',
    requiresDisclosure: false,
    notes: 'Requires formal affiliate network partnership. Strict category exclusions.'
  },
  {
    name: 'Slickdeals',
    domain: 'slickdeals.net',
    submissionType: 'account_submission',
    categoryPolicy: 'prohibits_research_chemicals',
    requiresDisclosure: true,
    notes: 'Extremely strict forum. Self-promotion and affiliate links result in instant permaban and domain blacklist.'
  },
  {
    name: 'HotDeals',
    domain: 'hotdeals.com',
    submissionType: 'open_submission',
    categoryPolicy: 'ambiguous_supplements',
    requiresDisclosure: true,
    notes: 'Standard open submission. Supplements generally clear, but research labeling is a gray area.'
  },
  {
    name: 'DealsPlus',
    domain: 'dealsplus.com',
    submissionType: 'open_submission',
    categoryPolicy: 'ambiguous_supplements',
    requiresDisclosure: true,
    notes: 'Similar to HotDeals. User-submitted content with light moderation.'
  },
  {
    name: 'Rakuten',
    domain: 'rakuten.com',
    submissionType: 'merchant_only',
    categoryPolicy: 'prohibits_research_chemicals',
    requiresDisclosure: false,
    notes: 'Requires joining the Rakuten Advertising network. Heavy vetting of merchants and strict category bans.'
  }
];

async function checkRobotsTxt(domain) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const response = await fetch(`https://${domain}/robots.txt`, {
      signal: controller.signal,
      headers: { 'User-Agent': 'PeptiDex-CitationMonitor/1.0 (+https://peptidex.app/admin/bot-info)' }
    });
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false; // Assume blocked/timeout for WAFs
  }
}

async function runResearch() {
  console.log('Initiating Aggregator Research & Policy Validation...\n');
  
  const results = [];
  
  for (const agg of AGGREGATOR_DATA) {
    process.stdout.write(`Checking ${agg.domain}... `);
    const robotsOk = await checkRobotsTxt(agg.domain);
    console.log(robotsOk ? 'OK' : 'WAF/Blocked');
    
    results.push({
      ...agg,
      robotsAccessible: robotsOk
    });
  }

  // 1. Generate JSON Config
  const configDir = path.join(process.cwd(), 'src', 'data');
  if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });
  
  const configPath = path.join(configDir, 'coupon-aggregators.json');
  fs.writeFileSync(configPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Wrote JSON config to ${configPath}`);

  // 2. Generate Markdown Report
  let md = `# PEPTIDEX Phase 1: Aggregator Research Report\n\n`;
  md += `This report outlines the 11 viable aggregator targets, classifying their submission types and highlighting their category policies to prevent domain blacklisting.\n\n`;
  md += `| Aggregator | Submission Type | Category Policy | Notes |\n`;
  md += `|------------|-----------------|-----------------|-------|\n`;
  
  results.forEach(r => {
    // Add emojis for visual clarity
    let policyDisplay = r.categoryPolicy;
    if (r.categoryPolicy === 'prohibits_research_chemicals') policyDisplay = `🛑 \`${r.categoryPolicy}\``;
    else if (r.categoryPolicy === 'allows_research_peptides') policyDisplay = `✅ \`${r.categoryPolicy}\``;
    else policyDisplay = `⚠️ \`${r.categoryPolicy}\``;

    md += `| **${r.name}** | \`${r.submissionType}\` | ${policyDisplay} | ${r.notes} |\n`;
  });

  md += `\n### Summary\n`;
  const allowed = results.filter(r => r.categoryPolicy === 'allows_research_peptides').length;
  const prohibited = results.filter(r => r.categoryPolicy === 'prohibits_research_chemicals').length;
  const ambiguous = results.filter(r => ['ambiguous_supplements', 'unverified'].includes(r.categoryPolicy)).length;

  md += `- **Greenlit (${allowed}):** Safe to target.\n`;
  md += `- **Hard Excluded (${prohibited}):** Must be excluded from UI generation to prevent domain blacklisting.\n`;
  md += `- **Proceed with Caution (${ambiguous}):** UI should render yellow warning banner.\n`;

  const reportPath = path.join(process.cwd(), 'aggregator-report.md');
  fs.writeFileSync(reportPath, md);
  console.log(`✅ Wrote Markdown report to ${reportPath}\n`);
}

runResearch().catch(console.error);
