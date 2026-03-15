.PHONY: install run run-backend run-frontend generate-client check-contract check-fast check-full check fix test backend-test frontend-test e2e

install:
	cd backend && uv sync --group dev
	cd frontend && pnpm install
	cd frontend && pnpm exec playwright install chromium

run: run-frontend

run-backend:
	cd backend && uv run uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

run-frontend:
	( cd backend && uv run uvicorn app.main:app --host 127.0.0.1 --port 8000 ) & \
	BACKEND_PID=$$!; \
	trap 'kill $$BACKEND_PID' EXIT; \
	cd frontend && pnpm dev --host 127.0.0.1 --port 5173

generate-client:
	cd backend && uv run python scripts/export_openapi.py
	cd frontend && pnpm generate:client

check-contract:
	$(MAKE) generate-client
	git diff --exit-code -- backend/openapi.json frontend/src/client

check-fast: check-contract backend-test frontend-test
	cd backend && uv run ruff format --check . && uv run ruff check .
	cd frontend && pnpm lint && pnpm build

check-full: check-fast e2e

check: check-full

fix:
	cd backend && uv run ruff format . && uv run ruff check --fix .
	cd frontend && pnpm lint:fix

test: backend-test frontend-test e2e

backend-test:
	@if command -v maelstrom >/dev/null 2>&1; then \
		cd backend && maelstrom pytest; \
	else \
		cd backend && uv run pytest; \
	fi

frontend-test:
	cd frontend && pnpm test

e2e:
	cd frontend && pnpm e2e
