import { mean } from '../../../utils/statistics.js';

/**
 * StatisticComputer
 *
 * Computes a specified summary statistic on a given dataset.
 * Acts as a simple strategy selector for statistical operations.
 */
export class StatisticComputer {
  /**
   * @param {string} type - Type of statistic to compute (e.g., 'mean')
   */
  constructor(type = 'mean') {
    /**
     * @private
     * @type {string}
     */
    this.type = type;
  }

  /**
   * Computes the selected statistic for the given sample.
   *
   * @param {number[]} sample - Array of numeric values
   * @returns {number} Computed statistic
   * @throws {Error} If the specified statistic type is not supported
   */
  compute(sample) {
    if (this.type === 'mean') return mean(sample);

    // Future extension point: add median, stddev, etc.
    throw new Error(`Unsupported statistic type: ${this.type}`);
  }
}