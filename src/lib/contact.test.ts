import assert from "node:assert";
import {
  checkRateLimit,
  isHoneypotFilled,
  isTooFast,
  validateContact,
} from "./contact.ts";

// valid input passes
assert.deepStrictEqual(
  validateContact({ name: "Ada", email: "ada@example.com", message: "Hi there" }),
  {},
);

// bad email fails
assert.strictEqual(
  validateContact({ name: "Ada", email: "not-an-email", message: "Hi" }).email,
  "Enter a valid email address.",
);

// honeypot-filled is rejected
assert.strictEqual(isHoneypotFilled("i am a bot"), true);
assert.strictEqual(isHoneypotFilled(""), false);
assert.strictEqual(isHoneypotFilled("   "), false);

// too-fast is rejected
assert.strictEqual(isTooFast(1000, 1500, 3000), true); // 500ms elapsed
assert.strictEqual(isTooFast(1000, 5000, 3000), false); // 4000ms elapsed

// rate limit: allows up to max, then blocks
let timestamps: number[] = [];
const now = 10_000;
for (let i = 0; i < 3; i++) {
  const result = checkRateLimit(timestamps, now, 60_000, 3);
  assert.strictEqual(result.allowed, true);
  timestamps = result.timestamps;
}
const blocked = checkRateLimit(timestamps, now, 60_000, 3);
assert.strictEqual(blocked.allowed, false);

console.log("contact.test.ts: validateContact/isHoneypotFilled/isTooFast/checkRateLimit ok");
