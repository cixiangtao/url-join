# 参与贡献

[English](CONTRIBUTING.md) | 简体中文

使用 `.nvmrc` 与 `package.json` 声明的 Node.js 和 pnpm。保持改动聚焦，保留协议与查询参数行为，并为公开行为补充测试。

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm type-check
pnpm test
pnpm build
pnpm build:site
pnpm release:check
```

使用 Conventional Commits。PR 应说明用户可见行为、兼容性影响与验证结果。不要提交凭据、构建产物、包压缩文件或本机配置。版本、tag、npm 发布与 Release 由维护者负责。漏洞按[安全政策](SECURITY.zh-CN.md)私密报告。
