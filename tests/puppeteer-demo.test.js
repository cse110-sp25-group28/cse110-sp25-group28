describe('Basic user flow for Website', () => {

  beforeAll(async () => {
    await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28/');
  });

  it('Clicking Create New Deck redirects to create-deck.html', async () => {
    await page.click('.create-deck');
    const url = page.url();
    expect(url).toContain('create-deck.html');
  }, 10000);

  it('Clicking View Deck redirects to index.html', async () => {
    await page.click('button');
    
    const url = page.url();
    expect(url).toContain('index.html');
  }, 10000);

});