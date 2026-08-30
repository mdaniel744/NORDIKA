# NORDIKA Container

Production-oriented Next.js 16 storefront for NORDIKA Container GmbH. The public site is server-rendered and localized in German, English, Dutch, Italian, Czech, and Spanish. Product data and imagery are application-owned, and locally received enquiries and orders are stored outside the tracked source tree.

## Requirements

- Node.js 20.9 or newer
- npm

## Local development

```bash
npm ci
copy .env.example .env.local
npm run dev -- --port 3001
```

Open `http://127.0.0.1:3001/de`. The root URL redirects permanently to German. Other entry points are `/en`, `/nl`, `/it`, `/cs`, and `/es`.

The catalogue is maintained in `lib/catalog-data.ts`. Enquiries and orders are validated by the server and saved as individual JSON files in `.data/submissions`. The directory contains personal customer information and must never be committed or exposed publicly. `NORDIKA_SUBMISSIONS_DIR` can point to another private server directory when needed.

## Quality checks

```bash
npm run translation:audit
npm run typecheck
npm run lint
npm run build
npm run test:smoke
```

The production build pre-generates localized home, catalogue, category, guide, location, legal, and product URLs. Filtered/search URLs receive an `X-Robots-Tag: noindex, follow` response header and retain the clean catalogue canonical.

## Runtime and deployment

This app requires a Next.js-capable Node.js or container host; it is not a static Vite bundle. Use either:

```bash
npm run build
npm run start
```

or build the included Docker image. `next.config.ts` enables standalone output for a minimal production runtime. Put a reverse proxy or managed Next.js platform in front of self-hosted instances and configure `NEXT_PUBLIC_SITE_URL` with the final canonical origin before building.

Required production variables are documented in `.env.example`. Catalogue reads are local; enquiry and order creation are validated through `/api/enquiries` and `/api/orders`. For a container deployment, mount persistent storage at `/app/.data` so submissions survive container replacement. Before an internet launch, connect these routes to the company-approved durable CRM, database, or email workflow.

## Important launch checks

- Legally verify the supplied Hamburg and Pinneberg register entries, EUID and VAT ID before publishing; add the authorised representative once confirmed.
- Confirm delivery pricing, accepted payment methods, business hours, and consumer-policy wording with NORDIKA Container GmbH.
- Verify the final DNS/canonical origin and submit `/sitemap.xml` in the relevant search consoles.

## Project layout

- `src/app/` — Next.js App Router pages, metadata routes, and enquiry API
- `components/` — server and client UI components
- `lib/` — locale, routing, catalogue, content, product, and site utilities
- `public/` — NORDIKA brand and product imagery
- `tests/` — storefront smoke coverage
