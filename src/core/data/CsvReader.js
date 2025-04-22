import fs from 'fs';
import csv from 'csv-parser';

/**
 * CsvReader
 *
 * Reads a CSV file and extracts numeric values from a specified column.
 * Used as the data ingestion component for all statistical analyses.
 */
export class CsvReader {
  /**
   * @param {string} filePath - Path to the CSV file
   * @param {string} columnName - Name of the column to extract numeric values from
   */
  constructor(filePath, columnName) {
    /**
     * @private
     * @type {string}
     */
    this.filePath = filePath;

    /**
     * @private
     * @type {string}
     */
    this.columnName = columnName;
  }

  /**
   * Asynchronously reads the file and extracts numeric values from the specified column.
   * Filters out rows where the value is not a valid number.
   *
   * @returns {Promise<number[]>} Promise resolving to an array of numeric values
   */
  async read() {
    return new Promise((resolve, reject) => {
      const values = [];

      fs.createReadStream(this.filePath)
        .pipe(csv())
        .on('data', (row) => {
          const val = parseFloat(row[this.columnName]);

          // Only include valid numeric entries
          if (!isNaN(val)) values.push(val);
        })
        .on('end', () => resolve(values))
        .on('error', reject);
    });
  }
}