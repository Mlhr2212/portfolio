import assert from "node:assert";
import { stripFill } from "./content.ts";

assert.strictEqual(stripFill("[FILL: whole thing]"), "");
assert.strictEqual(
  stripFill("A clean sentence. [FILL: add detail later.]"),
  "A clean sentence.",
);
assert.strictEqual(stripFill("No markers here."), "No markers here.");

console.log("content.test.ts: stripFill ok");
