const fs = require('fs');
const path = require('path');

const vendorPricingPath = path.join(__dirname, 'src/data/vendor-pricing.ts');
const blendsPath = path.join(__dirname, 'src/data/blends.ts');
const pricingPath = path.join(__dirname, 'src/data/pricing.ts');

const allowedVendors = ["Ascension Peptides", "Amino Club"];

function filterVendorLines(content) {
    const lines = content.split('\n');
    return lines.filter(line => {
        if (line.includes('vendor: "')) {
            const isAllowed = allowedVendors.some(v => line.includes(`vendor: "${v}"`));
            return isAllowed;
        }
        return true;
    }).join('\n');
}

// 1. Clean vendor-pricing.ts
if (fs.existsSync(vendorPricingPath)) {
    let vpContent = fs.readFileSync(vendorPricingPath, 'utf8');
    vpContent = filterVendorLines(vpContent);
    fs.writeFileSync(vendorPricingPath, vpContent);
    console.log('Cleaned vendor-pricing.ts');
}

// 2. Clean blends.ts
if (fs.existsSync(blendsPath)) {
    let blendsContent = fs.readFileSync(blendsPath, 'utf8');
    // Replace popular_vendors arrays with just ["Amino Club", "Ascension Peptides"]
    blendsContent = blendsContent.replace(/popular_vendors:\s*\[.*?\]/g, 'popular_vendors: ["Amino Club", "Ascension Peptides"]');
    fs.writeFileSync(blendsPath, blendsContent);
    console.log('Cleaned blends.ts');
}

// 3. Clean and recalculate pricing.ts
if (fs.existsSync(pricingPath)) {
    let pricingContent = fs.readFileSync(pricingPath, 'utf8');
    
    // Step A: remove all vendors that are not allowed (they are already removed probably, but just in case)
    pricingContent = filterVendorLines(pricingContent);

    // Now, pricing.ts has hardcoded strings. I will load it by using a regex to parse blocks.
    // It's tricky to parse TS as JSON, so I'll just write a quick script to evaluate it and rewrite the data.
    // But since it's an export const, evaluating it is hard.
    // A simpler way: we'll use regex to match each PeptidePricing block and recalculate string replacements.
    
    // Instead of regex hacking, I'll compile it, require it, manipulate the data, and write it back out.
    // Let's actually just use basic regex to do string replacement for avg_price_usd, price_range_usd, cost_per_dose_usd.
}
