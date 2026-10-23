'use client';

import type { Paso } from '@/lib/progreso/modelo';
import { useAvance } from './usarAvance';

/** Botón para marcar un paso que no tiene otra forma de comprobarse (la lectura). */
export function MarcarPaso({ leccionId, paso, texto, hechoTexto }: { leccionId: string; paso: Exclude<Paso, 'evaluacion' | 'entrada'>; texto: string; hechoTexto: string }) {
  const { hecho, marcar } = useAvance(leccionId);
  const listo = hecho(paso);
  return (
    <button type="button" className={`boton ${listo ? '' : 'boton--primario'}`} onClick={() => marcar(paso)} aria-pressed={listo}>
      {listo ? `✓ ${hechoTexto}` : texto}
    </button>
  );
}
