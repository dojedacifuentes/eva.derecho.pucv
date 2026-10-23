import { LEON } from './escudo-leon';
import { ESCUDO } from './escudo-geometria';

/*
 * Escudo de Derecho PUCV reconstruido en vector (nítido a cualquier tamaño), en capas para la animación:
 *
 *   plano     el escudo dibujado en líneas finas, como un plano técnico (contornos y silueta del león)
 *   relleno   el escudo a color: borde dorado, campo rojo, escudete con tres cruces
 *   leon      el león rampante (calcado del PNG oficial: provisorio hasta tener el vector de la Facultad)
 *   lema      SS.CC · PRO JURE · ET · AEQUITATE
 *   haz       la línea de escaneo que materializa el relleno
 *
 * Geometría y textos tomados del logo oficial publicado en derecho.pucv.cl. Pendiente: validar con el manual de
 * marca de la Facultad.
 */

export const COLOR_ROJO = '#a8372a';
export const COLOR_ORO = '#b59a62';

const VISTA = '0 0 830 1090';
const EXTERIOR = ESCUDO.exterior;
const CAMPO = ESCUDO.campo;
const ESCUDETE = ESCUDO.escudete;
const CAMPO_INTERIOR = ESCUDO.campoInterior;
const IZQUIERDA = ESCUDO.izquierda;
const DERECHA = ESCUDO.derecha;

function Cruz({ x, y }: { x: number; y: number }) {
  // Cruz con remates, como las tres del jefe del escudo, centrada en (x, y).
  const a = 9;
  const l = 34;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-a} y={-l} width={a * 2} height={l * 2} />
      <rect x={-l} y={-a} width={l * 2} height={a * 2} />
      <rect x={-13} y={-l - 6} width={26} height={12} />
      <rect x={-13} y={l - 6} width={26} height={12} />
      <rect x={-l - 6} y={-13} width={12} height={26} />
      <rect x={l - 6} y={-13} width={12} height={26} />
    </g>
  );
}

const SERIF = "'Times New Roman', Times, 'Liberation Serif', 'Noto Serif', serif";

export function EscudoDerecho({ id }: { id: string }) {
  return (
    <div className="escudo3d__capas" aria-hidden="true">
      <svg className="escudo3d__capa escudo3d__capa--plano" viewBox={VISTA}>
        <g fill="none" strokeWidth="3" vectorEffect="non-scaling-stroke">
          <path className="plano__linea" d={EXTERIOR} pathLength={1} />
          <path className="plano__linea plano__linea--b" d={CAMPO} pathLength={1} />
          <path className="plano__linea plano__linea--c" d={ESCUDETE} pathLength={1} />
          <path className="plano__linea plano__linea--d" d={CAMPO_INTERIOR} pathLength={1} />
          <path className="plano__linea plano__linea--leon" d={LEON} pathLength={1} />
        </g>
      </svg>
      <svg className="escudo3d__capa escudo3d__capa--relleno" viewBox={VISTA}>
        <path d={EXTERIOR} fill={COLOR_ORO} />
        <path d={CAMPO} fill={COLOR_ROJO} />
        <path d={ESCUDETE} fill={COLOR_ORO} />
        <path d={CAMPO_INTERIOR} fill={COLOR_ROJO} />
        <g fill={COLOR_ROJO}>
          <Cruz x={270} y={212} />
          <Cruz x={415} y={212} />
          <Cruz x={560} y={212} />
        </g>
      </svg>
      <svg className="escudo3d__capa escudo3d__capa--leon" viewBox={VISTA}>
        <path className="escudo3d__leon" d={LEON} fill={COLOR_ORO} />
      </svg>
      <svg className="escudo3d__capa escudo3d__capa--lema" viewBox={VISTA}>
        <defs>
          <path id={`${id}-izq`} d={IZQUIERDA} />
          <path id={`${id}-der`} d={DERECHA} />
        </defs>
        <g fill="#fff" fontFamily={SERIF}>
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
      <span className="escudo3d__haz" />
    </div>
  );
}
