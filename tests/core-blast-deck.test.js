describe('create core blast deck test', () => {
  beforeAll(async () => {
    await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28');
    await page.reload({ waitUntil: 'domcontentloaded' });

    const deckElements = await page.$$('.deck-box');
    await deckElements[2].click();
  }, 40000);

  it('Checking the workout values', async () => {
    // Wait for first workout to load
    await page.waitForFunction(
      () => document.querySelector('#card-display')?.textContent.trim() !== 'Loading...',
      { timeout: 10000 }
    );
    const workout1 = await page.$eval('#card-display', el => el.textContent.trim());
    expect(workout1).toBe("Plank");

    // Next workout
    await page.click('#next-button');
    await page.waitForFunction(
      () => document.querySelector('#card-display')?.textContent.trim() !== 'Loading...',
      { timeout: 10000 }
    );
    const workout2 = await page.$eval('#card-display', el => el.textContent.trim());
    expect(workout2).toBe("Oblique Crunch");

    // Next workout
    await page.click('#next-button');
    await page.waitForFunction(
      () => document.querySelector('#card-display')?.textContent.trim() !== 'Loading...',
      { timeout: 10000 }
    );
    const workout3 = await page.$eval('#card-display', el => el.textContent.trim());
    expect(workout3).toBe("Leg Raises");
  }, 90000);
});
