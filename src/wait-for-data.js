const fs = require('fs');

module.exports = async function (browser, context) {
  const [page] = await browser.pages();

  console.log("⏳ Waiting for React app to load...");
  await page.waitForTimeout(10000); // wait 10s for JS to render

  const content = await page.content();
  console.log("📄 Page content length:", content.length);

  const htmlPath = 'page-dump.html';
  fs.writeFileSync(htmlPath, content);
  console.log(`📄 Saved HTML dump to ${htmlPath}`);

  await page.screenshot({ path: 'debug-page.png' });
  console.log("📸 Saved screenshot.");

  await page.waitForSelector('#root', { timeout: 20000 });
  console.log("✅ #root loaded");
};
