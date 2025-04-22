/**
 * Calculates the arithmetic mean (average) of an array of numbers.
 *
 * @param {number[]} arr - Array of numeric values
 * @returns {number} The mean value of the array
 *
 * @example
 * mean([1, 2, 3, 4]) // returns 2.5
 */
export function mean(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}