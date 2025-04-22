/**
 * Represents the result of a bootstrap procedure.
 * Provides utilities for accessing the resampled statistics and estimating confidence intervals.
 */
export class BootstrapResult {
  /**
   * @param {number[]} samples - Array of computed statistics from bootstrap resampling
   */
  constructor(samples) {
    /**
     * @private
     * @type {number[]}
     */
    this.samples = samples;
  }

  /**
   * Returns the array of bootstrap statistics.
   * @returns {number[]} Array of sampled statistics (e.g., means)
   */
  toArray() {
    return this.samples;
  }

  /**
   * Calculates the two-sided confidence interval from the bootstrap samples.
   * Uses the percentile method.
   *
   * @param {number} [alpha=0.05] - Significance level (e.g., 0.05 for 95% CI)
   * @returns {{ lower: number, upper: number }} Confidence interval bounds
   */
  confidenceInterval(alpha = 0.05) {
    const sorted = [...this.samples].sort((a, b) => a - b);
    const lower = sorted[Math.floor((alpha / 2) * sorted.length)];
    const upper = sorted[Math.floor((1 - alpha / 2) * sorted.length)];
    return { lower, upper };
  }
}