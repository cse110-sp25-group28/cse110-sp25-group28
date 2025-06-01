describe('create deck test', () => {
    // First, visit the website
    beforeAll(async () => {
      await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28');
      await page.waitForSelector('.deck-box', { timeout: 10000 });
      const deck1 = await page.$$eval('.deck-box', (decks) => {
        return decks[0];
      });
      await deck1.click();
    });
  
    // Each it() call is a separate test
    // Here, we check to make sure that all workouts have loaded
    it('Checking the workout values', async () => {  
      await page.waitForSelector('#card-display', { timeout: 10000 });

      // Select Workout
      const workout1 = await page.$eval('#card-display', (workout) => {
        return workout;
      });
  
      // Expect that workout1 will be Push-Up
      expect(workout1).toBe("Push-Up");

      let next = await page.$eval('.next-button', (nextButton) => {
        return nextButton;
      });
      await next.click();

      await page.waitForSelector('#card-display', { timeout: 10000 });

      // Select the workout
      const workout2 = await page.$eval('#card-display', (workout) => {
        return workout;
      });
  
      // Expect that workout2 will be Bench Press
      expect(workout2).toBe("Bench Press");

      next = await page.$eval('.next-button', (nextButton) => {
        return nextButton;
      });
      await next.click();

      await page.waitForSelector('#card-display', { timeout: 10000 });

      // Select the workout
      const workout3 = await page.$eval('#card-display', (workout) => {
        return workout;
      });
  
      // Expect that workout3 will be Incline Press
      expect(workout3).toBe("Incline Press");
    });
});
  