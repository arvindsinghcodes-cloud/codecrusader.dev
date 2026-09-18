# Code Crusader — Frontend

React (Vite) single-page app converted from the original static HTML mockup.
Same visual design and interactions, restructured into components and ready
to be wired up to a Spring Boot backend.

## Stack

- React 18 + Vite
- Tailwind CSS (dark theme, custom cyan/red palette matching the original design)
- Axios for API calls

## Getting started

```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
```

## Project structure

```
src/
  api/            axios client + one file per backend resource (auth, contact,
                  practice, ide, content) — see "Backend integration" below
  context/        AppProvider: toast notifications, click SFX, auth state,
                  search/auth modal visibility
  data/           local fixtures for videos/courses/schedule/campaigns/notes/
                  problems — mirrors src/api/contentApi.js's shape so it's a
                  drop-in swap once the backend serves real data
  components/
    layout/       TopBar, Navbar, Footer
    common/       Toast, SearchModal, AuthModal
    sections/     one component per landing-page section (Hero, VideoTheatre,
                  MemorySimulator, Practice, AiIde, Courses, Schedule,
                  Campaigns, IronEclipse, Notes, Origin, Connect)
```

## Backend integration (Spring Boot)

Set `VITE_API_BASE_URL` (see `.env.example`) to the backend's base URL, or
leave it as `/api` and use the Vite dev-server proxy (`vite.config.js`) /
your production reverse proxy to forward `/api/*` to Spring Boot.

Endpoints the frontend already calls, with a graceful local fallback so the
UI keeps working before the backend exists:

| Frontend module         | Method & path            | Used by                          |
|--------------------------|---------------------------|-----------------------------------|
| `api/authApi.js`         | `POST /api/auth/login`    | Sign-in modal                     |
| `api/authApi.js`         | `POST /api/auth/signup`   | (not yet wired to a form)         |
| `api/contactApi.js`      | `POST /api/contact`       | Connect section form              |
| `api/practiceApi.js`     | `GET /api/practice/problems` | (not yet wired — see `data/problems.js`) |
| `api/practiceApi.js`     | `POST /api/practice/run`  | Practice section "Run Code"       |
| `api/ideApi.js`          | `POST /api/ide/chat`      | AI IDE chat panel                 |
| `api/contentApi.js`      | `GET /api/videos`         | (not yet wired — see `data/videos.js`) |
| `api/contentApi.js`      | `GET /api/courses`        | (not yet wired — see `data/courses.js`) |
| `api/contentApi.js`      | `GET /api/schedule`       | (not yet wired — see `data/schedule.js`) |
| `api/contentApi.js`      | `GET /api/campaigns`      | (not yet wired — see `data/campaigns.js`) |
| `api/contentApi.js`      | `GET /api/notes`          | (not yet wired — see `data/notes.js`) |

As each Spring Boot endpoint becomes available, swap the corresponding
`data/*.js` import in a section component for a `useEffect` + the matching
`contentApi.js` call (or add a small data-fetching hook). `apiClient`
(`api/client.js`) already attaches a `Bearer` token from `localStorage`, so
once `/auth/login` returns a real JWT, authenticated calls work with no
further changes.
