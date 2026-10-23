import type { Evaluacion } from './tipos';

/**
 * Evaluación de la unidad 0.4 «De dónde viene "inteligencia" y qué exige ya el Derecho chileno» (borrador del
 * 23-10-2026, pendiente de revisión jurídica). La clave está aparte (`c0-u4.clave.datos.ts`) y no llega al navegador.
 * Reordenar las preguntas cambia su número: hazlo también en la clave y vuelve a generar el SQL.
 */
export const EVALUACION_C0_U4: Evaluacion = {
  id: 'c0-u4-eval',
  leccionId: 'c0-u4',
  titulo: 'Evaluación de la unidad 0.4',
  umbral: 4,
  preguntas: [
    {
      n: 1,
      tipo: 'opcion',
      enunciado: 'Según Antiqua et nova (2025), leída con la distinción de Aquino, ¿qué imita la IA?',
      opciones: [
        { id: 'a', texto: 'El intellectus: captar la verdad de golpe.' },
        { id: 'b', texto: 'La ratio: el proceso discursivo y analítico, paso a paso, que se puede computar.' },
        { id: 'c', texto: 'Las dos por igual.' },
        { id: 'd', texto: 'Ninguna: la nota dice que la IA no imita nada humano.' },
      ],
    },
    {
      n: 2,
      tipo: 'opcion',
      enunciado: '¿Qué muestra Buck v. Bell (1927) sobre la palabra «inteligencia»?',
      opciones: [
        { id: 'a', texto: 'Que los tests de inteligencia son precisos.' },
        { id: 'b', texto: 'Que una herramienta pensada para ayudar a niños se convirtió en cifra, y la cifra en instrumento de Estado, con consecuencias jurídicas sobre una persona.' },
        { id: 'c', texto: 'Que la Corte Suprema de Estados Unidos definió la inteligencia artificial.' },
        { id: 'd', texto: 'Que la eugenesia fue prohibida en 1927.' },
      ],
    },
    {
      n: 3,
      tipo: 'verdadero-falso',
      enunciado: '«John McCarthy eligió el nombre "inteligencia artificial" en 1955 porque había demostrado científicamente que las máquinas eran inteligentes.»',
      opciones: [
        { id: 'v', texto: 'Verdadero' },
        { id: 'f', texto: 'Falso' },
      ],
    },
    {
      n: 4,
      tipo: 'opcion',
      enunciado: 'Una abogada alega «error involuntario» por citar obras inexistentes que salieron de un chatbot. Según la Corte Suprema (rol 23.322-2025) y el Código de Ética Judicial (Acta 244-2025), ¿qué regla se aplica?',
      opciones: [
        { id: 'a', texto: 'La responsabilidad es del proveedor del chatbot, que «alucinó».' },
        { id: 'b', texto: 'La buena fe es el deber de verificar la información que se aporta al tribunal; decidir y verificar son tareas humanas e indelegables. El que cita es el abogado.' },
        { id: 'c', texto: 'No hay regla aplicable mientras no se apruebe la ley de IA.' },
        { id: 'd', texto: 'Basta con que otra IA haya revisado las citas.' },
      ],
      pistas: [
        'Vuelve a la cita del art. 17 del Código de Ética Judicial: ¿de quién es la decisión y su responsabilidad?',
        'La Corte rechazó la excusa: la buena fe «se traduce en el deber que tiene la parte en orden a verificar».',
      ],
    },
    {
      n: 5,
      tipo: 'opcion',
      enunciado: '¿Qué presuponen, en común, el art. 17 del Código de Ética Judicial, el fallo rol 23.322-2025 y el art. 8 bis de la Ley 21.719?',
      opciones: [
        { id: 'a', texto: 'Que Chile ya tiene una ley de inteligencia artificial.' },
        { id: 'b', texto: 'Que la IA es más confiable que las personas.' },
        { id: 'c', texto: 'Que alguien pueda decir cuándo una decisión fue «únicamente automatizada» y cuándo hubo inferencia: sin definición, el derecho no se puede ejercer.' },
        { id: 'd', texto: 'Que los jueces deben usar IA en todas sus resoluciones.' },
      ],
    },
  ],
};
