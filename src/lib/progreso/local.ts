'use client';

import { useSyncExternalStore } from 'react';
import { avanceVacio, type AvanceLeccion } from './modelo';

/**
 * Avance en ESTE navegador (modo demostración o sin sesión). Clave versionada; si no hay almacenamiento
 * (ventana privada, bloqueado), funciona en memoria hasta recargar.
 */
const CLAVE = 'eva-derecho:avance:v1';
const CLAVE_ENTRADA = 'eva-derecho:entrada:v1';

export type Entrada = 'estudiante' | 'docente';

interface Guardado {
  lecciones: Record<string, AvanceLeccion>;
  entrada: Entrada | null;
}

let memoria: Guardado | null = null;
const oyentes = new Set<() => void>();
const VACIO: Guardado = { lecciones: {}, entrada: null };

function cargar(): Guardado {
  if (memoria) return memoria;
  try {
    const lecciones = JSON.parse(localStorage.getItem(CLAVE) ?? '{}');
    const entrada = localStorage.getItem(CLAVE_ENTRADA);
    memoria = {
      lecciones: lecciones && typeof lecciones === 'object' ? lecciones : {},
      entrada: entrada === 'estudiante' || entrada === 'docente' ? entrada : null,
    };
  } catch {
    memoria = { lecciones: {}, entrada: null };
  }
  return memoria;
}

function guardar(nuevo: Guardado) {
  memoria = nuevo;
  try {
    localStorage.setItem(CLAVE, JSON.stringify(nuevo.lecciones));
    if (nuevo.entrada) localStorage.setItem(CLAVE_ENTRADA, nuevo.entrada);
  } catch {
    // Sin almacenamiento: queda en memoria.
  }
  oyentes.forEach((fn) => fn());
}

function suscribir(fn: () => void) {
  oyentes.add(fn);
  const otraPestana = (e: StorageEvent) => {
    if (e.key === CLAVE || e.key === CLAVE_ENTRADA) {
      memoria = null;
      fn();
    }
  };
  window.addEventListener('storage', otraPestana);
  return () => {
    oyentes.delete(fn);
    window.removeEventListener('storage', otraPestana);
  };
}

export function useAvanceLocal() {
  return useSyncExternalStore(suscribir, cargar, () => VACIO);
}

export function avanceLocal(leccionId: string) {
  return cargar().lecciones[leccionId] ?? avanceVacio(leccionId);
}

export function actualizarAvanceLocal(leccionId: string, cambio: (a: AvanceLeccion) => AvanceLeccion) {
  const actual = cargar();
  guardar({ ...actual, lecciones: { ...actual.lecciones, [leccionId]: cambio(avanceLocal(leccionId)) } });
}

export function elegirEntrada(entrada: Entrada) {
  guardar({ ...cargar(), entrada });
}

export function borrarAvanceLocal() {
  try {
    localStorage.removeItem(CLAVE);
    localStorage.removeItem(CLAVE_ENTRADA);
  } catch {
    // nada que borrar
  }
  memoria = { lecciones: {}, entrada: null };
  oyentes.forEach((fn) => fn());
}
