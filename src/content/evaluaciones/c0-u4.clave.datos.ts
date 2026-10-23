import type { Clave } from './tipos';

/**
 * CLAVE de la evaluación c0-u4. NO importar desde componentes: se lee sólo a través de
 * `src/lib/evaluacion/claves.server.ts` (marcado server-only) y del script que genera el SQL.
 */
export const CLAVE_C0_U4: Clave = {
  1: {
    correcta: 'b',
    retro:
      'Aquino: entender es reposo, razonar es movimiento. Antiqua et nova (n. 14) retoma la distinción y sostiene que la IA tiene capacidad «para llevar a cabo tareas, pero no la de pensar»: imita la ratio, el proceso discursivo computable, no el intellectus.',
  },
  2: {
    correcta: 'b',
    retro:
      'La escala de Binet (1905) nació para ayudar a niños; Terman la volvió un número; en 1927 la Corte validó la esterilización de Carrie Buck con ese número y la frase de Holmes. Gould llamó «reificación» a tratar la cifra como una cosa. Guárdalo para los «puntajes de riesgo» de hoy.',
  },
  3: {
    correcta: 'f',
    retro:
      'McCarthy contó que eligió el nombre para «escape association with "cybernetics"» y no tener que aceptar a Norbert Wiener «as a guru». Fue una decisión de posicionamiento académico, no un hallazgo científico.',
  },
  4: {
    correcta: 'b',
    retro:
      'La Tercera Sala rechazó el «error involuntario»: la buena fe procesal «se traduce en el deber que tiene la parte en orden a verificar». El art. 17 del Código de Ética Judicial dice que la decisión es humana e indelegable y pide verificar siempre de manera independiente. La concesión 5 se vuelve regla: el sistema no «cita»; cita el abogado.',
  },
  5: {
    correcta: 'c',
    retro:
      'Los tres niveles (jueces, abogados, personas) exigen distinguir la decisión automatizada de la humana y reconocer la inferencia. Sin una definición de «sistema de IA», ni el deber de verificar ni el derecho a oponerse se pueden aplicar. Por eso el curso empezó por la definición.',
  },
};
