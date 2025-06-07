/** @
 * @fileoverview delete-deck.js
 * @description
 * Handles deck deletion behavior for the workout app.
 * 
 * Features:
 * - Prevents deletion of default decks
 * - Shows confirmation modal before deletion
 * - Removes custom deck from localStorage upon confirmation
 * - Displays success message
 * - Allows user to return to home page after deletion
 */

const DEFAULT_DECKS = ["Chest Day", "Legs", "Core Blast", "Arm Workout"];

/**
 * Initializes the delete deck functionality.
 *  - Disables delete for default decks
 *  - Shows a confirmation modal when delete is clicked
 *  - Deletes (custom) decks from localStorage if confirmed
 *  - Displays a message after deletion
 *  - Redirects to home page after deletion
 */
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

  /**
   * Shows the delete confirmation modal.
   * @returns {void}
   */
  deleteBtn.addEventListener("click", () => {
    if (deleteBtn.disabled) return;
    modal.classList.remove("hidden");
  });

  /**
   * Hides the delete confirmation modal.
   * @returns {void}
   */
  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  /**
   * Deletes the selected custom deck from localStorage and shows the deleted message.
   * @returns {void}
   */
  confirmBtn.addEventListener("click", () => {
    let customDecks = JSON.parse(localStorage.getItem("custom-decks") || "[]");
    customDecks = customDecks.filter(d => d.name !== deck.name);
    localStorage.setItem("custom-decks", JSON.stringify(customDecks));
    modal.classList.add("hidden");
    deletedMsg.classList.remove("hidden");
  });

  /**
   * Redirects the user to the home page.
   * @returns {void}
   */
  goHomeBtn.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
});