# First prototype

Built from the design handoff on 2026-09-21. The supplied generated mockup was not attached. Faris subsequently provided a specific OHIF study URL and a screen recording, which govern the revised application frame and depth transitions.

The viewport stays fixed on desktop. A continuous exploration position drives the image, active thumbnail, position marker, section, and research entry. The first view opens at slice 13, with earlier slices reachable by scrolling backward. The source sequence progresses from skull base to crown with no cropping, mirroring, morphing, or scale changes between images.

The section boundaries are presentation choices: research occupies slices 1–21, publications 22–26, community service 27–31, and About 32–34. No anatomical relationship is implied. Research is divided into Vanderbilt, Stanford, and Emory states. Reference imagery is credited separately from Zain's portfolio.

Reading panels use a native modal dialog. The underlying scan state is held until close, panel scrolling remains independent, Escape closes the panel, and focus returns to the opener. Research publication links target the same complete bibliography records.

Mobile keeps the viewer fixed and preserves all content through direct controls and reading panels. Section links, thumbnails, previous/next buttons, and horizontal or vertical swipes on the image provide explicit scan navigation. Only text moves in depth. A single text layer fades fully out at each boundary before the next fades in, with no vertical translation or overlap. The CT uses genuine frames without image interpolation or automatic playback. Reduced-motion mode removes text transforms and fades. A complete no-JavaScript reading page is available at `content.html`.

The CV action opens a printable web CV, using the same content records as the rest of the site. The original Word file and its private contact fields remain outside `dist/`. Contact uses the email in the supplied CV pending confirmation of preferred public links.

Validation for the revised viewer: five automated navigation tests pass, including exact zero opacity at each scene boundary, reverse travel, readable anchors, reduced motion, and bounds. Live desktop and 390px mobile checks verified section navigation, the study drawer, reader scrolling while the scan stays frozen, focus restoration, 15 bibliography entries, nine service roles, and complete CV content. The content has one DOM layer: sampled opacity was 0.5 before a boundary, 0 at the content swap, then 0.5 after it. All 34 local PNGs match their original Wikimedia SHA-1 checksums.

The browser regression script was updated for the revised controls. The previous layout passed that suite; the revised layout was checked through the live browser session and navigation unit tests.
