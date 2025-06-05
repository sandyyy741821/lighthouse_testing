const puppeteer = require('puppeteer');

module.exports = async function (browser, context) {
  const [page] = await browser.pages();
  console.log("Waiting for #root to load...");

  // Wait for 5 seconds
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Wait for the #root element
  await page.waitForSelector('#root', { timeout: 60000 });
};
