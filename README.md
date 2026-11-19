# Joseph Ikem — Portfolio

A complete Next.js App Router portfolio based on the latest supplied Stitch direction: ivory, cobalt, Newsreader editorial headings, Inter body text and JetBrains Mono labels. Includes TypeScript, Tailwind CSS v4, locally bundled fonts, and an optional Three.js hero.

## Run locally

Use Node.js 22 LTS or newer, then:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No environment variables, database, authentication or API keys are required.

```sh
npm run build
npm start
```

The production build exports a static site to `out/`. `npm start` serves that export on port 3000. Rebuild after source edits. Netlify configuration is included; it uses `npm run build` and publishes `out`. You can also use any static host that serves directory index files. Do not add an SPA catch-all redirect: each project has its own HTML page and there is a 404 page.

## Pages and editing

- `/`: intro, featured applications, client websites, engineering approach, experience, education and contact.
- `/projects/co-invest/`: platform overview, contribution, architecture and implementation decisions.
- `/projects/eventful/`: organiser/attendee workflows, payment journey and reminder processing.
- `/projects/onyemmemme/`: business showcase, CMS and inquiry journey.
- `/projects/emjay/`: client portfolio overview.
- `/Joseph_Ikem_Resume.pdf`: the supplied résumé, unchanged.

Edit project content, social URLs, email and experience in `lib/content.ts`. Homepage copy is in `app/page.tsx`. Shared design styles and breakpoints are in `app/globals.css`. `components/project-art.tsx` contains the illustrations. `components/strata.tsx` contains the Three.js scene and SVG fallback.

The contact section uses `mailto:` and copy-email; it does not pretend to submit a form to a backend. The mobile menu closes after selecting a link and supports Escape. Project cards, live links and résumé links are functional.

## Content and imagery

Project descriptions use the supplied project details and the résumé. Co-Invest is described using the React/Express stack supplied for this portfolio, not the later migration work. There are no invented revenue, scale, uptime or performance metrics, endorsements, or security guarantees. The website artwork is clearly labelled **Illustrated project overview**; it is original HTML/CSS artwork, not a screenshot of the live application. Replace these illustrations with your own production screenshots if you prefer direct visual evidence. No remote image services or image placeholders are required to render the site.

The résumé still lists ISSL as the current role and is included exactly as provided. Review your availability and career details when you publish to your public domain. No analytics or tracking is installed.

## 3D behaviour and accessibility

- Three.js is dynamically imported only when enabled and WebGL2 is available.
- Desktop devices with a fine pointer enable the scene automatically unless reduced motion is preferred.
- Small screens and reduced-motion users see the SVG illustration first; they may choose “Explore in 3D”. The explicit opt-in starts paused.
- Pause/Play and Explode/Assemble controls are keyboard accessible.
- The scene caps pixel density and frame rate and skips rendering when offscreen or the tab is hidden.
- WebGL failure leaves a complete SVG fallback. The scene is decorative; the textual layer labels remain accessible.
- The website includes a skip link, visible keyboard focus, semantic landmarks, and reduced-motion styling.

## Verification

- Production static build and TypeScript checks passed.
- Browser review completed at desktop width and within 390px and 768px iframe viewports.
- Checked mobile menu open/close, contact anchor navigation, email-copy confirmation, and home-to-case-study navigation.
- Static output checked for local link targets and the original résumé file.
- The QA browser disables WebGL. Its fallback path was verified; the animated scene and its controls still need a visual check on a WebGL-enabled device.
- External project sites and social services are linked as supplied; their availability is outside this portfolio's control.

## Files not required for your own hosting

`.openai/hosting.json` identifies the private review deployment. It is not needed for Netlify and is omitted from the downloadable source package. The preview-compatible dev wrapper normalises `--host` to Next.js `--hostname` and ignores `--strictPort`; ordinary `npm run dev` works as usual.

Fonts are locally distributed through their Fontsource packages under their included open-source licences. Dependency versions are recorded in `package-lock.json`.
