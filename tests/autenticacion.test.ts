import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { EVALUACION_C1_U1 } from '@/content/evaluaciones/c1-u1';
import { esPrivada, rutaSegura, validarCorreo } from '@/lib/auth/rutas';

describe('rutaSegura (destino después de ingresar)', () => {
  it('acepta rutas internas con búsqueda y ancla', () => {
    expect(rutaSegura('/docente')).toBe('/docente');
    expect(rutaSegura('/cursos/comprender-la-ia/que-es-la-ia?x=1#evaluacion')).toBe('/cursos/comprender-la-ia/que-es-la-ia?x=1#evaluacion');
  });

  it.each([
    ['//malo.example'],
    ['https://malo.example/'],
    ['/\\malo.example'],
    ['javascript:alert(1)'],
    ['/ruta\u0000con-nulo'],
    ['docente'],
    [''],
    [null],
    [undefined],
    ['/' + 'a'.repeat(400)],
  ])('rechaza %j y vuelve al destino por defecto', (destino) => {
    expect(rutaSegura(destino as string | null | undefined)).toBe('/mi-avance');
  });
});

describe('validarCorreo', () => {
  it('normaliza y acepta un correo válido', () => {
    expect(validarCorreo('  Ana@Ejemplo.CL ')).toEqual({ ok: true, correo: 'ana@ejemplo.cl' });
  });

  it.each([['sin-arroba'], ['a@b'], ['a b@c.cl'], [42], [undefined]])('rechaza %j', (bruto) => {
    expect(validarCorreo(bruto).ok).toBe(false);
  });

  it('con dominios permitidos, sólo esos', () => {
    expect(validarCorreo('ana@mail.ejemplo.cl', 'ejemplo.cl, mail.ejemplo.cl').ok).toBe(true);
    expect(validarCorreo('ana@otro.cl', 'ejemplo.cl').ok).toBe(false);
    // Un subdominio no listado no pasa por parecido.
    expect(validarCorreo('ana@falso-ejemplo.cl', 'ejemplo.cl').ok).toBe(false);
  });
});

describe('rutas privadas', () => {
  it('el panel docente y sus subrutas piden sesión; lo demás no', () => {
    expect(esPrivada('/docente')).toBe(true);
    expect(esPrivada('/docente/seccion')).toBe(true);
    expect(esPrivada('/docentes')).toBe(false);
    expect(esPrivada('/cursos')).toBe(false);
  });
});

describe('la clave de la evaluación no llega al navegador', () => {
  it('la evaluación que se envía al navegador no trae respuestas ni retroalimentación', () => {
    const texto = JSON.stringify(EVALUACION_C1_U1);
    expect(texto).not.toMatch(/"correcta"|"retro"/);
  });

  it('ningún componente de cliente importa las claves', () => {
    const raiz = path.resolve(__dirname, '..', 'src');
    const archivos: string[] = [];
    const recorrer = (dir: string) => {
      for (const n of readdirSync(dir)) {
        const p = path.join(dir, n);
        if (statSync(p).isDirectory()) recorrer(p);
        else if (/\.(ts|tsx)$/.test(n)) archivos.push(p);
      }
    };
    recorrer(raiz);
    const cliente = archivos.filter((a) => /^\s*['"]use client['"]/.test(readFileSync(a, 'utf8')));
    expect(cliente.length).toBeGreaterThan(5);
    for (const a of cliente) {
      expect(readFileSync(a, 'utf8'), path.relative(raiz, a)).not.toMatch(/clave\.datos|claves\.server/);
    }
  });
});
