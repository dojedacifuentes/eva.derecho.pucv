'use client';

import { useAvance } from './usarAvance';

/**
 * Punto de partida: la pregunta de calibración (se retoma al cierre) y el encargo que atraviesa el curso.
 * Si ya respondió (en la portada, para la 1.1), aparece marcada.
 */
export function PuntoDePartida({ leccionId, pregunta, encargo }: { leccionId: string; pregunta: string; encargo: string }) {
  const { avance, marcar } = useAvance(leccionId);
  const valor = avance.calibracionInicial;
  return (
    <div className="partida">
      <div className="partida__pregunta">
        <p className="partida__enunciado" id={`calibracion-${leccionId}`}>
          {pregunta}
        </p>
        <div className="escala" role="group" aria-labelledby={`calibracion-${leccionId}`}>
          <span className="escala__extremo mono">nada</span>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" className="escala__punto" aria-pressed={valor === n} onClick={() => marcar('entrada', n)} disabled={valor !== null && valor !== n}>
              {n}
            </button>
          ))}
          <span className="escala__extremo mono">total</span>
        </div>
        <p className="partida__nota mono" aria-live="polite">
          {valor ? `Anotado: ${valor} de 5. Lo retomamos al final.` : 'Tu primera respuesta queda guardada; no se puede cambiar después.'}
        </p>
      </div>
      <div className="partida__encargo">
        <p className="rotulo">El encargo de este curso</p>
        <p>{encargo}</p>
      </div>
    </div>
  );
}
