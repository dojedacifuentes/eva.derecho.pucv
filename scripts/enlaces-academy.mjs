/**
 * Comprueba que cada dirección de EVA ACADEMY que enlaza la plataforma responde (src/content/academy.ts).
 *
 *   node scripts/enlaces-academy.mjs
 *
 * Necesita internet. Sale con error si alguna no responde 200.
 */
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { todasLasRutasAcademy } = await import(pathToFileURL(path.join(raiz, 'src/content/academy.ts')).href);

const rutas = todasLasRutasAcademy();
let malas = 0;
await Promise.all(
  rutas.map(async (url) => {
    try {
      const r = await fetch(url, { method: 'GET', redirect: 'follow' });
      if (r.status !== 200) {
        malas++;
        console.error(`${r.status}  ${url}`);
      }
    } catch (e) {
      malas++;
      console.error(`ERROR  ${url}  ${e.message}`);
    }
  }),
);
console.log(`${rutas.length - malas} de ${rutas.length} direcciones responden.`);
process.exit(malas ? 1 : 0);
