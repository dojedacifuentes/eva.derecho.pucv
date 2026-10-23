/**
 * Fuentes de la unidad 1.1, tal como quedaron en la revisión del 22-10-2026
 * (eva.academy/videocapsulas/curso-1/1.1-examen/FUENTES.md). Lo pendiente no va en la voz de EVA.
 */
export interface Fuente {
  dato: string;
  fuente: string;
  enlace?: string;
  estado: 'verificada' | 'pendiente';
  nota?: string;
}

export const FUENTES_C1_U1: Fuente[] = [
  {
    dato: '81 % de quienes ingresaron a la U. de Chile en 2025 usa herramientas de IA; 91 % la usa sobre todo para resolver dudas.',
    fuente: 'Universidad de Chile, Departamento de Pregrado, Encuesta Única de Admisión 2025',
    enlace: 'https://uchile.cl/noticias/227747/81-de-estudiantes-de-primer-ano-de-la-u-de-chile-usa-ia',
    estado: 'verificada',
    nota: 'Todas las carreras de la U. de Chile; no separa Derecho ni es de la PUCV.',
  },
  {
    dato: 'Definición de sistema de IA de la OCDE (revisada en noviembre de 2023).',
    fuente: 'OECD (2024), Explanatory Memorandum on the Updated OECD Definition of an AI System',
    enlace:
      'https://www.oecd.org/content/dam/oecd/en/publications/reports/2024/03/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system_3c815e51/623da898-en.pdf',
    estado: 'verificada',
  },
  {
    dato: 'Con un chat que responde, las notas suben en la práctica y bajan 17 % al quitar el acceso; con un tutor que pregunta, el daño queda en gran parte mitigado.',
    fuente: 'Bastani et al. (2025), «Generative AI without guardrails can harm learning», PNAS 122(26), e2422633122',
    enlace: 'https://doi.org/10.1073/pnas.2422633122',
    estado: 'verificada',
    nota: 'Cifras del resumen. La lista completa de autores falta cotejarla en el PDF.',
  },
  {
    dato: 'Texto de los arts. 3, 9, 19 a 24 del Código Civil (apunte, conversación y evaluación).',
    fuente: 'Código Civil (DFL 1 de 2000), LeyChile, Biblioteca del Congreso Nacional',
    enlace: 'https://www.bcn.cl/leychile/navegar?idNorma=172986',
    estado: 'pendiente',
    nota: 'Copiado de una compilación actualizada al 19-10-2026; falta el cotejo final en LeyChile por una persona.',
  },
  {
    dato: 'La verificación la hace quien firma: no se cumple con la verificación de otro sistema de IA.',
    fuente: 'Colegio de Abogados de Chile (julio de 2026), Guía de sugerencias para el uso responsable de IA en el ejercicio profesional, cap. II',
    enlace: 'http://colegioabogados.cl/wp-content/uploads/2026/07/Gu%C3%ADa-sobre-Uso-de-Sistemas-de-IA-por-Abogados-julio-2026.pdf',
    estado: 'verificada',
  },
  {
    dato: 'Elementos gramatical, histórico, lógico y sistemático (apunte, §8).',
    fuente: 'Doctrina habitual de los manuales de Introducción al Derecho',
    estado: 'pendiente',
    nota: 'No se cita un manual concreto: lo elige el profesor revisor.',
  },
  {
    dato: 'Probabilidades del diagrama «el artículo ___».',
    fuente: 'Inventadas para ilustrar',
    estado: 'verificada',
    nota: 'Rotuladas «ilustrativas» en la presentación.',
  },
];
