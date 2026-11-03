# MetroDEVOPS HTML portfolio

The portfolio is plain HTML, CSS and JavaScript. Its original six sections, three project cards, twelve services, sixty SVG graphics, contact destinations and responsive design are preserved. `npm run build` copies static files into `dist`; no React runtime, hydration or framework is used. The old React source stays in Git history and existing source files for reference, but is no longer part of this build.

Run `npm run build && npm test` to verify. Set `websiteSlug` in `portfolio.config.json` only after creating, editing, saving, reloading and publishing the matching HTML portfolio in MetroDEVOPS Hub. The public page reads only that published content. If Hub is unreachable, the original public defaults remain available.

Content editing lives at https://metrodevopshub.vercel.app/hub/content-editor . An administrator creates the HTML portfolio draft under the correct client. Text editing, service addition, optional price labels, hiding and ordering reuse the original design. The service list is stored in the adapter document, independently of the older generic services catalogue. No payment collection is implemented by price labels.

GitHub maintains design and code. Hub maintains draft/published content. The adapter is specific to this portfolio; arbitrary repositories need their own field and collection setup.
