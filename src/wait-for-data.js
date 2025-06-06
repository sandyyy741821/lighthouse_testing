const fs = require('fs');

module.exports = async function (browser, context) {
  const [page] = await browser.pages();

  console.log("⏳ Navigating to React app...");
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Wait for list-books-container to exist
  await page.waitForSelector('#list-books-container', { timeout: 60000 });
  console.log("✅ list-books-container is present");

  // ✅ Now wait until actual book items are rendered in DOM
  const maxRetries = 10;
  let retries = 0;
  let bookCount = 0;

  while (bookCount < 2 && retries < maxRetries) {
    bookCount = await page.evaluate(() => {
      return document.querySelectorAll('.books-grid .book').length;
    });

    console.log(`📚 Book count: ${bookCount} (attempt ${retries + 1})`);

    if (bookCount >= 2) break;

    await new Promise((resolve) => setTimeout(resolve, 3000));
    retries++;
  }

  if (bookCount < 2) {
    throw new Error("❌ Books did not finish rendering in time.");
  }

  console.log("✅ Books loaded successfully!");

  // Save debug info
  const content = await page.content();
  fs.writeFileSync('page-dump.html', content);
  await page.screenshot({ path: 'debug-page.png' });
};
