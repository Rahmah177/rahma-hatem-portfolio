import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages serves the site from /<repo>/. Vercel and local dev stay on /.
  base: process.env.PAGES_BASE || '/',
  plugins: [react(), tailwindcss()],
});
