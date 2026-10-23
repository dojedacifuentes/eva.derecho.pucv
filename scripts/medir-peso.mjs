/**
 * Cuánto descarga una página en sus primeros segundos, por tipo (JS, CSS, video, imágenes, fuentes).
 *
 *   node scripts/medir-peso.mjs [/ruta ...] [--base http://localhost:3140] [--espera 8000]
 *
 * Mide en escritorio y teléfono con el Chrome instalado. Conviene medir la versión de producción
 * (npm run build y luego npx next start -p 3140): el servidor de desarrollo pesa mucho más.
 */
import { chromium } from '@playwright/test';

const args = process.argv.slice(2);
const opcion = (n, d) => (args.includes(n) ? args[args.indexOf(n) + 1] : d);
const base = opcion('--base', 'http://localhost:3140');
const espera = Number(opcion('--espera', '8000'));
const rutas = args.filter((a, i) => a.startsWith('/') && !['--base', '--espera'].includes(args[i - 1]));
if (rutas.length === 0) rutas.push('/');

const tipo = (url, ct = '') => {
  if (/\.(mp4|webm)(\?|$)/.test(url) || ct.startsWith('video/')) return 'video';
  if (/\.(woff2?|ttf)(\?|$)/.test(url) || ct.includes('font')) return 'fuentes';
  if (/\.js(\?|$)/.test(url) || ct.includes('javascript')) return 'js';
  if (/\.css(\?|$)/.test(url) || ct.includes('css')) return 'css';
  if (/\.(webp|png|jpe?g|svg|avif|gif)(\?|$)/.test(url) || ct.startsWith('image/')) return 'imagenes';
  return 'otros';
};

const navegador = await chromium.launch({ channel: 'chrome' });
for (const [nombre, vista] of [
  ['escritorio', { viewport: { width: 1440, height: 900 } }],
  ['telefono', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }],
]) {
  for (const ruta of rutas) {
    const contexto = await navegador.newContext(vista);
    const pagina = await contexto.newPage();
    const cdp = await contexto.newCDPSession(pagina);
    await cdp.send('Network.enable');
    const porId = new Map();
    cdp.on('Network.responseReceived', (e) => porId.set(e.requestId, { url: e.response.url, ct: e.response.mimeType, bytes: 0 }));
    cdp.on('Network.loadingFinished', (e) => {
      const r = porId.get(e.requestId);
      if (r) r.bytes = e.encodedDataLength;
    });
    cdp.on('Network.dataReceived', (e) => {
      const r = porId.get(e.requestId);
      if (r && !r.final) r.parcial = (r.parcial ?? 0) + e.encodedDataLength;
    });
    const t0 = Date.now();
    await pagina.goto(base + ruta, { waitUntil: 'load' });
    const carga = Date.now() - t0;
    await pagina.waitForTimeout(espera);
    const suma = {};
    for (const r of porId.values()) {
      const b = r.bytes || r.parcial || 0;
      const t = tipo(r.url, r.ct);
      suma[t] = (suma[t] ?? 0) + b;
    }
    const total = Object.values(suma).reduce((a, b) => a + b, 0);
    const kb = (b) => `${Math.round(b / 1024)} KB`;
    console.log(
      `${nombre.padEnd(10)} ${ruta.padEnd(42)} total ${kb(total).padStart(8)} · carga ${carga} ms · ` +
        Object.entries(suma)
          .sort((a, b) => b[1] - a[1])
          .map(([t, b]) => `${t} ${kb(b)}`)
          .join(' · '),
    );
    await contexto.close();
  }
}
await navegador.close();
