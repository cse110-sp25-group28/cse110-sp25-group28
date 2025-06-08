/**
 * @fileoverview create-deck.js
 * @description
 * Main script for the "Create Deck" page. 
 * Handles loading workouts, card rendering, selection mode, filtering, 
 * deck creation, and saving to localStorage.
 */

import { initFiltering } from './filter-control.js';
import { getWorkoutsFromStorage, getCardData } from './deck-logic.js';

/**
 * Starts the page and sets up event listeners
 */
async function setupCreateDeckPage() 
{
  // Load workouts and initialize filtering
  const workouts = await getWorkoutsFromStorage();
  if (workouts) 
  {
    addWorkoutsToDocument(workouts);
    initFiltering(workouts);
  }

  // Event listener: Toggle selection mode
  window.selection = false;

  const selectorOnBtn = document.getElementById('selectorOn');
  if (selectorOnBtn) 
  {
    selectorOnBtn.addEventListener('click', () => 
    {
      window.selection = !window.selection;
      selectorOnBtn.textContent = window.selection 
        ? 'Cancel Selection' 
        : 'Select Cards';
      setCardsDisableFlip(window.selection);
      if (!window.selection) 
      {
        unselectCards();
      }
    });
  }

  // Event listener: Create Deck button clicked
  const createDeckBtn = document.getElementById('create-deck-button');
  if (createDeckBtn) 
  {
    createDeckBtn.addEventListener('click', () => 
    {
      const selectedCards = document.querySelectorAll('.selected');
      if (selectedCards.length > 0) 
      {
        document.getElementById('deck-name-modal').classList.remove('hidden');
      }
      else 
      {
        const errorEl = document.getElementById('create-deck-error');
        errorEl.textContent = 'Please select a card before creating a deck';
        errorEl.classList.remove('hidden');
        errorEl.style.opacity = '1';

        setTimeout(() => 
        {
          errorEl.style.opacity = '0';
          setTimeout(() => 
          {
            errorEl.classList.add('hidden');
            errorEl.style.opacity = '1'; // Reset for next time
          }, 1000);
        }, 1000);
      }
    });
  }

  // Event listener: Confirm Deck Name button clicked
  const confirmDeckNameBtn = document.getElementById('confirm-deck-name');
  if (confirmDeckNameBtn) 
  {
    confirmDeckNameBtn.addEventListener('click', () => 
    {
      const name = document.getElementById('deck-name-input').value.trim();
      saveSelectedCards(name);
    });
  }

  // Event listener: Cancel Deck Name button clicked
  const cancelDeckNameBtn = document.getElementById('cancel-deck-name');
  if (cancelDeckNameBtn) 
  {
    cancelDeckNameBtn.addEventListener('click', closeModal);
  }
}

// Run setupCreateDeckPage on actual page load
window.addEventListener('DOMContentLoaded', () => 
{
  setupCreateDeckPage();
});

/**
 * Create DOM elements representing workout cards and append them to the
 * <main> element.
 * @param {Array<{
 *   name: string,
 *   category: string,
 *   muscle: string,
 *   description: string,
 *   image: string
 * }>} workouts - Array of workout data objects
 */
function addWorkoutsToDocument(workouts) 
{
  const main = document.querySelector('main');
  const cardsContainer = document.querySelector('.cards-container');
  workouts.forEach((workout) => 
  {
    const workoutCard = document.createElement('workout-card');
    workoutCard.data = workout;
    workoutCard._articleEl.classList.toggle('flipped');
    cardsContainer.appendChild(workoutCard);
  });
  main.appendChild(cardsContainer);
}

// Listen for custom events dispatched from any card
document.addEventListener('workout-card-clicked', (e) => 
{
  if (!window.selection) return; // If selection mode not enabled, ignore
  const clickedCard = e.detail.card;
  clickedCard.classList.toggle('selected');
});

function unselectCards() 
{
  document.querySelectorAll('.selected').forEach((card) => 
  {
    card.classList.remove('selected');
  });
}

/**
 * Sets whether all workout cards should have flipping disabled.
 * @param {boolean} disable - If true, disables flipping for all cards.
 */
function setCardsDisableFlip(disable) 
{
  document.querySelectorAll('workout-card').forEach((card) => 
  {
    if (disable) 
    {
      card._wasFlipped = card._articleEl.classList.contains('flipped');
      card._articleEl.classList.remove('flipped');
    }
    else 
    {
      if ('_wasFlipped' in card) 
      {
        if (card._wasFlipped) 
        {
          card._articleEl.classList.add('flipped');
        }
        else 
        {
          card._articleEl.classList.remove('flipped');
        }
        delete card._wasFlipped;
      }
    }
    card.disableFlip = disable;
  });
}

/**
 * Collects all selected workout cards and saves their data localStorage.
 * The saved data is stored under the key 'custom-decks'.
 */
export function saveSelectedCards(deckName) 
{
  const selectedCards = document.querySelectorAll('.selected');
  const selectedData = [];

  const errorEl = document.getElementById('deck-name-error');

  errorEl.classList.add('hidden');

  selectedCards.forEach((card) => 
  {
    const data = getCardData(card);
    if (data) selectedData.push(data);
  });

  const newDeck = {
    name: deckName,
    cards: selectedData,
  };

  const defaultDecks = JSON.parse(localStorage.getItem('decks') || '[]');
  const customDecks = JSON.parse(localStorage.getItem('custom-decks') || '[]');

  const allDecks = [...defaultDecks, ...customDecks];
  const deckExists = allDecks.some((deck) => deck.name === newDeck.name);

  if (deckName.length <= 0) 
  {
    errorEl.textContent = 'A deck name can\'t be empty';
    errorEl.classList.remove('hidden');
    return;
  }
  else if (deckName.length > 80)
  {
    errorEl.textContent = 'Please limit the name to 80 characters';
    errorEl.classList.remove('hidden');
    return;
  }
  if (deckExists) 
  {
    errorEl.textContent =
      `A deck named "${deckName}" already exists. Please choose another name.`;
    errorEl.classList.remove('hidden');
    return;
  }

  customDecks.push(newDeck);
  localStorage.setItem('custom-decks', JSON.stringify(customDecks));

  closeModal();
  document.getElementById('create-deck-error').classList.add('hidden');
  window.location.href = '../index.html';
}

/**
 * Closes the pop-up modal
 */
function closeModal() 
{
  document.getElementById('deck-name-modal').classList.add('hidden');
  document.getElementById('deck-name-input').value = '';
  document.getElementById('deck-name-error').classList.add('hidden');
}

export default {
  setupCreateDeckPage,
  getWorkoutsFromStorage,
  getCardData,
  saveSelectedCards,
  addWorkoutsToDocument,
  unselectCards,
  setCardsDisableFlip,
  closeModal,
};