PYTHON_BIN ?= python3
FRONTEND_DIR := mintlabs-lucky-frontend
BACKEND_DIR := mintlabs-lucky-api

.PHONY: lint lint-backend lint-frontend format format-backend format-frontend format-check format-check-backend format-check-frontend \
        test test-backend test-frontend coverage

lint: lint-backend lint-frontend

lint-backend:
	cd $(BACKEND_DIR) && ruff check app tools
	cd $(BACKEND_DIR) && black --check app tools

lint-frontend:
	npm --prefix $(FRONTEND_DIR) run lint

format: format-backend format-frontend

format-backend:
	cd $(BACKEND_DIR) && black app tools
	cd $(BACKEND_DIR) && ruff check --fix --exit-zero app tools

format-frontend:
	npm --prefix $(FRONTEND_DIR) run format

format-check: format-check-backend format-check-frontend

format-check-backend:
	cd $(BACKEND_DIR) && black --check app tools
	cd $(BACKEND_DIR) && ruff check app tools

format-check-frontend:
	npm --prefix $(FRONTEND_DIR) run format:check

coverage:
	cd $(BACKEND_DIR) && pytest --cov=app --cov-report=term-missing

test: test-backend test-frontend

test-backend:
	cd $(BACKEND_DIR) && pytest

test-frontend:
	npm --prefix $(FRONTEND_DIR) run test:e2e
