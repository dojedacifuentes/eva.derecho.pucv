'use client';

import { actualizarAvanceLocal, useAvanceLocal } from '@/lib/progreso/local';
import { avanceVacio, marcarPaso, registrarEvaluacion, type AvanceLeccion, type Paso } from '@/lib/progreso/modelo';

/**
 * Avance de una lección para los componentes. En este prototipo se guarda en el navegador (modo demostración o sin
 * sesión); con cuenta, la evaluación además se guarda en la base desde la Server Action.
 */
export function useAvance(leccionId: string) {
  const guardado = useAvanceLocal();
  const avance: AvanceLeccion = guardado.lecciones[leccionId] ?? avanceVacio(leccionId);
  return {
    avance,
    hecho: (p: Paso) => avance.pasos.includes(p),
    marcar: (p: Exclude<Paso, 'evaluacion'>, calibracion?: number) =>
      actualizarAvanceLocal(leccionId, (a) => marcarPaso(a, p, calibracion)),
    evaluar: (r: { correctas: number; total: number; dominio: boolean }, ojoClinico: boolean) =>
      actualizarAvanceLocal(leccionId, (a) => registrarEvaluacion(a, r, ojoClinico)),
  };
}
