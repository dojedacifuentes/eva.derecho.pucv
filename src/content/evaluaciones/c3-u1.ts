import type { Evaluacion } from './tipos';

/**
 * Evaluación de la unidad 3.1 «Verificar antes de firmar». Pendiente de revisión jurídica. La clave está aparte
 * (`c3-u1.clave.datos.ts`) y no llega al navegador. Reordenar las preguntas cambia su número: hazlo también en la
 * clave y vuelve a generar el SQL (`npm run db:catalogo`).
 */
export const EVALUACION_C3_U1: Evaluacion = {
  id: 'c3-u1-eval',
  leccionId: 'c3-u1',
  titulo: 'Evaluación de la unidad 3.1',
  umbral: 4,
  preguntas: [
    {
      n: 1,
      tipo: 'opcion',
      enunciado: '¿Qué le reprochó la Corte Suprema a la abogada sancionada en el rol 23.322-2025?',
      opciones: [
        { id: 'a', texto: 'Haber usado una IA para redactar el recurso.' },
        { id: 'b', texto: 'Citar doctrina en vez de jurisprudencia.' },
        { id: 'c', texto: 'No haber verificado la efectividad de la información que aportó al tribunal.' },
        { id: 'd', texto: 'Presentar el recurso fuera de plazo.' },
      ],
    },
    {
      n: 2,
      tipo: 'opcion',
      enunciado: 'El fallo que cita el borrador existe y el rol es correcto, pero la fecha no coincide con la del buscador. ¿Qué haces con esa cita?',
      opciones: [
        { id: 'a', texto: 'La reviso: corrijo la fecha con la ficha oficial y leo el pasaje que se cita.' },
        { id: 'b', texto: 'La acepto: lo que importa es el rol.' },
        { id: 'c', texto: 'La rechazo: si un dato está mal, el fallo no sirve.' },
        { id: 'd', texto: 'Borro la fecha para que no se note.' },
      ],
    },
    {
      n: 3,
      tipo: 'verdadero-falso',
      enunciado: '«Si le pido a otra IA que revise las citas y me confirma que todas existen, ya las verifiqué.»',
      opciones: [
        { id: 'v', texto: 'Verdadero' },
        { id: 'f', texto: 'Falso' },
      ],
    },
    {
      n: 4,
      tipo: 'opcion',
      enunciado: 'Encuentra el error del borrador. De sus cuatro citas, ¿cuál dice lo contrario de lo que dice la fuente?',
      opciones: [
        { id: 'a', texto: 'La cita 1, del art. 1545 del Código Civil.' },
        { id: 'b', texto: 'La cita 2, del art. 1546 del Código Civil.' },
        { id: 'c', texto: 'La cita 3, de la sentencia rol 25.031-2018.' },
        { id: 'd', texto: 'La cita 4, del Tratado de Derecho Civil.' },
      ],
      pistas: [
        'Las citas textuales se comparan palabra por palabra con LeyChile, no de memoria.',
        'Una de las normas habla de buena fe. ¿El contrato obliga «sólo» a lo que dice?',
      ],
    },
    {
      n: 5,
      tipo: 'opcion',
      enunciado: 'El tratado que cita el borrador aparece en el catálogo de la biblioteca. ¿Ya puedes aceptar la cita?',
      opciones: [
        { id: 'a', texto: 'Sí: si el libro existe, la cita es buena.' },
        { id: 'b', texto: 'Sí, si los autores son conocidos.' },
        { id: 'c', texto: 'No: falta abrir el libro en esa página y comprobar que dice eso.' },
        { id: 'd', texto: 'No: la doctrina no se cita en un escrito.' },
      ],
    },
  ],
};
