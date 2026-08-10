# @anys/url-join

English | [简体中文](README.zh-CN.md)

A zero-dependency TypeScript utility for joining URL segments, filtering absent values, preserving protocols, and appending encoded query parameters.

## [Full English documentation →](https://github.com/cixiangtao/url-join#readme)

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

[Interactive demo](https://cixiangtao.github.io/url-join/) · [Chinese documentation](https://github.com/cixiangtao/url-join/blob/master/.github/README.zh-CN.md)

## License

[MIT](LICENSE) © cixiangtao
