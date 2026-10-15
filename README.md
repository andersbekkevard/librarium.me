# Librarium

A personal reading companion: track the books you own and want, your progress, ratings, comments and reviews, and see your reading life in charts and a daily AI-written note.

### Landing page

![Landing Page](docs/images/landing-page.png "Landing Page")

### Dashboard

![Dashboard](docs/images/dashboard.png "Dashboard")

## Features

- **Google sign-in** with an automatic profile and a welcome book on first visit
- **Library** of owned and wishlist books, with search, status/ownership/genre filters, sorting and grid or list views (filters live in the URL)
- **Reading lifecycle** `not_started → in_progress → finished`, page progress with automatic start and finish, 1–5 star ratings
- **Comments and reviews** tied to the page and state you were at
- **Activity history**: every action is an append-only event, filterable by type, book and date
- **Statistics**: streak, pages read per month by genre, genre distribution, daily pace
- **Add books** by Google Books search, manual entry or barcode scan (camera with torch, or an uploaded photo)
- **Reading companion**: a daily Gemini message based on your stats and recent activity, with offline fallbacks
- Light and dark themes, responsive layout, quick search (⌘K)

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Firebase 12 (Auth, Firestore, AI Logic/Gemini) · Recharts · Radix Dialog · Phosphor icons

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Firebase project and Google Books key
npm run dev
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run typecheck`, `npm run lint` | `tsc --noEmit`, ESLint |
| `npm test` | unit and property-based tests (Vitest) |
| `npm run test:oracle` | runs the legacy implementation and the current one side by side against the Firebase emulators and compares every document they write (needs Java 21) |
| `npm run test:e2e` | Playwright against a production build and the emulators, desktop and mobile; Google APIs are stubbed |
| `npm run emulators` | Auth + Firestore emulators (`NEXT_PUBLIC_FIREBASE_EMULATORS=true` points the app at them) |

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Firestore schema](analysis/librarium/DATA_OBJECTS.md)
- [Business rules](analysis/librarium/BUSINESS_RULES.md) and the [modernization notes](analysis/librarium/TRANSFORMATION_NOTES.md), which include behaviour changes from the previous version
