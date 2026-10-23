import { LEON } from './escudo-leon';
import { ESCUDO } from './escudo-geometria';

/*
 * El escudo de Derecho PUCV en LÍNEA DE LUZ, con el mismo lenguaje que la marca de EVA: trazo fino casi blanco y
 * halo de azul eléctrico a violeta (de izquierda a derecha). La geometría es la del vector reconstruido del archivo
 * oficial (escudo-geometria.ts): no se deforma nada, sólo cambia el tratamiento. El león va en oro pálido, como
 * guiño a la versión institucional.
 *
 * Cada trazo lleva pathLength=1 para dibujarse con stroke-dashoffset (ver marca.css).
 * Uso: versión principal de la marca conjunta. La versión a color (EscudoDerecho) queda para usos oficiales.
 * Pendiente: aprobación de la Facultad para este tratamiento.
 */

const VISTA = '-20 -20 870 1130';

function Cruz({ x, y }: { x: number; y: number }) {
  // Contorno de la cruz con remates del jefe, centrado en (x, y).
  const a = 9;
  const l = 34;
  const r = 13;
  const e = 6;
  const d = [
    `M${-a} ${-l + e}`,
    `H${-r} V${-l - e} H${r} V${-l + e} H${a} V${-a}`,
    `H${l - e} V${-r} H${l + e} V${r} H${l - e} V${a}`,
    `H${a} V${l - e} H${r} V${l + e} H${-r} V${l - e} H${-a} V${a}`,
    `H${-l + e} V${r} H${-l - e} V${-r} H${-l + e} V${-a}`,
    `H${-a} Z`,
  ].join(' ');
  return <path d={d} transform={`translate(${x} ${y})`} pathLength={1} />;
}

const SERIF = "'Times New Roman', Times, 'Liberation Serif', 'Noto Serif', serif";

export function EscudoLinea({ id }: { id: string }) {
  const trazos = (
    <>
      <g className="ln ln--a">
        <path d={ESCUDO.exterior} pathLength={1} />
        <path d={ESCUDO.campo} pathLength={1} />
      </g>
      <g className="ln ln--b">
        <path d={ESCUDO.escudete} pathLength={1} />
        <path d={ESCUDO.campoInterior} pathLength={1} />
      </g>
      <g className="ln ln--c">
        <Cruz x={270} y={212} />
        <Cruz x={415} y={212} />
        <Cruz x={560} y={212} />
      </g>
    </>
  );

  return (
    <svg className="escudo-linea" viewBox={VISTA} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-halo`} gradientUnits="userSpaceOnUse" x1="0" x2="830" y1="0" y2="0">
          <stop offset="0" stopColor="#2a8cff" />
          <stop offset="0.5" stopColor="#5a60ff" />
          <stop offset="1" stopColor="#a24dff" />
        </linearGradient>
        <linearGradient id={`${id}-nucleo`} gradientUnits="userSpaceOnUse" x1="0" x2="830" y1="0" y2="0">
          <stop offset="0" stopColor="#dcf2ff" />
          <stop offset="0.5" stopColor="#f4f6ff" />
          <stop offset="1" stopColor="#f5e6ff" />
        </linearGradient>
        <filter id={`${id}-desenfoque`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" result="ancho" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="pegado" />
          <feMerge>
            <feMergeNode in="ancho" />
            <feMergeNode in="pegado" />
          </feMerge>
        </filter>
        <path id={`${id}-izq`} d={ESCUDO.izquierda} />
        <path id={`${id}-der`} d={ESCUDO.derecha} />
      </defs>

      {/* Halo: los mismos trazos, gruesos y desenfocados, de azul a violeta. */}
      <g className="escudo-linea__halo" fill="none" stroke={`url(#${id}-halo)`} strokeWidth="14" filter={`url(#${id}-desenfoque)`}>
        {trazos}
        <path className="ln ln--leon" d={LEON} pathLength={1} />
      </g>

      {/* Núcleo: trazo fino casi blanco. */}
      <g className="escudo-linea__nucleo" fill="none" stroke={`url(#${id}-nucleo)`} strokeWidth="5" strokeLinejoin="round">
        {trazos}
      </g>
      <path className="ln ln--leon escudo-linea__leon" d={LEON} pathLength={1} fill="none" stroke="#f3dfae" strokeWidth="5" strokeLinejoin="round" />

      <g className="escudo-linea__lema" fill={`url(#${id}-nucleo)`} fontFamily={SERIF}>
        <text x="415" y="128" fontSize="84" textAnchor="middle" letterSpacing="20">
          SS.CC
        </text>
        <text fontSize="86">
          <textPath href={`#${id}-izq`} textLength="700" lengthAdjust="spacing">
            PRO JURE
          </textPath>
        </text>
        <text fontSize="86">
          <textPath href={`#${id}-der`} textLength="770" lengthAdjust="spacing">
            AEQUITATE
          </textPath>
        </text>
        <text x="415" y="1038" fontSize="84" textAnchor="middle" letterSpacing="6">
          ET
        </text>
      </g>
    </svg>
  );
}
