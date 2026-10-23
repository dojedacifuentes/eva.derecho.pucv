import type { Evaluacion } from './tipos';

/**
 * Evaluación de la unidad 0.3 «Lo propio de la IA y lo que concedemos» (borrador del 23-10-2026, pendiente de
 * revisión). La clave está aparte (`c0-u3.clave.datos.ts`) y no llega al navegador. Reordenar las preguntas cambia su
 * número: hazlo también en la clave y vuelve a generar el SQL.
 */
export const EVALUACION_C0_U3: Evaluacion = {
  id: 'c0-u3-eval',
  leccionId: 'c0-u3',
  titulo: 'Evaluación de la unidad 0.3',
  umbral: 4,
  preguntas: [
    {
      n: 1,
      tipo: 'opcion',
      enunciado: 'Según la definición de trabajo del curso, lo propio de la IA es…',
      opciones: [
        { id: 'a', texto: 'La capacidad de un sistema para lograr objetivos en una gama amplia de situaciones, adquirida de datos y cómputo, y juzgada por su desempeño medible.' },
        { id: 'b', texto: 'La capacidad de una máquina para pensar y sentir como una persona.' },
        { id: 'c', texto: 'Un programa que sigue las reglas que le escribió un experto.' },
        { id: 'd', texto: 'Cualquier software que conversa en lenguaje natural.' },
      ],
    },
    {
      n: 2,
      tipo: 'opcion',
      enunciado: '¿Por qué esa definición le conviene a un jurista?',
      opciones: [
        { id: 'a', texto: 'Porque demuestra que las máquinas entienden.' },
        { id: 'b', texto: 'Porque habla de acciones, que se observan y se prueban, y no de mente, que no se observa.' },
        { id: 'c', texto: 'Porque coincide palabra por palabra con la ley chilena.' },
        { id: 'd', texto: 'Porque es la que usan las empresas en su publicidad.' },
      ],
    },
    {
      n: 3,
      tipo: 'verdadero-falso',
      enunciado: '«Si un sistema saca 98 % en un banco de mil preguntas de Derecho, se puede dar por probado que acertará en las consultas reales de un estudio.»',
      opciones: [
        { id: 'v', texto: 'Verdadero' },
        { id: 'f', texto: 'Falso' },
      ],
    },
    {
      n: 4,
      tipo: 'opcion',
      enunciado: 'Un informe dice: «el sistema sabía que la cita era falsa». ¿Qué concesión está ignorando y por qué importa en Derecho?',
      opciones: [
        { id: 'a', texto: 'La 6, el efecto IA: en unos años nadie llamará IA a ese sistema.' },
        { id: 'b', texto: 'La 3: el banco de pruebas estaba contaminado.' },
        { id: 'c', texto: 'La 5: «sabe» es una metáfora de trabajo; «saber», «decidir» e «intención» son categorías jurídicas que el sistema no satisface por el solo hecho de describirlo así.' },
        { id: 'd', texto: 'Ninguna: si el sistema lo escribió, lo sabía.' },
      ],
      pistas: [
        'Relee la concesión que la lectura llama «la que más importa en Derecho».',
        'La Corte Suprema (rol 23.322-2025) sacó la consecuencia: el que cita es el abogado, no el sistema.',
      ],
    },
    {
      n: 5,
      tipo: 'opcion',
      enunciado: '¿Por qué las seis concesiones no debilitan la definición de trabajo?',
      opciones: [
        { id: 'a', texto: 'Porque son sólo opiniones de filósofos.' },
        { id: 'b', texto: 'Porque la definición no afirma lo que ellas niegan (comprensión, emergencia, una técnica fija) y sólo exige declarar con qué métrica y en qué situaciones se midió.' },
        { id: 'c', texto: 'Porque los ingenieros ya las resolvieron.' },
        { id: 'd', texto: 'Sí la debilitan: con seis concesiones no queda definición.' },
      ],
    },
  ],
};
