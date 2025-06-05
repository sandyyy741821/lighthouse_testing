const puppeteer = require('puppeteer');

module.exports = async function (browser, context) {
  const [page] = await browser.pages();

  console.log("⏳ Waiting for React app to load...");

  // Optional: take a screenshot to debug what's rendered
  await new Promise(resolve => setTimeout(resolve, 15000)); // wait 15 seconds
  await page.screenshot({ path: 'debug-page.png' });

  // Log HTML to see what’s actually loaded
  const content = await page.content();
  console.log("📄 Page content length:", content.length);

  // Now wait for root
  await page.waitForSelector('#root', { timeout: 20000 });
  console.log("✅ #root loaded successfully");
};
