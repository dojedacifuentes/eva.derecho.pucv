/**
 * Reglas del avance de una lección. Las mismas que `privado.recalcular` y las funciones SQL (una prueba lo
 * comprueba con PGlite): una lección queda completada con los pasos de entrada, presentación, lectura y
 * práctica hechos, y el dominio de la evaluación.
 */

export const PASOS = ['entrada', 'presentacion', 'lectura', 'practica', 'evaluacion'] as const;
export type Paso = (typeof PASOS)[number];
export const PASOS_REQUERIDOS: readonly Paso[] = ['entrada', 'presentacion', 'lectura', 'practica'];

export interface AvanceLeccion {
  leccionId: string;
  pasos: Paso[];
  dominio: boolean;
  completada: boolean;
  calibracionInicial: number | null;
  /** Mejor resultado y último resultado, para mostrar sin consultar los intentos. */
  mejor?: { correctas: number; total: number };
  ojoClinico?: boolean;
  actualizado: string;
}

export function avanceVacio(leccionId: string): AvanceLeccion {
  return {
    leccionId,
    pasos: [],
    dominio: false,
    completada: false,
    calibracionInicial: null,
    actualizado: new Date(0).toISOString(),
  };
}

function recalcular(a: AvanceLeccion): AvanceLeccion {
  return {
    ...a,
    completada: a.dominio && PASOS_REQUERIDOS.every((p) => a.pasos.includes(p)),
    actualizado: new Date().toISOString(),
  };
}

export function marcarPaso(a: AvanceLeccion, paso: Exclude<Paso, 'evaluacion'>, calibracion?: number): AvanceLeccion {
  const pasos = a.pasos.includes(paso) ? a.pasos : [...a.pasos, paso];
  const calibracionInicial =
    a.calibracionInicial ?? (paso === 'entrada' && calibracion && calibracion >= 1 && calibracion <= 5 ? calibracion : null);
  return recalcular({ ...a, pasos, calibracionInicial });
}

export function registrarEvaluacion(
  a: AvanceLeccion,
  r: { correctas: number; total: number; dominio: boolean },
  ojoClinico = false,
): AvanceLeccion {
  const pasos: Paso[] = a.pasos.includes('evaluacion') ? a.pasos : [...a.pasos, 'evaluacion'];
  const mejor = !a.mejor || r.correctas > a.mejor.correctas ? { correctas: r.correctas, total: r.total } : a.mejor;
  return recalcular({
    ...a,
    pasos,
    dominio: a.dominio || r.dominio,
    mejor,
    ojoClinico: a.ojoClinico || ojoClinico,
  });
}

/** Porcentaje de la lección: los cinco pasos valen lo mismo. */
export function porcentaje(a: AvanceLeccion) {
  return Math.round((a.pasos.length / PASOS.length) * 100);
}

export function estadoTexto(a: AvanceLeccion) {
  if (a.completada) return 'Completada';
  if (a.pasos.length === 0) return 'Sin empezar';
  return 'En curso';
}
