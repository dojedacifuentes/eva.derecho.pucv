import type { PracticaC0Datos, TramoC0 } from './c0-comun';

/**
 * Unidad 0.1 «Las definiciones que usan las leyes»: guion de «EVA presenta» (recreación, borrador del 23-10-2026,
 * pendiente de revisión jurídica) y la práctica: clasificar cinco programas según la definición europea.
 */
export const GUION_C0_U1: TramoC0[] = [
  {
    n: 1,
    nombre: 'Gancho',
    visual: 'tres-programas',
    voz: 'Soy EVA, una inteligencia artificial. Tres programas en un estudio: uno ordena expedientes por fecha, otro recomienda a qué caso dedicar más horas, otro redacta un recurso. Los tres son software. Ante la ley, sólo algunos son «sistemas de IA». Y de eso cuelgan prohibiciones, multas y derechos.',
  },
  {
    n: 2,
    nombre: 'La definición',
    visual: 'definicion',
    voz: 'La definición que manda nació en la OCDE en 2023 y hoy es ley en Europa: un sistema basado en máquinas que, para objetivos explícitos o implícitos, infiere, de lo que recibe, cómo generar predicciones, contenidos, recomendaciones o decisiones. Fíjate en una palabra: infiere.',
  },
  {
    n: 3,
    nombre: 'La frontera',
    visual: 'frontera',
    voz: 'Inferir es aprender de datos lo que nadie te escribió como regla. El programa que ordena por fecha sigue una regla de una persona: queda fuera. El que aprendió de miles de casos a recomendar: queda dentro. Esa es la frontera. Nadie exigió que el sistema sea inteligente.',
  },
  {
    n: 4,
    nombre: 'La cadena',
    visual: 'cadena',
    voz: 'Y la definición viaja: OCDE, Estados Unidos, Europa, el Consejo de Europa, Chile. El proyecto de ley chileno la traduce casi letra por letra. Lo que se discuta en Europa sobre esas palabras llegará aquí con la misma frase.',
  },
  {
    n: 5,
    nombre: 'Cierre',
    visual: 'cierre',
    voz: 'En la práctica vas a clasificar cinco programas: dentro o fuera. Sin preguntarme a mí: con el artículo 3 y el considerando 12 a la vista. Soy una IA; sobre lo que soy, la última palabra la tiene la ley, y la lee una persona.',
  },
];

export const PRACTICA_C0_U1: PracticaC0Datos = {
  leccionId: 'c0-u1',
  pasos: [
    {
      titulo: 'Sin IA, con la definición a la vista.',
      texto: 'Vuelve a leer el art. 3.1 y el considerando 12 en la lectura. La pregunta de cada caso es una sola: ¿el programa infiere de datos, o aplica reglas que escribió una persona?',
    },
    {
      titulo: 'Clasifica los cinco programas',
      texto: 'Marca «sistema de IA» o «no» y escribe en una línea por qué. Después de guardar verás la clave con la explicación.',
    },
    {
      titulo: 'Compara',
      texto: '¿En cuál dudaste? Esa duda es la misma que tendrá un tribunal. Anótala en la lista de cotejo.',
    },
  ],
  clasificacion: {
    titulo: 'Cinco programas, una definición',
    pregunta: 'Según el art. 3.1 del Reglamento (UE) 2024/1689 y su considerando 12, ¿es un «sistema de IA»?',
    items: [
      { id: 's1', texto: 'Un programa que ordena los expedientes de la clínica jurídica por fecha de ingreso, de más antiguo a más nuevo.' },
      { id: 's2', texto: 'Un programa que, entrenado con miles de sentencias anteriores, estima la probabilidad de que un recurso prospere.' },
      { id: 's3', texto: 'Una planilla que calcula los intereses de una deuda con la fórmula que el abogado escribió en una celda.' },
      { id: 's4', texto: 'Un asistente de chat que redacta el borrador de una demanda a partir de lo que le cuentas del caso.' },
      { id: 's5', texto: 'Un filtro de correo que, cada vez que marcas un mensaje como no deseado, aprende y bloquea mejor los siguientes.' },
    ],
    opciones: [
      { id: 'ia', texto: 'Sistema de IA' },
      { id: 'no', texto: 'No es sistema de IA' },
    ],
    clave: {
      s1: { correcta: 'no', porque: 'Aplica una regla escrita por una persona (ordenar por fecha). No infiere nada: es «tratamiento básico de datos», que el considerando 12 deja fuera.' },
      s2: { correcta: 'ia', porque: 'Infiere de los datos (las sentencias anteriores) cómo generar una predicción. Es el caso típico de la definición.' },
      s3: { correcta: 'no', porque: 'La fórmula la definió el abogado: es un sistema «basado en las normas definidas únicamente por personas físicas», excluido por el considerando 12.' },
      s4: { correcta: 'ia', porque: 'Genera contenidos infiriendo de la entrada que recibe (tu relato) y de lo que aprendió en el entrenamiento, con objetivos implícitos.' },
      s5: { correcta: 'ia', porque: 'Aprende de tus marcas y cambia después de instalado: es la «capacidad de adaptación tras el despliegue» que nombra el art. 3.1. Que sea modesto no lo saca de la definición.' },
    },
    justificar: true,
  },
  conIA: {
    texto: 'Si quieres, después de guardar pídele a un asistente de IA que clasifique los mismos cinco casos y compara con la clave. Donde discrepe, la pregunta es qué dice el texto, no qué dice el asistente.',
    encargo: 'Según el art. 3 n.º 1 del Reglamento (UE) 2024/1689 y su considerando 12, clasifica cada uno de estos programas como «sistema de IA» o «no», y cita en cada caso la frase exacta de la norma en que te basas:\n[pega aquí los cinco casos]',
  },
  cotejo: [
    'Leí el art. 3.1 y el considerando 12 antes de clasificar, no después.',
    'En cada caso escribí por qué, usando la palabra «infiere» o «reglas».',
    'Anoté en cuál dudé y qué me habría hecho falta para decidir.',
  ],
};
