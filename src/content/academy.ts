/**
 * EVA ACADEMY (evaacademyia.vercel.app) es el curso gamificado de EVA: lecciones en diapositivas, laboratorios,
 * actividades H5P, casos ramificados y la Sala de juegos. Esta plataforma no lo copia: lo ENLAZA. Lo pesado
 * (actividades, juegos, guías PDF) se carga sólo si alguien lo abre, y el contenido sigue siendo de EVA.
 *
 * Criterio de cada enlace (evaluación del 23-10-2026, docs/06-reutilizacion-eva-academy.md):
 *   · «directo»: cubre el objetivo de la unidad; sirve como práctica o para profundizar.
 *   · «complemento»: toca el tema desde otro ángulo; útil, no necesario.
 * Las direcciones se comprueban con `node scripts/enlaces-academy.mjs`. Los ids de EVA ACADEMY no se renombran
 * (son su avance guardado), así que estas direcciones son estables.
 *
 * Límite: el avance de EVA ACADEMY se guarda en el navegador de ese sitio y no se suma al de esta plataforma.
 */

export const ACADEMY = 'https://evaacademyia.vercel.app';

export type Encaje = 'directo' | 'complemento';

export interface EnlaceLeccion {
  modulo: string;
  leccion: string;
  titulo: string;
  minutos: number;
  encaje: Encaje;
}

export interface EnlaceJuego {
  /** Ruta dentro de EVA ACADEMY: un juego de la Sala o la lección que lo contiene. */
  ruta: string;
  titulo: string;
  que: string;
}

export interface EnAcademy {
  lecciones: EnlaceLeccion[];
  juegos: EnlaceJuego[];
}

export const rutaLeccion = (l: Pick<EnlaceLeccion, 'modulo' | 'leccion'>) => `${ACADEMY}/modulo/${l.modulo}/${l.leccion}`;
export const rutaGuia = (l: Pick<EnlaceLeccion, 'modulo' | 'leccion'>) => `${ACADEMY}/guia/${l.modulo}/${l.leccion}`;
export const rutaJuego = (j: EnlaceJuego) => `${ACADEMY}${j.ruta}`;

const M1 = 'dentro-de-la-maquina';
const M2 = 'la-frontera';
const M3 = 'construir';
const M4 = 'publicar';

const J = {
  hecho: { ruta: '/sala/hecho-o-alucinacion', titulo: '¿Hecho o alucinación?', que: 'Tarjetas: ¿es verdad o la IA lo inventó?' },
  ventana: { ruta: '/sala/ventana-de-contexto', titulo: 'Ventana de contexto', que: 'Lo que no cabe, el modelo no lo ve.' },
  balanza: { ruta: '/sala/balanza-de-datos', titulo: 'Balanza de datos', que: 'Equilibra los ejemplos de entrenamiento: así entran los sesgos.' },
  snake: { ruta: '/sala/snake-del-encargo', titulo: 'Snake del encargo', que: 'Las cinco partes de un buen encargo, en orden.' },
  anonimizador: { ruta: '/sala/anonimizador', titulo: 'Anonimizador', que: 'Tacha los datos personales antes de subir (todos inventados).' },
  inyeccion: { ruta: '/sala/caza-la-inyeccion', titulo: 'Caza la inyección', que: 'Encuentra la orden escondida en un documento.' },
  flujo: { ruta: '/sala/conecta-el-flujo', titulo: 'Conecta el flujo', que: 'De las fuentes a la publicación, sin cortes.' },
  token: { ruta: `/modulo/${M1}/la-siguiente-palabra`, titulo: 'Atrapa el siguiente token', que: 'Juego dentro de la lección «La siguiente palabra».' },
  guardian: { ruta: `/modulo/${M4}/reglas-y-orden`, titulo: 'Guardián del repositorio', que: 'Juego dentro de la lección «Darle reglas y ordenarlo».' },
} satisfies Record<string, EnlaceJuego>;

/** Por unidad de esta plataforma. Una unidad sin entrada no tiene equivalente en EVA ACADEMY (se produce aquí). */
export const EN_ACADEMY: Record<string, EnAcademy> = {
  'c0-u1': {
    lecciones: [{ modulo: M1, leccion: 'que-es-la-ia', titulo: '¿Qué es la IA? (y qué no es)', minutos: 18, encaje: 'directo' }],
    juegos: [],
  },
  'c0-u3': {
    lecciones: [
      { modulo: M1, leccion: 'que-es-la-ia', titulo: '¿Qué es la IA? (y qué no es)', minutos: 18, encaje: 'complemento' },
      { modulo: M1, leccion: 'aprender-de-ejemplos', titulo: 'Cómo aprende una máquina', minutos: 22, encaje: 'complemento' },
    ],
    juegos: [J.balanza],
  },
  'c0-u4': {
    lecciones: [{ modulo: M1, leccion: 'dos-escuelas', titulo: 'Una historia en dos escuelas', minutos: 22, encaje: 'directo' }],
    juegos: [],
  },
  'c1-u1': {
    lecciones: [
      { modulo: M1, leccion: 'que-es-la-ia', titulo: '¿Qué es la IA? (y qué no es)', minutos: 18, encaje: 'directo' },
      { modulo: M1, leccion: 'aprender-de-ejemplos', titulo: 'Cómo aprende una máquina', minutos: 22, encaje: 'complemento' },
    ],
    juegos: [J.balanza],
  },
  'c1-u2': {
    lecciones: [
      { modulo: M1, leccion: 'la-siguiente-palabra', titulo: 'La siguiente palabra', minutos: 20, encaje: 'directo' },
      { modulo: M1, leccion: 'la-atencion', titulo: 'La atención y la escala', minutos: 25, encaje: 'complemento' },
    ],
    juegos: [J.token, J.ventana],
  },
  'c1-u3': {
    lecciones: [
      { modulo: M2, leccion: 'mirar-dentro', titulo: 'Mirar dentro de la máquina', minutos: 22, encaje: 'complemento' },
      { modulo: M2, leccion: 'riesgos-y-control', titulo: 'Riesgos y control', minutos: 24, encaje: 'complemento' },
    ],
    juegos: [J.hecho],
  },
  'c1-u4': {
    lecciones: [{ modulo: M2, leccion: 'los-asistentes', titulo: 'Claude, Gemini y ChatGPT por dentro', minutos: 15, encaje: 'complemento' }],
    juegos: [J.snake],
  },
  'c2-u3': {
    lecciones: [{ modulo: M2, leccion: 'conectores-y-repositorios', titulo: 'Conectores, plugins y repositorios', minutos: 20, encaje: 'complemento' }],
    juegos: [J.anonimizador],
  },
  'c2-u4': {
    lecciones: [{ modulo: M2, leccion: 'delegar-sin-abdicar', titulo: 'Delegar sin abdicar: el abogado que viene', minutos: 26, encaje: 'directo' }],
    juegos: [J.inyeccion],
  },
  'c3-u3': { lecciones: [], juegos: [J.hecho] },
  'c4-u1': {
    lecciones: [
      { modulo: M3, leccion: 'lo-que-puedes-construir', titulo: 'Lo que puedes construir', minutos: 15, encaje: 'directo' },
      { modulo: M3, leccion: 'modelos-y-costos', titulo: 'Modelos, tokens y costos', minutos: 25, encaje: 'complemento' },
    ],
    juegos: [J.flujo],
  },
  'c4-u2': {
    lecciones: [
      { modulo: M3, leccion: 'tu-primera-herramienta', titulo: 'Tu primera herramienta jurídica', minutos: 35, encaje: 'directo' },
      { modulo: M3, leccion: 'recetas', titulo: 'Recetas reutilizables', minutos: 20, encaje: 'complemento' },
    ],
    juegos: [J.snake],
  },
  'c4-u3': {
    lecciones: [{ modulo: M3, leccion: 'probar-y-mejorar', titulo: 'Probar, mejorar y responder', minutos: 20, encaje: 'directo' }],
    juegos: [],
  },
  'c4-u4': {
    lecciones: [
      { modulo: M4, leccion: 'que-es-un-repositorio', titulo: 'Qué es un repositorio', minutos: 15, encaje: 'directo' },
      { modulo: M4, leccion: 'reglas-y-orden', titulo: 'Darle reglas y ordenarlo', minutos: 25, encaje: 'directo' },
      { modulo: M4, leccion: 'publicar-en-vercel', titulo: 'Publicar en Vercel', minutos: 20, encaje: 'directo' },
    ],
    juegos: [J.guardian],
  },
};

/**
 * Recorrido optativo «Lo humano en cuestión»: la parte filosófica de EVA ACADEMY (transhumanismo, dataísmo,
 * neuroderechos, estatus moral, corrientes). No es requisito de ningún curso; amplía la mirada del curso 1.
 */
export const RECORRIDO_FILOSOFICO: EnlaceLeccion[] = [
  { modulo: M1, leccion: 'transhumanismo', titulo: '¿Superar lo humano? El transhumanismo', minutos: 24, encaje: 'complemento' },
  { modulo: M1, leccion: 'dataismo', titulo: 'La religión de los datos: el dataísmo', minutos: 26, encaje: 'complemento' },
  { modulo: M1, leccion: 'neuroderechos', titulo: 'Mi cerebro, mis datos: los neuroderechos', minutos: 22, encaje: 'complemento' },
  { modulo: M1, leccion: 'estatus-moral', titulo: '¿Puede una máquina importar moralmente?', minutos: 24, encaje: 'complemento' },
  { modulo: M1, leccion: 'corrientes-y-dilemas', titulo: 'El mapa: corrientes y dilemas', minutos: 28, encaje: 'complemento' },
];

export const PREGUNTAS_FILOSOFICAS: Record<string, string> = {
  transhumanismo: '¿Dónde pone límites el Derecho a «mejorar» a la especie?',
  dataismo: '¿Qué derechos tienes ante una decisión automatizada?',
  neuroderechos: '¿Qué protege la Constitución chilena de tu actividad cerebral?',
  'estatus-moral': '¿Puede una máquina ser sujeto de derechos?',
  'corrientes-y-dilemas': 'Aceleracionistas, catastrofistas y escépticos: ¿quién exagera?',
};

/** Todas las direcciones que esta plataforma enlaza (para comprobarlas). */
export function todasLasRutasAcademy() {
  const rutas = new Set<string>();
  for (const e of Object.values(EN_ACADEMY)) {
    e.lecciones.forEach((l) => rutas.add(rutaLeccion(l)));
    e.juegos.forEach((j) => rutas.add(rutaJuego(j)));
  }
  RECORRIDO_FILOSOFICO.forEach((l) => rutas.add(rutaLeccion(l)).add(rutaGuia(l)));
  return [...rutas];
}
