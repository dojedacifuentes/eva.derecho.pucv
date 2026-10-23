/**
 * Datos FICTICIOS para mostrar el panel docente en modo demostración. Son los mismos de `supabase/seed.sql`:
 * nombres inventados, correos @example.com. Nunca datos de personas reales.
 */
export interface FilaPanel {
  estudiante: string;
  pasos: number;
  dominio: boolean;
  completada: boolean;
  calibracion: number | null;
  correctas: number | null;
  segurosErrados: number | null;
  bitacoraCompartida: boolean;
}

export interface SeccionPanel {
  nombre: string;
  periodo: string;
  filas: FilaPanel[];
}

export const SECCION_DEMO: SeccionPanel = {
  nombre: 'Introducción al Derecho · Sección demo A',
  periodo: '2027-1',
  filas: [
    { estudiante: 'Estudiante Uno (ficticio)', pasos: 5, dominio: true, completada: true, calibracion: 4, correctas: 5, segurosErrados: 0, bitacoraCompartida: true },
    { estudiante: 'Estudiante Dos (ficticio)', pasos: 3, dominio: false, completada: false, calibracion: 5, correctas: null, segurosErrados: null, bitacoraCompartida: false },
    { estudiante: 'Estudiante Tres (ficticio)', pasos: 5, dominio: false, completada: false, calibracion: 2, correctas: 2, segurosErrados: 2, bitacoraCompartida: false },
  ],
};
