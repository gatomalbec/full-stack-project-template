# full-stack-project-template

FastAPI backend + React/TypeScript frontend with a fast toolchain and a contract-first API flow.

## Stack

- Backend: FastAPI, uv, Ruff, pytest (Maelstrom optional)
- Frontend: React, TypeScript, Vite, Biome, Vitest, Playwright
- Contract: FastAPI OpenAPI -> generated TS client (`frontend/src/client`)

## First-time setup

```bash
make install
```

## Run locally

```bash
make run
```

- Frontend: http://127.0.0.1:5173
- Backend: http://127.0.0.1:8000

## Commands

```bash
make check-fast   # contract + unit tests + lint + build
make check        # full check (includes e2e)
make fix          # auto-fix lint/format where possible
```

## Contract-first workflow

If backend API schema changes:

```bash
make generate-client
make check-contract
```

Commit generated artifacts too:

- `backend/openapi.json`
- `frontend/src/client/**`

Do not manually edit generated client files.

## Tests

- Backend: `backend/tests/`
- Frontend unit: `frontend/src/*.test.tsx`
- E2E: `frontend/e2e/`

## CI

GitHub Actions (`.github/workflows/ci.yml`):

1. `check-fast`
2. `e2e`

## Repo layout

```text
backend/
  app/main.py
  scripts/export_openapi.py
  openapi.json
  tests/
frontend/
  src/api.ts
  src/client/   # generated
  src/App.tsx
  src/App.test.tsx
  e2e/
Makefile
AGENTS.md
CLAUDE.md -> AGENTS.md
```
