# SMS Website Audit Fix Plan

## Scope and decisions

Work against the `sms-info` GitHub `main` branch currently audited at `686d6ca38a43bcb7aea05050abb6e0829a9b36c0`. Preserve the current React + Vite multi-page static site, existing Vercel hosting, route URLs, business content that is not implicated by the audit, and the navy/blue/orange visual identity. This is a remediation pass, not a redesign. Keep all changes in the current checkout and visible in Manus Preview while they are being developed; do not push or change Vercel production without a later explicit go-ahead and review.

No legal or operational facts will be invented. The privacy retention/deletion details and approval of the privacy policy and terms require owner-provided, accurate business practices. Those outcomes remain blocked until the owner supplies or approves the relevant copy.

## Existing design retained

- **Design movement:** Keep the site's contemporary industrial-safety editorial character: practical, structured, and regionally grounded rather than corporate-stock or emergency-alarm styling.
- **Core principles:** Prioritize legibility, calm authority, useful local detail, and accessible interactions.
- **Color philosophy:** Deep navy (`#0F2C47`) anchors trust and contrast; clear blue accents communicate wayfinding and information; warm orange (`#F4974C`) marks the primary action without making the site feel alarmist.
- **Layout paradigm:** Preserve the existing spacious, split hero and sequential editorial sections, with responsive cards for services, equipment, and information.
- **Signature elements:** Retain the circular SMS badge/wordmark, compact uppercase section labels with line icons, and restrained rounded navy feature panels.
- **Interaction philosophy:** Keep forms, route changes, dialogs, and CTAs direct and predictable, with visible keyboard focus and honest submission states.
- **Animation:** Keep existing short, nonessential transitions restrained; do not add motion, and respect the site's reduced-motion behavior.
- **Typography system:** Use Plus Jakarta Sans for headings and body text with a robust system sans-serif fallback; retain clear heading/body contrast and readable small labels.
- **Brand essence:** A practical local safety partner for workplaces and facilities; clear, grounded, and dependable.
- **Brand voice:** Plain, practical, and premises-specific. Existing examples: “Practical Safety Solutions for Workplaces & Facilities.” and “Tailored specifically to your premises.”
- **Wordmark & logo:** Preserve the existing circular SMS emblem and stacked “Safety Management Solutions” wordmark rather than redrawing it.
- **Signature brand color:** Deep safety navy `#0F2C47`.

## Implementation approach

1. Restore the content regression tests by removing the prohibited "live fire" wording while preserving the intended description of fire-safety demonstrations, and align the contact form service option with the canonical consolidated service title rather than weakening the alignment test.
2. Improve the two confirmed accessibility flows: announce successful contact-form submission using a single polite status region and move focus to the confirmation; restore focus to the poster trigger whenever the dialog closes, including keyboard and pointer dismissal.
3. Add static prerendering to the existing Vite build. Render each known public route into its existing HTML template before deployment, preserving route-specific title, description, canonical and social metadata. Use synchronous rendering with a server-only adapter that selects the same route components as the browser, so generated content is visible without an inline Suspense script and client hydration matches. Give evacuation planning, equipment, and awareness URLs their existing dedicated page components; code-split route pages in the browser, including the homepage. Preserve existing route navigation and true not-found responses; add no framework/server deployment requirement.
4. Apply a long-lived immutable cache policy only to content-hashed `/assets/*` output; leave HTML revalidated. Keep existing security headers and ensure asset/HTML policies do not conflict.
5. Optimize the existing header mark without changing the brand: remove unnecessary vector complexity/embedded data where possible, retain a crisp mark at current display sizes, and verify that the delivered file is materially smaller than the audited 185,593-byte SVG.
6. Remove the render-blocking Google Fonts stylesheet dependency by self-hosting a properly licensed, optimized Plus Jakarta Sans Latin variable WOFF2 subset for the used weights, including its SIL Open Font License. Preserve an adequate system fallback and `font-display: swap`; compare cold-load dependency/transfer behavior with the audited baseline when a production-like measurement is available.
7. Keep legal pages and data-practice claims unchanged until approved facts are supplied. Then update page copy, titles and metadata together so no page remains falsely labeled as a draft and every stated retention/deletion practice matches the actual Web3Forms and business workflow.

## Dependencies and constraints

- Keep the static Vite multi-entry build and `dist` output; do not introduce a server runtime or change the Vercel project settings.
- Existing dependencies include React 19, React DOM, Vite 8, TypeScript, Vitest and Tailwind Vite. Prefer them over a new rendering framework.
- The built HTML must continue to reference Vite-hashed bundles and correct route-specific metadata. Each known route must render a meaningful H1, body, and links before JavaScript; server and first client route trees must match to avoid hydration mismatch, with no inline scripts added inside the rendered root.
- Vercel production is connected to `sms-info/main`; do not push or change production without a later explicit go-ahead, because a push may trigger production deployment.
- The production contact endpoint must not be submitted during testing; a real submission could deliver personal data or trigger business workflows.
- Legal content must be supplied/approved by the business owner; no retention period, deletion capability, liability term, or legal compliance claim may be guessed.

## Project structure and responsibilities

- `src/App.tsx`: client route selection, page shell and route-aware metadata; accept an explicit initial route and optional server-only page renderer while retaining lazy browser routes and native navigation behavior.
- `src/main.tsx`: browser entry point; hydrate prerendered markup.
- `src/pages/` and `src/components/`: route bodies, form, modal, navigation and shared UI; preserve the existing presentation.
- `src/content/siteContent.ts`: canonical route/business copy and service labels; legal copy changes only with owner approval.
- `src/utils/router.ts`: canonical public paths and metadata; keep route metadata synchronized with prerender output.
- `scripts/prerender.mjs` plus `src/entry-server.tsx`: build-time generation of body markup for each existing public route into `dist` HTML, with hashed asset URL rewriting and route-manifest coverage; no production server is added.
- `index.html` and route `*/index.html`: route-specific head metadata and Vite entry documents into which generated content is inserted.
- `public/_headers` and `vercel.json`: static response headers; add immutable caching for fingerprinted assets without changing the security policy.
- `public/logo-white-badge.svg`, `public/logo.png`, `src/components/Logo.tsx`, `src/assets/fonts/`, `public/fonts/Plus-Jakarta-Sans-OFL.txt`, and `src/index.css`: optimize logo/font delivery without changing brand appearance or losing the licensing notice.
- `.github/workflows/ci.yml`, `src/content/siteContent.test.ts`, and future component/render tests: enforce editorial alignment, accessible status/focus behavior, prerendered route content, metadata and not-found behavior.
