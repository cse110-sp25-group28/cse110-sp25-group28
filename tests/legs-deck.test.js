describe('create legs deck test', () => {
  beforeAll(async () => {
    await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28');
    await page.reload({ waitUntil: 'domcontentloaded' });

    const deckElements = await page.$$('.deck-box');
    await deckElements[1].click();
  }, 40000);

  it('Checking the workout values', async () => {
    const nextSelector = '#next-button'; // Update this!

    await page.waitForFunction(
      () => document.querySelector('#card-display')?.textContent.trim() !== 'Loading...',
      { timeout: 10000 }
    );
    const workout1 = await page.$eval('#card-display', el => el.textContent.trim());
    expect(workout1).toBe("Squat");

    await page.waitForSelector(nextSelector, { timeout: 10000 });
    await page.click(nextSelector);

    await page.waitForFunction(
      () => document.querySelector('#card-display')?.textContent.trim() !== 'Loading...',
      { timeout: 10000 }
    );
    const workout2 = await page.$eval('#card-display', el => el.textContent.trim());
    expect(workout2).toBe("Calf Raises");

    await page.waitForSelector(nextSelector, { timeout: 10000 });
    await page.click(nextSelector);

    await page.waitForFunction(
      () => document.querySelector('#card-display')?.textContent.trim() !== 'Loading...',
      { timeout: 10000 }
    );
    const workout3 = await page.$eval('#card-display', el => el.textContent.trim());
    expect(workout3).toBe("Glute Bridge");
  }, 90000);
});
