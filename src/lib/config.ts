/**
 * ¿Hay un proyecto de Supabase configurado? Sin las dos variables públicas, la plataforma corre en
 * «modo demostración» (el avance se guarda en el navegador) y lo dice en pantalla.
 */
export function datosSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const clave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  return url && clave ? { url, clave } : null;
}

export function modoDemostracion() {
  return datosSupabase() === null;
}

export function sitioUrl() {
  return (process.env.NEXT_PUBLIC_SITIO_URL?.trim() || 'http://localhost:3130').replace(/\/$/, '');
}
