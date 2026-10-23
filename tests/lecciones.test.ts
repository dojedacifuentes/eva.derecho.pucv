import { describe, expect, it } from 'vitest';
import { LECCIONES } from '@/components/leccion/registro';
import { TODAS_LAS_UNIDADES } from '@/content/catalogo';
import { CLAVE_C3_U1, OJO_C3_U1 } from '@/content/evaluaciones/c3-u1.clave.datos';
import { EVALUACION_C3_U1 } from '@/content/evaluaciones/c3-u1';
import { CLAVE_C3_U2, OJO_C3_U2 } from '@/content/evaluaciones/c3-u2.clave.datos';
import { EVALUACION_C3_U2 } from '@/content/evaluaciones/c3-u2';
import { CLAVE_C3_U3, OJO_C3_U3 } from '@/content/evaluaciones/c3-u3.clave.datos';
import { EVALUACION_C3_U3 } from '@/content/evaluaciones/c3-u3';
import { CLAVE_C3_U4, OJO_C3_U4 } from '@/content/evaluaciones/c3-u4.clave.datos';
import { EVALUACION_C3_U4 } from '@/content/evaluaciones/c3-u4';
import type { EnvioEvaluacion } from '@/content/evaluaciones/tipos';
import { BORRADOR_C3_U1 } from '@/content/lecciones/c3-u1-guion';
import { RESPUESTA_IA_C3_U2 } from '@/content/lecciones/c3-u2-guion';
import { RESPUESTA_IA_C3_U3 } from '@/content/lecciones/c3-u3-guion';
import { BITACORA_COMPANERO } from '@/content/lecciones/c3-u4-guion';
import { calificar, ganaOjoClinico, limpiarEnvio } from '@/lib/evaluacion/calificar';

describe('registro de lecciones', () => {
  it('cada unidad «disponible» del catálogo tiene su lección completa, y al revés', () => {
    const disponibles = TODAS_LAS_UNIDADES.filter(({ unidad }) => unidad.estado === 'disponible').map(({ unidad }) => unidad.id);
    expect(Object.keys(LECCIONES).sort()).toEqual(disponibles.sort());
  });

  it('cada evaluación pertenece a su lección y tiene al menos tantas preguntas como el umbral', () => {
    for (const [id, l] of Object.entries(LECCIONES)) {
      expect(l.evaluacion.leccionId).toBe(id);
      expect(l.evaluacion.preguntas.length).toBeGreaterThanOrEqual(l.evaluacion.umbral);
      expect(l.fuentes.length).toBeGreaterThan(0);
    }
  });
});

describe('unidad 3.1', () => {
  const todas = (opciones: Record<number, string>, pistas4 = 0): EnvioEvaluacion => ({
    respuestas: Object.fromEntries(
      Object.entries(opciones).map(([n, opcion]) => [n, { opcion, confianza: 'seguro' as const, pistas: Number(n) === 4 ? pistas4 : 0 }]),
    ),
  });
  const PERFECTO = { 1: 'c', 2: 'a', 3: 'f', 4: 'b', 5: 'c' };

  it('la clave corresponde a opciones que existen', () => {
    for (const p of EVALUACION_C3_U1.preguntas) expect(p.opciones.map((o) => o.id)).toContain(CLAVE_C3_U1[p.n].correcta);
  });

  it('marcar siempre la misma letra no alcanza el dominio', () => {
    for (const letra of ['a', 'b', 'c', 'd']) {
      const envio = todas(Object.fromEntries(EVALUACION_C3_U1.preguntas.map((p) => [p.n, p.tipo === 'verdadero-falso' ? 'v' : letra])));
      expect(calificar(CLAVE_C3_U1, envio, EVALUACION_C3_U1.umbral).dominio, letra).toBe(false);
    }
  });

  it('las ids del semáforo del borrador pasan la validación del envío', () => {
    const semaforo = Object.fromEntries(BORRADOR_C3_U1.citas.map((c) => [c.id, 'amarillo']));
    const limpio = limpiarEnvio({ ...todas(PERFECTO), semaforo }, [1, 2, 3, 4, 5]);
    expect(Object.keys(limpio?.semaforo ?? {})).toEqual(BORRADOR_C3_U1.citas.map((c) => c.id));
  });

  it('«Ojo clínico»: rojo sólo a la cita 2 y la pregunta 4 sin pistas', () => {
    const bien: EnvioEvaluacion = { ...todas(PERFECTO), semaforo: { c1: 'verde', c2: 'rojo', c3: 'amarillo', c4: 'amarillo' } };
    const r = calificar(CLAVE_C3_U1, bien, EVALUACION_C3_U1.umbral);
    expect(r.correctas).toBe(5);
    expect(ganaOjoClinico(bien, r.detalle, OJO_C3_U1)).toBe(true);
    expect(ganaOjoClinico({ ...bien, semaforo: { ...bien.semaforo, c3: 'rojo' } }, r.detalle, OJO_C3_U1)).toBe(false);
    const conPista = { ...todas(PERFECTO, 1), semaforo: bien.semaforo };
    expect(ganaOjoClinico(conPista, r.detalle, OJO_C3_U1)).toBe(false);
  });
});

describe('unidad 3.2', () => {
  const envio = (opciones: Record<number, string>, pistas4 = 0): EnvioEvaluacion => ({
    respuestas: Object.fromEntries(
      Object.entries(opciones).map(([n, opcion]) => [n, { opcion, confianza: 'dudoso' as const, pistas: Number(n) === 4 ? pistas4 : 0 }]),
    ),
  });
  const PERFECTO = { 1: 'd', 2: 'b', 3: 'f', 4: 'a', 5: 'c' };

  it('la clave corresponde a opciones que existen y adivinar con una letra no da dominio', () => {
    for (const p of EVALUACION_C3_U2.preguntas) expect(p.opciones.map((o) => o.id)).toContain(CLAVE_C3_U2[p.n].correcta);
    for (const letra of ['a', 'b', 'c', 'd']) {
      const e = envio(Object.fromEntries(EVALUACION_C3_U2.preguntas.map((p) => [p.n, p.tipo === 'verdadero-falso' ? 'f' : letra])));
      expect(calificar(CLAVE_C3_U2, e, EVALUACION_C3_U2.umbral).dominio, letra).toBe(false);
    }
  });

  it('«Ojo clínico»: rojo sólo a la fecha de publicación falsa', () => {
    const ids = RESPUESTA_IA_C3_U2.afirmaciones.map((a) => a.id);
    expect(ids).toEqual(['c1', 'c2', 'c3']);
    const bien: EnvioEvaluacion = { ...envio(PERFECTO), semaforo: { c1: 'rojo', c2: 'amarillo', c3: 'verde' } };
    const r = calificar(CLAVE_C3_U2, bien, EVALUACION_C3_U2.umbral);
    expect(r.correctas).toBe(5);
    expect(ganaOjoClinico(bien, r.detalle, OJO_C3_U2)).toBe(true);
    expect(ganaOjoClinico({ ...bien, semaforo: { c1: 'rojo', c2: 'rojo', c3: 'verde' } }, r.detalle, OJO_C3_U2)).toBe(false);
  });
});

describe('unidad 3.3', () => {
  const envio = (opciones: Record<number, string>, pistas4 = 0): EnvioEvaluacion => ({
    respuestas: Object.fromEntries(
      Object.entries(opciones).map(([n, opcion]) => [n, { opcion, confianza: 'seguro' as const, pistas: Number(n) === 4 ? pistas4 : 0 }]),
    ),
  });
  const PERFECTO = { 1: 'd', 2: 'f', 3: 'c', 4: 'a', 5: 'b' };

  it('la clave corresponde a opciones que existen y adivinar con una letra no da dominio', () => {
    for (const p of EVALUACION_C3_U3.preguntas) expect(p.opciones.map((o) => o.id)).toContain(CLAVE_C3_U3[p.n].correcta);
    for (const letra of ['a', 'b', 'c', 'd']) {
      const e = envio(Object.fromEntries(EVALUACION_C3_U3.preguntas.map((p) => [p.n, p.tipo === 'verdadero-falso' ? 'f' : letra])));
      expect(calificar(CLAVE_C3_U3, e, EVALUACION_C3_U3.umbral).dominio, letra).toBe(false);
    }
  });

  it('«Ojo clínico»: rojo sólo a la cita inexistente (la 3)', () => {
    expect(RESPUESTA_IA_C3_U3.citas.map((c) => c.id)).toEqual(['c1', 'c2', 'c3']);
    const bien: EnvioEvaluacion = { ...envio(PERFECTO), semaforo: { c1: 'verde', c2: 'amarillo', c3: 'rojo' } };
    const r = calificar(CLAVE_C3_U3, bien, EVALUACION_C3_U3.umbral);
    expect(r.correctas).toBe(5);
    expect(ganaOjoClinico(bien, r.detalle, OJO_C3_U3)).toBe(true);
    expect(ganaOjoClinico({ ...bien, semaforo: { c1: 'verde', c2: 'rojo', c3: 'rojo' } }, r.detalle, OJO_C3_U3)).toBe(false);
    expect(ganaOjoClinico({ ...envio(PERFECTO, 1), semaforo: bien.semaforo }, r.detalle, OJO_C3_U3)).toBe(false);
  });
});

describe('unidad 3.4', () => {
  const envio = (opciones: Record<number, string>, pistas4 = 0): EnvioEvaluacion => ({
    respuestas: Object.fromEntries(
      Object.entries(opciones).map(([n, opcion]) => [n, { opcion, confianza: 'seguro' as const, pistas: Number(n) === 4 ? pistas4 : 0 }]),
    ),
  });
  const PERFECTO = { 1: 'b', 2: 'a', 3: 'f', 4: 'c', 5: 'd' };

  it('la clave corresponde a opciones que existen y adivinar con una letra no da dominio', () => {
    for (const p of EVALUACION_C3_U4.preguntas) expect(p.opciones.map((o) => o.id)).toContain(CLAVE_C3_U4[p.n].correcta);
    for (const letra of ['a', 'b', 'c', 'd']) {
      const e = envio(Object.fromEntries(EVALUACION_C3_U4.preguntas.map((p) => [p.n, p.tipo === 'verdadero-falso' ? 'f' : letra])));
      expect(calificar(CLAVE_C3_U4, e, EVALUACION_C3_U4.umbral).dominio, letra).toBe(false);
    }
  });

  it('la entrada errónea es la que enlaza otra norma que la que afirma', () => {
    const [c1, , c3] = BITACORA_COMPANERO.entradas;
    expect(c3.estado).toBe('Verificada');
    expect(c3.afirma).toContain('Código Civil');
    expect(c3.enlace).toBe(c1.enlace); // el enlace de la Ley 21.719
  });

  it('«Ojo clínico»: rojo sólo a la entrada 3', () => {
    const bien: EnvioEvaluacion = { ...envio(PERFECTO), semaforo: { c1: 'verde', c2: 'amarillo', c3: 'rojo', c4: 'amarillo' } };
    const r = calificar(CLAVE_C3_U4, bien, EVALUACION_C3_U4.umbral);
    expect(r.correctas).toBe(5);
    expect(ganaOjoClinico(bien, r.detalle, OJO_C3_U4)).toBe(true);
    expect(ganaOjoClinico({ ...bien, semaforo: { ...bien.semaforo, c4: 'rojo' } }, r.detalle, OJO_C3_U4)).toBe(false);
  });
});
