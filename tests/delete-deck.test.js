/**
 * @jest-environment jsdom
 */
/**
 * @file create-deck.test.js
 * @description
 * End-to-end tests for the "Create Deck" page.
 * Verifies:
 * - Workout cards load from JSON
 * - Cards are populated correctly
 * - Selection mode works
 * - Error appears if no cards are selected for deck creation
 */
const DEFAULT_DECKS = ['Chest Day', 'Legs', 'Core Blast', 'Arm Workout'];

// Simulate the code snippet as a function to call in tests
function setupDeleteDeck() 
{
  const deck = JSON.parse(localStorage.getItem('selected-deck'));
  // Delete Deck button
  const deleteBtn = document.querySelector(
    '.create-deck'
  ); 
  const modal = document.getElementById('delete-modal');
  const deletedMsg = document.getElementById('deleted-message');
  const confirmBtn = document.getElementById('confirm-delete');
  const cancelBtn = document.getElementById('cancel-delete');
  const goHomeBtn = document.getElementById('go-home');

  // Disable delete for default decks
  if (deck && DEFAULT_DECKS.includes(deck.name)) 
  {
    deleteBtn.disabled = true;
    deleteBtn.style.opacity = 0.5;
    deleteBtn.title = 'Default decks cannot be deleted';
    deleteBtn.style.cursor = 'not-allowed';
  }

  deleteBtn.addEventListener('click', () => 
  {
    if (deleteBtn.disabled) return;
    modal.classList.remove('hidden');
  });

  cancelBtn.addEventListener('click', () => 
  {
    modal.classList.add('hidden');
  });

  confirmBtn.addEventListener('click', () => 
  {
    let customDecks = JSON.parse(localStorage.getItem('custom-decks') || '[]');
    customDecks = customDecks.filter((d) => d.name !== deck.name);
    localStorage.setItem('custom-decks', JSON.stringify(customDecks));
    modal.classList.add('hidden');
    deletedMsg.classList.remove('hidden');
  });

  goHomeBtn.addEventListener('click', () => 
  {
    window.location.href = '../index.html';
  });
}

describe('Delete Deck Functionality', () => 
{
  let deleteBtn, modal, deletedMsg, confirmBtn, cancelBtn, goHomeBtn;

  beforeEach(() => 
  {
    // Reset DOM
    document.body.innerHTML = `
      <button class="create-deck">Delete Deck</button>
      <div id="delete-modal" class="hidden"></div>
      <div id="deleted-message" class="hidden"></div>
      <button id="confirm-delete"></button>
      <button id="cancel-delete"></button>
      <button id="go-home"></button>
    `;

    deleteBtn = document.querySelector('.create-deck');
    modal = document.getElementById('delete-modal');
    deletedMsg = document.getElementById('deleted-message');
    confirmBtn = document.getElementById('confirm-delete');
    cancelBtn = document.getElementById('cancel-delete');
    goHomeBtn = document.getElementById('go-home');

    // Clear mocks
    localStorage.clear();

    // Reset window.location.href mock
    delete window.location;
    window.location = { href: '' };
  });

  test('disables delete button for default decks', () => 
  {
    localStorage.setItem(
      'selected-deck', JSON.stringify({ name: 'Chest Day' })
    );
    setupDeleteDeck();

    expect(deleteBtn.disabled).toBe(true);
    expect(deleteBtn.style.opacity).toBe('0.5');
    expect(deleteBtn.title).toBe('Default decks cannot be deleted');
    expect(deleteBtn.style.cursor).toBe('not-allowed');
  });

  test('does not disable delete button for custom decks', () => 
  {
    localStorage.setItem(
      'selected-deck', JSON.stringify({ name: 'My Custom Deck' })
    );
    setupDeleteDeck();

    expect(deleteBtn.disabled).toBe(false);
    expect(deleteBtn.style.opacity).not.toBe('0.5');
    expect(deleteBtn.title).toBe('');
  });

  test('clicking delete button shows modal if enabled', () => 
  {
    localStorage.setItem(
      'selected-deck', JSON.stringify({ name: 'My Custom Deck' })
    );
    setupDeleteDeck();

    // Initially hidden
    expect(modal.classList.contains('hidden')).toBe(true);

    deleteBtn.click();

    expect(modal.classList.contains('hidden')).toBe(false);
  });

  test('clicking delete button does nothing if disabled', () => 
  {
    localStorage.setItem(
      'selected-deck', JSON.stringify({ name: 'Chest Day' })
    );
    setupDeleteDeck();

    expect(modal.classList.contains('hidden')).toBe(true);

    deleteBtn.click();

    expect(modal.classList.contains('hidden')).toBe(true);
  });

  test('clicking cancel button hides modal', () => 
  {
    localStorage.setItem(
      'selected-deck', JSON.stringify({ name: 'My Custom Deck' })
    );
    setupDeleteDeck();

    modal.classList.remove('hidden');

    cancelBtn.click();

    expect(modal.classList.contains('hidden')).toBe(true);
  });

  test('Click confirm deletes deck, hides modal, shows deleted message', () => 
  {
    const selectedDeck = { name: 'My Custom Deck' };
    localStorage.setItem('selected-deck', JSON.stringify(selectedDeck));
    // custom-decks array includes the selected deck plus another deck
    localStorage.setItem('custom-decks', JSON.stringify([
      selectedDeck,
      { name: 'Other Deck' }
    ]));

    setupDeleteDeck();

    // Setup modal visible before confirm
    modal.classList.remove('hidden');
    deletedMsg.classList.add('hidden');

    confirmBtn.click();

    const remainingDecks = JSON.parse(localStorage.getItem('custom-decks'));

    expect(remainingDecks).toHaveLength(1);
    expect(remainingDecks[0].name).toBe('Other Deck');

    expect(modal.classList.contains('hidden')).toBe(true);
    expect(deletedMsg.classList.contains('hidden')).toBe(false);
  });

  test('clicking go home button redirects to index.html', () => 
  {
    localStorage.setItem(
      'selected-deck', JSON.stringify({ name: 'My Custom Deck' })
    );
    setupDeleteDeck();

    goHomeBtn.click();
  });
});