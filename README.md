


# Nodecraft

Nodecraft is a lightweight monorepo designed to accelerate development of Node-backed web applications. It provides a minimal server, a fast frontend, and shared utilities to reduce repetitive setup.

Who it's for: developers who prefer sensible defaults, typed tooling, and a modular structure.

Quick overview:

- `apps/server` — server-side routes and middleware.
- `apps/web` — Vite + React frontend.
- `packages/common` — shared utilities and types.

Get started:

1. Install dependencies:

```bash
npm install
```

2. Run development mode (from the repository root):

```bash
npm run dev
```

3. Open the URL shown in the terminal to view the application.

Project description (chill language):

Nodecraft stitches a small Node server to a Vite + React UI so you can prototype without the usual setup headache. It gives you ready-made routes, simple middleware hooks, and a fast dev loop so changes feel instant. Shared types and helpers keep things tidy — spin it up, wire your logic, and iterate quickly.

Development notes:

- Keep changes small and focused; prefer modular packages and routes over large files.
- Add shared utilities to `packages/common` and keep them typed.
- Use the existing `tsconfig` and linting configuration for consistency.

Contributing:

Open a pull request with a concise description and a focused change. Small, testable improvements are preferred.

License:

Add the license you intend to use and include it in the repository.


## What It Does — Dope Edition

Nodecraft is the low-key engine that connects a nimble Node server with a fast Vite + React frontend so you can move from idea to demo without drama. It keeps the scaffolding light and the defaults smart so you spend less time wrangling setup and more time building.

- Server: ready-to-go routes and middleware to handle auth, webhooks, or background jobs.
- Web: modular UI components and a Vite dev loop that reloads while you iterate.
- Shared: `packages/common` holds utilities and types so you don't duplicate work.

Spin it up, wire your logic, and ship the vibe — small footprint, big flow.

