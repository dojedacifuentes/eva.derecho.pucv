import { describe, expect, it } from 'vitest';
import { clasificar, RESPUESTAS_INICIALES as BASE } from '@/lib/herramientas/antes-de-subir';

describe('Antes de subir', () => {
  it('un apunte propio sin datos es verde', () => {
    expect(clasificar(BASE).nivel).toBe('verde');
  });

  it('lo confidencial es rojo aunque el plan sea institucional', () => {
    expect(clasificar({ ...BASE, confidencial: true, plan: 'institucional' }).nivel).toBe('rojo');
  });

  it('los datos sensibles son rojos en cualquier plan', () => {
    for (const plan of ['gratis', 'pago-personal', 'institucional'] as const) {
      expect(clasificar({ ...BASE, datosPersonales: true, datosSensibles: true, plan }).nivel).toBe('rojo');
    }
  });

  it('datos personales: rojo en un plan personal, ámbar en uno institucional', () => {
    expect(clasificar({ ...BASE, datosPersonales: true, plan: 'gratis' }).nivel).toBe('rojo');
    expect(clasificar({ ...BASE, datosPersonales: true, plan: 'pago-personal' }).nivel).toBe('rojo');
    expect(clasificar({ ...BASE, datosPersonales: true, plan: 'institucional' }).nivel).toBe('ambar');
  });

  it('una obra ajena es ámbar, salvo que el profesor la autorice', () => {
    expect(clasificar({ ...BASE, obraAjena: true }).nivel).toBe('ambar');
    expect(clasificar({ ...BASE, obraAjena: true, autorizadoPorDocente: true }).nivel).toBe('verde');
  });

  it('material de otra persona sin permiso es rojo', () => {
    expect(clasificar({ ...BASE, deOtroSinPermiso: true }).nivel).toBe('rojo');
  });

  it('siempre dice qué hacer', () => {
    for (const r of [BASE, { ...BASE, confidencial: true }, { ...BASE, obraAjena: true }]) {
      expect(clasificar(r).queHacer.length).toBeGreaterThan(0);
    }
  });
});
