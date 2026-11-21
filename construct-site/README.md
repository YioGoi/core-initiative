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
- At the bottom edge, an extra downward wheel gesture, upward touch drag, or held Down/Page Down/Space key briefly reveals a particle field beneath the footer. Release returns the surface with a damped spring. The effect adds no document height, keeps upward scrolling native, pauses rendering at rest, and cleans up its handlers.
- Reduced-motion users receive static scenes without pinning; the elastic footer effect is disabled. Content remains readable with JavaScript disabled.
- Fonts are self-hosted with `next/font/local`: Barlow Condensed and Manrope. Their OFL licenses are included beside the font files.
- Visual tokens are local to `src/app/globals.css`; other brands do not inherit this design. Shared styled components have not been introduced.
- Canonical URLs, language alternates, Open Graph text, website structured data, robots and the sitemap use the configured site origin.

## Contact

Copy `.env.example` to `.env.local` to configure the optional public address. Without `NEXT_PUBLIC_CONTACT_EMAIL`, the form offers a local preview and copy action. With it, the form opens a prefilled email draft. It never claims delivery, sends mail automatically, or persists personal information.

This is a first frontend version. Direct form-to-inbox delivery through a shared ASP.NET Core API, an email provider and spam protection remain to be connected before a production contact launch. Other brands can use the same inbox when their forms are implemented.

## Images and examples

The ceramics concept is fictional and clearly labelled, including its generated imagery. It is not a client case study. Mind Palace and AI Team link to Yiğit Doğan's actual portfolio entries, with explicit attribution.

Image: `public/images/atelier-still-life.png`. Created with the built-in image generation tool. Prompt: editorial landscape still life for a fictional ceramics atelier; three hand-thrown ceramic vessels (ink-blue vase, pale chalk-blue bowl and off-white cup) on a cool gray stone slab, pale blue-gray architectural wall, soft daylight from upper left, long gentle shadows, tactile matte textures, quiet Dutch contemporary craft atmosphere, objects on the right and negative space on the left; no text, logos, people or watermark.

The surrounding squares, circles and website composition are native HTML, CSS and SVG.
