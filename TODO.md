# SMS Website Audit Remediation

Audited baseline: `686d6ca38a43bcb7aea05050abb6e0829a9b36c0`. The local implementation is in `/tmp/sms-info-github` and visible in Manus Preview. No commit, push, or Vercel production change has been made. Items stay open where their acceptance criteria require a remote CI run, production response, or owner-provided facts.

## CI content rules and service-list alignment — In progress (local checks pass; GitHub Actions pending)

- The `siteContent` editorial regression suite must pass without weakening its stated rules: the content model must not contain `refilling`, `hydrostatic`, `live fire`, `safety engineers`, `stretcher`, or `eyewash` claims.
- User-facing page and event-builder copy must not reintroduce the unsupported `live fire` or `safety engineers` claims outside the centralized content model.
- The contact form service list must equal the canonical consolidated service titles plus `General Facility Consultation`; align the label to the canonical title instead of relaxing the assertion.
- `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build` must all complete successfully, and the GitHub CI verify job must reach its build step and pass.

Local evidence: 21 tests pass; typecheck, lint, and build/prerender pass. The exported content model passes its editorial regression suite, and a targeted visible page/component-copy scan found no prohibited wording; the literal names remain only in the internal editorial comment. The GitHub Actions run is pending because changes have not been pushed.

## Contact form success accessibility — Complete locally (mocked interaction verified)

- When an inquiry is successfully received, the confirmation must be announced to assistive technology through one polite live region or `role="status"`.
- When the form is replaced with success content, focus must move to the confirmation heading/container so focus does not remain on a removed submit control.
- Preserve existing honest configuration/error states and avoid duplicate announcements.

Verified in Preview with synthetic test values and a stubbed `fetch`: exactly one mocked call occurred, one `role="status"` appeared, the success text was present, and focus moved to the status container. No inquiry was sent to Web3Forms.

## Poster dialog focus restoration — Complete locally (all dismissal paths exercised)

- On opening a poster dialog, focus moves into the dialog and remains contained while it is open.
- On every close path—including Escape, close button, backdrop, and the quotation action—focus returns to the poster control that opened the dialog when that control still exists.
- Preserve the existing dialog semantics, keyboard controls and scroll-lock cleanup.

Verified in Preview: Escape, backdrop, and close-button dismissal returned focus to the opener; the quotation action closed the dialog and navigated to `/contact/` (the opener is no longer present on that route).

## Crawlable static route content — In progress (build and Preview verified; production checks/metrics pending)

- Each known public route's initial HTML response must contain that route's meaningful page body, including its main heading and usable internal navigation links, before client-side JavaScript executes.
- Preserve route-specific titles, descriptions, canonical URLs and social metadata already present in the HTML templates.
- The browser must hydrate the generated markup without a visible content reset or hydration mismatch and retain existing client-side navigation behavior.
- Existing known routes must continue to resolve directly; unknown paths must continue to produce a genuine 404, not a successful soft-404.
- Review the eager homepage dependency graph for removable code or route-level splitting; record before/after cold-load LCP and main-thread work when a production-like deployment is available.
- Verify raw built and deployed HTML without executing JavaScript for `/`, representative nested routes, and an unknown route.

Local evidence: all nine route templates were prerendered with distinct meaningful headings, route metadata, and internal links; generated markup has no inline scripts or unresolved source asset paths. The production build served through Preview returned page HTML for home/nested routes, HTTP 404 for an unknown route, loaded hashed images/font, and showed no browser-console hydration/runtime errors. Production HTML and cold-load performance measurement remain pending.

## Fingerprinted asset caching — In progress (configuration updated; production headers pending)

- Content-hashed files under `/assets/*` must receive a long-lived immutable cache policy because their URLs change with content.
- HTML documents must remain revalidated so releases can point visitors to new hashed assets.
- Keep the existing security headers intact and verify the actual production response headers for HTML, JS, CSS and an image after deployment.

Local evidence: Vercel and static-host header configuration now gives fingerprinted `/assets/*` files `public, max-age=31536000, immutable`; the prior security-header rules are preserved. Actual production response headers are not yet verified.

## Header logo optimization — Complete locally (both variants loaded)

- The header mark must remain visually crisp and recognizable at its existing rendered sizes and color variants.
- Reduce the audited `public/logo-white-badge.svg` size of 185,593 bytes substantially by removing unnecessary vector complexity or embedded data; preserve vector delivery where feasible.
- Check that both light and dark logo variants still load and render after optimization.

Local evidence: the optimized SVG is 83,851 bytes (54.8% smaller), remains vector, and the Preview header renders it. Both `/logo-white-badge.svg` and the `/logo.png` light/fallback variant returned HTTP 200 and loaded in-browser at their native dimensions.

## Font delivery optimization — In progress (licensed local font verified; performance comparison pending)

- Remove the normal render-blocking Google Fonts stylesheet request from route HTML.
- Prefer a self-hosted, properly licensed, optimized Plus Jakarta Sans WOFF2 subset for the weights actually used; if licensing/subsetting cannot be verified, use a safe non-blocking load strategy instead.
- Keep `font-display: swap`, a resilient system fallback, and acceptable text rendering while the font is unavailable.
- Measure the cold-load dependency/transfer effect against the audited baseline when a production-like measurement is available.

Local evidence: route HTML no longer references Google Fonts; the self-hosted Latin variable WOFF2 is 27,348 bytes, uses weights 400–800 with `font-display: swap`, includes the SIL Open Font License at `public/fonts/Plus-Jakarta-Sans-OFL.txt`, and is preloaded through its content-hashed build URL. Preview delivered the font successfully. Comparative production performance measurement remains pending.

## Privacy retention and deletion disclosure — Blocked on owner/provider facts

- The published privacy notice must state an accurate retention duration or criteria for inquiry data.
- It must accurately explain how access/deletion requests are handled for both SMS-held inquiry records and any Web3Forms-held copy.
- Confirm the statements against actual provider settings and the business workflow; do not promise deletion beyond what can be performed.
- No retention period or deletion capability may be invented. Await owner-approved facts before changing the policy.

## Privacy policy and terms approval — Blocked on owner-approved legal copy

- Before publication, the business owner/legal reviewer must approve the privacy policy and terms content as applicable to the actual services and operations.
- Once approved, remove the public `Draft` labels from the visible page content and route-specific metadata together; if either document is not ready, keep it explicitly identified as unfinished and do not present it as an approved legal document.
- Do not invent liability, payment, cancellation, retention, jurisdiction or regulatory-compliance terms.
