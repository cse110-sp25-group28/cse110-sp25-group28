
/**
 * Fetch workout data from JSON file and create workout cards
 * Each card includes image &details about workout
 */
async function loadWorkoutCards() {
  try {
    const dataURL = './workouts/workouts.json';
    const response = await fetch(dataURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch workouts.json: ${response.status}`);
    }

    const workouts = await response.json();
    const main = document.querySelector('main');

    const placeholder = main.querySelector('.card');
    if (placeholder) {
      placeholder.remove();
    }

    const container = document.createElement('div');
    container.id = 'workout-cards';
    main.insertBefore(container, main.querySelector('.button-container'));

    workouts.forEach((workout) => {
      container.appendChild(createWorkoutCard(workout));
    });
  } catch (err) {
    console.error(err);
  }
}

/**
 * Create DOM element representing workout card.
 * @param {{name: string, muscle: string, description: string}} workout - Workout data
 * @returns {HTMLElement} The created card element
 */
function createWorkoutCard(workout) {
  const card = document.createElement('article');
  card.classList.add('card');

  const img = document.createElement('img');
  const imgBase = './workouts/images/';
  img.src = imgBase + encodeURIComponent(workout.name) + '.webp';
  img.alt = workout.name;
  card.appendChild(img);

  const name = document.createElement('h2');
  name.textContent = workout.name;
  card.appendChild(name);

  const muscle = document.createElement('p');
  muscle.textContent = `Target Muscle: ${workout.muscle}`;
  card.appendChild(muscle);

  const description = document.createElement('p');
  description.textContent = workout.description;
  card.appendChild(description);

  return card;
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', loadWorkoutCards);
}

export { loadWorkoutCards, createWorkoutCard };