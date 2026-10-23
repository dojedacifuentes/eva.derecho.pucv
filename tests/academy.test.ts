import { describe, expect, it } from 'vitest';
import { ACADEMY, EN_ACADEMY, RECORRIDO_FILOSOFICO, todasLasRutasAcademy } from '@/content/academy';
import { TODAS_LAS_UNIDADES } from '@/content/catalogo';

describe('enlaces a EVA ACADEMY', () => {
  const ids = new Set(TODAS_LAS_UNIDADES.map(({ unidad }) => unidad.id));

  it('sólo enlaza unidades que existen en el catálogo', () => {
    for (const id of Object.keys(EN_ACADEMY)) expect(ids.has(id), id).toBe(true);
  });

  it('todas las direcciones son de EVA ACADEMY, con https y sin repetirse', () => {
    const rutas = todasLasRutasAcademy();
    expect(new Set(rutas).size).toBe(rutas.length);
    for (const r of rutas) expect(r.startsWith(`${ACADEMY}/`), r).toBe(true);
    expect(ACADEMY.startsWith('https://')).toBe(true);
  });

  it('cada entrada tiene al menos una lección o un juego', () => {
    for (const [id, e] of Object.entries(EN_ACADEMY)) expect(e.lecciones.length + e.juegos.length, id).toBeGreaterThan(0);
  });

  it('el recorrido filosófico tiene sus cinco lecciones, todas optativas', () => {
    expect(RECORRIDO_FILOSOFICO.map((l) => l.leccion)).toEqual([
      'transhumanismo',
      'dataismo',
      'neuroderechos',
      'estatus-moral',
      'corrientes-y-dilemas',
    ]);
  });
});
