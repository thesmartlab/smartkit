#!/usr/bin/env node

// CLI Entry Point for SmartKit
// Defines all available commands and routes them to their respective handlers

import { Command } from 'commander';
import { runBinCommand } from './commands/bin.js';
import { runBootstrapCommand } from './commands/bootstrap.js';

const program = new Command();

program
  .name('smartkit')
  .description('CLI toolkit for behavioral data analysis')
  .version('1.0.0');

// Bin Analysis Command
program
  .command('bin')
  .argument('<csv>', 'Path to the CSV file')
  .option('-c, --column <name>', 'Column name to extract numeric values from', 'value')
  .option('-b, --bins <number>', 'Number of bins to divide the data into', '5')
  .option('-o, --output <file>', 'Output file path (CSV format)', 'output/bin_result.csv')
  .description('Performs bin analysis on a numeric column')
  .action(runBinCommand);

// Bootstrap Command
program
  .command('bootstrap')
  .argument('<csv>', 'Path to the CSV file')
  .option('-n, --iterations <number>', 'Number of bootstrap iterations to run', '1000')
  .option('-c, --column <name>', 'Column name to extract numeric values from', 'value')
  .description('Performs bootstrap resampling and confidence interval estimation')
  .action(runBootstrapCommand);

program.parse();