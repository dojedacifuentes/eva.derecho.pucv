/**
 * Lleva el catálogo (cursos, lecciones, evaluaciones) y las claves de src/content a una migración SQL.
 *
 *   node scripts/catalogo-sql.mjs           escribe supabase/migrations/20261022000002_catalogo.sql
 *   node scripts/catalogo-sql.mjs --check   falla si la migración no coincide con el contenido (lo usa npm run check)
 *
 * Es idempotente (upsert): se puede volver a aplicar cuando cambie el contenido, en una migración nueva.
 * Node quita los tipos de los .ts solo (Node 24).
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cargar = (rel) => import(pathToFileURL(path.join(raiz, rel)).href);

const { CURSOS } = await cargar('src/content/catalogo.ts');

/** Las evaluaciones con clave: una por unidad disponible. El nombre en mayúsculas sale del id (c0-u1 → C0_U1). */
const UNIDADES_CON_EVALUACION = ['c0-u1', 'c0-u2', 'c0-u3', 'c0-u4', 'c1-u1', 'c3-u1', 'c3-u2', 'c3-u3', 'c3-u4'];
const EVALUACIONES = [];
for (const id of UNIDADES_CON_EVALUACION) {
  const nombre = id.toUpperCase().replace('-', '_');
  const { [`EVALUACION_${nombre}`]: evaluacion } = await cargar(`src/content/evaluaciones/${id}.ts`);
  const { [`CLAVE_${nombre}`]: clave } = await cargar(`src/content/evaluaciones/${id}.clave.datos.ts`);
  if (!evaluacion || !clave) {
    console.error(`Falta EVALUACION_${nombre} o CLAVE_${nombre} en src/content/evaluaciones/${id}*.ts`);
    process.exit(1);
  }
  EVALUACIONES.push({ evaluacion, clave });
}

const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const lineas = [
  '-- GENERADO por `npm run db:catalogo` desde src/content: no se edita a mano.',
  '-- Catálogo de cursos y lecciones, evaluaciones y su clave (esquema privado).',
  '',
];

for (const c of CURSOS) {
  lineas.push(
    `insert into public.cursos (id, orden, titulo) values (${q(c.id)}, ${c.numero}, ${q(c.titulo)})`,
    `  on conflict (id) do update set orden = excluded.orden, titulo = excluded.titulo;`,
  );
}
lineas.push('');
for (const c of CURSOS) {
  for (const u of c.unidades) {
    lineas.push(
      `insert into public.lecciones (id, curso_id, unidad, titulo, publicada) values (${q(u.id)}, ${q(c.id)}, ${u.numero}, ${q(u.titulo)}, ${u.estado === 'disponible'})`,
      `  on conflict (id) do update set curso_id = excluded.curso_id, unidad = excluded.unidad, titulo = excluded.titulo, publicada = excluded.publicada;`,
    );
  }
}
lineas.push('');
for (const { evaluacion, clave } of EVALUACIONES) {
  const numeros = evaluacion.preguntas.map((p) => p.n);
  const enClave = Object.keys(clave).map(Number);
  if (numeros.length !== enClave.length || numeros.some((n) => !enClave.includes(n))) {
    console.error(`La clave de ${evaluacion.id} no tiene las mismas preguntas que la evaluación.`);
    process.exit(1);
  }
  for (const p of evaluacion.preguntas) {
    if (!p.opciones.some((o) => o.id === clave[p.n].correcta)) {
      console.error(`${evaluacion.id} #${p.n}: la respuesta correcta «${clave[p.n].correcta}» no es una de sus opciones.`);
      process.exit(1);
    }
  }
  lineas.push(
    `insert into public.evaluaciones (id, leccion_id, total, umbral_dominio) values (${q(evaluacion.id)}, ${q(evaluacion.leccionId)}, ${numeros.length}, ${evaluacion.umbral})`,
    `  on conflict (id) do update set leccion_id = excluded.leccion_id, total = excluded.total, umbral_dominio = excluded.umbral_dominio;`,
    `delete from privado.claves where evaluacion_id = ${q(evaluacion.id)};`,
  );
  for (const n of numeros) {
    lineas.push(
      `insert into privado.claves (evaluacion_id, pregunta, opcion_correcta) values (${q(evaluacion.id)}, ${n}, ${q(clave[n].correcta)});`,
    );
  }
}

const texto = lineas.join('\n') + '\n';
const destino = path.join(raiz, 'supabase', 'migrations', '20261022000002_catalogo.sql');

if (process.argv.includes('--check')) {
  const actual = existsSync(destino) ? readFileSync(destino, 'utf8').replace(/\r\n/g, '\n') : '';
  if (actual !== texto) {
    console.error('La migración del catálogo no coincide con src/content: ejecuta npm run db:catalogo');
    process.exit(1);
  }
  console.log('catálogo SQL al día');
} else {
  writeFileSync(destino, texto);
  console.log(`escrito ${path.relative(raiz, destino)}`);
}
