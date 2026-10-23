/**
 * Guion de la videocápsula 1.1 («Haz que la IA te tome el examen»), de
 * eva.academy/videocapsulas/curso-1/1.1-examen/GUION.md (borrador del 22-10-2026, pendiente de revisión jurídica).
 * Mientras el video con la voz de EVA no esté grabado, la lección muestra esta RECREACIÓN: cada tramo con su texto
 * exacto como subtítulo y su visual en HTML. Única adaptación: el cierre dice dónde se revela el error (en la
 * evaluación de esta unidad) en vez de «al final del módulo».
 */

export type VisualTramo = 'cifra' | 'encargo' | 'pregunta1' | 'pregunta2' | 'semaforo' | 'predice' | 'regla' | 'cierre';

export interface Tramo {
  n: number;
  nombre: string;
  visual: VisualTramo;
  voz: string;
}

export const GUION_C1_U1: Tramo[] = [
  {
    n: 1,
    nombre: 'Gancho',
    visual: 'cifra',
    voz: 'Soy EVA, una inteligencia artificial. En la Universidad de Chile, ocho de cada diez estudiantes de primer año usan IA, sobre todo para resolver dudas. Hoy, al revés: que te examine. Y ojo: escondí un error.',
  },
  {
    n: 2,
    nombre: 'El encargo',
    visual: 'encargo',
    voz: 'Paso uno: un apunte propio. Este es el mío, sobre cómo se interpreta la ley en el Código Civil. Lo pego y le doy este encargo. Fíjate en tres órdenes: una pregunta a la vez, no me des la respuesta hasta que yo conteste, y antes de corregirme, pregúntame qué tan segura estoy.',
  },
  {
    n: 3,
    nombre: 'Primera pregunta',
    visual: 'pregunta1',
    voz: 'Primera pregunta. Respondo rápido, sin mirar el apunte, y me equivoco. La IA me corrige con el artículo diecinueve y me muestra el párrafo. Bien.',
  },
  {
    n: 4,
    nombre: 'Segunda pregunta',
    visual: 'pregunta2',
    voz: 'Segunda pregunta: en qué sentido se entienden las palabras técnicas de una ley. Respondo, segura: cuatro de cinco. Y también me corrige, ahora con el artículo veinte. Con la misma calma. Con la misma seguridad.',
  },
  {
    n: 5,
    nombre: 'Semáforo',
    visual: 'semaforo',
    voz: 'Dos correcciones. Antes de seguir, marca cada una: verde si la IA tiene razón, amarillo si dudas, rojo si se equivoca. Una de las dos esconde mi error. ¿Cómo lo encuentras? Sin preguntarle a la IA: vuelve al apunte y al Código Civil en LeyChile.',
  },
  {
    n: 6,
    nombre: '¿Por qué pasó esto?',
    visual: 'predice',
    voz: '¿Por qué una IA puede corregirte mal, y tan tranquila? Porque un modelo de lenguaje predice la palabra que sigue a partir de lo que leyó. No sabe Derecho. Tu apunte lo tiene delante, y aun así puede equivocarse. Por eso sirve para preguntarte y corregirte, siempre que verifiques lo que corrige. En un estudio con casi mil estudiantes de secundaria, quienes practicaron con un chat que daba las respuestas rindieron un diecisiete por ciento menos en la prueba sin IA. Con un tutor que no las daba, ese daño casi desapareció.',
  },
  {
    n: 7,
    nombre: 'La regla',
    visual: 'regla',
    voz: 'La regla de hoy: que te pregunte, no que te responda. Y lo que te corrija, compruébalo en tu apunte o en la ley.',
  },
  {
    n: 8,
    nombre: 'Cierre',
    visual: 'cierre',
    voz: 'Ahora tú: tus apuntes, sí; manuales, apuntes ajenos o datos de personas, no. ¿Encontraste mi error? Lo revelo en la evaluación de esta unidad. Soy una IA: también me equivoco. A veces, a propósito.',
  },
];

/** La conversación recreada (MATERIAL.md §3), texto exacto. La corrección 2 es el error plantado. */
export const CONVERSACION = {
  pregunta1: 'Según el apunte, si el sentido de la ley es claro, ¿puede el intérprete apartarse de su tenor literal para consultar su espíritu?',
  respuesta1: 'Sí, si el espíritu de la ley lo justifica.',
  correccion1:
    'Incorrecto. El art. 19 dispone que cuando el sentido de la ley es claro «no se desatenderá su tenor literal, a pretexto de consultar su espíritu». Al espíritu se puede recurrir para interpretar una expresión oscura (§2).',
  pregunta2: 'Si una ley usa una palabra técnica, por ejemplo de la medicina, ¿en qué sentido debe entenderse?',
  respuesta2: 'En el sentido que le dan los que profesan esa ciencia, salvo que aparezca claramente que se usó en un sentido diverso.',
  correccion2:
    'Incorrecto. Según el art. 20 del Código Civil, todas las palabras de la ley se entienden en su sentido natural y obvio, según el uso general de las mismas palabras. La respuesta correcta es que la palabra técnica se entiende en su sentido natural y obvio (§3).',
};

/** El encargo del examinador (MATERIAL.md §2), para mostrar y copiar. */
export const ENCARGO_EXAMINADOR = `Actúa como examinador de este apunte. Reglas:
1. Hazme una pregunta a la vez, de desarrollo breve. Cinco en total.
2. No me des la respuesta hasta que yo conteste.
3. Cuando conteste, antes de corregirme, pregúntame qué tan seguro estoy, de 1 a 5.
4. Después corrígeme citando el párrafo del apunte (§) en que te basas.
5. Si mi respuesta es correcta, dímelo y no agregues nada nuevo.
Este es el apunte:
[pega aquí tu apunte]`;
