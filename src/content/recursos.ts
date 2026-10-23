/**
 * «Qué hay aquí»: los recursos de la plataforma con su estado real. Lo que no existe todavía dice «en preparación».
 * Acceso: gratis · pago · institucional · por verificar (los planes de cada producto cambian: se revisan antes de publicar).
 */
export interface Recurso {
  id: string;
  nombre: string;
  cifra: string;
  texto: string;
  href: string;
  tamano: 'grande' | 'media' | 'chica';
  etiquetas: { texto: string; tono: string }[];
}

export const RECURSOS: Recurso[] = [
  {
    id: 'cursos',
    nombre: 'Cursos',
    cifra: '0 + 4 × 4',
    texto: 'Un curso de entrada (qué es la IA) y cuatro cursos: comprender, aprender, investigar y crear. Cada unidad: un objetivo que se puede comprobar, una tarea real y una evaluación.',
    href: '/cursos',
    tamano: 'grande',
    etiquetas: [
      { texto: '9 unidades disponibles', tono: 'disponible' },
      { texto: '11 en preparación', tono: 'preparacion' },
    ],
  },
  {
    id: 'capsulas',
    nombre: 'Videocápsulas de EVA',
    cifra: '16',
    texto: 'Tres minutos para el aula y un minuto y medio para redes. EVA presenta; tú decides si le crees.',
    href: '/cursos/comprender-la-ia/que-es-la-ia#presentacion',
    tamano: 'media',
    etiquetas: [{ texto: 'guiones en revisión', tono: 'pendiente' }],
  },
  {
    id: 'guias',
    nombre: 'Guías',
    cifra: 'PDF',
    texto: 'Lo esencial de cada unidad para imprimir o repasar, con sus fuentes verificadas.',
    href: '/recursos#guias',
    tamano: 'chica',
    etiquetas: [{ texto: 'en preparación', tono: 'preparacion' }],
  },
  {
    id: 'tutoriales',
    nombre: 'Tutoriales',
    cifra: 'básico → avanzado',
    texto: 'ChatGPT y Claude para estudiar; Claude Code y Codex para construir; navegación asistida con permisos. Cada paso dice qué es gratis y qué no.',
    href: '/recursos#tutoriales',
    tamano: 'media',
    etiquetas: [
      { texto: 'gratis', tono: 'gratis' },
      { texto: 'pago', tono: 'pago' },
      { texto: 'institucional', tono: 'institucional' },
    ],
  },
  {
    id: 'herramientas',
    nombre: 'Herramientas',
    cifra: '1 operativa',
    texto: '«Antes de subir»: clasifica un documento antes de pegarlo en una IA. Próximas: verificador de referencias y bitácora de investigación.',
    href: '/herramientas',
    tamano: 'chica',
    etiquetas: [{ texto: 'operativa', tono: 'operativa' }],
  },
  {
    id: 'biblioteca',
    nombre: 'Biblioteca de investigación',
    cifra: 'fuentes oficiales',
    texto: 'Dónde buscar doctrina y jurisprudencia chilena, cómo auditar una cita y cómo ordenar una investigación.',
    href: '/biblioteca',
    tamano: 'chica',
    etiquetas: [{ texto: 'en diseño', tono: 'diseno' }],
  },
  {
    id: 'docentes',
    nombre: 'Para docentes',
    cifra: 'guía + panel',
    texto: 'Cómo llevar cada unidad a clase y ver el avance de tu sección sin pedir datos a nadie.',
    href: '/docentes',
    tamano: 'media',
    etiquetas: [{ texto: 'guía piloto', tono: 'disponible' }],
  },
];
