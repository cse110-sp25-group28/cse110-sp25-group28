describe('create arm workout deck test', () => {
  beforeAll(async () => {
    await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28/');
    await page.reload({ waitUntil: 'domcontentloaded' });

    const deckElements = await page.$$('.deck-box');
    await deckElements[3].click(); // 4th deck (index 3)
  }, 40000);

  it('Checking the arm workout carousel values', async () => {
    async function getWorkoutName() {
      return await page.evaluate(() => {
        const card = document.querySelector('#card-display workout-card');
        const shadow = card?.shadowRoot;
        return shadow?.querySelector('h2.name a')?.textContent.trim();
      });
    }

    // Wait for first card to load
    await page.waitForFunction(() => {
      const card = document.querySelector('#card-display workout-card');
      const shadow = card?.shadowRoot;
      return shadow?.querySelector('h2.name a')?.textContent.trim()?.length > 0;
    }, { timeout: 20000 });

    const workout1 = await getWorkoutName();
    expect(workout1).toBe("Bicep Curl");

    // Next workout
    await page.click('#next-button');
    await page.waitForFunction(() => {
      const shadow = document.querySelector('workout-card')?.shadowRoot;
      const name = shadow?.querySelector('h2.name a')?.textContent.trim();
      return name && name !== "Bicep Curl";
    }, { timeout: 15000 });

    const workout2 = await getWorkoutName();
    expect(workout2).toBe("Tricep Dip");

    // Next workout
    await page.click('#next-button');
    await page.waitForFunction(() => {
      const shadow = document.querySelector('workout-card')?.shadowRoot;
      const name = shadow?.querySelector('h2.name a')?.textContent.trim();
      return name && name !== "Tricep Dip";
    }, { timeout: 15000 });

    const workout3 = await getWorkoutName();
    expect(workout3).toBe("Shoulder Press");
  }, 90000);
});
