window.addEventListener("DOMContentLoaded", init);

/**
 * Starts the program, all function calls trace back here
 */
async function init() {
    const workouts = await getWorkoutsFromStorage();
    if (workouts) {
      addWorkoutsToDocument(workouts);
    }
}

/**
 * Fetch workout data from JSON file and create workout cards
 * Each card includes image &details about workout
 * @returns {workouts} array containing information of all workouts
 */
async function getWorkoutsFromStorage() {
    try {
        const dataURL = new URL('../../../workouts/workouts.json', import.meta.url);
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

