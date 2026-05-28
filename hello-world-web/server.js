// Production server for the Hello World web application.
//
// Responsibilities:
//   1. Serve a JSON /health endpoint at the server level (intentionally NOT
//      routed through React Router) so platform health probes always work
//      regardless of front-end state.
//   2. Serve the static Vite build output from ./dist.
//   3. Fall back to index.html for unknown routes (SPA behaviour).
//
// All configuration has hardcoded defaults — no environment variables are
// required to start the server. PORT and HOST may override defaults.

import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number.parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';
const DIST_DIR = path.join(__dirname, 'dist');

const app = express();

// Disable the X-Powered-By header to avoid leaking implementation details.
app.disable('x-powered-by');

// Health endpoint — responds with status and an ISO-8601 timestamp.
// Defined BEFORE the static handler so it always wins even if a file with
// the same name somehow ends up in dist/.
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Serve static assets produced by `vite build`.
app.use(
  express.static(DIST_DIR, {
    index: 'index.html',
    maxAge: '1h',
    etag: true,
  }),
);

// SPA fallback — any unmatched GET returns the built index.html so client-side
// routing (if added later) keeps working. Uses a regex instead of '*' to
// stay compatible with both Express 4 and the path-to-regexp v6 used by
// Express 5 pre-releases.
app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

const server = app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`hello-world-web listening on http://${HOST}:${PORT}`);
});

// Graceful shutdown so container orchestrators can terminate cleanly.
const shutdown = (signal) => {
  // eslint-disable-next-line no-console
  console.log(`Received ${signal}, shutting down...`);
  server.close(() => process.exit(0));
  // Force-exit if close hangs longer than 10 s.
  setTimeout(() => process.exit(1), 10_000).unref();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
