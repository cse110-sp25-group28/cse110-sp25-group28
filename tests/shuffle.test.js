/**
 * @file shuffle.test.js
 * @description
 * Tests the shuffle function with unit tests
 */

const { shuffle } = require('../source/assets/scripts/shuffle.js'); // update the path accordingly

describe('shuffle', () => {
  test('throws TypeError if input is not an array', () => {
    expect(() => shuffle(null)).toThrow(TypeError);
    expect(() => shuffle({})).toThrow('Cards must be an array');
    expect(() => shuffle('string')).toThrow(TypeError);
    expect(() => shuffle(123)).toThrow(TypeError);
  });

  test('returns a new array, does not modify original', () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];
    const shuffled = shuffle(original);
    expect(shuffled).not.toBe(original);  // new array reference
    expect(original).toEqual(copy);       // original unchanged
  });

  test('returns shuffled array with same elements', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffle(original);
    // Check elements are the same but order can differ
    expect(shuffled.sort()).toEqual(original.sort());
  });

  test('works with empty array', () => {
    expect(shuffle([])).toEqual([]);
  });

  test('works with one-element array', () => {
    expect(shuffle([42])).toEqual([42]);
  });
});