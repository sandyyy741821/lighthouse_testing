module.exports = async function (browser, context) {
  const pages = await browser.pages();
  const page = pages[0];

  console.log('Page URL:', page.url());

  const content = await page.content();
  console.log('Page HTML content snippet:', content.slice(0, 500));

  await page.waitForSelector('#root');
};
