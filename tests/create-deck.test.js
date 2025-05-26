describe('create deck test', () => {
    // First, visit the website
    beforeAll(async () => {
      await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28/create-deck.html');
    });
  
    // Each it() call is a separate test
    // Here, we check to make sure that all 43 <workout-card> elements have loaded
    it('Get workouts from local paths', async () => {
      console.log('getWorkoutsFromStorage() function');
  
      // Query select all of the <product-item> elements and return the length of that array
      const numWorkouts = await page.$$eval('workout-card', (workoutCards) => {
        return workoutCards.length;
      });
  
      // Expect there that array from earlier to be of length 43, meaning 43 <workout-card> elements were found
      expect(numWorkouts).toBe(43);
    });

    // Check to make sure that all 43 <workout-card> elements have data in them
    it('Make sure <product-item> elements are populated', async () => {
        console.log('Checking to make sure <product-item> elements are populated...');

        // Start as true, if any don't have data, swap to false
        let allArePopulated = true;

        // Query select all of the <product-item> elements
        const workoutCardData = await page.$$eval('product-item', workoutCards => {
            return workoutCards.map(item => {
                // Grab all of the json data stored inside
                return item.data;
            });
        });

        for (let i = 0; i < workoutCardData.length;  i++){
            let value = workoutCardData[i];
            if (value.name.length == 0) { allArePopulated = false; }
            if (value.muscle.length == 0) { allArePopulated = false; }
            if (value.description.length == 0) { allArePopulated = false; }
            if (value.image.length == 0) { allArePopulated = false; }
            expect(allArePopulated).toBe(true);
        }
    }, 20000);
});
  