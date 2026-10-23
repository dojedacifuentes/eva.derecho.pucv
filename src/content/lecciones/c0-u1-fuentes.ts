import type { Fuente } from './c1-u1-fuentes';

/**
 * Fuentes de la unidad 0.1, tomadas del apunte «¿Qué es la inteligencia artificial?» (fuentes al 20-10-2026). Lo que
 * el apunte marca como no verificado (sección 12) queda «pendiente» y no va en la voz de EVA.
 */
export const FUENTES_C0_U1: Fuente[] = [
  {
    dato: 'Definición revisada de «sistema de IA» de la OCDE (noviembre de 2023) y su origen en el manual de Russell y Norvig (2009).',
    fuente: 'OECD (2024), Explanatory Memorandum on the Updated OECD Definition of an AI System',
    enlace:
      'https://www.oecd.org/content/dam/oecd/en/publications/reports/2024/03/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system_3c815e51/623da898-en.pdf',
    estado: 'verificada',
  },
  {
    dato: 'Art. 3, punto 1 («sistema de IA») y considerando 12 (capacidad de inferencia; exclusión de los sistemas de reglas definidas por personas) del Reglamento (UE) 2024/1689; aplicable desde el 2 de febrero de 2025.',
    fuente: 'Reglamento (UE) 2024/1689, de 13 de junio de 2024, versión oficial en español (BOE)',
    enlace: 'https://www.boe.es/buscar/doc.php?id=DOUE-L-2024-81079',
    estado: 'verificada',
  },
  {
    dato: 'Las directrices de la Comisión Europea (6 de febrero de 2025) sobre la definición «are not binding».',
    fuente: 'Comisión Europea, Commission publishes guidelines on AI system definition (2025)',
    enlace: 'https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application',
    estado: 'verificada',
    nota: 'Qué excluyen exactamente (heurísticas clásicas, regresión lineal) se citó por resúmenes de estudios jurídicos: cotejar con el PDF de las directrices.',
  },
  {
    dato: 'Art. 2 del Convenio Marco del Consejo de Europa sobre IA (17 de mayo de 2024): definición idéntica a la OCDE 2023.',
    fuente: 'Consejo de Europa, Convenio Marco sobre Inteligencia Artificial y Derechos Humanos, Democracia y Estado de Derecho (CETS n.º 225)',
    enlace: 'https://rm.coe.int/1680afae3c',
    estado: 'verificada',
    nota: 'No se confirmó el número de ratificaciones ni la entrada en vigor.',
  },
  {
    dato: 'Art. 3 n.º 1 del proyecto de ley chileno (definición) y el reconocimiento de que sigue a la OCDE 2023.',
    fuente: 'Mensaje del proyecto de ley que regula los sistemas de inteligencia artificial, Boletín 16821-19 (7 de mayo de 2024)',
    enlace: 'https://diarioconstitucional.cl/wp-content/uploads/2024/08/16821-19.pdf',
    estado: 'verificada',
    nota: 'Es proyecto, no ley.',
  },
  {
    dato: 'El proyecto pasó al Senado el 13 de octubre de 2025 y está en segundo trámite con urgencia simple; la definición pudo cambiar en la Cámara.',
    fuente: 'Senado de Chile, noticias y sesión de comisión (2025-2026)',
    enlace: 'https://www.senado.cl/comunicaciones/noticias/proyecto-que-regula-sistemas-de-inteligencia-artificial-sera-estudiado-por',
    estado: 'pendiente',
    nota: 'No se obtuvo el oficio de la Cámara; el último trámite se leyó en un portal privado. Tampoco se confirmó si la «ley marco» anunciada en 2026 ingresó ni si toca la definición. Revisar en senado.cl y camara.cl.',
  },
  {
    dato: 'Párrafo 2 de la Recomendación de la UNESCO: renuncia a una definición única.',
    fuente: 'UNESCO, Recomendación sobre la ética de la inteligencia artificial (23 de noviembre de 2021), texto en español',
    enlace: 'https://www.unesco.org/es/legal-affairs/recommendation-ethics-artificial-intelligence',
    estado: 'verificada',
    nota: 'Verificado en la página de asuntos jurídicos de UNESCO; el PDF de UNESDOC dio error.',
  },
  {
    dato: 'Definición del NIST AI RMF 1.0 (enero de 2023), tomada de la OCDE 2019.',
    fuente: 'NIST AI 100-1, Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
    enlace: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    estado: 'verificada',
  },
  {
    dato: 'Un programa automatizado ingresó 38.477 escritos en tres días a tribunales civiles y la Corte Suprema pidió informe sobre si «realmente usaba IA» (julio de 2026).',
    fuente: 'Diario Constitucional, 28-07-2026',
    enlace: 'https://www.diarioconstitucional.cl/2026/07/28/corte-suprema-revisa-ingreso-automatizado-de-mas-de-38-mil-escritos-que-sobrecargo-tribunales-civiles/',
    estado: 'pendiente',
    nota: 'Sólo prensa; no se tuvo a la vista el expediente ni el informe técnico.',
  },
];
