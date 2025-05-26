describe('Basic user flow for Website', () => {

  beforeAll(async () => {
    await page.goto('http://localhost:3000/index.html');
  });

  it('Clicking Create New Deck redirects to create-deck.html', async () => {
    await page.click('.create-deck');
    const url = page.url();
    expect(url).toContain('create-deck.html');
  }, 10000);

  it('Clicking View Deck redirects to index.html', async () => {
    await page.click('.view-decks');
    const url = page.url();
    expect(url).toContain('index.html');
  }, 10000);

  it('Testing Filtering System', async () => {
    await page.waitForSelector('.create-deck', { timeout: 5000 });
    await page.click('.create-deck');

    // ⏳ Wait for dropdown to be injected
    await page.waitForSelector('select#filter-muscle');

    // ✅ Now it's safe to select
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
}, 10000);
});