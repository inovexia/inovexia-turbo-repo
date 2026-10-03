# Inovexia Software — website

The Inovexia website as a Turborepo + pnpm monorepo: a Next.js frontend that
reproduces the `INW_Variation_1` design exactly, a Next.js backend API, and a
Prisma/MySQL data layer.

```
apps/
  web/        Next.js 16 + React 19 + Tailwind 4 + three.js   → http://localhost:3000
  api/        Next.js 16 route handlers (REST, Node runtime)   → http://localhost:4000
packages/
  database/   Prisma schema + shared client (@inovexia/database), MySQL
  content/    what is editable: page/template field manifests, collection
              schemas, the design's content as seed (@inovexia/content)
scripts/
  convert-html.mjs   design HTML → pages, templates, editable fields, seed
  convert/           its engine (fields + repeating lists) and seed extractor
  db-seed.mjs        load the design's blogs/services/products/case studies
```

## Quick start

Requires Node ≥ 20.12 and pnpm 10.

```bash
pnpm install            # also generates the Prisma client
cp .env.example .env    # then fill it in (already done locally)
pnpm db:push            # create the tables in MySQL (see "Database")
pnpm db:seed            # load the design's blogs, services, products, case studies
pnpm admin:create       # your admin account
pnpm dev                # web on :3000, api on :4000 — admin at /admin
```

`pnpm build` and `pnpm start` build and serve both apps. Everything reads the
single `.env` at the repo root.

## How the pieces fit

- The browser only talks to the **web** app. `/api/*` on the web app is
  proxied to the **api** app (`API_URL`), so there is no CORS to configure
  and the api can stay private.
- **web** pages are the design's HTML converted node for node into JSX, so
  the DOM — and with it the layout — matches the design. The design's
  stylesheet is used unchanged, and its behaviour (`main.js`: reveals,
  counters, sliders, theme toggle, menus…) runs once per page from
  `src/components/site/SiteRuntime.jsx`.
- **Content comes from the database** through the API: every page's text,
  images and links, and the blogs, services, products and case studies. Pages
  are cached (prerendered, refreshed every 5 minutes) and every admin save
  refreshes them at once (the API calls the site's `/revalidate` with
  `REVALIDATE_SECRET`). If the API is down, pages render the design's own
  content instead of failing.
- Internal links are plain `<a>` tags, so each navigation is a full page load,
  exactly as on the static design. The design's scripts are written for that.
- **URLs:** list pages are `/services`, `/products`, `/case-studies`, `/blogs`;
  single pages are `/service/<slug>`, `/product/<slug>`, `/case-study/<slug>`,
  `/blog/<slug>`, named from the design file (`work-tonezone.html` →
  `/case-study/tonezone`). Add a page as `service-<slug>.html`, `work-<slug>.html`…
  in the design and the converter puts it in the right place. The mapping is
  `routeFor()` in `scripts/convert-html.mjs`; `next.config.mjs` redirects every
  older form (`/work`, `/product`, `/blog`, `/work-tonezone`, `*.html`) to the current URL.
- **Light/dark theme:** light by default; the header toggle switches and
  remembers the choice (`localStorage` key `inovexia-theme`). The design's
  `Light/` build already contains both themes, so it is the source; the
  `Dark/` folder is the same design with a dark default.

### Pages

| Route | Source |
|---|---|
| `/` | `index.html` |
| `/products` | `product.html` |
| `/case-studies` | `work.html` |
| `/blogs` | `blog.html` |
| `/about`, `/services`, `/portfolio`, `/contact`, `/get-in-touch`, `/privacy`, `/terms` | same-named `.html` |
| `/service/<slug>` | template from `service-web-design.html`, content per service |
| `/product/<slug>` | template from `product-lms.html`, content per product |
| `/case-study/<slug>` | templates from the three `work-*.html`, content per case study |
| `/blog/<slug>` | article from each post's blocks inside the shared `blog-article` page |
| `/discuss-your-project` | new — 3-step project brief (React); single service pages link here with `?service=<slug>` to pre-select the service |
| `/admin` | new — admin (sign-in, dashboard, enquiries, CVs, users) — see "Admin" below |
| 404 | new — design banner + three.js tech globe |

### Forms → API → database

| Form | Page | Endpoint | Table |
|---|---|---|---|
| Send Us a Message | `/contact` | `POST /api/enquiries` (`type: "contact"`) | `enquiries` |
| Tell Us About Your Project | `/get-in-touch` | `POST /api/enquiries` (`type: "quote"`) | `enquiries` |
| Discuss Your Project (3 steps) | `/discuss-your-project` | `POST /api/enquiries` (`type: "project"`) | `enquiries` |
| Send Us Your CV | `/about` → Careers | `POST /api/careers` (multipart, PDF/Word ≤ 5 MB) | `job_applications` |

The API re-validates every field with the same rules and messages as the
browser, rate-limits per IP, and silently drops Get in Touch submissions that
fill the hidden honeypot field.

`GET /api/health` reports database status.

## Admin

`/admin` — sign in with an admin account. Create the first one (and reset
passwords from the command line) with:

```bash
pnpm admin:create
```

- **Pages** — every page's text, images and links, grouped by the design's
  sections (Hero, Services, FAQ…), plus each page's search title and
  description. Repeating parts (cards, steps, FAQs, bullet lists) can be
  added, duplicated, reordered and removed. Edited fields are marked and can
  be reset to the design. "Site-wide" is the header and footer.
- **Blogs** — articles built from blocks (text section, numbered points,
  image); card images and summaries for the Blogs page and homepage;
  featured / show-on-homepage switches. Lists everywhere update by themselves.
- **Services, Products, Case studies** — add, duplicate, reorder, publish or
  hide, delete. Each can have its own page (a copy of the design's service /
  product / case-study page to edit) or just appear in lists. Products also
  edit their section on the Products page.
- **Media** — upload images (JPG, PNG, WebP, GIF, SVG ≤ 5 MB; SVGs are
  sanitised), describe them, pick them in any image field.
- **Dashboard** — new/this-week/total enquiries, CVs, and whether email
  notifications are on.
- **Enquiries** — every Contact, Get in Touch and Discuss Your Project
  submission, with an `INV-00042` reference; filter, change status, delete.
- **CVs** — download or delete applications.
- **Admin users / My account** — add or remove admins, reset or change
  passwords (at least 10 characters).

Sessions are HttpOnly cookies (a week, renewed while in use); passwords are
scrypt hashes; only a hash of each session token is stored. Changes are only
accepted from the site's own origin (`CORS_ORIGIN`), and sign-in is
rate-limited.

## Email notifications

Every form submission is emailed to `NOTIFY_TO` (comma-separate several
addresses) through the SMTP account in `.env`, with Reply-To set to the
visitor, an "Open in admin" link, and the CV attached for applications.
Submissions are always saved first, so a mail problem never loses one; until
`SMTP_HOST` and `NOTIFY_TO` are set, emails are skipped and logged.

For a cPanel mailbox, cPanel → Email Accounts → Connect Devices lists the
settings — typically `SMTP_HOST=mail.yourdomain.com`, `SMTP_PORT=465`,
`SMTP_SECURE=true`, and the mailbox's address and password.

## Database

Schema: `packages/database/prisma/schema.prisma`. Two ways to create the tables:

- `pnpm db:push` — needs a connection from your machine to MySQL.
- Import `packages/database/prisma/sql/schema.sql` in phpMyAdmin
  (regenerate it after schema changes with `pnpm db:sql`).

On a cPanel host, MySQL normally only accepts local connections. Either run
the apps on that server with `localhost` as the host in `DATABASE_URL`, or add
your IP under **cPanel → Remote MySQL** to connect from elsewhere. Special
characters in the password must be URL-encoded in `DATABASE_URL`
(see `.env.example`).

## Updating the design

`pnpm convert:html` regenerates, from `INW_Variation_1/Light`: the pages,
the service/product/case-study/blog-article templates, the shared
Header/Footer, the page scripts, the stylesheet and images, the field
manifests (`packages/content/src/manifests.generated.js`) and the seed
content. It refuses to run if the header chrome or footer differs between
pages, rather than guessing.

How content becomes editable (`scripts/convert/engine.mjs`): every text,
rich paragraph, image, link and icon becomes a field whose default is the
design's value; sibling elements with the same shape become an editable list,
and anything that follows an item's position (01/02, delays, ids) is computed.
Lists of blogs/services/products/case studies are filled by the components in
`apps/web/src/components/cms`.

**Field keys come from the design's structure.** Re-running the converter on
a changed design can rename keys, and saved edits to a renamed field stop
applying (the page falls back to the design). Once the site is live, check
the admin after a design update; `pnpm db:seed -- --reset` reloads the design's
collections (it deletes edited blogs/services, so only use it before launch).

Every generated file starts with an `AUTO-GENERATED` line. Delete that line
from a file to edit it by hand — the converter then leaves it alone. Three
files are already hand-edited this way: `apps/web/src/lib/runtime/main.js`
and `src/lib/runtime/pages/{about-1,get-in-touch-1}.js`, which post the
forms to the API.

Tailwind classes use the `tw:` prefix (`tw:flex`, `tw:dark:bg-slate-900`)
because the design's own class names (`container`, …) overlap Tailwind's.
