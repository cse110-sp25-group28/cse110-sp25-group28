describe('create legs deck test', () => {
  beforeAll(async () => {
    await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28');
    await page.reload({ waitUntil: 'domcontentloaded' });

    const deckElements = await page.$$('.deck-box');
    await deckElements[1].click(); // Click the 2nd deck: Legs
  }, 40000);

  it('Checking the leg workouts in the carousel', async () => {
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

    // Wait for first card to load
    await page.waitForSelector('#card-display workout-card', { timeout: 15000 });
    await page.click('#card-display workout-card'); // Flip the first card

    await page.waitForFunction(() => {
      const cards = Array.from(document.querySelectorAll('#card-display workout-card'));
      const visibleCard = cards.find(c => getComputedStyle(c).display !== 'none');
      const shadow = visibleCard?.shadowRoot;
      return shadow?.querySelector('h2.name a')?.textContent.trim()?.length > 0;
    });

    const workout1 = await getWorkoutName();
    expect(workout1).toBe("Squat");

    // Next workout
    await page.click('#next-button');
    await waitForNewWorkout("Squat");
    const workout2 = await getWorkoutName();
    expect(workout2).toBe("Calf Raises");

    // Next workout
    await page.click('#next-button');
    await waitForNewWorkout("Calf Raises");
    const workout3 = await getWorkoutName();
    expect(workout3).toBe("Glute Bridge");
  }, 90000);
});