/**
 * Trae la marca de EVA (□X y ƎVΛ) desde su fuente, eva.proyecto01, sin copiar la geometría a mano.
 *
 *   node scripts/marca.mjs            escribe src/lib/marca-eva.ts
 *   node scripts/marca.mjs --check    falla si src/lib/marca-eva.ts quedó atrasado
 *
 * A diferencia del kit de `brand-assets.mjs` (que sólo trae dos poses ya colocadas), aquí hacen falta las
 * ocho piezas en su forma de base y las cinco poses como traslación + giro, porque la plataforma anima la
 * transformación completa. eva.proyecto01 se lee, no se modifica. Node quita los tipos de `brand.ts` solo.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fuente = path.resolve(raiz, '..', 'eva.proyecto01', 'src', 'lib', 'brand.ts');
const destino = path.join(raiz, 'src', 'lib', 'marca-eva.ts');

if (!existsSync(fuente)) {
  console.error(`No encuentro la fuente de la marca: ${fuente}`);
  process.exit(1);
}

const { BRAND_COLORS, POSES, SEAM, SEGMENTS, SHAPES, STROKE } = await import(pathToFileURL(fuente).href);
const r = (n) => Math.round(n * 1000) / 1000;

const poses = Object.fromEntries(
  Object.entries(POSES).map(([pose, piezas]) => [
    pose,
    Object.fromEntries(
      SEGMENTS.map((id) => {
        const p = piezas[id];
        return [id, { x: r(p.x), y: r(p.y), angulo: r(p.angle), alfa: r(p.alpha) }];
      }),
    ),
  ]),
);
const formas = Object.fromEntries(SEGMENTS.map((id) => [id, SHAPES[id].map(([x, y]) => [r(x), r(y)])]));

const texto = `/**
 * La marca de EVA —el símbolo □X y el nombre ƎVΛ—: ocho piezas rígidas que sólo se trasladan y giran.
 *
 * GENERADO por \`node scripts/marca.mjs\` desde eva.proyecto01/src/lib/brand.ts: no se edita a mano.
 * Unidades de la marca: el lado del cuadrado mide 10.
 */

export const SEGMENTOS = ${JSON.stringify(SEGMENTS)} as const;
export type Segmento = (typeof SEGMENTOS)[number];
export type PoseMarca = ${Object.keys(poses).map((p) => `'${p}'`).join(' | ')};
export interface Lugar {
  x: number;
  y: number;
  angulo: number;
  alfa: number;
}

export const GROSOR = ${STROKE};
export const COSTURA = ${SEAM};
export const COLORES = ${JSON.stringify({ halo: BRAND_COLORS.glow, trazo: BRAND_COLORS.core })} as const;

/** Cada pieza en su forma de base, centrada en su propio origen. */
export const FORMAS: Record<Segmento, readonly (readonly [number, number])[]> = ${JSON.stringify(formas)};

/** Dónde está cada pieza en cada pose. */
export const POSES: Record<PoseMarca, Record<Segmento, Lugar>> = ${JSON.stringify(poses)};
`;

if (process.argv.includes('--check')) {
  const actual = existsSync(destino) ? readFileSync(destino, 'utf8') : '';
  if (actual !== texto) {
    console.error('src/lib/marca-eva.ts está atrasado: ejecuta node scripts/marca.mjs');
    process.exit(1);
  }
  console.log('marca al día');
} else {
  writeFileSync(destino, texto);
  console.log(`marca escrita en ${path.relative(raiz, destino)} (${Object.keys(poses).length} poses)`);
}
