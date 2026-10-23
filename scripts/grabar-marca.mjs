/**
 * Graba la marca conjunta (Derecho PUCV × EVA) en bucle, desde /marca, con el Chrome instalado.
 *
 *   node scripts/grabar-marca.mjs [--claro] [--segundos 16] [--base http://localhost:3130]
 *
 * Deja media/marca/marca-conjunta[-clara].mp4 (H.264, 1920×1080, sin audio). Necesita el servidor encendido y ffmpeg.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = (n, d) => {
  const i = process.argv.indexOf(n);
  return i >= 0 ? process.argv[i + 1] : d;
};
const claro = process.argv.includes('--claro');
const segundos = Number(arg('--segundos', '16'));
const base = arg('--base', 'http://localhost:3130');
const temporal = path.join(raiz, 'media', 'marca', 'tmp');
rmSync(temporal, { recursive: true, force: true });
mkdirSync(temporal, { recursive: true });

const navegador = await chromium.launch({ channel: 'chrome' });
const pagina = await navegador.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await pagina.goto(`${base}/marca?pausa=no${claro ? '&fondo=claro' : ''}`, { waitUntil: 'networkidle' });
// Sin cabecera ni pie: sólo la marca. Se recarga para que la animación empiece desde cero ya sin ellos.
const limpiar = () => pagina.addStyleTag({ content: '.cabecera,.pie,nextjs-portal{display:none!important}.sala-marca{min-height:100vh}' });
await limpiar();

// Captura de pantalla continua de Chrome (CDP): cada cuadro llega con su marca de tiempo.
const cdp = await pagina.context().newCDPSession(pagina);
const cuadros = [];
cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
  const archivo = path.join(temporal, `c${String(cuadros.length).padStart(5, '0')}.jpg`);
  writeFileSync(archivo, Buffer.from(data, 'base64'));
  cuadros.push({ archivo, t: metadata.timestamp });
  await cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
});
await pagina.reload({ waitUntil: 'networkidle' });
await limpiar();
await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 95, maxWidth: 1920, maxHeight: 1080, everyNthFrame: 1 });
await pagina.waitForTimeout(segundos * 1000);
await cdp.send('Page.stopScreencast');
await navegador.close();

// Lista para ffmpeg con la duración real de cada cuadro → video a 30 cuadros por segundo.
if (cuadros.length < 2) throw new Error(`Chrome entregó ${cuadros.length} cuadros: ¿el servidor está compilando?`);
cuadros.sort((a, b) => a.t - b.t);
const ruta = (archivo) => archivo.replaceAll(path.sep, '/');
const lista = cuadros
  .map((c, i) => `file '${ruta(c.archivo)}'\nduration ${Math.max(1 / 120, (cuadros[i + 1]?.t ?? c.t + 1 / 30) - c.t).toFixed(4)}`)
  .join('\n');
writeFileSync(path.join(temporal, 'lista.txt'), `${lista}\nfile '${ruta(cuadros.at(-1).archivo)}'\n`);
const salida = path.join(raiz, 'media', 'marca', `marca-conjunta${claro ? '-clara' : ''}.mp4`);
execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', path.join(temporal, 'lista.txt'), '-vf', 'fps=30,scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'slow', '-movflags', '+faststart', '-an', salida]);
rmSync(temporal, { recursive: true, force: true });
console.log(`grabado ${path.relative(raiz, salida)}`);
