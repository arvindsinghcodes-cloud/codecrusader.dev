# Code Crusader — Backend

Spring Boot REST API for the [`frontend/`](../frontend) React app, secured
with Spring Security + JWT.

## Stack

- Java 21, Spring Boot 3.3.5
- Spring Web, Spring Security, Spring Data JPA, Bean Validation
- JWT auth (jjwt), BCrypt password hashing
- H2 in-memory DB for local dev, PostgreSQL driver ready for production
- Maven

## Getting started

```bash
cd backend
mvn spring-boot:run        # http://localhost:8080, dev profile, H2 in-memory
mvn test                   # runs the MockMvc test suite
```

On startup (dev profile) `DataSeeder` populates the database with the same
content the frontend's local fixtures use (videos, courses, schedule,
campaigns, notes, practice problems) plus two demo accounts:

| Email                          | Password      | Role  |
|---------------------------------|---------------|-------|
| `admin@codecrusader.dev`        | `admin123`    | ADMIN |
| `student@codecrusader.dev`      | `student123`  | USER  |

The H2 console is available at `http://localhost:8080/h2-console` (JDBC URL
`jdbc:h2:mem:codecrusader`, user `sa`, no password).

## Configuration

All config lives in `application.yml` (+ `application-dev.yml` /
`application-prod.yml`), overridable via environment variables:

| Variable | Default (dev) | Purpose |
|---|---|---|
| `SPRING_PROFILES_ACTIVE` | `dev` | `dev` (H2) or `prod` (PostgreSQL) |
| `JWT_SECRET` | a baked-in dev key | base64 HS256 signing key — **override in every real deployment** |
| `JWT_EXPIRATION_MS` | `86400000` (24h) | token lifetime |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173` | comma-separated list, must match the frontend's origin |
| `SEED_DEMO_DATA` | `true` | set `false` in prod once you have real content |
| `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` | — | required when `SPRING_PROFILES_ACTIVE=prod` |

For production, generate a real secret with e.g. `openssl rand -base64 32`.

## Security model

- Stateless JWT auth: `POST /api/auth/login` / `/signup` return a token;
  send it back as `Authorization: Bearer <token>`.
- Passwords are BCrypt-hashed, never stored or logged in plain text.
- Public (no token required): auth endpoints, `POST /api/contact`, all
  content `GET` endpoints, `GET /api/practice/problems`, `POST
  /api/practice/run`, `POST /api/ide/chat`.
- Authenticated: `GET /api/auth/me`.
- Admin-only (`ROLE_ADMIN`): `POST/PUT/DELETE /api/videos` — the concrete,
  tested example of the CRUD + role-based-authorization pattern. Courses,
  schedule, campaigns and notes are currently read-only via the API; give
  them the same three endpoints in `ContentController`/`ContentService`
  (mirroring the video ones) plus the matching `hasRole("ADMIN")` rules in
  `SecurityConfig` when an admin UI needs to manage them too.
- CORS is restricted to `app.cors.allowed-origins`; unauthenticated/
  forbidden requests get a JSON body (`RestAuthEntryPoint` /
  `RestAccessDeniedHandler`), not Spring Security's default HTML page.

## API overview

| Method & path | Auth | Notes |
|---|---|---|
| `POST /api/auth/signup` | public | creates a `ROLE_USER` account, returns `{token, user}` |
| `POST /api/auth/login` | public | returns `{token, user}` |
| `GET /api/auth/me` | JWT | current user's profile |
| `POST /api/contact` | public | stores a contact-form submission |
| `GET /api/videos` | public | |
| `POST/PUT/DELETE /api/videos[/{id}]` | JWT + ADMIN | |
| `GET /api/courses` | public | |
| `GET /api/schedule` | public | |
| `GET /api/campaigns` | public | includes nested `segments[]` |
| `GET /api/notes` | public | |
| `GET /api/practice/problems` | public | |
| `POST /api/practice/run` | public | **simulated** benchmark result — see below |
| `POST /api/ide/chat` | public | **rule-based** reply — see below |

### Two endpoints are intentionally stubbed, not faked silently

- **`POST /api/practice/run`** does not execute the submitted source. Running
  untrusted code needs a sandboxed runner (locked-down per-submission
  container, strict CPU/memory/time limits, no network) that's a project of
  its own — `PracticeService.run()` documents this and returns a
  deterministic simulated result in the same response shape a real runner
  would use, so the frontend integration doesn't change when one is added.
- **`POST /api/ide/chat`** replies with simple keyword-matched canned
  responses (`IdeService.chat()`), not a real LLM call. Swap its body for a
  call to an LLM API once one is wired up — the request already carries the
  active file, its source, and the user's message.

## Frontend integration

The React app's `frontend/src/api/*.js` modules already call these exact
endpoints and fall back to local mock behavior when a call fails, so nothing
in the frontend needs to change to start using this backend — just set
`VITE_API_BASE_URL=http://localhost:8080/api` (or run both through the Vite
dev-server proxy, see `frontend/vite.config.js`) and make sure
`CORS_ALLOWED_ORIGINS` here includes the frontend's origin.
