/**
 * La marca de EVA —el símbolo □X y el nombre ƎVΛ—: ocho piezas rígidas que sólo se trasladan y giran.
 *
 * GENERADO por `node scripts/marca.mjs` desde eva.proyecto01/src/lib/brand.ts: no se edita a mano.
 * Unidades de la marca: el lado del cuadrado mide 10.
 */

export const SEGMENTOS = ["q1","q2","q3","q4","x1","x2","x3","x4"] as const;
export type Segmento = (typeof SEGMENTOS)[number];
export type PoseMarca = 'isotype' | 'detach' | 'unlock' | 'split' | 'logotype';
export interface Lugar {
  x: number;
  y: number;
  angulo: number;
  alfa: number;
}

export const GROSOR = 0.75;
export const COSTURA = 0.05;
export const COLORES = {"halo":["#2a8cff","#5a60ff","#a24dff"],"trazo":["#dcf2ff","#f4f6ff","#f5e6ff"]} as const;

/** Cada pieza en su forma de base, centrada en su propio origen. */
export const FORMAS: Record<Segmento, readonly (readonly [number, number])[]> = {"q1":[[-5,-0.375],[5,-0.375],[5,0.375],[-5,0.375]],"q2":[[-5,-0.375],[5,-0.375],[5,0.375],[-5,0.375]],"q3":[[-5,-0.375],[5,-0.375],[5,0.375],[-5,0.375]],"q4":[[-5,-0.375],[5,-0.375],[5,0.375],[-5,0.375]],"x1":[[-4.8,-5.4],[-3.84,-5.4],[0,-0.6],[0,0.6]],"x2":[[4.8,-5.4],[3.84,-5.4],[0,-0.6],[0,0.6]],"x3":[[-4.8,5.4],[-3.84,5.4],[0,0.6],[0,-0.6]],"x4":[[4.8,5.4],[3.84,5.4],[0,0.6],[0,-0.6]]};

/** Dónde está cada pieza en cada pose. */
export const POSES: Record<PoseMarca, Record<Segmento, Lugar>> = {"isotype":{"q1":{"x":0,"y":-11.375,"angulo":0,"alfa":1},"q2":{"x":4.625,"y":-6.75,"angulo":90,"alfa":1},"q3":{"x":0,"y":-2.125,"angulo":0,"alfa":1},"q4":{"x":-4.625,"y":-6.75,"angulo":90,"alfa":1},"x1":{"x":0,"y":6.35,"angulo":0,"alfa":1},"x2":{"x":0,"y":6.35,"angulo":0,"alfa":1},"x3":{"x":0,"y":6.35,"angulo":0,"alfa":1},"x4":{"x":0,"y":6.35,"angulo":0,"alfa":1}},"detach":{"q1":{"x":0,"y":-11.925,"angulo":0,"alfa":1},"q2":{"x":5.725,"y":-6.2,"angulo":90,"alfa":1},"q3":{"x":0,"y":-0.475,"angulo":0,"alfa":1},"q4":{"x":-5.725,"y":-6.2,"angulo":90,"alfa":1},"x1":{"x":0,"y":6.9,"angulo":0,"alfa":1},"x2":{"x":0,"y":6.9,"angulo":0,"alfa":1},"x3":{"x":0,"y":6.9,"angulo":0,"alfa":1},"x4":{"x":0,"y":6.9,"angulo":0,"alfa":1}},"unlock":{"q1":{"x":0,"y":-10.375,"angulo":0,"alfa":1},"q2":{"x":9,"y":-7.75,"angulo":90,"alfa":0},"q3":{"x":0,"y":-5.125,"angulo":0,"alfa":1},"q4":{"x":0,"y":-7.75,"angulo":0,"alfa":1},"x1":{"x":0,"y":5.35,"angulo":0,"alfa":1},"x2":{"x":0,"y":5.35,"angulo":0,"alfa":1},"x3":{"x":0,"y":5.35,"angulo":0,"alfa":1},"x4":{"x":0,"y":5.35,"angulo":0,"alfa":1}},"split":{"q1":{"x":0,"y":-11.125,"angulo":0,"alfa":1},"q2":{"x":9,"y":-8.5,"angulo":90,"alfa":0},"q3":{"x":0,"y":-5.875,"angulo":0,"alfa":1},"q4":{"x":0,"y":-8.5,"angulo":0,"alfa":1},"x1":{"x":0,"y":3.7,"angulo":0,"alfa":1},"x2":{"x":0,"y":3.7,"angulo":0,"alfa":1},"x3":{"x":0,"y":6.1,"angulo":0,"alfa":1},"x4":{"x":0,"y":6.1,"angulo":0,"alfa":1}},"logotype":{"q1":{"x":-10.825,"y":-2.625,"angulo":0,"alfa":1},"q2":{"x":19.825,"y":0,"angulo":90,"alfa":0},"q3":{"x":-10.825,"y":2.625,"angulo":0,"alfa":1},"q4":{"x":-10.825,"y":0,"angulo":0,"alfa":1},"x1":{"x":1.075,"y":2.4,"angulo":0,"alfa":1},"x2":{"x":1.075,"y":2.4,"angulo":0,"alfa":1},"x3":{"x":11.025,"y":-2.4,"angulo":0,"alfa":1},"x4":{"x":11.025,"y":-2.4,"angulo":0,"alfa":1}}};
