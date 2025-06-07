const puppeteer = require('puppeteer');

describe('Theme Toggle Button', () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // ✅ fix for sandbox issue
    });

    page = await browser.newPage();
    await page.goto("https://cse110-sp25-group28.github.io/cse110-sp25-group28/", {
      waitUntil: 'domcontentloaded',
    });

    // Wait until the toggle is available in the DOM
    await page.waitForSelector('#theme-toggle');
  }, 30000); // Increase timeout for CI environments

  afterAll(async () => {
    if (browser) await browser.close(); // Prevents TypeError if browser didn't launch
  });

  it('sets initial theme and toggles on click', async () => {
    const getTheme = async () =>
      await page.evaluate(() =>
        document.documentElement.getAttribute('data-theme')
      );

    const getButtonText = async () =>
      await page.$eval('#theme-toggle', btn => btn.textContent.trim());

    // ✅ Check initial state
    const initialTheme = await getTheme();
    const initialText = await getButtonText();

    expect(['dark', 'light']).toContain(initialTheme);
    expect(['☀️', '🌙']).toContain(initialText);

    // ✅ Click toggle
    await page.click('#theme-toggle');

    // ✅ Wait for theme change
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
});