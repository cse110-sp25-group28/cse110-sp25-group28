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
  // Wait until first workout loads
  await page.waitForFunction(
    () => document.querySelector('#card-display')?.textContent.trim() !== 'Loading...',
    { timeout: 10000 }
  );
  const workout1 = await page.$eval('#card-display', el => el.textContent.trim());
  expect(workout1).toBe("Push-Up");

  // Click next and wait for second workout to load
  await page.click('#next-button');
  await page.waitForFunction(
    () => document.querySelector('#card-display')?.textContent.trim() !== 'Loading...',
    { timeout: 10000 }
  );
  const workout2 = await page.$eval('#card-display', el => el.textContent.trim());
  expect(workout2).toBe("Bench Press");

  // Click next and wait for third workout to load
  await page.click('#next-button');
  await page.waitForFunction(
    () => document.querySelector('#card-display')?.textContent.trim() !== 'Loading...',
    { timeout: 10000 }
  );
  const workout3 = await page.$eval('#card-display', el => el.textContent.trim());
  expect(workout3).toBe("Incline Press");
}, 90000);
});
