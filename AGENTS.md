# AGENTS.md

## Project Context

This is a Next.js App Router storefront connected to an existing Base44 backend. Treat it as user-owned application code, keep changes focused on the user's request, and preserve existing project conventions.

Start with `README.md` for local setup, environment variables, and publish workflow.

## Base44 References

- CLI overview: https://docs.base44.com/developers/references/cli/get-started/overview.md
- Agent skills: https://docs.base44.com/developers/backend/overview/skills.md

If your agent supports Agent Skills, install or update Base44 skills before Base44-specific work:

```bash
npx skills add base44/skills
```

## Key Files

- `src/app/`: localized Next.js routes, metadata routes, and server enquiry API.
- `components/`: server and client UI components.
- `lib/`: routing, translations, Base44 catalogue access, and domain utilities.
- `legacy/vite-app/`: inactive archive of the pre-migration Vite frontend.
- `.env.local`: local-only environment values; never commit secrets.

## Working Notes

- Use `npm run dev` for frontend development against the hosted Base44 backend.
- Use `npm run build` followed by `npm run start` to verify the standalone production runtime.
- Keep public product reads on the server and validated enquiry writes behind `/api/enquiries`.
- Use the Base44 CLI only for Base44 entity or backend work; do not reintroduce the Vite frontend.
- Run the relevant checks from `package.json` before finishing code changes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
