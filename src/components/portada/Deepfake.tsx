'use client';

import { useRef } from 'react';

/**
 * «¿Y si esta EVA fuera un deepfake?» El retrato de EVA detrás de un vidrio esmerilado estriado; una franja nítida
 * sigue al puntero (o al dedo) y deja ver la verdad por partes. Sin puntero, la franja se queda en los ojos.
 */
export function Deepfake() {
  const caja = useRef<HTMLDivElement>(null);

  const mover = (e: React.PointerEvent) => {
    const r = caja.current!.getBoundingClientRect();
    const y = Math.min(0.9, Math.max(0.1, (e.clientY - r.top) / r.height));
    caja.current!.style.setProperty('--franja', `${y * 100}%`);
  };

  return (
    <div ref={caja} className="deepfake" onPointerMove={mover} aria-hidden="true">
      <div className="deepfake__foto deepfake__foto--niebla" />
      <div className="deepfake__estrias" />
      <div className="deepfake__foto deepfake__foto--nitida" />
      <div className="deepfake__marco" />
      <span className="deepfake__texto deepfake__texto--a mono">LA NITIDEZ</span>
      <span className="deepfake__texto deepfake__texto--b mono">NO ES PRUEBA</span>
    </div>
  );
}
