# @anys/url-join

[English](README.md) | 简体中文

一个 TypeScript URL 片段拼接工具，可自动过滤 `null`、`undefined` 与空字符串。

[打开交互演示](https://cixiangtao.github.io/url-join/)，可在浏览器中体验 URL 片段、查询参数、规范化与尾斜杠。

## 特点

- TypeScript 编写并提供完整类型。
- 自动过滤 `null`、`undefined` 与空字符串。
- 支持字符串、数字和混合输入。
- 可配置尾斜杠、斜杠规范化与查询参数。
- 保留 `http://`、`https://` 等协议。
- 自动编码查询参数并支持数组值。
- 零运行时依赖，同时提供 ESM 与 CJS。

## 安装

```bash
pnpm add @anys/url-join
```

## 使用

```ts
import { urlJoin } from "@anys/url-join";

urlJoin("api", "v1", "users");
// api/v1/users

urlJoin("https://api.example.com", "v1", "users");
// https://api.example.com/v1/users

urlJoin("api", null, "users", undefined, "profile");
// api/users/profile

urlJoin("api", "users", 123);
// api/users/123
```

也支持默认导出。

## 高级用法

```ts
urlJoin("api", "users", { trailingSlash: true });
// api/users/

urlJoin("api//users", { normalize: false });
// api//users

urlJoin("api", "search", {
  query: { q: "hello world", active: true, tags: ["js", "ts"] },
});
// api/search?q=hello%20world&active=true&tags=js&tags=ts

urlJoin("api/users?sort=name", { query: { page: 1 } });
// api/users?sort=name&page=1
```

## API

`urlJoin(...segments, options?)` 拼接 URL 片段并过滤空值。

```ts
type UrlSegment = string | number | null | undefined;
type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue | QueryValue[]>;

interface UrlJoinOptions {
  trailingSlash?: boolean;
  normalize?: boolean;
  query?: QueryParams;
}
```

- `trailingSlash`：是否添加尾斜杠。
- `normalize`：是否把连续斜杠规范为单斜杠，默认 `true`。
- `query`：追加到 URL 的查询参数。
- 返回值为拼接后的字符串。

在线 Playground 运行包的真实实现，并随着输入实时更新结果与 TypeScript 片段。

## 开发与发布

使用 `.nvmrc` 与 `package.json` 声明的 Node.js 24 和 pnpm 11。

```bash
pnpm install
pnpm test
pnpm test:coverage
pnpm build
pnpm lint
pnpm type-check
pnpm release:check
```

Release Please 自动维护发版 PR。维护者检查版本、Changelog 与必需 CI 后合并，GitHub Actions 验证准确的合并，创建 tag，通过 trusted publishing 发布已检查的 npm 产物，并创建 GitHub Release。详情见[发布说明](../RELEASING.zh-CN.md)。

参与开发前阅读[贡献指南](../CONTRIBUTING.zh-CN.md)，普通反馈见[支持说明](../SUPPORT.zh-CN.md)，安全问题按[安全政策](../SECURITY.zh-CN.md)私密报告。

## 许可证

[MIT](../LICENSE) © [cixiangtao](https://github.com/cixiangtao)
