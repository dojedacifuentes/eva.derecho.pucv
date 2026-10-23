import type { Clave } from './tipos';

/**
 * CLAVE de la evaluación c0-u2. NO importar desde componentes: se lee sólo a través de
 * `src/lib/evaluacion/claves.server.ts` (marcado server-only) y del script que genera el SQL.
 */
export const CLAVE_C0_U2: Clave = {
  1: {
    correcta: 'c',
    retro:
      'Mitchell y Krakauer (2022): 51 % de acuerdo, 49 % en desacuerdo. El empate no es por falta de datos: es porque los dos bandos no acuerdan qué contaría como prueba de «entender».',
  },
  2: {
    correcta: 'f',
    retro:
      'Anthropic (2025): cuando se le da una pista, el modelo la menciona en su «razonamiento» escrito sólo el 25 % o el 39 % de las veces, y la explicación verbal de una suma no coincide con los pasos internos observados. «We can\'t always rely on what they tell us about their reasoning.»',
  },
  3: {
    correcta: 'b',
    retro:
      'Apple mostró un colapso de precisión; la réplica dijo que el colapso venía del diseño del experimento (límites de salida, instancias imposibles). Las partes vieron los mismos hechos y discutieron qué demuestran: la misma estructura que un debate probatorio.',
  },
  4: {
    correcta: 'b',
    retro:
      'La AGI no tiene definición legal: DeepMind la define por niveles, Chollet por eficiencia de aprendizaje y el contrato Microsoft–OpenAI por una declaración verificada por un panel, de la que dependen derechos de propiedad intelectual e ingresos. Definir no es describir el mundo sino repartir poderes.',
  },
  5: {
    correcta: 'a',
    retro:
      'Es la frontera dentada («jagged», Informe de seguridad 2026; ejemplo del Índice de Stanford 2026). Para el Derecho es lo decisivo: la responsabilidad se juega en el uso real, donde la prueba previa no predice.',
  },
};
