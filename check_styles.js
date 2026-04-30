const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  const styles = await page.evaluate(() => {
    const el = document.querySelector('.hero-molecule');
    if (!el) return 'Element not found';
    const computed = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    
    const topEl = document.querySelector('.hero-top');
    const topRect = topEl ? topEl.getBoundingClientRect() : null;
    
    const botEl = document.querySelector('.hero-bottom');
    const botRect = botEl ? botEl.getBoundingClientRect() : null;
    
    return {
      molecule: {
        position: computed.position,
        display: computed.display,
        width: computed.width,
        height: computed.height,
        top: computed.top,
        right: computed.right,
        overflow: computed.overflow,
        rect: rect
      },
      heroTop: { rect: topRect },
      heroBottom: { rect: botRect }
    };
  });
  
  console.log(JSON.stringify(styles, null, 2));
  await browser.close();
})();
