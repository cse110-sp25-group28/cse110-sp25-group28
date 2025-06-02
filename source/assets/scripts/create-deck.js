const { initFiltering } = require("./filter-control.js");

/**
 * Starts the page
 */
window.addEventListener("DOMContentLoaded", async () => {
  const workouts = await getWorkoutsFromStorage();
  if (workouts) {
    addWorkoutsToDocument(workouts);
    initFiltering(workouts);
  }
});

let selection = false;
// Sets a "selection" mode, giving the ability to add cards to a deck
document.getElementById("selectorOn").addEventListener("click", () => {
  selection = !selection;
  const toggle = document.getElementById("selectorOn");
  toggle.textContent = selection ? "Cancel Selection" : "Select Cards";
  setCardsDisableFlip(selection);
  // When we "Cancel Selection", we unselect the cards
  if (!selection) {
    unselectCards();
  }
});

//Triggered when Create Deck button is clicked and pops up the modal
document.getElementById("create-deck-button").addEventListener("click", () => {
  const selectedCards = document.querySelectorAll(".selected");
  if (selectedCards.length > 0) {
    document.getElementById("deck-name-modal").classList.remove("hidden");
  }
  else {
    const errorEl = document.getElementById("create-deck-error");
    errorEl.textContent = `Please select a card before creating a deck`;
    errorEl.classList.remove("hidden");
  }
});

//When the deck is saved in the pop-up, save to the data to localStorage
document.getElementById("confirm-deck-name").addEventListener("click", () => {
  const name = document.getElementById("deck-name-input").value.trim();
  saveSelectedCards(name);
});

//Closes the pop-up modal
document
  .getElementById("cancel-deck-name")
  .addEventListener("click", closeModal);

/**
 * Fetch workout data from JSON file and create workout cards
 * Each card includes image &details about workout
 * @returns {workouts} array containing information of all workouts
 */
async function getWorkoutsFromStorage() {
  try {
    const dataURL = "./workouts/workouts.json";
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
  const main = document.querySelector("main");
  const cardsContainer = document.querySelector(".cards-container");
  workouts.forEach((workout) => {
    const workoutCard = document.createElement("workout-card");
    workoutCard.data = workout;
    workoutCard._articleEl.classList.toggle("flipped");
    cardsContainer.appendChild(workoutCard);
    //main.appendChild(workoutCard);
  });
  main.appendChild(cardsContainer);
}

// Listen for custom events dispatched from any card
document.addEventListener("workout-card-clicked", (e) => {
  // e is the custom event
  if (selection) {
    const clickedCard = e.detail.card;
    clickedCard.classList.toggle("selected");
    return;
  }
});

function unselectCards() {
  document.querySelectorAll(".selected").forEach((card) => {
    card.classList.remove("selected");
  });
}

/**
 * Sets whether all workout cards should have flipping disabled.
 * @param {boolean} disable - If true, disables flipping for all cards.
 */
function setCardsDisableFlip(disable) {
  document.querySelectorAll("workout-card").forEach((card) => {
    if (disable) {
      // Save current flip state and force face up
      card._wasFlipped = card._articleEl.classList.contains("flipped");
      card._articleEl.classList.remove("flipped");
    } else {
      // Restore previous flip state if it exists
      if ('_wasFlipped' in card) {
        if (card._wasFlipped) {
          card._articleEl.classList.add("flipped");
        } else {
          card._articleEl.classList.remove("flipped");
        }
        delete card._wasFlipped;
      }
    }
    card.disableFlip = disable;
  });
}

/**
 * Extracts the workout data from a <workout-card> element.
 *
 * @param {HTMLElement} card - A <workout-card> element.
 * @returns {Object} An object containing:
 *  - name: string
 *  - muscle: string
 *  - description: string
 *  - image: string (URL of the workout image)
 */
function getCardData(card) {
  const front = card.shadowRoot.querySelector(".card-front");
  const img = front.querySelector("img");
  const name = front.querySelector(".name").textContent.trim();
  const muscle = front.querySelector(".muscle").textContent.trim();
  const description = front.querySelector(".description").textContent.trim();

  return {
    name,
    muscle,
    description,
    image: img?.getAttribute("src") || "",
  };
}

/**
 * Collects all currently selected workout cards and saves their data to localStorage.
 * The saved data is stored under the key 'Default-Decks'.
 */
function saveSelectedCards(deckName) {
  const selectedCards = document.querySelectorAll(".selected");
  const selectedData = [];

  const errorEl = document.getElementById("deck-name-error");

  // Clear previous error
  errorEl.classList.add("hidden");

  selectedCards.forEach((card) => {
    const data = getCardData(card);
    if (data) selectedData.push(data);
  });

  const newDeck = {
    name: deckName,
    cards: selectedData,
  };

  // Load both stored deck arrays
  const defaultDecks = JSON.parse(localStorage.getItem("decks") || "[]");
  const customDecks = JSON.parse(localStorage.getItem("custom-decks") || "[]");

  // Combine and check for duplicate deck name
  const allDecks = [...defaultDecks, ...customDecks];
  const deckExists = allDecks.some((deck) => deck.name === newDeck.name);

  if(deckName.length <= 0){
    errorEl.textContent = `A deck name can't be empty`;
    errorEl.classList.remove("hidden");
    return;
  }
  if (deckExists) {
    errorEl.textContent = `A deck named "${deckName}" already exists. Please choose another name`;
    errorEl.classList.remove("hidden");
    return;
  }

  // Add new custom deck
  customDecks.push(newDeck);
  localStorage.setItem("custom-decks", JSON.stringify(customDecks));

  // Hide modal, clear selection error, and redirect
  closeModal();
  document.getElementById("create-deck-error").classList.add("hidden");
  window.location.href = '../index.html';
}

/**
 * Closes the pop-up modal
 */
function closeModal() {
  document.getElementById("deck-name-modal").classList.add("hidden");
  document.getElementById("deck-name-input").value = "";
  document.getElementById("deck-name-error").classList.add("hidden");
}

module.exports = {
  getCardData,
  setCardsDisableFlip,
  unselectCards,
  saveSelectedCards,
  closeModal,
  getWorkoutsFromStorage,
  addWorkoutsToDocument
};