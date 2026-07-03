import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateOverallProgress,
  calculateStageProgress,
  findContinueStage,
  normalizeProgress,
} from "../progress.js";

const stages = [
  { id: "git", tasks: [{ id: "a" }, { id: "b" }] },
  { id: "pages", tasks: [{ id: "c" }, { id: "d" }] },
];

test("normalizeProgress removes unknown stages and tasks", () => {
  assert.deepEqual(
    normalizeProgress(stages, {
      git: ["a", "unknown"],
      missing: ["x"],
    }),
    { git: ["a"] },
  );
});

test("calculateStageProgress returns a rounded percentage", () => {
  assert.equal(calculateStageProgress(stages[0], { git: ["a"] }), 50);
  assert.equal(calculateStageProgress(stages[0], {}), 0);
});

test("calculateOverallProgress counts all tasks", () => {
  assert.equal(calculateOverallProgress(stages, { git: ["a"], pages: ["c"] }), 50);
  assert.equal(calculateOverallProgress(stages, {}), 0);
});

test("findContinueStage selects the first incomplete stage", () => {
  assert.equal(findContinueStage(stages, { git: ["a", "b"] }), "pages");
  assert.equal(
    findContinueStage(stages, { git: ["a", "b"], pages: ["c", "d"] }),
    "pages",
  );
});
