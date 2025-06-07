/**
 * @file core-blast.test.js
 * @description
 * End-to-end test for the "Core Blast" workout deck carousel.
 * Verifies the correct order of workout cards:
 * - Plank → Oblique Crunch → Leg Raises
 */

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
        const cards = Array.from(document.querySelectorAll('#card-display workout-card'));
        const visibleCard = cards.find(c => getComputedStyle(c).display !== 'none');
        const shadow = visibleCard?.shadowRoot;
        return shadow?.querySelector('h2.name a')?.textContent.trim() || null;
      });
    }

    // Wait for first workout to load
    await page.waitForFunction(() => {
      const cards = Array.from(document.querySelectorAll('#card-display workout-card'));
      const visibleCard = cards.find(c => getComputedStyle(c).display !== 'none');
      const shadow = visibleCard?.shadowRoot;
      const name = shadow?.querySelector('h2.name a')?.textContent.trim();
      return name?.length > 0;
    }, { timeout: 15000 });

    const workout1 = await getWorkoutName();
    expect(workout1).toBe("Plank");

    // Go to next card
    await page.click('#next-button');
    await page.waitForFunction(() => {
      const cards = Array.from(document.querySelectorAll('#card-display workout-card'));
      const visibleCard = cards.find(c => getComputedStyle(c).display !== 'none');
      const shadow = visibleCard?.shadowRoot;
      const name = shadow?.querySelector('h2.name a')?.textContent.trim();
      return name && name !== "Plank";
    }, { timeout: 15000 });

    const workout2 = await getWorkoutName();
    expect(workout2).toBe("Oblique Crunch");

    // Go to next card
    await page.click('#next-button');
    await page.waitForFunction(() => {
      const cards = Array.from(document.querySelectorAll('#card-display workout-card'));
      const visibleCard = cards.find(c => getComputedStyle(c).display !== 'none');
      const shadow = visibleCard?.shadowRoot;
      const name = shadow?.querySelector('h2.name a')?.textContent.trim();
      return name && name !== "Oblique Crunch";
    }, { timeout: 15000 });

    const workout3 = await getWorkoutName();
    expect(workout3).toBe("Leg Raises");
  }, 90000);

 
});