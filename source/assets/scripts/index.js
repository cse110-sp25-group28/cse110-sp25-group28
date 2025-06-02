// Example structure: localStorage.setItem("decks", JSON.stringify([{ name: "Deck 1" }, { name: "Deck 2" }]));

//The start of the webpage.
window.addEventListener("DOMContentLoaded", init);

//Default decks the program starts with
const DEFAULT_DECKS = [
  {
    name: "Chest Day",
    cards: [
      { name: "Push-Up",
        muscle: "Chest",
        description: "Classic bodyweight exercise targeting the chest, triceps, and shoulders.",
        image: "workouts/images/Push-Up.webp"
       },
      { name: "Bench Press",
        muscle: "Chest",
        description: "Barbell or dumbbell exercise for upper body pushing strength.",
        image: "workouts/images/Bench-Press.webp"
       },
      { name: "Incline Press",
        muscle: "Chest",
        description: "Variation of bench press focusing on upper chest.",
        image: "workouts/images/Incline-Press.webp"
       },
    ],
  },
  {
    name: "Legs",
    cards: [
      { name: "Squat" },
      { name: "Calf Raises" },
      { name: "Glute Bridge" },
    ],
  },
  {
    name: "Core Blast",
    cards: [
      { name: "Plank" },
      { name: "Oblique Crunch" },
      { name: "Leg Raises" },
    ],
  },
  {
    name: "Arm Workout",
    cards: [
      { name: "Bicep Curl" },
      { name: "Tricep Dip" },
      { name: "Shoulder Press" },
    ],
  },
];

function init() {

  const defaultContainer = document.getElementById("default-deck-container");
  const customContainer = document.getElementById("custom-deck-container");

  const decks = JSON.parse(localStorage.getItem("decks")) || [];
  const customDecks = JSON.parse(localStorage.getItem("custom-decks"));

 
  localStorage.setItem("decks", JSON.stringify(DEFAULT_DECKS));

  decks.forEach((deck, index) => {
    const div = document.createElement("div");
    div.className = "deck-box";
    div.textContent = deck.name || `Deck #${index + 1}`;
    div.addEventListener("click", () => {
      localStorage.setItem("selected-deck", JSON.stringify(deck));
      window.location.href = "source/view-deck.html";
    });
    defaultContainer.appendChild(div);
  });

  if (customDecks != null) {
    customDecks.forEach((customDeck, index) => {
      const div = document.createElement("div");
      div.className = "deck-box";
      div.textContent = customDeck.name || `Deck #${index + 1}`;
      div.addEventListener("click", () => {
        localStorage.setItem("selected-deck", JSON.stringify(customDeck));
        window.location.href = "source/view-deck.html";
      });
      customContainer.appendChild(div);
    });
  }
}