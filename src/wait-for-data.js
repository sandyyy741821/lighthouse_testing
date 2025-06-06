// delay-wait.js
module.exports = async (browser, context) => {
  const [page] = await browser.pages();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Wait extra seconds for backend to finish
  await new Promise(resolve => setTimeout(resolve, 4000));
};
