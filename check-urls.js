const fs = require('fs');
const https = require('https');

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get('https://peptidex.app' + url, (res) => {
      res.resume(); // consume response data to free up memory
      resolve({ url, status: res.statusCode, location: res.headers.location });
    }).on('error', (e) => {
      resolve({ url, status: 'ERROR', error: e.message });
    });
  });
}

async function run() {
  const sitemapUrls = fs.existsSync('scratch/sitemap_urls.txt') ? fs.readFileSync('scratch/sitemap_urls.txt', 'utf8').split('\n').filter(Boolean) : [];
  const internalUrls = fs.existsSync('scratch/all_internal_links.txt') ? fs.readFileSync('scratch/all_internal_links.txt', 'utf8').split('\n').filter(Boolean) : [];
  
  const allUrls = Array.from(new Set([...sitemapUrls, ...internalUrls]));
  console.log(`Checking ${allUrls.length} unique URLs...`);
  
  const results = [];
  const concurrency = 5;
  
  for (let i = 0; i < allUrls.length; i += concurrency) {
    const chunk = allUrls.slice(i, i + concurrency);
    const chunkResults = await Promise.all(chunk.map(checkUrl));
    results.push(...chunkResults);
    process.stdout.write('.');
    await new Promise(r => setTimeout(r, 200)); // small delay
  }
  
  console.log('\n\n--- 404 NOT FOUND ---');
  results.filter(r => r.status === 404).forEach(r => console.log(r.url));
  
  console.log('\n--- REDIRECTS (3xx) ---');
  results.filter(r => r.status >= 300 && r.status < 400).forEach(r => console.log(`${r.url} -> ${r.location}`));

  console.log('\n--- ERRORS ---');
  results.filter(r => r.status === 'ERROR' || r.status >= 500).forEach(r => console.log(r.url, r.status, r.error));
  
  fs.writeFileSync('scratch/crawl_results.json', JSON.stringify(results, null, 2));
}

run();
