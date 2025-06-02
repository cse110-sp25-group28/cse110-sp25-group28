describe('create deck test', () => {
  beforeAll(async () => {
    await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28', {
      waitUntil: 'domcontentloaded',
    });

    // Clear localStorage in case a previous test run interfered
    await page.evaluate(() => {
      localStorage.clear();
    });

    // Reload the page so localStorage changes take effect
    await page.reload({ waitUntil: 'domcontentloaded' });

    // Wait for deck-box elements to be rendered
    await page.waitForSelector('.deck-box', { timeout: 5000 });
  });

  it('Get initial workout decks', async () => {
    console.log('initialization');

    const numWorkoutSets = await page.$$eval('.deck-box', (decks) => decks.length);
    expect(numWorkoutSets).toBe(4);
  }, 10000);
});
  
