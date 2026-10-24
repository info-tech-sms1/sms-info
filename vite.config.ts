import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const rootDir = import.meta.dirname;

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    build: {
      manifest: true,
      rollupOptions: {
        input: {
          main: path.resolve(rootDir, 'index.html'),
          services: path.resolve(rootDir, 'services/index.html'),
          evacuationPlanning: path.resolve(rootDir, 'evacuation-planning/index.html'),
          safetyEquipment: path.resolve(rootDir, 'safety-equipment/index.html'),
          awarenessEvents: path.resolve(rootDir, 'awareness-events/index.html'),
          about: path.resolve(rootDir, 'about/index.html'),
          contact: path.resolve(rootDir, 'contact/index.html'),
          privacy: path.resolve(rootDir, 'privacy/index.html'),
          terms: path.resolve(rootDir, 'terms/index.html'),
        },
      },
    },
    server: {
      // Add deployment-preview hosts through VITE_ALLOWED_HOSTS instead of hard-coding them.
      allowedHosts: process.env.VITE_ALLOWED_HOSTS
        ? process.env.VITE_ALLOWED_HOSTS.split(',').map((host) => host.trim()).filter(Boolean)
        : [],
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
