# AGENTS.md

Instructions for coding agents working in this repo.

## Scope and precedence

- This file is the root instruction file for the repository.
- `CLAUDE.md` is a symlink to this file.
- If nested `AGENTS.md` files are added later, the nearest one to the edited files should take precedence.

## Project summary

- Full-stack template:
  - `backend/`: FastAPI + uv + Ruff + pytest
  - `frontend/`: React + TypeScript + Vite + Biome + Vitest + Playwright
- API contract is backend OpenAPI.
- Frontend client is generated from that contract.

## Canonical commands

- Install deps: `make install`
- Run app: `make run`
- Generate contract/client: `make generate-client`
- Verify contract artifacts are current: `make check-contract`
- Fast checks: `make check-fast`
- Full checks (includes e2e): `make check`
- Auto-fix lint/format: `make fix`

## Required workflow rules

1. Keep changes focused and minimal.
2. Do not hand-edit generated files under `frontend/src/client/**`.
3. If backend API schema/response changes:
   - run `make generate-client`
   - commit both:
     - `backend/openapi.json`
     - `frontend/src/client/**`
4. Before marking done:
   - always run `make check-fast`
   - run `make check` when UI, integration, proxy, or e2e behavior changed

## File map (high-signal)

- `backend/app/main.py`: FastAPI app and routes
- `backend/scripts/export_openapi.py`: OpenAPI export script
- `backend/openapi.json`: generated API contract
- `frontend/src/api.ts`: app-level API wrapper over generated client
- `frontend/src/client/**`: generated TypeScript client
- `.github/workflows/ci.yml`: CI (`check-fast`, then `e2e`)
- `Makefile`: source of truth for local/CI commands

## Testing expectations

- Prefer test-first updates where practical.
- Update tests for behavior changes:
  - backend: `backend/tests/`
  - frontend unit: `frontend/src/*.test.tsx`
  - e2e: `frontend/e2e/`

## Guardrails

- Prefer existing dependencies/patterns over introducing new ones.
- Avoid broad refactors unless explicitly requested.
- If uncertain about behavior, add/adjust a test to make it explicit.
