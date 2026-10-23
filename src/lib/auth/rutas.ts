/**
 * Reglas de acceso que comparten el proxy, las páginas y las pruebas.
 */

/** Rutas que piden sesión cuando hay Supabase. En modo demostración se abren con datos del navegador o ficticios. */
export const RUTAS_PRIVADAS = ['/docente'];

export function esPrivada(pathname: string) {
  return RUTAS_PRIVADAS.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}

/**
 * Destino seguro después de ingresar: sólo rutas internas. Evita redirecciones abiertas
 * («//otro.sitio», «https://…», «/\\otro», esquemas javascript:).
 */
export function rutaSegura(destino: string | null | undefined, porDefecto = '/mi-avance') {
  if (!destino || typeof destino !== 'string') return porDefecto;
  if (destino.length > 300) return porDefecto;
  if (!destino.startsWith('/') || destino.startsWith('//') || destino.startsWith('/\\')) return porDefecto;
  if (/[\u0000-\u001f\\]/.test(destino)) return porDefecto;
  try {
    const url = new URL(destino, 'http://interno.invalid');
    if (url.origin !== 'http://interno.invalid') return porDefecto;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return porDefecto;
  }
}

const CORREO = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;

/** Valida el correo y, si hay lista de dominios permitidos, que pertenezca a uno de ellos. */
export function validarCorreo(bruto: unknown, dominiosPermitidos = '') {
  if (typeof bruto !== 'string') return { ok: false as const, motivo: 'Escribe tu correo.' };
  const correo = bruto.trim().toLowerCase();
  if (!CORREO.test(correo)) return { ok: false as const, motivo: 'Ese correo no parece válido.' };
  const dominios = dominiosPermitidos
    .split(',')
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
  if (dominios.length > 0) {
    const dominio = correo.split('@')[1];
    if (!dominios.includes(dominio)) {
      return { ok: false as const, motivo: `En el piloto se ingresa con un correo de: ${dominios.join(', ')}.` };
    }
  }
  return { ok: true as const, correo };
}
