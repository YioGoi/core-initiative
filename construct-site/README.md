# Construct

A multilingual Next.js web studio site for independent brands and boutique businesses. Dutch is the default; English and Turkish have equivalent routes. All website copy lives in `src/lib/content.ts`.

Run from the repository root:

```sh
pnpm dev:construct
pnpm check
```

Open http://localhost:3001/nl. The root route redirects to Dutch.

## Implementation

- The page and scene markup are server-rendered. The scroll controller enhances that markup with native scrolling, sticky scenes and transforms. It cleans up its listeners and animation frames on unmount.
- Reaching the bottom automatically reveals the particle field beneath the footer once for 1.1 seconds, then returns the surface with a damped spring. It rearms after scrolling at least 100 pixels away from the bottom, so a stationary footer does not repeat the reveal. Additional downward wheel gestures, upward touch drags and held Down/Page Down/Space keys retain the manual elastic interaction. Upward scrolling cancels the automatic reveal immediately. The effect adds no document height, keeps upward scrolling native, pauses rendering at rest, and cleans up its handlers.
- Reduced-motion users, viewports shorter than 600 CSS pixels and root text sizes above 20 pixels receive static scenes without pinning. The elastic footer effect is disabled for reduced-motion preferences. Content remains readable with JavaScript disabled.
- The header language selector shows the current language name and opens native-language links in a brand-local disclosure. Enter/Space toggle it, Tab reaches the links, Escape restores trigger focus, and outside interaction or leaving the selector closes it. Native disclosure/link behavior works without JavaScript; reduced motion removes the opening animation. Supported options come from shared locale configuration.
- Fonts are self-hosted with `next/font/local`: Barlow Condensed and Manrope. Their OFL licenses are included beside the font files.
- Visual tokens are local to `src/app/globals.css`; other brands do not inherit this design. Shared styled components have not been introduced.
- Canonical URLs, language alternates, localized Open Graph/Twitter sharing cards, WebSite/WebPage structured data, robots and the sitemap use the configured site origin.

## Contact

Copy `.env.example` to `.env.local` to configure the optional public address. Without `NEXT_PUBLIC_CONTACT_EMAIL`, the form offers a local preview and copy action. With it, the form opens a prefilled email draft. It never claims delivery, sends mail automatically, or persists personal information.

This is a first frontend version. Direct form-to-inbox delivery through a shared ASP.NET Core API, an email provider and spam protection remain to be connected before a production contact launch. Other brands can use the same inbox when their forms are implemented.

## Images and examples

The ceramics and electronic-instrument concepts are fictional and clearly labelled, including their generated imagery. They are not client case studies. Mind Palace and AI Team link to Yiğit Doğan's actual portfolio entries, with explicit attribution.

Image: `public/images/atelier-still-life.png`. Created with the built-in image generation tool. Prompt: editorial landscape still life for a fictional ceramics atelier; three hand-thrown ceramic vessels (ink-blue vase, pale chalk-blue bowl and off-white cup) on a cool gray stone slab, pale blue-gray architectural wall, soft daylight from upper left, long gentle shadows, tactile matte textures, quiet Dutch contemporary craft atmosphere, objects on the right and negative space on the left; no text, logos, people or watermark.

The surrounding squares, circles and website composition are native HTML, CSS and SVG.


### Layered scroll study

The first square scene opens into four independently transformed planes: a fictional workshop photograph, a native material/layout study, a native store preview, and a transparent ceramic product photograph with a commerce fragment. The blue square remains the framing device and expands into the existing dark section. Perspective changes slowly through the open scene; native scrolling, the static/reduced-motion fallback and the footer are retained. Repeated/decorative scene imagery is hidden from assistive technology; the concept disclosure is visible and localized in all three dictionaries.

Generated with the built-in image generation tool; original output pixels and transparency are preserved in the repository. Next.js handles responsive image delivery. The interface, palette and square frames are HTML/CSS rather than baked into the images.

- `public/images/atelier-workshop.png`: 1254 × 1254, RGB.
- `public/images/atelier-blue-vase.png`: 1198 × 1313, RGBA with transparent background.

Workshop prompt:

> Use case: photorealistic-natural. Asset type: square background photograph for a layered 3D scroll scene on a boutique web studio website. Primary request: an intimate contemporary ceramics workshop, quiet and tactile. An oak worktable with soft clay residue, a few sculpting tools, folded linen and one unfinished clay bowl in the foreground; wooden shelves with a restrained selection of handmade ceramic vessels in chalk white, muted terracotta and ink blue. No people. Composition: square crop, architectural depth, table enters from lower left, shelves recede to the right, generous soft light through a tall window on the left. Real editorial photography, gentle film grain, honest imperfect materials, warm natural wood and clay balanced with cool blue-gray plaster walls. Soft directional daylight and long gentle shadows. The workshop is fictional, no real brands or signs. No text, watermark, screens or graphic overlays.

Product prompt:

> Use case: product-mockup. Asset type: transparent foreground layer for a fictional ceramics atelier website scroll composition. A single sculptural hand-thrown ceramic vase with a rounded body and narrow neck, matte deep ink-blue glaze, subtle imperfect handmade texture, photographed straight-on at a very slightly elevated angle, soft directional daylight from upper left, delicate highlight on the rim, entire object visible and centered with comfortable transparent margin. Genuine transparent background. No plinth, surface, table or opaque background, no cast shadow outside the object, no text, logo, watermark, extra objects or hands. Photorealistic premium editorial product photography. The vase will be composited in front of a blue-gray and warm-clay workshop scene.


### Instrument and spatial commerce study

The second scene (`#sound-space`) presents a fictional touch synthesizer separately from its photographic listening chamber. A compact square aperture expands around the instrument; nested CSS perspective frames move at different depths while the photograph advances more slowly. A native HTML commerce fragment enters in the foreground. The room and product then gather at the same center, shrink and disappear before the square joins the existing Core Initiative Seed of Life. The scene uses native scrolling with an idle-free requestAnimationFrame controller; it does not require WebGL, audio or an animation dependency.

A separate static layout shows the instrument concept and Core introduction sequentially when JavaScript is unavailable or reduced motion is requested. The instrument has a localized descriptive alternative; its storefront fragment and atmospheric background are decorative. The example is not an operational store. The concept disclosure and all visible copy are localized in Dutch, English and Turkish. Fragment navigation is realigned once after enhancement so direct scene links use the final sticky-scene heights.

Both assets were generated with the built-in image generation tool. The cutout was refined using that tool; no raster editing was performed in code. Original alpha is retained, and Next.js provides responsive image delivery.

- `public/images/touch-synth-cutout.png`: final fictional instrument cutout, generated from the product prompt and then the refinement prompt below.
- `public/images/synth-chamber.png`: cinematic architectural listening chamber.

Instrument prompt:

> Use case: product-mockup. Asset type: transparent foreground photograph for an interactive boutique electronic-instrument e-commerce concept. Primary request: a striking fictional sculptural desktop touch synthesizer, a beautifully engineered physical musical instrument, no conventional piano keyboard. A low, broad rectangular midnight petrol-blue anodized aluminium body with rounded bevels and dark walnut side cheeks; twelve large ivory circular tactile pads in a precise grid, a long smoked-glass ribbon touch strip, five small brushed-silver knobs and one oversized burnt-orange rotary dial. A single burnt-orange patch cable makes a graceful loose loop from the side and stays within the image. Slightly worn real materials, not a toy. View: elevated three-quarter view, looking down at the controls, front edge angled gently toward the viewer, entire instrument and cable visible, generous transparent margins. Premium editorial product photography, soft cool key light from upper left and a restrained warm rim, realistic mechanical details and contact shading within the object. Isolated on genuine transparent background, floating without a floor, plinth or external cast shadow. No people, hands, text, logos, watermark, real manufacturer designs, interface overlays or extra devices.

Cutout refinement prompt:

> Use case: background-extraction. Edit this exact fictional synth product photograph into a clean, fully isolated product cutout. Preserve the instrument's design, materials, colors, twelve circular ivory pads, silver knobs, orange dial, walnut cheeks, camera angle and lighting. Remove every trace of the background and colored background glow to genuine alpha transparency. Reframe the entire instrument and its single orange cable loop at about 80% of the canvas width with at least 8% clear transparent margin on every side; keep the complete cable loop visible inside the canvas. No floor, drop shadow outside the object, text or new objects. Crisp natural product edges. Transparent PNG.

Chamber prompt:

> Use case: stylized-concept. Asset type: cinematic landscape background for a boutique electronic musical instrument website, an immersive scroll-driven depth scene. A quiet monumental abstract listening space, like the interior of a sculptural sound chamber, no instruments or people. Deep desaturated midnight blue architectural void; large curved ribbed acoustic walls receding toward a small distant rectangular opening just right of center. Matte graphite material, subtle tactile grain, thin cool soft-blue reflected light along the ribs and one restrained warm amber grazing light low on the right. A soft volumetric blue shaft makes the distance tangible, very subtle atmospheric haze, gentle realistic floor reflections, deep shadows with readable detail. Wide composition, strong architectural perspective, horizon slightly above center, generous quiet dark areas on the left and foreground for typography and a separately composited product. Sophisticated cinematic architectural photography, physical believable light and materials. No stars, planets, people, text, logos, watermark, screens, neon rainbow, portal fantasy or objects on a pedestal.


## Frontend quality and indexing

- Headings retain whitespace across visual line breaks. The skip link targets a focusable main landmark, language links have native-language names, and external portfolio links announce that they open a new tab.
- Informative ceramics and instrument images have localized alternatives. Repeated imagery, geometry, atmospheric backgrounds and the particle canvas remain decorative with empty alternatives or `aria-hidden`.
- `NEXT_PUBLIC_SITE_ORIGIN` accepts an HTTP(S) origin only. Local development, loopback origins and Vercel preview builds emit `noindex, nofollow`; a production build with a public origin enables indexing. Keep crawler access available so crawlers can read the page-level indexing instruction.
- Each locale has a self-canonical URL, reciprocal language alternates and an `x-default` fallback. The sitemap uses the same language map. Sharing cards use the self-hosted static Barlow font without external requests.
- Fictional concepts remain labelled, and portfolio attribution names the maker. No ratings, customer claims or business-address schema are fabricated.

Automated accessibility checks complement keyboard, visual, reflow and motion review; they do not establish full accessibility conformance. Production hosting, Search Console/indexing and real-user performance still require validation on the deployed domain. Contact delivery and backend work are outside this review.

References: [W3C image alternatives](https://www.w3.org/WAI/tutorials/images/decorative/), [Google localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions), [Google noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing).
