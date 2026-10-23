import type { Clave, ReglaOjoClinico } from './tipos';

/**
 * CLAVE de la evaluación c1-u1. NO importar desde componentes: se lee sólo a través de
 * `src/lib/evaluacion/claves.server.ts` (marcado server-only) y del script que genera el SQL.
 * Una prueba revisa que ningún archivo con 'use client' la importe.
 */
export const CLAVE_C1_U1: Clave = {
  1: {
    correcta: 'c',
    retro:
      'Practicar el recuerdo es intentar responder sin ayuda y después comprobar. Resumir y explicar te entregan la respuesta hecha: se sienten útiles, pero no te obligan a recordar.',
  },
  2: {
    correcta: 'f',
    retro:
      'En el estudio de Bastani y otros (PNAS, 2025), quienes practicaron con un chat que daba las respuestas resolvieron mejor la práctica, pero en la prueba sin IA rindieron un 17 % menos que quienes nunca lo usaron. Resolver con ayuda no es lo mismo que haber aprendido.',
  },
  3: {
    correcta: 'b',
    retro:
      'Notar la distancia entre tu seguridad y tu acierto te dice qué estudiar. Si estabas seguro y fallaste, ahí está lo que creías saber y no sabías.',
  },
  4: {
    correcta: 'b',
    retro:
      'La respuesta de EVA era correcta. El art. 20 sí dice «sentido natural y obvio», pero no dice «todas» las palabras: es la regla general. El art. 21 regula las palabras técnicas: «se tomarán en el sentido que les den los que profesan la misma ciencia o arte». La IA citó un artículo real para sostener algo que ese artículo no dice, con la misma seguridad con que acertó en la primera corrección. Se descubría volviendo al §4 del apunte o al art. 21 en LeyChile.',
  },
  5: {
    correcta: 'c',
    retro:
      'Preguntarle a otra IA, o a la misma, es pedirle a otro modelo que prediga: no es verificar. Se verifica en el texto: tu apunte, la ley en LeyChile, la sentencia. La guía del Colegio de Abogados de Chile (2026) pide lo mismo a los abogados: la verificación hecha por otra IA no reemplaza la propia.',
  },
};

/** «Ojo clínico»: rojo a la segunda corrección (la errónea), no a la primera, y la pregunta 4 sin pistas. */
export const OJO_C1_U1: ReglaOjoClinico = { pregunta: 4, rojo: 'c2', noRojo: ['c1'] };
