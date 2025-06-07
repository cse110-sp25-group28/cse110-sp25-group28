describe('create arm workout deck test', () => {
  beforeAll(async () => {
    await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28/');
    await page.reload({ waitUntil: 'domcontentloaded' });

    const deckElements = await page.$$('.deck-box');
    await deckElements[3].click(); // 4th deck (index 3)
  }, 40000);

  it('Checking the arm workout carousel values', async () => {
    const nextSelector = '#next-button';

    async function getWorkoutName() {
      return await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('#card-display workout-card'));
        const visibleCard = cards.find(c => getComputedStyle(c).display !== 'none');
        const shadow = visibleCard?.shadowRoot;
        return shadow?.querySelector('h2.name a')?.textContent.trim() || null;
      });
    }

    async function waitForNewWorkout(prevName) {
      await page.waitForFunction((prev) => {
        const cards = Array.from(document.querySelectorAll('#card-display workout-card'));
        const visibleCard = cards.find(c => getComputedStyle(c).display !== 'none');
        const shadow = visibleCard?.shadowRoot;
        const name = shadow?.querySelector('h2.name a')?.textContent.trim();
        return name && name !== prev;
      }, { timeout: 15000 }, prevName);

    }

    // Wait for and flip the first card
    await page.waitForSelector('#card-display workout-card', { timeout: 15000 });
    await page.click('#card-display workout-card');

    await page.waitForFunction(() => {
      const cards = Array.from(document.querySelectorAll('#card-display workout-card'));
      const visibleCard = cards.find(c => getComputedStyle(c).display !== 'none');
      const shadow = visibleCard?.shadowRoot;
      return shadow?.querySelector('h2.name a')?.textContent.trim()?.length > 0;
    });

    const workout1 = await getWorkoutName();
    expect(workout1).toBe("Bicep Curl");

    // Next workout
    await page.click(nextSelector);
    await waitForNewWorkout("Bicep Curl");
    const workout2 = await getWorkoutName();
    expect(workout2).toBe("Tricep Dip");

    // Next workout
    await page.click(nextSelector);
    await waitForNewWorkout("Tricep Dip");
    const workout3 = await getWorkoutName();
    expect(workout3).toBe("Shoulder Press");
  }, 90000);

  
});