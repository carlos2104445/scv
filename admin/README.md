# SCV Admin — Content Management System

Internal CMS for Selam Children's Village at `internal.selamchildrenvillage.org`.

## Features

- **Content Management** — News, Projects, Events, Jobs, People, Gallery, Publications, Testimonials, Partners, Pages, Departments
- **Media Library** — Image/PDF uploads with auto-crop (4:5 portrait, sharp)
- **Inbox** — Volunteer applications, contact messages, job applications, newsletter subscribers
- **Donations** — Bank account management and payment settings
- **Site Settings** — Hero slides, announcements, SEO settings, social links
- **Role-Based Access Control** — 7 roles with granular permissions
- **Rich Text Editor** — TipTap-based WYSIWYG editor

## Roles

| Role | Access |
|------|--------|
| SUPER_ADMIN | Everything + user management |
| ADMIN | Everything + user management |
| EDITOR | Content, Media, Site settings |
| AUTHOR | News, Events, Media |
| FUNDRAISER | Donations, Contacts, Subscribers |
| HR | People, Jobs, Applications |
| VIEWER | Dashboard only |

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and AUTH_SECRET

# 3. Push schema to database
npx prisma db push

# 4. Seed with default admin user
npx prisma db seed
# Default: admin@selamchildrenvillage.org / Admin@SCV2025!

# 5. Run development server
npm run dev   # → http://localhost:3001
```

## API Routes (Public)

The CMS exposes public read-only API routes at `/api/v1/` for the main website to consume:

| Route | Description |
|-------|-------------|
| `/api/v1/news` | Published news articles |
| `/api/v1/news/[slug]` | Single news article |
| `/api/v1/projects` | Published projects |
| `/api/v1/events` | Upcoming events |
| `/api/v1/jobs` | Open job listings |
| `/api/v1/people` | Leadership/staff |
| `/api/v1/partners` | Partner organizations |
| `/api/v1/testimonials` | Testimonials |
| `/api/v1/departments` | TVET departments |
| `/api/v1/hero-slides` | Homepage slides |
| `/api/v1/settings` | Site settings |
| `/api/v1/pages/[slug]` | Static pages |
| `/api/v1/impact-stats` | Impact statistics |
| `/api/v1/timeline` | History timeline |
| `/api/v1/bank-accounts` | Donation bank accounts |

## Deployment

The app runs as a standalone Next.js server on port 3001. Use the provided `nginx/admin.conf` for the `internal.selamchildrenvillage.org` subdomain with SSL via Let's Encrypt.

```bash
npm run build    # → .next/standalone
node .next/standalone/server.js
```

## Tech Stack

- Next.js 16 (App Router, Server Actions)
- PostgreSQL + Prisma ORM
- NextAuth.js v5 (credentials provider)
- TipTap rich text editor
- Sharp for image processing
- Tailwind CSS
