import type { Clave } from './tipos';

/**
 * CLAVE de la evaluación c0-u1. NO importar desde componentes: se lee sólo a través de
 * `src/lib/evaluacion/claves.server.ts` (marcado server-only) y del script que genera el SQL.
 */
export const CLAVE_C0_U1: Clave = {
  1: {
    correcta: 'b',
    retro:
      'La palabra clave es «infiere». El considerando 12 dice que la capacidad de inferencia «trasciende el tratamiento básico de datos» y deja fuera a los sistemas basados en reglas definidas únicamente por personas. Nadie exigió inteligencia, conversación ni un fabricante determinado.',
  },
  2: {
    correcta: 'v',
    retro:
      'El Mensaje lo reconoce: «la OCDE en 2023 ha provisto una definición actualizada de sistemas de IA». El art. 3 n.º 1 la traduce casi letra por letra, con «infiere», «salidas» y «autonomía y adaptabilidad». Por eso las zonas grises europeas llegarán a Chile con la misma frase.',
  },
  3: {
    correcta: 'c',
    retro:
      'El Reglamento europeo es ley vigente y se aplica desde el 2 de febrero de 2025. La OCDE y la UNESCO emiten recomendaciones, que no obligan; el proyecto chileno todavía está en el Senado.',
  },
  4: {
    correcta: 'c',
    retro:
      'Ordenar por fecha es aplicar una regla escrita por una persona: «tratamiento básico de datos», fuera de la definición. El puntaje de riesgo aprendido de casos anteriores infiere de los datos cómo generar una predicción: dentro. Si la respuesta fuera la contraria, cambiarían las obligaciones: el programa de riesgo tendría que cumplir las del nivel que le corresponda, y el de fechas, ninguna.',
  },
  5: {
    correcta: 'b',
    retro:
      'Párrafo 2 de la Recomendación: «no pretende proporcionar una única definición de la IA, ya que tal definición tendría que cambiar con el tiempo». Es la estrategia opuesta a la de la Unión Europea, que definió y añadió directrices no vinculantes.',
  },
};
