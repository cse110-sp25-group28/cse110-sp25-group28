const puppeteer = require('puppeteer');


describe('Theme Toggle Button', () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("https://cse110-sp25-group28.github.io/cse110-sp25-group28/");
  });

  afterAll(async () => {
    await browser.close();
  });

  it('sets initial theme and toggles on click', async () => {
    const getTheme = async () => await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    const getButtonText = async () => await page.$eval('#theme-toggle', btn => btn.textContent);

    // Initial theme (default system dark mocked in code below)
    let theme = await getTheme();
    let text = await getButtonText();
    expect(theme === 'dark' || theme === 'light').toBe(true);
    expect(['☀️', '🌙']).toContain(text);

    // Click to toggle
    await page.click('#theme-toggle');

    const newTheme = await getTheme();
    const newText = await getButtonText();

    expect(newTheme).not.toBe(theme);
    expect(newText).not.toBe(text);
  });

  
});