# premedmentor.ca

Website for *Premed Mentor: The Comprehensive Guide to Canadian Medical Schools* by Colin Whaley and Liam Taylor Ralph.

Plain HTML/CSS/JS hosted on Cloudflare Pages (project `premedmentor`). Every push to `main` redeploys in about a minute. There's no build step.

## Files

| File | What it is |
| --- | --- |
| `index.html`, `about.html`, `resources.html`, `contact.html`, `access.html`, `extras.html`, `disclosures.html`, `privacy.html`, `404.html` | Pages |
| `style.css` | All styles |
| `site.js` | Shared header/footer, cookie banner, Google Analytics (after consent), form handling. **Edit the `SITE` object at the top for social links, author links, email and GA ID.** |
| `resources.json` | The free resources list. Add an entry and it shows up on /resources. Set `"affiliate": true` for affiliate links. |
| `_worker.js` | Cloudflare worker: `/api/form` (forms → Google Apps Script) and the `/extras` (Web Extras) password gate |
| `apps-script.gs` | Google Apps Script backend: logs forms to a Google Sheet, emails contact messages, emails the Web Extras password, adds opt-ins to EmailOctopus. Not served publicly. |

## Cloudflare variables (Pages > premedmentor > Settings > Variables and Secrets)

- `READER_PASSWORD`: the shared Web Extras password. Changing it signs everyone out and future emails send the new one.
- `APPS_SCRIPT_URL`: the Apps Script web app URL.
- `FORM_SECRET` (optional): must match the Apps Script property of the same name.

Redeploy after changing variables (Deployments > latest > Retry deployment).

## To do

- Real cover image, store product links, social/author links (in `site.js`), Amazon Associates tag on affiliate links.
- Google Analytics measurement ID in `site.js`.
- When you change `style.css` or `site.js`, bump the `?v=` number on their links in every page and `_worker.js` (Cloudflare tells browsers to cache them for 4 hours).
- Real Web Extras links in `extras.html` (keep this repo **private** so they stay hidden).
