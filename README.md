# Zain Alvi website

An interactive radiology portfolio with a fixed brain CT viewer, research experience, publications, community service, and education.

## Run locally

The website is static HTML, CSS, and JavaScript, with no runtime dependencies or build step. Serve only `dist/`:

```sh
npm start
```

Open `http://127.0.0.1:4173`. Python 3 is required for this development server. Any static host can serve `dist/`.

## Design and content authority

[The website handoff](docs/website-handoff.md) is the primary source of truth for design and behavior. It governs layout, navigation, scrolling, reading states, and content hierarchy. Later explicit user instructions take precedence.

The [original CV](source-material/Zain%20Alvi%20Resume%20Official%20%281%29.docx) and [text extraction](source-material/cv-extracted.md) supply content only. Their formatting and section order do not govern the website. Original source material is outside the served directory.

## Implementation

- A continuous exploration position synchronizes the image, thumbnail, section, counter, and navigation. The opening view uses slice 13; the whole sequence remains accessible in both directions.
- Research has three institution-based states. Publications, community service, and About follow as the sequence advances.
- Native modal reading panels freeze exploration and restore focus on close. All 15 bibliography entries and nine service roles are included.
- Mobile keeps the viewer fixed, with a collapsible study browser, thumbnails, arrow buttons, and swipes on the scan. Text recedes and fades with scroll position, with one text layer at a time and no vertical slide. Reduced-motion mode removes the depth transition.
- View CV opens a printable HTML CV. `dist/content.html` also provides a complete reading view without JavaScript. No original DOCX, address, or phone number is published.
- Bibliography metadata is verified against the 15 DOI records. The neonatal MRI paper uses its final journal DOI and author order. See [verification notes](docs/bibliography-verification.md).

Website content lives in `dist/content.js` and `dist/publications.json`. Run `node scripts/generate-readable-cv.mjs` after changing either to refresh the no-JavaScript CV.

## Checks

```sh
npm ci
npx playwright install chromium
npm run check
npm test
# Keep npm start running in another terminal.
npm run test:browser
```

Set `CHROME_CHANNEL=chrome` to test using installed Chrome. `TEST_URL` overrides the local server URL. Unit tests cover the transition boundaries, fade depth, reverse travel, bounds, and reduced motion. The browser regression script covers scan navigation, section synchronization, modal pause and focus restoration, all bibliography and service entries, deep links, narrow viewports, reduced motion, the no-JavaScript view, and all 34 image responses.

## Remaining content

See [content needs](docs/content-needs.md) for faculty relationships, Vanderbilt citations and status confirmation, personal About copy, the final CV asset, and preferred public contact details. The supplied handoff's generated mockup was not attached. The current frame follows Faris's specific OHIF reference and the supplied recording for content depth transitions.

The repository and the Sites deployment are private. Hosting configuration is in `.openai/hosting.json`; only `dist/` is packaged for publication.
