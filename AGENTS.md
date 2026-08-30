# AGENTS.md

## Project Context

This is a self-contained Next.js App Router storefront. Treat it as user-owned application code, keep changes focused on the user's request, and preserve existing project conventions.

Start with `README.md` for local setup, environment variables, and publish workflow.

## Key Files

- `src/app/`: localized Next.js routes, metadata routes, and server enquiry API.
- `components/`: server and client UI components.
- `lib/`: routing, translations, local catalogue data, submission storage, and domain utilities.
- `.env.local`: local-only environment values; never commit secrets.

## Working Notes

- Use `npm run dev` for frontend development.
- Use `npm run build` followed by `npm run start` to verify the standalone production runtime.
- Keep public product reads on the server and validated enquiry writes behind `/api/enquiries`.
- Keep catalogue data application-owned and submission storage server-side. Do not add an unapproved client SDK, customer-account UI, or restore a retired prototype frontend.
- Run the relevant checks from `package.json` before finishing code changes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
