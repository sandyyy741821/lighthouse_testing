const { TimeoutError } = require("redis");

module.exports = async function (browser, context) {
  const [page] = await browser.pages();
  console.log("page:", page);
  console.log("typeof page.waitForSelector:", typeof page.waitForSelector);

  // Use waitForSelector instead of waitForTimeout
  // You can also use setTimeout (pure JS) if needed
  await new Promise(resolve => setTimeout(resolve, 5000)); // 5-second delay

  await page.waitForSelector('#root', {Timeout: 60000}); // Wait for the root element to appear
};
