# Contributing to Core Initiative

Keep each change focused and reviewable. All brand sites share one repository and one protected `main` branch; each task gets its own short-lived branch.

## Start a task

Start from the latest `main`:

```sh
git switch main
git pull --ff-only
git switch -c feat/contact-validation
```

Use a descriptive branch name:

- `feat/<scope>-<task>` for features.
- `fix/<scope>-<task>` for fixes.
- `docs/<topic>` for documentation.
- `codex/<scope>-<task>` for agent-created work.

For example, `feat/cookie-services` and `feat/contact-validation` are independent tasks. Keep unrelated changes in separate branches and pull requests.

Read the root [README](README.md) for installation and development commands, and [onboarding](docs/onboarding.md) for the application boundaries.

## Commit and open a pull request

Use English commit messages that describe the result, for example `fix: preserve native scrolling during footer closure`.

Commit only the intended files, push the task branch, and open a pull request targeting `main`. Open a draft PR early when feedback would help. Use the PR template to explain the problem, resulting behavior, and validation. Add screenshots or a preview link for visible UI changes when available.

Keep the branch up to date with `main`. Resolve conflicts and rerun relevant validation before requesting another review. Avoid rewriting a branch another person is using.

## Review and merge

### Current phase: one maintainer

Until a second human collaborator has write access and the shared review workflow is activated, independent approval is optional. The PR author can merge their own PR after the required checks pass and review conversations are resolved. No separate owner approval is required during this phase.

### Shared review phase

Before starting shared development, set the required approval count on `main` to **1** and update this guide to mark that phase active. This is a manual transition; adding a collaborator does not automatically change branch protection.

Once activated, every PR requires approval from at least one other human collaborator with write access. The author cannot approve their own PR. Automated checks and AI-assisted reviews support the reviewer; they do not replace that approval. New changes invalidate earlier approvals, so request review again after updating the PR. A PR remains open when the required reviewer is unavailable.

The reviewer should inspect the latest diff, verify the intended behavior and relevant checks, and raise actionable questions. Use Request changes when a change needs correction.

### Merge requirements in both phases

Merge only when:

1. The GitHub Actions `check` job has passed and the branch is up to date with `main`.
2. All review conversations have been resolved.
3. Any approval required by the active phase has been received.

Use **Squash and merge**, then delete the task branch. The resulting commit should describe the complete change. Start the next task from the updated `main`.

`main` requires pull requests, status checks, and conversation resolution. These requirements apply to administrators too. Direct pushes, force pushes, deletion of `main`, and bypassing protection to finish a task are not part of this workflow.

## Validation

Run `pnpm check` from the repository root after application or shared-configuration changes. GitHub Actions installs from the frozen lockfile and runs the same command on pushes and pull requests.

For documentation-only changes, check links, examples, and consistency with the implementation. Regenerate a collaboration brief's PDF/HTML only when its source changes. For UI changes, include relevant keyboard, responsive, locale, and reduced-motion checks. Describe what was actually tested and any remaining limits.

## Repository boundaries

- Write documentation, code comments, identifiers, PR descriptions and development guidance in English. Keep translated product copy in the NL, EN and TR dictionaries.
- Keep brand-specific typography, styling and motion inside the relevant application. Share unstyled components only when the task calls for extraction.
- Do not commit secrets, local environment files, generated build output or temporary audit pages. Public example configuration must not contain credentials.
- This repository is public. Keep private collaboration briefs and personal discussions outside it.
- Coordinate changes to shared configuration and API contracts with the other maintainer. Describe any new setup or integration requirements in the PR.
