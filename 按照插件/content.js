export const stages = [
  {
    id: "git-basics",
    number: "01",
    title: "Git 基础",
    eyebrow: "理解版本控制",
    summary: "学会记录、查看和回退代码变化，建立正确的版本意识。",
    duration: "约 35 分钟",
    command: "git init && git status",
    outcome: "完成第一个本地提交",
    tasks: [
      { id: "install", title: "安装 Git 并确认版本", detail: "运行 git --version，确认电脑已准备好。" },
      { id: "identity", title: "设置提交身份", detail: "配置用户名和邮箱，让每次提交都有清晰来源。" },
      { id: "init", title: "创建本地仓库", detail: "在项目目录执行 git init。" },
      { id: "commit", title: "完成第一次提交", detail: "添加文件并写下一条准确的提交说明。" },
    ],
  },
  {
    id: "local-repo",
    number: "02",
    title: "本地仓库",
    eyebrow: "掌握日常操作",
    summary: "理解工作区、暂存区和提交历史之间的关系。",
    duration: "约 45 分钟",
    command: "git add . && git commit -m \"feat: first page\"",
    outcome: "建立可追踪的项目历史",
    tasks: [
      { id: "status", title: "读懂 git status", detail: "识别新增、修改和已暂存文件。" },
      { id: "stage", title: "选择性暂存文件", detail: "使用 git add 精确控制下一次提交。" },
      { id: "history", title: "查看提交历史", detail: "用 git log 了解项目是怎样变化的。" },
      { id: "ignore", title: "创建 .gitignore", detail: "排除密钥、系统文件和构建产物。" },
    ],
  },
  {
    id: "github-repo",
    number: "03",
    title: "GitHub 仓库",
    eyebrow: "把代码放到云端",
    summary: "创建远程仓库，把本地项目安全地推送到 GitHub。",
    duration: "约 40 分钟",
    command: "git push -u origin main",
    outcome: "拥有第一个在线代码仓库",
    tasks: [
      { id: "account", title: "完成 GitHub 账号设置", detail: "启用双重验证并完善基础资料。" },
      { id: "create", title: "新建远程仓库", detail: "理解公开仓库与私有仓库的区别。" },
      { id: "remote", title: "连接 origin", detail: "把本地仓库与 GitHub 地址关联。" },
      { id: "push", title: "推送 main 分支", detail: "在网页上确认文件与提交记录。" },
    ],
  },
  {
    id: "collaboration",
    number: "04",
    title: "分支协作",
    eyebrow: "安全地并行修改",
    summary: "使用分支、Issue 和 Pull Request 组织真实开发流程。",
    duration: "约 55 分钟",
    command: "git switch -c feature/roadmap",
    outcome: "完成一次规范的合并请求",
    tasks: [
      { id: "branch", title: "创建功能分支", detail: "让新功能与稳定版本相互隔离。" },
      { id: "issue", title: "建立一个 Issue", detail: "清楚描述目标、范围与验收标准。" },
      { id: "pull-request", title: "发起 Pull Request", detail: "说明改了什么、为什么改以及如何验证。" },
      { id: "merge", title: "完成审查与合并", detail: "理解冲突、审查和删除分支的时机。" },
    ],
  },
  {
    id: "github-pages",
    number: "05",
    title: "GitHub Pages",
    eyebrow: "发布第一个网站",
    summary: "把 HTML、CSS 和 JavaScript 项目变成任何人都能访问的网站。",
    duration: "约 30 分钟",
    command: "Settings → Pages → Deploy from a branch",
    outcome: "获得公开可访问的网址",
    tasks: [
      { id: "index", title: "准备 index.html", detail: "确认入口文件位于发布目录。" },
      { id: "push-site", title: "推送网站文件", detail: "检查资源路径使用相对地址。" },
      { id: "enable-pages", title: "开启 GitHub Pages", detail: "选择 main 分支与根目录作为发布源。" },
      { id: "verify-site", title: "完成上线检查", detail: "验证电脑与手机访问、链接和样式。" },
    ],
  },
  {
    id: "custom-domain",
    number: "06",
    title: "自定义域名",
    eyebrow: "建立专属入口",
    summary: "理解 DNS、CNAME 与 HTTPS，把独立域名连接到网站。",
    duration: "约 45 分钟",
    command: "www.example.com  CNAME  username.github.io",
    outcome: "使用自己的域名访问网站",
    tasks: [
      { id: "domain", title: "准备域名", detail: "确认域名归属与 DNS 管理入口。" },
      { id: "verify-domain", title: "验证域名所有权", detail: "在 GitHub 中完成域名安全验证。" },
      { id: "dns", title: "配置 DNS 记录", detail: "按根域名或 www 子域名选择正确记录。" },
      { id: "https", title: "强制启用 HTTPS", detail: "等待证书签发并检查安全访问。" },
    ],
  },
  {
    id: "actions",
    number: "07",
    title: "自动化部署",
    eyebrow: "让发布自动发生",
    summary: "认识 GitHub Actions，用工作流自动检查和部署项目。",
    duration: "约 60 分钟",
    command: "mkdir -p .github/workflows",
    outcome: "每次推送都自动执行检查",
    tasks: [
      { id: "workflow", title: "认识工作流文件", detail: "理解触发器、任务和步骤。" },
      { id: "check", title: "添加代码检查任务", detail: "在发布前发现明显语法错误。" },
      { id: "deploy", title: "配置自动部署", detail: "使用官方 Pages Actions 流程。" },
      { id: "logs", title: "读懂运行日志", detail: "定位失败步骤并重新执行。" },
    ],
  },
  {
    id: "next-vercel",
    number: "08",
    title: "Next.js + Vercel",
    eyebrow: "进入现代 Web 开发",
    summary: "把 GitHub 仓库连接到 Vercel，体验分支预览和持续部署。",
    duration: "约 90 分钟",
    command: "npx create-next-app@latest",
    outcome: "发布第一个现代前端项目",
    tasks: [
      { id: "next", title: "创建 Next.js 项目", detail: "理解页面、组件与开发服务器。" },
      { id: "repository", title: "推送项目到 GitHub", detail: "检查环境变量没有进入仓库。" },
      { id: "vercel", title: "导入 Vercel", detail: "连接仓库并完成首次生产部署。" },
      { id: "security", title: "完成上线安全检查", detail: "检查环境变量、API Key、RLS 与最小权限。" },
    ],
  },
];

export const projects = [
  {
    index: "01",
    title: "个人主页",
    description: "用 HTML 与 CSS 建立属于你的线上名片。",
    meta: "对应阶段 01—05",
    className: "project-profile",
  },
  {
    index: "02",
    title: "作品集网站",
    description: "使用独立域名，展示项目、经历与能力。",
    meta: "对应阶段 05—07",
    className: "project-portfolio",
  },
  {
    index: "03",
    title: "Next.js 项目",
    description: "连接 GitHub 与 Vercel，体验自动化发布。",
    meta: "对应阶段 07—08",
    className: "project-next",
  },
];

export const starterHtml = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的第一个网站</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: system-ui, sans-serif;
        background: #f4f4f0;
        color: #111;
      }
      main { max-width: 680px; padding: 48px; }
      h1 { font-size: clamp(48px, 8vw, 96px); line-height: .95; }
      p { color: #666; font-size: 18px; }
    </style>
  </head>
  <body>
    <main>
      <h1>你好，世界。</h1>
      <p>这是我通过 GitHub Pages 发布的第一个网站。</p>
    </main>
  </body>
</html>`;

export const launchSteps = [
  {
    id: "account",
    number: "01",
    title: "登录 GitHub，确认用户名",
    duration: "2 分钟",
    purpose: "你的用户名将成为免费网站地址的一部分。",
    actions: [
      "打开 github.com 并登录；如果还没有账号，先完成注册和邮箱验证。",
      "点击右上角头像，用户名会显示在头像菜单和个人主页地址中。",
      "把用户名填入本页下方输入框，系统会替你生成正确的仓库名和网址。",
    ],
    expected: "你知道自己的 GitHub 用户名，例如 octocat。",
    link: "https://github.com/",
    linkLabel: "打开 GitHub",
    visual: "account",
  },
  {
    id: "repository",
    number: "02",
    title: "创建网站仓库",
    duration: "4 分钟",
    purpose: "GitHub Pages 会从这个仓库读取网页文件。",
    actions: [
      "点击 GitHub 右上角“+”，选择“New repository”。",
      "Repository name 必须填写“你的用户名.github.io”，并选择 Public。",
      "建议勾选 Add a README file，然后点击 Create repository。",
    ],
    expected: "你进入了一个名为“用户名.github.io”的公开仓库。",
    link: "https://github.com/new",
    linkLabel: "新建仓库",
    visual: "repository",
  },
  {
    id: "html",
    number: "03",
    title: "创建 index.html",
    duration: "8 分钟",
    purpose: "index.html 是浏览器打开网站时默认读取的首页。",
    actions: [
      "在仓库文件列表上方点击 Add file，再选择 Create new file。",
      "在文件名输入框准确填写 index.html，注意必须是英文半角字符。",
      "复制本页准备好的完整代码，粘贴到 GitHub 文件编辑器。",
    ],
    expected: "编辑器顶部显示文件名 index.html，下面能看到完整 HTML 代码。",
    link: "",
    linkLabel: "",
    visual: "editor",
  },
  {
    id: "commit",
    number: "04",
    title: "保存第一次修改",
    duration: "3 分钟",
    purpose: "GitHub 把每次保存称为一次 Commit（提交）。",
    actions: [
      "点击编辑器右上角绿色的 Commit changes… 按钮。",
      "提交说明填写“创建网站首页”，选择 Commit directly to the main branch。",
      "再次点击 Commit changes，返回仓库文件列表。",
    ],
    expected: "仓库根目录出现 index.html，并能看到刚刚的提交说明。",
    link: "",
    linkLabel: "",
    visual: "commit",
  },
  {
    id: "pages",
    number: "05",
    title: "开启 GitHub Pages",
    duration: "5 分钟",
    purpose: "这一步告诉 GitHub：把 main 分支根目录当作网站发布。",
    actions: [
      "进入仓库顶部 Settings；如果没看到，可在顶部更多菜单中寻找。",
      "在左侧 Code and automation 分组中点击 Pages。",
      "Source 选择 Deploy from a branch；Branch 选择 main 和 / (root)，点击 Save。",
    ],
    expected: "Pages 页面显示正在部署，稍后出现“Your site is live at”地址。",
    link: "",
    linkLabel: "",
    visual: "pages",
  },
  {
    id: "verify",
    number: "06",
    title: "访问并验证网站",
    duration: "5—10 分钟",
    purpose: "真正打开公开网址，才算完成发布。",
    actions: [
      "首次发布通常需要几分钟；在仓库 Actions 页面可以查看部署进度。",
      "访问系统为你生成的网址，确认能看到“你好，世界。”。",
      "回到 index.html 点击铅笔图标，修改一句文字并再次提交，验证网站会自动更新。",
    ],
    expected: "电脑和手机都能访问网站，刷新后能看到你修改的新内容。",
    link: "",
    linkLabel: "",
    visual: "live",
  },
];
