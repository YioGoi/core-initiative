# Cookie

An independently deployable Next.js design studio frontend. Dutch is the default; English and Turkish live at `/en` and `/tr`. This is a local first concept for discussion, not a deployed studio or a working shop.

## Start and validate

From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm dev:cookie
pnpm check
```

Open http://localhost:3002/nl. No accounts, database or environment variables are required. Cookie consumes the shared brand and locale registry but owns its components, palette, fonts and motion. Construct's implementation is unchanged.

## Art direction and motion

- Warm ivory, cherry red, blush paper and oxblood; DM Sans and italic Fraunces are self-hosted with their OFL licenses under `src/app/fonts/`. Font sizes use relative units; enlarged base text switches to a reflow layout. Static DM Sans Medium and Fraunces Italic font files from Google Fonts are used only by the social-card renderer.
- Primary actions use larger italic Fraunces labels and a small leading flower, without a trailing arrow. Their existing rounded shape is retained.
- Petal is a fictional floral studio used to demonstrate an identity across typography, colour, imagery and a digital interface. It is explicitly labelled as a concept, not a client case study.
- The first scene lifts a stack of design boards into staggered, curved 3D paths before settling into three expressions of one identity. A perspective camera, separated depth planes, a soft ground shadow and independent photograph parallax give the boards a tactile presence. The second expands a coloured surface and brings in a browser composition and component specimen. Its semantic text remains a single accessible copy; visual-only light-text layers are clipped to the ink circle to preserve contrast during the reveal.
- Scroll remains native. Motion enhancement runs at heights of at least 600 CSS pixels, a root font size of at most 20px, and without a reduced-motion preference. Mobile uses shorter sticky scenes, a scaled card fan with shallower depth, and a compact colour-to-interface reveal. Short or enlarged-text layouts show the complete compositions in document flow.
- A frame-rate-independent 75ms follow smooths the first scene after scroll input and stops requesting frames when settled. The second scene follows scroll directly. There is no continuous idle loop, external animation dependency, scroll interception or WebGL. Resize and preference listeners are removed on unmount.
- Cookie’s footer has its own flower breeze before the wordmark. Hundreds of tiny flowers shrink with native scroll over a quiet, low-contrast atmospheric image. On bottom arrival the footer-facing curved edge first flattens, then the field height returns to zero with a damped spring. The native bottom stays in place during closure; scrolling upward cancels that lock. The area rearms after scrolling away and leaves no empty spacer when closed. It does not intercept wheel, touch or keyboard input. The bounded canvas loop runs only while the field is visible and open; reduced motion and enlarged text keep a static ornament.
- Figma Design is mentioned as a working tool. No affiliation, certification or partnership is claimed. The design-board and prototype visuals are original HTML/CSS, not copies of Figma's interface or screenshots from its product.

## Main files

| File | Purpose |
| --- | --- |
| `src/lib/content.ts` | Typed Dutch, English and Turkish copy |
| `src/app/[locale]/page.tsx` | Page narrative, concept markup and localized metadata |
| `src/app/globals.css` | Cookie's tokens, layout and responsive/static alternatives |
| `src/components/scroll-experience.tsx` | The two scroll-driven transitions |
| `src/components/flower-footer.tsx` | Dense flower breeze, quiet atmosphere and curved spring closure |
| `src/components/contact-form.tsx` | Local preview/copy and optional email draft |
| `src/components/language-switcher.tsx` | Native language disclosure with keyboard/outside dismissal |

## Contact and deployment boundaries

With no recipient configured, the form validates fields and displays a local message preview with a copy action. It does not send, persist or log enquiries. Submission stays disabled until hydration; the form uses POST as a fallback, never native GET with personal details in the URL. Trimmed input validation rejects whitespace-only values, and the preview receives keyboard focus. Optionally copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_CONTACT_EMAIL` to a real public recipient to open an email draft instead. Do not assume a Cookie mailbox or forward exists. Actual delivery remains a future shared ASP.NET Core integration.

The public origin defaults to `https://cookie.coreinitiative.nl`; `NEXT_PUBLIC_SITE_ORIGIN` can override it with a valid HTTP(S) origin. Development, localhost and Vercel preview builds emit `noindex, nofollow`. Localized canonicals, reciprocal language alternates, stable WebSite/WebPage structured data, localized 1200 × 630 social cards, robots and sitemap are included. Family links use target production origins from the registry; those sites are not all live. Production hosting, DNS and delivery remain outside this frontend handoff. See the [frontend review](REVIEW.md) for validation and remaining launch work.

## Image provenance

`public/images/petal-still-life.png` is an original AI-generated concept photograph produced with the built-in Imagegen tool. Its source is 1536 × 1024 pixels; Next Image serves responsive derivatives. All typography, logos, boards, component specimens and the interface are native code layered independently. The photograph does not represent commissioned client work.

Final prompt:

> Use case: product-mockup. Asset type: photographic image for Cookie, a boutique brand design studio website, fictional floral studio concept named Petal (do not render text). Primary request: an art-directed tactile editorial still life about a contemporary floral studio identity. Subject: two sculptural dark cherry-red anthurium flowers with slender curved green stems resting diagonally over pale blush wrapping paper, a small unbranded rigid warm-ivory rectangular gift box and deep burgundy satin ribbon on a warm pale pink tabletop. Composition: landscape 3:2, close photographic crop, flowers toward right and center, balanced negative space upper left for native HTML overlay, objects grounded and naturally arranged, refined asymmetry. Lighting: hard warm afternoon side light with long beautiful shadows and delicate paper grain. Palette: oxblood, poppy red, ballet pink, buttery ivory. Materials: glossy real flower petals, slightly wrinkled tissue, heavy uncoated card, satin. High-end independent design studio editorial photography, realistic rather than 3D, subtle film texture. Constraints: no typography, no logos, no watermarks, no vase, no devices, no baked UI, no humans.


### Footer atmosphere

`public/images/cookie-atmosphere.png` is a 1774 × 887 original background edited with the built-in Imagegen tool. The initial cloud scene was intentionally simplified after visual review. Only the selected quiet version is used in the application. It is a decorative image with empty alt text; all flowers are independently drawn native canvas sprites. Next Image serves responsive derivatives.

Initial generation prompt:

> Use case: stylized-concept. Asset type: wide background plate for a boutique design studio website's airy flower-particle space. Primary request: a cinematic, spacious, genuinely deep atmospheric environment in warm blush pink, pale peach, ivory and muted rose. Landscape 2:1 panoramic view into vast luminous clouds and very soft translucent mist layers receding toward a bright distant opening near the upper middle; subtle sweeping wind currents suggested by gauzy cloud shapes, gentle volumetric side light, distant hazy tonal planes, near foreground blush fog along lower edges, convincing perspective and abundant open breathing room at center. Sophisticated editorial photographic matte-painting, quiet and ethereal, extremely fine natural texture, no flat colour field, no hard horizon. This is a background over which hundreds of tiny native vector flowers will be animated, so DO NOT include any flowers, petals, dots, stars, particles, objects, text, logos, grids or UI. No dark outer space, no magenta neon. Rich depth without high contrast, restrained warm palette.

Final edit prompt:

> Edit this background only. Keep the wide 2:1 composition and warm pale blush/ivory family, but reduce visual intensity drastically. Remove the recognizable billowing clouds, bright sun-like opening, light rays, cloud texture and dramatic sweeping forms. Replace them with an extremely quiet matte atmosphere: nearly uniform dusty blush-white with very subtle broad translucent haze planes, faint cool-rose shading at the far edges, almost imperceptible depth and a little luminous air. The entire image should sit within a narrow light tonal range, as a restful website background underneath tiny moving vector flowers; it must not read as a scene or compete with adjacent editorial sections. Soft diffuse ambient light everywhere. No focal point, no horizon, no sun, no literal clouds, no objects, no flowers, no dots, no sparkles, no text, no UI. Restrained, spacious, understated background material, not a dramatic illustration.
