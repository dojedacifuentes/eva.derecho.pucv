/**
 * Lo que hay en Docentes y en Estudiantes (dos de las cuatro secciones: Cursos · Videocápsulas · Docentes ·
 * Estudiantes, orden pedido por el propietario el 23-10-2026). Se repite en el índice de la portada y en cada página.
 * `disponible` dice el estado real; `nota` lo precisa cuando hace falta (piloto, demostración, en diseño…).
 */
export interface Entrada {
  titulo: string;
  texto: string;
  href: string;
  disponible: boolean;
  nota?: string;
}

export const PARA_DOCENTES: Entrada[] = [
  {
    titulo: 'Guía docente',
    texto: 'Cómo llevar cada módulo a clase: antes, durante y después, y qué revisar del contenido jurídico.',
    href: '/docentes#guia',
    disponible: true,
    nota: 'piloto del módulo 1.1',
  },
  {
    titulo: 'Guías por módulo',
    texto: 'Lo esencial de cada módulo, escrito para imprimir o compartir, con sus fuentes verificadas.',
    href: '/docentes#guias',
    disponible: false,
  },
  {
    titulo: 'Lecturas recomendadas',
    texto: 'Dónde buscar doctrina y jurisprudencia chilena y cómo auditar una cita antes de recomendarla.',
    href: '/biblioteca',
    disponible: false,
    nota: 'en diseño',
  },
  {
    titulo: 'Panel de sección',
    texto: 'El avance de tu curso sin pedir datos a nadie. En el prototipo, con una sección ficticia.',
    href: '/docente',
    disponible: true,
    nota: 'demostración',
  },
];

export const PARA_ESTUDIANTES: Entrada[] = [
  {
    titulo: 'Empieza por el Curso 0',
    texto: 'Qué es la IA según las leyes y la ciencia. Cuatro módulos abiertos, sin crear cuenta.',
    href: '/cursos/que-es-la-ia',
    disponible: true,
  },
  {
    titulo: 'Tutoriales',
    texto: 'ChatGPT y Claude para estudiar; Claude Code y Codex para construir. Cada paso dice qué es gratis.',
    href: '/recursos#tutoriales',
    disponible: false,
  },
  {
    titulo: 'Antes de subir',
    texto: 'Clasifica un documento antes de pegarlo en una IA. Funciona en tu navegador, sin enviar nada.',
    href: '/herramientas/antes-de-subir',
    disponible: true,
  },
  {
    titulo: 'Mi avance',
    texto: 'Qué módulos terminaste, qué te falta y cómo te fue en cada evaluación. Se guarda en tu navegador.',
    href: '/mi-avance',
    disponible: true,
  },
];
