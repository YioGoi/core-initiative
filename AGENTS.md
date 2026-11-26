# Repository guidance

## Language

Write documentation, code comments, identifiers, and development guidance in English. Keep translated website copy in the appropriate locale dictionaries; Dutch, English, and Turkish are supported product languages.

## Current scope

This repository contains the Core, Construct, Cookie and Tool Next.js applications and shared configuration. Preserve each brand's independent visual direction. Shared form components are planned under `common/component/`; avoid adding styling or backend features without a task that calls for them.

## Validation

Use the root README for setup and commands. Run `pnpm check` after application or shared-config changes. Check documentation links and regenerate the PDF/HTML brief when its source content changes.

## Branches and pull requests

Follow [CONTRIBUTING.md](CONTRIBUTING.md). Create a task branch before editing; use `codex/<scope>-<task>` for agent-created branches. Push work to that branch and open a PR targeting `main` when publication is authorized.

Do not push directly to `main`, self-approve a PR, bypass branch protection, or dismiss required reviews to complete a task. Follow the active review phase in CONTRIBUTING.md: independent approval is optional during the current one-maintainer phase and becomes mandatory when the shared review phase is activated. Automated and AI-assisted reviews do not replace required human approval. When a merge is authorized, merge only after passing required checks, resolved review conversations and any approval required by the active phase; use squash merge. Leave the PR open if a required reviewer is unavailable.
