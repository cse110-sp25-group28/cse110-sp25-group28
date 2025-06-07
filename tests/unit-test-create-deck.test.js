/**
 * @file unit-test-create-deck.test.js
 * @description
 * Tests the functionality of creating deck
 */

const { getWorkoutsFromStorage } = require('../source/assets/scripts/deck-logic');

describe('getWorkoutsFromStorage', () => {
  it('returns workouts array on success', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ name: 'Push-up' }]),
      })
    );

    const result = await getWorkoutsFromStorage();
    expect(result).toEqual([{ name: 'Push-up' }]);
  });

  it('returns null on fetch failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('fail')));
    const result = await getWorkoutsFromStorage();
    expect(result).toBeNull();
  });
});