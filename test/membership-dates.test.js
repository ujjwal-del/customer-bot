import test from "node:test";
import assert from "node:assert/strict";
import { getExpiryDate } from "../src/membership-dates.js";

test("membership expiry follows the selected plan duration", () => {
  assert.equal(getExpiryDate("2026-10-12", "Monthly"), "2026-11-12");
  assert.equal(getExpiryDate("2026-10-12", "Quarterly"), "2027-01-12");
  assert.equal(getExpiryDate("2026-10-12", "Half Year"), "2027-04-12");
  assert.equal(getExpiryDate("2026-10-12", "Yearly"), "2027-10-12");
});

test("membership expiry clamps to the final valid day of the target month", () => {
  assert.equal(getExpiryDate("2026-01-31", "Monthly"), "2026-02-28");
  assert.equal(getExpiryDate("2024-01-31", "Monthly"), "2024-02-29");
  assert.equal(getExpiryDate("2026-01-31", "Quarterly"), "2026-04-30");
});

test("unknown plans and invalid joining dates have no expiry", () => {
  assert.equal(getExpiryDate("2026-10-12", "Unknown"), "");
  assert.equal(getExpiryDate("2026-02-30", "Monthly"), "");
  assert.equal(getExpiryDate("", "Monthly"), "");
});
