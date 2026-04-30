# Selam Children's Village — Admin Panel / Dashboard Spec

Companion to `SELAM_CV_REBUILD_REPORT.md`. This document specifies the **admin panel** that staff at SCV (and you) will use to run the new Next.js site end-to-end.

---

## 0. TL;DR — What the admin panel must do

1. **Edit every page and dynamic record** from the public site (news, projects, team, events, jobs, gallery, publications, departments, settings).
2. **Receive and process every form submission** (volunteer applications, contact messages, job applications, newsletter subscribes).
3. **Manage donations** — bank account info, Chapa links, donation records (if Chapa Direct API is integrated), donor receipts.
4. **Run the site bilingually** (English + Amharic), with side-by-side translation.
5. **Control who can do what** — roles, permissions, audit log.
6. **Stay safe** — backups, drafts, scheduled publishing, content versioning.

---

## 1. Recommended Stack for the Admin Panel

You have three realistic paths. Pick one before building.

| Option | What it is | Pros | Cons | Recommendation |
|---|---|---|---|---|
| **A. Payload CMS v3** (self-hosted, runs *inside* the same Next.js app) | Open-source headless CMS in TypeScript. Uses Postgres or MongoDB. Admin UI is auto-generated from your schemas. | One repo, one deployment. Full ownership. Free. Custom React fields. Built-in auth, roles, drafts, versions, localization, file uploads, REST + GraphQL. Perfect fit for a site this size. | You host it (Vercel + Neon Postgres + Cloudflare R2 = easy). | **Recommended.** |
| **B. Sanity** (hosted) | SaaS headless CMS. Admin "Studio" is a separate React app you embed at `/studio`. | Fastest to ship. Free tier generous. Beautiful real-time collab. | Vendor lock-in, content lives on Sanity's infra, less control over forms/donations dashboards (you'd build those separately in Next.js). | Good if SCV wants zero ops. |
| **C. Custom-built admin** in Next.js (`/admin/*`) backed by Postgres + Prisma + NextAuth | You write every page yourself. | Full control, exact UX. | Months of work that Payload gives you for free. | Don't, unless A and B are ruled out. |

The rest of this doc is **stack-agnostic** — every section describes *what the admin must do*. I'll mark **(custom)** the few things you'd still need to build on top of Payload/Sanity (because no CMS ships them).

---

## 2. Top-level Navigation (left sidebar of the admin)

```
SELAM CV ADMIN
─────────────────────────────────────
🏠  Dashboard
✏️  Content
     ├─ Pages
     ├─ News
     ├─ Projects
     ├─ TVET Departments
     ├─ Team / People
     ├─ Events
     ├─ Jobs
     ├─ Gallery
     ├─ Publications
     ├─ Testimonials
     └─ Partners
📩  Inbox                       ← form submissions
     ├─ Volunteer applications
     ├─ Contact messages
     ├─ Job applications
     └─ Newsletter subscribers
💰  Donations
     ├─ Bank accounts
     ├─ Chapa & GoFundMe links
     ├─ Donation records
     └─ Receipts / thank-yous
🌐  Site
     ├─ Header & footer menus
     ├─ Homepage hero (slider)
     ├─ Site settings
     ├─ Redirects
     └─ SEO defaults
🌍  Translations (EN / AM)
📊  Analytics            ← embedded Plausible
👥  Users & Roles
🛠   Tools
     ├─ Media library
     ├─ Audit log
     ├─ Backups & exports
     └─ Webhooks / integrations
```

---

## 3. Dashboard (home screen)

When an admin logs in they land here. KPIs and shortcuts.

**Top row — KPI cards:**
- Visitors today / this month (from Plausible API)
- New donations this month (count + total ETB + total USD)
- Open volunteer applications (status = `new`)
- Open contact messages (status = `unread`)
- Active job openings + applications received
- Newsletter subscribers (total / new this month)

**Middle — Recent activity feed:**
- Latest 10 form submissions (any type), latest 5 published posts, latest 5 donations, last 5 admin edits.

**Right rail — Quick actions:**
- "Write news post" → opens new Post editor
- "Add event" / "Post a job" / "Add project"
- "Send newsletter campaign" (if Mailchimp/Resend integrated)
- "Toggle site banner" (e.g. "We're hiring", emergency appeal)

**Health strip (bottom):**
- Build status (last deploy time, success/fail) — pulled from Vercel deploy hook
- CMS API ping
- Webhook delivery health (Chapa, newsletter provider)

---

## 4. Content Section — controls per collection

For every collection: list view, create/edit form, draft + publish, scheduled publish, soft delete (Trash) with restore, search, filter, bulk actions, version history, role-aware permissions, and SEO panel.

### 4.1 Pages
Static-ish pages: About, Who We Are, Our History, Vision/Mission, How to Help, every TVET department landing, every project landing, the publication hubs.

**Fields:** title (EN/AM), slug, hero (image + overlay copy), body (block editor: paragraphs, headings, images, video embed, accordion, tabs, CTA, columns, KPI counters, divider, gallery, button), seo (meta title, meta description, OG image, noindex toggle), status (draft / published / scheduled).

**List view columns:** title, slug, status, last edited by, last edited at.

**Filters:** status, locale, has-translation, edited-by.

**Bulk actions:** publish, unpublish, archive.

### 4.2 News (Posts)
**Fields:** title, slug (auto from title, editable), publish date, cover image, excerpt, body (block editor), category (default `news`), tags (free-form), author (Person reference), featured (bool, shows on home), seo block.

**List columns:** title, date, status, author, views (Plausible), comments count (if you ever enable comments).

**Special controls:**
- "Pin to homepage" toggle (max 3 pinned).
- "Republish" button (updates `updatedAt`, triggers ISR revalidation).
- Per-post share preview (renders OG card live).

### 4.3 Projects
The 9 program/project items + 6 named projects (LI-WAY, BINA, BRIDGE, PASEWAY, EYE, Public Private Partnership).

**Fields:** title, slug, group (`CYC` / `Community Support` / `TVET` / `Project`), status, cover, body, alignment-with-SDGs (multi-select 1-17 with icons), KPIs (repeatable: label, value, suffix, year), gallery (multi-image), donate URL (defaults to /donate?source=project-slug), order (drag-handle), seo.

**List columns:** title, group, status, KPI count, image, order.

**Special controls:** drag-and-drop reorder of cards on the homepage / `/all-projects/`.

### 4.4 TVET Departments
The 11 departments + the college landing page.

**Fields:** name, slug, dean/head (Person ref), short description, full description (block editor), programs offered (repeater: name, duration, level), entry requirements, gallery, contact (extension number, email).

### 4.5 Team / People
**Fields:** name, role/title, category (`Executive Board` / `Senior Management` / `Extended Management` / `Switzerland Board` — extensible), photo, short bio, full bio (optional block editor), socials (LinkedIn, X, email — each optional), order, status, locale.

**List view:** grouped tabs by category, drag-to-reorder within category.

**Bulk actions:** archive, change category.

### 4.6 Events
**Fields:** title, slug, starts at (datetime), ends at (datetime), all-day toggle, timezone (default `Africa/Addis_Ababa`), location (name, address, lat/lng, optional Google Maps embed override), cover, body, register URL or "Register here" form, capacity (optional), is recurring (RRULE — keep this v2), tags, seo.

**List view:** calendar view + table view toggle. Filters: upcoming / past / this month, tag.

**Special controls:**
- "Duplicate event" (for annual events).
- "Generate ICS" download button.
- "Cancel event" (status flips, banner appears on public page).

### 4.7 Jobs
**Fields:** title, slug, department (link to TVET / non-TVET dept), location, job type (Full-time / Part-time / Contract / Volunteer / Internship), seniority, salary range (optional, with currency), deadline (date), description (block editor), responsibilities, requirements, benefits, apply mode (`form` / `email` / `external URL`), apply email or URL, status (open / closed / draft / archived), is featured, seo (Google Jobs schema).

**List view:** title, department, deadline, applications count (badge), status.

**Special controls:**
- "Duplicate job" for repeated openings.
- "Close job" sets status and stops new applications.
- Per-job applications drawer.

### 4.8 Gallery
**Fields:** title, slug, cover, images (multi-upload with caption + alt per image, drag reorder), category (optional taxonomy), date.

### 4.9 Publications
PDFs grouped by type.

**Fields:** title, type (`newsletter` / `magazine` / `annual report` / `audit report` / `policy`), year, cover image, PDF file, summary, language, public toggle (some policy docs may be private).

**Special controls:** download counter (track how many times each PDF was downloaded — needs a `/api/publications/[slug]/download` redirect endpoint that increments before serving).

### 4.10 Testimonials
**Fields:** name, photo, role/affiliation, quote, source (where they said it), date, order, featured.

### 4.11 Partners
**Fields:** name, logo, URL, partnership type (Funder / Implementing / Government / Corporate), since (year), order.

### 4.12 Block / Section library (shared)
Reusable blocks the editors can drop into any page: hero with CTA, two-column text+image, KPI counter row, testimonial slider, project cards row, news cards row, partner logo wall, donate-now banner, video embed, accordion, tabs, gallery grid, image with caption, quote, downloadable file. Each block has its own component in the Next.js app and a corresponding admin schema.

---

## 5. Inbox — Form Submissions

This is where staff *do their job*, so design it well.

### 5.1 Volunteer applications
Captured from `/become-a-volunteer/`.

**Columns:** name, email, country, city, applied at, status, assigned to.

**Statuses:** `new` → `reviewing` → `interview` → `accepted` / `rejected` / `withdrawn`.

**Detail drawer:** all submitted fields, optional internal notes (rich text), tag chips (e.g. "translator", "medical", "long-term"), assignment to a staff user, status timeline, "Send reply" button (opens a templated email composer using Resend), "Export as CSV" of selected.

**Bulk actions:** change status, assign, export CSV, delete.

**Spam:** Turnstile already filters bots; provide a "Mark as spam" action that hides + reports.

### 5.2 Contact messages
**Columns:** name, email, subject, received at, status (`unread` / `read` / `replied` / `archived`).

**Detail:** message body, internal notes, "Reply" button (Resend, threaded by email), forward to another team email.

### 5.3 Job applications
**Columns:** job title, applicant name, email, applied at, has CV (file icon), status (`new` / `screening` / `shortlisted` / `interview` / `offered` / `hired` / `rejected`), assigned to.

**Detail:** all form fields, CV download (signed S3/R2 URL with 1-hour expiry — never expose the bucket), cover letter, internal scorecard (5-star rubric customizable per job), interview notes, decision.

**Bulk actions:** advance status, assign, export to CSV, delete.

### 5.4 Newsletter subscribers
**Columns:** email, locale, source page, subscribed at, status (`pending` / `confirmed` / `unsubscribed` / `bounced`).

**Actions:** resend confirmation, manually add subscriber, export CSV, sync to Mailchimp/Resend Audiences (button to push the list).

**Compose campaign (custom)** — if you self-host: subject, sender, segment filter, HTML body (template editor), schedule at, send test to a single email, send to segment. If you use Mailchimp, just deep-link to the Mailchimp campaign builder.

---

## 6. Donations Section

### 6.1 Bank accounts
The thing that today is just *images of bank slips*. We turn it into structured records.

**Fields:** bank name, branch, account name, account number, currency (ETB / USD / EUR / …), SWIFT code (for international), Tele Birr short code, instructions (rich text), logo (image), order, public toggle.

**List columns:** bank, account name, account number, currency, public toggle.

**On the public site:** these render as cards with copy-to-clipboard buttons. Editing here updates the public donate page on next ISR cycle (or instant via `/api/revalidate`).

### 6.2 Chapa & GoFundMe links
Singleton settings:
- Chapa ETB donation URL (current: `https://chapa.link/donation/view/DN-7e5lUodNN6lL`)
- Chapa USD donation URL (current: `https://chapa.link/donation/view/DN-SIQR7rmPsCxL`)
- GoFundMe URL
- Chapa Direct API toggle (on/off) + Chapa secret key (encrypted secret)
- Default donation amounts (e.g. $25, $50, $100, $250, custom) for the on-site form
- Default project allocations (multi-select of Project records donors can route to)

### 6.3 Donation records (only if Chapa Direct API is enabled)
**Columns:** donor name, email, amount, currency, gateway (Chapa / GoFundMe / Bank), allocated project, status (`pending` / `successful` / `failed` / `refunded`), reference, date.

**Detail:** full transaction (gateway response, IP, UA), receipt PDF download, "Send thank-you email" button.

**Filters:** date range, currency, project, gateway, status, amount range.

**Bulk actions:** export CSV, generate annual giving report (PDF) per donor, send year-end receipts to all donors.

**Imports:** CSV upload of offline bank-deposit donations so SCV can keep total giving accurate (someone deposits at CBE → Resource Mobilization staff records it here → donor gets a thank-you).

### 6.4 Receipts / thank-you templates
Editor for the email template sent on each successful donation (subject, EN body, AM body, signature, logo).

---

## 7. Site Section

### 7.1 Header & footer menus
Drag-and-drop tree editor for the mega menu (multi-level). Each item: label (EN/AM), URL or page reference, icon (optional), open in new tab, role-restriction (e.g. "only show 'Admin' to logged-in admins"). Same editor for the footer columns.

### 7.2 Homepage hero (slider)
Repeater of slides: image / video, title (EN/AM), subtitle (EN/AM), CTA label + URL, alignment (left/center/right), text color, overlay opacity, display schedule (start/end date — auto-rotate seasonal campaigns), is active.

### 7.3 Site settings
Singleton document.
- Site title, tagline (EN/AM)
- Logo (light + dark)
- Favicon
- Contact: address, phones (repeater with label like "Head Office", "Resource Mobilization"), email, P.O. Box
- Social links (Facebook, Instagram, X/Twitter, YouTube, LinkedIn, TikTok, Telegram)
- Map (lat, lng, embed URL)
- Default OG image
- Google Analytics / Plausible site ID
- Cookie banner copy (EN/AM)
- Maintenance mode toggle (locks public site to a "We'll be right back" page)

### 7.4 Redirects (custom)
For migrating old WP slugs to new ones without losing SEO.

**Fields:** from (regex toggle), to, http code (301 / 302), is active, hits counter (read-only).

### 7.5 SEO defaults
Default meta title pattern (e.g. `{title} – Selam Children's Village`), default description, robots.txt editor, sitemap-exclusion list.

---

## 8. Translations (EN / AM)

A dedicated workspace because bilingual is a core requirement.

**Per-document side-by-side editor:** EN on the left, AM on the right, lock-in fields that don't translate (slug, dates, numbers). Field-level "Mark as translated" toggle, "Auto-translate draft" button (calls Google Translate / DeepL — *draft only*, must be human-reviewed before publish).

**Glossary:** terms that must always translate the same way (e.g. "Family Model Village", "TVET", department names) — the auto-translate respects this glossary.

**Translation queue:** all documents missing AM versions, sorted by traffic. Lets a translator power through.

---

## 9. Users & Roles

Built-in to Payload/Sanity, plus our own role definitions.

| Role | Can do |
|---|---|
| **Super Admin** | Everything, including roles & integrations & audit log purge |
| **Admin** | Everything except role/integrations/audit purge |
| **Editor** | All Content collections (CRUD), can publish, can manage Inbox, cannot edit Site settings or Donations or Users |
| **Author** | Can create + edit own drafts, cannot publish, can read Inbox (no delete) |
| **Translator** | Can edit AM fields only, cannot publish |
| **Fundraiser** | Donations + Inbox (volunteer/contact) full access; Content read-only |
| **HR** | Jobs collection + Job applications full access; nothing else |
| **Viewer** | Read-only across the panel |

Each user: name, email, avatar, role, last login, 2FA enabled (required for Admin and Super Admin), API tokens.

**Auth:** email + password with mandatory 2FA (TOTP) for elevated roles, optional Google SSO for staff with `@selamchildrenvillage.org` (or whichever domain SCV uses).

**Lockout:** 5 failed logins → 15 min cooldown, IP rate-limited.

---

## 10. Tools

### 10.1 Media library
Central asset browser — all uploaded images, PDFs, videos. Filters by type / collection / uploader. Bulk-replace, find-and-replace alt text, find-unused (assets not referenced anywhere — shows reclaimable storage), compress / re-encode (run through `sharp` or Cloudflare Images).

### 10.2 Audit log
Every admin action: who, what, when, before/after diff. Filter by user, collection, date. Export CSV. Retain 12 months minimum.

### 10.3 Backups & exports
- Nightly full DB snapshot (Neon / Supabase do this for free).
- Manual "Export everything" button → ZIP of JSON per collection + media manifest.
- Per-collection CSV export with field selection (for newsletter list, donor list, volunteer list, etc.).
- Restore from backup (Super Admin only, requires re-auth).

### 10.4 Webhooks / integrations
Toggleable per integration, each with its own settings page.

| Integration | What it does | Required secret |
|---|---|---|
| **Resend / Postmark** | Sends transactional email (form replies, donor receipts, subscribe confirmations) | API key |
| **Mailchimp / MailerLite / Resend Audiences** | Newsletter list of record | API key + List/Audience ID |
| **Chapa** | Donation gateway (only if using Direct API) | Public key, Secret key, Webhook secret |
| **Plausible** | Embedded analytics + KPI feed | Site ID + read-only API key |
| **Vercel** | Build/deploy hooks for ISR + on-publish redeploy | Deploy hook URL |
| **Cloudflare Turnstile** | Bot protection on all public forms | Site key + Secret |
| **Slack / Telegram** | Notifications when a new volunteer / job app / donation arrives | Webhook URL |
| **Google Translate / DeepL** | AM auto-translate drafts | API key |

Each integration page: status badge (connected / failing / disabled), "Test" button, last 10 events with timestamp + result, ability to rotate the secret without downtime.

### 10.5 Search re-index (custom)
"Rebuild search index" button (re-runs Pagefind / pushes to Algolia). Auto-runs on publish; the button is for emergencies.

### 10.6 Cache & ISR control
"Revalidate path" input — paste a URL or `/news-updates/[slug]`, click Revalidate, hits `/api/revalidate` with the secret. Useful when staff fix a typo and want it live now.

---

## 11. Cross-cutting UX rules (applies everywhere)

1. **Drafts by default.** Nothing goes to the public site until status flips to `published`. Show a yellow "Draft" pill in the editor.
2. **Live preview pane.** Side-by-side preview rendered by the actual Next.js frontend in draft mode.
3. **Scheduled publish.** Pick a future datetime; a cron job (Vercel cron / GitHub Actions) flips status at the right moment.
4. **Version history + restore** on every collection. 50 versions retained.
5. **Soft delete (Trash) + 30-day restore window.** Hard delete only by Admin.
6. **Required fields** highlighted; save fails with inline errors.
7. **Unsaved-changes warning** when navigating away.
8. **Slug auto-generation** with manual override; warn if slug collides.
9. **SEO panel collapsible** at the bottom of every editable record.
10. **Locale switcher** in the top bar of every record (EN ⇄ AM) without losing unsaved EN changes.
11. **Mobile-friendly admin** — staff often check submissions on phones.
12. **Keyboard shortcuts:** `⌘S` save, `⌘P` publish, `⌘K` global search, `?` cheat sheet.
13. **Global search (⌘K)** finds across all collections + form submissions.
14. **Activity sidebar on every record:** comments, mentions (`@editor`), revision history.

---

## 12. Page-by-page admin → public-site mapping

So you can see exactly what each admin screen drives.

| Public route | Admin location |
|---|---|
| `/` | Site → Homepage hero · Content → Projects (featured) · Content → News (latest 3) · Content → Events (upcoming 3) · Content → Team · Content → Testimonials · Content → Partners · Site Settings (newsletter copy) |
| `/about/`, `/who-we-are/`, `/our-history/`, `/vision-mission-core-values/`, `/how-to-help/` | Content → Pages |
| `/executive-board-members/`, `/senior-management-team/`, `/extended-management-team/`, `/board-switzerland/` | Content → Team (filtered by category) |
| `/all-projects/` and each `/<project>/` | Content → Projects |
| `/technical-vocational-training/` and each `/<department>/` | Content → TVET Departments |
| `/news-updates/` and `/<post-slug>/` | Content → News |
| `/event-calendar/` and `/<event-slug>/` | Content → Events |
| `/job-openings/` and `/<job-slug>/` | Content → Jobs |
| `/gallery/` and `/<gallery-slug>/` | Content → Gallery |
| `/publication/`, `/newsletter-magazine/`, `/annual-report/`, `/audit-report/`, `/policies-guidelines/` | Content → Publications + Content → Pages (hubs) |
| `/donate/` | Donations → Bank accounts · Donations → Chapa & GoFundMe links · Content → Pages (hero copy) |
| `/become-a-volunteer/` (form) | Inbox → Volunteer applications |
| `/contact-us/` (form) | Inbox → Contact messages · Site Settings (address/phones/map) |
| Newsletter footer form | Inbox → Newsletter subscribers |
| Header / footer menus | Site → Header & footer menus |
| 404, search, sitemap | Site → SEO defaults · Tools → Search re-index |

---

## 13. Build effort & roadmap

If you go with **Payload v3** (recommended), you get for free: auth, roles, audit (via plugin), drafts, versions, localization, file uploads, REST + GraphQL, admin UI. You write **schemas**, not screens.

Phased rollout (one developer):

| Phase | Scope | Time |
|---|---|---|
| 1. Schemas | All collections in §4–§7 | 1 week |
| 2. Auth + roles | Roles in §9, 2FA | 2 days |
| 3. Inbox dashboards (custom views) | Volunteer / Contact / Job application detail UIs, status flows, CSV export | 1 week |
| 4. Donations module | Bank accounts editor, Chapa settings, donation records (if Direct API), receipts | 1 week |
| 5. Translations workspace | Side-by-side editor, glossary, queue | 3 days |
| 6. Tools | Audit log, backups, integrations pages, ISR revalidate, redirects | 4 days |
| 7. Dashboard home | KPI cards, activity feed, quick actions, health strip | 3 days |
| 8. Content seeding | Import from WP REST API into Payload (script) | 2 days |
| 9. Polish + 2FA + permissions audit | | 2 days |

**Total:** ≈ 4–5 weeks, in parallel with the public-site build.

---

## 14. Things to confirm with SCV before building the admin

1. Number of staff users and rough roles → drives the role matrix in §9.
2. Whether the donate flow stays as Chapa hosted links (simpler) or becomes Chapa Direct API (richer admin, allows the Donation records collection in §6.3).
3. Newsletter provider of choice (Mailchimp vs. MailerLite vs. Resend Audiences vs. self-hosted) → drives §10.4 integrations.
4. Whether SCV wants offline cash/bank donations entered into the admin to track total giving (yes is recommended).
5. Email domain for staff SSO (e.g. `@selamchildrenvillage.org`).
6. Languages besides English + Amharic? (Tigrinya, Oromo, French often requested by Ethiopian NGOs.)
7. Hosting preference — Vercel (default) vs. self-host on a VPS.
8. PII / data-retention policy for form submissions (default: 24 months, then auto-archive).
