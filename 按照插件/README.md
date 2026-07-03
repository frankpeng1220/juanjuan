# GitHub Learning Roadmap

一个面向中文初学者的交互式 GitHub 学习路线。无需安装第三方依赖，可直接部署到 GitHub Pages。

## 推荐学习顺序

1. 先完成网页中的“30 分钟首次发布实战”，只使用 GitHub 网页端发布 `用户名.github.io`。
2. 在真实网址能够访问后，再学习 Git 基础、本地仓库和分支协作。
3. 最后学习自定义域名、GitHub Actions、Next.js 与 Vercel。

首次发布实战包含：

- 根据用户名自动生成仓库名和发布网址；
- GitHub 界面操作示意；
- 可一键复制的完整 `index.html`；
- 每一步的完成标志；
- 404、样式丢失和更新延迟排查；
- 浏览器本地保存的学习进度。

## 本地预览

在项目目录运行：

```bash
npm run serve
```

然后打开 `http://localhost:4311`。

## 运行检查

```bash
npm run check
npm test
```

## 发布到 GitHub Pages

1. 在 GitHub 新建公开仓库。
2. 将本目录文件提交并推送到 `main` 分支。
3. 打开仓库的 `Settings → Pages`。
4. 在 `Build and deployment` 中选择 `Deploy from a branch`。
5. 选择 `main` 分支与 `/ (root)` 目录并保存。
6. 等待 GitHub 生成公开访问地址。

## 数据与安全

学习进度只保存在当前浏览器的 `localStorage`，项目不收集用户信息，也不需要 API Key。

上线前仍应确认：

- 仓库中不存在密码、Token、API Key 或个人隐私；
- 后续接入数据库时启用 RLS，并按最小权限配置访问规则；
- 后续接入第三方服务时使用环境变量，不把密钥写进前端代码；
- 自定义域名完成所有权验证并强制启用 HTTPS。
