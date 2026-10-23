import { useId } from 'react';
import { COLORES, COSTURA, FORMAS, POSES, SEGMENTOS, type PoseMarca } from '@/lib/marca-eva';
import { hojaMarca } from '@/lib/marca-movimiento';

/*
 * La marca de EVA viva: las ocho piezas del □X se reordenan en ƎVΛ y vuelven. Todo en CSS (ver
 * `lib/marca-movimiento.ts`); cuatro SVG apilados para que el halo y la órbita sean capas propias.
 *
 *  - animacion="bucle": la transformación se repite. Quien la usa debe ofrecer un botón de pausa
 *    (WCAG 2.2.2): ver `MarcaViva`.
 *  - animacion="entrada": una sola vez al cargar y otra al pasar el puntero o el foco.
 *  - animacion="quieta": la pose indicada, sin movimiento.
 * Con «reducir movimiento» del sistema, siempre quieta.
 */

const POR_PROPORCION = {
  compacta: { w: 36, h: 26 },
  orbita: { w: 60, h: 44 },
};
const ORBITA = 18.5;
const A_LO_ANCHO = { x1: -16, x2: 16, y1: 0, y2: 0 };

const puntos = (forma: readonly (readonly [number, number])[]) => forma.map(([x, y]) => `${x},${y}`).join(' ');

function Piezas({ pose }: { pose: PoseMarca }) {
  const lugar = POSES[pose];
  return SEGMENTOS.map((id) => (
    <g key={id} className={`m-x m-${id}`} transform={`translate(${lugar[id].x} 0)`}>
      <g className="m-y" transform={`translate(0 ${lugar[id].y}) rotate(${lugar[id].angulo})`} opacity={lugar[id].alfa}>
        <polygon points={puntos(FORMAS[id])} />
      </g>
    </g>
  ));
}

const NODOS = [
  { x: -ORBITA, y: 0, color: COLORES.halo[0] },
  { x: 0, y: -ORBITA, color: COLORES.halo[1] },
  { x: ORBITA, y: 0, color: COLORES.halo[2] },
  { x: 0, y: ORBITA, color: COLORES.halo[1] },
];

export interface MarcaProps {
  animacion?: 'bucle' | 'entrada' | 'quieta';
  /** Pose en reposo (antes de que cargue el CSS y cuando está quieta). */
  pose?: PoseMarca;
  orbita?: boolean;
  className?: string;
  pausada?: boolean;
}

export function Marca({ animacion = 'entrada', pose = 'isotype', orbita = false, className = '', pausada = false }: MarcaProps) {
  const crudo = useId();
  const id = crudo.replace(/[^a-zA-Z0-9]/g, '');
  const { w, h } = orbita ? POR_PROPORCION.orbita : POR_PROPORCION.compacta;
  const vista = `${-w / 2} ${-h / 2} ${w} ${h}`;

  return (
    <span
      className={`marca ${className}`}
      data-animacion={animacion}
      data-pausada={pausada ? 'si' : undefined}
      style={{ aspectRatio: `${w} / ${h}` }}
      aria-hidden="true"
    >
      {animacion !== 'quieta' && <style dangerouslySetInnerHTML={{ __html: hojaMarca() }} />}

      {orbita && (
        <svg className="marca__capa marca__orbita" viewBox={vista} focusable="false">
          <defs>
            <linearGradient id={`${id}-anillo`} gradientUnits="userSpaceOnUse" x1={-ORBITA} x2={ORBITA} y1="0" y2="0">
              <stop offset="0" stopColor={COLORES.halo[0]} />
              <stop offset="0.5" stopColor={COLORES.halo[1]} />
              <stop offset="1" stopColor={COLORES.halo[2]} />
            </linearGradient>
          </defs>
          <g fill="none" strokeWidth="0.1" strokeDasharray="0.2 0.8" stroke="#a9b8ff">
            <line x1={-w / 2} y1="0" x2={w / 2} y2="0" opacity="0.28" />
            <line x1="0" y1={-h / 2} x2="0" y2={h / 2} opacity="0.22" />
            <circle r={ORBITA * 0.72} opacity="0.16" />
          </g>
          <circle r={ORBITA} fill="none" stroke={`url(#${id}-anillo)`} strokeWidth="0.12" opacity="0.6" />
          {NODOS.map((n) => (
            <g key={`${n.x}${n.y}`} transform={`translate(${n.x} ${n.y})`}>
              <circle r="1.1" fill={n.color} opacity="0.22" />
              <circle r="0.42" fill={n.color} />
              <circle r="0.2" fill={COLORES.trazo[1]} />
            </g>
          ))}
          <g className="marca__deriva">
            <circle cx={ORBITA} cy="0" r="0.32" fill={COLORES.trazo[1]} />
            <circle cx={-ORBITA - 1.6} cy="0" r="0.24" fill={COLORES.halo[2]} />
          </g>
        </svg>
      )}

      <svg className="marca__capa marca__halo" viewBox={vista} focusable="false">
        <defs>
          <linearGradient id={`${id}-halo`} gradientUnits="userSpaceOnUse" {...A_LO_ANCHO}>
            <stop offset="0" stopColor={COLORES.halo[0]} />
            <stop offset="0.5" stopColor={COLORES.halo[1]} />
            <stop offset="1" stopColor={COLORES.halo[2]} />
          </linearGradient>
          <filter id={`${id}-blur`} filterUnits="userSpaceOnUse" x={-w / 2} y={-h / 2} width={w} height={h}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.1" result="ancho" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.35" result="pegado" />
            <feMerge>
              <feMergeNode in="ancho" />
              <feMergeNode in="ancho" />
              <feMergeNode in="pegado" />
            </feMerge>
          </filter>
        </defs>
        <g fill={`url(#${id}-halo)`} filter={`url(#${id}-blur)`}>
          <Piezas pose={pose} />
        </g>
      </svg>

      <svg className="marca__capa marca__trazo" viewBox={vista} focusable="false">
        <defs>
          <linearGradient id={`${id}-trazo`} gradientUnits="userSpaceOnUse" {...A_LO_ANCHO}>
            <stop offset="0" stopColor={COLORES.trazo[0]} />
            <stop offset="0.5" stopColor={COLORES.trazo[1]} />
            <stop offset="1" stopColor={COLORES.trazo[2]} />
          </linearGradient>
        </defs>
        {/* El contorno tapa la costura de los vértices. */}
        <g fill={`url(#${id}-trazo)`} stroke={`url(#${id}-trazo)`} strokeWidth={COSTURA}>
          <Piezas pose={pose} />
        </g>
      </svg>
    </span>
  );
}
