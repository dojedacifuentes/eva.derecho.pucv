import type { Evaluacion } from './tipos';

/**
 * Evaluación de la unidad 3.3 «Jurisprudencia real, no inventada». Preguntas 1, 2 y 5 adaptadas de
 * eva.academy/videocapsulas/curso-1/1.3-jurisprudencia/MATERIAL.md §8. Pendiente de revisión jurídica.
 * La clave está aparte (`c3-u3.clave.datos.ts`).
 */
export const EVALUACION_C3_U3: Evaluacion = {
  id: 'c3-u3-eval',
  leccionId: 'c3-u3',
  titulo: 'Evaluación de la unidad 3.3',
  umbral: 4,
  preguntas: [
    {
      n: 1,
      tipo: 'opcion',
      enunciado: 'Una IA te da un fallo con rol, sala y fecha. ¿Qué basta para citarlo?',
      opciones: [
        { id: 'a', texto: 'Que el rol tenga el formato de la Corte Suprema.' },
        { id: 'b', texto: 'Que la IA confirme que existe si se lo preguntas.' },
        { id: 'c', texto: 'Que otra IA te dé el mismo fallo.' },
        { id: 'd', texto: 'Encontrarlo en el buscador del Poder Judicial y comprobar que dice lo que la IA dice que dice.' },
      ],
    },
    {
      n: 2,
      tipo: 'verdadero-falso',
      enunciado: '«Si el fallo aparece en el buscador oficial, la cita está bien.»',
      opciones: [
        { id: 'v', texto: 'Verdadero' },
        { id: 'f', texto: 'Falso' },
      ],
    },
    {
      n: 3,
      tipo: 'opcion',
      enunciado: 'Buscas un rol con su era en el buscador y no aparece. ¿Qué haces antes de descartarlo?',
      opciones: [
        { id: 'a', texto: 'Lo cito igual: puede que no esté indexado.' },
        { id: 'b', texto: 'Le pregunto a la IA si está segura.' },
        { id: 'c', texto: 'Lo busco sin la era y en otros tribunales; si tampoco aparece, no lo cito.' },
        { id: 'd', texto: 'Lo cambio por un rol parecido que sí aparezca.' },
      ],
    },
    {
      n: 4,
      tipo: 'opcion',
      enunciado: 'Encuentra el error de la presentación. De las tres citas de la IA, ¿cuál no existe y cuál tiene un dato cambiado?',
      opciones: [
        { id: 'a', texto: 'La 3 (rol 18734-2022) no existe; la 2 (rol 25031-2018) tiene la fecha cambiada.' },
        { id: 'b', texto: 'La 2 no existe; la 3 tiene la fecha cambiada.' },
        { id: 'c', texto: 'La 1 no existe; la 2 y la 3 son correctas.' },
        { id: 'd', texto: 'Las tres existen tal como las dio la IA.' },
      ],
      pistas: [
        'Una cita puede fallar de dos maneras: no existir, o existir con un dato cambiado.',
        'Busca cada rol con su era por separado. Si no aparece, prueba sin la era.',
        'Compara la fecha que dio la IA con la que muestra el buscador, cifra por cifra.',
      ],
    },
    {
      n: 5,
      tipo: 'opcion',
      enunciado: 'En el protocolo EVA (preguntar, descubrir, localizar la fuente, verificar, citar), ¿qué es lo que te entrega la IA?',
      opciones: [
        { id: 'a', texto: 'Las citas listas para el trabajo.' },
        { id: 'b', texto: 'Una lista de sospechosos que hay que verificar, no de pruebas.' },
        { id: 'c', texto: 'La verificación, si se la pides.' },
        { id: 'd', texto: 'Nada útil: en jurisprudencia no se puede usar IA.' },
      ],
    },
  ],
};
