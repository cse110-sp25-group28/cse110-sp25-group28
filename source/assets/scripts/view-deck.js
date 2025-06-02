window.addEventListener("DOMContentLoaded", () => {
  const deck = JSON.parse(localStorage.getItem("selected-deck"));
  const title = document.getElementById("deck-title");
  const cardDisplay = document.getElementById("card-display");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const counter = document.getElementById("card-counter");

  let currentIndex = 0;

  if (!deck || !deck.cards || deck.cards.length === 0) {
    title.textContent = deck?.name || "Unnamed Deck";
    cardDisplay.textContent = "No cards in this deck.";
    prevButton.style.display = "none";
    nextButton.style.display = "none";
    return;
  }

  title.textContent = deck.name || "Unnamed Deck";

  const showCard = (index) => {
    const card = deck.cards[index];

    cardDisplay.innerHTML = "";

    const workoutCard = document.createElement("workout-card");
    workoutCard.data = card;

    cardDisplay.appendChild(workoutCard);
    counter.textContent = `${index + 1} / ${deck.cards.length}`;
  };

  showCard(currentIndex);

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showCard(currentIndex);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      showCard(currentIndex);
    }
  });
});
