import { readFile } from "node:fs/promises"; // Importing the readFile function from the fs/promises module to read files asynchronously
/** 
 * Loads trade data from a JSON file.
 * @param {string} path - The path to the JSON file.
 * @returns {Promise<Array>} A promise resolving to an array of trade objects.
 */
export async function loadTrades(path) {
    const content = await readFile(path, "utf8"); // Reading the file at the specified path with UTF-8 encoding
    return JSON.parse(content); // Parsing the content of the file as JSON and returning it
}