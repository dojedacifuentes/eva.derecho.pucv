import type { Evaluacion } from './tipos';

/**
 * Evaluación de la unidad 1.1. Texto de `eva.academy/videocapsulas/curso-1/1.1-examen/MATERIAL.md` §7,
 * pendiente de revisión jurídica. La clave está aparte (`c1-u1.clave.datos.ts`) y no llega al navegador.
 * Reordenar las preguntas cambia su número: hazlo también en la clave y vuelve a generar el SQL.
 */
export const EVALUACION_C1_U1: Evaluacion = {
  id: 'c1-u1-eval',
  leccionId: 'c1-u1',
  titulo: 'Evaluación de la unidad 1',
  umbral: 4,
  preguntas: [
    {
      n: 1,
      tipo: 'opcion',
      enunciado: '¿Cuál de estos encargos te hace practicar el recuerdo?',
      opciones: [
        { id: 'a', texto: '«Resúmeme este apunte.»' },
        { id: 'b', texto: '«Explícame el art. 19 con un ejemplo.»' },
        { id: 'c', texto: '«Hazme una pregunta a la vez y no me des la respuesta hasta que conteste.»' },
        { id: 'd', texto: '«Dame las respuestas de la prueba del año pasado.»' },
      ],
    },
    {
      n: 2,
      tipo: 'verdadero-falso',
      enunciado: '«Si con ayuda de la IA resuelvo bien los ejercicios, quiere decir que aprendí la materia.»',
      opciones: [
        { id: 'v', texto: 'Verdadero' },
        { id: 'f', texto: 'Falso' },
      ],
    },
    {
      n: 3,
      tipo: 'opcion',
      enunciado: '¿Para qué sirve que la IA te pregunte qué tan seguro estás antes de corregirte?',
      opciones: [
        { id: 'a', texto: 'Para que la IA se adapte a tu nivel.' },
        { id: 'b', texto: 'Para comparar lo que crees saber con lo que sabes.' },
        { id: 'c', texto: 'Para que la corrección sea más amable.' },
        { id: 'd', texto: 'No sirve para nada; es sólo un trámite.' },
      ],
    },
    {
      n: 4,
      tipo: 'opcion',
      enunciado:
        'Encuentra el error de la presentación. La IA hizo dos correcciones a EVA: una sobre el art. 19 y otra sobre las palabras técnicas. ¿Cuál era errónea?',
      opciones: [
        { id: 'a', texto: 'La primera, sobre el art. 19.' },
        { id: 'b', texto: 'La segunda, sobre las palabras técnicas y el art. 20.' },
        { id: 'c', texto: 'Las dos.' },
        { id: 'd', texto: 'Ninguna.' },
      ],
      pistas: [
        'Una de las correcciones cita un artículo que existe. Fíjate en una sola palabra que agrega la IA.',
        'La IA dijo «todas las palabras de la ley». ¿Lo dice el art. 20? Vuelve al §3 del apunte.',
        'Lee el §4 del apunte: el art. 21 habla de las palabras técnicas.',
      ],
    },
    {
      n: 5,
      tipo: 'opcion',
      enunciado: 'La IA marca como incorrecta una respuesta que tú crees correcta. ¿Qué haces?',
      opciones: [
        { id: 'a', texto: 'Acepto la corrección: la IA leyó más que yo.' },
        { id: 'b', texto: 'Le pregunto a otra IA cuál de las dos tiene razón.' },
        { id: 'c', texto: 'Vuelvo al apunte o a la fuente oficial y decido yo.' },
        { id: 'd', texto: 'Le pido a la misma IA que revise su corrección.' },
      ],
    },
  ],
};
