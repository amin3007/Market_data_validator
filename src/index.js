import { createValidationReport } from "./report.js"; // Importing the report creation function from the report.js module

/**
 * Main CLI entry point.
 *
 * This function reads the input file path from the command line.
 * If no path is provided, it uses the default sample data file.
 *
 * Example:
 * node src/index.js
 * node src/index.js ./sample_data/bad.json
 */
async function main() {
  try {
    const inputPath = process.argv[2] || "./sample_data/good.json"; // Getting the input file path from command line arguments or using good.json as default

    const report = await createValidationReport(inputPath); // Creating a structured validation report for the selected input file

    console.log("Input file:", report.inputFile);
    console.log("Number of datasets:", report.totalRecords);
    console.log("Valid datasets:", report.validRecords);
    console.log("Invalid datasets:", report.invalidRecords);
    console.log(JSON.stringify(report.results, null, 2)); // Logging the detailed validation results as formatted JSON
  } catch (error) {
    console.error("Error while processing:", error.message); // Logging any error that occurs while loading or validating the data
  }
}

main(); // Calling the main function to execute the CLI validation process