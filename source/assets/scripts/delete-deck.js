const DEFAULT_DECKS = ["Chest Day", "Legs", "Core Blast", "Arm Workout"];

window.addEventListener("DOMContentLoaded", () => {
  const deck = JSON.parse(localStorage.getItem("selected-deck"));
  const deleteBtn = document.querySelector(".create-deck"); // Delete Deck button
  const modal = document.getElementById("delete-modal");
  const deletedMsg = document.getElementById("deleted-message");
  const confirmBtn = document.getElementById("confirm-delete");
  const cancelBtn = document.getElementById("cancel-delete");
  const goHomeBtn = document.getElementById("go-home");

  // Disable delete for default decks
  if (deck && DEFAULT_DECKS.includes(deck.name)) {
    deleteBtn.disabled = true;
    deleteBtn.style.opacity = 0.5;
    deleteBtn.title = "Default decks cannot be deleted";
    deleteBtn.style.cursor = "not-allowed";
  }

  // Show modal on delete click
  deleteBtn.addEventListener("click", () => {
    if (deleteBtn.disabled) return;
    modal.classList.remove("hidden");
  });

  // Cancel delete
  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Confirm delete
  confirmBtn.addEventListener("click", () => {
    // Remove from custom-decks
    let customDecks = JSON.parse(localStorage.getItem("custom-decks") || "[]");
    customDecks = customDecks.filter(d => d.name !== deck.name);
    localStorage.setItem("custom-decks", JSON.stringify(customDecks));
    modal.classList.add("hidden");
    deletedMsg.classList.remove("hidden");
  });

  // Go home after deletion
  goHomeBtn.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
});