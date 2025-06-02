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
    await page.waitForSelector('.create-deck', { timeout: 10000 });
    const exists = await page.$('.create-deck');
    if (!exists) {
      throw new Error('Element .create-deck not found!');
    }
    await page.click('.create-deck');

  
    await page.waitForSelector('select#filter-muscle');
    
    await page.select('select#filter-muscle', 'biceps');

    // Check visible cards
    const visibleMuscles = await page.$$eval('workout-card', cards =>
      cards
        .filter(card => getComputedStyle(card).display !== 'none')
        .map(card => card.dataset.muscle)
  );

  expect(visibleMuscles.every(muscle => muscle === 'biceps')).toBe(true);

  // Check localStorage
  const savedFilters = await page.evaluate(() => localStorage.getItem('filters'));
  expect(savedFilters).toContain('"muscle":"biceps"');
}, 15000);
});
