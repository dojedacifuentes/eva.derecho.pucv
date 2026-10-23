import type { Clave, ReglaOjoClinico } from './tipos';

/**
 * CLAVE de la evaluación c3-u1. NO importar desde componentes: se lee sólo a través de
 * `src/lib/evaluacion/claves.server.ts` (marcado server-only) y del script que genera el SQL.
 * Fuentes: docs del fallo rol 23.322-2025 y del buscador del Poder Judicial en `src/content/lecciones/c3-u1-fuentes.ts`.
 */
export const CLAVE_C3_U1: Clave = {
  1: {
    correcta: 'c',
    retro:
      'El fallo no menciona la IA (eso lo dijo la noticia del Poder Judicial). Lo que reprocha es otra cosa: «la buena fe se traduce en el deber que tiene la parte en orden a verificar la efectividad de la información que aporta al tribunal, lo que no hizo» (considerando 4°). Usar IA no es la falta; no verificar, sí.',
  },
  2: {
    correcta: 'a',
    retro:
      'Es el amarillo: el fallo es real, la cita no del todo. Se corrige el dato con la ficha oficial del buscador (en el borrador, la sentencia rol 25.031-2018 es del 8 de junio de 2020, no de 2019) y se lee el pasaje para confirmar que dice lo que se le atribuye. Rechazarla entera sería perder un fallo que sirve; ocultar la fecha, esconder el problema.',
  },
  3: {
    correcta: 'f',
    retro:
      'Otra IA también predice: puede confirmar una cita inventada con la misma seguridad. La guía del Colegio de Abogados de Chile (2026) lo dice expresamente: la verificación es personal y no se cumple con la verificación del propio sistema u otro sistema. Se verifica en la fuente oficial.',
  },
  4: {
    correcta: 'b',
    retro:
      'El art. 1546 dice que los contratos «obligan no sólo a lo que en ellos se expresa, sino a todas las cosas que emanan precisamente de la naturaleza de la obligación, o que por la ley o la costumbre pertenecen a ella». El borrador lo cortó y le hizo decir lo contrario: «obligan sólo a lo que en ellos se expresa». Artículo real, número correcto, comillas perfectas: sólo se descubre leyendo el texto en LeyChile. El art. 1545 estaba bien citado; el fallo existe con otra fecha (amarillo) y el tratado existe, pero la página hay que leerla (amarillo).',
  },
  5: {
    correcta: 'c',
    retro:
      'Que la obra exista no prueba que diga eso, ni en esa página. Además, el borrador cita una obra de Parte General para una regla de los contratos: otra señal para ir al libro. La doctrina se cita, y bien citada fortalece un escrito; pero se verifica en la obra, no en el catálogo.',
  },
};

/** «Ojo clínico»: rojo a la cita 2 (la que contradice el art. 1546), ninguna otra en rojo, y la pregunta 4 sin pistas. */
export const OJO_C3_U1: ReglaOjoClinico = { pregunta: 4, rojo: 'c2', noRojo: ['c1', 'c3', 'c4'] };
