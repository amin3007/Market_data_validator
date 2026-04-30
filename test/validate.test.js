import test from "node:test";
import assert from "node:assert/strict";
import { validateTrade } from "../src/validate.js";

test("valid trade returns no errors", () => {
  const trade = {
    symbol: "DB1",
    timestamp: "2026-04-22T09:30:00Z",
    price: 215.4,
    volume: 100
  };

  const errors = validateTrade(trade);

  assert.deepEqual(errors, []);
});

test("missing symbol is detected", () => {
  const trade = {
    timestamp: "2026-04-22T09:30:00Z",
    price: 215.4,
    volume: 100
  };

  const errors = validateTrade(trade);

  assert.ok(errors.includes("Invalid or missing symbol"));
});

test("empty symbol is detected", () => {
  const trade = {
    symbol: "",
    timestamp: "2026-04-22T09:30:00Z",
    price: 215.4,
    volume: 100
  };

  const errors = validateTrade(trade);

  assert.ok(errors.includes("Invalid or missing symbol"));
});

test("missing timestamp is detected", () => {
  const trade = {
    symbol: "DB1",
    price: 215.4,
    volume: 100
  };

  const errors = validateTrade(trade);

  assert.ok(errors.includes("Invalid or missing timestamp"));
});

test("invalid timestamp format is detected", () => {
  const trade = {
    symbol: "DB1",
    timestamp: "2026-04-22 09:30:00",
    price: 215.4,
    volume: 100
  };

  const errors = validateTrade(trade);

  assert.ok(errors.includes("Invalid or missing timestamp"));
});

test("negative price is detected", () => {
  const trade = {
    symbol: "SAP",
    timestamp: "2026-04-22T09:30:00Z",
    price: -5,
    volume: 100
  };

  const errors = validateTrade(trade);

  assert.ok(errors.includes("Invalid or missing price"));
});

test("missing volume is detected", () => {
  const trade = {
    symbol: "DB1",
    timestamp: "2026-04-22T09:30:00Z",
    price: 215.4
  };

  const errors = validateTrade(trade);

  assert.ok(errors.includes("Invalid or missing volume"));
});

test("volume equal to zero is detected", () => {
  const trade = {
    symbol: "DB1",
    timestamp: "2026-04-22T09:30:00Z",
    price: 215.4,
    volume: 0
  };

  const errors = validateTrade(trade);

  assert.ok(errors.includes("Invalid or missing volume"));
});