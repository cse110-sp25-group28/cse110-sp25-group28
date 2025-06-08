/**
 * @file theme-toggle.test.js
 * @description
 * Tests e2e functionality of the light dark theme
 */

const puppeteer = require('puppeteer');

describe('Theme Toggle Button', () => {
  let browser, page;
  let initialTheme, initialIconClass;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    page = await browser.newPage();
    await page.goto("https://cse110-sp25-group28.github.io/cse110-sp25-group28/", {
      waitUntil: 'domcontentloaded',
    });

    await page.waitForSelector('#theme-toggle i');

    initialTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    initialIconClass = await page.$eval('#theme-toggle i', icon => icon.className.trim());
  }, 30000);

  afterAll(async () => {
    if (browser) await browser.close();
  });

  it('sets initial theme and toggles on click', async () => {
    const getTheme = async () =>
      await page.evaluate(() =>
        document.documentElement.getAttribute('data-theme')
      );

    const getIconClass = async () =>
      await page.$eval('#theme-toggle i', icon => icon.className.trim());

    expect(['dark', 'light']).toContain(initialTheme);
    expect(initialIconClass).toMatch(/fa-(sun|moon)/);

    await page.click('#theme-toggle');

    await page.waitForFunction(
      oldTheme => document.documentElement.getAttribute('data-theme') !== oldTheme,
      {},
      initialTheme
    );

    const newTheme = await getTheme();
    const newIconClass = await getIconClass();

    expect(newTheme).not.toBe(initialTheme);
    expect(newIconClass).not.toBe(initialIconClass);
  }, 20000);

  it('theme stays the same even after navigating to create deck page', async () => {
    const getTheme = async () =>
      await page.evaluate(() =>
        document.documentElement.getAttribute('data-theme')
      );

    const getIconClass = async () =>
      await page.$eval('#theme-toggle i', icon => icon.className.trim());

    const initialTheme = await getTheme();
    const initialIconClass = await getIconClass();

    await page.click('.create-deck');

    await new Promise(res => setTimeout(res, 1000)); // delay for navigation

    const newTheme = await getTheme();
    const newIconClass = await getIconClass();

    expect(newTheme).toBe(initialTheme);
    expect(newIconClass).toBe(initialIconClass);
  }, 20000);
});
