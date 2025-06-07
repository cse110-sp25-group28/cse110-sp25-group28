/**
 * @file puppeteer-demo.test.js
 * @description
 * Tests primary navigation and filtering functionality across the workout deck app.
 */

describe('Basic user flow for Website', () => {

  beforeAll(async () => {
    await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28/');
  });

  it('Clicking Create New Deck redirects to create-deck.html', async () => {
    await page.click('.create-deck');
    const url = page.url();
    expect(url).toContain('source/create-deck.html');
  }, 15000);

  it('Clicking View Deck redirects to index.html', async () => {
    await page.click('.view-decks');
    const url = page.url();
    expect(url).toContain('index.html');
  }, 15000);

  it('Testing Filtering System', async () => {
    await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28/');
    await page.click('.create-deck');

    await page.waitForSelector('#filter-muscle');

    await page.click('#filter-muscle .custom-dropdown-selected');

    await page.waitForSelector('#filter-muscle .custom-dropdown-options');

    await page.evaluate(() => {
      const options = document.querySelectorAll('#filter-muscle .custom-dropdown-option');
      for (const opt of options) {
        if (opt.dataset.value === 'biceps') {
          opt.click();
          break;
        }
      }
    });

    // Check visible cards
    const visibleMuscles = await page.evaluate(() => {
      const cards = document.querySelectorAll('workout-card');
      return Array.from(cards)
        .filter(card => getComputedStyle(card).display !== 'none')
        .map(card => card.dataset.muscle);
    });
    
    expect(visibleMuscles.every(muscle => muscle === 'biceps')).toBe(true);

    // Check localStorage
    const savedFilters = await page.evaluate(() => localStorage.getItem('filters'));
    expect(savedFilters).toContain('"muscle":"biceps"');
  }, 15000);
});
