/**
 * Validates a timestamp string
 * @param {*} timestamp 
 * @returns 
 */
function isValidTimestamp(timestamp) {
  if (typeof timestamp !== "string") { // Check if the timestamp is not a string
    return false;
  }

  const timestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/; // Regular expression to match the expected timestamp format (e.g., "2026-04-22T09:30:00T")

  if (!timestampRegex.test(timestamp)) { // If the timestamp does not match the expected format, return false
    return false;
  }

  return true; // If the timestamp is valid, return true
}
/**
 * Validates a trade object
 * @param {*} trade 
 * @returns {Array} An array of error messages (empty if no errors) 
 */
export function validateTrade(trade) {
    const errors = []; // Initialize an array to hold validation error messages

    if(!trade.symbol || typeof trade.symbol !== "string") { // Check if the symbol is missing or not a string
        errors.push("Invalid or missing symbol"); // If the symbol is invalid, add an error message to the errors array
    }

    if (!isValidTimestamp(trade.timestamp)) { // Check if the timestamp is missing or invalid using the isValidTimestamp function
        errors.push("Invalid or missing timestamp"); // If the timestamp is invalid, add an error message to the errors array
    }

    if(typeof trade.price !== "number" || trade.price <= 0) { // Check if the price is missing, not a number, or less than or equal to zero
        errors.push("Invalid or missing price"); // If the price is invalid, add an error message to the errors array
    }

    if(typeof trade.volume !== "number" || trade.volume <= 0) { // Check if the volume is missing, not a number, or less than or equal to zero
        errors.push("Invalid or missing volume"); // If the volume is invalid, add an error message to the errors array
    }
    
    return errors; // Return the array of error messages (empty if there are no errors)
}
