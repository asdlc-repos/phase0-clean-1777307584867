# hello-world-web

A small React + TypeScript web application that displays "Hello World".
Static assets are produced by Vite and served by a tiny Express server that
also exposes a `/health` endpoint for platform monitoring.

## Endpoints

| Method | Path      | Description                              |
| ------ | --------- | ---------------------------------------- |
| GET    | `/`       | Serves the Hello World HTML page         |
| GET    | `/health` | Returns `{ status: "ok", timestamp }` JSON |

The `/health` endpoint is implemented at the Express server level (not via
React Router) so it remains available independent of front-end state.

## Project layout

```
hello-world-web/
├── Dockerfile          # multi-stage: build with Node, run with Node + Express
├── index.html          # Vite entry HTML
├── package.json
├── public/
│   └── favicon.svg
├── server.js           # Production Express server (static files + /health)
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── ErrorBoundary.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Scripts

- `npm run dev` — start the Vite dev server on port 3000
- `npm run build` — type-check and build the production bundle into `dist/`
- `npm start` — run the Express server (after `npm run build`) on port 3000

## Configuration

The application starts with no required environment variables. Optional
overrides:

- `PORT` (default `3000`)
- `HOST` (default `0.0.0.0`)

## Docker

```
docker build -t hello-world-web .
docker run --rm -p 3000:3000 hello-world-web
```
