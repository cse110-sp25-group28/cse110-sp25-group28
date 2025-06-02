describe('create deck test', () => {
  beforeAll(async () => {
  await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28', {
    waitUntil: 'load',
  }); // Start on blank page

  // Preload decks into localStorage
  await page.evaluate(() => {
    localStorage.setItem("decks", JSON.stringify([
      {
        name: "Chest Day", cards: []
      },
      {
        name: "Legs", cards: []
      },
      {
        name: "Core Blast", cards: []
      },
      {
        name: "Arm Workout", cards: []
      }
    ]));
  });

  // Now load your real site with localStorage already populated
  await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28', {
    waitUntil: 'domcontentloaded'
  });
});
  it('Get initial workout decks', async () => {
    console.log('initialization');

    await page.waitForFunction(() => document.querySelector('.deck-box') !== null);

    const numWorkoutSets = await page.$$eval('#default-deck-container .deck-box', boxes => boxes.length);
    expect(numWorkoutSets).toBe(4);
  }, 10000);
});
