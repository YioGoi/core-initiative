# Quick onboarding

Read the root [README](../README.md), then run:

```sh
nvm use
pnpm install --frozen-lockfile
pnpm dev:construct
```

Open http://localhost:3001/nl. English and Turkish are available at `/en` and `/tr`. The frontend runs without .NET, a database or external service accounts.

For Cookie's independent design studio concept, run `pnpm dev:cookie` and open http://localhost:3002/nl. See the [Cookie guide](../cookie-site/README.md) for its two motion scenes, locale copy, assets and local contact preview.

Before starting a task, read the [contribution workflow](../CONTRIBUTING.md). Work on a task branch and open a PR to `main`; a different human collaborator must approve it before merge.

## First tour

1. Read the first screen and service sections to see Construct's offering.
2. Scroll through the layered atelier and the instrument commerce scene, where a listening chamber expands and collapses before the square joins the seven-circle Core family.
3. Open the family descriptions and portfolio links. The ceramics and instrument examples are labelled fictional concepts, not customer case studies.
4. At the bottom, keep scrolling down to reveal the moving particle field. Release to let the footer spring back. Upward scrolling stays native. Touch and keyboard gestures are supported; reduced-motion preferences disable the effect.
5. Try the contact form. Without configuration it previews and copies a message. With an address configured it opens an email draft. Neither mode submits to a server.

## Files to explore

| File | Purpose |
| --- | --- |
| `common/config/index.ts` | Brand names, target origins and supported locales |
| `construct-site/src/app/[locale]/page.tsx` | Server-rendered page, metadata, links and form integration |
| `construct-site/src/lib/content.ts` | Typed Dutch, English and Turkish website copy |
| `construct-site/src/app/globals.css` | Construct's local visual tokens and responsive styling |
| `construct-site/src/components/scroll-experience.tsx` | Scroll scene enhancement and lifecycle cleanup |
| `construct-site/src/components/motion-scenes.tsx` | Server-rendered scene markup |
| `construct-site/src/components/elastic-footer.tsx` | Footer spring, input handling and particle canvas |
| `construct-site/src/components/contact-form.tsx` | Contact fields and current email-draft/preview behavior |
| `construct-site/src/app/sitemap.ts` | Localized discovery URLs |
| `construct-site/src/app/robots.ts` | Crawler rules and sitemap location |
| `construct-site/.env.example` | Optional public origin and recipient configuration |
| `core-initiative-site/src/app/[locale]/page.tsx` | Umbrella site's starter page |

## Local contact configuration

Copy `construct-site/.env.example` to `construct-site/.env.local` if needed. `NEXT_PUBLIC_CONTACT_EMAIL` is a public recipient address, not a credential. Leave it blank to use preview/copy mode. Restart the dev server after changing environment variables; production builds embed public values at build time.

Never put email provider credentials into a `NEXT_PUBLIC_` variable. Keep `.env.local` out of commits.

## First backend integration

The next piece is a small shared ASP.NET Core contact API. The backend project and endpoint do not exist yet. Keep the initial scope to receiving validated enquiries and handing their notifications to a selected email provider.

A candidate contract is `POST /api/contact` with brand, locale, name, email, optional business, message and source path. Final routes, limits, response semantics and hosting should be agreed before wiring the form. The current component is the frontend integration point; its draft/preview action can be replaced with an API request and explicit pending, success and failure states.

All brand forms should eventually route to a configured shared inbox. Persisted enquiries and a dashboard can follow when needed; they are not prerequisites for this first delivery flow.

See [architecture](architecture.md) for the boundaries. Shared unstyled form elements are planned under `common/component/`, but extraction has been deferred.

## Validation and deployment

Run `pnpm check` from the repository root after application or shared-config changes. Use each application's directory as the deployment project root while retaining the workspace lockfile and shared dependency. Source collaboration is ready; production hosting, email delivery and DNS still need configuration.

Keep repository documentation, comments and development guidance in English. Keep translated website content in its locale dictionary.
