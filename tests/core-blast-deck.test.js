describe('create deck test', () => {
    // First, visit the website
    beforeAll(async () => {
      await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28');
      await page.waitForSelector('.deck-box', { timeout: 10000 });
      const deck3 = await page.$$eval('.deck-box', (decks) => {
        return decks[2];
      });
      await deck3.click();
    });
  
    // Each it() call is a separate test
    // Here, we check to make sure that all workouts have loaded
    it('Checking the workout values', async () => {  
      await page.waitForSelector('#card-display', { timeout: 10000 });

      // Select Workout
      const workout1 = await page.$eval('#card-display', (workout) => {
        return workout;
      });
  
      // Expect that workout1 will be Plank
      expect(workout1).toBe("Plank");

      let next = await page.$eval('.next-button', (nextButton) => {
        return nextButton;
      });
      await next.click();

      await page.waitForSelector('#card-display', { timeout: 10000 });

      // Select the workout
      const workout2 = await page.$eval('#card-display', (workout) => {
        return workout;
      });
  
      // Expect that workout2 will be Oblique Crunch
      expect(workout2).toBe("Oblique Crunch");

      next = await page.$eval('.next-button', (nextButton) => {
        return nextButton;
      });
      await next.click();

      await page.waitForSelector('#card-display', { timeout: 10000 });

      // Select the workout
      const workout3 = await page.$eval('#card-display', (workout) => {
        return workout;
      });
  
      // Expect that workout3 will be Leg Raises
      expect(workout3).toBe("Leg Raises");
    }, 30000);
});
  