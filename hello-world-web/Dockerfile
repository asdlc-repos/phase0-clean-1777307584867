# syntax=docker/dockerfile:1.6

# ---- Stage 1: build the React app ----
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (including dev deps needed for building) so this
# layer is cached as long as package.json doesn't change. Glob covers both
# package.json and an optional package-lock.json without failing if the lock
# file is absent.
COPY package*.json ./
RUN npm install --no-audit --no-fund

# Copy source and produce the production bundle in /app/dist.
COPY tsconfig.json tsconfig.node.json vite.config.ts index.html ./
COPY public ./public
COPY src ./src
RUN npm run build


# ---- Stage 2: minimal runtime serving static files + /health ----
FROM node:20-alpine AS runtime

ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

WORKDIR /app

# Install only production dependencies (Express) for a slim runtime image.
COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund && npm cache clean --force

# Copy the runtime server and the built static assets from the builder stage.
COPY server.js ./
COPY --from=builder /app/dist ./dist

# Run as the unprivileged 'node' user that ships with the official image.
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 3000) + '/health').then(r => { if (!r.ok) process.exit(1); }).catch(() => process.exit(1))"

CMD ["node", "server.js"]
