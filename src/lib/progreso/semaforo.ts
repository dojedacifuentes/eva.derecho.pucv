'use client';

import { useSyncExternalStore } from 'react';
import type { Semaforo } from '@/content/evaluaciones/tipos';

/**
 * Lo que el estudiante marcó en el semáforo de la presentación («c1», «c2»: las dos correcciones de la IA).
 * Se guarda en el navegador y viaja con la evaluación (cuenta para la insignia «Ojo clínico»).
 */
type Marcas = Record<string, Semaforo>;
const clave = (leccion: string) => `eva-derecho:semaforo:${leccion}:v1`;
const cache = new Map<string, Marcas>();
const oyentes = new Set<() => void>();
const VACIO: Marcas = {};

function leer(leccion: string): Marcas {
  if (cache.has(leccion)) return cache.get(leccion)!;
  let m: Marcas = {};
  try {
    m = JSON.parse(localStorage.getItem(clave(leccion)) ?? '{}') ?? {};
  } catch {
    m = {};
  }
  cache.set(leccion, m);
  return m;
}

export function marcarSemaforo(leccion: string, correccion: string, valor: Semaforo) {
  const m = { ...leer(leccion), [correccion]: valor };
  cache.set(leccion, m);
  try {
    localStorage.setItem(clave(leccion), JSON.stringify(m));
  } catch {
    // sin almacenamiento: queda en memoria
  }
  oyentes.forEach((fn) => fn());
}

export function useSemaforo(leccion: string) {
  return useSyncExternalStore(
    (fn) => {
      oyentes.add(fn);
      return () => oyentes.delete(fn);
    },
    () => leer(leccion),
    () => VACIO,
  );
}
