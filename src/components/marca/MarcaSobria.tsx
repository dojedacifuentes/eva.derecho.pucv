import { COSTURA, FORMAS, POSES, SEGMENTOS } from '@/lib/marca-eva';
import { LEON } from './escudo-leon';
import { ESCUDO } from './escudo-geometria';

/*
 * Derecho PUCV × EVA, versión sobria (23-10-2026, pedida por el propietario para la barra superior): quieta y en un
 * solo color (`currentColor`). El escudo va en silueta con el león, las cruces y el borde del escudete calados; la
 * marca de EVA, en su forma de nombre (ƎVΛ). Misma geometría que las versiones animadas: no se redibuja nada.
 * La versión con luz y movimiento (MarcaConjunta) queda para /marca.
 */

function Cruz({ x, y }: { x: number; y: number }) {
  const a = 9;
  const l = 34;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-a} y={-l} width={a * 2} height={l * 2} />
      <rect x={-l} y={-a} width={l * 2} height={a * 2} />
    </g>
  );
}

export function EscudoSilueta({ id }: { id: string }) {
  return (
    <svg className="sobria__escudo" viewBox="0 0 830 1090" aria-hidden="true" focusable="false">
      <defs>
        <mask id={`${id}-calado`} maskUnits="userSpaceOnUse" x="0" y="0" width="830" height="1090">
          <path d={ESCUDO.exterior} fill="#fff" />
          <path d={ESCUDO.escudete} fill="none" stroke="#000" strokeWidth="26" />
          <path d={LEON} fill="#000" />
          <g fill="#000">
            <Cruz x={270} y={212} />
            <Cruz x={415} y={212} />
            <Cruz x={560} y={212} />
          </g>
        </mask>
      </defs>
      <rect width="830" height="1090" fill="currentColor" mask={`url(#${id}-calado)`} />
    </svg>
  );
}

const puntos = (forma: readonly (readonly [number, number])[]) => forma.map(([x, y]) => `${x},${y}`).join(' ');

export function NombreEva() {
  const lugar = POSES.logotype;
  return (
    <svg className="sobria__eva" viewBox="-17 -5 34 10" aria-hidden="true" focusable="false">
      <g fill="currentColor" stroke="currentColor" strokeWidth={COSTURA}>
        {SEGMENTOS.map((s) => (
          <g key={s} transform={`translate(${lugar[s].x} ${lugar[s].y}) rotate(${lugar[s].angulo})`} opacity={lugar[s].alfa}>
            <polygon points={puntos(FORMAS[s])} />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function MarcaSobria() {
  return (
    <span className="sobria" role="img" aria-label="Derecho PUCV, Pontificia Universidad Católica de Valparaíso, y EVA">
      <EscudoSilueta id="sobria" />
      <span className="sobria__nombre" aria-hidden="true">
        Derecho <span>PUCV</span>
      </span>
      <span className="sobria__linea" aria-hidden="true" />
      <NombreEva />
    </span>
  );
}
