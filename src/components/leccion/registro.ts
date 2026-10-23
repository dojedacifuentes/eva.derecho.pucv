import type { ComponentType } from 'react';
import { EVALUACION_C0_U1 } from '@/content/evaluaciones/c0-u1';
import { EVALUACION_C0_U2 } from '@/content/evaluaciones/c0-u2';
import { EVALUACION_C0_U3 } from '@/content/evaluaciones/c0-u3';
import { EVALUACION_C0_U4 } from '@/content/evaluaciones/c0-u4';
import { EVALUACION_C1_U1 } from '@/content/evaluaciones/c1-u1';
import { EVALUACION_C3_U1 } from '@/content/evaluaciones/c3-u1';
import { EVALUACION_C3_U2 } from '@/content/evaluaciones/c3-u2';
import { EVALUACION_C3_U3 } from '@/content/evaluaciones/c3-u3';
import { EVALUACION_C3_U4 } from '@/content/evaluaciones/c3-u4';
import type { Evaluacion } from '@/content/evaluaciones/tipos';
import { AUTOESTUDIO_C0, GLOSARIO_C0, LECTURAS_C0, SABIAS_QUE_C0, type Lectura, type SabiasQue, type Termino } from '@/content/lecciones/c0-glosario';
import { FUENTES_C0_U1 } from '@/content/lecciones/c0-u1-fuentes';
import LecturaC0U1 from '@/content/lecciones/c0-u1-lectura.mdx';
import { FUENTES_C0_U2 } from '@/content/lecciones/c0-u2-fuentes';
import LecturaC0U2 from '@/content/lecciones/c0-u2-lectura.mdx';
import { FUENTES_C0_U3 } from '@/content/lecciones/c0-u3-fuentes';
import LecturaC0U3 from '@/content/lecciones/c0-u3-lectura.mdx';
import { FUENTES_C0_U4 } from '@/content/lecciones/c0-u4-fuentes';
import LecturaC0U4 from '@/content/lecciones/c0-u4-lectura.mdx';
import { FUENTES_C1_U1, type Fuente } from '@/content/lecciones/c1-u1-fuentes';
import LecturaC1U1 from '@/content/lecciones/c1-u1-lectura.mdx';
import { FUENTES_C3_U1 } from '@/content/lecciones/c3-u1-fuentes';
import LecturaC3U1 from '@/content/lecciones/c3-u1-lectura.mdx';
import { FUENTES_C3_U2 } from '@/content/lecciones/c3-u2-fuentes';
import LecturaC3U2 from '@/content/lecciones/c3-u2-lectura.mdx';
import { FUENTES_C3_U3 } from '@/content/lecciones/c3-u3-fuentes';
import LecturaC3U3 from '@/content/lecciones/c3-u3-lectura.mdx';
import { FUENTES_C3_U4 } from '@/content/lecciones/c3-u4-fuentes';
import LecturaC3U4 from '@/content/lecciones/c3-u4-lectura.mdx';
import type { DatosCierre } from './Cierre';
import { PracticaC0U1, PracticaC0U2, PracticaC0U3, PracticaC0U4 } from './PracticaC0';
import { PracticaC1U1 } from './PracticaC1U1';
import { PracticaC3U1 } from './PracticaC3U1';
import { PracticaC3U2 } from './PracticaC3U2';
import { PracticaC3U3 } from './PracticaC3U3';
import { PracticaC3U4 } from './PracticaC3U4';
import { PresentacionC0U1, PresentacionC0U2, PresentacionC0U3, PresentacionC0U4 } from './PresentacionC0';
import { PresentacionC1U1 } from './PresentacionC1U1';
import { PresentacionC3U1 } from './PresentacionC3U1';
import { PresentacionC3U2 } from './PresentacionC3U2';
import { PresentacionC3U3 } from './PresentacionC3U3';
import { PresentacionC3U4 } from './PresentacionC3U4';

/**
 * Las unidades que tienen lección completa. La página de unidad (`/cursos/<curso>/<unidad>`) arma los siete pasos
 * con esto; una unidad «disponible» en el catálogo debe estar aquí (lo comprueba una prueba).
 * Para agregar una: su guion y visuales (`PresentacionCxUy.tsx`), su lectura (.mdx), su práctica, su evaluación con
 * clave aparte (y en `claves.server.ts` y `scripts/catalogo-sql.mjs`) y sus fuentes.
 */
export interface LeccionCompleta {
  logro: string;
  duracion: string;
  partida: { pregunta: string; encargo: string };
  Presentacion: ComponentType;
  Lectura: ComponentType;
  Practica: ComponentType;
  evaluacion: Evaluacion;
  fuentes: Fuente[];
  cierre: DatosCierre;
  /** Sólo algunas unidades (el Curso 0): glosario, «¿Sabías que?», preguntas para discutir y lecturas. */
  glosario?: Termino[];
  sabias?: SabiasQue[];
  autoestudio?: string[];
  lecturas?: Lectura[];
}

/** Lo común a las cuatro unidades del Curso 0. */
const extrasC0 = (id: string) => ({
  glosario: GLOSARIO_C0[id],
  sabias: SABIAS_QUE_C0[id],
  autoestudio: AUTOESTUDIO_C0[id],
  lecturas: LECTURAS_C0[id],
});

export const LECCIONES: Record<string, LeccionCompleta> = {
  'c0-u1': {
    logro: '4 de 5 en la evaluación y los cinco programas clasificados con su razón.',
    duracion: '≈ 40 min: 3 de presentación, 12 de lectura, 12 de práctica, 8 de evaluación.',
    partida: {
      pregunta: 'Si te muestran un programa de un estudio jurídico, ¿qué tan seguro estás de poder decir si es «inteligencia artificial» ante la ley?',
      encargo:
        'Este curso es la base de los otros cuatro: qué es un sistema de IA según las leyes, qué no sabe nadie, de dónde viene la palabra y qué exige ya el Derecho chileno. Empiezas por la definición, porque de ella cuelga quién queda obligado.',
    },
    Presentacion: PresentacionC0U1,
    Lectura: LecturaC0U1,
    Practica: PracticaC0U1,
    evaluacion: EVALUACION_C0_U1,
    fuentes: FUENTES_C0_U1,
    cierre: {
      calibracion: 'de confianza en reconocer un sistema de IA ante la ley.',
      siConfiaba:
        'Empezaste confiando en tu ojo. La frontera no está en lo que el programa parece, sino en una palabra: si infiere de datos o aplica reglas escritas por una persona.',
      siNo: 'La regla que te llevas: un sistema de IA, para la ley, infiere. Nadie exigió que sea inteligente.',
    },
    ...extrasC0('c0-u1'),
  },
  'c0-u2': {
    logro: '4 de 5 en la evaluación y las cinco frases con su duda y su prueba.',
    duracion: '≈ 40 min: 3 de presentación, 12 de lectura, 12 de práctica, 8 de evaluación.',
    partida: {
      pregunta: 'Cuando lees que «la IA ya razona como un abogado», ¿qué tan seguro estás de poder decir qué tendría que mostrarte alguien para probarlo?',
      encargo:
        'La ley definió por conducta porque la ciencia no se puso de acuerdo. En esta unidad recorres las cinco dudas que siguen abiertas, para reconocerlas cuando aparezcan disfrazadas de certezas.',
    },
    Presentacion: PresentacionC0U2,
    Lectura: LecturaC0U2,
    Practica: PracticaC0U2,
    evaluacion: EVALUACION_C0_U2,
    fuentes: FUENTES_C0_U2,
    cierre: {
      calibracion: 'de confianza en saber qué probaría que una IA «razona».',
      siConfiaba:
        'Empezaste confiando. Ni la encuesta de los investigadores ni los estudios que miran dentro de la máquina dan una prueba que los dos bandos acepten: lo que sí puedes pedir es la métrica y quién gana con la respuesta.',
      siNo: 'La regla que te llevas: ante «entiende», «razona» o «ya es general», pregunta qué contaría como prueba y quién gana con la respuesta.',
    },
    ...extrasC0('c0-u2'),
  },
  'c0-u3': {
    logro: '4 de 5 en la evaluación y las seis situaciones con su concesión.',
    duracion: '≈ 40 min: 3 de presentación, 12 de lectura, 12 de práctica, 8 de evaluación.',
    partida: {
      pregunta: 'Si un cliente te pregunta si «la IA sabe más Derecho» que tú, ¿qué tan seguro estás de poder responder con fundamento?',
      encargo:
        'Con la definición legal y las dudas a la vista, te quedas con lo que la ingeniería asume de hecho: lograr objetivos, medido por desempeño. Y con las seis cosas que hay que conceder para usar esa definición con honestidad.',
    },
    Presentacion: PresentacionC0U3,
    Lectura: LecturaC0U3,
    Practica: PracticaC0U3,
    evaluacion: EVALUACION_C0_U3,
    fuentes: FUENTES_C0_U3,
    cierre: {
      calibracion: 'de confianza en responder si la IA «sabe» Derecho.',
      siConfiaba:
        'Empezaste confiando. «Sabe» es una metáfora de trabajo, y en Derecho «saber» tiene consecuencias: lo que puedes afirmar es lo que el sistema hizo, con qué métrica y en qué situaciones.',
      siNo: 'La regla que te llevas: la IA logra objetivos medibles; «sabe», «decide» e «intención» son categorías jurídicas que no cumple por el solo hecho de describirla así.',
    },
    ...extrasC0('c0-u3'),
  },
  'c0-u4': {
    logro: '4 de 5 en la evaluación y la ficha de verificación del art. 8 bis de la Ley 21.719 llena.',
    duracion: '≈ 45 min: 3 de presentación, 14 de lectura, 15 de práctica, 8 de evaluación.',
    partida: {
      pregunta: 'La lectura cita un artículo de la Ley 21.719 sólo por prensa. ¿Qué tan seguro estás de encontrarlo y verificarlo en LeyChile por tu cuenta?',
      encargo:
        'La palabra «inteligencia» llegó a las máquinas con dos mil años de disputas. Cierras el curso con esa historia y con lo que el Derecho chileno ya exige: decidir y verificar son tareas humanas. La última verificación la haces tú.',
    },
    Presentacion: PresentacionC0U4,
    Lectura: LecturaC0U4,
    Practica: PracticaC0U4,
    evaluacion: EVALUACION_C0_U4,
    fuentes: FUENTES_C0_U4,
    cierre: {
      calibracion: 'de confianza en verificar una norma en LeyChile por tu cuenta.',
      siConfiaba:
        'Empezaste confiando. Si encontraste el art. 8 bis y lo comparaste con la lectura, hiciste lo que el apunte no pudo: eso es verificar. Si no lo encontraste, también es un resultado, y vale más que una cita por prensa.',
      siNo: 'La regla que te llevas: la IA actúa, pero no decide ni verifica. Eso lo haces tú, en la fuente. Ya tienes la base: sigue con el curso 1.',
    },
    ...extrasC0('c0-u4'),
  },
  'c1-u1': {
    logro: '4 de 5 en la evaluación y una corrección de la IA verificada en el Código Civil.',
    duracion: '≈ 45 min: 6 de video, 10 de lectura, 12 de práctica, 8 de evaluación.',
    partida: {
      pregunta:
        'Si le pides a una IA que corrija tu respuesta de un examen de Derecho, ¿qué tan seguro estás de que su corrección será correcta?',
      encargo:
        'En dos semanas entregas un informe breve sobre un tema de primer año. Elige uno: la interpretación de la ley (arts. 19 a 24 del Código Civil), la costumbre como fuente del Derecho o el efecto de la ley en el tiempo (art. 9). En esta unidad, primero te lo estudias, con una IA que te examina.',
    },
    Presentacion: PresentacionC1U1,
    Lectura: LecturaC1U1,
    Practica: PracticaC1U1,
    evaluacion: EVALUACION_C1_U1,
    fuentes: FUENTES_C1_U1,
    cierre: {
      calibracion: 'de confianza en que una IA corrige bien.',
      siConfiaba:
        'Empezaste confiando bastante. Viste una corrección que sonaba igual de segura que la buena y estaba mal: la seguridad del tono no informa sobre la verdad.',
      siNo: 'La regla que te llevas: que te pregunte, no que te responda. Y lo que corrige, se verifica en el texto.',
    },
  },
  'c3-u1': {
    logro: '4 de 5 en la evaluación y la ficha de auditoría con la decisión y la fuente de cada cita.',
    duracion: '≈ 40 min: 4 de presentación, 10 de lectura, 15 de práctica, 8 de evaluación.',
    partida: {
      pregunta:
        'Una IA te entrega un escrito con citas de leyes, fallos y libros. ¿Qué tan seguro estás de detectar una cita falsa sólo leyéndola, sin buscarla?',
      encargo:
        'En este curso investigas como se investiga en un estudio: con fuentes chilenas oficiales y dejando rastro. Empiezas por lo último que se hace y lo primero que falla: revisar las citas de un escrito antes de firmarlo.',
    },
    Presentacion: PresentacionC3U1,
    Lectura: LecturaC3U1,
    Practica: PracticaC3U1,
    evaluacion: EVALUACION_C3_U1,
    fuentes: FUENTES_C3_U1,
    cierre: {
      calibracion: 'de confianza en detectar una cita falsa a simple vista.',
      siConfiaba:
        'Empezaste confiando en tu ojo. Las cuatro citas tenían forma perfecta y una decía lo contrario de la ley: sólo la fuente las distinguía.',
      siNo: 'La regla que te llevas: si no la leíste en la fuente, no la firmes. Y otra IA no verifica por ti.',
    },
  },
  'c3-u2': {
    logro: '4 de 5 en la evaluación y la bitácora del ciclo con la fuente, el enlace y la fecha de consulta de cada dato.',
    duracion: '≈ 45 min: 4 de presentación, 10 de lectura, 20 de práctica, 8 de evaluación.',
    partida: {
      pregunta:
        'Si una IA te dice desde cuándo rige una ley, con número y fecha, ¿qué tan seguro estás de que esa fecha es correcta hoy?',
      encargo:
        'En este curso investigas como se investiga en un estudio: con fuentes chilenas oficiales y dejando rastro. Ya sabes auditar citas; ahora buscas tú, con un ciclo de cuatro pasos y una bitácora que otro pueda repetir.',
    },
    Presentacion: PresentacionC3U2,
    Lectura: LecturaC3U2,
    Practica: PracticaC3U2,
    evaluacion: EVALUACION_C3_U2,
    fuentes: FUENTES_C3_U2,
    cierre: {
      calibracion: 'de confianza en una fecha de vigencia dada por una IA.',
      siConfiaba:
        'Empezaste confiando en la fecha. Una de las tres afirmaciones era falsa y otra puede cambiar en semanas: la respuesta correcta tiene fuente y fecha de consulta.',
      siNo: 'La regla que te llevas: toda respuesta jurídica lleva su fuente y su fecha de consulta. Sin fecha, es un rumor.',
    },
  },
  'c3-u3': {
    logro: '4 de 5 en la evaluación y las tres fichas de verificación con su enlace oficial.',
    duracion: '≈ 40 min: 4 de presentación, 8 de lectura, 15 de práctica, 8 de evaluación.',
    partida: {
      pregunta:
        'Una IA te da tres fallos de la Corte Suprema con rol, sala y fecha. ¿Qué tan seguro estás de distinguir, sin buscarlos, cuál no existe?',
      encargo:
        'En este curso investigas como se investiga en un estudio: con fuentes chilenas oficiales y dejando rastro. Ya auditaste citas y buscaste normas; ahora, jurisprudencia: la cita más fácil de imitar y la más rápida de comprobar.',
    },
    Presentacion: PresentacionC3U3,
    Lectura: LecturaC3U3,
    Practica: PracticaC3U3,
    evaluacion: EVALUACION_C3_U3,
    fuentes: FUENTES_C3_U3,
    cierre: {
      calibracion: 'de confianza en distinguir un fallo inventado sin buscarlo.',
      siConfiaba:
        'Empezaste confiando en tu ojo. Las tres citas tenían tribunal real, rol con formato correcto y tema exacto: sólo el buscador separó la real, la cambiada y la inventada.',
      siNo: 'La regla que te llevas: ninguna cita sin su enlace oficial. Si no la encuentras en la fuente, para ti no existe.',
    },
  },
  'c3-u4': {
    logro: '4 de 5 en la evaluación y tu bitácora con al menos tres fuentes, sus enlaces y la declaración de uso de IA.',
    duracion: '≈ 45 min: 4 de presentación, 10 de lectura, 20 de práctica, 8 de evaluación.',
    partida: {
      pregunta:
        'Si tu profesor te pidiera mostrar de dónde salió cada afirmación de tu último trabajo, ¿qué tan seguro estás de poder hacerlo en diez minutos?',
      encargo:
        'En este curso investigas como se investiga en un estudio: con fuentes chilenas oficiales y dejando rastro. Ya auditaste citas, buscaste normas y verificaste fallos. Cierras con lo que junta todo: una bitácora que otro pueda seguir.',
    },
    Presentacion: PresentacionC3U4,
    Lectura: LecturaC3U4,
    Practica: PracticaC3U4,
    evaluacion: EVALUACION_C3_U4,
    fuentes: FUENTES_C3_U4,
    cierre: {
      calibracion: 'de confianza en mostrar de dónde salió cada afirmación.',
      siConfiaba:
        'Empezaste confiando. La bitácora del compañero también se veía impecable, y una entrada se desmentía con su propio enlace: lo que no se puede abrir, no se puede defender.',
      siNo: 'La regla que te llevas: si lo usaste, lo declaras; si lo afirmas, lo enlazas. Con eso cierras el curso 3.',
    },
  },
};
