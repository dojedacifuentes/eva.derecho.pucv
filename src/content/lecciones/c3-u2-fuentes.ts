import type { Fuente } from './c1-u1-fuentes';

/**
 * Fuentes de la unidad 3.2, consultadas el 23-10-2026 en los servicios oficiales de LeyChile y del Senado.
 * El estado del boletín 18.623-07 cambia: revisarlo antes de publicar (ver `c3-u2-guion.ts`).
 */
export const FUENTES_C3_U2: Fuente[] = [
  {
    dato: 'Ley 21.719: promulgada el 25-11-2024 y publicada el 13-12-2024; versión de LeyChile del 5-02-2026 (cambió su artículo cuarto transitorio); no derogada.',
    fuente: 'LeyChile, Biblioteca del Congreso Nacional (ficha y servicio de intercambio de normas)',
    enlace: 'https://www.bcn.cl/leychile/navegar?idNorma=1209272',
    estado: 'verificada',
  },
  {
    dato: 'Art. 1° transitorio: los cambios a las leyes 19.628, 20.285 y 19.496 rigen «el día primero del mes vigésimo cuarto posterior a la publicación»: el 1-12-2026.',
    fuente: 'Ley 21.719, artículo primero transitorio (LeyChile); la fecha la explicita el propio Mensaje del boletín 18.623-07',
    enlace: 'https://www.bcn.cl/leychile/navegar?idNorma=1209272',
    estado: 'verificada',
  },
  {
    dato: 'Origen: boletines 11.092-07 (moción, 17-01-2017) y 11.144-07 (mensaje, 15-03-2017), ambos con origen en el Senado.',
    fuente: 'Senado de Chile, tramitación de proyectos (servicio público de consulta)',
    enlace: 'https://tramitacion.senado.cl/appsenado/templates/tramitacion/index.php?boletin_ini=11144-07',
    estado: 'verificada',
  },
  {
    dato: 'Boletín 18.623-07 (mensaje, ingreso 1-09-2026): reemplaza la fecha del art. 1° transitorio por «1 de diciembre de 2027». Al 23-10-2026: primer trámite en el Senado, en comisión de Constitución, con «discusión inmediata» desde el 21-10-2026.',
    fuente: 'Senado de Chile, tramitación del boletín 18.623-07 y texto del Mensaje (PDF)',
    enlace: 'https://tramitacion.senado.cl/appsenado/templates/tramitacion/index.php?boletin_ini=18623-07',
    estado: 'verificada',
    nota: 'Cambia: si se aprueba y publica, la respuesta de la práctica cambia. Revisar antes de cada uso.',
  },
  {
    dato: 'Art. 7 del Código Civil: la ley obliga desde su publicación en el Diario Oficial, pero cada ley puede fijar otra fecha de vigencia.',
    fuente: 'Código Civil (DFL 1 de 2000), LeyChile',
    enlace: 'https://www.bcn.cl/leychile/navegar?idNorma=172986',
    estado: 'pendiente',
    nota: 'Leído en una compilación al día (leyes-cl.com); el cotejo final en LeyChile lo hace una persona.',
  },
  {
    dato: 'El «8 de mayo de 2024» de la respuesta recreada.',
    fuente: 'Error real de nuestras notas de investigación (eva.academy, research_notes), corregido con LeyChile',
    estado: 'verificada',
    nota: 'Se usa como el error escondido: ninguna fuente oficial lo respalda.',
  },
];
