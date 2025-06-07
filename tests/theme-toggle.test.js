/**
 * @file theme-toggle.test.js
 * @description
 * Tests e2e functionality of the light dark theme
 */

const puppeteer = require('puppeteer');

describe('Theme Toggle Button', () => {
  let browser, page;
  let initialTheme, initialText;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    page = await browser.newPage();
    await page.goto("https://cse110-sp25-group28.github.io/cse110-sp25-group28/", {
      waitUntil: 'domcontentloaded',
    });

    await page.waitForSelector('#theme-toggle');

    // Capture initial theme and text once before tests
    initialTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    initialText = await page.$eval('#theme-toggle', btn => btn.textContent.trim());
  }, 30000);

  afterAll(async () => {
    if (browser) await browser.close();
  });

  it('sets initial theme and toggles on click', async () => {
    const getTheme = async () =>
      await page.evaluate(() =>
        document.documentElement.getAttribute('data-theme')
      );

    const getButtonText = async () =>
      await page.$eval('#theme-toggle', btn => btn.textContent.trim());

    expect(['dark', 'light']).toContain(initialTheme);
    expect(['☀️', '🌙']).toContain(initialText);

    await page.click('#theme-toggle');

    await page.waitForFunction(
      oldTheme => document.documentElement.getAttribute('data-theme') !== oldTheme,
      {},
      initialTheme
    );

    const newTheme = await getTheme();
    const newText = await getButtonText();

    expect(newTheme).not.toBe(initialTheme);
    expect(newText).not.toBe(initialText);
  }, 20000);

    it('theme stays the same even after navigating to create deck page', async () => {
  const getTheme = async () =>
    await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );

  const getButtonText = async () =>
    await page.$eval('#theme-toggle', btn => btn.textContent.trim());

  const initialTheme = await getTheme();
  const initialText = await getButtonText();

  await page.click('.create-deck');

  // Wait for something from the new page (or just use a small delay)
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));

  const newTheme = await getTheme();
  const newText = await getButtonText();

  // ✅ Now correctly asserting that theme and toggle icon stay the same
  expect(newTheme).toBe(initialTheme);
  expect(newText).toBe(initialText);
}, 20000);
//
});