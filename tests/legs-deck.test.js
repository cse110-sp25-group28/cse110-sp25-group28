describe('create legs deck test', () => {
    // First, visit the website
    beforeAll(async () => {
      await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28');
      // Reload the page so localStorage changes take effect
      await page.reload({ waitUntil: 'domcontentloaded' });
      const deck2 = await page.$$eval('.deck-box', (decks) => {
        return decks[1];
      });
      await page.click(deck2);
    }, 40000);
  
    // Each it() call is a separate test
    // Here, we check to make sure that all workouts have loaded
    it('Checking the workout values', async () => {  
      console.log("hi");
      await page.waitForSelector('#card-display', { timeout: 10000 });

      // Select Workout
      const workout1 = await page.$eval('#card-display');
  
      // Expect that workout1 will be Squat
      expect(workout1).toBe("Squat");

      let next = await page.$eval('.next-button', (nextButton) => {
        return nextButton;
      });
      await next.click();

      await page.waitForSelector('#card-display', { timeout: 10000 });

      // Select the workout
      const workout2 = await page.$eval('#card-display', (workout) => {
        return workout;
      });
  
      // Expect that workout2 will be Calf Raises
      expect(workout2).toBe("Calf Raises");

      next = await page.$eval('.next-button', (nextButton) => {
        return nextButton;
      });
      await next.click();

      await page.waitForSelector('#card-display', { timeout: 10000 });

      // Select the workout
      const workout3 = await page.$eval('#card-display', (workout) => {
        return workout;
      });
  
      // Expect that workout3 will be Glute Bridge
      expect(workout3).toBe("Glute Bridge");
    }, 90000);
});
  