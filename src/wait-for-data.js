const fs = require('fs');

module.exports = async function (browser, context) {
  const [page] = await browser.pages();

  console.log("⏳ Waiting for React app to load...");

  // Wait 10 seconds
  await new Promise(resolve => setTimeout(resolve, 10000));

  // Optional: go to the page explicitly
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Dump HTML and take screenshot
  const content = await page.content();
  console.log("📄 Page content length:", content.length);

  fs.writeFileSync('page-dump.html', content);
  console.log("📄 Saved HTML dump to page-dump.html");

  await page.screenshot({ path: 'debug-page.png' });
  console.log("📸 Saved screenshot.");

  // Wait for React root
  await page.waitForSelector('#root', { timeout: 20000 });
  console.log("✅ #root loaded");
};
