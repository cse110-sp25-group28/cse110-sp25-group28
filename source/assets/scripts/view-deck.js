import './card.js';         
import { shuffle } from './shuffle.js';

window.addEventListener('DOMContentLoaded', async () => {
  const title = document.getElementById('deck-title');
  const cardDisplay = document.getElementById('card-display');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const counter = document.getElementById('card-counter');
  const homeButton = document.getElementById('home-button');
  const shuffleButton = document.getElementById('shuffle-button');

  const deck = JSON.parse(localStorage.getItem('selected-deck'))

  /* Validation */
  if (!deck || !Array.isArray(deck.cards) || deck.cards.length === 0) {
    title.textContent = deck?.name || 'Unnamed Deck';
    cardDisplay.textContent = 'No cards in this deck.';
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
    return;
  }

  title.textContent = deck.name || 'Unnamed Deck';

  const loadWorkout = await findWorkout('./workouts/workouts.json');
  if (!loadWorkout) {
    cardDisplay.textContent = 'Failed to load workout data!'
    return;
  }

  /* Render all cards facing down in beginning */
  const cards = []; // Array holding DOM elements

  for (let i = 0; i < deck.cards.length; i++) {
    const ref = deck.cards[i];

    let name;
    if (typeof ref === 'string') {
      name = ref;
    } else {
      name = ref.name;
    }

    /* Standardize key for lookup later */
    const key = name.trim().toLowerCase();

    /* Hash workout data from map */
    const data = loadWorkout.get(key);

    if (!data) {
      console.warn('Unknown exercise "' + key + '" skipped');
      continue;                            // skip missing entries
    }

    const cardEl = buildCard(data);
    cards.push(cardEl);
  }

  cardDisplay.innerHTML = '';
  for (let i = 0; i < cards.length; i++) {
    cardDisplay.appendChild(cards[i]);
  }

  function showCard() {
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];

      if (i === currentIndex) {
        card.style.display = '';      // show
      } else {
        card.style.display = 'none';  // hide
      }
    }
    counter.textContent = (currentIndex + 1) + ' / ' + cards.length;
  }

  let currentIndex = 0;
  showCard(currentIndex);

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      showCard(currentIndex);
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      showCard(currentIndex);
    }
  });

  homeButton.addEventListener('click', () => {
    window.location.href = '../index.html';
  });

   shuffleButton.addEventListener('click', () => {
    const shuffled = shuffle([...cards]);   
    cards.length   = 0;                    
    cards.push(...shuffled);               

    cardDisplay.replaceChildren(...cards)
    currentIndex = 0;
    showCard();
  });

});

async function findWorkout(path) {
  try {
    const response = await fetch (path);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const list = await response.json();

    const map = new Map();
    for (let i = 0; i < list.length; i++) {
      const workout = list[i];
      if (workout && workout.name) {
        const key = workout.name.trim().toLowerCase();
        map.set(key, workout);
      }
    }
    return map;
  } catch (err){
    console.error('Workout fetch failed:', err);
    return null;
  }
}

function buildCard (workoutData) {
  const card = document.createElement('workout-card');
  card.data = workoutData;

  card._articleEl.classList.toggle('flipped');
  return card;
}
 