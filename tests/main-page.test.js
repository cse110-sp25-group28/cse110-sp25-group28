/**
 * @file home-deck.test.js
 * @description
 * Verifies that the initial default workout decks are loaded correctly on the homepage.
 * Specifically checks that 4 default decks are displayed.
 */

describe('create deck test', () => {
  // Navigate to homepage and wait for DOM and localStorage initialization
  beforeAll(async () => {
    await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28');
    // Reload the page so localStorage changes take effect
    await page.reload({ waitUntil: 'domcontentloaded' });
  });
  it('Get initial workout decks', async () => {
    console.log('initialization');
    await page.waitForFunction(() => document.querySelector('.deck-box') !== null);
    const numWorkoutSets = await page.$$eval('#default-deck-container .deck-box', boxes => boxes.length);
    expect(numWorkoutSets).toBe(4);
  }, 10000);
});
