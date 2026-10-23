import type { Evaluacion } from './tipos';

/**
 * Evaluación de la unidad 0.2 «Las dudas recientes» (borrador del 23-10-2026, pendiente de revisión). La clave está
 * aparte (`c0-u2.clave.datos.ts`) y no llega al navegador. Reordenar las preguntas cambia su número: hazlo también en
 * la clave y vuelve a generar el SQL.
 */
export const EVALUACION_C0_U2: Evaluacion = {
  id: 'c0-u2-eval',
  leccionId: 'c0-u2',
  titulo: 'Evaluación de la unidad 0.2',
  umbral: 4,
  preguntas: [
    {
      n: 1,
      tipo: 'opcion',
      enunciado: 'En la encuesta de 2022 a 480 investigadores, ¿qué resultado hubo sobre si un modelo entrenado sólo con texto puede entender el lenguaje?',
      opciones: [
        { id: 'a', texto: 'Una gran mayoría dijo que sí.' },
        { id: 'b', texto: 'Una gran mayoría dijo que no.' },
        { id: 'c', texto: 'Un empate: 51 % de acuerdo y 49 % en desacuerdo.' },
        { id: 'd', texto: 'La pregunta no se hizo porque ya estaba resuelta.' },
      ],
    },
    {
      n: 2,
      tipo: 'verdadero-falso',
      enunciado: '«Si un modelo razonador escribe su cadena de pensamiento, esa explicación es un registro fiel de los pasos internos que siguió.»',
      opciones: [
        { id: 'v', texto: 'Verdadero' },
        { id: 'f', texto: 'Falso' },
      ],
    },
    {
      n: 3,
      tipo: 'opcion',
      enunciado: '¿Qué enseña, para un jurista, la disputa entre el estudio de Apple («La ilusión del pensamiento») y su réplica?',
      opciones: [
        { id: 'a', texto: 'Que los modelos razonadores no sirven para nada.' },
        { id: 'b', texto: 'Que la disputa no era sobre los datos sino sobre qué cuenta como prueba.' },
        { id: 'c', texto: 'Que Apple tenía razón y la réplica no.' },
        { id: 'd', texto: 'Que los rompecabezas no sirven para medir inteligencia.' },
      ],
    },
    {
      n: 4,
      tipo: 'opcion',
      enunciado: 'Una noticia dice: «La empresa declaró que alcanzó la AGI.» Con lo visto en la unidad, ¿cuál es la primera pregunta que conviene hacer?',
      opciones: [
        { id: 'a', texto: '¿Cuántos parámetros tiene el modelo?' },
        { id: 'b', texto: '¿Con qué definición de AGI, quién la verifica y qué derechos cambian con la declaración?' },
        { id: 'c', texto: '¿Ya se puede hablar con ella?' },
        { id: 'd', texto: '¿Es más inteligente que un abogado?' },
      ],
      pistas: [
        'Recuerda las tres maneras de definir la AGI: por capacidades, por eficiencia de aprendizaje y por contrato.',
        'En el acuerdo Microsoft–OpenAI, la declaración «will now be verified by an independent expert panel» y mueve derechos. Definir es repartir poderes.',
      ],
    },
    {
      n: 5,
      tipo: 'opcion',
      enunciado: 'Un sistema gana medalla de oro en la olimpiada de matemática pero lee bien un reloj analógico sólo la mitad de las veces. ¿Qué nombre tiene esto y qué implica para usarlo en Derecho?',
      opciones: [
        { id: 'a', texto: 'La frontera dentada: que apruebe una prueba no predice que acierte en tu caso; hay que supervisar el uso real.' },
        { id: 'b', texto: 'El efecto IA: lo que funciona deja de llamarse IA.' },
        { id: 'c', texto: 'La habitación china: el sistema no entiende la matemática.' },
        { id: 'd', texto: 'Un error de medición: los relojes analógicos no son una prueba seria.' },
      ],
    },
  ],
};
