/**
 * Lo común a las cuatro unidades del Curso 0 «¿Qué es la inteligencia artificial?» (apunte del 20-10-2026,
 * eva.academy/reports/Apunte concepto de inteligencia artificial.md). Cada unidad tiene su guion de «EVA presenta»
 * (recreación mientras no exista la cápsula) y su práctica guiada sin IA, con IA optativa.
 */

/** Visuales de la recreación de EVA (los dibuja `PresentacionC0.tsx`). */
export type VisualC0 =
  | 'tres-programas'
  | 'definicion'
  | 'frontera'
  | 'cadena'
  | 'dudas'
  | 'empate'
  | 'cifra-pista'
  | 'poderes'
  | 'dentada'
  | 'agente'
  | 'trabajo'
  | 'concesiones'
  | 'categorias'
  | 'palabra'
  | 'linea'
  | 'cifra-1927'
  | 'niveles'
  | 'regla'
  | 'cierre'
  | 'cierre-u3';

export interface TramoC0 {
  n: number;
  nombre: string;
  visual: VisualC0;
  voz: string;
}

/** Un ítem de la práctica: algo que el estudiante clasifica. */
export interface ItemPractica {
  id: string;
  texto: string;
}

export interface OpcionPractica {
  id: string;
  texto: string;
}

/** La clave de cada ítem: la opción correcta y por qué. Se muestra sólo después de guardar. */
export type ClavePractica = Record<string, { correcta: string; porque: string }>;

export interface CampoVerificacion {
  id: string;
  etiqueta: string;
  /** Texto libre (por defecto) o una lista de opciones. */
  opciones?: OpcionPractica[];
  largo?: boolean;
}

/** Todo lo que necesita `PracticaC0` para una unidad. */
export interface PracticaC0Datos {
  leccionId: string;
  /** Los pasos, en orden. El primero suele ser «sin IA». */
  pasos: { titulo: string; texto: string }[];
  clasificacion: {
    titulo: string;
    pregunta: string;
    items: ItemPractica[];
    opciones: OpcionPractica[];
    clave: ClavePractica;
    /** Si pide una justificación breve por ítem. */
    justificar?: boolean;
  };
  /** Ficha de verificación (por ejemplo, en LeyChile), si la unidad la tiene. */
  verificacion?: {
    titulo: string;
    intro: string;
    enlace: { texto: string; url: string };
    campos: CampoVerificacion[];
  };
  /** Variante con IA, optativa. */
  conIA?: { texto: string; encargo: string };
  cotejo: string[];
}
