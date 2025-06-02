
describe('create deck test', () => {
    // First, visit the website
    beforeAll(async () => {
      await page.goto('https://cse110-sp25-group28.github.io/cse110-sp25-group28/source/create-deck.html');
    });
  
    // Each it() call is a separate test
    // Here, we check to make sure that all 43 <workout-card> elements have loaded
    it('Get workouts from local paths', async () => {
      console.log('getWorkoutsFromStorage() function');
  
      await page.waitForSelector('workout-card', { timeout: 10000 });

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



     it('should load workout cards from JSON', async () => {
        await page.waitForSelector('workout-card');
        const cards = await page.$$('workout-card');
        expect(cards.length).toBeGreaterThan(0);
      });



  it('should toggle selection mode and allow selecting a card', async () => {
  await page.click('#selectorOn');
  await page.waitForSelector('workout-card');

  const cards = await page.$$('workout-card');
  const firstCard = cards[0];

  // Simulate a click on the card
  await firstCard.click();


  const isSelected = await page.evaluate(card => card.classList.contains('selected'), firstCard);
  expect(isSelected).toBe(true);
});



  it('should show an error if Create Deck is clicked with no selection', async () => {
    // Deselect all cards
    await page.evaluate(() => {
      document.querySelectorAll('.selected').forEach(card => card.classList.remove('selected'));
    });

    await page.click('#create-deck-button');

    const errorText = await page.$eval('#create-deck-error', el => el.textContent);
    expect(errorText).toContain('Please select a card');
  });


  
});
  