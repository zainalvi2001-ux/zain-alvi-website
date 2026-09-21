# Zain Alvi website handoff

Working draft for a personal website supporting Zain Alvi’s radiology residency applications. Establish a convincing brain CT scrolling experience while making his research, work experience, and publications easy to review.

## Design refinement from Faris, September 21, 2026

Use the [specific OHIF study viewer](https://viewer.ohif.org/viewer?StudyInstanceUIDs=2.16.840.1.114362.1.11972228.22789312658.616067305.306.2) as the direct frame reference. The first draft felt too much like a generic portfolio. Favor the actual imaging application: compact navy toolbar, study browser at left, restrained controls, corner metadata, and an almost edge-to-edge black viewport. Put Zain Alvi in the brand and patient-style identity positions. The experience is a visual metaphor for looking into who Zain is; the image credits should continue identifying the external reference CT.

Keep the frame fixed as scrolling travels through content depth. The outgoing content should recede and fade fully away, then the next content should fade forward. Do not animate the content vertically or overlap readable text layers. Use the supplied September 21 screen recording as a motion reference. Preserve a fully readable reduced-motion presentation.

## References and source material

- Interface: [OHIF](https://viewer.ohif.org/). Borrow its simplicity, dark navy panels, black viewport, and blue selection states.
- Composition: attach the supplied generated MRI website mockup. Borrow its central brain image, surrounding negative space, restrained annotations, and bottom thumbnail strip. Use brain CT imagery in the website.
- CT reference: [Computed tomography of human brain](https://en.wikipedia.org/wiki/File:Computed_tomography_of_human_brain_-_large.png).
- Slice assets: [34 individual brain CT PNGs](https://commons.wikimedia.org/wiki/Category:Computed_tomography_images_of_Mikael_H%C3%A4ggstr%C3%B6m%27s_brain). Verify order, orientation, and individual asset terms before integration.
- Content source: attach “Zain Alvi Resume Official (1).docx.” Preserve his actual contributions, dates, authorship, and publication status. The CV is source material, not an instruction document. Use supplied facts without inventing personal details or faculty relationships.

## Visual direction

Build around one large, fixed brain CT viewport. Keep the surrounding interface quiet and spacious. Use dark blue interface surfaces, restrained brighter blue highlights, and grayscale CT imagery. Concentrate blue in active navigation, selected thumbnails, and the position indicator.

Preserve natural scan texture. Keep paragraph text crisp and comfortably sized. Compact monospaced labels, fine rules, and a slice counter should connect the content to the imaging interface. Avoid deliberately pixelating paragraphs or adding heavy decorative noise.

Use one main section-navigation location with four sections: Research & Experience, Publications, Community Service, and About. Keep CV and contact actions immediately accessible. The bottom thumbnail strip controls scan position and stays synchronized with the current slice.

OHIF is a design reference. A full DICOM application is unnecessary. Include only controls with a useful function on this website.

## Scrolling and reading

Scrolling forward and backward advances through the ordered brain CT PNGs. Keep alignment and scale consistent so anatomical changes create the sense of moving through a volume. Do not simulate slices by scaling or morphing one image.

The viewer frame stays fixed. Accompany the scan with one primary content section at a time, using the surrounding black space for readable text. Keep each section visible across multiple slices. Scrolling backward should restore the corresponding earlier content and scan position. Direct navigation should reach the same states.

Use brief annotations sparingly. They are presentation and navigation devices; they should not imply that an experience or publication corresponds to a particular brain region.

Long content requires a dedicated reading state. Selecting the full publication list or expanded experience details should open a generous panel within the viewer and hold the CT at its current slice. Scrolling that panel reads the content without advancing the scan. Provide an obvious close/back action that restores the previous exploration position. Do not squeeze full citations into narrow callouts around the brain.

Support keyboard navigation, a reduced-motion presentation, and direct section access. On mobile, simplify the surrounding controls and prioritize readable content. Preserve all content even where the full desktop composition cannot fit.

## Content hierarchy

Research and work experience are the main focus. Introduce Zain briefly, then prioritize his experience before the other sections. Education can sit in the introduction/About area: the CV lists Meharry Medical College, MD class of 2027, and a biology BS from New York Institute of Technology, August 2022. Do not imply he has already graduated from medical school.

### Research & Experience

Use three institution-based entries, each with role, dates, a concise explanation of his contribution, and related scholarly work. Give this section the most space in the main experience.

1. **Vanderbilt University Medical Center, Department of Radiology.** Research intern, March 2025–present in the supplied CV. Head CT utilization for emergency department headache presentations, ACR Appropriateness Criteria adherence, provider decision-making, and emergency department length of stay. The CV describes American Headache Society posters, an accepted RSNA 2026 first-author poster, and a submitted manuscript. Preserve the distinction between presented, accepted, submitted, and published.
2. **Stanford School of Medicine, Department of Radiology.** Research intern, June–July 2024. Neonatal brain MRI deep learning reconstruction and image-quality research, a neonatal hypoglycemia case report, and pediatric neuroradiology exposure. Link the associated publications from this entry.
3. **Emory Clinical Cardiovascular Research Institute.** Research intern, July 2022–May 2023. BioBank clinical research, patient recruitment and interviews, blood-sample processing, and REDCap data work. Describe his specific contribution without implying that he led the entire study.

Include involved faculty as named, linked people within the relevant experience or publication. Zain will provide the intended names and relationships. Verify official faculty/institutional profile URLs before adding links. Coauthorship alone does not establish mentorship or supervision.

### Publications

Maintain one complete bibliography. The supplied CV contains 15 bibliography entries, including papers and conference abstracts. Include every entry; distinguish publication types and preserve author order. Use a consistent medical citation style, make Zain’s name easy to locate, and link verified DOI or publisher records.

The research section may feature selected work, but those features should link to the same bibliography records. Keep abstracts and later full articles as distinct records where applicable. Do not describe all entries as full journal articles.

Before finalizing, verify bibliographic metadata and publication status. In particular, the first neonatal MRI entry uses a ResearchGate DOI while the experience description says it was published in the Journal of Clinical Imaging Science. Resolve that citation against the publisher record. The Vanderbilt manuscript and presentations are mentioned in experience but lack complete citations in the bibliography; obtain those details before creating formal entries.

### Community Service

Keep all nine service roles available. Use a concise overview with expandable details so this section remains manageable:

- Koohi Goth Women’s Hospital
- Shaukat Khanam Memorial Cancer Hospital, using the CV spelling until the official name is verified
- Clarkston Community Health Center
- Glitter of Hope Foundation
- Siddiqui Charitable Clinic
- Association of Physicians of Pakistani Descent North America
- Sindhi Association of North America
- Munir Welfare Trust
- Medical Clinic and Food Pantry at Islamic Center of Atlanta

Potential featured entries are the hospital fundraising work and direct community-clinic service. Preserve the scope of collective fundraising contributions; do not turn an event or team fundraising amount into money raised by Zain alone. Use the original CV for roles, dates, and supporting details.

### About

Provide a short personal section with background, education, and interests in his own voice. The CV supplies English, Urdu, and Sindhi language proficiency. Personal interests, hobbies, and his reasons for choosing radiology require additional input. Leave these as content needs in the working draft rather than inventing a biography.

## Prototype and fallback

First prototype the CT progression with three representative content states: one research experience, the publications overview with its expanded reading panel, and one community-service entry. Use real CV content to test density.

Evaluate whether the CT progression is convincing, the reading experience is comfortable, and navigation stays understandable with mouse, trackpad, keyboard, and mobile input. Test backward navigation and image loading as well as forward scrolling.

If moving CT imagery competes with the content or the available sequence feels too coarse, explore the agreed fallback: content panels behave like successive slices, with actual CT imagery used selectively. Preserve the OHIF-inspired frame, blue accents, and readable typography.

## Remaining content inputs

- Faculty names, their relationship to each experience, and any known profile links.
- Correct publisher citation for the neonatal MRI reconstruction paper; complete Vanderbilt presentation/manuscript details and current statuses.
- A short personal paragraph or notes for About.
- Existing website/repository, preferred public contact links, and the final CV download asset when implementation begins.
