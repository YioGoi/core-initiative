# Tool

An independent software and systems studio within Core Initiative. This prototype explores a tactile instrument identity, phase alignment and layered software architecture. Source is ready for frontend handoff; hosting and contact delivery are separate work. Development, preview builds and loopback origins emit `noindex, nofollow`. Production builds with a public origin enable indexing.

## Run

From the repository root, use Node.js 24 and the pinned pnpm version:

```sh
pnpm install --frozen-lockfile
pnpm dev:tool
```

Open http://localhost:3003/nl. English and Turkish are available at `/en` and `/tr`; `/` redirects to Dutch.

## Direction

- Graphite/aubergine, mineral white, smoky lilac and a restrained sulphur accent. Tool owns its tokens and components; the other brands do not inherit its styling.
- Buttons are text-only, with smaller IBM Plex Mono labels and modest tracking. They have no icon or internal divider; the existing corner radius is retained.
- Space Grotesk, IBM Plex Sans and IBM Plex Mono are self-hosted through `next/font/local`. Fonts and OFL licenses are in `src/app/fonts/`, downloaded from the official Google Fonts repository.
- The phase instrument, mark, workflow, architecture layers and abstract portfolio illustration are original SVG, HTML and CSS. The portfolio illustration is decorative, not a Mind Palace screenshot. No external image or animation service is required.
- Dutch, English and Turkish copy lives in `src/lib/content.ts`. The workshop workflow is explicitly a concept, not a customer project or a functioning app. Mind Palace links to its actual portfolio entry with attribution to Yiğit Doğan.

## Motion

The hero instrument aligns its rings with scroll. The first sticky study gathers separate modules into an enquiry-to-delivery workflow. The second opens and closes the interface, logic and connection layers with CSS perspective. Footer rings converge into one mark without an elastic reveal or extra scroll interception.

Motion enhancement uses native vertical scrolling, no reduced-motion preference and a root text size of at most 20 pixels. Desktop requires at least 700 CSS pixels in height. At widths of 900 CSS pixels or less, mobile motion starts at 600 CSS pixels in height and uses a vertical assembling workflow, shorter sticky scenes and a shallower architecture deck. Other layouts show complete, static compositions. Animation frames stop when settled or the document is hidden; listeners and the resize observer are removed on unmount. No audio, WebGL or animation library is used.

## Contact and scope

By default, the form validates and previews a message locally and offers copying. It does not send, persist or log submissions. An optional `NEXT_PUBLIC_CONTACT_EMAIL` opens an email draft in the visitor’s own app; it does not deliver mail. No Tool mailbox is assumed to exist. Actual delivery remains a future shared ASP.NET Core integration.

Localized titles and descriptions, reciprocal language alternates, a self-canonical per locale, localized 1200 × 630 social cards, Open Graph/Twitter metadata, WebSite/WebPage JSON-LD, robots and a sitemap are included. The site origin accepts HTTP(S) origins only. No business address, client results or customer ratings are fabricated.

The [frontend review](REVIEW.md) records checks and their limits. Production hosting, DNS, real-device browser coverage and field performance remain launch work. Reduced motion and enlarged text keep complete document-flow alternatives; enlarged text also switches complex grids and interface studies into reflow layouts.

## Validation

Run `pnpm check` from the root after application or shared-configuration changes. Publish source through a task branch and PR according to [CONTRIBUTING.md](../CONTRIBUTING.md). A source push does not deploy the website or connect the contact service.
