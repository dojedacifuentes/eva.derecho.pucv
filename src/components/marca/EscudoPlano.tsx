import { LEON } from './escudo-leon';
import { ESCUDO } from './escudo-geometria';

/*
 * El escudo de Derecho PUCV como dibujo técnico (portada «Plano», 23-10-2026): sólo trazos de la geometría
 * reconstruida del archivo oficial, en la tinta del tema. Es la única animación del sitio: al cargar, los trazos se
 * dibujan una vez, de fuera hacia dentro (con «reducir movimiento», aparece ya dibujado).
 */

function Cruz({ x }: { x: number }) {
  const a = 9;
  const l = 34;
  const y = 212;
  return (
    <path
      d={`M${x - a} ${y - l}h${a * 2}v${l - a}h${l - a}v${a * 2}h${-(l - a)}v${l - a}h${-a * 2}v${-(l - a)}h${-(l - a)}v${-a * 2}h${l - a}z`}
      pathLength={1}
    />
  );
}

export function EscudoPlano({ className = '' }: { className?: string }) {
  return (
    <svg className={`plano-escudo ${className}`} viewBox="-12 -12 854 1114" aria-hidden="true" focusable="false">
      <g className="plano-escudo__trazo plano-escudo__trazo--1">
        <path d={ESCUDO.exterior} pathLength={1} />
        <path d={ESCUDO.campo} pathLength={1} />
      </g>
      <g className="plano-escudo__trazo plano-escudo__trazo--2">
        <path d={ESCUDO.escudete} pathLength={1} />
        <path d={ESCUDO.campoInterior} pathLength={1} />
      </g>
      <g className="plano-escudo__trazo plano-escudo__trazo--3">
        <Cruz x={270} />
        <Cruz x={415} />
        <Cruz x={560} />
        <path d={LEON} pathLength={1} />
      </g>
      {/* Ejes de simetría, como en un plano. */}
      <g className="plano-escudo__ejes">
        <line x1="415" y1="-12" x2="415" y2="1102" />
        <line x1="-12" y1="560" x2="842" y2="560" />
      </g>
    </svg>
  );
}
