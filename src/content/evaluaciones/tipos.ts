export type Confianza = 'seguro' | 'dudoso' | 'no-se';

export interface Opcion {
  id: string;
  texto: string;
}

/** Lo que llega al navegador: enunciado y opciones, nunca la respuesta. */
export interface Pregunta {
  n: number;
  tipo: 'opcion' | 'verdadero-falso';
  enunciado: string;
  opciones: Opcion[];
  /** Pistas progresivas (se muestran a pedido y quedan registradas). */
  pistas?: string[];
}

export interface Evaluacion {
  id: string;
  leccionId: string;
  titulo: string;
  umbral: number;
  preguntas: Pregunta[];
}

/** Sólo en el servidor: la respuesta correcta y la retroalimentación. */
export interface ClavePregunta {
  correcta: string;
  retro: string;
}
export type Clave = Record<number, ClavePregunta>;

export interface RespuestaPregunta {
  opcion: string;
  confianza: Confianza;
  pistas?: number;
}

export type Semaforo = 'verde' | 'amarillo' | 'rojo';

export interface EnvioEvaluacion {
  respuestas: Record<number, RespuestaPregunta>;
  /** Lo que marcó en el semáforo de la presentación, si lo hizo. */
  semaforo?: Record<string, Semaforo>;
}

export interface DetallePregunta {
  pregunta: number;
  correcta: boolean;
  opcionCorrecta: string;
  retro: string;
  confianza: Confianza | null;
}

export interface ResultadoEvaluacion {
  correctas: number;
  total: number;
  dominio: boolean;
  detalle: DetallePregunta[];
  /** Insignia «Ojo clínico»: se calcula en el servidor porque su regla revela la respuesta. */
  ojoClinico: boolean;
  guardado: 'cuenta' | 'navegador';
}

/**
 * Regla de «Ojo clínico» de una evaluación (sólo servidor): marcó en rojo `rojo` en el semáforo de la presentación,
 * no marcó en rojo ninguna de `noRojo`, y acertó `pregunta` sin pedir pistas.
 */
export interface ReglaOjoClinico {
  pregunta: number;
  rojo: string;
  noRojo: string[];
}
