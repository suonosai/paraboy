# Suono Sai official website

Static site (HTML, CSS, JavaScript). No build step, no server code. Upload the contents of this folder as-is.

## Files
- index.html : all pages (Home, Events, Music, Social, News, Booking) in one file, switched by the menu
- css/style.css : styling
- js/site.js : menu, countdown, ticket picker, share button, photo viewer
- images/ : optimised photos
- favicon.svg : browser tab icon
- images/og-image.jpg : preview image for WhatsApp, X, iMessage links
- robots.txt, sitemap.xml : search engine files
- _headers : Cloudflare caching and security headers

## Deploy with GitHub + Cloudflare Pages (recommended)
1. GitHub: create a new repository named `suonosai-website` (Public or Private), then upload every file in this folder (index.html at the top level).
2. Cloudflare: Workers & Pages > Create > Pages > Connect to Git > pick the repo. Framework preset: None. Build command: leave empty. Build output directory: `/` (or leave empty).
3. After the first deploy, open the project > Custom domains > add `www.suonosai.com`, then also add `suonosai.com` so it redirects to www.
4. Every future change committed to the repo `main` branch goes live automatically.

## Other hosts (optional)
- Netlify: app.netlify.com/drop, then drag this folder in.
- Vercel: `vercel` in this folder, or import from GitHub (framework: Other, no build command, output directory: ./).
- Cloudflare Pages: create a project, upload this folder (no build command).
- GitHub Pages: push the contents to a repo, then Settings > Pages > deploy from branch.
- Shared hosting / cPanel: upload everything into public_html (index.html must sit at the top level).

Then point your domain at the host and enable HTTPS (all of the above do this for free).

## Booking form
The form is on the Booking page (index.html, `#bform`; logic at the bottom of js/site.js).
- It sends through Web3Forms. Get a free access key at https://web3forms.com using the booking inbox, then set `BOOKING_KEY` at the top of the booking-form block in js/site.js. The key is safe to publish and does not reveal the inbox address.
- Until a key is set, the form tells visitors to call or WhatsApp the booking numbers.

## Common edits
- Event date and countdown: js/site.js, the numbers in `Date.UTC(2026,11,13,16,0,0)` (start, UTC, month is 0-based) and `Date.UTC(2026,11,14,0,0,0)` (end).
- Ticket link: search all files for `tixtango.com/paraboyzfest` and replace.
- Ticket prices: in index.html (data-p="10000" and data-p="30000" plus the displayed text).
- Streaming and social stats: index.html, Music and Social pages. Numbers are a snapshot from October 2026.
- Add a new event: copy the `<article class="event">` block in the Events page and update the text and dates.

Fonts (Anton, Permanent Marker, Barlow) load from Google Fonts, so the site needs internet access to show them as designed.

Web developed by 778dev.ca and managed by Vuga Music Inc. (https://www.vuga.org)
