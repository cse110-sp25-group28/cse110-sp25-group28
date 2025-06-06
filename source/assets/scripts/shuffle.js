/**
 * @fileoverview
 * Utility function to shuffle an array using the Fisher-Yates algorithm.
 * Ensures the original array is not modified.
 */

/**
 * Randomly shuffles array of workout cards without modifying original array
 *
 * Uses the Fisher-Yates shuffle algorithm
 *
 * @param {Array} cards - Array of cards to shuffle
 * @returns {Array} New array with the elements shuffled
 * @throws {TypeError} If the input is not array
 */
export function shuffle(cards) {
    if (!Array.isArray(cards)) {
        throw new TypeError('Cards must be an array');
    }
    // Create a shallow copy to preserve original order
    const result = cards.slice();
    // Perform Fisher-Yates shuffle
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j],result[i]];
    }
    return result;
}