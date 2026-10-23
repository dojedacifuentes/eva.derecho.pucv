import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { datosSupabase } from '@/lib/config';

/**
 * Cliente de Supabase para Server Components, Server Actions y rutas. Uno nuevo por petición.
 * Devuelve null en modo demostración. Usa sólo la clave pública: lo que puede hacer lo limita RLS.
 */
export async function clienteServidor() {
  const datos = datosSupabase();
  if (!datos) return null;
  const almacen = await cookies();
  return createServerClient(datos.url, datos.clave, {
    cookies: {
      getAll: () => almacen.getAll(),
      setAll: (lista) => {
        try {
          lista.forEach(({ name, value, options }) => almacen.set(name, value, options));
        } catch {
          // Desde un Server Component no se pueden escribir cookies: el proxy renueva la sesión.
        }
      },
    },
  });
}

export interface Sesion {
  id: string;
  correo: string | null;
  rol: 'estudiante' | 'docente' | 'admin';
  nombre: string | null;
}

/** Quién está conectado, verificando el token (getClaims valida la firma; no basta con leer la cookie). */
export async function sesionActual(): Promise<Sesion | null> {
  const supabase = await clienteServidor();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) return null;
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('rol, nombre_visible')
    .eq('id', data.claims.sub)
    .maybeSingle();
  return {
    id: data.claims.sub,
    correo: typeof data.claims.email === 'string' ? data.claims.email : null,
    rol: (perfil?.rol as Sesion['rol']) ?? 'estudiante',
    nombre: perfil?.nombre_visible ?? null,
  };
}
