import { PGlite } from '@electric-sql/pglite';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const raiz = path.resolve(__dirname, '..', '..');
const leer = (rel: string) => readFileSync(path.join(raiz, rel), 'utf8');

/** Una base PostgreSQL en memoria con la réplica de Supabase, todas las migraciones y, si se pide, el seed. */
export async function baseDePrueba({ seed = false } = {}) {
  const db = new PGlite();
  await db.exec(leer('tests/db/supabase-shim.sql'));
  const migraciones = readdirSync(path.join(raiz, 'supabase', 'migrations'))
    .filter((f) => f.endsWith('.sql'))
    .sort();
  for (const m of migraciones) await db.exec(leer(`supabase/migrations/${m}`));
  if (seed) await db.exec(leer('supabase/seed.sql'));
  return db;
}

/**
 * Ejecuta como lo haría la API de Supabase: rol `authenticated` con el JWT de `uid`, o `anon` si no hay uid.
 * Todo dentro de una transacción que se deshace, salvo que se pida guardar.
 */
export async function como<T>(
  db: PGlite,
  uid: string | null,
  fn: (q: <R = Record<string, unknown>>(sql: string, params?: unknown[]) => Promise<R[]>) => Promise<T>,
  { guardar = false } = {},
): Promise<T> {
  await db.exec('begin');
  try {
    await db.query(`select set_config('role', $1, true)`, [uid ? 'authenticated' : 'anon']);
    await db.query(`select set_config('request.jwt.claims', $1, true)`, [
      uid ? JSON.stringify({ sub: uid, role: 'authenticated' }) : JSON.stringify({ role: 'anon' }),
    ]);
    const resultado = await fn(async (sql, params) => (await db.query(sql, params)).rows as never);
    await db.exec(guardar ? 'commit' : 'rollback');
    return resultado;
  } catch (e) {
    await db.exec('rollback');
    throw e;
  }
}

export async function crearUsuario(db: PGlite, id: string, email: string, rol?: 'docente' | 'admin') {
  await db.query('insert into auth.users (id, email) values ($1, $2)', [id, email]);
  if (rol) await db.query('update public.perfiles set rol = $1 where id = $2', [rol, id]);
}
