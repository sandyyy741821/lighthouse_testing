const fs = require('fs');

module.exports = async function (browser, context) {
  const [page] = await browser.pages();

  console.log("Navigating to React app...");
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  let content = await page.content();
  console.log("Initial page content length:", content.length);

  // Wait and retry if content length too small
  // let retries = 5;
  // while (content.length < 3000 && retries > 0) {
  //   console.log(`Content length (${content.length}) < 200, waiting 3 seconds and retrying...`);
  //   await new Promise(resolve => setTimeout(resolve, 3000));
  //   content = await page.content();
  //   retries--;
  // }

  // if (content.length < 200) {
  //   throw new Error('Page content length is still too small. React app might not have loaded properly.');
  // }

  fs.writeFileSync('page-dump.html', content);
  console.log("Saved HTML dump to page-dump.html");

  await page.screenshot({ path: 'debug-page.png' });
  console.log("Saved screenshot.");


  await page.waitForSelector('#list-books-container', { timeout: 60000 });
  console.log("list-books loaded");
};




