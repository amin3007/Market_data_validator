# Market-data-validator

A small full-stack validation project for reading, validating, testing, and displaying JSON market data.

The project contains a Node.js backend for market data validation, a small API server, automated tests, Docker support, and an Angular dashboard that displays the validation report in the browser.

## Project Goal

This project reads market data from a JSON file, validates required fields, creates a structured validation report, and displays the result either in the terminal or in an Angular dashboard.

The project was built as a small practice project for working with:

1. Node.js
2. JavaScript modules
3. JSON data processing
4. validation logic
5. automated tests
6. Docker
7. a small Angular frontend
8. a local Node.js API

## Project Structure

```text
market_data_validator/
  src/
    readFile.js
    validate.js
    report.js
    index.js
    server.js
  sample_data/
    good.json
    bad.json
  test/
    validate.test.js
  angular-report-viewer/
    src/
      app/
        app.ts
        app.html
        app.css
  Dockerfile
  package.json
  README.md
```

## Architecture

The project is split into a small backend, a command-line entry point, an API server, and an Angular frontend.

1. `readFile.js` loads JSON data from disk.
2. `validate.js` contains the validation logic for a single market data record.
3. `report.js` creates a structured validation report from the loaded data.
4. `index.js` is the CLI entry point and prints the report to the terminal.
5. `server.js` exposes the validation report through a local HTTP API.
6. `angular-report-viewer/` contains the Angular dashboard that fetches and displays the report.

## Requirements

1. Node.js
2. npm
3. Docker, only needed for container execution
4. Angular CLI, only needed for running the Angular dashboard

## Installation

Install the Node.js dependencies in the main project folder:

```bash
npm install
```

If the Angular dependencies are not installed yet, go into the Angular project and install them:

```bash
cd angular-report-viewer
npm install
```

## Run the CLI Version

Run the validator with the default sample data:

```bash
npm start
```

Alternatively, run the main file directly:

```bash
node src/index.js
```

Run the validator with a specific input file:

```bash
node src/index.js ./sample_data/good.json
```

```bash
node src/index.js ./sample_data/bad.json
```

## Run the API Server

Start the local Node.js API server from the main project folder:

```bash
npm run api
```

The API runs on:

```text
http://localhost:3001
```

Open the validation report for valid sample data:

```text
http://localhost:3001/api/report?file=good
```

Open the validation report for invalid sample data:

```text
http://localhost:3001/api/report?file=bad
```

## Run the Angular Dashboard

Start the backend API first:

```bash
npm run api
```

Then open a second terminal, go into the Angular project, and start Angular:

```bash
cd angular-report-viewer
ng serve
```

Then open:

```text
http://localhost:4200
```

The dashboard can load both sample files:

1. `Load good data`
2. `Load bad data`

The Angular dashboard fetches the real validation report from the Node.js API.

## Sample Data

The `sample_data/` folder contains two example files.

`good.json` contains valid sample records.

`bad.json` contains intentionally invalid records for testing the validation logic.

## Validation Rules

A dataset is currently considered valid if all of the following conditions are met:

1. `symbol` exists and is a string.
2. `timestamp` exists and matches the required timestamp format.
3. `price` is a number greater than 0.
4. `volume` is a number greater than 0.

The required timestamp format is:

```text
YYYY-MM-DDTHH:mm:ssZ
```

Example:

```text
2026-04-22T09:30:00Z
```

Timestamps with missing `Z`, spaces instead of `T`, milliseconds, or other formats are treated as invalid.

## Current Features

Current project status:

1. Reads JSON market data from a file.
2. Validates required fields.
3. Detects invalid datasets.
4. Creates a structured validation report.
5. Prints a report in the terminal.
6. Exposes the report through a local Node.js API.
7. Displays the report in an Angular dashboard.
8. Groups validation errors by dataset in the UI.
9. Includes automated tests for the validation logic.
10. Can be built and run with Docker.

## Tests

The project uses the built-in Node.js test runner.

Run the test suite with:

```bash
npm test
```

The current test file is:

```text
test/validate.test.js
```

The tests currently cover:

1. a valid trade
2. a missing `symbol`
3. an empty `symbol`
4. a missing `timestamp`
5. an invalid timestamp format
6. a negative `price`
7. a missing `volume`
8. `volume` equal to zero

## Docker

Build the Docker image from the main project folder:

```bash
docker build -t market-data-validator .
```

Run the project inside a Docker container:

```bash
docker run --rm market-data-validator
```

The current Docker setup runs the Node.js CLI version of the validator.

## Example CLI Output

Example output for valid input data:

```bash
Input file: ./sample_data/good.json
Number of datasets: 2
Valid datasets: 2
Invalid datasets: 0
```

Example output for invalid input data:

```bash
Input file: ./sample_data/bad.json
Number of datasets: 3
Valid datasets: 0
Invalid datasets: 3
```

The exact output may differ depending on the selected input file and the current sample data.

## Example API Response

Example response from:

```text
http://localhost:3001/api/report?file=good
```

```json
{
  "inputFile": "./sample_data/good.json",
  "totalRecords": 2,
  "validRecords": 2,
  "invalidRecords": 0,
  "results": [
    {
      "trade": {
        "symbol": "DB1",
        "timestamp": "2026-04-22T09:30:00Z",
        "price": 215.4,
        "volume": 100
      },
      "valid": true,
      "errors": []
    }
  ]
}
```

## Angular Dashboard

The Angular dashboard displays:

1. total datasets
2. valid datasets
3. invalid datasets
4. the selected source file
5. grouped validation errors per dataset

For invalid data, errors are displayed like this:

```text
Dataset 1
  Invalid or missing price

Dataset 2
  Invalid or missing symbol
  Invalid or missing volume
```

## Current Limitations

Not included yet:

1. persistent database storage
2. file upload through the frontend
3. user authentication
4. cloud deployment
5. CI/CD pipeline
6. advanced performance testing
7. production-grade error handling

## Next Steps

Possible next improvements:

1. Add file upload support in the Angular dashboard.
2. Add more validation rules.
3. Add integration tests for the API.
4. Dockerize the API and Angular frontend together.
5. Add a small deployment setup.
6. Add better UI states for empty or malformed input files.
