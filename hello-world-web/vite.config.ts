import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the Hello World web application.
// - Builds to ./dist with minified, production-optimized assets
// - Dev server runs on port 3000 (overridable via PORT env var)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Keep bundle small — single chunk for a tiny app like this avoids
        // unnecessary HTTP overhead from manual code-splitting.
        manualChunks: undefined,
      },
    },
  },
});
