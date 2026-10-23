import type { Clave, ReglaOjoClinico } from './tipos';

/**
 * CLAVE de la evaluación c3-u2. NO importar desde componentes: se lee sólo a través de
 * `src/lib/evaluacion/claves.server.ts` (marcado server-only) y del script que genera el SQL.
 * Fuentes en `src/content/lecciones/c3-u2-fuentes.ts`.
 */
export const CLAVE_C3_U2: Clave = {
  1: {
    correcta: 'd',
    retro:
      'La IA es buena para orientarte: qué ley buscar, qué artículo leer, con qué palabras. No para darte la respuesta que firmas: esa sale de la fuente oficial. Por eso el encargo de la práctica le pide números y términos, no conclusiones.',
  },
  2: {
    correcta: 'b',
    retro:
      'Por regla general, la ley obliga desde su publicación en el Diario Oficial (art. 7 del Código Civil), pero el mismo artículo permite que cada ley fije otra fecha. La Ley 21.719 lo hizo en su artículo primero transitorio: sus cambios rigen «el día primero del mes vigésimo cuarto posterior a la publicación». Por eso se lee el texto, no un resumen.',
  },
  3: {
    correcta: 'f',
    retro:
      'Una ley posterior puede cambiar la fecha. Pasa ahora mismo: el boletín 18.623-07, en el Senado desde septiembre de 2026, propone reemplazar esa fecha por el 1 de diciembre de 2027. Por eso se anota la fecha de consulta y, si importa, se revisa la tramitación de proyectos que modifiquen la ley.',
  },
  4: {
    correcta: 'a',
    retro:
      'La Ley 21.719 se promulgó el 25 de noviembre de 2024 y se publicó en el Diario Oficial el 13 de diciembre de 2024: lo dice su ficha en LeyChile y lo confirma la tramitación del Senado. El «8 de mayo» no sale de ninguna fuente oficial, y estaba también en nuestras notas de trabajo: así de fácil se copia un error. Las otras dos afirmaciones eran ciertas (al 23 de octubre de 2026): sus cambios rigen el 1 de diciembre de 2026, y mientras tanto rige la Ley 19.628.',
  },
  5: {
    correcta: 'c',
    retro:
      'Una búsqueda se puede repetir si dice qué preguntaste, dónde buscaste (con enlace), cuándo (la fecha de consulta) y qué versión de la norma leíste. El nombre de la IA o una captura del chat no prueban nada: la prueba es la fuente.',
  },
};

/** «Ojo clínico»: rojo a la primera afirmación (la fecha falsa), ninguna otra en rojo, y la pregunta 4 sin pistas. */
export const OJO_C3_U2: ReglaOjoClinico = { pregunta: 4, rojo: 'c1', noRojo: ['c2', 'c3'] };
