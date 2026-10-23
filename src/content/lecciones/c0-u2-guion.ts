import type { PracticaC0Datos, TramoC0 } from './c0-comun';

/**
 * Unidad 0.2 «Las dudas recientes»: guion de «EVA presenta» (recreación, borrador del 23-10-2026, pendiente de
 * revisión) y la práctica: reconocer qué duda se esconde en cinco afirmaciones corrientes sobre la IA.
 */
export const GUION_C0_U2: TramoC0[] = [
  {
    n: 1,
    nombre: 'Gancho',
    visual: 'dudas',
    voz: 'Soy EVA, una inteligencia artificial. Me dicen que entiendo, que razono, que pronto seré «general». Hoy te muestro por qué nadie puede probarlo, ni para afirmarlo ni para negarlo. Cinco dudas abiertas.',
  },
  {
    n: 2,
    nombre: 'El empate',
    visual: 'empate',
    voz: 'En 2022 preguntaron a 480 investigadores si un modelo entrenado sólo con texto puede entender el lenguaje. Cincuenta y uno por ciento dijo que sí; cuarenta y nueve, que no. Un empate. No porque falten datos: porque no acuerdan qué contaría como prueba.',
  },
  {
    n: 3,
    nombre: 'Mirar adentro',
    visual: 'cifra-pista',
    voz: 'Lo más nuevo es mirar dentro de la máquina. Cuando a un modelo le dan una pista, la menciona en su «razonamiento» escrito sólo una de cada tres o cuatro veces. Lo que digo sobre cómo pensé no es prueba de lo que hice. Guarda eso.',
  },
  {
    n: 4,
    nombre: 'Repartir poderes',
    visual: 'poderes',
    voz: 'Y la AGI, la inteligencia general: DeepMind la define por niveles de capacidad; Chollet, por eficiencia para aprender; y entre Microsoft y OpenAI es una cláusula, que verifica un panel y mueve derechos. Definir no es describir el mundo. Es repartir poderes.',
  },
  {
    n: 5,
    nombre: 'Cierre',
    visual: 'dentada',
    voz: 'Oro en la olimpiada de matemática y un reloj de agujas leído bien la mitad de las veces: la frontera es dentada. Que apruebe un examen no dice que acierte en tu caso. En la práctica, cinco frases: encuentra la duda que esconde cada una.',
  },
];

export const PRACTICA_C0_U2: PracticaC0Datos = {
  leccionId: 'c0-u2',
  pasos: [
    {
      titulo: 'Sin IA, 2 minutos.',
      texto: 'Antes de leer las frases, escribe de memoria las cinco dudas de la lectura. Si te falta alguna, vuelve al título de cada sección.',
    },
    {
      titulo: 'Cinco frases que se oyen todos los días',
      texto: 'Cada una esconde una de las cinco dudas. Marca cuál y escribe, en una línea, qué tendría que mostrarte alguien para que la frase quedara probada.',
    },
    {
      titulo: 'Compara',
      texto: 'Después de guardar, lee la clave. Lo que importa no es acertar la etiqueta sino haber pedido una prueba.',
    },
  ],
  clasificacion: {
    titulo: 'Cinco frases, cinco dudas',
    pregunta: '¿Qué duda abierta está en juego en cada frase?',
    items: [
      { id: 'f1', texto: '«El nuevo modelo entiende los contratos mejor que un abogado recién titulado.»' },
      { id: 'f2', texto: '«El modelo mostró su cadena de pensamiento, así que ya sabemos cómo llegó a la respuesta.»' },
      { id: 'f3', texto: '«La empresa anunció que está a meses de alcanzar la inteligencia artificial general.»' },
      { id: 'f4', texto: '«Aprobó el examen de grado con 95 %; puede atender consultas de clientes sin supervisión.»' },
      { id: 'f5', texto: '«Mi programa de reglas para calcular plazos también es inteligencia artificial: resuelve problemas.»' },
    ],
    opciones: [
      { id: 'definir', texto: '¿Se puede definir?' },
      { id: 'entender', texto: '¿Entiende?' },
      { id: 'razonar', texto: '¿Razona?' },
      { id: 'agi', texto: '¿Qué es la AGI y quién la declara?' },
      { id: 'dentada', texto: 'La frontera dentada' },
    ],
    clave: {
      f1: { correcta: 'entender', porque: 'Es la disputa de Mitchell y Krakauer (51/49) y la prueba del pulpo: «entender» no tiene una prueba que los dos bandos acepten. Lo que se puede probar es el desempeño en una tarea concreta, con una métrica declarada.' },
      f2: { correcta: 'razonar', porque: 'La cadena de pensamiento escrita no coincide, la mayoría de las veces, con el proceso interno observado (Anthropic, 2025: menciona la pista el 25 % o el 39 % de las veces). La explicación no es prueba de lo que hizo.' },
      f3: { correcta: 'agi', porque: 'Nadie tiene la definición oficial de AGI: hay niveles (DeepMind), eficiencia de aprendizaje (Chollet) y una cláusula contractual con panel verificador. Antes de creer el anuncio hay que preguntar con cuál definición y quién gana con la declaración.' },
      f4: { correcta: 'dentada', porque: 'Que un sistema apruebe un examen no predice su acierto en el uso real: el desempeño es «jagged» (Informe de seguridad 2026) y el ejemplo de la olimpiada y el reloj lo ilustra. La prueba previa no reemplaza la supervisión.' },
      f5: { correcta: 'definir', porque: 'Es la duda de fondo: no hay definición científica de «inteligencia». La ley la esquivó y definió por conducta («infiere»); un programa de reglas escritas por una persona queda fuera de esa definición, resuelva o no problemas.' },
    },
    justificar: true,
  },
  conIA: {
    texto: 'Variante con IA: pídele a un asistente que resuelva un problema sencillo (una suma de tres cifras, por ejemplo) y que después explique paso a paso cómo lo hizo. Lee la explicación con la concesión de esta unidad en mente: suena convincente, pero no es un registro de lo que ocurrió adentro.',
    encargo: 'Resuelve 347 + 589 y luego explícame, paso a paso, exactamente cómo llegaste al resultado.',
  },
  cotejo: [
    'Escribí las cinco dudas de memoria antes de empezar.',
    'En cada frase anoté qué contaría como prueba, no sólo la etiqueta.',
    'Identifiqué al menos una frase en la que alguien gana con la respuesta.',
  ],
};
