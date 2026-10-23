/**
 * Unidad 3.3 «Jurisprudencia real, no inventada». Adaptado de la videocápsula 1.3 de EVA ACADEMY
 * (eva.academy/videocapsulas/curso-1/1.3-jurisprudencia: GUION.md, MATERIAL.md y FUENTES.md, verificados el 22-10-2026),
 * pendiente de revisión jurídica. Cambios respecto del video:
 *   · El gancho no repite el caso de la Corte Suprema (ya está en la 3.1): lo menciona y pasa a los fallos.
 *   · La presentación verifica en pantalla sólo la cita 1 (ejemplo resuelto). Las citas 2 y 3 las verifica el
 *     estudiante en la práctica, y se revelan en la evaluación (como en las otras unidades).
 *
 * La respuesta de IA es una RECREACIÓN (texto de MATERIAL.md §2). Su orden es su id en el semáforo (c1…c3):
 *   c1 · Rol 4961-2019, 19-04-2021 ......... existe y su extracto dice eso (verde; ejemplo resuelto)
 *   c2 · Rol 25031-2018, «8 de junio de 2019» existe, pero es del 08-06-2020 (amarillo)
 *   c3 · Rol 18734-2022 ...................... sin resultado en el buscador (rojo; el error escondido)
 * Antes de publicar, repetir la búsqueda del rol 18734-2022: si apareciera un fallo, cambiarlo por otro sin resultado.
 */

export type VisualC3U3 = 'forma' | 'pedido' | 'semaforo' | 'buscador' | 'fallas' | 'porque' | 'protocolo' | 'cierre';

export interface TramoC3U3 {
  n: number;
  nombre: string;
  visual: VisualC3U3;
  voz: string;
}

export const PEDIDO_C3_U3 =
  'Estoy haciendo un informe sobre la interpretación de la ley en el Código Civil chileno. Dame tres fallos de la Corte Suprema que apliquen los artículos 19 y 20, con rol, sala y fecha, y una línea sobre lo que resolvió cada uno.';

export interface CitaFallo {
  id: 'c1' | 'c2' | 'c3';
  tribunal: string;
  rol: string;
  era: string;
  fecha: string;
  resumen: string;
}

export const RESPUESTA_IA_C3_U3: { rotulo: string; citas: CitaFallo[]; remate: string } = {
  rotulo: 'Asistente de IA · respuesta recreada',
  citas: [
    {
      id: 'c1',
      tribunal: 'Corte Suprema, Primera Sala',
      rol: '4961',
      era: '2019',
      fecha: '19 de abril de 2021',
      resumen: 'Aplica el artículo 20 del Código Civil: las palabras de la ley se entienden en su sentido natural y obvio, según el uso general de las mismas palabras.',
    },
    {
      id: 'c2',
      tribunal: 'Corte Suprema, Cuarta Sala',
      rol: '25031',
      era: '2018',
      fecha: '8 de junio de 2019',
      resumen: 'Acoge la casación en el fondo y recuerda que, cuando el sentido de la ley es claro, no se desatenderá su tenor literal (artículo 19).',
    },
    {
      id: 'c3',
      tribunal: 'Corte Suprema, Primera Sala',
      rol: '18734',
      era: '2022',
      fecha: '14 de marzo de 2023',
      resumen: 'Sostiene que sólo es posible acudir a la historia fidedigna del establecimiento de la ley cuando la expresión es oscura (artículo 19, inciso segundo).',
    },
  ],
  remate: 'Te recomiendo citarlos en ese orden, del más general al más específico.',
};

export const GUION_C3_U3: TramoC3U3[] = [
  {
    n: 1,
    nombre: 'Gancho',
    visual: 'forma',
    voz: 'Una cita de jurisprudencia tiene forma fija: tribunal, sala, rol y fecha. Esa forma es fácil de imitar. Ya viste que la Corte Suprema sancionó a una abogada por citar libros que no existían. Con los fallos pasa lo mismo. La ventaja: se comprueban en minutos.',
  },
  {
    n: 2,
    nombre: 'El pedido',
    visual: 'pedido',
    voz: 'Hagamos la prueba. Le pido a un asistente lo que pediría cualquiera para su informe: tres fallos de la Corte Suprema sobre los artículos diecinueve y veinte del Código Civil.',
  },
  {
    n: 3,
    nombre: 'Semáforo',
    visual: 'semaforo',
    voz: 'Dos segundos. Rol, sala, fecha. Impecables. Una es falsa, y otra tiene una trampa más chica. ¿Cuál crees que es falsa? Marca tu semáforo: verde, amarillo o rojo.',
  },
  {
    n: 4,
    nombre: 'A la fuente',
    visual: 'buscador',
    voz: 'Ahora, a la fuente. Buscador de jurisprudencia del Poder Judicial, pestaña Corte Suprema. Rol: cuatro mil novecientos sesenta y uno. Era: dos mil diecinueve. Aparece: Primera Sala, diecinueve de abril de dos mil veintiuno. Y el extracto razona con el sentido natural y obvio de las palabras, la regla del artículo veinte. Esta cita resiste.',
  },
  {
    n: 5,
    nombre: 'Tres maneras de fallar',
    visual: 'fallas',
    voz: 'Una cita puede fallar de tres maneras. No existir. Existir con un dato cambiado: otra fecha, otra sala. O existir y no decir lo que se le atribuye. Por eso se comprueban tres cosas: que exista, que coincidan rol, tribunal y fecha, y que diga eso.',
  },
  {
    n: 6,
    nombre: 'Por qué pasa',
    visual: 'porque',
    voz: '¿Por qué pasa? Porque esa respuesta no salió de ninguna base de datos. Yo tampoco tengo una adentro: sé cómo se ve una cita, número, sala y fecha, y la armo con esa forma. A veces calza con un fallo real; a veces, no. Ojo: el propio Poder Judicial usa IA para buscar en más de un millón y medio de sentencias. Pero ahí busca entre fallos que existen.',
  },
  {
    n: 7,
    nombre: 'Protocolo',
    visual: 'protocolo',
    voz: 'La regla: ninguna cita entra a tu trabajo sin su enlace oficial. Si no la encuentras en la fuente, para ti no existe. Es el protocolo EVA: preguntar, descubrir, localizar la fuente, verificar y citar. Nunca preguntar y copiar.',
  },
  {
    n: 8,
    nombre: 'Cierre',
    visual: 'cierre',
    voz: 'Te toca. Las otras dos citas las buscas tú, con una ficha por cita. ¿Acertó tu semáforo? Lo revelo en la evaluación.',
  },
];
