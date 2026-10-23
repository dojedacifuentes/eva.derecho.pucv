/**
 * Capturas de páginas con el Chrome instalado (sin interfaz), en escritorio y teléfono.
 *
 *   node scripts/capturas.mjs [/ruta ...] [--base http://localhost:3130] [--espera 3500] [--completa]
 *
 * Deja media/capturas/<ruta>-escritorio.png y -telefono.png. El panel de vista previa oculto congela las
 * animaciones; esto no.
 */
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opcion = (n, d) => (args.includes(n) ? args[args.indexOf(n) + 1] : d);
const base = opcion('--base', 'http://localhost:3130');
const espera = Number(opcion('--espera', '3500'));
const completa = args.includes('--completa');
const rutas = args.filter((a, i) => a.startsWith('/') && !['--base', '--espera'].includes(args[i - 1]));
if (rutas.length === 0) rutas.push('/');
const salida = path.join(raiz, 'media', 'capturas');
mkdirSync(salida, { recursive: true });

const navegador = await chromium.launch({ channel: 'chrome' });
for (const [nombre, vista] of [
  ['escritorio', { width: 1440, height: 900, deviceScaleFactor: 1 }],
  ['telefono', { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
]) {
  const contexto = await navegador.newContext({ viewport: { width: vista.width, height: vista.height }, ...vista });
  const pagina = await contexto.newPage();
  for (const ruta of rutas) {
    await pagina.goto(base + ruta, { waitUntil: 'networkidle' });
    await pagina.addStyleTag({ content: 'nextjs-portal{display:none!important}' });
    await pagina.waitForTimeout(espera);
    const archivo = path.join(salida, `${ruta.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'portada'}-${nombre}.png`);
    await pagina.screenshot({ path: archivo, fullPage: completa });
    console.log(path.relative(raiz, archivo));
  }
  await contexto.close();
}
await navegador.close();
