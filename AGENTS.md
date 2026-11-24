# Repository guidance

## Language

Write documentation, code comments, identifiers, and development guidance in English. Keep translated website copy in the appropriate locale dictionaries; Dutch, English, and Turkish are supported product languages.

## Current scope

This repository contains the Core, Construct and Cookie Next.js applications and shared configuration. Preserve each brand's independent visual direction. Shared form components are planned under `common/component/`; avoid adding styling or backend features without a task that calls for them.

## Validation

Use the root README for setup and commands. Run `pnpm check` after application or shared-config changes. Check documentation links and regenerate the PDF/HTML brief when its source content changes.

## Branches and pull requests

Follow [CONTRIBUTING.md](CONTRIBUTING.md). Create a task branch before editing; use `codex/<scope>-<task>` for agent-created branches. Push work to that branch and open a PR targeting `main` when publication is authorized.

Do not push directly to `main`, self-approve a PR, bypass branch protection, or dismiss required reviews to complete a task. Automated and AI-assisted reviews do not replace the required independent human approval. Merge only after that approval, passing required checks and resolved review conversations; use squash merge. Leave the PR open if the required reviewer is unavailable.
