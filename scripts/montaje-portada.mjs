/**
 * Montaje del video de la portada: «el Derecho se está transformando», con EVA en la Casa Central y su voz.
 *
 *   node scripts/montaje-portada.mjs
 *
 * Las escenas (media/heygen/escena-*.mp4, animadas en HeyGen) se cortan en los tiempos de las frases de la voz
 * (media/heygen/voz-transformacion.wav, medida con silencedetect). Una escena que debe durar más que su clip se
 * ralentiza (máximo ≈ 1,2×). Fundidos cruzados, gradación oscura, apertura y cierre en negro.
 *
 * Deja en public/video/ (compresión elegida el 23-10-2026 comparando cuadros: CRF 30 no se distingue del 24 y pesa
 * menos de la mitad; el fondo va desenfocado, así que 320 px bastan):
 *   portada-escenas.mp4        960 px, sin audio (bucle de la ventana), ≈ 2,2 MB
 *   portada-escenas-fondo.mp4  320 px, sin audio (fondo desenfocado), ≈ 0,2 MB
 *   portada-escenas-voz.mp4    960 px, con la voz de EVA (botón «Escuchar a EVA»; se descarga sólo al pulsarlo)
 *   portada-escenas.vtt        subtítulos de la voz
 *   portada-escenas.webp       cuadro fijo (reducir movimiento)
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FUNDIDO = 0.6;
const RETRASO_VOZ = 0.4; // la voz entra un poco después del primer cuadro
const NEGRO = 0.5;
const FIN = 32.4;

// Cortes (centro de cada fundido) alineados con las frases de la voz, ya desplazadas por RETRASO_VOZ.
// `oficial`: video de EVA de eva.proyecto01 (vertical 720×1280): se recorta al rostro en 16:9.
const EVA_OFICIAL = path.resolve(raiz, '..', 'eva.proyecto01', 'public', 'eva', 'eva-loop.mp4');
const ESCENAS = [
  { clip: 'fachada', hasta: 6.9 }, //   «El Derecho siempre ha cambiado. Con la imprenta. Con los códigos. Con internet.»
  { clip: 'biblioteca', hasta: 12.4 }, // «Hoy cambia otra vez. Y no es el futuro: ya es tu presente.»
  { clip: 'codigo', hasta: 19.4 }, //    «La pregunta no es si vas a usar IA. Es si vas a saber cuándo creerle.»
  { clip: 'patio', hasta: 22.1 }, //     «Aquí aprendes a usarla, a verificarla…
  { clip: 'pasillo', hasta: 24.7 }, //   …y a construir con ella.»
  { clip: 'oficial', hasta: 27.8 }, //   «Soy EVA, una inteligencia artificial.» (el loop oficial: mitad humana, mitad máquina)
  { clip: 'escalera', hasta: FIN }, //   «Y el Derecho que viene… lo vas a escribir tú.»
];
const rutaClip = (nombre) => (nombre === 'oficial' ? EVA_OFICIAL : path.join(raiz, 'media', 'heygen', `escena-${nombre}.mp4`));

// Subtítulos: tiempos de la voz (silencedetect) + RETRASO_VOZ.
const SUBTITULOS = [
  [0.0, 2.0, 'El Derecho siempre ha cambiado.'],
  [2.7, 6.1, 'Con la imprenta. Con los códigos. Con internet.'],
  [6.8, 11.6, 'Hoy cambia otra vez. Y no es el futuro: ya es tu presente.'],
  [12.5, 18.6, 'La pregunta no es si vas a usar inteligencia artificial. Es si vas a saber cuándo creerle.'],
  [19.5, 24.0, 'Aquí aprendes a usarla, a verificarla… y a construir con ella.'],
  [24.7, 27.2, 'Soy EVA, una inteligencia artificial.'],
  [27.6, 30.8, 'Y el Derecho que viene… lo vas a escribir tú.'],
];

const duracionClip = (nombre) =>
  Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', rutaClip(nombre)]).toString().trim());

const entradas = ESCENAS.flatMap((e) => ['-i', rutaClip(e.clip)]);
entradas.push('-i', path.join(raiz, 'media', 'heygen', 'voz-transformacion.wav'));
const iVoz = ESCENAS.length;

let desde = 0;
const partes = [];
const uniones = [];
ESCENAS.forEach((e, i) => {
  const inicio = i === 0 ? 0 : desde - FUNDIDO / 2;
  const fin = i === ESCENAS.length - 1 ? e.hasta : e.hasta + FUNDIDO / 2;
  const necesita = fin - inicio;
  const disponible = duracionClip(e.clip) - 0.05;
  const factor = Math.max(1, necesita / disponible);
  // El video oficial es vertical: va entero al centro, sobre una copia suya desenfocada que llena el cuadro.
  const origen = e.clip === 'oficial' ? `[pre${i}]` : `[${i}:v]`;
  if (e.clip === 'oficial') {
    partes.push(
      `[${i}:v]split[oa${i}][ob${i}];[oa${i}]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,boxblur=28:2,eq=brightness=-0.12[obg${i}];` +
        `[ob${i}]scale=-2:1080[ofg${i}];[obg${i}][ofg${i}]overlay=(W-w)/2:0[pre${i}]`,
    );
  }
  const encuadre = e.clip === 'oficial' ? 'null' : 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080';
  partes.push(
    `${origen}${encuadre},fps=24,format=yuv420p,` +
      `eq=brightness=-0.05:contrast=1.06:saturation=0.9,vignette=PI/5,` +
      `setpts=${factor.toFixed(4)}*(PTS-STARTPTS),trim=duration=${necesita.toFixed(3)},setpts=PTS-STARTPTS[v${i}]`,
  );
  desde = e.hasta;
});
let cadena = '[v0]';
ESCENAS.slice(0, -1).forEach((e, i) => {
  const salida = i === ESCENAS.length - 2 ? '[unido]' : `[x${i}]`;
  uniones.push(`${cadena}[v${i + 1}]xfade=transition=fade:duration=${FUNDIDO}:offset=${(e.hasta - FUNDIDO / 2).toFixed(3)}${salida}`);
  cadena = salida;
});
const cierre = `[unido]fps=24,format=yuv420p,fade=t=in:st=0:d=${NEGRO},fade=t=out:st=${(FIN - NEGRO).toFixed(2)}:d=${NEGRO},split=3[a][b][c]`;
const tamanos = `[a]scale=960:-2[ventana];[b]scale=320:-2[fondo];[c]scale=960:-2[ventanavoz]`;
const voz = `[${iVoz}:a]adelay=${RETRASO_VOZ * 1000}|${RETRASO_VOZ * 1000},apad,atrim=duration=${FIN},afade=t=out:st=${(FIN - 0.6).toFixed(2)}:d=0.6[voz]`;
const filtro = [...partes, ...uniones, cierre, tamanos, voz].join(';');

const destino = (n) => path.join(raiz, 'public', 'video', n);
const h264 = (crf) => ['-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-r', '24', '-preset', 'slow', '-crf', String(crf), '-movflags', '+faststart'];
execFileSync('ffmpeg', [
  '-loglevel', 'error', '-y', ...entradas,
  '-filter_complex', filtro,
  '-map', '[ventana]', '-an', ...h264(30), destino('portada-escenas.mp4'),
  '-map', '[fondo]', '-an', ...h264(34), destino('portada-escenas-fondo.mp4'),
  '-map', '[ventanavoz]', '-map', '[voz]', ...h264(30), '-c:a', 'aac', '-b:a', '96k', destino('portada-escenas-voz.mp4'),
]);
execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-ss', '9', '-i', destino('portada-escenas.mp4'), '-frames:v', '1', '-c:v', 'libwebp', '-quality', '80', destino('portada-escenas.webp')]);

const t = (s) => {
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, '0')}:${(s - m * 60).toFixed(3).padStart(6, '0')}`;
};
writeFileSync(
  destino('portada-escenas.vtt'),
  'WEBVTT\n\n' + SUBTITULOS.map(([a, b, texto]) => `${t(a + RETRASO_VOZ)} --> ${t(b + RETRASO_VOZ)}\n${texto}\n`).join('\n'),
);
console.log(`montaje de ${FIN} s con voz y subtítulos en public/video/portada-escenas*`);
