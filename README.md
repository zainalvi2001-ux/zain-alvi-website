# Zain Alvi website

Personal website project supporting Zain Alvi's radiology residency applications. The proposed design pairs an interactive brain CT sequence with his research, experience, publications, and community service.

## Status

Repository initialized with the supplied project brief and CV. Website implementation has not started. No application, dependency setup, or deployment is included yet.

## Project material

- [Website handoff](docs/website-handoff.md): primary source of truth for website design, content hierarchy, and interaction requirements.
- [Original CV](source-material/Zain%20Alvi%20Resume%20Official%20%281%29.docx): unmodified content reference for biographical facts, experience, service, and publications.
- [CV text](source-material/cv-extracted.md): searchable extraction for implementation, including all 15 bibliography entries and nine service roles.
- [Content needs](docs/content-needs.md): unresolved inputs and verification work.

The handoff governs visual design, layout, navigation, scrolling behavior, reading states, and how website content is organized. The CV is only a content reference: its formatting, section order, and layout do not govern the website. Follow the handoff for design decisions and preserve factual accuracy when drawing content from the CV. Later explicit user instructions take precedence.

Source material belongs outside any future public asset directory. This repository is private.

## First implementation milestone

Prototype the fixed CT viewer with one research experience, a publications overview with an expanded reading panel, and one community-service entry. Test forward and backward slice navigation, direct section access, keyboard controls, reduced motion, and mobile reading before expanding the remaining content.

CT images and the generated reference mockup are not included. The handoff contains image reference links; image ordering, orientation, and reuse terms still need verification.
