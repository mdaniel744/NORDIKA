# NORDIKA Container

Production-oriented Next.js 16 storefront for NORDIKA Container GmbH. The public site is server-rendered and localized in German, English, Dutch, Italian, Czech, and Spanish. Product data and enquiry submissions remain connected to the existing Base44 catalogue.

## Requirements

- Node.js 20.9 or newer
- npm
- Network access to `https://base44.app` and `https://media.base44.com`

## Local development

```bash
npm ci
copy .env.example .env.local
npm run dev -- --port 3001
```

Open `http://127.0.0.1:3001/de`. The root URL redirects permanently to German. Other entry points are `/en`, `/nl`, `/it`, `/cs`, and `/es`.

The committed app ID points to the existing public catalogue. Override it in `.env.local` only when working against a different Base44 environment. Do not commit access tokens or other secrets.

## Quality checks

```bash
npm run translation:audit
npm run typecheck
npm run lint
npm run build
npm run test:smoke
```

The production build pre-generates localized home, catalogue, category, guide, location, legal, and product URLs. Catalogue data is revalidated every 15 minutes. Filtered/search URLs receive an `X-Robots-Tag: noindex, follow` response header and retain the clean catalogue canonical.

## Runtime and deployment

This app requires a Next.js-capable Node.js or container host; it is not a static Vite bundle. Use either:

```bash
npm run build
npm run start
```

or build the included Docker image. `next.config.ts` enables standalone output for a minimal production runtime. Put a reverse proxy or managed Next.js platform in front of self-hosted instances and configure `NEXT_PUBLIC_SITE_URL` with the final canonical origin before building.

Required production variables are documented in `.env.example`. The Base44 catalogue is public; enquiry creation is validated and proxied through the server route at `/api/enquiries`.

## Important launch checks

- Legally verify the supplied Hamburg and Pinneberg register entries, EUID and VAT ID before publishing; add the authorised representative once confirmed.
- Confirm delivery pricing, accepted payment methods, business hours, and consumer-policy wording with NORDIKA Container GmbH.
- Verify the final DNS/canonical origin and submit `/sitemap.xml` in the relevant search consoles.
- Confirm Base44 email/password, Google sign-in, reset-password callback URLs, and any MCP OAuth consent callback against the final production origin.

## Project layout

- `src/app/` — Next.js App Router pages, metadata routes, and enquiry API
- `components/` — server and client UI components
- `lib/` — locale, routing, catalogue, content, product, and site utilities
- `base44/entities/` — existing Base44 entity definitions
- `legacy/vite-app/` — read-only archive of the verified pre-migration Vite frontend

Only the Next.js app is active. The archive is retained for traceability and is not installed, built, or served.
