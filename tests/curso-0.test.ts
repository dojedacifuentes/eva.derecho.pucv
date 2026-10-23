import { describe, expect, it } from 'vitest';
import { LECCIONES } from '@/components/leccion/registro';
import { EN_ACADEMY } from '@/content/academy';
import { CURSOS } from '@/content/catalogo';
import { CLAVE_C0_U1 } from '@/content/evaluaciones/c0-u1.clave.datos';
import { EVALUACION_C0_U1 } from '@/content/evaluaciones/c0-u1';
import { CLAVE_C0_U2 } from '@/content/evaluaciones/c0-u2.clave.datos';
import { EVALUACION_C0_U2 } from '@/content/evaluaciones/c0-u2';
import { CLAVE_C0_U3 } from '@/content/evaluaciones/c0-u3.clave.datos';
import { EVALUACION_C0_U3 } from '@/content/evaluaciones/c0-u3';
import { CLAVE_C0_U4 } from '@/content/evaluaciones/c0-u4.clave.datos';
import { EVALUACION_C0_U4 } from '@/content/evaluaciones/c0-u4';
import type { EnvioEvaluacion } from '@/content/evaluaciones/tipos';
import { AUTOESTUDIO_C0, GLOSARIO_C0, LECTURAS_C0, SABIAS_QUE_C0 } from '@/content/lecciones/c0-glosario';
import { GUION_C0_U1, PRACTICA_C0_U1 } from '@/content/lecciones/c0-u1-guion';
import { GUION_C0_U2, PRACTICA_C0_U2 } from '@/content/lecciones/c0-u2-guion';
import { GUION_C0_U3, PRACTICA_C0_U3 } from '@/content/lecciones/c0-u3-guion';
import { GUION_C0_U4, PRACTICA_C0_U4 } from '@/content/lecciones/c0-u4-guion';
import { calificar } from '@/lib/evaluacion/calificar';

const UNIDADES = [
  { id: 'c0-u1', evaluacion: EVALUACION_C0_U1, clave: CLAVE_C0_U1, guion: GUION_C0_U1, practica: PRACTICA_C0_U1 },
  { id: 'c0-u2', evaluacion: EVALUACION_C0_U2, clave: CLAVE_C0_U2, guion: GUION_C0_U2, practica: PRACTICA_C0_U2 },
  { id: 'c0-u3', evaluacion: EVALUACION_C0_U3, clave: CLAVE_C0_U3, guion: GUION_C0_U3, practica: PRACTICA_C0_U3 },
  { id: 'c0-u4', evaluacion: EVALUACION_C0_U4, clave: CLAVE_C0_U4, guion: GUION_C0_U4, practica: PRACTICA_C0_U4 },
];

describe('Curso 0 · ¿Qué es la inteligencia artificial?', () => {
  it('es el primer curso del catálogo, con número 0 y cuatro unidades disponibles', () => {
    const c0 = CURSOS[0];
    expect(c0.id).toBe('c0');
    expect(c0.numero).toBe(0);
    expect(c0.unidades.map((u) => u.id)).toEqual(['c0-u1', 'c0-u2', 'c0-u3', 'c0-u4']);
    for (const u of c0.unidades) expect(u.estado).toBe('disponible');
    // Los dieciséis ids originales siguen ahí.
    expect(CURSOS.flatMap((c) => c.unidades).length).toBe(20);
  });

  it.each(UNIDADES)('$id: la evaluación tiene cinco preguntas y su clave corresponde a opciones que existen', ({ id, evaluacion, clave }) => {
    expect(evaluacion.leccionId).toBe(id);
    expect(evaluacion.preguntas).toHaveLength(5);
    for (const p of evaluacion.preguntas) {
      expect(p.opciones.map((o) => o.id), `${id} #${p.n}`).toContain(clave[p.n].correcta);
      expect(clave[p.n].retro.length).toBeGreaterThan(40);
    }
  });

  it.each(UNIDADES)('$id: marcar siempre la misma letra no alcanza el dominio', ({ evaluacion, clave }) => {
    for (const letra of ['a', 'b', 'c', 'd']) {
      const envio: EnvioEvaluacion = {
        respuestas: Object.fromEntries(
          evaluacion.preguntas.map((p) => [p.n, { opcion: p.tipo === 'verdadero-falso' ? 'v' : letra, confianza: 'seguro' as const, pistas: 0 }]),
        ),
      };
      expect(calificar(clave, envio, evaluacion.umbral).dominio, letra).toBe(false);
    }
  });

  it.each(UNIDADES)('$id: EVA dice que es una IA y el guion cabe en 150 a 250 palabras', ({ guion }) => {
    expect(guion[0].voz).toMatch(/Soy EVA, una inteligencia artificial/);
    const palabras = guion.reduce((s, t) => s + t.voz.split(/\s+/).length, 0);
    expect(palabras).toBeGreaterThanOrEqual(150);
    expect(palabras).toBeLessThanOrEqual(250);
  });

  it.each(UNIDADES)('$id: la clave de la práctica cubre cada ítem con una opción que existe', ({ id, practica }) => {
    expect(practica.leccionId).toBe(id);
    const opciones = practica.clasificacion.opciones.map((o) => o.id);
    for (const item of practica.clasificacion.items) {
      const c = practica.clasificacion.clave[item.id];
      expect(c, `${id} ${item.id}`).toBeDefined();
      expect(opciones).toContain(c.correcta);
      expect(c.porque.length).toBeGreaterThan(40);
    }
    expect(practica.cotejo.length).toBeGreaterThanOrEqual(3);
  });

  it('cada unidad tiene glosario, «¿Sabías que?», preguntas y lecturas, y el registro los expone', () => {
    for (const { id } of UNIDADES) {
      expect(GLOSARIO_C0[id].length, id).toBeGreaterThan(0);
      expect(SABIAS_QUE_C0[id].length, id).toBeGreaterThan(0);
      expect(AUTOESTUDIO_C0[id].length, id).toBeGreaterThan(0);
      expect(LECTURAS_C0[id].length, id).toBeGreaterThan(0);
      expect(LECCIONES[id].glosario).toBe(GLOSARIO_C0[id]);
    }
  });

  it('enlaza las dos lecciones de EVA ACADEMY pedidas, sin copiarlas', () => {
    expect(EN_ACADEMY['c0-u1'].lecciones.map((l) => l.leccion)).toContain('que-es-la-ia');
    expect(EN_ACADEMY['c0-u4'].lecciones.map((l) => l.leccion)).toContain('dos-escuelas');
  });

  it('no usa la palabra «desafío»', () => {
    const textos = [
      JSON.stringify(CURSOS[0]),
      ...UNIDADES.flatMap((u) => [JSON.stringify(u.evaluacion), JSON.stringify(u.clave), JSON.stringify(u.guion), JSON.stringify(u.practica)]),
      JSON.stringify(GLOSARIO_C0),
      JSON.stringify(SABIAS_QUE_C0),
      JSON.stringify(AUTOESTUDIO_C0),
      JSON.stringify(LECTURAS_C0),
    ];
    for (const t of textos) expect(t.toLowerCase()).not.toMatch(/desaf[ií]/);
  });
});
