import assert from "node:assert";
import { isTabKey, nextTabIndex } from "./tabs.ts";

assert.strictEqual(isTabKey("ArrowRight"), true);
assert.strictEqual(isTabKey("a"), false);

assert.strictEqual(nextTabIndex("ArrowRight", 0, 2), 1);
assert.strictEqual(nextTabIndex("ArrowRight", 1, 2), 0); // wraps forward
assert.strictEqual(nextTabIndex("ArrowLeft", 0, 2), 1); // wraps backward
assert.strictEqual(nextTabIndex("ArrowLeft", 1, 2), 0);
assert.strictEqual(nextTabIndex("Home", 1, 2), 0);
assert.strictEqual(nextTabIndex("End", 0, 2), 1);

console.log("tabs.test.ts: isTabKey/nextTabIndex ok");
