import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    // Las lecturas .mdx las compila Next; en las pruebas basta con que existan.
    { name: 'mdx-vacio', enforce: 'pre', load: (id) => (id.endsWith('.mdx') ? 'export default function Lectura() { return null; }' : undefined) },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // En las pruebas no hay React Server: «server-only» se reemplaza por un módulo vacío.
      'server-only': path.resolve(__dirname, 'tests/vacio.ts'),
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    testTimeout: 30000,
    hookTimeout: 60000,
  },
});
