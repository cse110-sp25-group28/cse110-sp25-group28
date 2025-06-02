describe('create chest day deck test', () => {
  // Visit the website and click on the first deck
  beforeAll(async () => {
    await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28');
    await page.reload({ waitUntil: 'domcontentloaded' });

    // Get all deck elements and click the first one
    const deckElements = await page.$$('.deck-box');
    await deckElements[0].click();
  }, 40000);

  it('Checking the workout values', async () => {
    console.log("spot 1");
    await page.waitForSelector('#card-display', { timeout: 10000 });
    console.log('spot 2');

    // Check first workout
    const workout1 = await page.$eval('#card-display', el => el.textContent.trim());
    expect(workout1).toBe("Push-Up");

    // Click next and check second workout
    await page.click('#next-button');
    await page.waitForSelector('#card-display', { timeout: 10000 });
    const workout2 = await page.$eval('#card-display', el => el.textContent.trim());
    expect(workout2).toBe("Bench Press");

    // Click next and check third workout
    await page.click('#next-button');
    await page.waitForSelector('#card-display', { timeout: 10000 });
    const workout3 = await page.$eval('#card-display', el => el.textContent.trim());
    expect(workout3).toBe("Incline Press");
  }, 90000);
});
