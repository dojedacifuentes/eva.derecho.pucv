/**
 * Permisos (RLS) con el SQL real de supabase/migrations sobre PostgreSQL (PGlite), con los datos ficticios del seed.
 * Cada consulta corre como la API de Supabase: rol anon o authenticated con el JWT de una persona.
 */
import type { PGlite } from '@electric-sql/pglite';
import { beforeAll, describe, expect, it } from 'vitest';
import { baseDePrueba, como } from './db/base';

const ADMIN = '00000000-0000-4000-8000-0000000000a1';
const DOC1 = '00000000-0000-4000-8000-0000000000d1';
const DOC2 = '00000000-0000-4000-8000-0000000000d2';
const E1 = '00000000-0000-4000-8000-0000000000e1';
const E2 = '00000000-0000-4000-8000-0000000000e2';
const E3 = '00000000-0000-4000-8000-0000000000e3';
const E4 = '00000000-0000-4000-8000-0000000000e4';

let db: PGlite;
beforeAll(async () => {
  db = await baseDePrueba({ seed: true });
});

const ids = (filas: { estudiante_id?: unknown; id?: unknown }[], campo: 'estudiante_id' | 'id' = 'estudiante_id') =>
  filas.map((f) => f[campo]).sort();

describe('visitante sin sesión (anon)', () => {
  it('lee el catálogo', async () => {
    const filas = await como(db, null, (q) => q('select id from public.lecciones order by id'));
    // Ocho cursos de cuatro unidades: el Curso 0, los cuatro de la serie PUCV y las tres maquetas (23-10-2026).
    expect(filas).toHaveLength(32);
  });

  it('no lee perfiles, avance, intentos ni bitácoras', async () => {
    for (const tabla of ['perfiles', 'progreso', 'intentos', 'bitacoras', 'secciones', 'inscripciones']) {
      await expect(como(db, null, (q) => q(`select * from public.${tabla}`))).rejects.toThrow(/permission denied/);
    }
  });

  it('no puede ejecutar las funciones que escriben', async () => {
    await expect(como(db, null, (q) => q(`select public.marcar_paso('c1-u1', 'lectura')`))).rejects.toThrow(
      /permission denied/,
    );
    await expect(
      como(db, null, (q) => q(`select public.enviar_evaluacion('c1-u1-eval', '{}'::jsonb)`)),
    ).rejects.toThrow(/permission denied/);
  });
});

describe('estudiante', () => {
  it('ve sólo su propio avance, intentos y perfil', async () => {
    const avance = await como(db, E2, (q) => q('select estudiante_id from public.progreso'));
    expect(ids(avance)).toEqual([E2]);
    const intentos = await como(db, E1, (q) => q('select estudiante_id from public.intentos'));
    expect(ids(intentos)).toEqual([E1]);
    const perfiles = await como(db, E1, (q) => q('select id from public.perfiles'));
    expect(ids(perfiles, 'id')).toEqual([E1]);
  });

  it('no escribe su avance ni sus intentos directamente', async () => {
    await expect(
      como(db, E2, (q) => q(`update public.progreso set dominio = true, completada = true where estudiante_id = $1`, [E2])),
    ).rejects.toThrow(/permission denied/);
    await expect(
      como(db, E2, (q) =>
        q(`insert into public.intentos (estudiante_id, evaluacion_id, respuestas, correctas, total)
           values ($1, 'c1-u1-eval', '{}', 5, 5)`, [E2]),
      ),
    ).rejects.toThrow(/permission denied/);
  });

  it('no lee la clave de las evaluaciones', async () => {
    await expect(como(db, E1, (q) => q('select * from privado.claves'))).rejects.toThrow(/permission denied/);
  });

  it('cambia su nombre visible pero no su rol', async () => {
    const filas = await como(db, E1, (q) =>
      q(`update public.perfiles set nombre_visible = 'Otro nombre' where id = $1 returning nombre_visible`, [E1]),
    );
    expect(filas).toEqual([{ nombre_visible: 'Otro nombre' }]);
    await expect(
      como(db, E1, (q) => q(`update public.perfiles set rol = 'admin' where id = $1`, [E1])),
    ).rejects.toThrow(/permission denied/);
    await expect(como(db, E1, (q) => q(`select public.asignar_rol($1, 'admin')`, [E1]))).rejects.toThrow(
      /Sólo administración/,
    );
  });

  it('no edita el perfil de otra persona', async () => {
    const filas = await como(db, E1, (q) =>
      q(`update public.perfiles set nombre_visible = 'x' where id = $1 returning id`, [E2]),
    );
    expect(filas).toEqual([]);
  });

  it('escribe su bitácora y no la de otra persona', async () => {
    const propia = await como(db, E2, (q) =>
      q(`insert into public.bitacoras (leccion_id, que_pedi) values ('c1-u1', 'Preguntas') returning estudiante_id`),
    );
    expect(ids(propia)).toEqual([E2]);
    await expect(
      como(db, E2, (q) => q(`insert into public.bitacoras (estudiante_id, leccion_id) values ($1, 'c1-u1')`, [E4])),
    ).rejects.toThrow(/permission denied|row-level security/);
  });

  it('ve sólo la sección en que está inscrito', async () => {
    const filas = await como(db, E4, (q) => q('select nombre from public.secciones'));
    expect(filas).toEqual([{ nombre: 'Introducción al Derecho · Sección demo B' }]);
  });

  it('mis_datos devuelve sólo lo suyo', async () => {
    const [{ datos }] = await como(db, E1, (q) => q<{ datos: Record<string, unknown[]> }>('select public.mis_datos() as datos'));
    expect((datos.progreso as { estudiante_id: string }[]).every((p) => p.estudiante_id === E1)).toBe(true);
    expect(datos.intentos).toHaveLength(1);
  });
});

describe('docente', () => {
  it('ve el avance de sus secciones y no el de otras', async () => {
    const uno = await como(db, DOC1, (q) => q('select estudiante_id from public.progreso'));
    expect(ids(uno)).toEqual([E1, E2, E3].sort());
    const dos = await como(db, DOC2, (q) => q('select estudiante_id from public.progreso'));
    expect(ids(dos)).toEqual([E4]);
  });

  it('ve los perfiles de sus estudiantes, no los de otros', async () => {
    const filas = await como(db, DOC2, (q) => q('select id from public.perfiles'));
    expect(ids(filas, 'id')).toEqual([DOC2, E4].sort());
  });

  it('ve una bitácora sólo si el estudiante la compartió', async () => {
    const filas = await como(db, DOC1, (q) => q('select estudiante_id from public.bitacoras'));
    expect(ids(filas)).toEqual([E1]);
  });

  it('no modifica el avance de sus estudiantes', async () => {
    await expect(
      como(db, DOC1, (q) => q(`update public.progreso set dominio = true where estudiante_id = $1`, [E2])),
    ).rejects.toThrow(/permission denied/);
  });

  it('un docente sin la sección no ve nada aunque sea docente', async () => {
    const filas = await como(db, DOC2, (q) => q('select estudiante_id from public.intentos'));
    expect(filas).toEqual([]);
  });
});

describe('administración', () => {
  it('ve todo el avance', async () => {
    const filas = await como(db, ADMIN, (q) => q('select estudiante_id from public.progreso'));
    expect(filas).toHaveLength(4);
  });

  it('asigna roles con asignar_rol', async () => {
    const [{ rol }] = await como(db, ADMIN, async (q) => {
      await q(`select public.asignar_rol($1, 'docente')`, [E3]);
      return q<{ rol: string }>('select rol from public.perfiles where id = $1', [E3]);
    });
    expect(rol).toBe('docente');
  });
});
