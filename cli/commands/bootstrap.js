import { CsvReader } from '../../src/core/data/CsvReader.js';
import { Bootstrapper } from '../../src/core/analysis/Bootstrap/Bootstrapper.js';

/**
 * Handles the 'smartkit bootstrap' CLI command.
 * Reads a CSV file, performs bootstrap resampling, and prints results.
 *
 * @param {string} csvPath - Path to the input CSV file
 * @param {object} options - CLI options including column and iteration count
 */
export async function runBootstrapCommand(csvPath, options) {
  // Read numeric values from the specified column
  const reader = new CsvReader(csvPath, options.column || 'value');
  const data = await reader.read();

  // Initialize the bootstrapper with the data and number of iterations
  const iterations = parseInt(options.iterations || 1000);
  const bootstrapper = new Bootstrapper(data, iterations);
  const result = bootstrapper.run();

  // Get the array of bootstrapped statistics
  const outputArray = result.toArray();

  // Calculate confidence interval (default 95%)
  const ci = result.confidenceInterval();

  // Show first 10 results as a quick preview
  console.log(`📊 İlk 10 bootstrap sonucu:\n`, outputArray.slice(0, 10));

  // Print the confidence interval
  console.log(`🔒 %95 güven aralığı: [${ci.lower.toFixed(2)}, ${ci.upper.toFixed(2)}]`);
}