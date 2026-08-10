# 发布 @anys/url-join

[English](RELEASING.md) | 简体中文

GitHub Actions 是 npm 与 GitHub Release 的唯一发布者，Release Please 自动维护发版 PR。

普通改动通过受保护的 `master`、PR 与必需检查进入。Release Please 根据 Conventional Commit 或 squash merge 标题维护唯一发版 PR、SemVer 版本与 `CHANGELOG.md`。维护者检查受限差异、版本、Changelog 与 CI 后合并；`.github/workflows/release.yml` 重新验证准确的合并，只构建和打包一次，创建 `vX.Y.Z`，发布已检查的 npm 产物，并创建匹配的 GitHub Release。

稳定版更新 npm `latest`，预发布标识对应 npm dist-tag 与 GitHub prerelease 状态。发布后核对工作流、tag、Release、npm 版本与 dist-tags，以及公开包的干净安装。不要在本地升版、创建 tag 或发布。

仓库通过 `RELEASE_APP_CLIENT_ID` 与 `RELEASE_APP_PRIVATE_KEY` 使用已安装且具有 Contents、Issues、Pull requests 读写权限的 GitHub App。部分交付成功时，先检查发版 PR、工作流、tag、Release 与 npm，再从 `master` 用准确的发版 PR 编号重试工作流。不得使用本地 `npm publish` 或手工 tag 恢复。
