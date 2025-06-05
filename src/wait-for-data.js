export default async function(page) {
  // Wait for the root element to be present in the DOM
  await page.waitForSelector('#root');
}
