module.exports = async function (page, context) {
  await page.waitForSelector('#root');
};
