/**
 * @file chest-day.test.js
 * @description
 * End-to-end test for verifying the carousel order of the "Chest Day" deck.
 * This test checks:
 * - Correct rendering of the first card
 * - Proper navigation through all 3 cards
 */

describe('create chest day deck test', () => 
{
  beforeAll(async () => 
  {
    await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28');
    await page.reload({ waitUntil: 'domcontentloaded' });

    // Click the first deck card
    const deckCards = await page.$$('.deck-box');
    await deckCards[0].click();
  }, 30000);

  it('should display the correct workout names in the carousel', async () => 
  {
    async function getWorkoutName() 
    {
      return await page.evaluate(() => 
      {
        const cards = Array.from(
          document.querySelectorAll('#card-display workout-card')
        );
        const visibleCard = cards.find(
          (c) => getComputedStyle(c).display !== 'none'
        );
        const shadow = visibleCard?.shadowRoot;
        return shadow?.querySelector('h2.name a')?.textContent.trim() || null;
      });
    }

    // Wait until first workout is loaded
    await page.waitForFunction(() => 
    {
      const card = document.querySelector('#card-display workout-card');
      const shadow = card?.shadowRoot;
      return shadow?.querySelector('h2.name a')?.textContent.trim().length > 0;
    }, { timeout: 15000 });

    const workout1 = await getWorkoutName();
    expect(workout1).toBe('Push-Up');
    // Go to next card
    await page.click('#next-button');
    await page.waitForFunction(() => 
    {
      const cards = Array.from(
        document.querySelectorAll('#card-display workout-card')
      );
      const visibleCard = cards.find(
        (c) => getComputedStyle(c).display !== 'none'
      );
      const shadow = visibleCard?.shadowRoot;
      const name = shadow?.querySelector('h2.name a')?.textContent.trim();
      return name && name !== 'Push-Up';
    }, { timeout: 15000 });

    const workout2 = await getWorkoutName();
    expect(workout2).toBe('Bench Press');

    // Go to next card
    await page.click('#next-button');
    await page.waitForFunction(() => 
    {
      const card = document.querySelector('#card-display workout-card');
      const shadow = card?.shadowRoot;
      const name = shadow?.querySelector('h2.name a')?.textContent.trim();
      return name && name !== 'Bench Press';
    }, { timeout: 20000 });

    const workout3 = await getWorkoutName();
    expect(workout3).toBe('Incline Press');
  }, 60000);

 
});
