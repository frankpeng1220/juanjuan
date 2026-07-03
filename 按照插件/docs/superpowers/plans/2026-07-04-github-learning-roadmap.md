# GitHub Learning Roadmap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个可交互、可保存学习进度并能直接部署到 GitHub Pages 的中文学习路线网页。

**Architecture:** 使用原生静态页面实现，`content.js` 管理课程数据，`progress.js` 提供可测试的纯函数，`app.js` 负责 DOM、存储与交互，`styles.css` 管理完整响应式视觉系统。页面不依赖构建工具，降低初学者发布门槛。

**Tech Stack:** HTML5、CSS3、Vanilla JavaScript、Node.js 内置测试

---

### Task 1: 学习数据与进度逻辑

**Files:**
- Create: `content.js`
- Create: `progress.js`
- Test: `tests/progress.test.mjs`

- [x] 定义八个阶段、课程任务、命令示例和成果数据。
- [x] 编写进度归一化、阶段完成率、总体完成率及继续学习阶段选择函数。
- [x] 使用 `node --test tests/progress.test.mjs` 验证空状态、部分完成和全部完成。

### Task 2: 页面语义结构

**Files:**
- Create: `index.html`

- [x] 创建导航、首屏、路线、课程工作区、实践成果和页尾行动区。
- [x] 为进度、路线切换、任务勾选和复制按钮提供可访问语义。
- [x] 保持页面无需构建即可加载。

### Task 3: 高端科技官网视觉系统

**Files:**
- Create: `styles.css`

- [x] 定义颜色、字体、间距、边框、阴影和动效变量。
- [x] 实现明暗分区、Git 分支主视觉、横向路线和课程面板。
- [x] 完成桌面、平板和手机响应式布局，并适配减少动态效果。

### Task 4: 页面交互与本地保存

**Files:**
- Create: `app.js`

- [x] 渲染路线、当前课程与成果内容。
- [x] 实现阶段切换、任务勾选、总体进度和继续学习定位。
- [x] 使用 `localStorage` 保存任务完成状态，存储异常时安全回退。
- [x] 实现命令复制反馈与导航滚动。

### Task 5: 使用说明与验证

**Files:**
- Create: `README.md`

- [x] 写明本地预览和 GitHub Pages 发布步骤。
- [x] 运行 `node --check app.js`、`node --check content.js`、`node --check progress.js`。
- [x] 运行自动测试并通过浏览器检查桌面和手机布局。
- [x] 检查敏感信息、环境变量、API Key、权限和发布配置。
