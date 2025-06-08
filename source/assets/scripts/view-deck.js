import './card.js';         
import { shuffle } from './shuffle.js';

/**
 * @file view-deck.js
 * @description
 * Handles the interactive logic for the "View Deck" page of the workout app.
 * Loads a selected deck from localStorage, fetches workout data, renders cards,
 * and manages navigation, shuffling, and animated transitions between cards.
 *
 * Main Features:
 * - Loads and validates the selected workout deck.
 * - Fetches workout details from a JSON file.
 * - Renders workout cards and displays them in a carousel-like interface.
 * - Supports next/previous navigation with animated transitions.
 * - Allows shuffling of the deck.
 * - Handles navigation back to the home page.
 *
 * @module view-deck
 */
window.addEventListener('DOMContentLoaded', async () => 
{
  const title = document.getElementById('deck-title');
  const cardDisplay = document.getElementById('card-display');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const counter = document.getElementById('card-counter');
  const homeButton = document.getElementById('home-button');
  const shuffleButton = document.getElementById('shuffle-button');

  const deck = JSON.parse(localStorage.getItem('selected-deck'));

  /* Validation */
  if (!deck || !Array.isArray(deck.cards) || deck.cards.length === 0) 
  {
    title.textContent = deck?.name || 'Unnamed Deck';
    cardDisplay.textContent = 'No cards in this deck.';
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
    return;
  }

  title.textContent = deck.name || 'Unnamed Deck';

  const loadWorkout = await findWorkout('./workouts/workouts.json');
  if (!loadWorkout) 
  {
    cardDisplay.textContent = 'Failed to load workout data!';
    return;
  }

  /** @type {HTMLElement[]} */
  /* Render all cards facing down in beginning */
  const cards = []; // Array holding DOM elements

  // Build card elements for each workout in the deck
  for (let i = 0; i < deck.cards.length; i++) 
  {
    const ref = deck.cards[i];

    let name;
    if (typeof ref === 'string') 
    {
      name = ref;
    }
    else 
    {
      name = ref.name;
    }

    /* Standardize key for lookup later */
    const key = name.trim().toLowerCase();

    /* Hash workout data from map */
    const data = loadWorkout.get(key);

    if (!data) 
    {
      console.warn('Unknown exercise "' + key + '" skipped');
      continue;                            // skip missing entries
    }

    const cardEl = buildCard(data);
    cards.push(cardEl);
  }

  // Add all cards to the display container
  cardDisplay.innerHTML = '';
  for (let i = 0; i < cards.length; i++) 
  {
    cardDisplay.appendChild(cards[i]);
  }

  /**
   * Shows only the card at the current index and updates the counter.
   * @function
   */
  function showCard() 
  {
    for (let i = 0; i < cards.length; i++) 
    {
      const card = cards[i];
      if (i === currentIndex) 
      {
        card.style.display = '';      // show
        // resets flip to have card ALWAYS face down
        if (card._articleEl) 
        {
          card._articleEl.classList.add('flipped');
        }
      }
      else 
      {
        card.style.display = 'none';  // hide
      }
    }
    counter.textContent = (currentIndex + 1) + ' / ' + cards.length;
  }

  let currentIndex = 0;
  showCard(currentIndex);

  /**
   * Handles the previous button click event.
   * Animates the transition and updates the displayed card.
   */
  prevButton.addEventListener('click', () => 
  {
    if (currentIndex > 0) 
    {
      const oldCard = cards[currentIndex];
      currentIndex--;
      const newCard = cards[currentIndex];
      animateCardTransition(oldCard, newCard, 'prev', 'spin');
      showCard(currentIndex);
    }
  });

  /**
   * Handles the next button click event.
   * Animates the transition and updates the displayed card.
   */
  nextButton.addEventListener('click', () => 
  {
    if (currentIndex < cards.length - 1) 
    {
      const oldCard = cards[currentIndex];
      currentIndex++;
      const newCard = cards[currentIndex];
      animateCardTransition(
        oldCard, newCard, 'next', 'slide'
      ); // Use slide for next
      showCard(currentIndex);
    }
  });

  /**
   * Handles the home button click event.
   * Navigates back to the home page.
   */
  homeButton.addEventListener('click', () => 
  {
    window.location.href = '../index.html';
  });

  /**
   * Handles the shuffle button click event.
   * Shuffles the cards and resets the view to the first card.
   */
  shuffleButton.addEventListener('click', () => 
  {
    const shuffled = shuffle([...cards]);   
    cards.length   = 0;                    
    cards.push(...shuffled);               

    cardDisplay.replaceChildren(...cards);
    currentIndex = 0;
    showCard();
  });

  /**
   * Animates the transition between two cards.
   * @param {HTMLElement} oldCard - The card currently displayed.
   * @param {HTMLElement} newCard - The card to display next.
   * @param {'next'|'prev'} direction - The direction of the animation.
   */
  function animateCardTransition(oldCard, newCard, direction, animationType) 
  {
    if (!oldCard || !newCard) return;

    // Remove any previous animation classes
    oldCard.classList.remove(
      'card-slide-in-left', 'card-slide-in-right', 
      'card-slide-out-left', 'card-slide-out-right',
      'card-spin-in-left', 'card-spin-in-right', 
      'card-spin-out-left', 'card-spin-out-right'
    );
    newCard.classList.remove(
      'card-slide-in-left', 'card-slide-in-right', 
      'card-slide-out-left', 'card-slide-out-right',
      'card-spin-in-left', 'card-spin-in-right', 
      'card-spin-out-left', 'card-spin-out-right'
    );
    
    if (animationType === 'slide') 
    {
      // Animate old card out
      oldCard.classList.add(
        direction === 'next' ? 'card-slide-out-left' : 'card-slide-out-right'
      );
      // Animate new card in
      newCard.classList.add(
        direction === 'next' ? 'card-slide-in-right' : 'card-slide-in-left'
      );

      setTimeout(() => 
      {
        oldCard.classList.remove('card-slide-out-left', 'card-slide-out-right');
        newCard.classList.remove('card-slide-in-left', 'card-slide-in-right');
      }, 400);

    }
    else if (animationType === 'spin') 
    {
      // Animate old card out
      oldCard.classList.add(
        direction === 'next' ? 'card-spin-out-left' : 'card-spin-out-right'
      );
      // Animate new card in
      newCard.classList.add(
        direction === 'next' ? 'card-spin-in-right' : 'card-spin-in-left'
      );

      setTimeout(() => 
      {
        oldCard.classList.remove('card-spin-out-left', 'card-spin-out-right');
        newCard.classList.remove('card-spin-in-left', 'card-spin-in-right');
      }, 600);
      
    }
  }
});

/**
 * Loads workout data from JSON file and returns a map of workout names
 * to data.
 * @async
 * @param {string} path - The path to the workouts JSON file.
 * @returns {Promise<Map<string, Object>|null>} Map of workout names to
 * workout data, or null on failure.
 */
async function findWorkout(path) 
{
  try 
  {
    const response = await fetch (path);
    if (!response.ok) 
    {
      throw new Error(response.status);
    }
    const list = await response.json();

    const map = new Map();
    for (let i = 0; i < list.length; i++) 
    {
      const workout = list[i];
      if (workout && workout.name) 
      {
        const key = workout.name.trim().toLowerCase();
        map.set(key, workout);
      }
    }
    return map;
  }
  catch (err)
  {
    console.error('Workout fetch failed:', err);
    return null;
  }
}

/**
 * Builds a workout card element from workout data.
 * @param {Object} workoutData - The workout data for the card.
 * @returns {HTMLElement} The created workout card element.
 */
function buildCard (workoutData) 
{
  const card = document.createElement('workout-card');
  card.data = workoutData;
  return card;
}