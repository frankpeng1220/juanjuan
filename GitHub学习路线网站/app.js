import { launchSteps, projects, stages, starterHtml } from "./content.js";
import {
  calculateOverallProgress,
  calculateStageProgress,
  findContinueStage,
  normalizeProgress,
} from "./progress.js";

const storageKey = "github-roadmap-progress-v1";
const launchStorageKey = "github-roadmap-launch-v1";
const usernameStorageKey = "github-roadmap-username-v1";

const elements = {
  roadmapList: document.querySelector("[data-roadmap-list]"),
  roadmapProgress: document.querySelector("[data-roadmap-progress]"),
  currentStatus: document.querySelector("[data-current-status]"),
  overallLabel: document.querySelector("[data-overall-label]"),
  overallBar: document.querySelector("[data-overall-bar]"),
  stageCount: document.querySelector("[data-stage-count]"),
  lessonNumber: document.querySelector("[data-lesson-number]"),
  lessonEyebrow: document.querySelector("[data-lesson-eyebrow]"),
  lessonTitle: document.querySelector("[data-lesson-title]"),
  lessonSummary: document.querySelector("[data-lesson-summary]"),
  lessonDuration: document.querySelector("[data-lesson-duration]"),
  lessonOutcome: document.querySelector("[data-lesson-outcome]"),
  stagePercent: document.querySelector("[data-stage-percent]"),
  stageBar: document.querySelector("[data-stage-bar]"),
  taskList: document.querySelector("[data-task-list]"),
  command: document.querySelector("[data-command]"),
  completionMessage: document.querySelector("[data-completion-message]"),
  projectList: document.querySelector("[data-project-list]"),
  toast: document.querySelector("[data-toast]"),
  username: document.querySelector("[data-github-username]"),
  repositoryName: document.querySelector("[data-repository-name]"),
  liveUrl: document.querySelector("[data-live-url]"),
  launchProgressLabel: document.querySelector("[data-launch-progress-label]"),
  launchProgressBar: document.querySelector("[data-launch-progress-bar]"),
  launchNext: document.querySelector("[data-launch-next]"),
  launchSteps: document.querySelector("[data-launch-steps]"),
};

let progress = loadProgress();
let launchProgress = loadLaunchProgress();
let githubUsername = loadUsername();
let activeStageId = findContinueStage(stages, progress) || stages[0].id;
let toastTimer;

function loadProgress() {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || "{}");
    return normalizeProgress(stages, value);
  } catch {
    return {};
  }
}

function saveProgress() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  } catch {
    showToast("当前浏览器无法保存进度");
  }
}

function loadLaunchProgress() {
  try {
    const value = JSON.parse(localStorage.getItem(launchStorageKey) || "[]");
    const allowed = new Set(launchSteps.map((step) => step.id));
    return Array.isArray(value) ? [...new Set(value.filter((id) => allowed.has(id)))] : [];
  } catch {
    return [];
  }
}

function loadUsername() {
  try {
    return localStorage.getItem(usernameStorageKey) || "";
  } catch {
    return "";
  }
}

function saveLaunchState() {
  try {
    localStorage.setItem(launchStorageKey, JSON.stringify(launchProgress));
    localStorage.setItem(usernameStorageKey, githubUsername);
  } catch {
    showToast("当前浏览器无法保存实战进度");
  }
}

function getActiveStage() {
  return stages.find((stage) => stage.id === activeStageId) ?? stages[0];
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderLaunchVisual(step) {
  const username = githubUsername || "你的用户名";
  const repository = `${username}.github.io`;

  if (step.visual === "account") {
    return `
      <div class="demo-window demo-account">
        <div class="demo-topbar"><span class="demo-github-mark">GH</span><i></i><i></i></div>
        <div class="account-card">
          <span class="demo-avatar"></span>
          <div><small>Signed in as</small><strong data-demo-username>${username}</strong></div>
        </div>
        <p>头像菜单中粗体文字就是你的用户名</p>
      </div>
    `;
  }

  if (step.visual === "repository") {
    return `
      <div class="demo-window">
        <div class="demo-titlebar"><span>Create a new repository</span></div>
        <div class="demo-form">
          <label><span>Owner *</span><strong data-demo-username>${username}</strong></label>
          <label class="is-focus"><span>Repository name *</span><strong data-demo-repository>${repository}</strong></label>
          <div class="demo-radio"><i class="is-selected"></i><span>Public</span></div>
          <div class="demo-check"><i>✓</i><span>Add a README file</span></div>
          <span class="demo-green-button">Create repository</span>
        </div>
      </div>
    `;
  }

  if (step.visual === "editor") {
    return `
      <div class="demo-window demo-editor">
        <div class="demo-filebar">
          <span class="demo-path" data-demo-repository>${repository}</span>
          <strong>index.html</strong>
        </div>
        <pre data-starter-code>${escapeHtml(starterHtml)}</pre>
        <button type="button" class="demo-copy" data-action="copy-starter">复制完整首页代码</button>
      </div>
    `;
  }

  if (step.visual === "commit") {
    return `
      <div class="demo-window demo-commit">
        <div class="demo-modal">
          <strong>Commit changes</strong>
          <label><span>Commit message</span><em>创建网站首页</em></label>
          <p><i class="is-selected"></i> Commit directly to the <b>main</b> branch</p>
          <span class="demo-green-button">Commit changes</span>
        </div>
      </div>
    `;
  }

  if (step.visual === "pages") {
    return `
      <div class="demo-window demo-settings">
        <div class="demo-settings-nav">
          <span>General</span><strong>Pages</strong><span>Actions</span>
        </div>
        <div class="demo-pages-panel">
          <small>Build and deployment</small>
          <label><span>Source</span><strong>Deploy from a branch⌄</strong></label>
          <div class="demo-select-row">
            <strong>main⌄</strong><strong>/ (root)⌄</strong><span>Save</span>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="demo-window demo-live">
      <div class="deployment-status"><i>✓</i><div><strong>pages build and deployment</strong><span>Deployment successful</span></div></div>
      <div class="demo-browser-address">
        <span>🔒</span>
        <strong data-demo-url>https://${username}.github.io</strong>
      </div>
      <div class="demo-site-preview"><h4>你好，世界。</h4><p>这是我通过 GitHub Pages 发布的第一个网站。</p></div>
    </div>
  `;
}

function renderLaunchLab() {
  const completed = new Set(launchProgress);
  const next = launchSteps.find((step) => !completed.has(step.id));
  const percent = Math.round((completed.size / launchSteps.length) * 100);

  elements.launchSteps.innerHTML = launchSteps
    .map(
      (step) => `
        <article class="launch-step ${completed.has(step.id) ? "is-complete" : ""}" id="launch-${step.id}">
          <div class="launch-step-meta">
            <span>${step.number}</span>
            <small>${step.duration}</small>
          </div>
          <div class="launch-step-copy">
            <p>${step.purpose}</p>
            <h3>${step.title}</h3>
            <ol>${step.actions.map((action) => `<li>${action}</li>`).join("")}</ol>
            <div class="expected-result"><span>完成标志</span><p>${step.expected}</p></div>
            <div class="step-actions">
              ${
                step.link
                  ? `<a class="button button-outline" href="${step.link}" target="_blank" rel="noreferrer">${step.linkLabel}<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4"/></svg></a>`
                  : ""
              }
              <label class="step-complete-control">
                <input type="checkbox" data-launch-id="${step.id}" ${completed.has(step.id) ? "checked" : ""}>
                <span>${completed.has(step.id) ? "已完成这一步" : "我已完成这一步"}</span>
              </label>
            </div>
          </div>
          <div class="launch-step-demo">${renderLaunchVisual(step)}</div>
        </article>
      `,
    )
    .join("");

  elements.launchProgressLabel.textContent = `${completed.size} / ${launchSteps.length}`;
  elements.launchProgressBar.style.width = `${percent}%`;
  elements.launchNext.textContent = next ? `下一步：${next.title}` : "首次发布实战已完成，可以继续进阶路线";
  updateUsernameViews();
}

function updateUsernameViews() {
  const username = githubUsername || "你的用户名";
  const repository = `${username}.github.io`;
  const url = `https://${username}.github.io`;

  elements.username.value = githubUsername;
  elements.repositoryName.textContent = repository;
  elements.liveUrl.textContent = url;
  elements.liveUrl.href = githubUsername ? `${url}/` : "#launch-lab";
  document.querySelectorAll("[data-demo-username]").forEach((node) => {
    node.textContent = username;
  });
  document.querySelectorAll("[data-demo-repository]").forEach((node) => {
    node.textContent = repository;
  });
  document.querySelectorAll("[data-demo-url]").forEach((node) => {
    node.textContent = url;
  });
}

function renderRoadmap() {
  elements.roadmapList.innerHTML = stages
    .map((stage) => {
      const percent = calculateStageProgress(stage, progress);
      const isActive = stage.id === activeStageId;
      const state = percent === 100 ? "已完成" : percent > 0 ? `${percent}%` : "未开始";
      return `
        <button
          class="roadmap-item ${isActive ? "is-active" : ""} ${percent === 100 ? "is-complete" : ""}"
          type="button"
          role="tab"
          aria-selected="${isActive}"
          data-stage-id="${stage.id}"
        >
          <span class="roadmap-node"><span>${percent === 100 ? "✓" : stage.number}</span></span>
          <span class="roadmap-copy">
            <strong>${stage.title}</strong>
            <small>${state}</small>
          </span>
        </button>
      `;
    })
    .join("");

  const activeIndex = stages.findIndex((stage) => stage.id === activeStageId);
  const linePercent = stages.length > 1 ? (activeIndex / (stages.length - 1)) * 100 : 0;
  elements.roadmapProgress.style.width = `${linePercent}%`;
  elements.currentStatus.textContent = `当前阶段：${getActiveStage().title}`;
}

function renderLesson() {
  const stage = getActiveStage();
  const completed = new Set(progress[stage.id] ?? []);
  const percent = calculateStageProgress(stage, progress);

  elements.lessonNumber.textContent = stage.number;
  elements.lessonEyebrow.textContent = stage.eyebrow;
  elements.lessonTitle.textContent = stage.title;
  elements.lessonSummary.textContent = stage.summary;
  elements.lessonDuration.textContent = stage.duration;
  elements.lessonOutcome.textContent = stage.outcome;
  elements.stagePercent.textContent = `${percent}%`;
  elements.stageBar.style.width = `${percent}%`;
  elements.command.textContent = stage.command;
  elements.completionMessage.textContent =
    percent === 100 ? "本阶段已经完成，可以继续向前。" : "完成以上任务后，即可进入下一阶段。";

  elements.taskList.innerHTML = stage.tasks
    .map(
      (task, index) => `
        <label class="task-item ${completed.has(task.id) ? "is-checked" : ""}">
          <input
            type="checkbox"
            data-task-id="${task.id}"
            ${completed.has(task.id) ? "checked" : ""}
          />
          <span class="task-check" aria-hidden="true">
            <svg viewBox="0 0 20 20"><path d="M4.5 10.5l3.4 3.4L15.8 6" /></svg>
          </span>
          <span class="task-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="task-copy">
            <strong>${task.title}</strong>
            <small>${task.detail}</small>
          </span>
        </label>
      `,
    )
    .join("");
}

function renderGlobalProgress() {
  const overall = calculateOverallProgress(stages, progress);
  const completedStages = stages.filter(
    (stage) => calculateStageProgress(stage, progress) === 100,
  ).length;
  elements.overallLabel.textContent = `${overall}%`;
  elements.overallBar.style.width = `${overall}%`;
  elements.stageCount.textContent = `${completedStages} / ${stages.length} 阶段完成`;
}

function renderProjects() {
  elements.projectList.innerHTML = projects
    .map(
      (project) => `
        <article class="project-item ${project.className}">
          <div class="project-meta">
            <span>${project.index}</span>
            <small>${project.meta}</small>
          </div>
          <div class="project-copy">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
          </div>
          <div class="project-preview" aria-hidden="true">
            <div class="preview-browser">
              <div class="preview-bar"><i></i><i></i><i></i></div>
              <div class="preview-content"><span></span><strong></strong><em></em></div>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function render() {
  renderLaunchLab();
  renderRoadmap();
  renderLesson();
  renderGlobalProgress();
}

function selectStage(stageId, shouldScroll = false) {
  if (!stages.some((stage) => stage.id === stageId)) return;
  activeStageId = stageId;
  render();
  if (shouldScroll) {
    document.querySelector("#lesson")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function toggleTask(taskId, checked) {
  const stage = getActiveStage();
  const completed = new Set(progress[stage.id] ?? []);
  checked ? completed.add(taskId) : completed.delete(taskId);

  if (completed.size) {
    progress[stage.id] = [...completed];
  } else {
    delete progress[stage.id];
  }

  saveProgress();
  render();
  if (calculateStageProgress(stage, progress) === 100) {
    showToast(`“${stage.title}”已完成`);
  }
}

function toggleLaunchStep(stepId, checked) {
  const completed = new Set(launchProgress);
  checked ? completed.add(stepId) : completed.delete(stepId);
  launchProgress = [...completed];
  saveLaunchState();
  renderLaunchLab();
  if (launchProgress.length === launchSteps.length) {
    showToast("首次发布实战已全部完成");
  }
}

function continueLearning() {
  const nextLaunchStep = launchSteps.find((step) => !launchProgress.includes(step.id));
  if (nextLaunchStep) {
    document.querySelector(`#launch-${nextLaunchStep.id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    return;
  }
  selectStage(findContinueStage(stages, progress), true);
}

function showToast(message) {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2200);
}

async function copyCommand() {
  const value = getActiveStage().command;
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
    await navigator.clipboard.writeText(value);
    showToast("命令已复制");
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    showToast(copied ? "命令已复制" : "复制失败，请手动选择命令");
  }
}

async function copyValue(value, successMessage) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
    await navigator.clipboard.writeText(value);
    showToast(successMessage);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    showToast(copied ? successMessage : "复制失败，请手动选择内容");
  }
}

document.addEventListener("click", (event) => {
  const stageButton = event.target.closest("[data-stage-id]");
  if (stageButton) {
    selectStage(stageButton.dataset.stageId, true);
    return;
  }

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;

  if (action === "start") {
    document.querySelector("#launch-lab")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (action === "continue") continueLearning();
  if (action === "copy-command") copyCommand();
  if (action === "copy-starter") copyValue(starterHtml, "完整首页代码已复制");
  if (action === "next-stage") {
    const currentIndex = stages.findIndex((stage) => stage.id === activeStageId);
    selectStage(stages[Math.min(currentIndex + 1, stages.length - 1)].id, true);
  }
});

document.addEventListener("change", (event) => {
  const task = event.target.closest("[data-task-id]");
  if (task) toggleTask(task.dataset.taskId, task.checked);

  const launchStep = event.target.closest("[data-launch-id]");
  if (launchStep) toggleLaunchStep(launchStep.dataset.launchId, launchStep.checked);
});

elements.username.addEventListener("input", (event) => {
  githubUsername = event.target.value
    .trim()
    .replace(/[^a-zA-Z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 39);
  if (event.target.value !== githubUsername) event.target.value = githubUsername;
  saveLaunchState();
  updateUsernameViews();
});

renderProjects();
render();
