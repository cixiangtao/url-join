# @anys/url-join

[English](README.md) | 简体中文

一个零依赖 TypeScript URL 拼接工具：自动过滤空值、保留协议并追加编码后的查询参数。

## [完整中文文档 →](https://github.com/cixiangtao/url-join/blob/master/.github/README.zh-CN.md)

```bash
pnpm add @anys/url-join
```

```ts
import { urlJoin } from "@anys/url-join";

urlJoin("https://api.example.com", "v1", null, "users", 123, {
  query: { include: "avatar" },
});
// https://api.example.com/v1/users/123?include=avatar
```

[在线演示](https://cixiangtao.github.io/url-join/) · [英文完整文档](https://github.com/cixiangtao/url-join#readme)

## 许可证

[MIT](LICENSE) © cixiangtao
