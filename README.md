# My Portfolio

V1.0.0.1

My Portfolio is a personal website built with [Next.js](https://nextjs.org) to showcase my professional experience, projects, and skills. It features a modern UI, dynamic project data, and optimized image handling using remote sources and a custom CMS. The site is fully responsive and leverages the latest Next.js features for performance and SEO.

## 📦 Installation

Before starting the development server, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## 🚀 Getting Started

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the main page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 📁 Project Structure

- `/src/app`: Main application pages and routes
- `/src/components`: Reusable UI components
- `/public`: Static assets (images, 3D models, etc.)
- `/src/content`: Typed, server-only copy (pages, services, case studies in `src/content/projects`)
- `/src/i18n`: Route map (`routes.ts`), redirects, SEO helpers and the UI dictionary
- `/public/projects`: Project images and resources

## 🔐 Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `EMAIL_USER`, `EMAIL_PASS` | server | Gmail account (app password) that sends the contact form notifications |
| `RECAPTCHA_SECRET_KEY` | server | reCAPTCHA secret used by `/api/contact` to verify tokens |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | public | reCAPTCHA site key. **Set it in Vercel** (Project Settings > Environment Variables). If it is missing, the form falls back to the public key that was hard-coded before, so production keeps working, but the key should live in configuration |
| `NEXT_PUBLIC_GA_ID` | public | Optional. Enables Google Analytics and mirrors the contact events to `gtag` |

Contact events (`contact_submit`, `contact_link_click`) are sent through Vercel Analytics with only the event name, project type, channel and locale. No names, emails or message text.

The contact API rate limit (5 requests per 10 minutes per IP) lives in process memory, so on serverless it is best-effort; reCAPTCHA is the real gate.

## 🛠️ Main Dependencies

This project uses the following main libraries:

**Runtime:**
- next
- react
- react-dom
- next-themes
- framer-motion
- react-hook-form
- react-icons
- react-intersection-observer
- classnames
- nodemailer
- @vercel/analytics
- @vercel/speed-insights

**Development:**
- typescript
- tailwindcss
- eslint
- eslint-config-next
- @types/* (TypeScript type definitions)

For the full list, see `package.json`.