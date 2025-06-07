/**
 * @jest-environment jsdom
 */

/**
 * @file dom-functions-create-deck.test.js
 * @description
 * Tests dom functions from the create deck functionality
 */

import { saveSelectedCards } from '../source/assets/scripts/create-deck.js';
import { getCardData } from '../source/assets/scripts/deck-logic.js';

// Mock getCardData
jest.mock('../source/assets/scripts/deck-logic.js', () => ({
  getCardData: jest.fn()
}));

describe('saveSelectedCards', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = `
      <div id="deck-name-error" class="hidden"></div>
      <div id="create-deck-error" class="hidden"></div>
      <div id="deck-name-modal" class="hidden"></div>
      <input id="deck-name-input" />
    `;

    // Create one selected card
    const fakeCard = document.createElement('div');
    fakeCard.classList.add('selected');
    document.body.appendChild(fakeCard);

    // Provide card data
    getCardData.mockReturnValue({
      name: 'Squat',
      muscle: 'Legs',
      description: 'Lower body workout',
      image: 'squat.png'
    });

    // ⛔ Prevent navigation crash by mocking window.location.href
    delete window.location;
    window.location = { href: '' };
  });

  it('saves a selected card to localStorage under custom-decks', () => {
    // Act
    saveSelectedCards('Leg Day');

    // Assert: localStorage contains deck
    const decks = JSON.parse(localStorage.getItem('custom-decks'));
    expect(decks).toHaveLength(1);
    expect(decks[0].name).toBe('Leg Day');
    expect(decks[0].cards[0].name).toBe('Squat');
  });
});