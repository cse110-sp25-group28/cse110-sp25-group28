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

  
    //await page.waitForSelector('.custom-dropdown-options');
    
    await page.click('.custom-dropdown-selected');

    await page.waitForSelector('.custom-dropdown-option', { visible: true });

    await page.evaluate(() => {
      const options = Array.from(document.querySelectorAll('.custom-dropdown-option'));
      const chestOption = options.find(el => el.textContent.trim().toLowerCase() === 'chest');
      if (chestOption) chest.click();
    });    


}, 15000);
});
