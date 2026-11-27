# Workroom portfolio

Site: https://Yevhen-2012.github.io/portfolio/

Static Webflow export. No CMS or build dependencies.

## Update

Edit HTML/CSS/JS or replace files in images/. Keep relative links and the /portfolio/ base URL. Commit and push to main; GitHub Actions deploys automatically. Update sitemap.xml when adding pages.

Webflow source remains separate. Template utility pages and password form are excluded. jQuery, GSAP and fonts are hosted locally.

## Project case pages

Edit `templates/project-case.html` to change the shared layout. Each file in
`templates/cases/` supplies its page metadata, project content and related cards.
Keep the named slot markers when editing. Run `node scripts/build-projects.mjs`
to refresh the static pages in `projects/` for local preview. GitHub Actions
generates them directly into the published site on every deployment.
