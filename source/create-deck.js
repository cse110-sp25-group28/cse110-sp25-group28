import { initFiltering } from './assets/scripts/filter-control.js';
window.addEventListener("DOMContentLoaded", init);

/**
 * Starts the program, all function calls trace back here
 */
async function init() {
    const workouts = await getWorkoutsFromStorage();
    if (workouts) {
      addWorkoutsToDocument(workouts);
      initFiltering(workouts);
    }
}

/**
 * Fetch workout data from JSON file and create workout cards
 * Each card includes image &details about workout
 * @returns {workouts} array containing information of all workouts
 */
async function getWorkoutsFromStorage() {
    try {
        const dataURL = './workouts/workouts.json';
        const response = await fetch(dataURL);
        if (!response.ok) {
          throw new Error(`Failed to fetch workouts.json: ${response.status}`);
        }
    
        const workouts = await response.json();
        return workouts;

      } catch (err) {
        console.error(err);
        return null;
      }
}


/**
 * Create DOM elements representing workout cards and append them to the <main> element.
 * @param {Array<{name: string, category: string, muscle: string, description: string, image: string}>} workouts - Array of workout data objects
 */
function addWorkoutsToDocument(workouts) {
  const main = document.querySelector('main');
  workouts.forEach((workout) => {
    const workoutCard = document.createElement('workout-card');
    workoutCard.data = workout;
    main.appendChild(workoutCard);
  });
}


// Track the currently enlarged card
let currentEnlargedCard = null;

// Listen for custom events dispatched from any card
document.addEventListener("workout-card-clicked", (e) => { // e is the custom event
  const clickedCard = e.detail.card;

  // If another card is already enlarged, shrink it
  if (currentEnlargedCard && currentEnlargedCard !== clickedCard) {
    currentEnlargedCard.shrinkCard();
  }

  // Toggle the clicked card's state
  if (clickedCard.isEnlarged()) {
    clickedCard.shrinkCard();
    currentEnlargedCard = null;
  } else {
    clickedCard.enlargeCard();
    currentEnlargedCard = clickedCard;
  }
});



