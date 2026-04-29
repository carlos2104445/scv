# Selam Children's Village — Project Scope for Building in Antigravity

Companion to:
- `SELAM_CV_REBUILD_REPORT.md` (site analysis + IA)
- `SELAM_CV_ADMIN_PANEL_SPEC.md` (CMS / admin design)
- `scv-content.zip` (101 scraped pages used as content seed)

This document is the **buildable scope** — it tells Antigravity (Google's agentic IDE) exactly what to do, in what order, with what acceptance criteria, and how to verify each step end-to-end via its browser-use and artifact features.

---

## 1. Executive Summary

Build a production Next.js 14 (App Router) replacement for `selamchildrenvillage.org` plus a self-hosted admin panel, using **Antigravity's agent-driven workflow**:

- **One repo** — public site + Payload CMS admin in the same Next.js app.
- **Two long-lived agents** running in parallel via Antigravity's Agent Manager: `frontend-agent` (public site) and `cms-agent` (Payload schemas + admin UI). They coordinate through a shared **Plan** file checked into the repo.
- **Every milestone closes with a browser-use verification** Antigravity records as an Artifact (screenshots + walkthrough) so SCV's stakeholders can sign off without ever pulling the code.
- **Content seeded automatically** from the scraped markdown bundle into Payload via a one-shot importer script.
- **Zero downtime cutover** from the current WordPress site via a redirect map and DNS swap.

Total scope: **~6 weeks** with one developer + Antigravity, or **~3.5 weeks** with two developers running parallel agents.

---

## 2. Goals and Non-Goals

### Goals (must do)
1. Re-implement every public feature from `SELAM_CV_REBUILD_REPORT.md`: hero slider, projects grid, news/events/jobs/gallery/team, donate page (Chapa + GoFundMe + bank/Tele Birr cards), volunteer/contact/newsletter forms, search, EN/AM bilingual.
2. Ship the admin panel from `SELAM_CV_ADMIN_PANEL_SPEC.md`: all collections, Inbox dashboards, donations module, translations workspace, roles, audit log.
3. Migrate the scraped content (101 documents) into Payload as the seed dataset.
4. Score Lighthouse ≥ 90 across Performance, Accessibility, Best Practices, SEO on `/`, `/donate/`, `/news-updates/`, `/all-projects/`.
5. Deploy public site to Vercel + admin/CMS to the same deployment, on a custom domain that mirrors the current `selamchildrenvillage.org`.

### Non-Goals (explicitly out of scope)
- Visual reproduction of the Chariti theme. We design fresh and modern.
- WooCommerce / shop. (The current `/shop/`, `/cart/`, `/checkout/` are theme-demo leftovers — not SCV content.)
- Comments, forum, user-generated content beyond the form submissions already specced.
- Mobile native app.
- Recurring-donation engine v1. (Chapa hosted checkout supports this if we toggle it on later.)
- Migrating the WordPress visitor counter as-is. Replaced by Plausible analytics.

### Out-of-scope (handled by SCV, not us)
- Final copy/translations review by SCV staff.
- Bank account numbers in plain text (currently bank-slip *images*).
- Chapa Direct API credentials if SCV wants to upgrade from hosted links.

---

## 3. Deliverables (Acceptance Criteria)

| # | Deliverable | Verified by |
|---|---|---|
| D1 | GitHub repo `selam-children-village` with main + dev branches, CI green | Antigravity browser-use opens the repo, runs `pnpm i && pnpm test && pnpm build` |
| D2 | Public site live on a Vercel preview URL | Antigravity navigates every page in the IA tree; screenshots saved as Artifacts |
| D3 | Admin panel at `/admin` with seeded users for Super Admin, Editor, Translator, Fundraiser, HR | Antigravity logs in as each role, screenshots permission boundaries |
| D4 | All 101 scraped documents imported into Payload | Antigravity opens each collection, counts records, screenshots first 3 of each |
| D5 | Forms (volunteer, contact, newsletter) submit successfully and land in Inbox | Antigravity submits each form; opens admin Inbox; verifies row appears |
| D6 | Donate page renders bank cards from CMS, Chapa ETB+USD CTAs work, GoFundMe link works | Antigravity clicks each CTA, follows redirect, screenshots Chapa landing |
| D7 | Lighthouse ≥ 90 on `/`, `/donate/`, `/news-updates/`, `/all-projects/` | Antigravity runs Lighthouse via Chrome DevTools, attaches reports |
| D8 | EN ⇄ AM locale switcher works site-wide; translation queue populated in admin | Antigravity toggles locale on 5 random pages; screenshots both versions |
| D9 | Sitemap, robots.txt, OG images, JSON-LD (`Organization`, `NGO`, `Article`, `Event`, `JobPosting`) present | Antigravity runs schema.org structured-data validator; attaches results |
| D10 | Redirect map from old WP slugs (~45 routes) returns 301 to new URLs | Antigravity hits each old URL, asserts 301 status + new Location |
| D11 | Production deployment + DNS handover plan delivered | Document checked in at `docs/launch.md` |

---

## 4. Tech Stack — Locked-In

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router, RSC)** | Industry standard, Antigravity has native templates |
| Language | **TypeScript** strict mode | Catches errors before agents loop on them |
| Styling | **Tailwind CSS v4 + shadcn/ui** | Tailwind tokens map cleanly to a brand system; shadcn gives us accessible Radix primitives we own |
| CMS | **Payload v3** (mounted at `/admin`) | Self-hosted, in the same Next.js app, free, role-based, built-in localization, drafts, versions, REST + GraphQL |
| Database | **Postgres on Neon** | Free tier, branching, daily snapshots |
| File storage | **Cloudflare R2** + Payload R2 adapter | Free egress, S3-compatible |
| Auth (admin) | Payload built-in + **TOTP 2FA** for admin/super-admin | No need to plumb NextAuth |
| Forms | **react-hook-form + Zod** + Cloudflare Turnstile | Accessible + spam-safe |
| Email | **Resend** (transactional) | Free 3k/mo |
| Newsletter | **Mailchimp** (or Resend Audiences if SCV prefers) | Decided in §13 |
| Payments | **Chapa hosted links** v1, **Chapa Direct API** v1.5 if SCV provides keys | SCV already has the hosted links live |
| Maps | Google Maps iframe (zero cost) | Identical to current site |
| Search | **Pagefind** (build-time, zero infra) | Free, fast, perfect fit for SSG |
| Analytics | **Plausible Cloud** | Privacy-friendly, replaces WP Stats Manager + visitor widget |
| i18n | **next-intl** with `en` (default) and `am` | Works with App Router; Payload localization aligns |
| Testing | **Vitest** (unit) + **Playwright** (e2e) | Antigravity browser-use also runs Playwright |
| CI/CD | **GitHub Actions** + **Vercel** previews per PR | Free, ubiquitous |
| Monitoring | Vercel Analytics + Sentry free tier | Production-grade error tracking |
| Hosting | **Vercel** (single deploy for site + admin + Payload) | Optimal for Next.js |

---

## 5. Repo Bootstrap

Single command to give Antigravity a clean starting point:

```bash
pnpm create next-app@latest selam-children-village \
  --typescript --tailwind --app --eslint --src-dir --import-alias "@/*" \
  --no-turbopack
cd selam-children-village
pnpm dlx shadcn@latest init -y
pnpm add payload @payloadcms/db-postgres @payloadcms/richtext-lexical \
         @payloadcms/storage-r2 @payloadcms/plugin-seo \
         next-intl react-hook-form zod resend pagefind @pagefind/default-ui
pnpm add -D vitest @playwright/test eslint-config-prettier prettier \
            @types/node tsx
```

### Target repo layout

```
selam-children-village/
├─ src/
│  ├─ app/
│  │  ├─ (site)/                      ← public site, locale-prefixed routes
│  │  │  ├─ [locale]/
│  │  │  │  ├─ layout.tsx
│  │  │  │  ├─ page.tsx                ← /
│  │  │  │  ├─ about/
│  │  │  │  ├─ leadership/
│  │  │  │  ├─ what-we-do/
│  │  │  │  ├─ all-projects/
│  │  │  │  ├─ technical-vocational-training/
│  │  │  │  ├─ get-involved/{donate,become-a-volunteer,contact-us,how-to-help}
│  │  │  │  ├─ resources/{publication,newsletter-magazine,annual-report,audit-report,policies-guidelines}
│  │  │  │  ├─ news-updates/[[...slug]]
│  │  │  │  ├─ event-calendar/[[...slug]]
│  │  │  │  ├─ job-openings/[[...slug]]
│  │  │  │  ├─ gallery/[[...slug]]
│  │  │  │  └─ search/
│  │  ├─ (admin)/admin/[[...segments]] ← Payload admin
│  │  └─ api/
│  │     ├─ forms/{volunteer,contact}/route.ts
│  │     ├─ jobs/apply/route.ts
│  │     ├─ newsletter/{subscribe,unsubscribe}/route.ts
│  │     ├─ donate/{checkout,webhook}/route.ts
│  │     ├─ revalidate/route.ts
│  │     └─ search/route.ts
│  ├─ payload/
│  │  ├─ payload.config.ts
│  │  └─ collections/
│  │     ├─ Pages.ts
│  │     ├─ Posts.ts
│  │     ├─ Projects.ts
│  │     ├─ Departments.ts
│  │     ├─ People.ts
│  │     ├─ Events.ts
│  │     ├─ Jobs.ts
│  │     ├─ Galleries.ts
│  │     ├─ Publications.ts
│  │     ├─ Testimonials.ts
│  │     ├─ Partners.ts
│  │     ├─ BankAccounts.ts
│  │     ├─ Donations.ts
│  │     ├─ VolunteerApplications.ts
│  │     ├─ ContactMessages.ts
│  │     ├─ JobApplications.ts
│  │     ├─ NewsletterSubscribers.ts
│  │     └─ Users.ts
│  ├─ payload/globals/
│  │  ├─ SiteSettings.ts
│  │  ├─ HomepageHero.ts
│  │  ├─ Menus.ts
│  │  ├─ DonateSettings.ts
│  │  └─ SeoDefaults.ts
│  ├─ components/
│  │  ├─ blocks/                       ← every block from the spec library
│  │  ├─ layout/{Header,Footer,MobileMenu,SearchOverlay}.tsx
│  │  └─ ui/                           ← shadcn primitives
│  ├─ lib/
│  │  ├─ payload.ts                    ← payload client
│  │  ├─ i18n/{config.ts,messages/en.json,messages/am.json}
│  │  ├─ email/{resend.ts,templates/*}
│  │  ├─ seo/{jsonld.ts}
│  │  └─ chapa.ts
│  └─ scripts/
│     ├─ seed.ts                       ← imports scv-content.zip into Payload
│     ├─ seed-redirects.ts
│     └─ generate-search-index.ts
├─ messages/{en.json,am.json}
├─ public/{logos,icons,og-defaults}
├─ tests/{e2e/*.spec.ts, unit/*}
├─ .agent/                             ← Antigravity context (see §6)
│  ├─ PLAN.md
│  ├─ DECISIONS.md
│  └─ knowledge/{*.md}
├─ docs/
│  ├─ spec.md                          ← drop SELAM_CV_REBUILD_REPORT.md here
│  ├─ admin-spec.md                    ← drop SELAM_CV_ADMIN_PANEL_SPEC.md here
│  └─ launch.md                        ← cutover runbook
├─ .github/workflows/{ci.yml,e2e.yml,lighthouse.yml}
├─ vercel.json
├─ .env.example
└─ README.md
```

---

## 6. How to Drive Antigravity

Antigravity's strengths for this project:

1. **Agent Manager** — runs multiple Gemini-powered agents in parallel that share the same workspace.
2. **Plans** — long-form markdown plans the agent follows step by step; you (or another agent) can edit them mid-flight.
3. **Artifacts** — every meaningful action (test run, screenshot, diff, browser session) is saved and shareable as a verifiable record.
4. **Browser-use** — agents drive a real Chromium tab, perfect for validating that what they built actually works in production-like conditions.
5. **Task-level scoping** — assign one agent the public site, another the CMS, a third QA, all coordinating via files in the repo.

### Agents we'll spawn

| Agent | Role | Key files it owns |
|---|---|---|
| **frontend-agent** | Public site, components, i18n, SEO, blocks, forms UI | `src/app/(site)/**`, `src/components/**`, `messages/**` |
| **cms-agent** | Payload schemas, admin UI customizations, importers | `src/payload/**`, `src/scripts/**`, `src/app/(admin)/**` |
| **qa-agent** | Playwright e2e + Lighthouse + Pagefind index + a11y | `tests/**`, `.github/workflows/**` |
| **devops-agent** (short-lived, called per milestone) | Env, secrets, Vercel, Neon, R2, DNS | `vercel.json`, `.env.example`, `docs/launch.md` |

All four agents read from the same `.agent/PLAN.md` and write Architecture-level decisions into `.agent/DECISIONS.md` (think: lightweight ADRs).

### `.agent/PLAN.md` template (commit at repo init)

```md
# SCV Rebuild — Live Plan

## Status
- Phase: M0
- Last green CI: never
- Last preview deploy: never

## Active milestone
M0 — Bootstrap

## Backlog
M1, M2, ..., M10 (see §7 of project scope)

## Open questions / blocked on user
- [ ] Newsletter provider choice (Mailchimp vs Resend Audiences)
- [ ] Plain-text bank account numbers
- [ ] Chapa Direct API keys (or stay on hosted links)

## Decisions log
(Append-only. Each entry: date, who, what, why.)
```

### Conventions for the agents

- **Never commit to `main` directly.** Open PRs to `dev`, let CI run, merge after Lighthouse + Playwright pass.
- **Every PR closes with a browser-use Artifact** — the agent navigates the affected pages and saves screenshots.
- **Every new collection or component gets a Vitest unit test and a Playwright e2e** before being marked done.
- **TypeScript errors are blocking** — agents must not silence with `any`.
- **Visual regressions** — use Playwright's `toHaveScreenshot()` once we have a baseline (start from M5).

---

## 7. Milestone-by-Milestone Scope

Each milestone has: **Goal**, **Tasks (assigned to agents)**, **Antigravity task prompt** (paste-ready), **Definition of Done**, **Verification artifact**.

### M0 — Bootstrap (1 day)

**Goal:** Empty but deployable Next.js + Payload + Tailwind + shadcn shell on Vercel preview, with CI.

**Tasks:**
- devops-agent: create repo, secrets, Vercel project, Neon DB, R2 bucket
- frontend-agent: bootstrap Next.js 14 + Tailwind + shadcn + next-intl
- cms-agent: install Payload, mount at `/admin`, create empty `Users` collection, seed a Super Admin
- qa-agent: GitHub Actions: lint + typecheck + unit + build

**Antigravity task prompt for the orchestrator:**
> Bootstrap a new Next.js 14 (App Router, TypeScript, Tailwind) repo named `selam-children-village`. Install Payload v3 mounted at `/admin` with Postgres on Neon. Add next-intl with locales `en` (default) and `am`. Create three GitHub Actions workflows: `ci.yml` (lint, typecheck, unit, build), `e2e.yml` (Playwright on PR), `lighthouse.yml` (Lighthouse on preview). Create the `.agent/PLAN.md` file from §6 of `docs/scope.md`. Open a draft PR titled "M0: Bootstrap". Verify by running `pnpm build` and by visiting `/admin` on the Vercel preview and screenshotting the login page.

**Definition of Done:**
- [ ] `pnpm i && pnpm dev` boots locally
- [ ] `/admin` shows Payload login on Vercel preview
- [ ] CI green on the M0 PR
- [ ] Super Admin user exists, password stored in Vercel env

**Artifact:** screenshot of green CI + screenshot of `/admin` login on preview URL.

---

### M1 — Design tokens + layout shell (2 days)

**Goal:** Brand-consistent design system; header / footer / mobile menu / search overlay placeholders ready.

**Tasks:**
- frontend-agent: Tailwind theme (brand colors from current site — orange `#f37233`, dark `#292929`, fonts), typography scale, container, breakpoints
- frontend-agent: shadcn-based `<Header />`, `<Footer />`, `<MobileMenu />`, `<SearchOverlay />`, `<LocaleSwitcher />`
- frontend-agent: 404, loading, error pages

**Antigravity task prompt:**
> Implement the global layout from `docs/spec.md` §4.1. Pull brand color `#f37233` and dark text `#292929` from the current site. Build accessible Header (with multi-level mega-menu placeholder), Footer (contact + socials + newsletter form + map iframe + visitor-counter slot), MobileMenu (Radix Dialog), SearchOverlay (cmdk), LocaleSwitcher (en/am). All copy reads from `messages/en.json` and `messages/am.json` via next-intl — no hard-coded strings. Add Vitest snapshot tests. Open PR "M1: Layout shell".

**DoD:**
- [ ] Header is sticky, keyboard-navigable, mega-menu has `aria-expanded`
- [ ] Mobile menu opens/closes via Esc and outside-click
- [ ] LocaleSwitcher round-trips between `/` and `/am/`
- [ ] All copy externalized to `messages/*.json`

**Artifact:** Antigravity browser-use walkthrough recording the menus on desktop + mobile (set-mobile=true) at `/` and `/am/`.

---

### M2 — Payload schemas (3 days)

**Goal:** Every collection from `docs/admin-spec.md` exists with correct fields, drafts, versions, localization, role-based access.

**Tasks (cms-agent owns):**
- Collections: `Pages`, `Posts`, `Projects`, `Departments`, `People`, `Events`, `Jobs`, `Galleries`, `Publications`, `Testimonials`, `Partners`, `BankAccounts`, `Donations`, `VolunteerApplications`, `ContactMessages`, `JobApplications`, `NewsletterSubscribers`, `Users`
- Globals: `SiteSettings`, `HomepageHero`, `Menus`, `DonateSettings`, `SeoDefaults`
- Roles: `super-admin`, `admin`, `editor`, `author`, `translator`, `fundraiser`, `hr`, `viewer` with the matrix from admin-spec §9
- Localization: en + am on every text/rich-text field
- R2 storage adapter for media; `sharp` for image variants

**Antigravity task prompt:**
> Implement every collection and global from `docs/admin-spec.md`, with localized fields (en, am), drafts + versions enabled, role-based access controls per the role matrix. Use `@payloadcms/db-postgres` and `@payloadcms/storage-r2`. Generate types with `pnpm payload generate:types`. Write Vitest tests asserting that an Editor cannot mutate `SiteSettings` and a Translator can only edit `am` fields. Open PR "M2: Payload schemas".

**DoD:**
- [ ] All collections render in `/admin` with correct field types
- [ ] Generated types in `payload-types.ts` (no `any`)
- [ ] Role-based access tests pass
- [ ] R2 upload works (test by uploading 1 image)

**Artifact:** Antigravity logs in as `editor@scv.local` and tries to edit Site Settings → records the 403; saves as Artifact.

---

### M3 — Content seed importer (2 days)

**Goal:** Seed Payload with all 101 scraped documents from `scv-content.zip`.

**Tasks (cms-agent):**
- `src/scripts/seed.ts` — reads the unzipped `scraped/` tree, parses each markdown file (front-matter URL/title + body), maps to the right collection by source folder (`pages/`, `news/`, `personnel/`, `projects-portfolio/`, `galleries/`).
- For each scraped image URL, downloads the original from `wp-content/uploads/`, uploads to R2, links to the document's media field.
- Idempotent: re-running doesn't duplicate.
- Author guesses (assign content to a "Content Migration" Payload user).
- Translator queue: every imported doc starts with `am` empty and a `needs-translation` flag.

**Antigravity task prompt:**
> Write `src/scripts/seed.ts` that reads `data/scraped/INDEX.json` and seeds Payload. For each item, create the appropriate collection record, downloading every referenced image from `wp-content/uploads/` and re-uploading to R2. Mark imported docs as `status: 'draft'` and `needsTranslation: true`. The script must be idempotent (use `where: { sourceUrl: { equals: ... } }` to update). Run with `tsx src/scripts/seed.ts`. Verify by querying `/api/posts?limit=1000` and asserting count === 22 news posts. Open PR "M3: Content seed".

**DoD:**
- [ ] All 101 records exist in Payload
- [ ] Re-running seed doesn't duplicate
- [ ] Images render in admin previews (R2 URLs)
- [ ] Counts: 22 news, 22 personnel, 9 projects, 1 gallery, ~45 pages

**Artifact:** Antigravity opens each collection list in `/admin`, screenshots record counts, attaches.

---

### M4 — Public dynamic routes (5 days)

**Goal:** Every dynamic listing + detail page renders from Payload.

**Tasks (frontend-agent):**
- `/news-updates/` index + `/news-updates/[slug]/` detail
- `/all-projects/` index + `/all-projects/[slug]/` detail with KPI counters and SDG icons
- `/event-calendar/` (table + calendar view) + `/event-calendar/[slug]/` (with ICS export endpoint)
- `/job-openings/` + `/job-openings/[slug]/` with apply form
- `/gallery/` + `/gallery/[slug]/` with lightbox
- `/leadership/{executive-board,senior-management,extended-management,switzerland}` from `People`
- `/technical-vocational-training/` + 11 department pages from `Departments`
- All static pages from `Pages` collection (rendered via a shared `<RenderBlocks />` component for the block library)

**Antigravity task prompt:**
> Implement every public dynamic route per `docs/spec.md` §3 sitemap and `docs/scope.md` §7 M4 task list. Each detail page uses `generateStaticParams` for SSG with ISR (`revalidate: 60`). Render rich-text via Payload's lexical-to-react adapter. Pull SEO from each record's `seo` field. Add JSON-LD per `docs/spec.md` §4.15 (Article, Event, JobPosting, BreadcrumbList). Tests: Playwright e2e that visits each list page and asserts at least 1 card. Open PR "M4: Dynamic routes".

**DoD:**
- [ ] All routes return 200
- [ ] News listing shows 22 posts
- [ ] Project page renders KPI counters with `IntersectionObserver` animation
- [ ] Job apply form posts to `/api/jobs/apply` (mocked storage)

**Artifact:** Antigravity browser-walks the sitemap from `docs/spec.md` §3, screenshots every route into a single contact-sheet image.

---

### M5 — Homepage (2 days)

**Goal:** Pixel-quality, performance-tight homepage.

**Tasks (frontend-agent):**
- Hero slider (Embla, autoplay, paused on hover, ARIA live region) reading from `HomepageHero` global
- Vision + Mission cards
- 9-card project grid
- Latest 3 news
- Upcoming 3 events
- Team carousels (board / senior / extended)
- Testimonials carousel
- Partners gallery + lightbox
- Newsletter signup card

**Antigravity task prompt:**
> Implement the homepage per `docs/spec.md` §4.2. Source data from Payload. Use `next/image` everywhere. Hero must hit LCP < 2s on a 4G profile. Newsletter form posts to `/api/newsletter/subscribe`. Add Playwright visual-regression baseline. Open PR "M5: Homepage".

**DoD:**
- [ ] Lighthouse Performance ≥ 90
- [ ] LCP < 2.5s (DevTools Performance)
- [ ] Hero pauses on hover, is keyboard-controllable
- [ ] Newsletter form double-opt-in confirmation email arrives

**Artifact:** Lighthouse report attached + 60-second browser-use recording of scrolling the homepage and submitting the newsletter form.

---

### M6 — Forms, donations, integrations (4 days)

**Goal:** Every interactive feature works end-to-end.

**Tasks:**
- frontend-agent: `/become-a-volunteer/`, `/contact-us/` forms with RHF + Zod + Turnstile; `/job-openings/[slug]/` apply form with file upload
- cms-agent: API routes `/api/forms/volunteer`, `/api/forms/contact`, `/api/jobs/apply` writing to Payload Inbox collections + sending Resend email
- frontend-agent: `/donate/` page with bank-account cards (from `BankAccounts` collection), Chapa ETB/USD CTAs (from `DonateSettings`), GoFundMe link, currency switcher, copy-to-clipboard buttons
- cms-agent: optional `/api/donate/checkout` if Chapa Direct API keys provided
- frontend-agent: footer newsletter form posting to `/api/newsletter/subscribe` (Mailchimp or Resend Audiences depending on §13)
- Slack/Telegram webhook on each new submission (admin-spec §10.4)

**Antigravity task prompt:**
> Implement all four forms (volunteer, contact, job-apply, newsletter-subscribe) and the donate flow per `docs/spec.md` §4.3-§4.7 and `docs/admin-spec.md` §5-§6. Use Cloudflare Turnstile site key from env. On successful submission: write to Payload Inbox collection, send transactional email via Resend, fire optional Slack webhook, return 200 to client. Donate page reads from `BankAccounts` collection + `DonateSettings` global. e2e tests submit each form and assert the row appears in admin. Open PR "M6: Forms + donations".

**DoD:**
- [ ] Submitting each form lands in `/admin/inbox` within 2s
- [ ] Volunteer email reply lands in inbox in dev
- [ ] Donate page passes `axe` a11y scan with 0 violations
- [ ] Chapa ETB CTA opens the live checkout page (`chapa.link/donation/view/DN-...`)

**Artifact:** Antigravity submits all 4 forms, opens `/admin/inbox`, screenshots each new row.

---

### M7 — Admin Inbox + Donations dashboards (3 days)

**Goal:** Custom admin views per admin-spec §5 and §6 (Payload alone gives us list+edit; this milestone adds the *workflows*).

**Tasks (cms-agent):**
- Custom Payload admin views: Volunteer applications, Contact messages, Job applications, Newsletter subscribers
- Status flows (status select with transitions, "assigned to" user picker, internal notes rich text, tag chips)
- "Send reply" modal (Resend) on each message
- CSV export for any list
- Donations: bank account editor with logo upload, Chapa+GoFundMe settings global, Donation records list with filters and PDF receipt generator

**Antigravity task prompt:**
> Add custom admin views to Payload at the routes listed in `docs/admin-spec.md` §5-§6. Use Payload's `components.views` extension API. Each Inbox view supports filtering, sort, bulk-status-change, CSV export, and "Send reply" via Resend. Donate Settings global stores Chapa URLs and the Direct API toggle. Donation records page uses Postgres full-text search on donor name. Open PR "M7: Admin dashboards".

**DoD:**
- [ ] Filtering and bulk actions work
- [ ] CSV export downloads a valid file
- [ ] Reply email sends and archives the thread
- [ ] PDF receipt generator produces a valid PDF (test with one mock donation)

**Artifact:** Antigravity walks through Inbox: filters volunteer apps by country = Ethiopia, bulk-changes status, exports CSV, opens the CSV.

---

### M8 — i18n, search, SEO (3 days)

**Goal:** Bilingual site, on-site search, SEO/JSON-LD/OG complete.

**Tasks:**
- frontend-agent: full EN translation in `messages/en.json`; AM scaffolded to 100% strings (machine-translated draft via DeepL, marked `needs-review`)
- cms-agent: side-by-side translation editor for collections (Payload's localization gives this for free; we add a "Translate now" button that calls DeepL for drafts)
- qa-agent: Pagefind static index built into `pnpm build`; `/search` page consumes `@pagefind/default-ui`
- frontend-agent: dynamic `sitemap.ts`, `robots.ts`, OG image generator (`opengraph-image.tsx`), JSON-LD per page

**Antigravity task prompt:**
> Complete `messages/en.json` with every UI string. Generate `messages/am.json` with DeepL-translated drafts (mark each value `__needs_review`). Build Pagefind index in postbuild. Implement `app/sitemap.ts` and `app/robots.ts`. Add an `<OgImage />` route that renders OG cards via `next/og`. Add JSON-LD components for Organization (root layout), Article (news pages), Event (event pages), JobPosting (job pages), BreadcrumbList. Validate with the Schema.org validator and attach the report. Open PR "M8: i18n + search + SEO".

**DoD:**
- [ ] No hard-coded UI string anywhere (`grep -R "use client" | xargs eslint --rule i18n-no-string-literal: error` passes)
- [ ] `/search?q=BEYEPP` returns the right news post
- [ ] `https://search.google.com/test/rich-results` validates `Article`, `Event`, `JobPosting`
- [ ] OG image renders correctly when shared on Slack / X / Facebook

**Artifact:** Schema validator screenshot + side-by-side EN/AM screenshots of homepage and donate.

---

### M9 — QA + accessibility + performance (3 days)

**Goal:** Lock in the quality bar before launch.

**Tasks (qa-agent leads):**
- Playwright e2e for all critical flows: nav, forms, donate, search, locale switch
- Visual regression baseline for 8 key pages
- `axe-core` automated a11y scan on every route in CI
- Lighthouse CI on Vercel preview, budgets enforced
- Bundle analysis (`@next/bundle-analyzer`); kill any >250KB component

**Antigravity task prompt:**
> Bring the QA bar to 90+ across Lighthouse Performance/Accessibility/Best-Practices/SEO on `/`, `/donate/`, `/news-updates/`, `/all-projects/`. Add Playwright e2e for: home → click first project → donate → submit volunteer form → admin inbox shows it → admin reply email arrives. Add axe scan to each Playwright test. Add `@axe-core/playwright`. Open PR "M9: QA hardening".

**DoD:**
- [ ] Lighthouse ≥ 90 on the four target pages
- [ ] 0 axe violations of severity ≥ "serious"
- [ ] Playwright suite runs green in CI < 5 min
- [ ] No JS bundle > 250KB compressed

**Artifact:** Lighthouse-CI report archive + Playwright HTML report on Vercel.

---

### M10 — Launch (2 days)

**Goal:** Cutover from current WP site with zero downtime and intact SEO.

**Tasks:**
- devops-agent: production env vars (Resend, Mailchimp, Chapa, R2, Plausible, Turnstile)
- devops-agent: Vercel custom domain `selamchildrenvillage.org` + `www.` (via the registrar's nameservers)
- cms-agent: redirect map for old WP slugs (~45 routes) in `vercel.json` or `next.config.ts`
- frontend-agent: 404 page, "we just relaunched" banner (toggle in Site Settings)
- devops-agent: backups: nightly Postgres dump + R2 versioning enabled
- docs/launch.md: cutover runbook, rollback plan, DNS TTL guidance (drop to 300s 24h before)

**Antigravity task prompt:**
> Prepare the launch. Build `vercel.json` redirects for every URL in `data/old-wp-routes.csv` (extracted from the current WP sitemap). Document the cutover runbook in `docs/launch.md` with: (1) DNS TTL drop, (2) final content sync, (3) DNS swap, (4) post-cutover smoke tests, (5) rollback procedure. Configure Plausible site, Sentry project, Resend domain DNS, Mailchimp audience webhook. Open PR "M10: Launch".

**DoD:**
- [ ] All ~45 old WP slugs return 301 with correct new Location
- [ ] Plausible receiving traffic on the preview URL
- [ ] Resend domain DNS verified
- [ ] Cutover runbook reviewed and signed off

**Artifact:** Antigravity hits each old URL with `curl -sI`, parses the `Location:` header, attaches the verification log.

---

## 8. Cross-Cutting Workstreams (run alongside milestones)

| Workstream | Cadence | Owner |
|---|---|---|
| **Translation review** | Continuous from M3 onward | SCV-supplied translator + cms-agent |
| **Content QA** | After each milestone touching Payload | SCV editor |
| **Stakeholder demos** | End of M5, M7, M9 | Antigravity records browser-use videos, attached to email |
| **Accessibility audit** | M9 + 1 week before launch | qa-agent + manual screen-reader pass |
| **Security review** | Before M10 | Manual: env var audit, RLS, OWASP top-10 checklist |

---

## 9. Risks & Mitigations

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| R1 | SCV doesn't supply plain-text bank account numbers in time | Donate page launches with image-of-bank-slip stop-gap (degraded a11y) | Build a `BankAccount.imageOnly: true` fallback that renders the original screenshot; flag visibly in the admin |
| R2 | Chapa Direct API keys not provided | Donation records collection stays empty; we keep hosted-link CTAs | Hosted links are already enough for v1; no blocker |
| R3 | Amharic translations stall | Site launches EN-only (AM behind a feature flag) | Locale-switcher hidden when `am` translations < 80% complete |
| R4 | WP image originals on `wp-content/uploads/` start returning 404 (host change) | Seed importer fails | Run seed importer in M3 against a snapshot of the WP site (download once into `data/wp-snapshot/` and import locally) |
| R5 | Vercel function 10s timeout on PDF receipt generation | Donation receipts fail to generate | Move PDF gen to Vercel Cron + Resend with attachment; or use Edge runtime + `@react-pdf/renderer` |
| R6 | Antigravity agent loops or burns budget on a hard problem | Wasted time | Hard cap each milestone at 1.5x estimate; if exceeded, stop, hand to human, write a `DECISIONS.md` entry |
| R7 | DNS cutover slower than 5 minutes | Hours of partial-traffic limbo | Drop TTL to 300s 24h before; have current WP config + DB backed up to roll back |
| R8 | Mailchimp / Resend Audiences vendor not chosen by M6 | Newsletter signup falls back to writing to Payload only (no provider sync) | Acceptable for v1; sync job can be added later |
| R9 | Goodlayers theme has hidden CSS we miss in re-design | Stakeholder pushback "looks different" | Project goal is *not* visual fidelity (per §2); pre-empt with a design-direction doc signed off in M1 |

---

## 10. Timeline (single developer w/ Antigravity)

```
Week 1   M0  ▓
         M1  ▓▓▓▓▓
Week 2   M2  ▓▓▓▓▓▓▓▓▓▓▓▓
         M3  ▓▓▓▓▓▓▓
Week 3   M4  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
Week 4   M5  ▓▓▓▓▓▓▓
         M6  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
Week 5   M7  ▓▓▓▓▓▓▓▓▓▓▓
         M8  ▓▓▓▓▓▓▓▓▓▓▓
Week 6   M9  ▓▓▓▓▓▓▓▓▓▓▓
         M10 ▓▓▓▓▓
         buffer (DNS TTL, content review) ▓▓▓
```

**Total:** ~6 calendar weeks for one developer. **~3.5 weeks** with two developers running `frontend-agent` and `cms-agent` in parallel.

---

## 11. Cost Estimate (monthly, USD)

| Service | Plan | Cost |
|---|---|---|
| Vercel | Hobby (or Pro if SCV needs SLA) | $0 / $20 |
| Neon Postgres | Free tier (500 MB) | $0 |
| Cloudflare R2 | 10 GB free, then $0.015/GB | ~$1 |
| Resend | Free 3k emails/mo, then $20 for 50k | $0–20 |
| Mailchimp | Free up to 500 contacts, then $13+ | $0–13 |
| Plausible Cloud | $9/mo Starter | $9 |
| Cloudflare Turnstile | Free | $0 |
| Sentry | Developer (free) | $0 |
| Antigravity | Free during preview (verify current pricing) | $0 |
| Domain | Existing | – |

**Run-rate:** **$10–60 / month** for the first year. Scales linearly with email volume.

---

## 12. Post-Launch Operations Plan

- **Monitoring:** Sentry alerts → email `webmaster@selamchildrenvillage.org`. Vercel deploy notifications → Slack/Telegram (admin-spec §10.4).
- **Backups:** Neon point-in-time-restore (7 days). R2 versioning enabled. Manual snapshot before every Payload schema migration.
- **Updates:** Renovate bot opens weekly PRs for npm deps; Antigravity reviews and merges if green.
- **Content cadence:** SCV posts ≥ 1 news per month; events as needed; quarterly admin audit of stale/draft records.
- **On-call:** None expected (charity site, no SLA). Document a 24-hour response expectation.
- **Disaster recovery:** Rollback plan in `docs/launch.md` — DNS revert + restore previous Vercel deployment.

---

## 13. Decisions to Confirm with Alfred / SCV before kickoff

These are blockers for specific milestones:

1. **Newsletter provider** — Mailchimp (familiar, free tier) vs Resend Audiences (cleaner DX) vs Listmonk (self-host). Blocks M6.
2. **Plain-text bank account numbers** for the four donate methods. Blocks M3 (or ships M6 with image fallback per R1).
3. **Chapa keys** if SCV wants Direct API instead of hosted links. Affects M6/M7 scope.
4. **Languages beyond EN+AM?** Blocks M8 if more locales are needed.
5. **Domain registrar access** to swap nameservers / add DNS records. Blocks M10.
6. **Brand assets** — logo SVG, brand guideline (colors, fonts beyond what we read off the current site), high-res photography. Affects M1 quality.
7. **Stakeholder reviewers** — who signs off at the end of M5, M7, M9? Names + emails.
8. **Maintenance ownership post-launch** — does SCV want a retainer, or hand-off after M10?

---

## 14. Day 1 Checklist for Kicking Off in Antigravity

```
[ ] Create empty GitHub repo `selam-children-village`
[ ] In Antigravity, "Open Workspace" on the empty repo
[ ] Drop SELAM_CV_REBUILD_REPORT.md, SELAM_CV_ADMIN_PANEL_SPEC.md,
    this scope doc, and scv-content.zip into `docs/` and `data/`
[ ] Create .agent/PLAN.md from the template in §6
[ ] Spawn the four agents:
      - frontend-agent  (System prompt: "You own src/app/(site) and src/components")
      - cms-agent       (System prompt: "You own src/payload and src/scripts")
      - qa-agent        (System prompt: "You own tests/ and CI workflows")
      - devops-agent    (System prompt: "You own Vercel/Neon/R2/DNS")
[ ] Provision: Vercel project, Neon DB, R2 bucket, Resend API key,
    Plausible site, Cloudflare Turnstile keys, Mailchimp audience
[ ] Set those env vars in Vercel + GitHub secrets
[ ] Hand the orchestrator the M0 task prompt from §7
[ ] Watch the first PR open within ~30 minutes
```

That's it. Each subsequent milestone is a single paste of the `Antigravity task prompt` block, watch the PR open, review the verification artifact, merge.
