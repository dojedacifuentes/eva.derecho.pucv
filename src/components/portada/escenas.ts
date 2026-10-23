/**
 * Las metáforas animadas de las tarjetas de curso, dibujadas en canvas 2D (sin dependencias).
 * Cada escena recibe el tiempo, el puntero (0..1, o null) y la «energía» (0 en reposo, 1 con el puntero encima).
 *
 *  prediccion · Curso 1  fragmentos de texto entran a un prisma y salen como barras de probabilidad
 *  tutor      · Curso 2  un núcleo y preguntas en órbita que el puntero atrae
 *  fuente     · Curso 3  una maraña de hilos se ordena en una sola línea que llega al documento verificado
 *  sistema    · Curso 4  caos → estela de luz → un cubo de vidrio que gira
 *  frontera   · Curso 0  partículas que llegan a una línea: las que «infieren» la cruzan y se encienden; las de reglas, no
 */

export type Escena = 'frontera' | 'prediccion' | 'tutor' | 'fuente' | 'sistema';
export interface Estado {
  t: number;
  w: number;
  h: number;
  puntero: { x: number; y: number } | null;
  energia: number;
}

const AZUL = [42, 140, 255];
const INDIGO = [90, 96, 255];
const VIOLETA = [162, 77, 255];
const BLANCO = [244, 246, 255];
const rgba = (c: number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const mezcla = (a: number[], b: number[], k: number) => a.map((v, i) => Math.round(v + (b[i] - v) * k));

/** Ruido determinista barato para que las formas sean estables entre fotogramas. */
function azar(semilla: number) {
  const x = Math.sin(semilla * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function brillo(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, c: number[], a: number) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgba(c, a));
  g.addColorStop(1, rgba(c, 0));
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

function prediccion(ctx: CanvasRenderingContext2D, s: Estado) {
  const { w, h, t } = s;
  const px = w * 0.56;
  const py = h * 0.55;
  // flujo de fragmentos hacia el prisma
  for (let i = 0; i < 46; i++) {
    const fase = (t * (0.12 + azar(i) * 0.1) + azar(i + 9)) % 1;
    const x = fase * px;
    const y = py + (azar(i + 3) - 0.5) * h * 0.55 * (1 - fase) + Math.sin(t * 2 + i) * 3;
    const c = mezcla(AZUL, INDIGO, azar(i + 1));
    ctx.fillStyle = rgba(c, 0.35 + fase * 0.6);
    const ancho = 6 + azar(i + 5) * 16;
    ctx.fillRect(x, y, ancho * (0.4 + fase * 0.6), 2);
  }
  // prisma
  const tam = h * 0.2;
  ctx.strokeStyle = rgba(BLANCO, 0.85);
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(px, py - tam);
  ctx.lineTo(px + tam * 0.9, py + tam * 0.6);
  ctx.lineTo(px - tam * 0.9, py + tam * 0.6);
  ctx.closePath();
  ctx.stroke();
  brillo(ctx, px, py, tam * 1.8, INDIGO, 0.35 + s.energia * 0.25);
  // barras de probabilidad: el puntero cambia cuál gana
  const elegida = s.puntero ? Math.min(2, Math.floor(s.puntero.x * 3)) : Math.floor(t / 2.4) % 3;
  for (let k = 0; k < 3; k++) {
    const bx = px + tam * 1.5 + k * w * 0.075;
    const objetivo = k === elegida ? 0.62 : 0.18 + 0.12 * Math.sin(t * 1.3 + k * 2);
    const alto = h * objetivo * (0.85 + 0.15 * Math.sin(t * 3 + k));
    const c = [AZUL, INDIGO, VIOLETA][k];
    ctx.fillStyle = rgba(c, k === elegida ? 0.9 : 0.4);
    ctx.fillRect(bx, h * 0.85 - alto, w * 0.045, alto);
    if (k === elegida) brillo(ctx, bx + w * 0.022, h * 0.85 - alto, w * 0.08, c, 0.5);
  }
}

function tutor(ctx: CanvasRenderingContext2D, s: Estado) {
  const { w, h, t } = s;
  let cx = w * 0.62;
  let cy = h * 0.55;
  if (s.puntero) {
    cx += (s.puntero.x * w - cx) * 0.25;
    cy += (s.puntero.y * h - cy) * 0.25;
  }
  brillo(ctx, cx, cy, h * 0.42, INDIGO, 0.45 + s.energia * 0.25);
  ctx.fillStyle = rgba(BLANCO, 0.95);
  ctx.beginPath();
  ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
  ctx.fill();
  for (let anillo = 0; anillo < 3; anillo++) {
    const r = h * (0.16 + anillo * 0.12);
    ctx.strokeStyle = rgba(BLANCO, 0.08 + anillo * 0.02);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 1.6, r, -0.35, 0, Math.PI * 2);
    ctx.stroke();
    const n = 3 + anillo * 2;
    for (let i = 0; i < n; i++) {
      const ang = t * (0.5 - anillo * 0.12) * (1 + s.energia) + (i / n) * Math.PI * 2;
      const ex = Math.cos(ang) * r * 1.6;
      const ey = Math.sin(ang) * r;
      const x = cx + ex * Math.cos(-0.35) - ey * Math.sin(-0.35);
      const y = cy + ex * Math.sin(-0.35) + ey * Math.cos(-0.35);
      const c = [AZUL, INDIGO, VIOLETA][anillo];
      brillo(ctx, x, y, 12, c, 0.7);
      ctx.fillStyle = rgba(BLANCO, 0.9);
      ctx.font = '600 11px ui-monospace, monospace';
      ctx.fillText('?', x - 3, y + 4);
    }
  }
}

function fuente(ctx: CanvasRenderingContext2D, s: Estado) {
  const { w, h, t } = s;
  const orden = 0.25 + 0.75 * s.energia; // con el puntero, la maraña se ordena
  const dx = w * 0.78;
  const dy = h * 0.55;
  for (let i = 0; i < 26; i++) {
    const c = mezcla(AZUL, VIOLETA, azar(i));
    ctx.strokeStyle = rgba(c, 0.18 + 0.4 * azar(i + 2));
    ctx.lineWidth = 1;
    ctx.beginPath();
    const y0 = h * (0.15 + azar(i + 4) * 0.75);
    ctx.moveTo(0, y0);
    const caos = (1 - orden) * h * 0.5;
    const c1x = w * (0.2 + azar(i + 6) * 0.2);
    const c1y = y0 + Math.sin(t * 0.8 + i) * caos + (azar(i + 7) - 0.5) * caos;
    const c2x = w * (0.4 + azar(i + 8) * 0.2);
    const c2y = dy + Math.cos(t * 0.7 + i * 1.3) * caos;
    ctx.bezierCurveTo(c1x, c1y, c2x, c2y, dx - w * 0.06, dy);
    ctx.stroke();
  }
  // la línea verificada
  const grad = ctx.createLinearGradient(dx - w * 0.2, 0, dx, 0);
  grad.addColorStop(0, rgba(INDIGO, 0));
  grad.addColorStop(1, rgba(BLANCO, 0.95));
  ctx.strokeStyle = grad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(dx - w * 0.2, dy);
  ctx.lineTo(dx - w * 0.06, dy);
  ctx.stroke();
  // el documento con su sello de verificado
  const dw = w * 0.12;
  const dh = dw * 1.3;
  brillo(ctx, dx, dy, dw * 1.6, INDIGO, 0.35 + s.energia * 0.3);
  ctx.fillStyle = 'rgba(244,246,255,0.08)';
  ctx.strokeStyle = rgba(BLANCO, 0.8);
  ctx.lineWidth = 1.2;
  ctx.fillRect(dx - dw * 0.4, dy - dh / 2, dw, dh);
  ctx.strokeRect(dx - dw * 0.4, dy - dh / 2, dw, dh);
  for (let k = 0; k < 4; k++) {
    ctx.fillStyle = rgba(BLANCO, 0.35);
    ctx.fillRect(dx - dw * 0.28, dy - dh * 0.32 + k * dh * 0.14, dw * (k === 3 ? 0.4 : 0.75), 1.5);
  }
  ctx.strokeStyle = rgba([91, 224, 143], 0.4 + 0.6 * orden);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(dx - dw * 0.08, dy + dh * 0.26);
  ctx.lineTo(dx + dw * 0.04, dy + dh * 0.36);
  ctx.lineTo(dx + dw * 0.3, dy + dh * 0.12);
  ctx.stroke();
}

function sistema(ctx: CanvasRenderingContext2D, s: Estado) {
  const { w, h, t } = s;
  const cx = w * 0.72;
  const cy = h * 0.56;
  // caos a la izquierda
  ctx.lineWidth = 0.8;
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = rgba(BLANCO, 0.28);
    ctx.beginPath();
    for (let k = 0; k <= 60; k++) {
      const a = k * 0.35 + i * 1.7 + t * 0.4;
      const r = h * (0.08 + 0.1 * azar(i + k * 0.1));
      const x = w * 0.2 + Math.cos(a * 1.3) * r * 1.4;
      const y = h * 0.42 + Math.sin(a) * r;
      if (k === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  // estela de luz del caos al cubo
  const grad = ctx.createLinearGradient(w * 0.25, 0, cx, 0);
  grad.addColorStop(0, rgba(VIOLETA, 0));
  grad.addColorStop(0.6, rgba(VIOLETA, 0.85));
  grad.addColorStop(1, rgba(BLANCO, 0.95));
  ctx.strokeStyle = grad;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w * 0.25, h * 0.45);
  ctx.bezierCurveTo(w * 0.4, h * 0.9 + Math.sin(t) * 8, w * 0.52, h * 0.3, cx - h * 0.12, cy);
  ctx.stroke();
  brillo(ctx, cx - h * 0.12, cy, 28, VIOLETA, 0.6);
  // cubo de vidrio que gira (proyección simple)
  const lado = h * 0.17;
  const giro = t * (0.35 + s.energia * 0.9);
  const vert = [-1, 1].flatMap((x) => [-1, 1].flatMap((y) => [-1, 1].map((z) => [x, y, z])));
  const p = vert.map(([x, y, z]) => {
    const x1 = x * Math.cos(giro) - z * Math.sin(giro);
    const z1 = x * Math.sin(giro) + z * Math.cos(giro);
    const y1 = y * Math.cos(0.5) - z1 * Math.sin(0.5);
    return [cx + x1 * lado, cy + y1 * lado];
  });
  brillo(ctx, cx, cy, lado * 2.6, INDIGO, 0.3 + s.energia * 0.3);
  ctx.strokeStyle = rgba(BLANCO, 0.9);
  ctx.lineWidth = 1.3;
  for (let a = 0; a < 8; a++) {
    for (let b = a + 1; b < 8; b++) {
      const diferencias = [0, 1, 2].filter((k) => vert[a][k] !== vert[b][k]).length;
      if (diferencias !== 1) continue;
      ctx.beginPath();
      ctx.moveTo(p[a][0], p[a][1]);
      ctx.lineTo(p[b][0], p[b][1]);
      ctx.stroke();
    }
  }
}

function frontera(ctx: CanvasRenderingContext2D, s: Estado) {
  const { w, h, t } = s;
  // la línea que separa «reglas» de «infiere»; el puntero la mueve un poco
  const fx = w * (0.52 + (s.puntero ? (s.puntero.x - 0.5) * 0.12 : 0));
  const grad = ctx.createLinearGradient(0, h * 0.1, 0, h * 0.9);
  grad.addColorStop(0, rgba(INDIGO, 0));
  grad.addColorStop(0.5, rgba(BLANCO, 0.9));
  grad.addColorStop(1, rgba(INDIGO, 0));
  ctx.strokeStyle = grad;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(fx, h * 0.1);
  ctx.lineTo(fx, h * 0.9);
  ctx.stroke();
  brillo(ctx, fx, h * 0.5, h * 0.35, INDIGO, 0.25 + s.energia * 0.25);
  // partículas: las que infieren (azar > 0.5) cruzan y se encienden; las de reglas se detienen antes de la línea
  for (let i = 0; i < 40; i++) {
    const infiere = azar(i + 21) > 0.5;
    const fase = (t * (0.09 + azar(i) * 0.08) + azar(i + 7)) % 1;
    const y = h * (0.15 + azar(i + 3) * 0.7) + Math.sin(t * 1.7 + i) * 3;
    const destino = infiere ? w * 0.98 : fx - 8 - azar(i + 11) * w * 0.12;
    const x = Math.min(fase * w * 1.1, destino);
    const cruzo = infiere && x > fx;
    const c = cruzo ? mezcla(INDIGO, VIOLETA, azar(i + 1)) : mezcla(AZUL, INDIGO, azar(i + 1));
    const alfa = cruzo ? 0.9 : infiere ? 0.5 : 0.25 + 0.15 * Math.sin(t * 2 + i);
    ctx.fillStyle = rgba(c, alfa);
    const ancho = (infiere ? 10 : 16) + azar(i + 5) * 10;
    ctx.fillRect(x - ancho, y, ancho, cruzo ? 3 : 2);
    if (cruzo && fase > 0.6) brillo(ctx, x, y + 1, 10, VIOLETA, 0.35);
  }
  // rótulos
  ctx.fillStyle = rgba(BLANCO, 0.55);
  ctx.font = `500 ${Math.max(10, h * 0.045)}px ui-monospace, monospace`;
  ctx.textAlign = 'right';
  ctx.fillText('reglas', fx - 14, h * 0.13);
  ctx.textAlign = 'left';
  ctx.fillText('infiere', fx + 14, h * 0.13);
}

export const ESCENAS: Record<Escena, (ctx: CanvasRenderingContext2D, s: Estado) => void> = {
  frontera,
  prediccion,
  tutor,
  fuente,
  sistema,
};
