// wait-for-data.js
export default async function (page, context) {
  await page.waitForSelector('#root');
}
