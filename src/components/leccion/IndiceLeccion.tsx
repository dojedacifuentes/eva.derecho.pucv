'use client';

import { porcentaje, type Paso } from '@/lib/progreso/modelo';
import { useAvance } from './usarAvance';

export const SECCIONES: { id: string; titulo: string; paso?: Paso }[] = [
  { id: 'partida', titulo: 'Punto de partida', paso: 'entrada' },
  { id: 'presentacion', titulo: 'EVA presenta', paso: 'presentacion' },
  { id: 'lectura', titulo: 'Lectura', paso: 'lectura' },
  { id: 'practica', titulo: 'Práctica guiada', paso: 'practica' },
  { id: 'evaluacion', titulo: 'Evaluación', paso: 'evaluacion' },
  { id: 'fuentes', titulo: 'Recursos y fuentes' },
  { id: 'cierre', titulo: 'Cierre' },
];

/** Índice fijo de la lección con el estado de cada paso (en el teléfono, una barra con el porcentaje). */
export function IndiceLeccion({ leccionId }: { leccionId: string }) {
  const { avance, hecho } = useAvance(leccionId);
  const pct = porcentaje(avance);
  return (
    <nav className="indice-leccion" aria-label="Pasos de la lección">
      <div className="indice-leccion__barra" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Avance de la lección">
        <span style={{ width: `${pct}%` }} />
      </div>
      <p className="indice-leccion__estado mono">
        {avance.completada ? 'Completada' : `${pct} % · ${avance.dominio ? 'con dominio' : 'sin dominio aún'}`}
      </p>
      <ol>
        {SECCIONES.map((s, i) => (
          <li key={s.id} data-hecho={s.paso && hecho(s.paso) ? 'si' : undefined}>
            <a href={`#${s.id}`}>
              <span className="indice-leccion__marca mono" aria-hidden="true">
                {s.paso && hecho(s.paso) ? '✓' : String(i + 1).padStart(2, '0')}
              </span>
              {s.titulo}
              {s.paso && hecho(s.paso) && <span className="sr-only"> (hecho)</span>}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
