/**
 * La transformación de la marca escrita como CSS: el servidor calcula los @keyframes a partir de las poses y el
 * navegador sólo interpola traslaciones y giros (lo mueve el compositor, sin JavaScript por fotograma).
 *
 * Mismo método que el símbolo de /links en eva.proyecto01: dos ejes separados para que la alineación vaya en L
 * (al formar el nombre, primero en horizontal y luego cada letra sube o baja a su fila; al volver, al revés).
 */
import { POSES, SEGMENTOS, type PoseMarca, type Segmento } from './marca-eva';

export interface Tramo {
  pose: PoseMarca;
  /** Lo que tarda en llegar a esta pose desde la anterior (ms). */
  mueve: number;
  /** Lo que se queda quieta al llegar (ms). */
  queda: number;
  ejes?: 'x-primero' | 'y-primero';
}

/**
 * □X → ≡X → ƎVΛ → □X sobre una grilla de pulsos: 120 por minuto (un pulso = 500 ms), ciclo de 8 s = 16 pulsos.
 * Cada pose llega en un cuarto o medio pulso exacto: el nombre se forma en el pulso 8 (3,5 s) y se sostiene hasta el
 * 13 (6 s). Empieza y termina en el símbolo, así que en bucle no salta. La marca conjunta (marca.css) usa este reloj.
 */
export const PULSO = 500;
export const RECORRIDO: readonly Tramo[] = [
  { pose: 'isotype', mueve: 0, queda: 4 * PULSO },
  { pose: 'detach', mueve: PULSO / 2, queda: 0 },
  { pose: 'unlock', mueve: PULSO / 2, queda: 0 },
  { pose: 'split', mueve: PULSO / 2, queda: 0 },
  { pose: 'logotype', mueve: (3 * PULSO) / 2, queda: 5 * PULSO, ejes: 'x-primero' },
  { pose: 'split', mueve: PULSO, queda: 0, ejes: 'y-primero' },
  { pose: 'unlock', mueve: PULSO / 2, queda: 0 },
  { pose: 'detach', mueve: PULSO / 2, queda: 0 },
  { pose: 'isotype', mueve: PULSO, queda: PULSO },
];
/** Cuándo EVA termina de formar su nombre dentro del ciclo (ms): el «momento» de la marca conjunta. */
export const MOMENTO_NOMBRE = 7 * PULSO;

/** Curva de la ficha de la marca: entrada y salida suaves, sin rebote. */
export const CURVA = 'cubic-bezier(0.65, 0, 0.35, 1)';
const SOLAPE = 0.3;
const TRAMO_EJE = (1 + SOLAPE) / 2;

type Eje = 'x' | 'y';

export function duracion(tramos: readonly Tramo[] = RECORRIDO) {
  return tramos.reduce((total, t) => total + t.mueve + t.queda, 0);
}

function ventana(t: Tramo, inicio: number, eje: Eje): [number, number] {
  const fin = inicio + t.mueve;
  const primero: [number, number] = [inicio, inicio + t.mueve * TRAMO_EJE];
  const segundo: [number, number] = [fin - t.mueve * TRAMO_EJE, fin];
  if (t.ejes === 'x-primero') return eje === 'x' ? primero : segundo;
  if (t.ejes === 'y-primero') return eje === 'y' ? primero : segundo;
  return [inicio, fin];
}

/** Calendario de un eje: en qué milisegundo está en qué pose. */
export function paradas(eje: Eje, tramos: readonly Tramo[] = RECORRIDO) {
  const lista: { t: number; paso: number }[] = [{ t: 0, paso: 0 }];
  let reloj = 0;
  tramos.forEach((tramo, i) => {
    if (i > 0 && tramo.mueve > 0) {
      const [desde, hasta] = ventana(tramo, reloj, eje);
      lista.push({ t: desde, paso: i - 1 }, { t: hasta, paso: i });
    }
    reloj += tramo.mueve + tramo.queda;
  });
  lista.push({ t: reloj, paso: tramos.length - 1 });
  return lista.filter((p, k) => k === 0 || p.t > lista[k - 1].t);
}

const r = (n: number) => Math.round(n * 1000) / 1000;

function fotogramas(tramos: readonly Tramo[]) {
  const total = duracion(tramos);
  const cuadro = (eje: Eje, nombre: string, cuerpo: (k: number) => string) =>
    `@keyframes ${nombre}{${paradas(eje, tramos)
      .map(({ t, paso }) => `${r((t / total) * 100)}%{${cuerpo(paso)};animation-timing-function:${CURVA}}`)
      .join('')}}`;
  return (
    cuadro('x', 'marca-x', (k) => `transform:translateX(var(--x${k}))`) +
    cuadro('y', 'marca-y', (k) => `transform:translateY(var(--y${k})) rotate(var(--a${k}));opacity:var(--o${k})`)
  );
}

function variables(id: Segmento, tramos: readonly Tramo[]) {
  return tramos
    .map((t, k) => {
      const l = POSES[t.pose][id];
      return `--x${k}:${r(l.x)}px;--y${k}:${r(l.y)}px;--a${k}:${r(l.angulo)}deg;--o${k}:${r(l.alfa)}`;
    })
    .join(';');
}

/** Toda la hoja: fotogramas comunes y las variables de cada pieza. Es la misma para todas las marcas de la página. */
export function hojaMarca(tramos: readonly Tramo[] = RECORRIDO) {
  const piezas = SEGMENTOS.map((id) => `.marca .m-${id}{${variables(id, tramos)}}`).join('');
  return `.marca{--marca-ms:${duracion(tramos)}ms}` + fotogramas(tramos) + piezas;
}
