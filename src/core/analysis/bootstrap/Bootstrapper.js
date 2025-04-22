import { BootstrapResult } from "./BootstrapResult.js";
import { Resampler } from "./Resampler.js";
import { StatisticComputer } from "./StatisticComputer.js";

/**
 * Bootstrapper class
 * Performs bootstrap resampling on a given dataset using a specified statistic.
 */
export class Bootstrapper {
  /**
   * @param {number[]} data - Array of numerical values
   * @param {number} iterations - Number of bootstrap iterations
   * @param {string} statFn - Statistic type to compute (e.g., 'mean')
   */
  constructor(data, iterations = 1000, statFn = 'mean') {
    this.resampler = new Resampler(data);
    this.statComputer = new StatisticComputer(statFn);
    this.iterations = iterations;
  }

  /**
   * Runs the bootstrap procedure.
   * @returns {BootstrapResult} - Object containing sampled statistics
   */
  run() {
    const results = [];

    for (let i = 0; i < this.iterations; i++) {
      const sample = this.resampler.sample();         // randomly resampled dataset
      const stat = this.statComputer.compute(sample); // computed statistic (e.g., mean)
      results.push(stat);
    }

    return new BootstrapResult(results);
  }
}