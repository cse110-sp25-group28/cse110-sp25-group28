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

  it('should filter cards when a muscle group is selected', async () => {
    // Click the dropdown to open it
    await page.click('.custom-dropdown-selected');

    // Wait for the options to be visible
    await page.waitForSelector('.custom-dropdown-options', { visible: true });

    // Click the "Biceps" option (or any you choose)
    await page.click('.custom-dropdown-option[data-value="biceps"]');

    // Wait for the dropdown to update the selected text
    const selectedText = await page.$eval(
      '.custom-dropdown-selected',
      el => el.textContent
    );

    expect(selectedText).toBe('Biceps');

    // Wait for the filtering to take effect (optional, adjust selector as needed)
    await page.waitForTimeout(500); // or waitForSelector if there’s a filtered result

    // Example: Verify that only cards with data-value="biceps" are visible
    const visibleCards = await page.$$eval(
      '.card', // adjust selector to your card container
      cards => cards.map(card => card.getAttribute('data-muscle'))
    );

    // All cards should have 'biceps' as the muscle group
    visibleCards.forEach(muscle => {
      expect(muscle).toBe('biceps');
    });


}, 15000);
});
