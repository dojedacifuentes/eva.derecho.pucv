import { defineConfig } from '@playwright/test';

/** Pruebas de punta a punta con el Chrome instalado. Usan el servidor de desarrollo si ya corre en el 3130. */
export default defineConfig({
  testDir: 'e2e',
  timeout: 120_000,
  use: { baseURL: 'http://localhost:3130', channel: 'chrome' },
  webServer: { command: 'npm run dev', url: 'http://localhost:3130/cursos', reuseExistingServer: true, timeout: 180_000 },
  projects: [
    { name: 'escritorio', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'telefono', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
});
