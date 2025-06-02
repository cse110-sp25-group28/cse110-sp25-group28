describe('create legs deck test', () => {
  // Visit the website and click the second deck (index 1)
  beforeAll(async () => {
    await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28');
    await page.reload({ waitUntil: 'domcontentloaded' });

    const deckElements = await page.$$('.deck-box');
    await deckElements[1].click();
  }, 40000);

  it('Checking the workout values', async () => {
    // Wait until first workout loads
    await page.waitForFunction(
      () => document.querySelector('#card-display')?.textContent.trim() !== 'Loading...',
      { timeout: 10000 }
    );
    const workout1 = await page.$eval('#card-display', el => el.textContent.trim());
    expect(workout1).toBe("Squat");

    // Click next and wait for second workout
    await page.click('.next-button');
    await page.waitForFunction(
      () => document.querySelector('#card-display')?.textContent.trim() !== 'Loading...',
      { timeout: 10000 }
    );
    const workout2 = await page.$eval('#card-display', el => el.textContent.trim());
    expect(workout2).toBe("Calf Raises");

    // Click next and wait for third workout
    await page.click('.next-button');
    await page.waitForFunction(
      () => document.querySelector('#card-display')?.textContent.trim() !== 'Loading...',
      { timeout: 10000 }
    );
    const workout3 = await page.$eval('#card-display', el => el.textContent.trim());
    expect(workout3).toBe("Glute Bridge");
  }, 90000);
});
