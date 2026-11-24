# Cookie frontend review

Reviewed on 24 November 2026. The frontend is ready for source handoff; production hosting, domain routing and server-side contact delivery are separate work.

## Changes made

- Corrected keyboard focus contrast on the cream contact button against its dark section.
- Converted pixel-based text sizes to relative units and added enlarged-text reflow, including single-column layouts and safe word wrapping.
- Preserved readable foreground/background pairs through the ink transition using aligned, clipped visual layers. Duplicates are hidden from assistive technology; the semantic text and heading IDs remain unique.
- Protected the contact preview before hydration, prevented native GET submission of personal details, associated its behavior note, rejected whitespace-only values and focused the named preview region after validation.
- Added localized social cards, Open Graph alternate locales, Twitter cards and a stable WebSite/WebPage JSON-LD graph. Heading line breaks retain spaces in plain text.
- Hardened fragment decoding and completed motion cleanup. Native scrolling, reduced-motion guards, short-viewport and large-text static alternatives remain in place.

## Verification

| Area | Result |
| --- | --- |
| Workspace | `pnpm check` and `git diff --check` pass |
| Accessibility automation | axe-core 4.14.1: zero violations, 48 passed rules on each standard NL, EN and TR page; WCAG 2 A/AA, 2.1 AA, 2.2 AA and best-practice tags |
| Enlarged text | 320px viewport, 200% base font: no horizontal overflow, readable document flow, motion disabled; main paragraph text verified at 28px instead of 14px |
| Keyboard | Skip link focuses main; language disclosure opens, Escape closes and restores focus; locale navigation works |
| Contact | Whitespace-only name/message rejected and focused; corrected input opens a local preview; preview receives focus; no message was sent |
| Focus | Cream button has a light visible outline against the dark contact background |
| HTML | Three locales return 200, one h1 each, unique IDs, valid fragment targets, all images have alt attributes |
| Discovery | Self canonicals; reciprocal nl/en/tr/x-default alternates; sitemap/robots return 200; root redirects 308 to Dutch; unsupported locale returns 404 |
| Structured data | WebSite and WebPage graph parses correctly; stable site IDs and actual Core relationship; no invented customer reviews, addresses or team size |
| Social cards | All three endpoints return 1200 × 630 PNGs, about 58–61 KB; Dutch and Turkish images visually inspected |
| Indexing | Development, preview and localhost configuration produce noindex; production with public origin produces index/follow; invalid origin paths rejected |
| Images | Production optimizer returned a 640 × 427 WebP of 19,648 bytes for the concept photograph |

The automated scan does not establish full WCAG conformance. Layered photography, clipping and transforms leave contrast items requiring visual review. Transient fading text inside the decorative, non-interactive Petal interface can produce contrast flags at intermediate frames; it is incidental concept artwork, not service copy or an interactive control. The service headings and descriptions retain their accessible semantic copy and contrasting surfaces. Reduced-motion handling was reviewed in source; the same static path was exercised through narrow/short-view and enlarged-text guards. A dedicated screen-reader pass, cross-browser device matrix and field Core Web Vitals remain future verification.

## Footer and language follow-up

- The English attribution in the hero eyebrow has `lang="en"`, so Turkish uppercase rules keep `BY CORE INITIATIVE` in its correct ASCII spelling. Verified in the rendered Turkish page.
- A decorative flower breeze sits between contact and the footer wordmark. Hundreds of tiny flowers drift over a restrained, low-contrast atmospheric background. On bottom arrival a short hold is followed by flattening the footer-facing curved edge and a damped-spring collapse of the complete field. No wheel, touch or keyboard input is intercepted.
- Verified automatic closure on arrival, no repeat while staying at the bottom, rearming after scrolling away, and a zero-height field after closure with the footer bottom remaining at the native viewport edge. Native upward scrolling cancels the bottom lock. The 390px mobile view has no horizontal overflow; footer links remain available.
- The flower canvas is hidden from assistive technology. Its bounded loop stops when closed, offscreen or hidden. Reduced motion and enlarged base text use three static SVG flowers.
- `pnpm check` and `git diff --check` pass after this follow-up.

## Launch boundaries

- The form currently previews/copies a message, or opens a draft only when a real recipient is configured. It has no API, persistence or email delivery confirmation. Do not present it as a working submission service.
- A Cookie inbox or forwarding alias is not assumed. The shared ASP.NET Core integration remains planned.
- Core family links use the intended production origins; the family sites are not all deployed. Verify destinations when connecting hosting and DNS.
- Production indexing was verified in a local production server using the public origin configuration, not on a deployed domain. Configure the actual origin and recheck it after deployment.
- No claims are made about search rankings, live delivery or production field performance. Petal is explicitly a fictional concept study.

Temporary audit pages and the copied axe script were removed from the application after the review. No audit library was added to application dependencies. Collaboration briefs and their generated PDF/HTML sources were not changed.
