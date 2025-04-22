/**
 * Resampler
 *
 * Performs bootstrap-style resampling with replacement from a given dataset.
 * Each sample generated will have the same size as the original data.
 */
export class Resampler {
  /**
   * @param {number[]} data - Original dataset to resample from
   */
  constructor(data) {
    /**
     * @private
     * @type {number[]}
     */
    this.data = data;
  }

  /**
   * Returns a resampled array of the same size as the original data.
   * Each element is randomly selected from the original dataset with replacement.
   *
   * @returns {number[]} A single bootstrap sample
   */
  sample() {
    return Array.from({ length: this.data.length }, () =>
      this.data[Math.floor(Math.random() * this.data.length)]
    );
  }
}