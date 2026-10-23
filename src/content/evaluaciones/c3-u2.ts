import type { Evaluacion } from './tipos';

/**
 * Evaluación de la unidad 3.2 «Buscar en fuentes chilenas». Pendiente de revisión jurídica. Las preguntas miden el
 * método, no una fecha que puede cambiar (salvo la 4, que revela el error de la presentación: una fecha de
 * publicación, que no cambia). La clave está aparte (`c3-u2.clave.datos.ts`).
 */
export const EVALUACION_C3_U2: Evaluacion = {
  id: 'c3-u2-eval',
  leccionId: 'c3-u2',
  titulo: 'Evaluación de la unidad 3.2',
  umbral: 4,
  preguntas: [
    {
      n: 1,
      tipo: 'opcion',
      enunciado: 'En el ciclo planificar, pedir, verificar y documentar, ¿para qué sirve la IA en el paso «pedir»?',
      opciones: [
        { id: 'a', texto: 'Para obtener la respuesta final, que después sólo se copia.' },
        { id: 'b', texto: 'Para redactar la bitácora en mi lugar.' },
        { id: 'c', texto: 'Para nada: en Derecho no se puede usar.' },
        { id: 'd', texto: 'Como mapa: términos, números de ley y artículos que después leo en la fuente oficial.' },
      ],
    },
    {
      n: 2,
      tipo: 'opcion',
      enunciado: 'Una IA afirma que una ley «rige desde el 1 de diciembre de 2026». ¿Dónde compruebas desde cuándo rige?',
      opciones: [
        { id: 'a', texto: 'En el resumen que publicó un estudio de abogados.' },
        { id: 'b', texto: 'En el texto de la ley en LeyChile, en sus artículos transitorios o de vigencia.' },
        { id: 'c', texto: 'En la fecha de publicación: una ley siempre rige desde que se publica.' },
        { id: 'd', texto: 'Preguntándole a otra IA.' },
      ],
    },
    {
      n: 3,
      tipo: 'verdadero-falso',
      enunciado: '«Si LeyChile dice que una ley entra en vigencia en cierta fecha, esa fecha ya no puede cambiar.»',
      opciones: [
        { id: 'v', texto: 'Verdadero' },
        { id: 'f', texto: 'Falso' },
      ],
    },
    {
      n: 4,
      tipo: 'opcion',
      enunciado: 'Encuentra el error de la presentación. De las tres afirmaciones de la IA sobre la Ley 21.719, ¿cuál era falsa?',
      opciones: [
        { id: 'a', texto: 'Que fue publicada el 8 de mayo de 2024.' },
        { id: 'b', texto: 'Que sus cambios rigen desde el 1 de diciembre de 2026.' },
        { id: 'c', texto: 'Que mientras tanto rige la Ley 19.628.' },
        { id: 'd', texto: 'Ninguna: las tres eran ciertas.' },
      ],
      pistas: [
        'La ficha de cada ley en LeyChile muestra arriba su fecha de promulgación y su fecha de publicación.',
        'La Ley 21.719 se promulgó el 25 de noviembre de 2024. ¿Pudo publicarse seis meses antes?',
      ],
    },
    {
      n: 5,
      tipo: 'opcion',
      enunciado: '¿Qué debe tener tu bitácora para que otra persona pueda repetir tu búsqueda y llegar a lo mismo?',
      opciones: [
        { id: 'a', texto: 'Sólo la respuesta final.' },
        { id: 'b', texto: 'La respuesta y el nombre de la IA que usé.' },
        { id: 'c', texto: 'La pregunta, las fuentes con su enlace, la fecha de consulta y la versión de la norma.' },
        { id: 'd', texto: 'Una captura de la conversación con la IA.' },
      ],
    },
  ],
};
