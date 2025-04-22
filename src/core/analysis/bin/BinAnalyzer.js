/**
 * BinAnalyzer
 *
 * Divides a numerical dataset into a specified number of bins (intervals)
 * and counts how many values fall into each bin.
 * Useful for visualizing distributions and summarizing numeric data.
 */
export class BinAnalyzer {
  /**
   * @param {number[]} data - Array of numeric values to analyze
   * @param {number} binCount - Number of bins to divide the data into
   */
  constructor(data, binCount) {
    /**
     * @private
     * @type {number[]}
     */
    this.data = data;

    /**
     * @private
     * @type {number}
     */
    this.binCount = binCount;
  }

  /**
   * Performs the binning process.
   *
   * @returns {{ bin: string, count: number }[]} An array of bin labels and their frequencies
   */
  analyze() {
    const min = Math.min(...this.data);
    const max = Math.max(...this.data);
    const binSize = (max - min) / this.binCount;
    const bins = Array(this.binCount).fill(0);

    this.data.forEach(value => {
      let index = Math.floor((value - min) / binSize);

      // Ensure max value goes into the last bin
      if (index === this.binCount) index--;

      bins[index]++;
    });

    return bins.map((count, i) => ({
      bin: `Bin ${i + 1}`,
      count
    }));
  }
}