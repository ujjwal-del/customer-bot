import test from "node:test";
import assert from "node:assert/strict";
import { isConfiguredUpiId } from "../src/payment-config.js";

test("a configured UPI ID must have a handle and provider without the placeholder", () => {
  assert.equal(isConfiguredUpiId("fitness.center@bank"), true);
  assert.equal(isConfiguredUpiId(""), false);
  assert.equal(isConfiguredUpiId("YOUR_GYM_UPI_ID@upi"), false);
  assert.equal(isConfiguredUpiId("not-a-upi-id"), false);
});
