module.exports = async (browser, context) => {
  const [page] = await browser.pages();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Wait for loading to complete
  await page.waitForSelector('#list-books-container');
  await page.waitForFunction(
    () => document.querySelectorAll('.book').length > 0,
    { timeout: 10000 }
  );
};
