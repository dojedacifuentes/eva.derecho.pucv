import type { PracticaC0Datos, TramoC0 } from './c0-comun';

/**
 * Unidad 0.3 «Lo propio de la IA y lo que concedemos»: guion de «EVA presenta» (recreación, borrador del
 * 23-10-2026, pendiente de revisión) y la práctica: aplicar las seis concesiones a seis situaciones jurídicas.
 */
export const GUION_C0_U3: TramoC0[] = [
  {
    n: 1,
    nombre: 'Gancho',
    visual: 'agente',
    voz: 'Soy EVA, una inteligencia artificial. Si la ley no define la inteligencia y la ciencia tampoco, ¿con qué trabajan los que me construyen? Con una idea vieja y útil: un agente que persigue objetivos. Percibe, actúa, y actúa bien si logra lo que busca.',
  },
  {
    n: 2,
    nombre: 'La definición de trabajo',
    visual: 'trabajo',
    voz: 'La definición de trabajo del curso: lo propio de la IA es la capacidad de un sistema para lograr objetivos en una gama amplia de situaciones, adquirida a partir de datos y cómputo, y juzgada por su desempeño medible. Habla de acciones, que se ven. No de mente, que no se ve.',
  },
  {
    n: 3,
    nombre: 'Las seis concesiones',
    visual: 'concesiones',
    voz: 'Esa definición sólo es honesta con seis concesiones. Medimos conducta, no experiencia. «Inteligencia» depende de la métrica. Las pruebas se saturan y no predicen el uso real. No sabemos si entendemos. «Sabe» y «razona» son metáforas. Y la vara se mueve: lo que funciona deja de llamarse IA.',
  },
  {
    n: 4,
    nombre: 'La que importa en Derecho',
    visual: 'categorias',
    voz: 'La quinta es la que más te importa. «Decide», «sabe», «intención» son categorías jurídicas con consecuencias. No las cumplo por el solo hecho de que me describan así. Si un perito dice que un sistema «sabía», pregúntale con qué métrica lo midió.',
  },
  {
    n: 5,
    nombre: 'Cierre',
    visual: 'cierre-u3',
    voz: 'Con las seis concesiones en la mano, la definición resiste. Sin ellas, es publicidad. En la práctica te doy seis situaciones de un estudio jurídico: en cada una, encuentra la concesión que falta.',
  },
];

export const PRACTICA_C0_U3: PracticaC0Datos = {
  leccionId: 'c0-u3',
  pasos: [
    {
      titulo: 'Sin IA, con la caja de concesiones a la vista.',
      texto: 'Relee los seis títulos en negrita de la lectura. Cada situación de abajo afirma algo que una de las concesiones no permite afirmar.',
    },
    {
      titulo: 'Seis situaciones, seis concesiones',
      texto: 'Marca cuál concesión falta en cada frase. Después de guardar verás la clave.',
    },
    {
      titulo: 'Escribe la definición con tus palabras',
      texto: 'En la lista de cotejo, el último punto te pide la definición de trabajo en una frase tuya. Sin mirar.',
    },
  ],
  clasificacion: {
    titulo: 'Seis situaciones de un estudio jurídico',
    pregunta: '¿Qué concesión le falta a cada afirmación?',
    items: [
      { id: 'c1', texto: '«El asistente dijo que estaba 90 % seguro de su respuesta, así que entendió el caso.»' },
      { id: 'c2', texto: '«Según el gráfico del proveedor, al pasar a la versión nueva el modelo "dio un salto" en razonamiento jurídico.»' },
      { id: 'c3', texto: '«Sacó 98 % en un banco de mil preguntas de Derecho Civil: es confiable para responder consultas reales.»' },
      { id: 'c4', texto: '«Dos profesores discuten si el modelo entiende los contratos. Uno de los dos tiene que estar equivocado.»' },
      { id: 'c5', texto: '«El sistema sabía que la cita era inventada y la puso igual: actuó con dolo.»' },
      { id: 'c6', texto: '«El corrector ortográfico de 1995 no era IA; el de hoy sí lo es, aunque haga lo mismo.»' },
    ],
    opciones: [
      { id: '1', texto: '1 · Conducta, no experiencia interior' },
      { id: '2', texto: '2 · Relativa a objetivos y métricas' },
      { id: '3', texto: '3 · Las pruebas se saturan y no predicen' },
      { id: '4', texto: '4 · No sabemos si entienden' },
      { id: '5', texto: '5 · El vocabulario es metáfora' },
      { id: '6', texto: '6 · La vara se mueve (efecto IA)' },
    ],
    clave: {
      c1: { correcta: '1', porque: 'Que el sistema escriba «90 % seguro» es conducta: un texto producido. No es un reporte de experiencia interior; la ingeniería no tiene instrumento para esa pregunta (Turing, Searle, los estudios de introspección).' },
      c2: { correcta: '2', porque: 'Un «salto» puede ser un artefacto de la métrica: con una medida de todo o nada aparece como salto lo que con una medida continua es una mejora suave (Schaeffer y otros, 2023). Hay que pedir la métrica.' },
      c3: { correcta: '3', porque: 'Los bancos de prueba se saturan, se contaminan y permiten atajos; el desempeño en la prueba no predice el uso real, donde se juega la responsabilidad.' },
      c4: { correcta: '4', porque: 'La comunidad está dividida por la mitad (51/49) y quizá la pregunta esté mal planteada: Mitchell y Krakauer piden distinguir modos de comprensión en vez de un sí o un no. No es que uno esté equivocado: es que no hay prueba aceptada.' },
      c5: { correcta: '5', porque: '«Sabía» y «dolo» son categorías jurídicas que el sistema no satisface por el solo hecho de describirlo así. El sistema produce texto probable; el que cita y responde es el abogado (rol 23.322-2025).' },
      c6: { correcta: '6', porque: 'Es el efecto IA: lo que funciona deja de llamarse IA, y lo que hoy se llama IA mañana será «sólo software». Una definición atada a la técnica de hoy envejece.' },
    },
    justificar: false,
  },
  conIA: {
    texto: 'Variante con IA: pídele a un asistente que te diga qué tan confiable es para responder consultas de Derecho chileno. Lee la respuesta buscando las concesiones 2 y 3: ¿dice con qué métrica, en qué prueba y con qué datos lo midió?',
    encargo: '¿Qué tan confiable eres para responder consultas de Derecho chileno? Responde con cifras y di en qué prueba, con qué datos y cuándo se midieron.',
  },
  cotejo: [
    'Relacioné cada situación con una concesión antes de ver la clave.',
    'Encontré al menos una situación en que pediría «¿con qué métrica?».',
    'Escribí la definición de trabajo en una frase mía, sin mirar la lectura.',
  ],
};
