// Example structure: localStorage.setItem("decks", JSON.stringify([{ name: "Deck 1" }, { name: "Deck 2" }]));

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("deck-container");
  const decks = JSON.parse(localStorage.getItem("decks")) || [];

  if (decks.length === 0) {
    const DEFAULT_DECKS = [
      { name: "Chest Day" },
      { name: "Legs & Core" },
      { name: "Mobility Flow" },
      { name: "Cardio Blast" }
    ];
    localStorage.setItem("decks", JSON.stringify(DEFAULT_DECKS));
    console.log("Default decks initialized in localStorage.");
  } else {
    console.log("Decks already exist in localStorage.");
  }

  decks.forEach((deck, index) => {
    const div = document.createElement("div");
    div.className = "deck-box";
    div.textContent = deck.name || `Deck #${index + 1}`;
    container.appendChild(div);
  });
});


