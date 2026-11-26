# Tool frontend review

Reviewed on 26 November 2026. Scope: source handoff of the software studio frontend, plus Cookie’s differentiated actions and mobile motion. No hosting, domain routing, inbox creation or server-side delivery is included.

## Corrections

- Completed localized Open Graph/Twitter metadata, sharing-image alternatives, 1200 × 630 social cards and a stable WebSite/WebPage JSON-LD graph. Reused the actual Core relationship; no invented addresses, ratings, clients or team size.
- Replaced the prototype’s permanent noindex flag with an environment policy: development, preview and loopback origins stay out of indexing; production with a public origin allows indexing. The origin rejects credentials, paths, query strings, fragments and non-HTTP(S) schemes.
- Darkened the service-detail labels and portfolio note to correct contrast failures. Hero copy stays visible throughout its entrance animation rather than fading through low-contrast states.
- Added enlarged-text document-flow layouts for the hero, services, workflow, architecture deck, family links and contact area. Headings and actions wrap safely.
- Paused Tool’s scheduled animation when the document is hidden. Preference/resize/visibility listeners and observers are cleaned up. Native vertical scrolling, mobile-specific scenes and reduced-motion guards are retained.
- Preserved text-only, icon-free Tool buttons and the existing corner radius. Decorative geometry is hidden from assistive technology. Cookie’s actions use larger italic serif labels and a leading flower.

## Verification

| Area | Evidence |
| --- | --- |
| Standard accessibility scans | axe-core 4.14.1, WCAG 2 A/AA, 2.1 AA, 2.2 AA and best-practice tags: no reported violations on NL, EN or TR; Tool passes 46 rules and Cookie 48 per locale |
| Mobile scene checks | Tool architecture at 390 × 844 and Cookie’s card fan reviewed at representative native-scroll positions; no horizontal overflow |
| Enlarged text | 320 CSS pixel iframe viewport, 200% base text: no horizontal overflow or clipped headings, actions, service paragraphs or form labels in all three locales; motion disabled; Tool hero text is 30px and Cookie 28px |
| Keyboard | Tool skip link focuses main; Enter opens the language disclosure; Escape closes it and restores focus to its summary |
| Form | Tool rejects whitespace-only name/message, focuses invalid name, then focuses the named preview after correction; the preview says not sent; the URL contains no personal query data |
| Rendered HTML | Each locale returns 200 with one h1, unique IDs, valid fragment targets, POST-form fallback and alt attributes on raster images |
| Discovery | Self canonicals, reciprocal NL/EN/TR/x-default alternates, correct OG alternate locales, robots/sitemap 200, root redirect 308 to Dutch, unsupported locale 404 |
| Structured data | WebSite/WebPage graphs parse with matching locale, stable site IDs and an actual Core parent link |
| Social cards | All six Tool/Cookie locale endpoints return 1200 × 630 PNGs, about 56–60 KiB; Tool NL/TR inspected visually; Tool image alternatives match each locale |
| Origin configuration | Nine environment/loopback cases pass; five invalid-origin formats are rejected; an actual local production server returns index/follow and working social cards in all three locales |
| Workspace | `pnpm install --frozen-lockfile --offline` and `pnpm check` pass; staged whitespace is checked before commit |

The review uses local browser and HTTP checks. axe leaves contrast items requiring manual assessment on transformed, clipped or layered compositions; zero reported violations is not a declaration of full WCAG conformance. Reduced-motion guards and their change handling were inspected in source; the shared static fallback was exercised through enlarged text. Native OS reduced-motion emulation, a dedicated screen-reader pass, physical-device coverage and field Core Web Vitals remain unverified.

## Launch boundaries

- Contact previews/copies locally; an optional public recipient opens an email draft. No API, persistence or mail delivery is implemented, and a Tool inbox is not assumed to exist.
- Verify public origins, indexing, social previews and family destinations again on the deployed domains. The family sites are not all published. A successful local build does not establish search visibility or ranking.
- Temporary axe fixtures are removed before staging. They are not app dependencies. No collaboration brief source was changed, so its PDF/HTML is unchanged.

References: [Google localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions), [Google noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [W3C reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).
