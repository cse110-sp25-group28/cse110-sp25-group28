import { initFiltering } from './filter-control.js';
window.addEventListener("DOMContentLoaded", init);

let selection = false;
// Sets a "selection" mode, giving the ability to add cards to a deck
document.getElementById("selectorOn").addEventListener("click", () => {
  selection = !selection;
  const toggle = document.getElementById("selectorOn");
  toggle.textContent = selection ? "Cancel Selection" : "Select Cards"
  setCardsDisableFlip(selection);
// When we "Cancel Selection", we unselect the cards
  if (!selection){
    unselectCards();
  }
});


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
    workoutCard._articleEl.classList.toggle('flipped');
    main.appendChild(workoutCard);
  });
}

// Listen for custom events dispatched from any card
document.addEventListener("workout-card-clicked", (e) => { // e is the custom event
  const clickedCard = e.detail.card;

  if (selection) {
    clickedCard.classList.toggle("selected");
    return;
  }
});

function unselectCards(){
  document.querySelectorAll(".selected").forEach(card => {
    card.classList.remove("selected");
  });
}

/**
 * Sets whether all workout cards should have flipping disabled.
 * @param {boolean} disable - If true, disables flipping for all cards.
 */
function setCardsDisableFlip(disable) {
  document.querySelectorAll('workout-card').forEach(card => {
    card.disableFlip = disable;
  });
}

document.querySelector(".create-deck").addEventListener("click", () =>{
  const selected = Array.from(document.querySelectorAll("workout-card.selected"));
  selected.forEach(card => console.log("Selected card data:", card.data));
  const deckName = prompt("Please select a name for your deck");
  if(!deckName){
    alert("Please enter a name")
  }

  const chosenCards = selected.map(card => ({
    name: card.data?.name,
    muscle: card.data?.muscle,
    description: card.data?.description,
    image: card.data?.image
  }));


  const newDeck = {
    name: deckName,
    cards: chosenCards
  };

  const customDecks = JSON.parse(localStorage.getItem("custom-decks") || "[]");
  customDecks.push(newDeck);
  localStorage.setItem("custom-decks", JSON.stringify(customDecks));   
  localStorage.setItem("selected-deck", JSON.stringify(newDeck));

  window.location.href = "../index.html";
});
