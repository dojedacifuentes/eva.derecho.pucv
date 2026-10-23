import type { Clave } from './tipos';

/**
 * CLAVE de la evaluación c0-u3. NO importar desde componentes: se lee sólo a través de
 * `src/lib/evaluacion/claves.server.ts` (marcado server-only) y del script que genera el SQL.
 */
export const CLAVE_C0_U3: Clave = {
  1: {
    correcta: 'a',
    retro:
      'Es la fórmula que funde a Russell y Norvig (agente racional), Legg y Hutter (objetivos en muchos entornos), Chollet (eficiencia de adquisición) y la definición clásica de aprender. No exige pensar ni sentir, y deja fuera al programa de reglas escritas por una persona.',
  },
  2: {
    correcta: 'b',
    retro:
      'Un tribunal puede probar lo que un sistema hizo; no puede probar lo que «pensó». Una definición conductual habla de lo que se ve. Que coincida con la ley es una ventaja, pero no literal, y la publicidad es justamente lo que las concesiones descartan.',
  },
  3: {
    correcta: 'f',
    retro:
      'Concesión 3: los bancos de prueba se saturan, se contaminan y permiten atajos; el desempeño en la prueba no predice el uso real, donde se juega la responsabilidad (Informe de seguridad 2026). Hay que pedir en qué prueba, con qué datos y cuándo se midió, y supervisar igual.',
  },
  4: {
    correcta: 'c',
    retro:
      'Concesión 5: el vocabulario antropomórfico es metáfora. «Sabía» atribuye un estado interior que no se observa, y en Derecho «saber» e «intención» tienen consecuencias (dolo, culpa). El sistema produce texto probable; quien cita y responde es la persona (rol 23.322-2025).',
  },
  5: {
    correcta: 'b',
    retro:
      'Una definición conductual sobrevive a Searle porque no afirma semántica, a Schaeffer porque no afirma emergencia y al efecto IA porque no se casa con una técnica. Lo único que exige es declarar la métrica y las situaciones. Con las concesiones, resiste; sin ellas, es publicidad.',
  },
};
