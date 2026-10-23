import type { Clave, ReglaOjoClinico } from './tipos';

/**
 * CLAVE de la evaluación c3-u3. NO importar desde componentes: se lee sólo a través de
 * `src/lib/evaluacion/claves.server.ts` (marcado server-only) y del script que genera el SQL.
 * Fuentes en `src/content/lecciones/c3-u3-fuentes.ts`.
 */
export const CLAVE_C3_U3: Clave = {
  1: {
    correcta: 'd',
    retro:
      'La forma se imita, y las IA se equivocan igual, incluso dos a la vez o la misma dos veces. Sólo la fuente oficial confirma que el fallo existe y qué dice.',
  },
  2: {
    correcta: 'f',
    retro:
      'Puede existir con otra fecha, otra sala, o sin decir lo que la IA le atribuye. En la presentación, el segundo fallo era real y la fecha, no.',
  },
  3: {
    correcta: 'c',
    retro:
      'Un error de era o de tribunal también esconde un fallo real: por eso se busca sin la era y en otras pestañas. Si tampoco aparece, no se cita. Preguntarle a la IA produce otra respuesta con la misma forma, no una prueba; y cambiar el rol es inventar una cita nueva.',
  },
  4: {
    correcta: 'a',
    retro:
      'La cita 3 (rol 18734-2022) no da ningún resultado en el buscador de la Corte Suprema, ni con la era ni sin ella: forma perfecta, tribunal real, tema exacto, y no existe (búsqueda del 22-10-2026). La cita 2 (rol 25031-2018) existe y aplica el art. 19, pero es del 8 de junio de 2020, no de 2019: se usa corregida. La cita 1 resiste: rol, sala y fecha coinciden, y su extracto razona con el sentido natural y obvio de las palabras.',
  },
  5: {
    correcta: 'b',
    retro:
      'Lo que la IA entrega va en «descubrir»: pistas, roles, palabras para buscar. Son sospechosos, no pruebas. La prueba sale de la fuente oficial, y se cita al final, con su enlace.',
  },
};

/** «Ojo clínico»: rojo a la cita 3 (la inexistente), ni la 1 ni la 2 en rojo, y la pregunta 4 sin pistas. */
export const OJO_C3_U3: ReglaOjoClinico = { pregunta: 4, rojo: 'c3', noRojo: ['c1', 'c2'] };
