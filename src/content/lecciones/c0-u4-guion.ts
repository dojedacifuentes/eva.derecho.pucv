import type { PracticaC0Datos, TramoC0 } from './c0-comun';

/**
 * Unidad 0.4 «De dónde viene "inteligencia" y qué exige ya el Derecho chileno»: guion de «EVA presenta»
 * (recreación, borrador del 23-10-2026, pendiente de revisión jurídica) y la práctica: ordenar los hitos del concepto
 * y verificar en LeyChile un artículo que el apunte cita sólo por prensa.
 */
export const GUION_C0_U4: TramoC0[] = [
  {
    n: 1,
    nombre: 'Gancho',
    visual: 'palabra',
    voz: 'Soy EVA, una inteligencia artificial. Mi apellido es nuevo. Mi nombre tiene dos mil años. «Inteligencia» viene del latín: escoger entre, o leer dentro. Fue facultad del alma, después un número, después un instrumento de Estado. Y en 1955 un científico la pegó a las máquinas para evitar a otro.',
  },
  {
    n: 2,
    nombre: 'Entender y razonar',
    visual: 'linea',
    voz: 'Tomás de Aquino distinguió entender, captar la verdad de golpe, de razonar, avanzar paso a paso. Una nota del Vaticano de 2025 lo retoma: la IA imita el razonar, el proceso que se puede computar, y no el entender. Puedes no compartir su marco; la distinción es útil.',
  },
  {
    n: 3,
    nombre: 'La cifra',
    visual: 'cifra-1927',
    voz: 'En 1927 la Corte Suprema de Estados Unidos validó la esterilización de una mujer con una cifra de «inteligencia» y una frase: tres generaciones de imbéciles son suficientes. Una herramienta pensada para ayudar a niños se volvió un número, y el número, ley. Recuérdalo cuando leas «puntaje de riesgo».',
  },
  {
    n: 4,
    nombre: 'Lo que Chile ya exige',
    visual: 'niveles',
    voz: 'Chile no tiene ley de IA. Pero el Código de Ética Judicial dice que la decisión judicial es humana e indelegable. La Corte Suprema suspendió a una abogada por citar libros que no existen: la buena fe es el deber de verificar. Y la Ley 21.719 te da derecho a que una persona revise una decisión automatizada.',
  },
  {
    n: 5,
    nombre: 'Cierre',
    visual: 'regla',
    voz: 'La regla que te llevas: la IA actúa, pero no decide ni verifica. Eso lo haces tú. En la práctica: los hitos de la palabra, y verificar en LeyChile un artículo que el apunte sólo pudo citar por prensa. La fuente la lees tú, no yo.',
  },
];

export const PRACTICA_C0_U4: PracticaC0Datos = {
  leccionId: 'c0-u4',
  pasos: [
    {
      titulo: 'Sin IA: los hitos.',
      texto: 'Cinco frases de la historia del concepto. Marca a quién pertenece cada una (y de paso, en qué siglo estás).',
    },
    {
      titulo: 'Verifica en LeyChile',
      texto: 'El apunte cita el art. 8 bis de la Ley 21.719 por un comentario de prensa, porque LeyChile no cargó ese día. Ábrela tú, busca el artículo y llena la ficha. Si no lo encuentras, eso también es un resultado: anótalo.',
    },
    {
      titulo: 'Guarda',
      texto: 'Con los hitos y la ficha, guarda. La ficha se puede copiar para tu portafolio.',
    },
  ],
  clasificacion: {
    titulo: 'Cinco frases, cinco autores',
    pregunta: '¿Quién lo dijo?',
    items: [
      { id: 'h1', texto: '«Reasoning, therefore, is compared to understanding, as movement is to rest.»' },
      { id: 'h2', texto: '«Intelligence is what is measured by intelligence tests.»' },
      { id: 'h3', texto: '«Three generations of imbeciles are enough.»' },
      { id: 'h4', texto: '«The original question, "Can machines think?" I believe to be too meaningless to deserve discussion.»' },
      { id: 'h5', texto: '«Intelligence is the computational part of the ability to achieve goals in the world.»' },
    ],
    opciones: [
      { id: 'aquino', texto: 'Tomás de Aquino (s. XIII)' },
      { id: 'boring', texto: 'Edwin Boring (1923)' },
      { id: 'holmes', texto: 'Juez Holmes, Buck v. Bell (1927)' },
      { id: 'turing', texto: 'Alan Turing (1950)' },
      { id: 'mccarthy', texto: 'John McCarthy (2007)' },
    ],
    clave: {
      h1: { correcta: 'aquino', porque: 'Summa Theologiae I, q. 79, a. 8: entender es reposo, razonar es movimiento. Es la distinción intellectus/ratio que Antiqua et nova (2025) retoma.' },
      h2: { correcta: 'boring', porque: 'La crítica circular a la psicometría, en 1923: si la inteligencia es lo que mide el test, el test no mide nada que exista fuera de él.' },
      h3: { correcta: 'holmes', porque: 'Buck v. Bell, 274 U.S. 200 (1927): la cifra de «inteligencia» como instrumento de Estado. El caso que muestra el costo jurídico de reificar una palabra.' },
      h4: { correcta: 'turing', porque: '«Computing Machinery and Intelligence» (1950): reemplazó la definición por un juego conductual. Es el origen de la concesión 1.' },
      h5: { correcta: 'mccarthy', porque: 'McCarthy, «What is Artificial Intelligence?» (2007): el inventor del nombre define por objetivos, como la ingeniería de hoy. A la pregunta de si hay una definición que no dependa de la humana respondía «Not yet».' },
    },
    justificar: false,
  },
  verificacion: {
    titulo: 'Ficha de verificación · Ley 21.719, art. 8 bis',
    intro: 'Busca la Ley 21.719 en LeyChile (puedes buscar por número de ley). Localiza el artículo 8 bis y responde con lo que leas ahí, no con lo que dice la lectura.',
    enlace: { texto: 'LeyChile (Biblioteca del Congreso Nacional)', url: 'https://www.bcn.cl/leychile/' },
    campos: [
      { id: 'encontrado', etiqueta: '¿Encontraste el art. 8 bis en el texto de la ley?', opciones: [{ id: 'si', texto: 'Sí' }, { id: 'no', texto: 'No' }, { id: 'otro', texto: 'Está con otro número' }] },
      { id: 'dice', etiqueta: '¿Qué derecho reconoce, en tus palabras? (una o dos líneas)', largo: true },
      { id: 'coincide', etiqueta: '¿Coincide con lo que dice la lectura (oponerse, explicación, intervención humana)?', opciones: [{ id: 'si', texto: 'Sí, coincide' }, { id: 'parcial', texto: 'En parte' }, { id: 'no', texto: 'No coincide' }] },
      { id: 'vigencia', etiqueta: '¿Qué fecha de entrada en vigencia encontraste? (o «no la encontré»)' },
    ],
  },
  cotejo: [
    'Respondí los cinco hitos sin mirar la línea de tiempo.',
    'Abrí la ley en LeyChile, no en un resumen ni en un chat.',
    'Mi ficha dice si coincide con la lectura y dónde no.',
  ],
};
