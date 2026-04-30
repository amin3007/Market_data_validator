import http from "node:http"; // Built-in Node.js HTTP module
import { createValidationReport } from "./report.js"; // Reusable validation report logic

const PORT = 3000; // Local API server port

/**
 * Sends a JSON response to the client.
 *
 * @param {http.ServerResponse} res The HTTP response object.
 * @param {number} statusCode The HTTP status code.
 * @param {Object} data The response payload.
 */
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });

  res.end(JSON.stringify(data));
}

/**
 * Maps the requested sample file to a local JSON file path.
 *
 * Only known sample files are allowed.
 *
 * @param {string | null} file The requested file key from the query parameter.
 * @returns {string} The local input file path.
 */
function getInputPath(file) {
  if (file === "bad") {
    return "./sample_data/bad.json";
  }

  return "./sample_data/good.json";
}

/**
 * Handles incoming HTTP requests for the validation report API.
 *
 * Supported endpoint:
 * GET /api/report?file=good
 * GET /api/report?file=bad
 *
 * @param {http.IncomingMessage} req The incoming HTTP request.
 * @param {http.ServerResponse} res The outgoing HTTP response.
 */
async function handleRequest(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    // Allow simple CORS preflight handling if needed
    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      });
      res.end();
      return;
    }

    // Only one API route is supported
    if (url.pathname !== "/api/report") {
      sendJson(res, 404, { error: "Route not found" });
      return;
    }

    // Only GET requests are allowed for this endpoint
    if (req.method !== "GET") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }

    const file = url.searchParams.get("file"); // Reads ?file=good or ?file=bad
    const inputPath = getInputPath(file); // Selects the local sample data file

    const report = await createValidationReport(inputPath); // Creates the validation report

    sendJson(res, 200, report);
  } catch (error) {
    sendJson(res, 500, {
      error: "Internal server error",
      message: error.message
    });
  }
}

const server = http.createServer(handleRequest); // Creates the HTTP server

server.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});