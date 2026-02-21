# ADR-0001: Set Go Backend as Primary and Freeze API Contract

- Status: Accepted
- Date: 2026-02-20
- Decision owner: Backend/API team

## Context

This repository currently contains two backend implementations:

- `backend/` (Go + Gin + GORM)
- `workers-api/` (Cloudflare Workers + Hono)

Both expose overlapping domain endpoints (`auth`, `bazi`, `ai`, etc.), but they are not contract-compatible and are at different maturity levels. This creates client integration risk and slows delivery.

## Decision

1. `backend/` (Go) is the **primary backend** for app-facing `v1` APIs.
2. `workers-api/` is **non-primary** for now and treated as experimental/edge extension only.
3. The frozen source of truth for `v1` API contract is:
   - `backend/openapi/openapi.yaml`

## Scope

In scope:

- App-facing routes under `/api/v1` currently implemented in Go for auth, bazi, ai, and almanac.
- Request/response contract, auth scheme, and status code behavior defined in OpenAPI.

Out of scope:

- Migrating or deleting Workers routes.
- Immediate refactor of all legacy response envelopes.
- `v2` design changes.

## Contract Freeze Rules

1. No breaking changes to request/response fields, types, required-ness, or status codes without:
   - New ADR, and
   - OpenAPI version bump/change log update.
2. Additive changes only (new optional fields/endpoints) are allowed in `v1`.
3. Client integration must be generated/implemented against the OpenAPI file, not inferred from handler code.
4. If implementation and OpenAPI diverge, OpenAPI is the expected contract and implementation must be aligned before release.

## Consequences

- Reduces multi-backend ambiguity and stabilizes frontend integration.
- Enables contract-first development and API review.
- Workers can still be used for edge adapters/proxy jobs, but not as the app system-of-record API.

## Follow-up

1. Add CI contract checks (lint + diff gate) for `backend/openapi/openapi.yaml`.
2. Align existing frontend API adapter with the frozen `v1` contract.
3. Plan a future `v2` envelope unification if needed.
