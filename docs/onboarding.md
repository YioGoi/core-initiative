# Quick onboarding

Start with the root `README.md`. With Node and pnpm installed, run `pnpm install --frozen-lockfile`, then `pnpm dev` to start both applications.

## Files to explore first

| File | Purpose |
| --- | --- |
| `common/config/index.ts` | Seven brands, target origins, and three locales |
| `core-initiative-site/src/config/site.ts` | Core's site identity and origin |
| `construct-site/src/config/site.ts` | Construct's site identity and origin |
| `src/app/[locale]/page.tsx` in each application | Unstyled starter page |
| `src/app/[locale]/layout.tsx` in each application | Required Next.js HTML/body shell and document language |

## Current scope

- Core and Construct run and build independently.
- Dutch is the default language; English and Turkish routes also work.
- Starter pages contain the brand name and a short introduction.
- Shared components will live in `common/component/`. Form elements and style guides come later.
- ASP.NET Core is the agreed backend technology. Backend implementation has not started; .NET and a database are not required to run this version.

## Local configuration

Environment variables are optional. For example, copy Core's `.env.example` to `.env.local` in the same directory. `NEXT_PUBLIC_SITE_ORIGIN` sets the origin used in that application's metadata; it contains no secret.

Make application changes in the relevant site directory. Shared brand and locale definitions live in `common/config`. Run `pnpm check` from the repository root after code changes.

## Deployment boundaries

The sites share a repository but can use separate deployment projects. Select the relevant application directory as the project root; installation uses the root workspace and lockfile. The shared `common/` dependency is included in the build.

This starter is ready for source collaboration on GitHub. Domain, DNS, and production deployment connections have not been configured yet.

## Language convention

Keep documentation, comments, and development guidance in English. Dutch and Turkish website translations remain in their locale dictionaries.
