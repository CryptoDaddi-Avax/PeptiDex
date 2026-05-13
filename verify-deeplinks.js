const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  
  const tests = [
    { url: 'http://localhost:3001/?guide=1&step=1', name: 'Step 1' },
    { url: 'http://localhost:3001/?guide=1&step=2', name: 'Step 2' },
    { url: 'http://localhost:3001/?guide=1&step=3', name: 'Step 3' },
    { url: 'http://localhost:3001/?guide=1&step=5', name: 'Step 5' },
    { url: 'http://localhost:3001/?guide=1&step=0', name: 'Step 0' },
    { url: 'http://localhost:3001/?guide=1&step=6', name: 'Step 6' },
  ];

  for (const t of tests) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Go to URL and wait until DOM content loaded (first paint approx)
    await page.goto(t.url, { waitUntil: 'domcontentloaded' });
    
    const data = await page.evaluate(() => {
      const activeRailItem = document.querySelector('.onboarding-progress__item--active');
      const stepText = activeRailItem ? activeRailItem.innerText.trim().replace(/\n/g, ' ') : 'None';
      
      const progressText = document.querySelector('.onboarding-nav__progress-text')?.innerText || 'None';
      const heading = document.querySelector('.onboarding-content h3, .onboarding-content h2, .onboarding-content h4')?.innerText || 'None';
      
      return { stepText, progressText, heading };
    });

    console.log(`\nTEST: ${t.url}`);
    console.log(`Active Rail Item: ${data.stepText}`);
    console.log(`Progress Text: ${data.progressText}`);
    console.log(`Heading: ${data.heading}`);
    console.log(`Hydration Errors: ${errors.some(e => e.includes('Hydration') || e.includes('Minified React error #418') || e.includes('Text content did not match')) ? 'Yes' : 'No'}`);
    
    await page.close();
  }

  await browser.close();
})();
