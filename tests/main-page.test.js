describe('create deck test', () => {
    // First, visit the website
    beforeAll(async () => {
      await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28');
    });
  
    // Each it() call is a separate test
    // Here, we check to make sure that all 4 <deck-box> class elements have loaded
    it('Get intial workout decks', async () => {
      console.log('initialization');
  
      await page.waitForSelector('.deck-box', { timeout: 10000 });

      // Query select all of the <deck-box> class elements and return the length of that array
      const numWorkoutSets = await page.$$eval('.deck-box', (decks) => {
        return decks.length;
      });
  
      // Expect there that array from earlier to be of length 4, meaning 4 <deck-box> class elements were found
      expect(numWorkoutSets).toBe(4);
    }, 10000);
});
  