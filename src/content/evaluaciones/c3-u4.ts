import type { Evaluacion } from './tipos';

/**
 * Evaluación de la unidad 3.4 «Organizar y documentar una investigación». Pendiente de revisión jurídica.
 * La clave está aparte (`c3-u4.clave.datos.ts`).
 */
export const EVALUACION_C3_U4: Evaluacion = {
  id: 'c3-u4-eval',
  leccionId: 'c3-u4',
  titulo: 'Evaluación de la unidad 3.4',
  umbral: 4,
  preguntas: [
    {
      n: 1,
      tipo: 'opcion',
      enunciado: 'Según la Política de Integridad Académica de la PUCV, ¿cuándo el uso de herramientas de IA se considera plagio?',
      opciones: [
        { id: 'a', texto: 'Siempre: la política prohíbe usar IA.' },
        { id: 'b', texto: 'Cuando se usan sin la adecuada citación.' },
        { id: 'c', texto: 'Nunca, si después se corrige el texto.' },
        { id: 'd', texto: 'Sólo en las evaluaciones con nota.' },
      ],
    },
    {
      n: 2,
      tipo: 'opcion',
      enunciado: '¿Qué necesita una fila de tu tabla de fuentes para que otra persona pueda repetir tu verificación?',
      opciones: [
        { id: 'a', texto: 'La cita completa, el enlace a la fuente oficial, la fecha de consulta y su estado.' },
        { id: 'b', texto: 'El nombre de la fuente, nada más.' },
        { id: 'c', texto: 'Una captura de la conversación con la IA.' },
        { id: 'd', texto: 'La opinión de quien la encontró.' },
      ],
    },
    {
      n: 3,
      tipo: 'verdadero-falso',
      enunciado: '«Si una fuente quedó pendiente, es mejor no anotarla, para que la bitácora se vea completa.»',
      opciones: [
        { id: 'v', texto: 'Verdadero' },
        { id: 'f', texto: 'Falso' },
      ],
    },
    {
      n: 4,
      tipo: 'opcion',
      enunciado: 'Encuentra el error de la presentación. En la bitácora del compañero, ¿qué entrada se desmentía sola?',
      opciones: [
        { id: 'a', texto: 'La 1, sobre la Ley 21.719.' },
        { id: 'b', texto: 'La 2, sobre el rol 25.031-2018.' },
        { id: 'c', texto: 'La 3, sobre el art. 1546 del Código Civil.' },
        { id: 'd', texto: 'La 4, la frase sacada de un chat.' },
      ],
      pistas: [
        'Abre cada enlace: ¿lleva a la norma o al fallo que dice la entrada?',
        'Dos entradas tienen el mismo enlace. ¿Pueden ser la misma norma la Ley 21.719 y el Código Civil?',
      ],
    },
    {
      n: 5,
      tipo: 'opcion',
      enunciado: 'Usaste una IA para saber qué leyes leer y después las leíste en LeyChile. ¿Qué declaras en tu trabajo?',
      opciones: [
        { id: 'a', texto: 'Nada: lo que citas es la ley, no la IA.' },
        { id: 'b', texto: 'Que la IA escribió el informe.' },
        { id: 'c', texto: 'Sólo el nombre de la IA que usaste.' },
        { id: 'd', texto: 'Qué herramienta usaste, para qué, y qué verificaste en la fuente oficial.' },
      ],
    },
  ],
};
