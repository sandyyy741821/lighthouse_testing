export default async function(page) {
  await page.waitForSelector('#root');
}
