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
      {
        name: "Squat",
        muscle: "Quadriceps",
        description: "Compound movement that strengthens legs and glutes.",
        image: "workouts/images/Squat.webp"
      },
      {   
        name: "Calf Raises",
        muscle: "Calves",
        description: "Simple exercise to strengthen the calves.",
        image: "workouts/images/Calf-Raises.webp"
      },
      {   
        name: "Glute Bridge",
        muscle: "Glutes",
        description: "Targets glutes and hamstrings from a supine position.",
        image: "workouts/images/Glute-Bridge.webp"
      }
    ]
  },
  { 
    name: "Core Blast",
    cards: [
      {
        name: "Plank",
        muscle: "Abdominals",
        description: "Isometric core exercise that improves stability and endurance.",
        image: "workouts/images/Plank.webp"
      },
      {
        name: "Oblique Crunch",
        muscle: "Obliques",
        description: "Rotational ab move to target the obliques.",
        image: "workouts/images/Oblique-Crunch.webp" 
      },
      { 
        name: "Leg Raises",
        muscle: "Abs",
        description: "Hanging leg raise to activate lower abs.",
        image: "workouts/images/Leg-Raises.webp"
      }
    ]
  },
  { 
    name: "Arm Workout",
    cards: [
      {
        name: "Bicep Curl",
        muscle: "Biceps",
        description: "Isolation movement to develop arm strength.",
        image: "workouts/images/Bicep-Curl.webp"
      },
      {
        name: "Tricep Dip",
        muscle: "Triceps",
        description: "Bodyweight exercise to isolate the triceps.",
        image: "workouts/images/Tricep-Dip.webp"
      },
      {
        name: "Shoulder Press",
        muscle: "Shoulders",
        description: "Overhead pressing movement to build deltoid strength.",
        image: "workouts/images/Shoulder-Press.webp"
      }
    ]
  }
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