import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to a typical 720x1600 mobile device (CSS size: 360x800)
  await page.setViewport({ width: 360, height: 800 });
  
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  
  const metrics = await page.evaluate(() => {
    const scrollWidth = document.documentElement.scrollWidth;
    const bodyWidth = document.body.scrollWidth;
    
    // Find all elements wider than 360
    const wideElements = Array.from(document.querySelectorAll('*'))
      .filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 360;
      })
      .map(el => ({
        tagName: el.tagName,
        className: el.className,
        width: el.getBoundingClientRect().width
      }));
      
    // Return top 10 widest elements
    return {
      scrollWidth,
      bodyWidth,
      wideElements: wideElements.sort((a, b) => b.width - a.width).slice(0, 10)
    };
  });
  
  console.log('--- DIAGNOSTICS ---');
  console.log(`Document scrollWidth: ${metrics.scrollWidth}px`);
  console.log(`Body scrollWidth: ${metrics.bodyWidth}px`);
  console.log('Widest elements:', JSON.stringify(metrics.wideElements, null, 2));

  await browser.close();
})();
