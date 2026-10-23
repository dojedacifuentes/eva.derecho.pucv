import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { esPrivada } from '@/lib/auth/rutas';
import { datosSupabase } from '@/lib/config';

/**
 * Antes de cada página: renueva la sesión de Supabase (si hay) y manda a /ingresar a quien entra sin sesión a
 * una ruta privada. Es un control optimista: la protección real está en RLS y en cada página.
 * En modo demostración no hace nada.
 */
export async function proxy(request: NextRequest) {
  const datos = datosSupabase();
  if (!datos) return NextResponse.next({ request });

  let respuesta = NextResponse.next({ request });
  const supabase = createServerClient(datos.url, datos.clave, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (lista, cabeceras) => {
        lista.forEach(({ name, value }) => request.cookies.set(name, value));
        respuesta = NextResponse.next({ request });
        lista.forEach(({ name, value, options }) => respuesta.cookies.set(name, value, options));
        Object.entries(cabeceras ?? {}).forEach(([k, v]) => respuesta.headers.set(k, v));
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const conSesion = !!data?.claims?.sub;

  if (!conSesion && esPrivada(request.nextUrl.pathname)) {
    const destino = request.nextUrl.clone();
    destino.pathname = '/ingresar';
    destino.search = `?siguiente=${encodeURIComponent(request.nextUrl.pathname)}`;
    return NextResponse.redirect(destino);
  }
  return respuesta;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|eva/|.*\\.(?:svg|png|jpg|webp|mp4|txt)$).*)'],
};
