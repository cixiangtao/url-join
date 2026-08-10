# Contributing

English | [简体中文](CONTRIBUTING.zh-CN.md)

Use the Node.js and pnpm versions declared in `.nvmrc` and `package.json`. Keep changes focused, preserve protocol and query behavior, and add tests for public behavior.

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm type-check
pnpm test
pnpm build
pnpm build:site
pnpm release:check
```

Use Conventional Commits. Pull requests should explain the user-visible behavior, compatibility impact, and verification. Do not commit credentials, build output, package archives, or machine-specific configuration. Maintainers own version changes, tags, npm publication, and Releases. Report vulnerabilities through [Security](SECURITY.md).
