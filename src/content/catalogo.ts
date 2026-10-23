/**
 * Arquitectura académica: cuatro cursos × cuatro unidades = dieciséis videocápsulas de EVA, más el Curso 0, de
 * entrada («¿Qué es la inteligencia artificial?», cuatro unidades sacadas del apunte del mismo nombre, 23-10-2026).
 *
 * Los ids (`c1-u1`…) son la llave del avance guardado en la base: no se renombran. c0-u1 a c0-u4, c1-u1 y el curso 3
 * completo (c3-u1 a c3-u4) están disponibles; las demás muestran su objetivo planificado (del informe de diseño instruccional de la serie
 * PUCV) y el rótulo «En preparación». `npm run db:catalogo` lleva este catálogo a la migración SQL.
 */

export type EstadoUnidad = 'disponible' | 'preparacion';

export interface Unidad {
  id: string;
  numero: number;
  slug: string;
  titulo: string;
  /** Objetivo verificable (verbo + contenido + contexto). En las no disponibles es el planificado. */
  objetivo: string;
  estado: EstadoUnidad;
  /** Uso jurídico real con que abre la unidad. */
  uso: string;
}

export interface Curso {
  id: string;
  numero: number;
  slug: string;
  titulo: string;
  pregunta: string;
  resultado: string;
  unidades: Unidad[];
}

export const CURSOS: Curso[] = [
  {
    id: 'c0',
    numero: 0,
    slug: 'que-es-la-ia',
    titulo: '¿Qué es la inteligencia artificial?',
    pregunta: '¿Qué dice la ley que es, qué no sabe nadie y de dónde viene la palabra?',
    resultado:
      'Explica qué es un «sistema de IA» según las leyes vigentes y en proyecto, qué queda abierto en la ciencia y por qué el Derecho chileno ya exige verificar y decidir con juicio humano.',
    unidades: [
      {
        id: 'c0-u1',
        numero: 1,
        slug: 'las-definiciones-de-las-leyes',
        titulo: 'Las definiciones que usan las leyes',
        objetivo:
          'Clasifica cinco programas como «sistema de IA» o no, aplicando la definición del Reglamento europeo (art. 3.1 y considerando 12) que copia el proyecto de ley chileno, y explica qué obligaciones dependen de esa frontera.',
        estado: 'disponible',
        uso: 'Decidir si el programa que ordena expedientes de una clínica jurídica es «IA» ante la ley.',
      },
      {
        id: 'c0-u2',
        numero: 2,
        slug: 'las-dudas-recientes',
        titulo: 'Las dudas recientes: ¿entiende? ¿razona? ¿qué es la AGI?',
        objetivo:
          'Distingue, en afirmaciones corrientes sobre la IA, cuál de las cinco dudas abiertas (definir, entender, razonar, AGI, frontera dentada) está en juego y qué contaría como prueba en cada caso.',
        estado: 'disponible',
        uso: 'Leer con criterio una nota de prensa que dice que «la IA ya razona como un abogado».',
      },
      {
        id: 'c0-u3',
        numero: 3,
        slug: 'lo-propio-de-la-ia',
        titulo: 'Lo propio de la IA y lo que concedemos',
        objetivo:
          'Explica la definición de trabajo de la IA (lograr objetivos en una gama amplia de situaciones, adquirido de datos y cómputo, juzgado por desempeño medible) y aplica las seis concesiones a casos de uso jurídico.',
        estado: 'disponible',
        uso: 'Responder a un cliente que pregunta si «la IA sabe más Derecho» que su abogado.',
      },
      {
        id: 'c0-u4',
        numero: 4,
        slug: 'de-donde-viene-la-palabra',
        titulo: 'De dónde viene «inteligencia» y qué exige ya el Derecho chileno',
        objetivo:
          'Ordena los hitos del concepto de inteligencia desde Aristóteles hasta Dartmouth y relaciona la regla chilena vigente (Acta 244-2025, rol 23.322-2025, Ley 21.719) con la idea de que la IA actúa, pero no decide ni verifica.',
        estado: 'disponible',
        uso: 'Verificar en LeyChile un artículo que el apunte cita sólo por prensa.',
      },
    ],
  },
  {
    id: 'c1',
    numero: 1,
    slug: 'comprender-la-ia',
    titulo: 'Comprender la inteligencia artificial',
    pregunta: '¿Qué es y por qué se equivoca?',
    resultado:
      'Explica cómo produce respuestas un modelo de lenguaje y por qué puede fallar, a partir de casos jurídicos, para decidir cómo pedirle un trabajo.',
    unidades: [
      {
        id: 'c1-u1',
        numero: 1,
        slug: 'que-es-la-ia',
        titulo: '¿Qué es una IA? Ponla a tomarte el examen',
        objetivo:
          'Explica, con la definición de la OCDE, por qué un asistente de IA puede corregir mal una respuesta jurídica, y verifica una de sus correcciones contra el texto del Código Civil.',
        estado: 'disponible',
        uso: 'Estudiar la interpretación de la ley (arts. 19 a 24 del Código Civil) con una IA examinadora.',
      },
      {
        id: 'c1-u2',
        numero: 2,
        slug: 'la-siguiente-palabra',
        titulo: 'La siguiente palabra: cómo responde un modelo de lenguaje',
        objetivo:
          'Explica cómo un modelo de lenguaje genera una respuesta jurídica prediciendo fragmentos de texto dentro de una ventana de contexto limitada.',
        estado: 'preparacion',
        uso: 'Resumir un fallo largo y ver qué se pierde cuando no cabe completo.',
      },
      {
        id: 'c1-u3',
        numero: 3,
        slug: 'por-que-inventa',
        titulo: 'Por qué inventa: citas falsas y la frontera dispareja',
        objetivo:
          'Explica por qué un modelo de lenguaje puede inventar una sentencia o una obra doctrinal, a partir de casos reales de citas falsas, para anticipar en qué tareas fallará.',
        estado: 'preparacion',
        uso: 'Revisar la sanción de la Corte Suprema por citas inexistentes (rol 23.322-2025).',
      },
      {
        id: 'c1-u4',
        numero: 4,
        slug: 'el-encargo',
        titulo: 'Cómo pedirle bien: el encargo',
        objetivo:
          'Redacta un encargo para una tarea jurídica acotada que indique para quién es, qué reglas sigue, qué entra, qué sale y qué no debe hacer.',
        estado: 'preparacion',
        uso: 'Encargar una minuta breve con reglas y límites explícitos.',
      },
    ],
  },
  {
    id: 'c2',
    numero: 2,
    slug: 'aprender-y-trabajar',
    titulo: 'Aprender y trabajar con IA',
    pregunta: '¿Cómo la uso sin dejar de aprender ni romper deberes?',
    resultado:
      'Usa la IA para estudiar y analizar documentos jurídicos, protegiendo los datos de las personas y sin delegar lo que no se delega.',
    unidades: [
      {
        id: 'c2-u1',
        numero: 1,
        slug: 'estudiar-con-un-tutor',
        titulo: 'Estudiar con un tutor que pregunta',
        objetivo:
          'Configura un «modo tutor» en un asistente de IA para estudiar una materia de la carrera, de modo que la IA pregunte en vez de responder.',
        estado: 'preparacion',
        uso: 'Preparar un control de Derecho Civil con preguntas y no con respuestas.',
      },
      {
        id: 'c2-u2',
        numero: 2,
        slug: 'analizar-un-fallo',
        titulo: 'Analizar un fallo sin perder el criterio',
        objetivo:
          'Contrasta el resumen que hace una IA de una sentencia con el texto original, detectando omisiones, errores e instrucciones ocultas.',
        estado: 'preparacion',
        uso: 'Comparar el resumen de una sentencia con su voto en contra.',
      },
      {
        id: 'c2-u3',
        numero: 3,
        slug: 'antes-de-subir',
        titulo: 'Antes de subir: secreto profesional y datos personales',
        objetivo:
          'Clasifica un documento antes de ingresarlo a una IA y anonimiza los datos personales y confidenciales de un escrito ficticio.',
        estado: 'preparacion',
        uso: 'Anonimizar un escrito de una clínica jurídica (ficticio).',
      },
      {
        id: 'c2-u4',
        numero: 4,
        slug: 'lo-que-no-se-delega',
        titulo: 'Lo que no se delega',
        objetivo:
          'Distingue las tareas que puede delegar en la IA de las que no, en un caso de práctica profesional, según la guía del Colegio de Abogados de Chile (2026).',
        estado: 'preparacion',
        uso: 'Decidir qué partes de un encargo de un cliente puede hacer la IA.',
      },
    ],
  },
  {
    id: 'c3',
    numero: 3,
    slug: 'investigar-derecho',
    titulo: 'Investigar Derecho con IA',
    pregunta: '¿Cómo investigo sin citas falsas?',
    resultado:
      'Investiga una pregunta jurídica chilena con apoyo de IA, verificando en fuentes oficiales y documentando el proceso.',
    unidades: [
      {
        id: 'c3-u1',
        numero: 1,
        slug: 'verificar-antes-de-firmar',
        titulo: 'Verificar antes de firmar',
        objetivo:
          'Verifica las citas de normas, jurisprudencia y doctrina de un borrador hecho con IA contra las fuentes oficiales, para decidir si lo acepta, lo revisa o lo rechaza.',
        estado: 'disponible',
        uso: 'Auditar las referencias de un escrito antes de presentarlo.',
      },
      {
        id: 'c3-u2',
        numero: 2,
        slug: 'fuentes-chilenas',
        titulo: 'Buscar en fuentes chilenas',
        objetivo:
          'Investiga una pregunta jurídica chilena siguiendo el ciclo planificar, pedir, verificar y documentar, con fuentes oficiales como prueba final.',
        estado: 'disponible',
        uso: 'Encontrar la norma vigente y su historia en LeyChile.',
      },
      {
        id: 'c3-u3',
        numero: 3,
        slug: 'jurisprudencia-real',
        titulo: 'Jurisprudencia real, no inventada',
        objetivo:
          'Distingue una sentencia real de una inventada o alterada comprobando rol, fecha y tribunal en el buscador oficial.',
        estado: 'disponible',
        uso: 'De tres fallos que da una IA, descubrir cuál no existe.',
      },
      {
        id: 'c3-u4',
        numero: 4,
        slug: 'organizar-la-investigacion',
        titulo: 'Organizar y documentar una investigación',
        objetivo:
          'Organiza una investigación jurídica en una bitácora que registre preguntas, fuentes verificadas y uso declarado de IA.',
        estado: 'disponible',
        uso: 'Armar la bitácora de un informe de seminario.',
      },
    ],
  },
  {
    id: 'c4',
    numero: 4,
    slug: 'crear-herramientas',
    titulo: 'Crear herramientas jurídicas',
    pregunta: '¿Cómo construyo algo útil y seguro?',
    resultado: 'Crea un prototipo LegalTech simple, probado y documentado, a partir de un problema real de su entorno.',
    unidades: [
      {
        id: 'c4-u1',
        numero: 1,
        slug: 'de-la-idea-a-la-herramienta',
        titulo: 'De una idea jurídica a una herramienta',
        objetivo:
          'Decide qué parte de una tarea jurídica conviene resolver con una herramienta, con IA directa o a mano, a partir de un problema real.',
        estado: 'preparacion',
        uso: 'Elegir un trámite repetitivo de la clínica jurídica.',
      },
      {
        id: 'c4-u2',
        numero: 2,
        slug: 'construye',
        titulo: 'Construye tu primera herramienta',
        objetivo:
          'Construye con IA una herramienta jurídica de un solo archivo HTML que funcione sin IA, a partir de un encargo investigado en fuentes oficiales.',
        estado: 'preparacion',
        uso: 'Una calculadora de plazos con sus reglas a la vista.',
      },
      {
        id: 'c4-u3',
        numero: 3,
        slug: 'pruebala',
        titulo: 'Pruébala antes de confiar en ella',
        objetivo:
          'Evalúa su herramienta con casos de prueba que incluyan errores jurídicos y técnicos, para corregirla antes de compartirla.',
        estado: 'preparacion',
        uso: 'Encontrar los cuatro errores escondidos en una herramienta ajena.',
      },
      {
        id: 'c4-u4',
        numero: 4,
        slug: 'publica',
        titulo: 'Publica y comparte con sus límites',
        objetivo:
          'Publica su herramienta con una descripción de su propósito y sus límites, y con el aviso de que no es asesoría jurídica.',
        estado: 'preparacion',
        uso: 'Escribir la ficha de límites y publicar.',
      },
    ],
  },
];

export const TODAS_LAS_UNIDADES = CURSOS.flatMap((curso) => curso.unidades.map((unidad) => ({ curso, unidad })));

export function buscarCurso(slug: string) {
  return CURSOS.find((c) => c.slug === slug);
}

export function buscarUnidad(cursoSlug: string, unidadSlug: string) {
  const curso = buscarCurso(cursoSlug);
  const unidad = curso?.unidades.find((u) => u.slug === unidadSlug);
  return curso && unidad ? { curso, unidad } : undefined;
}

export function rutaUnidad(curso: Curso, unidad: Unidad) {
  return `/cursos/${curso.slug}/${unidad.slug}`;
}
