# Mission Learning Design Lab

A polished Next.js group-work app for a UN Peacekeeping Training-of-Trainers course. Trainee groups use one laptop per group to apply behaviourist, social cognitive, and constructivist learning theory to one realistic mission-training scenario, then present their final mini-training design from the same app.

Prepared by Lt. Col. / Maissara Selim.

## Description

Mission Learning Design Lab guides senior officers and trainers through:

- Group setup with a built-in participant roster
- Mission scenario analysis
- Behaviourist rules-under-pressure activity
- Social cognitive modelling, practice, and feedback design
- Constructivist scenario-based training design
- Final 15-minute mini-training builder
- Full-screen presentation mode
- Printable/exportable group summary

The app uses localStorage only. There is no backend, login, database, or required environment variable.

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

## Build

```bash
npm run lint
npm run build
```

## Deploy To Vercel

This is a standard Next.js App Router project and is compatible with Vercel defaults.

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Use the default Next.js settings.
4. Build command: `npm run build`
5. No environment variables are required.

Using the Vercel CLI:

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Classroom Use

- Share the Vercel link or QR code.
- Use one laptop per group.
- Each group selects its members from the roster.
- Each group assigns required roles: Lead Facilitator and Presenter.
- Each group completes all activity phases.
- Each group generates Presentation Mode and presents for 3 minutes.
- Each group may print, copy, or download its summary.

## LocalStorage Warning

Group work is saved only in the local browser on the laptop being used. If a group changes laptops, browsers, private browsing mode, or clears browser data, its saved work may not be available.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react
- localStorage persistence
