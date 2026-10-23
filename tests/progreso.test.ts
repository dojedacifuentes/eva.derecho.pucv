/**
 * Avance y evaluación: las funciones SQL (marcar_paso, enviar_evaluacion) y su espejo en TypeScript
 * (lib/progreso/modelo.ts y lib/evaluacion/calificar.ts) deben decir lo mismo.
 */
import type { PGlite } from '@electric-sql/pglite';
import { beforeEach, describe, expect, it } from 'vitest';
import { CLAVE_C1_U1, OJO_C1_U1 } from '@/content/evaluaciones/c1-u1.clave.datos';
import { EVALUACION_C1_U1 } from '@/content/evaluaciones/c1-u1';
import type { EnvioEvaluacion } from '@/content/evaluaciones/tipos';
import { calificar, ganaOjoClinico, limpiarEnvio, segurosErrados } from '@/lib/evaluacion/calificar';
import { avanceVacio, marcarPaso, porcentaje, registrarEvaluacion } from '@/lib/progreso/modelo';
import { baseDePrueba, como, crearUsuario } from './db/base';

const ANA = '11111111-1111-4111-8111-111111111111';
let db: PGlite;

beforeEach(async () => {
  db = await baseDePrueba();
  await crearUsuario(db, ANA, 'ana.ficticia@example.com');
});

const envio = (opciones: string[], confianza: 'seguro' | 'dudoso' | 'no-se' = 'seguro'): EnvioEvaluacion => ({
  respuestas: Object.fromEntries(opciones.map((o, i) => [i + 1, { opcion: o, confianza }])),
});
const PERFECTO = ['c', 'f', 'b', 'b', 'c'];
const TRES = ['c', 'f', 'b', 'a', 'a'];

async function sqlEnviar(e: EnvioEvaluacion) {
  const [{ r }] = await como(
    db,
    ANA,
    (q) => q<{ r: { correctas: number; dominio: boolean; completada: boolean; detalle: { pregunta: number; correcta: boolean }[] } }>(
      `select public.enviar_evaluacion('c1-u1-eval', $1::jsonb) as r`,
      [JSON.stringify(e.respuestas)],
    ),
    { guardar: true },
  );
  return r;
}
async function sqlPaso(paso: string, calibracion: number | null = null) {
  await como(db, ANA, (q) => q(`select public.marcar_paso('c1-u1', $1::public.paso_leccion, $2::smallint)`, [paso, calibracion]), {
    guardar: true,
  });
}
async function sqlAvance() {
  const filas = await como(db, ANA, (q) =>
    q<{ pasos: string; dominio: boolean; completada: boolean; calibracion_inicial: number | null }>(
      `select pasos::text, dominio, completada, calibracion_inicial from public.progreso where leccion_id = 'c1-u1'`,
    ),
  );
  return filas[0];
}

describe('marcar_paso', () => {
  it('crea el avance y guarda la calibración sólo la primera vez', async () => {
    await sqlPaso('entrada', 4);
    await sqlPaso('entrada', 2);
    expect(await sqlAvance()).toMatchObject({ pasos: '{entrada}', calibracion_inicial: 4, completada: false });
  });

  it('no deja marcar la evaluación por esta vía ni pasos de lecciones no publicadas', async () => {
    await expect(sqlPaso('evaluacion')).rejects.toThrow(/enviar_evaluacion/);
    await expect(
      como(db, ANA, (q) => q(`select public.marcar_paso('c1-u2', 'lectura')`)),
    ).rejects.toThrow(/no disponible/);
  });

  it('rechaza una calibración fuera de rango', async () => {
    await expect(sqlPaso('entrada', 9)).rejects.toThrow(/Calibración inválida/);
  });
});

describe('enviar_evaluacion', () => {
  it('corrige en la base y no da dominio con 3 de 5', async () => {
    const r = await sqlEnviar(envio(TRES));
    expect(r.correctas).toBe(3);
    expect(r.dominio).toBe(false);
    expect(r.detalle.map((d) => d.correcta)).toEqual([true, true, true, false, false]);
  });

  it('el dominio se gana con 4 de 5 y no se pierde con un intento peor', async () => {
    await sqlEnviar(envio(PERFECTO));
    const peor = await sqlEnviar(envio(['a', 'a', 'a', 'a', 'a']));
    expect(peor.correctas).toBe(0);
    expect(peor.dominio).toBe(true);
  });

  it('la lección se completa con los cuatro pasos y el dominio, en cualquier orden', async () => {
    await sqlEnviar(envio(PERFECTO));
    for (const p of ['entrada', 'presentacion', 'lectura']) await sqlPaso(p);
    expect((await sqlAvance()).completada).toBe(false);
    await sqlPaso('practica');
    expect(await sqlAvance()).toMatchObject({ completada: true, dominio: true });
  });

  it('una respuesta faltante cuenta como incorrecta', async () => {
    const r = await sqlEnviar({ respuestas: { 1: { opcion: 'c', confianza: 'seguro' } } });
    expect(r.correctas).toBe(1);
  });

  it('el estudiante ve sus intentos guardados, con la confianza declarada', async () => {
    await sqlEnviar(envio(PERFECTO, 'dudoso'));
    const filas = await como(db, ANA, (q) => q<{ respuestas: Record<string, { confianza: string }> }>('select respuestas from public.intentos'));
    expect(filas[0].respuestas['1'].confianza).toBe('dudoso');
  });
});

describe('la corrección en TypeScript coincide con la de SQL', () => {
  const casos = [PERFECTO, TRES, ['a', 'v', 'a', 'b', 'c'], ['d', 'f', 'c', 'b', 'b'], ['c', 'v', 'b', 'b', 'c']];
  for (const opciones of casos) {
    it(`mismo resultado para ${opciones.join('')}`, async () => {
      const e = envio(opciones);
      const ts = calificar(CLAVE_C1_U1, e, EVALUACION_C1_U1.umbral);
      const sql = await sqlEnviar(e);
      expect(ts.correctas).toBe(sql.correctas);
      expect(ts.detalle.map((d) => d.correcta)).toEqual(sql.detalle.map((d) => d.correcta));
    });
  }
});

describe('modelo de avance en el navegador', () => {
  it('sigue la misma regla de completitud que SQL', () => {
    let a = avanceVacio('c1-u1');
    a = marcarPaso(a, 'entrada', 3);
    a = registrarEvaluacion(a, { correctas: 5, total: 5, dominio: true });
    a = marcarPaso(a, 'presentacion');
    a = marcarPaso(a, 'lectura');
    expect(a.completada).toBe(false);
    a = marcarPaso(a, 'practica');
    expect(a.completada).toBe(true);
    expect(porcentaje(a)).toBe(100);
    expect(a.calibracionInicial).toBe(3);
  });

  it('guarda el mejor intento y no pierde el dominio', () => {
    let a = registrarEvaluacion(avanceVacio('c1-u1'), { correctas: 4, total: 5, dominio: true });
    a = registrarEvaluacion(a, { correctas: 1, total: 5, dominio: false });
    expect(a.dominio).toBe(true);
    expect(a.mejor).toEqual({ correctas: 4, total: 5 });
  });
});

describe('calibración, insignia y validación del envío', () => {
  it('cuenta los «seguro» equivocados', () => {
    const r = calificar(CLAVE_C1_U1, envio(TRES, 'seguro'), 4);
    expect(segurosErrados(r.detalle)).toBe(2);
  });

  it('«Ojo clínico» exige semáforo rojo en la segunda corrección, acierto en la 4 y sin pistas', () => {
    const e: EnvioEvaluacion = { ...envio(PERFECTO), semaforo: { c1: 'verde', c2: 'rojo' } };
    const r = calificar(CLAVE_C1_U1, e, 4);
    expect(ganaOjoClinico(e, r.detalle, OJO_C1_U1)).toBe(true);
    const conPista: EnvioEvaluacion = { ...e, respuestas: { ...e.respuestas, 4: { ...e.respuestas[4], pistas: 1 } } };
    expect(ganaOjoClinico(conPista, r.detalle, OJO_C1_U1)).toBe(false);
    expect(ganaOjoClinico({ ...e, semaforo: { c1: 'rojo', c2: 'rojo' } }, r.detalle, OJO_C1_U1)).toBe(false);
  });

  it('rechaza envíos mal formados', () => {
    const numeros = [1, 2, 3, 4, 5];
    expect(limpiarEnvio(null, numeros)).toBeNull();
    expect(limpiarEnvio({ respuestas: { 1: { opcion: 'c', confianza: 'seguro' } } }, numeros)).toBeNull();
    expect(limpiarEnvio({ respuestas: { ...envio(PERFECTO).respuestas, 2: { opcion: '<script>', confianza: 'seguro' } } }, numeros)).toBeNull();
    const bueno = limpiarEnvio({ ...envio(PERFECTO), semaforo: { c1: 'verde', c9: 'morado', x: 'rojo' } }, numeros);
    expect(bueno?.semaforo).toEqual({ c1: 'verde' });
  });
});
