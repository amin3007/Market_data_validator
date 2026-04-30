import { loadTrades } from "./readFile.js"; // Importing the loadTrades function from the readFile.js module
import { validateTrade } from "./validate.js"; // Importing the validateTrade function from the validate.js module

/**
 * Creates a validation report for a given JSON input file.
 *
 * This function loads trade data from the provided file path,
 * validates each trade object, counts valid and invalid records,
 * and returns a structured report object.
 *
 * @param {string} inputPath The path to the JSON file that should be validated.
 * @returns {Promise<Object>} A validation report containing summary values and detailed results.
 */
export async function createValidationReport(inputPath) {
  const trades = await loadTrades(inputPath); // Loading trade data from the selected JSON file

  let validCount = 0; // Counter for valid trade records
  let invalidCount = 0; // Counter for invalid trade records
  const results = []; // Array containing each trade and its validation errors

  for (const trade of trades) {
    const errors = validateTrade(trade); // Validating the current trade object

    if (errors.length === 0) {
      validCount++;
    } else {
      invalidCount++;
    }

    results.push({
      trade,
      valid: errors.length === 0,
      errors
    });
  }

  return {
    inputFile: inputPath,
    totalRecords: trades.length,
    validRecords: validCount,
    invalidRecords: invalidCount,
    results
  };
}