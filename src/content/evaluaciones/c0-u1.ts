import type { Evaluacion } from './tipos';

/**
 * Evaluación de la unidad 0.1 «Las definiciones que usan las leyes» (borrador del 23-10-2026, pendiente de revisión
 * jurídica). La clave está aparte (`c0-u1.clave.datos.ts`) y no llega al navegador. Reordenar las preguntas cambia
 * su número: hazlo también en la clave y vuelve a generar el SQL.
 */
export const EVALUACION_C0_U1: Evaluacion = {
  id: 'c0-u1-eval',
  leccionId: 'c0-u1',
  titulo: 'Evaluación de la unidad 0.1',
  umbral: 4,
  preguntas: [
    {
      n: 1,
      tipo: 'opcion',
      enunciado: 'Según el Reglamento (UE) 2024/1689 (art. 3.1 y considerando 12), ¿qué separa a un «sistema de IA» de un programa corriente?',
      opciones: [
        { id: 'a', texto: 'Que sea tan inteligente como una persona en alguna tarea.' },
        { id: 'b', texto: 'Que infiera de la información de entrada cómo generar sus resultados, más allá del tratamiento básico de datos.' },
        { id: 'c', texto: 'Que funcione en internet y pueda conversar.' },
        { id: 'd', texto: 'Que lo haya fabricado una empresa de tecnología.' },
      ],
    },
    {
      n: 2,
      tipo: 'verdadero-falso',
      enunciado: '«La definición del art. 3 n.º 1 del proyecto de ley chileno (Boletín 16821-19) es una traducción casi literal de la definición de la OCDE de 2023.»',
      opciones: [
        { id: 'v', texto: 'Verdadero' },
        { id: 'f', texto: 'Falso' },
      ],
    },
    {
      n: 3,
      tipo: 'opcion',
      enunciado: 'De estos instrumentos, ¿cuál es hoy una ley vigente que obliga?',
      opciones: [
        { id: 'a', texto: 'La Recomendación de la OCDE (2023).' },
        { id: 'b', texto: 'El proyecto de ley chileno (Boletín 16821-19).' },
        { id: 'c', texto: 'El Reglamento (UE) 2024/1689.' },
        { id: 'd', texto: 'La Recomendación de la UNESCO (2021).' },
      ],
    },
    {
      n: 4,
      tipo: 'opcion',
      enunciado: 'Un municipio usa un programa que ordena las solicitudes de subsidio por fecha y otro que les asigna un puntaje de «riesgo de fraude» aprendido de casos anteriores. Según la definición europea que copia el proyecto chileno, ¿cuál es «sistema de IA»?',
      opciones: [
        { id: 'a', texto: 'Los dos: ambos procesan datos de personas.' },
        { id: 'b', texto: 'Ninguno: los dos son programas administrativos.' },
        { id: 'c', texto: 'Sólo el que asigna el puntaje, porque infiere de los datos; el que ordena por fecha sigue una regla escrita por una persona.' },
        { id: 'd', texto: 'Sólo el que ordena por fecha, porque toma una decisión sobre el orden.' },
      ],
      pistas: [
        'La pregunta de la unidad es una sola: ¿infiere de datos o aplica reglas que escribió una persona?',
        'Relee el considerando 12: qué «trasciende el tratamiento básico de datos» y qué sistemas quedan fuera.',
      ],
    },
    {
      n: 5,
      tipo: 'opcion',
      enunciado: '¿Qué camino tomó la UNESCO en su Recomendación de 2021?',
      opciones: [
        { id: 'a', texto: 'Copió la definición de la OCDE de 2019.' },
        { id: 'b', texto: 'Renunció a una definición única, porque tendría que cambiar con la tecnología, y describió los sistemas por lo que «se asemeja» a un comportamiento inteligente.' },
        { id: 'c', texto: 'Definió la inteligencia artificial como una disciplina científica.' },
        { id: 'd', texto: 'Prohibió usar la expresión «inteligencia artificial» en textos legales.' },
      ],
    },
  ],
};
