describe('create legs deck test', () => {
  beforeAll(async () => {
    await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28');
    await page.reload({ waitUntil: 'domcontentloaded' });

    const deckElements = await page.$$('.deck-box');
    await deckElements[1].click(); // Click the 2nd deck: Legs
  }, 40000);

  it('Checking the leg workouts in the carousel', async () => {
    const nextSelector = '#next-button';

    async function getWorkoutName() {
      return await page.evaluate(() => {
        const card = document.querySelector('#card-display workout-card');
        const shadow = card?.shadowRoot;
        return shadow?.querySelector('h2.name a')?.textContent.trim();
      });
    }

    // Wait for first workout
    await page.waitForFunction(() => {
      const shadow = document.querySelector('workout-card')?.shadowRoot;
      const name = shadow?.querySelector('h2.name a')?.textContent.trim();
      return name?.length > 0;
    }, { timeout: 15000 });

    const workout1 = await getWorkoutName();
    expect(workout1).toBe("Squat");

    // Next workout
    await page.click(nextSelector);
    await page.waitForFunction(() => {
      const shadow = document.querySelector('workout-card')?.shadowRoot;
      const name = shadow?.querySelector('h2.name a')?.textContent.trim();
      return name && name !== "Squat";
    }, { timeout: 15000 });

    const workout2 = await getWorkoutName();
    expect(workout2).toBe("Calf Raises");

    // Next workout
    await page.click(nextSelector);
    await page.waitForFunction(() => {
      const shadow = document.querySelector('workout-card')?.shadowRoot;
      const name = shadow?.querySelector('h2.name a')?.textContent.trim();
      return name && name !== "Calf Raises";
    }, { timeout: 15000 });

    const workout3 = await getWorkoutName();
    expect(workout3).toBe("Glute Bridge");
  }, 90000);
});
