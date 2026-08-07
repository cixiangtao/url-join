# Releasing @anys/url-join

GitHub Actions is the only npm and GitHub Release publisher. Release Please automatically maintains
the release pull request.

## Normal flow

1. Merge ordinary changes into protected `master` through pull requests and required checks.
   Unrelated open pull requests do not block a release.
2. Release Please updates one automated release PR from a
   `release-please--branches--master--...` branch. Conventional commit or squash-merge titles
   determine the proposed SemVer version and `CHANGELOG.md` (`fix` = patch, `feat` = minor, and
   `!` or `BREAKING CHANGE` = major).
3. Review the release-only diff, proposed version, changelog, and CI, then merge that PR when ready.
4. `.github/workflows/release.yml` revalidates the exact merged PR, builds and packs once, creates
   `vX.Y.Z`, publishes the inspected npm artifact, and creates the matching GitHub Release.
5. Verify the workflow, tag target, GitHub Release state, npm version/dist-tags, and a fresh public
   package install.

Stable versions move npm `latest`. Supported prerelease identifiers become their npm dist-tag and
GitHub prerelease state. Do not bump versions, create tags, or publish from a workstation.

## Automation credentials and recovery

Define the Actions variable `RELEASE_APP_CLIENT_ID` and secret `RELEASE_APP_PRIVATE_KEY` for a
GitHub App installed on this repository with Contents, Issues, and Pull requests read/write
permissions. Its token lets required CI run unattended; PR checks created with the default
`GITHUB_TOKEN` currently wait for separate workflow approval.

If delivery partially succeeds, inspect the merged release PR, workflow, tag, GitHub Release, and
npm version first. Then manually run the release workflow from `master` with that merged Release
Please PR number. Recovery revalidates the exact PR, merge commit, release-only diff, version,
ancestry, tag, and registry state before resuming missing steps. Never recover with a local
`npm publish` or a manual release tag.
