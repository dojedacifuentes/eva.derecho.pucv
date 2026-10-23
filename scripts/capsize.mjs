/**
 * Recorte tipográfico con Capsize (github.com/seek-oss/capsize, MIT): quita el aire que la letra trae arriba y abajo,
 * para que los titulares calcen exactos con la retícula del plano (de la altura de mayúsculas a la línea base).
 *
 *   node scripts/capsize.mjs     escribe src/app/recorte.css (GENERADO: no se edita a mano)
 *
 * Una clase por interlineado: `.recorte-105`, `.recorte-120`… Los valores van en em, así que sirven a cualquier tamaño.
 */
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { precomputeValues } from '@capsizecss/core';
import plexSans from '@capsizecss/metrics/iBMPlexSans';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INTERLINEADOS = [105, 115, 130];

const reglas = INTERLINEADOS.map((l) => {
  const v = precomputeValues({ fontSize: 100, leading: l, fontMetrics: plexSans });
  return `.recorte-${l} {
  line-height: ${l / 100};
}
.recorte-${l}::before {
  content: '';
  display: table;
  margin-bottom: ${v.capHeightTrim};
}
.recorte-${l}::after {
  content: '';
  display: table;
  margin-top: ${v.baselineTrim};
}`;
});

writeFileSync(
  path.join(raiz, 'src/app/recorte.css'),
  `/* GENERADO por scripts/capsize.mjs (Capsize, IBM Plex Sans): no se edita a mano. */\n\n${reglas.join('\n\n')}\n`,
);
console.log(`src/app/recorte.css: ${INTERLINEADOS.length} interlineados`);
