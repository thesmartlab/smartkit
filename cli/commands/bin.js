import { CsvReader } from '../../src/core/data/CsvReader.js';
import { BinAnalyzer } from '../../src/core/analysis/bin/BinAnalyzer.js';
import fs from 'fs';
import path from 'path';

/**
 * Handles the 'smartkit bin' CLI command.
 * Reads a CSV file, performs bin analysis, and writes the result to a CSV file.
 *
 * @param {string} csvPath - Path to the input CSV file
 * @param {object} options - CLI options including column, bins, and output path
 */
export async function runBinCommand(csvPath, options) {
  // Read the numeric values from the specified column in the CSV file
  const reader = new CsvReader(csvPath, options.column || 'value');
  const data = await reader.read();

  // Perform bin analysis on the data
  const analyzer = new BinAnalyzer(data, parseInt(options.bins || 5));
  const result = analyzer.analyze();

  // Convert result to CSV format
  const csvOutput = 'bin,count\n' + result.map(r => `${r.bin},${r.count}`).join('\n');

  // Determine the output file path
  const outputPath = path.resolve(options.output || 'output/bin_result.csv');

  // Write the result to the output file
  fs.writeFileSync(outputPath, csvOutput);

  // Notify the user
  console.log(`✅ Bin analizi tamamlandı: ${outputPath}`);
}