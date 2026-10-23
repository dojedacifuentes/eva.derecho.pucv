/**
 * Unidad 3.2 «Buscar en fuentes chilenas»: guion de la presentación de EVA y la respuesta de IA que se verifica.
 * Borrador del 23-10-2026, pendiente de revisión jurídica. Fuentes en `c3-u2-fuentes.ts`.
 *
 * DATOS QUE CAMBIAN: la vigencia de la Ley 21.719 puede moverse si se aprueba el boletín 18.623-07 (en el Senado,
 * con «discusión inmediata» desde el 21-10-2026), que la posterga al 1-12-2027. Todo lo que depende de eso dice
 * «al 23-10-2026». Antes de publicar y cada mes: revisar el boletín y actualizar `ESTADO_AL`, el guion y las fuentes.
 *
 * La respuesta de IA es una RECREACIÓN con tres afirmaciones (su orden es su id en el semáforo, c1…c3):
 *   c1 · publicada el 8-5-2024 ............. FALSA: se publicó el 13-12-2024 (el error escondido; estaba en nuestras notas)
 *   c2 · sus cambios rigen el 1-12-2026 ..... cierta al 23-10-2026, pero hay un proyecto que la posterga (amarillo o verde)
 *   c3 · mientras tanto rige la Ley 19.628 .. cierta
 */

export const ESTADO_AL = '23 de octubre de 2026';

export type VisualC3U2 = 'pregunta' | 'respuesta' | 'semaforo' | 'ciclo' | 'leychile' | 'tramitacion' | 'regla' | 'cierre';

export interface TramoC3U2 {
  n: number;
  nombre: string;
  visual: VisualC3U2;
  voz: string;
}

export const PREGUNTA_C3_U2 = '¿Desde cuándo rigen las nuevas reglas de datos personales de la Ley 21.719, y qué ley rige mientras tanto?';

export const RESPUESTA_IA_C3_U2 = {
  rotulo: 'Asistente de IA · respuesta recreada',
  afirmaciones: [
    { id: 'c1', texto: 'La Ley 21.719 fue publicada en el Diario Oficial el 8 de mayo de 2024.' },
    { id: 'c2', texto: 'Sus cambios a la Ley 19.628 rigen desde el 1 de diciembre de 2026.' },
    { id: 'c3', texto: 'Mientras tanto, rige la Ley 19.628, sobre protección de la vida privada.' },
  ],
} as const;

export const GUION_C3_U2: TramoC3U2[] = [
  {
    n: 1,
    nombre: 'Gancho',
    visual: 'pregunta',
    voz: 'Una pregunta simple, de las que hace un cliente: ¿desde cuándo rige la nueva ley de datos personales? Se la hice a una IA. Contestó en dos segundos, con número de ley y fechas. Una de sus tres afirmaciones es falsa. Y confieso algo: mis propias notas tenían el mismo error.',
  },
  {
    n: 2,
    nombre: 'La respuesta',
    visual: 'respuesta',
    voz: 'Esta es su respuesta. La Ley veintiún mil setecientos diecinueve se publicó el ocho de mayo de dos mil veinticuatro. Sus cambios rigen desde el uno de diciembre de dos mil veintiséis. Y mientras tanto, rige la Ley diecinueve mil seiscientos veintiocho. Suena a abogado.',
  },
  {
    n: 3,
    nombre: 'Semáforo',
    visual: 'semaforo',
    voz: 'Antes de verificar, marca cada afirmación: verde si la crees, amarillo si dudas, rojo si es falsa. Una lo es. ¿Cuál?',
  },
  {
    n: 4,
    nombre: 'El ciclo',
    visual: 'ciclo',
    voz: 'Para no adivinar, cuatro pasos. Planificar: qué preguntas y qué contará como respuesta. Pedir: la IA te sirve de mapa, para encontrar números de ley y términos. Verificar: en la fuente oficial. Documentar: dónde, cuándo y qué versión leíste.',
  },
  {
    n: 5,
    nombre: 'LeyChile',
    visual: 'leychile',
    voz: 'Verificar. En LeyChile, la ficha de la ley dice cuándo se promulgó, cuándo se publicó y qué versión estás leyendo. Y el texto trae sus artículos transitorios: ahí está desde cuándo rige. No en un resumen. En la ley.',
  },
  {
    n: 6,
    nombre: 'La ley se mueve',
    visual: 'tramitacion',
    voz: 'Pero las leyes se mueven. En el Senado se tramita un proyecto del Gobierno que posterga esa fecha un año. Una respuesta correcta hoy puede no serlo el próximo mes. La pregunta no es sólo qué dice la ley. Es qué dice hoy.',
  },
  {
    n: 7,
    nombre: 'Regla',
    visual: 'regla',
    voz: 'La regla de esta unidad: toda respuesta jurídica lleva su fuente y su fecha de consulta. Sin fecha, no es una respuesta. Es un rumor.',
  },
  {
    n: 8,
    nombre: 'Cierre',
    visual: 'cierre',
    voz: 'Te toca. La misma pregunta, los cuatro pasos y tu bitácora. ¿Cuál afirmación era falsa? Te lo confirmo en la evaluación.',
  },
];
