# Releasing @anys/url-join

GitHub Actions is the sole npm and GitHub Release publisher. Local release-it
commands only prepare release metadata for review.

## Contract

- `package.json` owns the SemVer version.
- Ordinary changes enter protected `master` through pull requests and required
  checks. Unrelated open pull requests do not block a release.
- The release branch must be exactly `release/vX.Y.Z` and its PR may change only
  `package.json` and `pnpm-lock.yaml`.
- The merged release PR is revalidated before `.github/workflows/release.yml`
  creates `vX.Y.Z`, publishes the packed npm artifact, and creates a GitHub
  Release with generated notes.
- Stable versions move npm `latest`. Supported prerelease identifiers become
  their npm dist-tag and GitHub prerelease state.

## Prepare

1. Update `master` and ensure all intended ordinary PRs are merged.
2. Create `release/vX.Y.Z` from that exact `master` head.
3. Run `pnpm release:check` and preview with `pnpm release:dry <increment>`.
4. Run `pnpm release <increment>`, where the increment is `patch`, `minor`,
   `major`, or an explicit version.
5. Push the branch and open a pull request into `master`.

release-it must not create a tag, push a release ref, publish npm, or create a
GitHub Release locally.

## Publish and verify

Merge the checked release PR. After the Action succeeds, verify the workflow,
remote tag target, GitHub Release state, npm version and dist-tags, and a fresh
install from the public package.

If only some delivery steps succeed, inspect the existing tag, GitHub Release,
and npm version before retrying the same merged-PR workflow. Never recover with
a local `npm publish`.
