export function normalizeProgress(stages, savedProgress = {}) {
  const normalized = {};

  for (const stage of stages) {
    const allowed = new Set(stage.tasks.map((task) => task.id));
    const completed = Array.isArray(savedProgress[stage.id])
      ? [...new Set(savedProgress[stage.id].filter((taskId) => allowed.has(taskId)))]
      : [];

    if (completed.length > 0) {
      normalized[stage.id] = completed;
    }
  }

  return normalized;
}

export function calculateStageProgress(stage, progress = {}) {
  if (!stage.tasks.length) return 0;
  const completed = new Set(progress[stage.id] ?? []);
  const count = stage.tasks.filter((task) => completed.has(task.id)).length;
  return Math.round((count / stage.tasks.length) * 100);
}

export function calculateOverallProgress(stages, progress = {}) {
  const total = stages.reduce((sum, stage) => sum + stage.tasks.length, 0);
  if (!total) return 0;

  const completed = stages.reduce((sum, stage) => {
    const checked = new Set(progress[stage.id] ?? []);
    return sum + stage.tasks.filter((task) => checked.has(task.id)).length;
  }, 0);

  return Math.round((completed / total) * 100);
}

export function findContinueStage(stages, progress = {}) {
  const next = stages.find((stage) => calculateStageProgress(stage, progress) < 100);
  return (next ?? stages.at(-1))?.id ?? "";
}
