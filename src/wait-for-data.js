module.exports = async function (browser, context) {
  // Get the first page/tab from the browser
  const pages = await browser.pages();
  const page = pages[0];

  console.log('page:', page);
  console.log('typeof page.waitForSelector:', typeof page.waitForSelector);

  await page.waitForSelector('#root');
};
