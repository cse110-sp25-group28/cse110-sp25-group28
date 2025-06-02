describe('create core blast deck test', () => {
  beforeAll(async () => {
    await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28');
    await page.reload({ waitUntil: 'domcontentloaded' });

    // Click the 3rd deck (index 2)
    const deckElements = await page.$$('.deck-box');
    await deckElements[2].click();
  }, 40000);

  it('Checking the core workouts in the carousel', async () => {
    async function getWorkoutName() {
      return await page.evaluate(() => {
        const card = document.querySelector('#card-display workout-card');
        const shadow = card?.shadowRoot;
        return shadow?.querySelector('h2.name a')?.textContent.trim();
      });
    }

    // Wait for first workout to load
    await page.waitForFunction(() => {
      const card = document.querySelector('#card-display workout-card');
      const shadow = card?.shadowRoot;
      const name = shadow?.querySelector('h2.name a')?.textContent.trim();
      return name?.length > 0;
    }, { timeout: 15000 });

    const workout1 = await getWorkoutName();
    expect(workout1).toBe("Plank");

    // Next workout
    await page.click('#next-button');
    await page.waitForFunction(() => {
      const shadow = document.querySelector('workout-card')?.shadowRoot;
      const name = shadow?.querySelector('h2.name a')?.textContent.trim();
      return name && name !== "Plank";
    }, { timeout: 15000 });

    const workout2 = await getWorkoutName();
    expect(workout2).toBe("Oblique Crunch");

    // Next workout
    await page.click('#next-button');
    await page.waitForFunction(() => {
      const shadow = document.querySelector('workout-card')?.shadowRoot;
      const name = shadow?.querySelector('h2.name a')?.textContent.trim();
      return name && name !== "Oblique Crunch";
    }, { timeout: 15000 });

    const workout3 = await getWorkoutName();
    expect(workout3).toBe("Leg Raises");
  }, 90000);
});
