# PrepToJob — Frontend (Stage 0 / MVP)

Adaptive career preparation platform. This is the Stage 0 frontend: landing page, auth screens, career profile, resume upload, job description input, resume–JD match result, skill gap result, and a dashboard — all wired to a mock service layer that mirrors the future backend API.

## Tech stack

- React 18 + Vite
- React Router v6
- Tailwind CSS
- Lucide React icons

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/   Reusable UI: Button, Input, Card, ProgressBar, SkillCard,
│                  StatCard, FileUpload, PageHeader, Badge, Modal, LoadingState, Sidebar, Navbar
├── layouts/       PublicLayout (marketing/auth pages) and DashboardLayout (app shell)
├── pages/         One file per screen (Landing, Register, Login, CareerProfile,
│                  ResumeUpload, JobDescription, MatchResult, SkillGap, Dashboard, Settings)
├── routes/        Route table consumed by App.jsx
├── services/      authService, profileService, resumeService, jobService —
│                  currently backed by mock data, written so a real fetch()
│                  call can replace the mock body without touching any page
├── data/          mockData.js — mock objects shaped to match the planned
│                  backend/database schema (User, Profile, Resume, Job, Match, Skill)
├── App.jsx
├── main.jsx
└── index.css
```

## Connecting a real backend later

Every function in `src/services/*.js` has a `// TODO` comment showing the
exact `fetch()` call it will become (e.g. `POST /api/auth/register`,
`POST /api/resume/upload`, `POST /api/match/analyze`). Swap the mock
`delay(...)` return value for the real request — no page component needs to
change, since pages only ever call the service functions.

## What's intentionally not built yet

Per the Stage 0 scope: AI interview simulation, adaptive quiz engine, ML
readiness prediction, analytics dashboards, and the learning roadmap. These
are shown as disabled "Coming soon" items in the sidebar so the information
architecture is ready for them without building the features early.
