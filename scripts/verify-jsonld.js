const http = require('http');

http.get('http://localhost:3099/library/bpc-157', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    let match;
    let count = 0;
    const types = [];
    while ((match = regex.exec(data)) !== null) {
      count++;
      try {
        const obj = JSON.parse(match[1]);
        types.push(obj['@type']);
        console.log(`\n═══ Schema ${count}: @type = "${obj['@type']}" ═══`);
        console.log(JSON.stringify(obj, null, 2).slice(0, 400));
        console.log('...');
      } catch (e) {
        console.log(`Schema ${count}: parse error`);
      }
    }
    console.log('\n────────────────────────────────────');
    console.log(`Total JSON-LD blocks: ${count}`);
    console.log(`Types found: ${types.join(', ')}`);
    console.log('Drug present:', types.includes('Drug'));
    console.log('HowTo present:', types.includes('HowTo'));
    console.log('FAQPage present:', types.includes('FAQPage'));
    console.log('Article present:', types.includes('Article'));
  });
});
