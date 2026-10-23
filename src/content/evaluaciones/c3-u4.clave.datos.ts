import type { Clave, ReglaOjoClinico } from './tipos';

/**
 * CLAVE de la evaluación c3-u4. NO importar desde componentes: se lee sólo a través de
 * `src/lib/evaluacion/claves.server.ts` (marcado server-only) y del script que genera el SQL.
 * Fuentes en `src/content/lecciones/c3-u4-fuentes.ts`.
 */
export const CLAVE_C3_U4: Clave = {
  1: {
    correcta: 'b',
    retro:
      'La Política de Integridad Académica de la PUCV dice: «El uso de este tipo de herramientas sin la adecuada citación es considerado como plagio, ya que los textos desarrollados no son propios del usuario». No prohíbe la IA: exige decir cuándo y cómo se usó. El formato lo fija cada curso.',
  },
  2: {
    correcta: 'a',
    retro:
      'Con la cita completa sabe qué buscar; con el enlace, dónde; con la fecha, cuándo (una norma puede cambiar); con el estado, cuánto confiar. Una captura del chat no prueba nada: la prueba es la fuente.',
  },
  3: {
    correcta: 'f',
    retro:
      'Una fuente pendiente, dicha, es información: le avisa al lector (y a ti) qué falta. Esconderla hace que la bitácora se vea mejor y valga menos. Una pendiente honesta vale más que una verificada que nadie puede abrir.',
  },
  4: {
    correcta: 'c',
    retro:
      'La entrada 3 dice «verificada en LeyChile», pero su enlace (idNorma=1209272) abre la Ley 21.719, no el Código Civil: el mismo enlace de la entrada 1. Quizá el texto del art. 1546 esté bien, pero esa verificación no se puede repetir. La 2 y la 4 están pendientes y lo dicen: falta algo, pero son honestas. La 1 se sostiene.',
  },
  5: {
    correcta: 'd',
    retro:
      'Declarar no es confesar: es decir qué herramienta usaste, para qué (encontrar qué leer, no escribir) y qué verificaste en la fuente oficial. Con eso, tu uso de IA queda citado y tu trabajo se puede revisar.',
  },
};

/** «Ojo clínico»: rojo a la entrada 3 (el enlace que la desmiente), ninguna otra en rojo, y la pregunta 4 sin pistas. */
export const OJO_C3_U4: ReglaOjoClinico = { pregunta: 4, rojo: 'c3', noRojo: ['c1', 'c2', 'c4'] };
